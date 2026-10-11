/* =====================================================================
   Inventory core. Every change to on_hand or reserved goes through
   move(), inside a transaction, with the item row locked — so the ledger
   (movements) and the totals (items) can never disagree, and two orders
   arriving at the same moment can't both take the last bag of a color.
   ===================================================================== */
import { getSettings } from "./catalog.js";
import { notifyAlert } from "./alerts.js";

export class InventoryError extends Error {
  constructor(message, status = 409, detail){ super(message); this.status = status; this.detail = detail; }
}

/* lock items in id order (consistent ordering = no deadlocks) */
export async function lockItems(c, ids){
  const list = [...new Set(ids)].sort((a, b) => a - b);
  if (!list.length) return new Map();
  const { rows } = await c.query("select * from items where id = any($1) order by id for update", [list]);
  return new Map(rows.map((r) => [r.id, r]));
}

/* the single place stock changes. Caller must hold the row lock. */
export async function move(c, item, m){
  const dOn = m.dOnHand || 0, dRes = m.dReserved || 0;
  if (dOn && item.on_hand == null && m.type !== "count")
    throw new InventoryError(`${item.name} (${item.sku}) has not been counted yet. Enter its stock count first.`, 409, { sku: item.sku });
  const onHand = m.type === "count" ? m.setOnHand : (item.on_hand == null ? null : item.on_hand + dOn);
  const reserved = item.reserved + dRes;
  if (reserved < 0) throw new InventoryError(`Reservation for ${item.sku} would go below zero`, 500);
  const delta = m.type === "count" ? onHand - (item.on_hand ?? 0) : dOn;
  await c.query(
    `update items set on_hand = $2, reserved = $3, updated_at = now()
       ${m.type === "count" ? ", counted_at = now()" : ""} where id = $1`,
    [item.id, onHand, reserved]);
  await c.query(
    `insert into movements (item_id, type, delta_on_hand, delta_reserved, on_hand_after, reserved_after,
                            order_id, restock_id, reason, user_id, actor)
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    [item.id, m.type, delta, dRes, onHand, reserved, m.orderId || null, m.restockId || null,
     m.reason || null, m.user ? m.user.id : null, actorName(m)]);
  item.on_hand = onHand; item.reserved = reserved;
  await refreshAlerts(c, item);
}

export function actorName(m){
  if (m.user) return `${m.user.name} (${m.user.role})`;
  return m.actor || "system";
}

/* low stock: available (on hand − reserved) at or below the minimum.
   shortage: more reserved than on hand. Uncounted items raise neither —
   they show up under "needs initial count" instead. */
export async function refreshAlerts(c, item){
  const avail = item.on_hand == null ? null : item.on_hand - item.reserved;
  const want = {
    low_stock: avail != null && item.min_level != null && item.active && avail <= item.min_level,
    shortage: avail != null && avail < 0,
  };
  for (const [kind, on] of Object.entries(want)){
    if (on){
      const msg = kind === "shortage"
        ? `${item.name}: ${-avail} short for reserved orders (on hand ${item.on_hand}, reserved ${item.reserved})`
        : `${item.name}: ${avail} available, minimum is ${item.min_level}`;
      const { rows } = await c.query(
        `insert into alerts (item_id, kind, message) values ($1, $2, $3)
         on conflict (item_id, kind) where resolved_at is null do update set message = excluded.message
         returning id, (xmax = 0) as created`, [item.id, kind, msg]);
      if (rows[0] && rows[0].created) notifyAlert({ id: rows[0].id, kind, message: msg, sku: item.sku });
    } else {
      await c.query("update alerts set resolved_at = now() where item_id = $1 and kind = $2 and resolved_at is null", [item.id, kind]);
    }
  }
}

/* ------------------------------------------------ manual stock changes */
export async function setCount(c, itemId, qty, { reason, user }){
  if (!Number.isInteger(qty) || qty < 0) throw new InventoryError("Count must be a whole number, 0 or more", 400);
  const item = (await lockItems(c, [itemId])).get(itemId);
  if (!item) throw new InventoryError("Item not found", 404);
  if (item.on_hand === qty) return item;
  await move(c, item, { type: "count", setOnHand: qty, reason: reason || (item.on_hand == null ? "Initial count" : "Stock count"), user });
  return item;
}

export async function adjust(c, itemId, delta, { reason, user }){
  if (!Number.isInteger(delta) || delta === 0) throw new InventoryError("Adjustment must be a non-zero whole number", 400);
  if (!reason || !String(reason).trim()) throw new InventoryError("A reason is required for adjustments", 400);
  const item = (await lockItems(c, [itemId])).get(itemId);
  if (!item) throw new InventoryError("Item not found", 404);
  if (item.on_hand != null && item.on_hand + delta < 0) throw new InventoryError(`${item.name} would go below zero`, 409);
  await move(c, item, { type: "adjust", dOnHand: delta, reason, user });
  return item;
}

export async function restock(c, { supplier, reference, receivedAt, notes, lines, user }){
  const clean = (lines || []).map((l) => ({ itemId: Number(l.itemId), qty: Number(l.qty) })).filter((l) => l.qty);
  if (!clean.length) throw new InventoryError("Add at least one item to the delivery", 400);
  for (const l of clean) if (!Number.isInteger(l.qty) || l.qty <= 0) throw new InventoryError("Quantities must be positive whole numbers", 400);
  const { rows: [r] } = await c.query(
    `insert into restocks (supplier, reference, received_at, notes, user_id) values ($1, $2, coalesce($3::date, current_date), $4, $5) returning *`,
    [supplier || null, reference || null, receivedAt || null, notes || null, user ? user.id : null]);
  const items = await lockItems(c, clean.map((l) => l.itemId));
  const merged = new Map();
  for (const l of clean) merged.set(l.itemId, (merged.get(l.itemId) || 0) + l.qty);
  for (const [itemId, qty] of merged){
    const item = items.get(itemId);
    if (!item) throw new InventoryError("Unknown item in delivery", 400);
    if (item.on_hand == null) throw new InventoryError(`${item.name} has not been counted yet. Enter its current count before receiving a delivery.`, 409);
    await c.query("insert into restock_lines (restock_id, item_id, qty) values ($1, $2, $3)", [r.id, itemId, qty]);
    await move(c, item, { type: "restock", dOnHand: qty, restockId: r.id, reason: `Delivery${supplier ? " from " + supplier : ""}${reference ? " · " + reference : ""}`, user });
  }
  return r;
}

/* --------------------------------------------- order material requirements */
/* What an order needs: the sum of its lines' pinned revisions × quantity.
   Bricks use the packed or exact quantity per the brick_quantity_mode setting. */
export async function orderRequirements(c, orderId){
  const s = await getSettings(c);
  const col = s.brick_quantity_mode === "exact" ? "exact_qty" : "packed_qty";
  const { rows } = await c.query(
    `select rm.item_id, sum(case when i.category = 'brick' then rm.${col} else rm.exact_qty end * ol.quantity)::int as qty
       from order_lines ol
       join revision_materials rm on rm.revision_id = ol.revision_id
       join items i on i.id = rm.item_id
      where ol.order_id = $1 and ol.quantity > 0
      group by rm.item_id`, [orderId]);
  return new Map(rows.filter((r) => r.qty > 0).map((r) => [r.item_id, r.qty]));
}

const RESERVING = new Set(["reserved", "in_production"]);

/* Make the order's reservation exactly match what it should be right now.
   Idempotent: calling it twice (duplicate webhook, retry) changes nothing
   the second time, so a reservation can never be doubled. */
export async function syncReservations(c, orderId, who){
  const { rows: [order] } = await c.query("select * from orders where id = $1 for update", [orderId]);
  if (!order) throw new InventoryError("Order not found", 404);
  const desired = RESERVING.has(order.status) ? await orderRequirements(c, orderId) : new Map();
  const { rows: cur } = await c.query("select item_id, qty from reservations where order_id = $1", [orderId]);
  const current = new Map(cur.map((r) => [r.item_id, r.qty]));
  const ids = [...new Set([...desired.keys(), ...current.keys()])];
  const changes = ids.map((id) => [id, (desired.get(id) || 0) - (current.get(id) || 0)]).filter(([, d]) => d);
  if (!changes.length) return { changed: 0 };
  const items = await lockItems(c, changes.map(([id]) => id));
  for (const [id, d] of changes){
    const item = items.get(id);
    await move(c, item, {
      type: d > 0 ? "reserve" : "release", dReserved: d, orderId,
      reason: `${d > 0 ? "Reserved for" : "Released from"} ${order.order_name || "order " + orderId}`, ...who,
    });
    const want = desired.get(id) || 0;
    if (want) await c.query(`insert into reservations (order_id, item_id, qty) values ($1, $2, $3)
                             on conflict (order_id, item_id) do update set qty = excluded.qty`, [orderId, id, want]);
    else await c.query("delete from reservations where order_id = $1 and item_id = $2", [orderId, id]);
  }
  return { changed: changes.length };
}

/* Packing: what was picked leaves the shelf and its reservation is released,
   in one step. A packed order can't be packed again, so nothing is
   deducted twice. */
export async function packOrder(c, orderId, who){
  const { rows: [order] } = await c.query("select * from orders where id = $1 for update", [orderId]);
  if (!order) throw new InventoryError("Order not found", 404);
  if (order.status === "packed" || order.status === "shipped") throw new InventoryError("This order is already packed — its materials were already deducted.", 409);
  if (!RESERVING.has(order.status)) throw new InventoryError(`Only reserved or in-production orders can be packed (this one is ${order.status}).`, 409);
  const { rows: missing } = await c.query("select count(*)::int as n from order_lines where order_id = $1 and quantity > 0 and revision_id is null", [orderId]);
  if (missing[0].n) throw new InventoryError("This order has a line whose design hasn't arrived yet, so its materials are unknown.", 409);
  await syncReservations(c, orderId, who);
  const { rows: res } = await c.query("select item_id, qty from reservations where order_id = $1", [orderId]);
  if (!res.length) throw new InventoryError("This order has no materials to pack.", 409);
  const items = await lockItems(c, res.map((r) => r.item_id));
  const uncounted = res.filter((r) => items.get(r.item_id).on_hand == null).map((r) => items.get(r.item_id).name);
  if (uncounted.length) throw new InventoryError(`Count these items before packing: ${uncounted.join(", ")}`, 409, { uncounted });
  for (const r of res){
    await move(c, items.get(r.item_id), {
      type: "consume", dOnHand: -r.qty, dReserved: -r.qty, orderId,
      reason: `Packed ${order.order_name || "order " + orderId}`, ...who,
    });
    await c.query(`insert into consumptions (order_id, item_id, qty) values ($1, $2, $3)
                   on conflict (order_id, item_id) do update set qty = consumptions.qty + excluded.qty`, [orderId, r.item_id, r.qty]);
  }
  await c.query("delete from reservations where order_id = $1", [orderId]);
  await c.query("update orders set status = 'packed', updated_at = now() where id = $1", [orderId]);
  return { packed: res.length };
}

/* Consumed materials only come back through an explicit, recorded return. */
export async function returnMaterials(c, orderId, who, reason){
  const { rows: [order] } = await c.query("select * from orders where id = $1 for update", [orderId]);
  if (!order) throw new InventoryError("Order not found", 404);
  if (order.materials_returned) throw new InventoryError("Materials for this order were already returned to stock.", 409);
  const { rows } = await c.query("select item_id, qty from consumptions where order_id = $1", [orderId]);
  if (!rows.length) throw new InventoryError("Nothing was consumed for this order.", 409);
  const items = await lockItems(c, rows.map((r) => r.item_id));
  for (const r of rows) await move(c, items.get(r.item_id), {
    type: "return", dOnHand: r.qty, orderId,
    reason: reason || `Returned to stock from ${order.order_name || "order " + orderId}`, ...who,
  });
  await c.query("update orders set materials_returned = true, needs_attention = null, updated_at = now() where id = $1", [orderId]);
}

/* Change an order's production status (dashboard). Reservations follow. */
const TRANSITIONS = {
  pending: ["reserved", "cancelled"],
  reserved: ["in_production", "cancelled", "pending"],
  in_production: ["reserved", "cancelled"],
  packed: ["shipped", "cancelled"],
  shipped: [],
  cancelled: ["reserved"],
};
export async function setOrderStatus(c, orderId, status, who){
  if (status === "packed") return packOrder(c, orderId, who);
  const { rows: [order] } = await c.query("select * from orders where id = $1 for update", [orderId]);
  if (!order) throw new InventoryError("Order not found", 404);
  if (order.status === status) return;
  if (!(TRANSITIONS[order.status] || []).includes(status))
    throw new InventoryError(`Can't move an order from ${order.status} to ${status}.`, 409);
  const attention = status === "cancelled" && order.status === "packed"
    ? "Cancelled after packing: materials were already consumed. Use “Return materials to stock” if they came back."
    : null;
  await c.query("update orders set status = $2, needs_attention = coalesce($3, needs_attention), updated_at = now() where id = $1",
    [orderId, status, attention]);
  await syncReservations(c, orderId, who);
}

/* ---------------------------------------------------------- reconciliation */
/* Rebuild every total from first principles and report anything that
   disagrees: reserved must equal the sum of live reservations, and on_hand
   must equal the ledger since the last count. */
export async function reconcile(c, { fix = false, user } = {}){
  const { rows } = await c.query(`
    with res as (select item_id, sum(qty)::int as qty from reservations group by item_id),
         last_count as (
           select distinct on (item_id) item_id, id, on_hand_after
             from movements where type = 'count' order by item_id, id desc),
         after_count as (
           select m.item_id, sum(m.delta_on_hand)::int as delta
             from movements m join last_count lc on lc.item_id = m.item_id and m.id > lc.id
            group by m.item_id)
    select i.id, i.sku, i.name, i.on_hand, i.reserved,
           coalesce(res.qty, 0) as reserved_expected,
           case when lc.item_id is null then null else lc.on_hand_after + coalesce(ac.delta, 0) end as on_hand_expected
      from items i
      left join res on res.item_id = i.id
      left join last_count lc on lc.item_id = i.id
      left join after_count ac on ac.item_id = i.id
     order by i.id`);
  const issues = rows.filter((r) => r.reserved !== r.reserved_expected ||
    (r.on_hand_expected ?? null) !== (r.on_hand ?? null));
  if (fix && issues.length){
    const items = await lockItems(c, issues.map((r) => r.id));
    for (const r of issues){
      const item = items.get(r.id);
      // the ledger is the truth: on hand is reset to it with a count entry
      // (a new baseline), reserved to the sum of live reservations
      if (r.on_hand_expected != null && item.on_hand !== r.on_hand_expected)
        await move(c, item, { type: "count", setOnHand: r.on_hand_expected, reason: "Reconciliation correction (ledger total)", user });
      const dRes = r.reserved_expected - item.reserved;
      if (dRes) await move(c, item, { type: "adjust", dReserved: dRes, reason: "Reconciliation correction (reservations)", user });
    }
  }
  return { checked: rows.length, issues };
}
