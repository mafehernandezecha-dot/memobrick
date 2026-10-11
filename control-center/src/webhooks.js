/* =====================================================================
   Shopify webhooks: verify → store → acknowledge → process (with retries).

   · Every request is HMAC-verified with SHOPIFY_WEBHOOK_SECRET.
   · The event is stored under Shopify's X-Shopify-Webhook-Id before we
     answer, so a duplicate delivery is recognised and skipped.
   · Processing happens after the 200 reply, inside a transaction; a
     failure is logged and retried with backoff (and can be retried by hand
     from Settings → Integrations).
   ===================================================================== */
import crypto from "node:crypto";
import { query, tx } from "./db.js";
import { handleShopifyOrder } from "./orders.js";
import { logError } from "./log.js";
import { broadcast } from "./events.js";

export const ORDER_TOPICS = new Set(["orders/create", "orders/updated", "orders/paid", "orders/cancelled", "orders/fulfilled", "orders/partially_fulfilled"]);

export function verifyShopifyHmac(rawBody, hmacHeader, secret){
  if (!secret || !hmacHeader) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest();
  let given;
  try { given = Buffer.from(String(hmacHeader), "base64"); } catch { return false; }
  return given.length === digest.length && crypto.timingSafeEqual(given, digest);
}

/* returns { status, duplicate } */
export async function receiveShopifyWebhook({ rawBody, headers }){
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!verifyShopifyHmac(rawBody, headers["x-shopify-hmac-sha256"], secret)) return { status: 401 };
  const topic = String(headers["x-shopify-topic"] || "");
  const shop = String(headers["x-shopify-shop-domain"] || "");
  const expectShop = process.env.SHOPIFY_SHOP_DOMAIN;
  if (expectShop && shop && shop !== expectShop) return { status: 401 };
  let payload;
  try { payload = JSON.parse(rawBody.toString("utf8")); } catch { return { status: 400 }; }
  const id = String(headers["x-shopify-webhook-id"] || ("sha256:" + crypto.createHash("sha256").update(topic).update(rawBody).digest("hex")));
  const { rowCount } = await query(
    `insert into webhook_events (id, topic, shop, payload, status) values ($1, $2, $3, $4, $5) on conflict (id) do nothing`,
    [id, topic, shop, payload, ORDER_TOPICS.has(topic) ? "pending" : "ignored"]);
  if (!rowCount) return { status: 200, duplicate: true };
  if (ORDER_TOPICS.has(topic)) setImmediate(() => processEvent(id).catch(() => {}));
  return { status: 200, id };
}

export async function processEvent(id){
  let result;
  try {
    result = await tx(async (c) => {
      const { rows: [ev] } = await c.query(
        "select * from webhook_events where id = $1 and status in ('pending', 'failed') for update skip locked", [id]);
      if (!ev) return null;   // done already, or another worker has it
      const out = await handleShopifyOrder(c, ev.payload);
      await c.query("update webhook_events set status = 'done', attempts = attempts + 1, processed_at = now(), last_error = null where id = $1", [id]);
      return out;
    });
  } catch (e){
    await logError("shopify-webhook", e, { id });
    await query(
      `update webhook_events set status = 'failed', attempts = attempts + 1, last_error = $2,
              next_try_at = now() + (least(power(2, attempts), 64) || ' minutes')::interval where id = $1`,
      [id, String(e.message).slice(0, 1000)]);
    return { error: e.message };
  }
  if (result) broadcast("orders");
  return result;
}

/* background retry of events that failed (DB hiccup, design not yet saved…) */
export async function retryDue(limit = 20){
  const { rows } = await query(
    `select id from webhook_events where status in ('pending', 'failed') and next_try_at <= now() and attempts < 12
      order by received_at limit $1`, [limit]);
  for (const r of rows) await processEvent(r.id);
  return rows.length;
}
