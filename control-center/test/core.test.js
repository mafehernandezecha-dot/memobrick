import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { tx } from "../src/db.js";
import { ingestDesign, designAvailability } from "../src/designs.js";
import { studioToProduction } from "../src/orders.js";
import { setCount, packOrder, setOrderStatus, returnMaterials, reconcile, restock, adjust } from "../src/inventory.js";
import { receiveShopifyWebhook } from "../src/webhooks.js";
import { BRICKS, SIZES } from "../src/catalog.js";
import { purchaseNeeds } from "../src/api.js";
import { pruneAbandonedDesigns } from "../src/server.js";
import { freshDb, query, closePool, designPayload, shopifyOrder, signedWebhook, item, countAll, wait } from "./helpers.js";

const THEME = "../memobrick-size-zoom-test-latest (2)/assets/";

async function deliver(payload, opts){
  const out = await receiveShopifyWebhook(signedWebhook(payload, opts));
  if (out.status !== 200 || out.duplicate) return out;
  for (let i = 0; i < 100; i++){
    const { rows: [e] } = await query("select status from webhook_events where id = $1", [out.id]);
    if (e.status === "done" || e.status === "failed") return { ...out, eventStatus: e.status };
    await wait(20);
  }
  throw new Error("webhook not processed");
}
const reservedOf = async (orderId) => Object.fromEntries((await query(
  "select i.sku, r.qty from reservations r join items i on i.id = r.item_id where order_id = $1", [orderId])).rows.map((r) => [r.sku, r.qty]));
const orderBy = async (shopifyId) => (await query("select * from orders where shopify_order_id = $1", [shopifyId])).rows[0];

before(freshDb);
after(closePool);

