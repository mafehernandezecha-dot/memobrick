/* End-to-end: both REAL editors in a real browser → Control Center → Postgres.
   Run: DATABASE_URL=... node --test test/e2e/editors.e2e.mjs
   Needs Playwright + Chromium (PLAYWRIGHT_PATH may point at the module). */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { buildWebsiteHarness } from "./website-harness.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../..");
const THEME = path.join(ROOT, "memobrick-size-zoom-test-latest (2)");
const STUDIO = path.join(ROOT, "memobrick-editor");
const PHOTO = path.join(STUDIO, "assets/mb-256ed61735.jpg");
const { chromium } = await import(process.env.PLAYWRIGHT_PATH || "/opt/node22/lib/node_modules/playwright/index.mjs");

const { query, closePool, freshDb } = await import("../helpers.js");
// after helpers (which set unit-test defaults), before the server reads them
process.env.SHOPIFY_WEBHOOK_SECRET = "e2e-secret";
const CC_PORT = 8790, WEB_PORT = 8791, STUDIO_PORT = 8792;
process.env.CORS_ORIGINS = `http://localhost:${WEB_PORT},http://localhost:${STUDIO_PORT}`;
const CC = `http://localhost:${CC_PORT}`;
const { createServer } = await import("../../src/server.js");
const { createApiKey } = await import("../../src/auth.js");

function serveDir(dir, port){
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4" };
  const s = http.createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const f = path.join(dir, p === "/" ? "index.html" : p);
    fs.readFile(f, (err, data) => {
      if (err){ res.writeHead(404); return res.end(); }
      res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); res.end(data);
    });
  });
  return new Promise((r) => s.listen(port, () => r(s)));
}
const until = async (fn, ms = 30000, step = 250) => {
  const end = Date.now() + ms;
  for (;;){ const v = await fn(); if (v) return v; if (Date.now() > end) throw new Error("timed out"); await new Promise((r) => setTimeout(r, step)); }
};
/* the editor's own parts list: what the customer / designer sees */
const editorCounts = (page) => page.evaluate(() => Object.fromEntries([...document.querySelectorAll("#partsGrid .part")].map((p) =>
  [p.querySelector(".nm").textContent.trim(), Number(p.querySelector(".ct").textContent.replace(/[^\d]/g, ""))])));
async function backendCounts(designId){
  const { rows } = await query(
    `select i.name, i.category, rm.exact_qty, rm.packed_qty from designs d join design_revisions r on r.design_id = d.id and r.revision = d.current_revision
       join revision_materials rm on rm.revision_id = r.id join items i on i.id = rm.item_id where d.id = $1`, [designId]);
  return rows;
}

let servers = [], browser, studioKey, harnessDir;
before(async () => {
  await freshDb();
  studioKey = await createApiKey("e2e studio");
  servers.push(await new Promise((r) => { const s = createServer().listen(CC_PORT, () => r(s)); }));
  harnessDir = fs.mkdtempSync(path.join(process.env.TMPDIR || "/tmp", "mb-web-harness-"));
  buildWebsiteHarness(THEME, harnessDir, CC, path.join(HERE, "../../integrations/website/memobrick-inventory.js"));
  servers.push(await serveDir(harnessDir, WEB_PORT));
  servers.push(await serveDir(STUDIO, STUDIO_PORT));
  browser = await chromium.launch();
});
after(async () => {
  await browser?.close();
  for (const s of servers) await new Promise((r) => s.close(r));
  fs.rmSync(harnessDir, { recursive: true, force: true });
  await closePool();
});

let websiteDesignId = null, websiteCounts = null;

test("website editor (live minified build): add to cart sends the exact brick matrix under the cart line's Design ID", async () => {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  let cartForm = null;
  await page.route("**/cart/add.js", async (route) => {
    cartForm = route.request().postDataBuffer().toString("latin1");
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ key: "k1", quantity: 1, properties: {} }) });
  });
  await page.route("**/cart.js", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ item_count: 1, items: [], total_price: 0 }) }));
  await page.route("**/cdn.jsdelivr.net/**", (route) => route.abort());
  await page.goto(`http://localhost:${WEB_PORT}/`);
  await page.waitForFunction(() => typeof window.MB_addToCart === "function" && window.MB_addToCart.__mbInventory === true);
  await page.setInputFiles("#file", PHOTO);
  await page.waitForTimeout(5000);
  await page.evaluate(() => { const c = document.querySelector("#cropper"); if (c && !c.hidden) document.querySelector("#crApply").click(); });
  await until(async () => Object.keys(await editorCounts(page)).length > 3);
  await page.waitForTimeout(2500);
  websiteCounts = await editorCounts(page);
  await page.evaluate(() => document.querySelector("#orderBtn").click());
  await until(() => cartForm);
  websiteDesignId = /name="properties\[Design ID\]"\r\n\r\n([^\r\n]+)/.exec(cartForm)[1];
  assert.match(websiteDesignId, /^MB-\d{8}-[A-Z0-9]{8}$/);
  const rows = await until(async () => { const r = await backendCounts(websiteDesignId); return r.length ? r : null; });
  const bricks = Object.fromEntries(rows.filter((r) => r.category === "brick").map((r) => [r.name, r.exact_qty]));
  assert.deepEqual(bricks, websiteCounts, "backend counts must equal the editor's own parts list");
  assert.equal(rows.find((r) => r.name.startsWith("10×10")).exact_qty, 4);       // default 20×20" = 2×2 plates
  assert.equal(rows.find((r) => r.name === "Brick separator").exact_qty, 1);
  assert.deepEqual(errors.filter((e) => !/MediaPipe|fetch/i.test(e)), []);
  await page.close();
});

