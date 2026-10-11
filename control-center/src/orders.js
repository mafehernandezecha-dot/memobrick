/* =====================================================================
   Orders from both sources, one table, one reservation per order.

   Shopify: the website's cart line carries the editor's "Design ID"
   property; the order webhook links that line to the exact design revision
   the customer's browser sent when they added it to the cart, and pins it.

   Studio: "Finish" sends the design to production. If the project's order
   number matches a Shopify order, the Studio design is attached to that
   order (no second order). Otherwise a Studio order is created — and if
   the Shopify order arrives later, the Studio order is merged into it.
   ===================================================================== */
import { InventoryError, syncReservations, setOrderStatus } from "./inventory.js";
import { audit } from "./log.js";

const DESIGN_PROP = /^_?design id$/i;

export function normaliseOrderName(ref){
  const s = String(ref || "").trim().replace(/\s+/g, "");
  if (!s) return null;
  return s.startsWith("#") ? s : "#" + s;
}

function propsOf(line){
  const out = {};
  for (const p of line.properties || []) if (p && p.name) out[String(p.name)] = p.value;
  return out;
}
function designIdOf(line){
  const props = propsOf(line);
  const k = Object.keys(props).find((n) => DESIGN_PROP.test(n));
  return k ? String(props[k]).trim() : null;
}

/* Shopify's financial status → our order status */
function statusFromShopify(o){
  if (o.cancelled_at) return "cancelled";
  const f = o.financial_status;
  if (f === "paid" || f === "partially_paid" || f === "partially_refunded") return "reserved";
  if (f === "refunded" || f === "voided") return "cancelled";
  return "pending";      // pending / authorized / expired: payment not completed
}

const who = { actor: "shopify" };

export async function handleShopifyOrder(c, o){
  if (!o || !o.id) throw new InventoryError("Order payload has no id", 422);
  await c.query("select pg_advisory_xact_lock(hashtext('shopify-order:' || $1))", [String(o.id)]);
  const lines = (o.line_items || []).map((l) => ({ l, designId: designIdOf(l) })).filter((x) => x.designId);
  const { rows: [existing] } = await c.query("select * from orders where shopify_order_id = $1 for update", [o.id]);
  if (!lines.length && !existing) return { ignored: "no MemoBrick design on this order" };

  // webhooks can arrive out of order; never let an older snapshot win
  const updatedAt = o.updated_at ? new Date(o.updated_at) : null;
  if (existing && existing.shopify_updated_at && updatedAt && updatedAt < existing.shopify_updated_at)
    return { ignored: "stale event", orderId: existing.id };

  const name = o.name || (o.order_number ? "#" + o.order_number : null);
  const customer = o.customer ? [o.customer.first_name, o.customer.last_name].filter(Boolean).join(" ") : null;
  let order = existing;
  if (!order){
    const { rows: [r] } = await c.query(
      `insert into orders (source, shopify_order_id, shopify_updated_at, order_name, customer, email, status, financial_status, placed_at)
       values ('shopify', $1, $2, $3, $4, $5, 'pending', $6, $7) returning *`,
      [o.id, updatedAt, name, customer, o.email || null, o.financial_status || null, o.created_at || null]);
    order = r;
    await audit(c, { actor: "shopify", action: "order.created", entity: "order", entityId: order.id, detail: { name } });
  } else {
    await c.query(
      `update orders set shopify_updated_at = coalesce($2, shopify_updated_at), order_name = coalesce($3, order_name),
              customer = coalesce($4, customer), email = coalesce($5, email), financial_status = $6, updated_at = now()
        where id = $1`, [order.id, updatedAt, name, customer, o.email || null, o.financial_status || null]);
  }

  // lines: pin each to the design revision that exists for it
  const seen = new Set();
  for (const { l, designId } of lines){
    const qty = Number(l.current_quantity ?? l.quantity ?? 0);
    const props = propsOf(l);
    seen.add(String(l.id));
    const { rows: [cur] } = await c.query("select * from order_lines where order_id = $1 and shopify_line_id = $2", [order.id, l.id]);
    if (cur){
      await c.query("update order_lines set quantity = $2, updated_at = now() where id = $1", [cur.id, qty]);
      if (cur.revision_id == null) await pinLine(c, cur.id, cur.design_id);
    } else {
      const { rows: [nl] } = await c.query(
        `insert into order_lines (order_id, shopify_line_id, design_id, quantity, title, size_label)
         values ($1, $2, $3, $4, $5, $6) returning *`,
        [order.id, l.id, designId, qty, l.title || l.name || null, props["MemoBrick Size"] || props["Selected size"] || null]);
      await pinLine(c, nl.id, designId);
    }
  }
  // lines removed from the order by an edit
  const { rows: dbLines } = await c.query("select id, shopify_line_id from order_lines where order_id = $1", [order.id]);
  for (const dl of dbLines) if (dl.shopify_line_id != null && !seen.has(String(dl.shopify_line_id)))
    await c.query("update order_lines set quantity = 0, updated_at = now() where id = $1", [dl.id]);

  await mergeStudioOrder(c, order.id, name);
  await refreshAttention(c, order.id);

  // status: follow Shopify, but never undo production progress made here
  const target = statusFromShopify(o);
  const { rows: [now] } = await c.query("select status from orders where id = $1", [order.id]);
  if (target === "cancelled" && now.status === "shipped")
    await c.query("update orders set needs_attention = $2 where id = $1", [order.id,
      "Cancelled or refunded in Shopify after it shipped. If the kit comes back, use “Return materials to stock”."]);
  else if (target === "cancelled" && now.status !== "cancelled") await setOrderStatus(c, order.id, "cancelled", who);
  else if (target === "reserved" && (now.status === "pending" || now.status === "cancelled")) await setOrderStatus(c, order.id, "reserved", who);
  else if (target === "pending" && now.status === "reserved") await setOrderStatus(c, order.id, "pending", who);
  // fulfilled in Shopify: a packed order becomes shipped. Never consumes stock
  // by itself — only packing here does that.
  if (o.fulfillment_status === "fulfilled"){
    const { rows: [n2] } = await c.query("select status from orders where id = $1", [order.id]);
    if (n2.status === "packed") await setOrderStatus(c, order.id, "shipped", who);
    else if (["reserved", "in_production"].includes(n2.status))
      await c.query("update orders set needs_attention = $2 where id = $1", [order.id,
        "Marked fulfilled in Shopify but not packed here yet — confirm packing so its materials are deducted."]);
  }
  await syncReservations(c, order.id, who);   // picks up quantity edits too
  return { orderId: order.id };
}

