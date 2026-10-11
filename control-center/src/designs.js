/* =====================================================================
   Design ingestion — the one place brick requirements are computed.

   Both editors send the FINAL brick matrix they generated (one palette
   index per stud) plus the palette they used. The server counts the bricks
   itself from that matrix; it never trusts a total sent by a browser and
   never estimates from image colors. Colors are resolved through the alias
   table, so both editors land on the same inventory SKUs, and a color that
   can't be mapped is rejected rather than invented.
   ===================================================================== */
import crypto from "node:crypto";
import { boardFor, getSettings } from "./catalog.js";
import { InventoryError, syncReservations } from "./inventory.js";
import { audit } from "./log.js";

const MAX_STUDS = 320 * 320;          // 10 × 10 plates — the Studio's custom-size limit

export async function resolveColor(c, entry){
  const [code, name, hex, supplier] = entry;
  const tries = [["memobrick_code", code], ["supplier_code", supplier], ["hex", hex && String(hex).toUpperCase()], ["name", name && String(name).toLowerCase()]];
  for (const [type, alias] of tries){
    if (!alias) continue;
    const { rows } = await c.query(
      `select i.* from color_aliases a join items i on i.id = a.item_id where a.alias_type = $1 and a.alias = $2`, [type, String(alias)]);
    if (rows[0]) return rows[0];
  }
  return null;
}

/* Validate + decode the editor payload into an exact bill of materials. */
export async function computeMaterials(c, body){
  const size = body.size || {};
  const gw = Number(size.gw), gh = Number(size.gh), bx = Number(size.bx), by = Number(size.by);
  if (![gw, gh, bx, by].every((n) => Number.isInteger(n) && n > 0)) throw new InventoryError("Design size is missing studs or baseplates", 422);
  if (gw * gh > MAX_STUDS) throw new InventoryError("Design is larger than any buildable kit", 422);
  const board = boardFor(gw, gh, bx, by);
  if (!board) throw new InventoryError(`Unknown board layout for ${gw}×${gh} studs on ${bx}×${by} plates`, 422);
  if (!Array.isArray(body.palette) || !body.palette.length || body.palette.length > 255) throw new InventoryError("Design palette is missing", 422);
  let matrix;
  try { matrix = Buffer.from(String(body.cells || ""), "base64"); } catch { matrix = Buffer.alloc(0); }
  if (matrix.length !== gw * gh) throw new InventoryError(`Brick matrix has ${matrix.length} cells, expected ${gw * gh}`, 422);

  // count every stud of the final matrix
  const perIndex = new Array(body.palette.length).fill(0);
  for (let i = 0; i < matrix.length; i++){
    const k = matrix[i];
    if (k >= perIndex.length) throw new InventoryError(`Brick matrix references color #${k}, which isn't in the palette`, 422);
    perIndex[k]++;
  }
  const settings = await getSettings(c);
  const pack = Math.max(1, Number(settings.brick_pack_size) || 100);
  const bricks = new Map();            // item_id → { item, exact }
  const unknown = [];
  for (let k = 0; k < perIndex.length; k++){
    if (!perIndex[k]) continue;
    const item = await resolveColor(c, body.palette[k]);
    if (!item){ unknown.push(body.palette[k]); continue; }
    const cur = bricks.get(item.id) || { item, exact: 0 };
    cur.exact += perIndex[k];
    bricks.set(item.id, cur);
  }
  if (unknown.length) throw new InventoryError(
    "The design uses colors that aren't in the inventory catalog: " + unknown.map((u) => `${u[1] || "?"} (${u[0] || u[2]})`).join(", ") +
    ". Add them under Brick Inventory → New color (or map them) first.", 422, { unknown });

  const lines = [...bricks.values()].map(({ item, exact }) => ({ itemId: item.id, sku: item.sku, exact, packed: Math.ceil(exact / pack) * pack }));
  const { rows: [boardItem] } = await c.query("select id, sku from items where sku = $1", [board.sku]);
  lines.push({ itemId: boardItem.id, sku: boardItem.sku, exact: board.count, packed: board.count });
  for (const [sku, n] of Object.entries(settings.tools_per_kit || {})){
    if (!n) continue;
    const { rows: [t] } = await c.query("select id, sku from items where sku = $1 and active", [sku]);
    if (t) lines.push({ itemId: t.id, sku: t.sku, exact: Number(n), packed: Number(n) });
  }
  const sizeId = String(size.id || `${bx * 10}x${by * 10}`).slice(0, 20);
  const codes = body.palette.map((p) => String(p[0] || p[2] || ""));
  const checksum = crypto.createHash("sha256")
    .update(JSON.stringify([gw, gh, bx, by, codes])).update(matrix).digest("hex");
  return {
    size: { id: sizeId, label: String(size.label || sizeId).slice(0, 40), gw, gh, bx, by }, board,
    matrix, palette: body.palette.map((p) => [String(p[0] || ""), String(p[1] || ""), String(p[2] || "")]),
    totalBricks: matrix.length, lines, checksum,
  };
}

