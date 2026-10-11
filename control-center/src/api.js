/* =====================================================================
   HTTP API. Three audiences:
     /api/website/*  public — the website editor's connector (CORS-limited)
     /api/studio/*   MemoBrick Studio, with an API key
     /api/*          the Control Center dashboard, with a signed-in user
     /webhooks/shopify  Shopify, HMAC-verified
   ===================================================================== */
import { query, tx } from "./db.js";
import { router, HttpError, toCSV, parseCSV } from "./http.js";
import { login, logout, createUser, createApiKey, sessionCookie, COOKIE } from "./auth.js";
import { ingestDesign, designAvailability } from "./designs.js";
import { studioToProduction, assignLineDesign } from "./orders.js";
import { setCount, adjust, restock, setOrderStatus, returnMaterials, reconcile, lockItems, move, InventoryError } from "./inventory.js";
import { getSettings, DEFAULT_SETTINGS } from "./catalog.js";
import { receiveShopifyWebhook, processEvent } from "./webhooks.js";
import { broadcast, subscribe } from "./events.js";
import { audit } from "./log.js";

export const r = router();
const int = (v, name) => {
  const n = Number(v);
  if (!Number.isInteger(n)) throw new HttpError(400, `${name} must be a whole number`);
  return n;
};
const optInt = (v, name) => (v === "" || v == null ? null : int(v, name));
const need = (role) => (ctx) => {
  if (!ctx.user) throw new HttpError(401, "Sign in first");
  if (role === "admin" && ctx.user.role !== "admin") throw new HttpError(403, "Only admins can do this");
};
const staff = need("staff"), admin = need("admin");
const studio = (ctx) => { if (ctx.apiScope !== "studio") throw new HttpError(401, "Studio API key required"); };
const who = (ctx) => ({ user: ctx.user });

/* -------------------------------------------------------------- health */
r.get("/healthz", async () => { await query("select 1"); return { ok: true }; });

/* ============================================================ EDITORS */
// Website editor connector — public, but website designs stay "unverified"
// until a signed Shopify order references them, and never touch stock alone.
r.post("/api/website/designs/:id", async (ctx) => {
  const out = await tx((c) => ingestDesign(c, ctx.params.id, ctx.body, { source: "website", actor: "website" }));
  broadcast("designs");
  return { designId: out.designId, revision: out.revision, totalBricks: out.materials.totalBricks };
});

r.get("/api/studio/ping", studio, async () => ({ ok: true }));
r.put("/api/studio/designs/:id", studio, async (ctx) => {
  const out = await tx((c) => ingestDesign(c, ctx.params.id, ctx.body, { source: "studio", actor: "studio", verified: true }));
  broadcast("designs"); if (!out.unchanged) broadcast("orders");
  return { designId: out.designId, revision: out.revision, unchanged: out.unchanged, totalBricks: out.materials.totalBricks };
});
r.get("/api/studio/designs/:id/availability", studio, async (ctx) => tx((c) => designAvailability(c, ctx.params.id)));
r.post("/api/studio/designs/:id/production", studio, async (ctx) => {
  const out = await tx((c) => studioToProduction(c, ctx.params.id, ctx.body || {}));
  broadcast("orders");
  return out;
});

/* ============================================================ SHOPIFY */
r.post("/webhooks/shopify", async (ctx) => {
  const out = await receiveShopifyWebhook({ rawBody: ctx.raw, headers: ctx.req.headers });
  ctx.status = out.status;
  return out.status === 200 ? { ok: true, duplicate: !!out.duplicate } : { error: "rejected" };
});

/* =============================================================== AUTH */
r.post("/api/login", async (ctx) => {
  const s = await login(ctx.body.email, ctx.body.password);
  if (!s) throw new HttpError(401, "Wrong email or password");
  ctx.headers["Set-Cookie"] = sessionCookie(s.token, { secure: ctx.secure });
  await audit(null, { user: s.user, action: "user.login" });
  return { user: s.user };
});
r.post("/api/logout", async (ctx) => {
  await logout(ctx.cookies[COOKIE]);
  ctx.headers["Set-Cookie"] = sessionCookie("", { clear: true, secure: ctx.secure });
  return { ok: true };
});
r.get("/api/me", staff, async (ctx) => ({ user: ctx.user }));
// the dashboard's "am I signed in?" check: answers 200 either way
r.get("/api/session", async (ctx) => ({ user: ctx.user || null }));
r.get("/api/stream", staff, async (ctx) => { subscribe(ctx.res); return ctx.SKIP; });

