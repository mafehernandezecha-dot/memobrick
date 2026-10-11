import crypto from "node:crypto";
import { query, migrate, closePool } from "../src/db.js";

export const SECRET = "test-webhook-secret";
process.env.SHOPIFY_WEBHOOK_SECRET = SECRET;
process.env.CORS_ORIGINS = "https://mymemobrick.com,https://memobrickdstudio.netlify.app";

export async function freshDb(){
  await query("drop schema public cascade; create schema public;");
  await migrate();
}
export { query, closePool };

/* a design payload exactly as the editors build it */
export function designPayload({ size = { id: "20x20", label: '20 × 20"', gw: 64, gh: 64, bx: 2, by: 2 }, palette, counts, extra = {} }){
  const pal = palette || [["037", "White", "#FEFEFE"], ["001", "Black", "#111011"], ["026", "Red", "#BD3A32"]];
  const total = size.gw * size.gh;
  const cells = new Uint8Array(total);
  let i = 0;
  const want = counts || [total - 1000, 700, 300];
  want.forEach((n, k) => { for (let j = 0; j < n; j++) cells[i++] = k; });
  if (i !== total) throw new Error(`counts add up to ${i}, grid has ${total}`);
  // shuffle so counting can't rely on runs
  for (let a = cells.length - 1; a > 0; a--){ const b = (a * 7919) % (a + 1); [cells[a], cells[b]] = [cells[b], cells[a]]; }
  return { size, palette: pal, cells: Buffer.from(cells).toString("base64"), editor: "test", ...extra };
}

export function shopifyOrder({ id = 5001, name = "#1001", financial = "paid", lines, updatedAt, cancelled = false } = {}){
  return {
    id, name, order_number: Number(String(name).replace("#", "")), email: "ana@example.com",
    financial_status: financial, cancelled_at: cancelled ? new Date().toISOString() : null,
    created_at: "2026-10-10T10:00:00Z", updated_at: updatedAt || new Date().toISOString(),
    customer: { first_name: "Ana", last_name: "Garcia" },
    line_items: lines || [{ id: 9001, title: "Custom Bricked Mosaic", quantity: 1, current_quantity: 1,
      properties: [{ name: "Design ID", value: "MB-20261010-TEST0001" }, { name: "MemoBrick Size", value: '20 × 20"' }] }],
  };
}

export function signedWebhook(payload, { topic = "orders/updated", id = crypto.randomUUID(), secret = SECRET } = {}){
  const raw = Buffer.from(JSON.stringify(payload));
  return {
    rawBody: raw,
    headers: {
      "x-shopify-hmac-sha256": crypto.createHmac("sha256", secret).update(raw).digest("base64"),
      "x-shopify-topic": topic, "x-shopify-webhook-id": id, "x-shopify-shop-domain": "memobrick.myshopify.com",
    },
  };
}

export async function item(sku){
  const { rows: [r] } = await query("select * from items where sku = $1", [sku]);
  return r;
}
export async function countAll(n = 100000){
  await query("update items set on_hand = $1, counted_at = now()", [n]);
  // record it as a count so reconciliation has a base
  await query(`insert into movements (item_id, type, delta_on_hand, on_hand_after, reserved_after, reason, actor)
               select id, 'count', $1, $1, reserved, 'test count', 'test' from items`, [n]);
}
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