/* ------------------------------------------------------------ catalog */
test("seeded colors are exactly the editors' palette (website source, live build, Studio)", () => {
  const re = /\["([A-Za-z ]+)","(#[0-9A-F]{6})","(\d{3})","([0-9A-Z]+)"\]/g;
  for (const file of [THEME + "memobrick.src.js", THEME + "memobrick.js", "../memobrick-editor/assets/memobrick.js"]){
    const found = [...fs.readFileSync(file, "utf8").matchAll(re)].slice(0, 40).map((m) => [m[1], m[2], m[3], m[4]]);
    assert.deepEqual(found, BRICKS, file);
  }
});
test("seeded sizes match the editors' SIZES table", () => {
  const src = fs.readFileSync(THEME + "memobrick.src.js", "utf8");
  const found = [...src.matchAll(/id:"([0-9x]+)", label:'[^']+', gw:\s*(\d+),\s*gh:\s*(\d+),\s*bx:(\d), by:(\d)/g)].map((m) => [m[1], +m[2], +m[3], +m[4], +m[5]]);
  assert.equal(found.length, 22);
  assert.deepEqual(found.sort(), SIZES.slice().sort());
});
test("every item starts uncounted (blank, not zero)", async () => {
  const { rows } = await query("select count(*)::int as n, count(on_hand)::int as counted from items");
  assert.equal(rows[0].n, 43);
  assert.equal(rows[0].counted, 0);
});

/* ------------------------------------------------------------ designs */
test("brick requirements are counted from the exact matrix", async () => {
  const p = designPayload({ counts: [4096 - 1000, 700, 300] });
  const out = await tx((c) => ingestDesign(c, "MB-20261010-TEST0001", p, { source: "website", actor: "test" }));
  assert.equal(out.revision, 1);
  const lines = Object.fromEntries(out.materials.lines.map((l) => [l.sku, [l.exact, l.packed]]));
  assert.deepEqual(lines["BRK-037"], [3096, 3100]);
  assert.deepEqual(lines["BRK-001"], [700, 700]);
  assert.deepEqual(lines["BRK-026"], [300, 300]);
  assert.deepEqual(lines["BOARD-10"], [4, 4]);
  assert.deepEqual(lines["TOOL-SEPARATOR"], [1, 1]);
  assert.equal(lines["BOARD-16"], undefined);
});
test("16×16 uses one 16×16 board", async () => {
  const p = designPayload({ size: { id: "16x16", label: '16 × 16"', gw: 50, gh: 50, bx: 1, by: 1 }, counts: [2000, 400, 100] });
  const out = await tx((c) => ingestDesign(c, "MB-16X16-TEST", p, { source: "website", actor: "test" }));
  const skus = out.materials.lines.map((l) => l.sku);
  assert.ok(skus.includes("BOARD-16") && !skus.includes("BOARD-10"));
});
test("colors map by code, supplier code, hex or name onto one SKU", async () => {
  const p = designPayload({ palette: [["", "white", "#fefefe"], ["", "", "", "26"], ["026", "Red", "#BD3A32"]], counts: [3000, 596, 500] });
  p.palette[1] = ["", "", "", "26"];
  const out = await tx((c) => ingestDesign(c, "MB-ALIAS-TEST", p, { source: "website", actor: "test" }));
  const m = Object.fromEntries(out.materials.lines.map((l) => [l.sku, l.exact]));
  assert.equal(m["BRK-037"], 3000);
  assert.equal(m["BRK-001"], 596);    // supplier code 26 = Black
  assert.equal(m["BRK-026"], 500);
});
test("unknown colors and malformed matrices are rejected, never invented", async () => {
  const bad = designPayload({ palette: [["099", "Neon", "#00FF00"], ["001", "Black", "#111011"], ["026", "Red", "#BD3A32"]] });
  await assert.rejects(tx((c) => ingestDesign(c, "MB-BAD-1", bad, { source: "website", actor: "test" })), /aren't in the inventory catalog/);
  const short = designPayload({}); short.cells = Buffer.alloc(100).toString("base64");
  await assert.rejects(tx((c) => ingestDesign(c, "MB-BAD-2", short, { source: "website", actor: "test" })), /expected 4096/);
  const weird = designPayload({ size: { id: "x", label: "x", gw: 40, gh: 40, bx: 1, by: 1 }, counts: [1000, 400, 200] });
  await assert.rejects(tx((c) => ingestDesign(c, "MB-BAD-3", weird, { source: "website", actor: "test" })), /Unknown board layout/);
});
test("saving the same design twice keeps one revision; a change adds a revision and keeps the old one", async () => {
  const id = "ST-proj-revs";
  const a = designPayload({ counts: [3000, 596, 500] });
  const r1 = await tx((c) => ingestDesign(c, id, a, { source: "studio", actor: "studio" }));
  const r1b = await tx((c) => ingestDesign(c, id, a, { source: "studio", actor: "studio" }));
  assert.equal(r1.revision, 1); assert.equal(r1b.revision, 1); assert.ok(r1b.unchanged);
  const r2 = await tx((c) => ingestDesign(c, id, designPayload({ counts: [2900, 696, 500] }), { source: "studio", actor: "studio" }));
  assert.equal(r2.revision, 2);
  const { rows } = await query("select revision from design_revisions where design_id = $1 order by revision", [id]);
  assert.deepEqual(rows.map((r) => r.revision), [1, 2]);
});

/* ------------------------------------------------------------ shopify */
test("bad HMAC is rejected", async () => {
  const out = await receiveShopifyWebhook(signedWebhook(shopifyOrder(), { secret: "wrong" }));
  assert.equal(out.status, 401);
});
test("unpaid order: no reservation; paid: reserves the exact packed quantities once", async () => {
  await deliver(shopifyOrder({ financial: "pending" }), { topic: "orders/create" });
  let o = await orderBy(5001);
  assert.equal(o.status, "pending");
  assert.deepEqual(await reservedOf(o.id), {});
  const paid = shopifyOrder({ financial: "paid" });
  await deliver(paid, { topic: "orders/paid" });
  await deliver(paid, { topic: "orders/updated" });          // same facts, different event
  o = await orderBy(5001);
  assert.equal(o.status, "reserved");
  assert.deepEqual(await reservedOf(o.id), { "BRK-037": 3100, "BRK-001": 700, "BRK-026": 300, "BOARD-10": 4, "TOOL-SEPARATOR": 1 });
  assert.equal((await item("BRK-037")).reserved, 3100);
  // the design is now pinned and verified
  const { rows: [l] } = await query("select revision_id from order_lines where order_id = $1", [o.id]);
  assert.ok(l.revision_id);
});
test("the exact same webhook delivered twice is processed once", async () => {
  const p = shopifyOrder({ financial: "paid" });
  const first = await deliver(p, { id: "dup-1" });
  const again = await deliver(p, { id: "dup-1" });
  assert.equal(first.status, 200); assert.ok(again.duplicate);
  assert.equal((await item("BRK-037")).reserved, 3100);
});
test("an older event arriving late doesn't overwrite a newer one", async () => {
  const before = (await orderBy(5001)).status;
  const out = await deliver(shopifyOrder({ financial: "pending", updatedAt: "2020-01-01T00:00:00Z" }));
  assert.equal(out.eventStatus, "done");
  assert.equal((await orderBy(5001)).status, before);
});
test("order edit: quantity 2 doubles the reservation, removing the line releases it", async () => {
  const lines = [{ id: 9001, title: "Mosaic", quantity: 1, current_quantity: 2, properties: [{ name: "Design ID", value: "MB-20261010-TEST0001" }] }];
  await deliver(shopifyOrder({ lines }));
  const o = await orderBy(5001);
  assert.equal((await reservedOf(o.id))["BRK-037"], 6200);
  await deliver(shopifyOrder({ lines: [{ ...lines[0], current_quantity: 1 }] }));
  assert.equal((await reservedOf(o.id))["BRK-037"], 3100);
});
test("order before design: waits, then reserves when the design arrives", async () => {
  const lines = [{ id: 9101, title: "Mosaic", quantity: 1, properties: [{ name: "Design ID", value: "MB-LATE-0001" }] }];
  await deliver(shopifyOrder({ id: 5002, name: "#1002", lines }));
  let o = await orderBy(5002);
  assert.equal(o.status, "reserved");
  assert.match(o.needs_attention, /Waiting for design MB-LATE-0001/);
  assert.deepEqual(await reservedOf(o.id), {});
  await tx((c) => ingestDesign(c, "MB-LATE-0001", designPayload({ counts: [3500, 396, 200] }), { source: "website", actor: "website" }));
  o = await orderBy(5002);
  assert.equal(o.needs_attention, null);
  assert.equal((await reservedOf(o.id))["BRK-037"], 3500);
});
test("a purchased website design can't be changed through the public endpoint", async () => {
  await assert.rejects(tx((c) => ingestDesign(c, "MB-LATE-0001", designPayload({ counts: [3000, 896, 200] }), { source: "website", actor: "website" })), /already part of an order/);
});
test("refund cancels the order and releases its reservation", async () => {
  await deliver(shopifyOrder({ id: 5002, name: "#1002", financial: "refunded",
    lines: [{ id: 9101, quantity: 1, properties: [{ name: "Design ID", value: "MB-LATE-0001" }] }] }));
  const o = await orderBy(5002);
  assert.equal(o.status, "cancelled");
  assert.deepEqual(await reservedOf(o.id), {});
});
test("orders without a MemoBrick design are ignored", async () => {
  const out = await deliver(shopifyOrder({ id: 5099, lines: [{ id: 1, title: "Gift card", quantity: 1, properties: [] }] }));
  assert.equal(out.eventStatus, "done");
  assert.equal(await orderBy(5099), undefined);
});

/* ------------------------------------------------------------ packing */
test("packing needs counted stock; then consumes exactly once and releases the reservation", async () => {
  const o = await orderBy(5001);
  await assert.rejects(tx((c) => packOrder(c, o.id, { actor: "test" })), /Count these items before packing/);
  await countAll(10000);
  await tx((c) => setOrderStatus(c, o.id, "in_production", { actor: "test" }));
  await tx((c) => packOrder(c, o.id, { actor: "test" }));
  const white = await item("BRK-037");
  assert.equal(white.on_hand, 10000 - 3100);
  assert.equal(white.reserved, 0);
  assert.equal((await item("BOARD-10")).on_hand, 10000 - 4);
  await assert.rejects(tx((c) => packOrder(c, o.id, { actor: "test" })), /already packed/);
  assert.equal((await item("BRK-037")).on_hand, 6900);
});
test("a later Shopify update doesn't un-pack or re-reserve a packed order", async () => {
  await deliver(shopifyOrder({ financial: "paid" }));
  const o = await orderBy(5001);
  assert.equal(o.status, "packed");
  assert.deepEqual(await reservedOf(o.id), {});
  assert.equal((await item("BRK-037")).on_hand, 6900);
});
test("cancelling a packed order needs an explicit return, which happens once", async () => {
  await deliver(shopifyOrder({ cancelled: true, financial: "refunded" }));
  const o = await orderBy(5001);
  assert.equal(o.status, "cancelled");
  assert.match(o.needs_attention, /already consumed/);
  assert.equal((await item("BRK-037")).on_hand, 6900);           // nothing silently restored
  await tx((c) => returnMaterials(c, o.id, { actor: "test" }));
  assert.equal((await item("BRK-037")).on_hand, 10000);
  await assert.rejects(tx((c) => returnMaterials(c, o.id, { actor: "test" })), /already returned/);
});

/* ------------------------------------------------------------ concurrency */
test("20 orders paid at the same moment reserve exactly 20 × their needs", async () => {
  const before = (await item("BRK-001")).reserved;
  await tx((c) => ingestDesign(c, "MB-CONC-0001", designPayload({ counts: [3096, 700, 300] }), { source: "website", actor: "website" }));
  const ps = [];
  for (let k = 0; k < 20; k++){
    const p = shopifyOrder({ id: 7000 + k, name: "#20" + k, lines: [{ id: 80000 + k, quantity: 1, properties: [{ name: "Design ID", value: "MB-CONC-0001" }] }] });
    ps.push(deliver(p, { topic: "orders/paid" }), deliver(p, { topic: "orders/updated" }));
  }
  await Promise.all(ps);
  assert.equal((await item("BRK-001")).reserved - before, 20 * 700);
  const rec = await tx((c) => reconcile(c));
  assert.deepEqual(rec.issues, []);
});

/* ------------------------------------------------------------ studio */
test("Studio-only design → Studio order; the later Shopify order merges into it without a second reservation", async () => {
  const id = "ST-proj-merge";
  await tx((c) => ingestDesign(c, id, designPayload({ counts: [3000, 596, 500], extra: { projectId: "proj-merge", orderRef: "#3001", title: "Lopez family" } }), { source: "studio", actor: "studio" }));
  const s = await tx((c) => studioToProduction(c, id, { orderRef: "3001" }));
  assert.equal(s.linked, "studio");
  const again = await tx((c) => studioToProduction(c, id, { orderRef: "3001" }));
  assert.equal(again.orderId, s.orderId);                               // no duplicate order
  assert.equal((await reservedOf(s.orderId))["BRK-026"], 500);
  const before026 = (await item("BRK-026")).reserved;
  // the customer's Shopify order arrives later with their website design
  await tx((c) => ingestDesign(c, "MB-WEB-3001", designPayload({ counts: [3500, 396, 200] }), { source: "website", actor: "website" }));
  await deliver(shopifyOrder({ id: 6001, name: "#3001", lines: [{ id: 9301, quantity: 1, properties: [{ name: "Design ID", value: "MB-WEB-3001" }] }] }));
  const so = await orderBy(6001);
  const { rows: [studioOrder] } = await query("select * from orders where id = $1", [s.orderId]);
  assert.equal(studioOrder.merged_into, so.id);
  assert.deepEqual(await reservedOf(studioOrder.id), {});
  const res = await reservedOf(so.id);
  assert.equal(res["BRK-026"], 500);                                     // the Studio design is what gets produced
  assert.equal((await item("BRK-026")).reserved, before026);              // reserved once, not twice
});
test("a Studio change updates the open order's reservation and keeps the old revision", async () => {
  const id = "ST-proj-merge";
  await tx((c) => ingestDesign(c, id, designPayload({ counts: [2800, 596, 700], extra: { projectId: "proj-merge" } }), { source: "studio", actor: "studio" }));
  const so = await orderBy(6001);
  assert.equal((await reservedOf(so.id))["BRK-026"], 700);
  const { rows } = await query("select count(*)::int as n from design_revisions where design_id = $1", [id]);
  assert.equal(rows[0].n, 2);
});
test("Studio finish attaches to an existing Shopify order instead of creating another", async () => {
  await tx((c) => ingestDesign(c, "MB-WEB-4001", designPayload({ counts: [3096, 700, 300] }), { source: "website", actor: "website" }));
  await deliver(shopifyOrder({ id: 6101, name: "#4001", lines: [{ id: 9401, quantity: 1, properties: [{ name: "Design ID", value: "MB-WEB-4001" }] }] }));
  const id = "ST-proj-4001";
  await tx((c) => ingestDesign(c, id, designPayload({ counts: [2000, 1596, 500], extra: { projectId: "proj-4001" } }), { source: "studio", actor: "studio" }));
  const out = await tx((c) => studioToProduction(c, id, { orderRef: "#4001" }));
  const so = await orderBy(6101);
  assert.equal(out.orderId, so.id);
  assert.equal((await reservedOf(so.id))["BRK-001"], 1600);
  const { rows } = await query("select count(*)::int as n from orders where order_name = '#4001' and merged_into is null");
  assert.equal(rows[0].n, 1);
});
test("availability shows shortages and never treats uncounted as zero", async () => {
  await query("update items set on_hand = null where sku = 'BRK-040'");
  const out = await tx((c) => designAvailability(c, "ST-proj-4001"));
  assert.ok(out.lines.length > 0);
  await query("update items set on_hand = reserved + 100 where sku = 'BRK-001'");
  const again = await tx((c) => designAvailability(c, "ST-proj-4001"));
  const black = again.lines.find((l) => l.sku === "BRK-001");
  assert.equal(black.shortage, 1600 - 100);
  assert.equal(again.ok, false);
});

/* ------------------------------------------------------------ stock ops */
test("counts, adjustments and restocks are ledgered; reconciliation stays clean", async () => {
  const sep = await item("TOOL-SEPARATOR");
  await tx((c) => setCount(c, sep.id, 250, { reason: "Initial count" }));
  await tx((c) => adjust(c, sep.id, -3, { reason: "Damaged" }));
  await tx((c) => restock(c, { supplier: "Acme", reference: "PO-1", lines: [{ itemId: sep.id, qty: 100 }] }));
  assert.equal((await item("TOOL-SEPARATOR")).on_hand, 347);
  await assert.rejects(tx((c) => adjust(c, sep.id, -1, { reason: "" })), /reason is required/);
  const { rows } = await query("select type, delta_on_hand from movements where item_id = $1 and type in ('count','adjust','restock') order by id desc limit 3", [sep.id]);
  assert.deepEqual(rows.map((r) => [r.type, r.delta_on_hand]), [["restock", 100], ["adjust", -3], ["count", sep.on_hand == null ? 250 : 250 - sep.on_hand]]);
  // BRK-001 was edited behind the ledger's back above → reconciliation must notice and fix it
  const rec = await tx((c) => reconcile(c));
  assert.ok(rec.issues.some((i) => i.sku === "BRK-001"));
  await tx((c) => reconcile(c, { fix: true }));
  assert.deepEqual((await tx((c) => reconcile(c))).issues.filter((i) => i.sku !== "BRK-040"), []);
});
test("low-stock alert opens at the minimum and closes after a restock", async () => {
  const b16 = await item("BOARD-16");
  await tx((c) => setCount(c, b16.id, 5, {}));
  await query("update items set min_level = 10 where id = $1", [b16.id]);
  await tx((c) => adjust(c, b16.id, 1, { reason: "found one" }));
  let { rows } = await query("select * from alerts where item_id = $1 and resolved_at is null", [b16.id]);
  assert.equal(rows[0].kind, "low_stock");
  await tx((c) => restock(c, { lines: [{ itemId: b16.id, qty: 50 }] }));
  ({ rows } = await query("select * from alerts where item_id = $1 and resolved_at is null", [b16.id]));
  assert.equal(rows.length, 0);
});
test("purchase needs = reserved + unpaid orders + minimum − on hand", async () => {
  const needs = await purchaseNeeds();
  const black = needs.find((n) => n.sku === "BRK-001");
  assert.equal(black.buy, Math.max(0, black.reserved + black.pending_qty + (black.min_level || 0) - black.on_hand));
  await query("insert into items (sku, category, name, color_code, hex) values ('BRK-T99', 'brick', 'Test new color', 'T99', '#123456')");
  const uncounted = (await purchaseNeeds()).find((n) => n.sku === "BRK-T99");
  assert.equal(uncounted.buy, null);
});

test("abandoned website designs are pruned; designs used by orders are kept", async () => {
  await tx((c) => ingestDesign(c, "MB-ABANDONED-1", designPayload({ counts: [3096, 700, 300] }), { source: "website", actor: "website" }));
  await query("update designs set updated_at = now() - interval '90 days' where id in ('MB-ABANDONED-1', 'MB-20261010-TEST0001')");
  const n = await pruneAbandonedDesigns();
  assert.equal(n, 1);
  assert.equal((await query("select count(*)::int as n from designs where id = 'MB-ABANDONED-1'")).rows[0].n, 0);
  assert.equal((await query("select count(*)::int as n from designs where id = 'MB-20261010-TEST0001'")).rows[0].n, 1);
});

test("Shopify fulfilment marks a packed order shipped and never deducts stock by itself", async () => {
  await tx((c) => ingestDesign(c, "MB-SHIP-0001", designPayload({ counts: [3096, 700, 300] }), { source: "website", actor: "website" }));
  const lines = [{ id: 95001, quantity: 1, properties: [{ name: "Design ID", value: "MB-SHIP-0001" }] }];
  await deliver(shopifyOrder({ id: 8801, name: "#8801", lines }));
  const before = (await item("BRK-037")).on_hand;
  await deliver({ ...shopifyOrder({ id: 8801, name: "#8801", lines }), fulfillment_status: "fulfilled" });
  let o = await orderBy(8801);
  assert.equal(o.status, "reserved");
  assert.match(o.needs_attention, /not packed here yet/);
  assert.equal((await item("BRK-037")).on_hand, before);
  await tx((c) => packOrder(c, o.id, { actor: "test" }));
  await deliver({ ...shopifyOrder({ id: 8801, name: "#8801", lines }), fulfillment_status: "fulfilled" });
  o = await orderBy(8801);
  assert.equal(o.status, "shipped");
  assert.equal((await item("BRK-037")).on_hand, before - 3100);
});