/* Store a design (new or updated). Unchanged designs don't create a new
   revision; every real change keeps the previous revision for audit. */
export async function ingestDesign(c, designId, body, { source, actor, verified = false }){
  if (!/^[A-Za-z0-9_-]{4,80}$/.test(designId || "")) throw new InventoryError("Invalid design id", 422);
  const m = await computeMaterials(c, body);
  await c.query("select pg_advisory_xact_lock(hashtext('design:' || $1))", [designId]);
  const { rows: [existing] } = await c.query("select * from designs where id = $1", [designId]);
  if (existing && existing.source !== source) throw new InventoryError("This design id belongs to the other editor", 409);
  // a website design that a paid order already uses is frozen: the public
  // endpoint can't change what a customer bought
  if (existing && source === "website" && existing.verified) throw new InventoryError("This design is already part of an order and can't be changed", 409);
  const meta = {
    title: body.title ? String(body.title).slice(0, 120) : null,
    orderRef: body.orderRef ? String(body.orderRef).slice(0, 40) : null,
    customer: body.customer ? String(body.customer).slice(0, 120) : null,
    externalRef: body.projectId ? String(body.projectId).slice(0, 80) : null,
  };
  if (!existing){
    await c.query(
      `insert into designs (id, source, external_ref, title, order_ref, customer, verified) values ($1, $2, $3, $4, $5, $6, $7)`,
      [designId, source, meta.externalRef, meta.title, meta.orderRef, meta.customer, verified]);
  } else {
    await c.query(
      `update designs set title = coalesce($2, title), order_ref = coalesce($3, order_ref), customer = coalesce($4, customer),
              verified = verified or $5, updated_at = now() where id = $1`,
      [designId, meta.title, meta.orderRef, meta.customer, verified]);
  }
  const { rows: [same] } = await c.query("select * from design_revisions where design_id = $1 and checksum = $2", [designId, m.checksum]);
  if (same && existing && existing.current_revision === same.revision)
    return { designId, revision: same.revision, revisionId: same.id, unchanged: true, materials: m };

  let rev;
  if (same){
    // the designer went back to an earlier version: make it current again
    rev = same;
  } else {
    const next = (existing ? existing.current_revision : 0) + 1;
    const { rows: [r] } = await c.query(
      `insert into design_revisions (design_id, revision, size_id, size_label, studs_w, studs_h, plates_w, plates_h,
                                     total_bricks, matrix, palette, checksum, editor)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) returning *`,
      [designId, next, m.size.id, m.size.label, m.size.gw, m.size.gh, m.size.bx, m.size.by, m.totalBricks,
       m.matrix, JSON.stringify(m.palette), m.checksum, body.editor ? String(body.editor).slice(0, 60) : null]);
    for (const l of m.lines) await c.query(
      `insert into revision_materials (revision_id, item_id, exact_qty, packed_qty) values ($1, $2, $3, $4)`,
      [r.id, l.itemId, l.exact, l.packed]);
    rev = r;
  }
  await c.query("update designs set current_revision = $2, updated_at = now() where id = $1", [designId, rev.revision]);
  await ensureSizeSpec(c, m);
  await audit(c, { actor, action: same ? "design.revert" : "design.revision", entity: "design", entityId: designId,
                   detail: { revision: rev.revision, size: m.size.id, bricks: m.totalBricks } });
  await afterDesignChange(c, designId, rev, source, actor);
  return { designId, revision: rev.revision, revisionId: rev.id, unchanged: false, materials: m };
}