test("the Shopify order for that cart line reserves exactly those bricks", async () => {
  const order = { id: 880001, name: "#9001", financial_status: "paid", updated_at: new Date().toISOString(), created_at: new Date().toISOString(),
    customer: { first_name: "Web", last_name: "Customer" }, email: "web@example.com",
    line_items: [{ id: 990001, title: "Custom Bricked Mosaic", quantity: 1, properties: [{ name: "Design ID", value: websiteDesignId }, { name: "MemoBrick Size", value: '20 × 20"' }] }] };
  const raw = JSON.stringify(order);
  const res = await fetch(`${CC}/webhooks/shopify`, { method: "POST", body: raw, headers: {
    "Content-Type": "application/json", "X-Shopify-Topic": "orders/paid", "X-Shopify-Webhook-Id": crypto.randomUUID(),
    "X-Shopify-Hmac-Sha256": crypto.createHmac("sha256", "e2e-secret").update(raw).digest("base64") } });
  assert.equal(res.status, 200);
  const res2 = await until(async () => (await query(
    `select i.name, i.category, r.qty from orders o join reservations r on r.order_id = o.id join items i on i.id = r.item_id where o.shopify_order_id = 880001`)).rows.length ? (await query(
    `select i.name, i.category, r.qty from orders o join reservations r on r.order_id = o.id join items i on i.id = r.item_id where o.shopify_order_id = 880001`)).rows : null);
  const reserved = Object.fromEntries(res2.filter((r) => r.category === "brick").map((r) => [r.name, r.qty]));
  const packed = Object.fromEntries(Object.entries(websiteCounts).map(([k, n]) => [k, Math.ceil(n / 100) * 100]));
  assert.deepEqual(reserved, packed);
});

test("MemoBrick Studio: saved projects sync their exact matrix; Finish creates one production order with reservations", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  await ctx.addInitScript(([url, key]) => { localStorage.setItem("mcc_url", url); localStorage.setItem("mcc_key", key); }, [CC, studioKey]);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route("**/cdn.jsdelivr.net/**", (route) => route.abort());
  await page.goto(`http://localhost:${STUDIO_PORT}/`);
  await page.waitForSelector("#teamInventory");
  await page.click("#tpEmpty [data-action=new]");
  await page.fill("#teamProjectForm [name=name]", "E2E family");
  await page.fill("#teamProjectForm [name=ref]", "#9500");
  await page.click("#teamProjectSubmit");
  await page.setInputFiles("#file", PHOTO);
  await page.waitForTimeout(5000);
  await page.evaluate(() => { const c = document.querySelector("#cropper"); if (c && !c.hidden) document.querySelector("#crApply").click(); });
  const projectId = await until(() => page.evaluate(() => window.MB_STUDIO_CURRENT && window.MB_STUDIO_CURRENT() && window.MB_STUDIO_CURRENT().id));
  const designId = "ST-" + projectId;
  // wait until the synced revision matches what the Studio shows
  let studioCounts;
  await until(async () => {
    studioCounts = await editorCounts(page);
    const rows = await backendCounts(designId);
    const b = Object.fromEntries(rows.filter((r) => r.category === "brick").map((r) => [r.name, r.exact_qty]));
    const keys = new Set([...Object.keys(b), ...Object.keys(studioCounts)]);
    return rows.length > 0 && [...keys].every((k) => b[k] === studioCounts[k]);
  }, 40000, 500);
  await page.click("#teamFinish");
  const order = await until(async () => (await query("select * from orders where studio_project_id = $1", [projectId])).rows[0], 20000);
  assert.equal(order.status, "reserved");
  assert.equal(order.order_name, "#9500");
  const { rows: res } = await query("select i.name, i.category, r.qty from reservations r join items i on i.id = r.item_id where r.order_id = $1", [order.id]);
  const reserved = Object.fromEntries(res.filter((r) => r.category === "brick").map((r) => [r.name, r.qty]));
  assert.deepEqual(reserved, Object.fromEntries(Object.entries(studioCounts).map(([k, n]) => [k, Math.ceil(n / 100) * 100])));
  // finishing again doesn't create a second order
  await page.evaluate(() => { const b = document.querySelector("#insClose"); if (b) b.click(); });
  await page.click("#teamFinish");
  await page.waitForTimeout(2500);
  const { rows: [{ n }] } = await query("select count(*)::int as n from orders where studio_project_id = $1", [projectId]);
  assert.equal(n, 1);
  // the designer changes the size → new revision → the open order's reservation follows
  await page.evaluate(() => document.querySelector("#insClose")?.click());
  await page.evaluate(() => { document.querySelector("#panelSize").open = true; document.querySelector('#sizeGrid [data-id="30x30"]').click(); });
  await until(async () => (await query("select current_revision from designs where id = $1", [designId])).rows[0].current_revision >= 2, 40000, 500);
  const boards = await until(async () => { const { rows } = await query(
    `select r.qty from reservations r join items i on i.id = r.item_id where r.order_id = $1 and i.sku = 'BOARD-10'`, [order.id]);
    return rows[0] && rows[0].qty === 9 ? rows[0].qty : null; }, 20000);
  assert.equal(boards, 9);                                   // 30×30" = 3×3 plates
  const { rows: revs } = await query("select revision from design_revisions where design_id = $1 order by revision", [designId]);
  assert.ok(revs.length >= 2, "previous revision kept");
  assert.deepEqual(errors.filter((e) => !/MediaPipe|fetch/i.test(e)), []);
  await ctx.close();
});