/* ========================================================== DASHBOARD */
r.get("/api/dashboard", staff, async () => {
  const [totals, cats, low, orders, upcoming, uncounted, attention, recent] = await Promise.all([
    query(`select count(*) filter (where on_hand is not null)::int as counted, count(*)::int as items,
                  coalesce(sum(on_hand) filter (where category = 'brick'), 0)::int as bricks_on_hand,
                  coalesce(sum(reserved) filter (where category = 'brick'), 0)::int as bricks_reserved,
                  coalesce(sum(on_hand - reserved) filter (where category = 'brick' and on_hand is not null), 0)::int as bricks_available
             from items where active`),
    query(`select category, count(*)::int as items, coalesce(sum(on_hand), 0)::int as on_hand, coalesce(sum(reserved), 0)::int as reserved,
                  count(*) filter (where on_hand is null)::int as uncounted
             from items where active group by category`),
    query(`select a.kind, a.message, a.created_at, i.sku, i.name, i.hex, i.on_hand, i.reserved, i.min_level
             from alerts a join items i on i.id = a.item_id where a.resolved_at is null order by a.kind desc, a.created_at`),
    query(`select status, count(*)::int as n from orders where merged_into is null group by status`),
    query(`select i.id, i.sku, i.name, i.category, i.hex, i.on_hand, i.reserved, sum(r.qty)::int as qty
             from reservations r join items i on i.id = r.item_id join orders o on o.id = r.order_id
            where o.status in ('reserved', 'in_production') group by i.id order by i.category, qty desc`),
    query(`select id, sku, name, category, hex from items where active and on_hand is null order by category, sort_order`),
    query(`select id, order_name, source, status, needs_attention from orders where needs_attention is not null and merged_into is null order by updated_at desc limit 20`),
    query(`select m.created_at, m.type, m.delta_on_hand, m.delta_reserved, m.reason, m.actor, i.name, i.sku
             from movements m join items i on i.id = m.item_id order by m.id desc limit 12`),
  ]);
  const byColor = await query(`select sku, name, hex, color_code, on_hand, reserved from items where category = 'brick' and active order by sort_order`);
  return { totals: totals.rows[0], categories: cats.rows, alerts: low.rows, orders: orders.rows, upcoming: upcoming.rows,
           uncounted: uncounted.rows, attention: attention.rows, recent: recent.rows, byColor: byColor.rows };
});

/* ============================================================== ITEMS */
const ITEM_COLS = `i.id, i.sku, i.category, i.name, i.color_code, i.hex, i.supplier_code, i.unit, i.on_hand, i.reserved,
  case when i.on_hand is null then null else i.on_hand - i.reserved end as available, i.min_level, i.active,
  i.counted_at, i.updated_at, i.sort_order,
  (select max(created_at) from movements m where m.item_id = i.id) as last_movement`;