/* custom Studio sizes get a size spec too, so reports can name them */
async function ensureSizeSpec(c, m){
  await c.query(
    `insert into size_specs (size_id, label, studs_w, studs_h, board_sku, boards, source)
     values ($1, $2, $3, $4, $5, $6, 'custom') on conflict (size_id) do nothing`,
    [m.size.id, m.size.label, m.size.gw, m.size.gh, m.board.sku, m.board.count]);
}

/* Order lines that were waiting for this design get it now. Lines already
   pinned keep their revision (the customer bought that one), EXCEPT Studio
   designs: the Studio is the production editor, so a designer's change
   updates orders that haven't been packed yet. */
async function afterDesignChange(c, designId, rev, source, actor){
  const { rows } = await c.query(
    `select ol.id, ol.order_id, ol.revision_id, o.status from order_lines ol join orders o on o.id = ol.order_id
      where ol.design_id = $1`, [designId]);
  const touched = new Set();
  for (const l of rows){
    const open = !["packed", "shipped", "cancelled"].includes(l.status);
    if (l.revision_id == null || (source === "studio" && open && l.revision_id !== rev.id)){
      await c.query("update order_lines set revision_id = $2, updated_at = now() where id = $1", [l.id, rev.id]);
      touched.add(l.order_id);
      await c.query("update designs set verified = true where id = $1", [designId]);
    }
  }
  for (const orderId of touched){
    const { rows: [{ n }] } = await c.query("select count(*)::int as n from order_lines where order_id = $1 and revision_id is null and quantity > 0", [orderId]);
    await c.query("update orders set needs_attention = case when $2 > 0 then needs_attention else null end, updated_at = now() where id = $1", [orderId, n]);
    await syncReservations(c, orderId, { actor });
  }
}

/* requirements + live availability for a design's current revision */
export async function designAvailability(c, designId){
  const { rows: [d] } = await c.query("select * from designs where id = $1", [designId]);
  if (!d) throw new InventoryError("Design not found", 404);
  const settings = await getSettings(c);
  const { rows } = await c.query(
    `select i.id, i.sku, i.name, i.category, i.color_code, i.hex, i.on_hand, i.reserved, rm.exact_qty, rm.packed_qty,
            r.revision, r.size_label, r.total_bricks, r.studs_w, r.studs_h
       from design_revisions r join revision_materials rm on rm.revision_id = r.id join items i on i.id = rm.item_id
      where r.design_id = $1 and r.revision = $2
      order by i.category, rm.exact_qty desc`, [designId, d.current_revision]);
  const lines = rows.map((r) => {
    const need = r.category === "brick" && settings.brick_quantity_mode !== "exact" ? r.packed_qty : r.exact_qty;
    const available = r.on_hand == null ? null : r.on_hand - r.reserved;
    return { sku: r.sku, name: r.name, category: r.category, code: r.color_code, hex: r.hex, exact: r.exact_qty,
             packed: r.packed_qty, need, available, counted: r.on_hand != null,
             shortage: available == null ? null : Math.max(0, need - available) };
  });
  return {
    design: d, revision: rows[0] ? rows[0].revision : null, size: rows[0] ? rows[0].size_label : null,
    totalBricks: rows[0] ? rows[0].total_bricks : null, mode: settings.brick_quantity_mode, lines,
    ok: lines.every((l) => l.counted && l.shortage === 0),
    shortages: lines.filter((l) => l.shortage > 0), uncounted: lines.filter((l) => !l.counted),
  };
}