async function pinLine(c, lineId, designId){
  const { rows: [d] } = await c.query("select * from designs where id = $1", [designId]);
  if (!d || !d.current_revision) return false;
  const { rows: [r] } = await c.query("select id from design_revisions where design_id = $1 and revision = $2", [designId, d.current_revision]);
  await c.query("update order_lines set revision_id = $2, updated_at = now() where id = $1", [lineId, r.id]);
  if (!d.verified) await c.query("update designs set verified = true where id = $1", [designId]);
  return true;
}

export async function refreshAttention(c, orderId){
  const { rows } = await c.query(
    "select design_id from order_lines where order_id = $1 and quantity > 0 and revision_id is null", [orderId]);
  const msg = rows.length
    ? `Waiting for design ${rows.map((r) => r.design_id).join(", ")} from the editor — materials unknown until it arrives.`
    : null;
  await c.query(
    `update orders set needs_attention = case
        when $2::text is not null then $2
        when needs_attention like 'Waiting for design%' then null
        else needs_attention end, updated_at = now() where id = $1`, [orderId, msg]);
}

/* A Studio order for the same order number becomes part of the Shopify
   order: its design replaces the website design on the (single) line, and
   the Studio order is closed so materials are reserved once. */
async function mergeStudioOrder(c, shopifyOrderId, name){
  if (!name) return;
  const { rows: studio } = await c.query(
    `select * from orders where source = 'studio' and order_name = $1 and merged_into is null for update`, [name]);
  for (const so of studio){
    if (["packed", "shipped"].includes(so.status)){
      await c.query("update orders set needs_attention = $2 where id = $1", [shopifyOrderId,
        `Studio order ${so.id} for ${name} was already packed — check this order isn't produced twice.`]);
      continue;
    }
    const { rows: [sl] } = await c.query("select * from order_lines where order_id = $1 and quantity > 0 order by id limit 1", [so.id]);
    const { rows: lines } = await c.query("select * from order_lines where order_id = $1 and quantity > 0 order by id", [shopifyOrderId]);
    if (sl && lines.length === 1){
      await c.query("update order_lines set design_id = $2, revision_id = $3, updated_at = now() where id = $1",
        [lines[0].id, sl.design_id, sl.revision_id]);
    } else if (sl){
      await c.query("update orders set needs_attention = $2 where id = $1", [shopifyOrderId,
        `Studio design ${sl.design_id} matches this order but it has ${lines.length} MemoBrick items — choose which item it replaces.`]);
    }
    await c.query("update orders set status = 'cancelled', merged_into = $2, updated_at = now() where id = $1", [so.id, shopifyOrderId]);
    await syncReservations(c, so.id, { actor: "system" });
    await audit(c, { actor: "system", action: "order.merged", entity: "order", entityId: so.id, detail: { into: shopifyOrderId } });
  }
}