r.get("/api/items", staff, async (ctx) => {
  const cat = ctx.query.get("category");
  const { rows } = await query(`select ${ITEM_COLS} from items i where ($1::text is null or i.category = $1) order by i.category, i.sort_order, i.id`, [cat || null]);
  return { items: rows };
});
r.get("/api/items/:id/history", staff, async (ctx) => {
  const { rows } = await query(
    `select m.*, o.order_name from movements m left join orders o on o.id = m.order_id where m.item_id = $1 order by m.id desc limit 500`, [int(ctx.params.id, "id")]);
  return { movements: rows };
});
r.post("/api/items", admin, async (ctx) => {
  const b = ctx.body;
  const cat = b.category;
  if (!["brick", "tool", "board"].includes(cat)) throw new HttpError(400, "Category must be brick, board or tool");
  if (!b.name || !String(b.name).trim()) throw new HttpError(400, "Name is required");
  const item = await tx(async (c) => {
    let sku, code = null, hex = null;
    if (cat === "brick"){
      code = String(b.colorCode || "").trim();
      hex = String(b.hex || "").trim().toUpperCase();
      if (!/^[0-9A-Za-z]{1,8}$/.test(code)) throw new HttpError(400, "Brick color code is required (e.g. 041)");
      if (!/^#[0-9A-F]{6}$/.test(hex)) throw new HttpError(400, "Hex must look like #A1B2C3");
      sku = "BRK-" + code;
    } else {
      sku = (cat === "tool" ? "TOOL-" : "BOARD-") + String(b.name).trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30);
    }
    const { rows: [n] } = await c.query("select coalesce(max(sort_order), 0) + 1 as n from items where category = $1", [cat]);
    const { rows: [it] } = await c.query(
      `insert into items (sku, category, name, color_code, hex, supplier_code, sort_order, min_level)
       values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      [sku, cat, String(b.name).trim(), code, hex, b.supplierCode || null, n.n, optInt(b.minLevel, "Minimum")]);
    if (cat === "brick"){
      for (const [t, a] of [["memobrick_code", code], ["hex", hex], ["name", it.name.toLowerCase()], ["supplier_code", b.supplierCode]]){
        if (!a) continue;
        const { rowCount } = await c.query("insert into color_aliases (alias_type, alias, item_id) values ($1, $2, $3) on conflict do nothing", [t, a, it.id]);
        if (!rowCount && t !== "name") throw new HttpError(409, `That ${t.replace("_", " ")} already belongs to another color`);
      }
    }
    await audit(c, { user: ctx.user, action: "item.create", entity: "item", entityId: it.id, detail: { sku } });
    return it;
  }).catch((e) => { if (e.code === "23505") throw new HttpError(409, "An item with that code already exists"); throw e; });
  broadcast("items");
  return { item };
});
r.patch("/api/items/:id", admin, async (ctx) => {
  const id = int(ctx.params.id, "id"), b = ctx.body;
  await tx(async (c) => {
    const item = (await lockItems(c, [id])).get(id);
    if (!item) throw new HttpError(404, "Item not found");
    const minLevel = "minLevel" in b ? optInt(b.minLevel, "Minimum") : item.min_level;
    if (minLevel != null && minLevel < 0) throw new HttpError(400, "Minimum can't be negative");
    await c.query("update items set min_level = $2, name = coalesce($3, name), active = coalesce($4, active), updated_at = now() where id = $1",
      [id, minLevel, b.name ? String(b.name).trim() : null, typeof b.active === "boolean" ? b.active : null]);
    Object.assign(item, { min_level: minLevel, active: typeof b.active === "boolean" ? b.active : item.active });
    const { refreshAlerts } = await import("./inventory.js");
    await refreshAlerts(c, item);
    await audit(c, { user: ctx.user, action: "item.update", entity: "item", entityId: id, detail: b });
  });
  broadcast("items");
  return { ok: true };
});
r.post("/api/items/:id/count", admin, async (ctx) => {
  await tx((c) => setCount(c, int(ctx.params.id, "id"), int(ctx.body.onHand, "Count"), { reason: ctx.body.reason, user: ctx.user }));
  broadcast("items"); return { ok: true };
});
r.post("/api/items/:id/adjust", admin, async (ctx) => {
  await tx((c) => adjust(c, int(ctx.params.id, "id"), int(ctx.body.delta, "Adjustment"), { reason: ctx.body.reason, user: ctx.user }));
  broadcast("items"); return { ok: true };
});
// bulk entry: counts and minimums for many items at once. Blank = leave as is.
r.post("/api/items/bulk", admin, async (ctx) => {
  const rows = Array.isArray(ctx.body.rows) ? ctx.body.rows : [];
  const out = await applyBulk(rows, ctx.user, ctx.body.reason || "Bulk stock count");
  broadcast("items"); return out;
});
async function applyBulk(rows, user, reason){
  return tx(async (c) => {
    let counts = 0, mins = 0;
    for (const row of rows){
      const id = int(row.itemId, "itemId");
      if (row.onHand !== "" && row.onHand != null){ await setCount(c, id, int(row.onHand, "Count"), { reason, user }); counts++; }
      if (row.minLevel !== "" && row.minLevel != null && row.minLevel !== undefined){
        const ml = int(row.minLevel, "Minimum");
        if (ml < 0) throw new HttpError(400, "Minimum can't be negative");
        const item = (await lockItems(c, [id])).get(id);
        if (item.min_level !== ml){
          await c.query("update items set min_level = $2, updated_at = now() where id = $1", [id, ml]);
          item.min_level = ml;
          const { refreshAlerts } = await import("./inventory.js");
          await refreshAlerts(c, item); mins++;
        }
      }
    }
    await audit(c, { user, action: "items.bulk", detail: { counts, mins } });
    return { counts, minimums: mins };
  });
}

/* ------------------------------------------------------------- CSV */
r.get("/api/export/items.csv", staff, async (ctx) => {
  const { rows } = await query(`select ${ITEM_COLS} from items i order by i.category, i.sort_order, i.id`);
  ctx.headers["Content-Type"] = "text/csv; charset=utf-8";
  ctx.headers["Content-Disposition"] = 'attachment; filename="memobrick-inventory.csv"';
  return toCSV(rows, [
    { label: "sku", key: "sku" }, { label: "category", key: "category" }, { label: "name", key: "name" },
    { label: "color_code", key: "color_code" }, { label: "hex", key: "hex" }, { label: "supplier_code", key: "supplier_code" },
    { label: "on_hand", key: "on_hand" }, { label: "reserved", key: "reserved" }, { label: "available", key: "available" },
    { label: "min_level", key: "min_level" }, { label: "last_updated", value: (x) => x.last_movement ? new Date(x.last_movement).toISOString() : "" },
  ]);
});
r.get("/api/export/movements.csv", staff, async (ctx) => {
  const { rows } = await query(`select m.*, i.sku, i.name, o.order_name from movements m join items i on i.id = m.item_id
                                  left join orders o on o.id = m.order_id order by m.id desc limit 50000`);
  ctx.headers["Content-Type"] = "text/csv; charset=utf-8";
  ctx.headers["Content-Disposition"] = 'attachment; filename="memobrick-inventory-history.csv"';
  return toCSV(rows, [
    { label: "date", value: (x) => new Date(x.created_at).toISOString() }, { label: "sku", key: "sku" }, { label: "item", key: "name" },
    { label: "type", key: "type" }, { label: "change_on_hand", key: "delta_on_hand" }, { label: "change_reserved", key: "delta_reserved" },
    { label: "on_hand_after", key: "on_hand_after" }, { label: "reserved_after", key: "reserved_after" },
    { label: "order", key: "order_name" }, { label: "reason", key: "reason" }, { label: "by", key: "actor" },
  ]);
});
// CSV columns: sku (or color_code), on_hand, min_level. Blank cells are skipped.
r.post("/api/import/counts", admin, async (ctx) => {
  const rows = parseCSV(String(ctx.body.csv || ""));
  if (rows.length < 2) throw new HttpError(400, "The CSV needs a header row and at least one data row");
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (n) => head.indexOf(n);
  const iSku = col("sku"), iCode = col("color_code"), iOn = col("on_hand"), iMin = col("min_level");
  if (iSku < 0 && iCode < 0) throw new HttpError(400, "The CSV needs a 'sku' or 'color_code' column");
  if (iOn < 0 && iMin < 0) throw new HttpError(400, "The CSV needs an 'on_hand' and/or 'min_level' column");
  const { rows: items } = await query("select id, sku, color_code from items");
  const bySku = new Map(items.map((i) => [i.sku.toUpperCase(), i.id]));
  const byCode = new Map(items.filter((i) => i.color_code).map((i) => [i.color_code, i.id]));
  const errors = [], plan = [];
  rows.slice(1).forEach((row, n) => {
    const sku = iSku >= 0 ? String(row[iSku] || "").trim().toUpperCase() : "";
    let code = iCode >= 0 ? String(row[iCode] || "").trim() : "";
    if (/^\d{1,2}$/.test(code)) code = code.padStart(3, "0");    // Excel drops leading zeros
    const id = (sku && bySku.get(sku)) || (code && byCode.get(code));
    if (!id){ errors.push(`Row ${n + 2}: no item with sku "${sku}" / code "${code}"`); return; }
    const on = iOn >= 0 ? String(row[iOn] || "").replace(/[, ]/g, "").trim() : "";
    const min = iMin >= 0 ? String(row[iMin] || "").replace(/[, ]/g, "").trim() : "";
    if (on && !/^\d+$/.test(on)) errors.push(`Row ${n + 2}: on_hand "${on}" is not a whole number`);
    if (min && !/^\d+$/.test(min)) errors.push(`Row ${n + 2}: min_level "${min}" is not a whole number`);
    plan.push({ itemId: id, onHand: on, minLevel: min });
  });
  if (errors.length) throw new HttpError(400, "Nothing was imported. Fix these rows first:\n" + errors.slice(0, 30).join("\n"));
  const out = await applyBulk(plan, ctx.user, "CSV import");
  broadcast("items");
  return out;
});

/* ============================================================ HISTORY */
r.get("/api/movements", staff, async (ctx) => {
  const q = ctx.query;
  const { rows } = await query(
    `select m.*, i.sku, i.name, i.hex, i.category, o.order_name from movements m join items i on i.id = m.item_id
       left join orders o on o.id = m.order_id
      where ($1::text is null or m.type = $1) and ($2::text is null or i.category = $2)
        and ($3::text is null or i.sku ilike '%' || $3 || '%' or i.name ilike '%' || $3 || '%' or o.order_name ilike '%' || $3 || '%' or m.reason ilike '%' || $3 || '%')
      order by m.id desc limit 300`,
    [q.get("type") || null, q.get("category") || null, q.get("q") || null]);
  return { movements: rows };
});

/* ============================================================= ORDERS */
r.get("/api/orders", staff, async (ctx) => {
  const status = ctx.query.get("status"), q = ctx.query.get("q");
  const { rows } = await query(
    `select o.*, (select count(*)::int from order_lines l where l.order_id = o.id and l.quantity > 0) as lines,
            (select coalesce(sum(r.total_bricks * l.quantity), 0)::int from order_lines l join design_revisions r on r.id = l.revision_id
              where l.order_id = o.id) as bricks,
            (select coalesce(sum(qty), 0)::int from reservations x where x.order_id = o.id) as reserved_units
       from orders o
      where o.merged_into is null and ($1::text is null or o.status = $1 or ($1 = 'attention' and o.needs_attention is not null))
        and ($2::text is null or o.order_name ilike '%' || $2 || '%' or o.customer ilike '%' || $2 || '%' or o.email ilike '%' || $2 || '%')
      order by o.created_at desc limit 300`, [status || null, q || null]);
  return { orders: rows };
});
r.get("/api/orders/:id", staff, async (ctx) => orderDetail(int(ctx.params.id, "id")));
export async function orderDetail(id){
  const { rows: [order] } = await query("select * from orders where id = $1", [id]);
  if (!order) throw new HttpError(404, "Order not found");
  const settings = await getSettings();
  const { rows: lines } = await query(
    `select l.*, r.revision, r.size_label as rev_size, r.studs_w, r.studs_h, r.plates_w, r.plates_h, r.total_bricks, d.source as design_source
       from order_lines l left join design_revisions r on r.id = l.revision_id left join designs d on d.id = l.design_id
      where l.order_id = $1 order by l.id`, [id]);
  const { rows: mats } = await query(
    `select l.id as line_id, i.id as item_id, i.sku, i.name, i.category, i.color_code, i.hex, i.supplier_code, rm.exact_qty, rm.packed_qty, l.quantity
       from order_lines l join revision_materials rm on rm.revision_id = l.revision_id join items i on i.id = rm.item_id
      where l.order_id = $1 order by i.category, rm.exact_qty desc`, [id]);
  const { rows: reservation } = await query(
    `select i.id as item_id, i.sku, i.name, i.category, i.hex, x.qty, i.on_hand, i.reserved from reservations x join items i on i.id = x.item_id where x.order_id = $1 order by i.category, i.sort_order`, [id]);
  const { rows: consumed } = await query(
    `select i.sku, i.name, i.category, i.hex, x.qty from consumptions x join items i on i.id = x.item_id where x.order_id = $1 order by i.category, i.sort_order`, [id]);
  const { rows: history } = await query(
    `select m.created_at, m.type, m.delta_on_hand, m.delta_reserved, m.reason, m.actor, i.sku, i.name from movements m join items i on i.id = m.item_id
      where m.order_id = $1 order by m.id desc limit 300`, [id]);
  // combined requirement with availability, as the packing list
  const need = new Map();
  for (const m of mats){
    const per = m.category === "brick" && settings.brick_quantity_mode !== "exact" ? m.packed_qty : m.exact_qty;
    const cur = need.get(m.item_id) || { ...m, exact: 0, need: 0 };
    cur.exact += m.exact_qty * m.quantity; cur.need += per * m.quantity;
    need.set(m.item_id, cur);
  }
  const { rows: stock } = await query("select id, on_hand, reserved from items where id = any($1)", [[...need.keys()]]);
  const st = new Map(stock.map((s) => [s.id, s]));
  const reservedHere = new Map(reservation.map((x) => [x.item_id, x.qty]));
  const packing = [...need.values()].map((m) => {
    const s = st.get(m.item_id);
    // what's free for THIS order: available to everyone + what this order already holds
    const free = s.on_hand == null ? null : s.on_hand - s.reserved + (reservedHere.get(m.item_id) || 0);
    return { sku: m.sku, name: m.name, category: m.category, code: m.color_code, hex: m.hex, supplier: m.supplier_code,
             exact: m.exact, need: m.need, counted: s.on_hand != null, shortage: free == null ? null : Math.max(0, m.need - free) };
  });
  return { order, lines, packing, reservation, consumed, history, mode: settings.brick_quantity_mode, packSize: settings.brick_pack_size };
}
r.get("/api/orders/:id/packing-list.csv", staff, async (ctx) => {
  const d = await orderDetail(int(ctx.params.id, "id"));
  ctx.headers["Content-Type"] = "text/csv; charset=utf-8";
  ctx.headers["Content-Disposition"] = `attachment; filename="packing-list-${(d.order.order_name || d.order.id).toString().replace(/[^\w-]/g, "")}.csv"`;
  return toCSV(d.packing, [
    { label: "category", key: "category" }, { label: "sku", key: "sku" }, { label: "memobrick_code", key: "code" },
    { label: "supplier_code", key: "supplier" }, { label: "item", key: "name" }, { label: "bricks_in_design", value: (x) => x.category === "brick" ? x.exact : "" },
    { label: "pick_quantity", key: "need" }, { label: "picked", value: () => "" },
  ]);
});
r.post("/api/orders/:id/status", staff, async (ctx) => {
  const status = String(ctx.body.status || "");
  const adminOnly = ["cancelled", "pending"].includes(status);
  if (adminOnly && ctx.user.role !== "admin") throw new HttpError(403, "Only admins can cancel or un-reserve orders");
  await tx(async (c) => {
    await setOrderStatus(c, int(ctx.params.id, "id"), status, who(ctx));
    await audit(c, { user: ctx.user, action: "order.status", entity: "order", entityId: ctx.params.id, detail: { status } });
  });
  broadcast("orders"); broadcast("items");
  return orderDetail(int(ctx.params.id, "id"));
});
r.post("/api/orders/:id/return", admin, async (ctx) => {
  await tx((c) => returnMaterials(c, int(ctx.params.id, "id"), who(ctx), ctx.body.reason));
  broadcast("orders"); broadcast("items");
  return orderDetail(int(ctx.params.id, "id"));
});
r.post("/api/orders/:id/lines/:line/design", admin, async (ctx) => {
  await tx((c) => assignLineDesign(c, int(ctx.params.id, "id"), int(ctx.params.line, "line"), String(ctx.body.designId || "").trim(), ctx.user));
  broadcast("orders"); broadcast("items");
  return orderDetail(int(ctx.params.id, "id"));
});
r.post("/api/orders/:id/resolve", admin, async (ctx) => {
  await query("update orders set needs_attention = null, updated_at = now() where id = $1", [int(ctx.params.id, "id")]);
  await audit(null, { user: ctx.user, action: "order.resolve", entity: "order", entityId: ctx.params.id });
  broadcast("orders");
  return { ok: true };
});

/* ========================================================== PRODUCTION */
r.get("/api/production", staff, async () => {
  const { rows } = await query(
    `select id from orders where merged_into is null and status in ('reserved', 'in_production') order by placed_at nulls last, id`);
  const orders = [];
  for (const o of rows) orders.push(await orderDetail(o.id));
  return { orders };
});

/* ============================================================= DESIGNS */
r.get("/api/designs", staff, async (ctx) => {
  const q = ctx.query.get("q");
  const { rows } = await query(
    `select d.*, r.size_label, r.total_bricks, r.created_at as revised_at,
            (select string_agg(distinct o.order_name, ', ') from order_lines l join orders o on o.id = l.order_id where l.design_id = d.id) as orders
       from designs d left join design_revisions r on r.design_id = d.id and r.revision = d.current_revision
      where ($1::text is null or d.id ilike '%' || $1 || '%' or d.title ilike '%' || $1 || '%' or d.order_ref ilike '%' || $1 || '%' or d.customer ilike '%' || $1 || '%')
        and (d.source = 'studio' or d.verified or $2)
      order by d.updated_at desc limit 200`, [q || null, ctx.query.get("all") === "1"]);
  return { designs: rows };
});
r.get("/api/designs/:id", staff, async (ctx) => {
  const id = ctx.params.id;
  const avail = await tx((c) => designAvailability(c, id));
  const { rows: revisions } = await query(
    `select r.id, r.revision, r.size_label, r.total_bricks, r.editor, r.created_at,
            (select count(*)::int from revision_materials m join items i on i.id = m.item_id where m.revision_id = r.id and i.category = 'brick') as colors
       from design_revisions r where r.design_id = $1 order by r.revision desc`, [id]);
  const { rows: orders } = await query(
    `select distinct o.id, o.order_name, o.status, l.revision_id from order_lines l join orders o on o.id = l.order_id where l.design_id = $1`, [id]);
  return { ...avail, revisions, orders };
});
// the exact brick matrix of a revision (for previews / audits)
r.get("/api/designs/:id/revisions/:rev/matrix", staff, async (ctx) => {
  const { rows: [r] } = await query("select studs_w, studs_h, palette, matrix from design_revisions where design_id = $1 and revision = $2",
    [ctx.params.id, int(ctx.params.rev, "revision")]);
  if (!r) throw new HttpError(404, "Revision not found");
  return { w: r.studs_w, h: r.studs_h, palette: r.palette, cells: r.matrix.toString("base64") };
});

/* ========================================================== RESTOCKING */
r.get("/api/restocks", staff, async () => {
  const { rows } = await query(
    `select r.*, u.name as user_name,
            json_agg(json_build_object('sku', i.sku, 'name', i.name, 'qty', l.qty, 'hex', i.hex) order by i.category, i.sort_order) as lines
       from restocks r left join users u on u.id = r.user_id join restock_lines l on l.restock_id = r.id join items i on i.id = l.item_id
      group by r.id, u.name order by r.id desc limit 200`);
  return { restocks: rows };
});
r.post("/api/restocks", staff, async (ctx) => {
  const out = await tx((c) => restock(c, { ...ctx.body, user: ctx.user }));
  broadcast("items");
  return { restock: out };
});

/* ============================================================= REPORTS */
r.get("/api/reports", staff, async (ctx) => {
  const days = Math.min(730, Math.max(7, Number(ctx.query.get("days")) || 90));
  const [mostUsed, consumedTotal, byOrder, overTime, needs, low] = await Promise.all([
    query(`select i.sku, i.name, i.hex, -sum(m.delta_on_hand)::int as consumed
             from movements m join items i on i.id = m.item_id
            where m.type = 'consume' and i.category = 'brick' and m.created_at > now() - ($1 || ' days')::interval
            group by i.id order by consumed desc`, [String(days)]),
    query(`select coalesce(-sum(m.delta_on_hand) filter (where i.category = 'brick'), 0)::int as bricks,
                  coalesce(-sum(m.delta_on_hand) filter (where i.category = 'board'), 0)::int as boards,
                  coalesce(-sum(m.delta_on_hand) filter (where i.category = 'tool'), 0)::int as tools,
                  count(distinct m.order_id)::int as orders
             from movements m join items i on i.id = m.item_id where m.type = 'consume' and m.created_at > now() - ($1 || ' days')::interval`, [String(days)]),
    query(`select o.id, o.order_name, o.source, o.updated_at,
                  coalesce(sum(x.qty) filter (where i.category = 'brick'), 0)::int as bricks,
                  coalesce(sum(x.qty) filter (where i.category = 'board'), 0)::int as boards,
                  coalesce(sum(x.qty) filter (where i.category = 'tool'), 0)::int as tools
             from consumptions x join orders o on o.id = x.order_id join items i on i.id = x.item_id
            where o.updated_at > now() - ($1 || ' days')::interval group by o.id order by o.updated_at desc limit 100`, [String(days)]),
    query(`select date_trunc('week', m.created_at)::date as week,
                  -sum(m.delta_on_hand) filter (where i.category = 'brick')::int as bricks,
                  -sum(m.delta_on_hand) filter (where i.category = 'board')::int as boards
             from movements m join items i on i.id = m.item_id
            where m.type = 'consume' and m.created_at > now() - ($1 || ' days')::interval group by 1 order by 1`, [String(days)]),
    purchaseNeeds(),
    query(`select i.sku, i.name, i.hex, i.on_hand, i.reserved, i.min_level, a.kind from alerts a join items i on i.id = a.item_id where a.resolved_at is null order by a.kind desc, i.sort_order`),
  ]);
  return { days, mostUsed: mostUsed.rows, consumed: consumedTotal.rows[0], byOrder: byOrder.rows, overTime: overTime.rows, needs, low: low.rows };
});

/* What to buy: reserved orders + unpaid orders + minimum level − on hand. */
export async function purchaseNeeds(){
  const s = await getSettings();
  const col = s.brick_quantity_mode === "exact" ? "exact_qty" : "packed_qty";
  const { rows } = await query(
    `with pending as (
       select rm.item_id, sum(case when i.category = 'brick' then rm.${col} else rm.exact_qty end * l.quantity)::int as qty
         from orders o join order_lines l on l.order_id = o.id join revision_materials rm on rm.revision_id = l.revision_id
         join items i on i.id = rm.item_id
        where o.status = 'pending' and o.merged_into is null group by rm.item_id)
     select i.id, i.sku, i.name, i.category, i.hex, i.on_hand, i.reserved, i.min_level, coalesce(p.qty, 0) as pending_qty
       from items i left join pending p on p.item_id = i.id where i.active order by i.category, i.sort_order`);
  return rows.map((r) => {
    const demand = r.reserved + r.pending_qty + (r.min_level || 0);
    return { ...r, demand, buy: r.on_hand == null ? null : Math.max(0, demand - r.on_hand) };
  });
}

/* ============================================================ SETTINGS */
r.get("/api/settings", staff, async () => {
  const settings = await getSettings();
  const { rows: sizes } = await query("select * from size_specs order by studs_w * studs_h, size_id");
  const { rows: tools } = await query("select sku, name from items where category = 'tool' and active order by sort_order");
  return { settings, sizes, tools, defaults: DEFAULT_SETTINGS,
           integrations: { shopifySecret: !!process.env.SHOPIFY_WEBHOOK_SECRET, shop: process.env.SHOPIFY_SHOP_DOMAIN || null,
                           alertWebhook: !!process.env.ALERT_WEBHOOK_URL, origins: (process.env.CORS_ORIGINS || "").split(",").filter(Boolean) } };
});
r.put("/api/settings", admin, async (ctx) => {
  const b = ctx.body, allowed = {};
  if ("brick_quantity_mode" in b){
    if (!["packed", "exact"].includes(b.brick_quantity_mode)) throw new HttpError(400, "Mode must be packed or exact");
    allowed.brick_quantity_mode = b.brick_quantity_mode;
  }
  if ("brick_pack_size" in b){ const n = int(b.brick_pack_size, "Pack size"); if (n < 1) throw new HttpError(400, "Pack size must be at least 1"); allowed.brick_pack_size = n; }
  if ("tools_per_kit" in b){
    const t = {};
    for (const [k, v] of Object.entries(b.tools_per_kit || {})){ const n = int(v, "Tools per kit"); if (n < 0) throw new HttpError(400, "Tools can't be negative"); t[k] = n; }
    allowed.tools_per_kit = t;
  }
  await tx(async (c) => {
    for (const [k, v] of Object.entries(allowed))
      await c.query("insert into settings (key, value) values ($1, $2) on conflict (key) do update set value = excluded.value", [k, JSON.stringify(v)]);
    await audit(c, { user: ctx.user, action: "settings.update", detail: allowed });
  });
  return { ok: true, note: "Applies to designs saved from now on. Existing designs keep the materials they were saved with." };
});
r.get("/api/users", admin, async () => ({ users: (await query("select id, email, name, role, active, created_at from users order by id")).rows,
  keys: (await query("select id, name, scope, created_at, revoked_at from api_keys order by id")).rows }));
r.post("/api/users", admin, async (ctx) => {
  const u = await createUser(ctx.body).catch((e) => { throw new HttpError(400, e.code === "23505" ? "That email already has an account" : e.message); });
  await audit(null, { user: ctx.user, action: "user.create", entity: "user", entityId: u.id, detail: { email: u.email, role: u.role } });
  return { user: u };
});
r.patch("/api/users/:id", admin, async (ctx) => {
  const id = int(ctx.params.id, "id");
  if (id === ctx.user.id && ctx.body.active === false) throw new HttpError(400, "You can't deactivate yourself");
  await query("update users set active = coalesce($2, active), role = coalesce($3, role) where id = $1",
    [id, typeof ctx.body.active === "boolean" ? ctx.body.active : null, ["admin", "production"].includes(ctx.body.role) ? ctx.body.role : null]);
  if (ctx.body.active === false) await query("delete from sessions where user_id = $1", [id]);
  await audit(null, { user: ctx.user, action: "user.update", entity: "user", entityId: id, detail: ctx.body });
  return { ok: true };
});
r.post("/api/api-keys", admin, async (ctx) => {
  const key = await createApiKey(String(ctx.body.name || "MemoBrick Studio").slice(0, 60), "studio");
  await audit(null, { user: ctx.user, action: "apikey.create", detail: { name: ctx.body.name } });
  return { key, note: "Copy this key now — it is not shown again." };
});
r.post("/api/api-keys/:id/revoke", admin, async (ctx) => {
  await query("update api_keys set revoked_at = now() where id = $1", [int(ctx.params.id, "id")]);
  return { ok: true };
});

/* ========================================================= OPERATIONS */
r.get("/api/reconcile", staff, async () => tx((c) => reconcile(c)));
r.post("/api/reconcile/fix", admin, async (ctx) => {
  const out = await tx((c) => reconcile(c, { fix: true, user: ctx.user }));
  broadcast("items"); return out;
});
r.get("/api/integration-log", admin, async () => ({
  webhooks: (await query("select id, topic, status, attempts, last_error, received_at, processed_at from webhook_events order by received_at desc limit 100")).rows,
  errors: (await query("select * from error_log order by id desc limit 100")).rows,
  audit: (await query("select * from audit_log order by id desc limit 100")).rows,
}));
r.post("/api/webhooks/:id/retry", admin, async (ctx) => {
  await query("update webhook_events set status = 'failed', next_try_at = now() where id = $1 and status <> 'done'", [ctx.params.id]);
  return (await processEvent(ctx.params.id)) || { ok: true };
});

export { InventoryError, move };