/* Studio "Finish": put this design into production. */
export async function studioToProduction(c, designId, { orderRef, customer, title }){
  const { rows: [d] } = await c.query("select * from designs where id = $1 and source = 'studio'", [designId]);
  if (!d) throw new InventoryError("Studio design not found — save it first", 404);
  const { rows: [rev] } = await c.query("select id from design_revisions where design_id = $1 and revision = $2", [designId, d.current_revision]);
  const name = normaliseOrderName(orderRef);
  const actor = { actor: "studio" };

  if (name){
    const { rows: [so] } = await c.query("select * from orders where source = 'shopify' and order_name = $1 for update", [name]);
    if (so){
      const { rows: lines } = await c.query("select * from order_lines where order_id = $1 and quantity > 0 order by id", [so.id]);
      const already = lines.find((l) => l.design_id === designId);
      if (already || lines.length === 1){
        const line = already || lines[0];
        if (["packed", "shipped"].includes(so.status))
          throw new InventoryError(`Shopify order ${name} is already packed — its materials can't change any more.`, 409);
        await c.query("update order_lines set design_id = $2, revision_id = $3, updated_at = now() where id = $1", [line.id, designId, rev.id]);
        await refreshAttention(c, so.id);
        await syncReservations(c, so.id, actor);
        await audit(c, { actor: "studio", action: "order.design-attached", entity: "order", entityId: so.id, detail: { designId } });
        return { orderId: so.id, linked: "shopify", orderName: name };
      }
      await c.query("update orders set needs_attention = $2 where id = $1", [so.id,
        `Studio design ${designId} was sent for this order, which has ${lines.length} MemoBrick items — choose which item it replaces.`]);
      return { orderId: so.id, linked: "shopify", orderName: name, needsChoice: true };
    }
  }
  // Studio-only order: one per Studio project, never duplicated
  const key = d.external_ref || designId;
  const { rows: [ex] } = await c.query("select * from orders where studio_project_id = $1 for update", [key]);
  let order = ex;
  if (!order){
    const { rows: [r] } = await c.query(
      `insert into orders (source, studio_project_id, order_name, customer, status, placed_at)
       values ('studio', $1, $2, $3, 'reserved', now()) returning *`, [key, name, customer || d.customer || title || d.title]);
    order = r;
    await c.query("insert into order_lines (order_id, design_id, revision_id, quantity, title, size_label) select $1, $2, $3, 1, $4, size_label from design_revisions where id = $3",
      [order.id, designId, rev.id, title || d.title]);
    await audit(c, { actor: "studio", action: "order.created", entity: "order", entityId: order.id, detail: { designId } });
  } else {
    if (["packed", "shipped"].includes(order.status)) throw new InventoryError("This Studio order is already packed.", 409);
    await c.query("update orders set order_name = coalesce($2, order_name), customer = coalesce($3, customer), updated_at = now() where id = $1",
      [order.id, name, customer || null]);
    await c.query("update order_lines set design_id = $2, revision_id = $3, updated_at = now() where order_id = $1", [order.id, designId, rev.id]);
    if (order.status === "cancelled" && !order.merged_into) await setOrderStatus(c, order.id, "reserved", actor);
  }
  await syncReservations(c, order.id, actor);
  return { orderId: order.id, linked: "studio", orderName: name };
}

/* Control Center: choose which design an order line is produced from */
export async function assignLineDesign(c, orderId, lineId, designId, user){
  const { rows: [o] } = await c.query("select * from orders where id = $1 for update", [orderId]);
  if (!o) throw new InventoryError("Order not found", 404);
  if (["packed", "shipped"].includes(o.status)) throw new InventoryError("Packed orders can't change design.", 409);
  const { rows: [d] } = await c.query("select * from designs where id = $1", [designId]);
  if (!d) throw new InventoryError("Design not found", 404);
  const { rows: [rev] } = await c.query("select id from design_revisions where design_id = $1 and revision = $2", [designId, d.current_revision]);
  const { rowCount } = await c.query("update order_lines set design_id = $3, revision_id = $4, updated_at = now() where id = $2 and order_id = $1",
    [orderId, lineId, designId, rev.id]);
  if (!rowCount) throw new InventoryError("Order line not found", 404);
  await c.query("update orders set needs_attention = null where id = $1", [orderId]);
  await refreshAttention(c, orderId);
  await syncReservations(c, orderId, { user });
  await audit(c, { user, action: "order.line-design", entity: "order", entityId: orderId, detail: { lineId, designId } });
}
