/* End-to-end: the Control Center dashboard in a real browser. */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = await import(process.env.PLAYWRIGHT_PATH || "/opt/node22/lib/node_modules/playwright/index.mjs");
const { query, closePool, freshDb, designPayload, shopifyOrder, signedWebhook } = await import("../helpers.js");
const { createServer } = await import("../../src/server.js");
const { createUser } = await import("../../src/auth.js");
const { tx } = await import("../../src/db.js");
const { ingestDesign } = await import("../../src/designs.js");
const { receiveShopifyWebhook } = await import("../../src/webhooks.js");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8793, URL0 = `http://localhost:${PORT}`;
const SHOTS = process.env.SHOTS_DIR || null;

let server, browser;
before(async () => {
  await freshDb();
  await createUser({ email: "admin@memobrick.test", name: "Ana", role: "admin", password: "correct-horse-1" });
  await createUser({ email: "staff@memobrick.test", name: "Luis", role: "production", password: "correct-horse-2" });
  server = await new Promise((r) => { const s = createServer().listen(PORT, () => r(s)); });
  browser = await chromium.launch();
  // one paid Shopify order waiting for production
  await tx((c) => ingestDesign(c, "MB-20261011-DASHTEST", designPayload({ counts: [3096, 700, 300] }), { source: "website", actor: "website" }));
  const ev = signedWebhook(shopifyOrder({ id: 77001, name: "#1201", lines: [{ id: 1, quantity: 1, properties: [{ name: "Design ID", value: "MB-20261011-DASHTEST" }] }] }));
  await receiveShopifyWebhook(ev);
  await new Promise((r) => setTimeout(r, 800));
});
after(async () => { await browser?.close(); await new Promise((r) => server.close(r)); await closePool(); });

async function signIn(page, email, password){
  await page.goto(URL0);
  await page.fill("#loginForm [name=email]", email);
  await page.fill("#loginForm [name=password]", password);
  await page.click("#loginForm button");
  await page.waitForSelector("#app:not([hidden])");
}
const shot = (page, name) => SHOTS ? page.screenshot({ path: path.join(SHOTS, name + ".png"), fullPage: false }) : null;

test("wrong password is refused", async () => {
  const page = await browser.newPage();
  await page.goto(URL0);
  await page.fill("#loginForm [name=email]", "admin@memobrick.test");
  await page.fill("#loginForm [name=password]", "nope-nope-nope");
  await page.click("#loginForm button");
  await page.waitForFunction(() => document.querySelector("#loginErr").textContent.length > 0);
  assert.match(await page.textContent("#loginErr"), /Wrong email or password/);
  await page.close();
});

test("admin: every section renders without errors", async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await signIn(page, "admin@memobrick.test", "correct-horse-1");
  for (const v of ["dashboard", "bricks", "boards", "orders", "production", "designs", "history", "restock", "reports", "setup", "settings"]){
    await page.goto(`${URL0}/#/${v}`);
    await page.waitForTimeout(500);
    assert.equal(await page.locator("#view .note.bad").count(), 0, `${v} shows an error`);
    await shot(page, "cc-" + v);
  }
  assert.deepEqual(errors, []);
  await page.close();
});

test("admin enters initial counts in the table; blank stays 'not counted'", async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await signIn(page, "admin@memobrick.test", "correct-horse-1");
  await page.goto(`${URL0}/#/bricks`);
  await page.waitForSelector("tr[data-id] input[data-f=onHand]");
  const rows = page.locator("tr[data-id]");
  assert.equal(await rows.count(), 40);
  await rows.nth(0).locator("input[data-f=onHand]").fill("12000");   // Black
  await rows.nth(0).locator("input[data-f=minLevel]").fill("2000");
  await rows.nth(36).locator("input[data-f=onHand]").fill("20000");  // White
  await page.click("#saveBtn");
  await page.waitForFunction(() => !document.querySelector("#saveBar") || document.querySelector("#saveBar").hidden);
  await page.waitForTimeout(400);
  const { rows: db } = await query("select sku, on_hand, min_level from items where sku in ('BRK-001','BRK-037','BRK-026') order by sku");
  assert.deepEqual(db.map((r) => [r.sku, r.on_hand, r.min_level]), [["BRK-001", 12000, 2000], ["BRK-026", null, null], ["BRK-037", 20000, null]]);
  await shot(page, "cc-bricks-after-count");
  await page.close();
});

test("CSV import fills the rest; a bad row imports nothing", async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await signIn(page, "admin@memobrick.test", "correct-horse-1");
  await page.goto(`${URL0}/#/setup`);
  await page.waitForSelector("#csvText");
  await page.fill("#csvText", "sku,on_hand\nBRK-026,oops\n");
  await page.click("#csvGo");
  await page.waitForFunction(() => document.querySelector("#csvErr").textContent.length > 0);
  assert.equal((await query("select on_hand from items where sku = 'BRK-026'")).rows[0].on_hand, null);
  const lines = ["color_code,on_hand,min_level", "26,5000,500", "BOARD-10x,1,1"].slice(0, 2);
  const { rows: all } = await query("select sku from items where on_hand is null and sku <> 'BRK-026'");
  const csv = "sku,on_hand\nBRK-026,5000\n" + all.map((r) => `${r.sku},3000`).join("\n");
  await page.fill("#csvText", csv);
  await page.click("#csvGo");
  await page.waitForTimeout(800);
  const { rows: [{ n }] } = await query("select count(*)::int as n from items where on_hand is null");
  assert.equal(n, 0);
  assert.equal((await query("select on_hand from items where sku = 'BRK-026'")).rows[0].on_hand, 5000);
  void lines;
  await page.close();
});

test("production staff packs the order from the Production page; stock is deducted once", async () => {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  page.on("dialog", (d) => d.accept());
  await signIn(page, "staff@memobrick.test", "correct-horse-2");
  assert.equal(await page.locator('#nav a[data-v="settings"]').isVisible(), false);
  await page.goto(`${URL0}/#/production`);
  await page.waitForSelector(".pcard");
  await shot(page, "cc-production-staff");
  for (const box of await page.locator(".pcard input[type=checkbox]").all()) await box.check();
  await page.click('.pcard [data-s="packed"]');
  await page.waitForTimeout(1000);
  const { rows: [o] } = await query("select status from orders where shopify_order_id = 77001");
  assert.equal(o.status, "packed");
  const { rows: [w] } = await query("select on_hand, reserved from items where sku = 'BRK-037'");
  assert.deepEqual([w.on_hand, w.reserved], [20000 - 3100, 0]);
  // production staff can't change stock counts
  const res = await page.evaluate(async () => (await fetch("/api/items/1/count", { method: "POST", headers: { "Content-Type": "application/json", "X-MCC": "1" }, body: JSON.stringify({ onHand: 1 }) })).status);
  assert.equal(res, 403);
  await page.close();
});

test("API protections: no session → 401, missing CSRF header → 403, studio needs a key", async () => {
  assert.equal((await fetch(`${URL0}/api/items`)).status, 401);
  const login = await fetch(`${URL0}/api/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "admin@memobrick.test", password: "correct-horse-1" }) });
  const cookie = login.headers.get("set-cookie").split(";")[0];
  assert.equal((await fetch(`${URL0}/api/items/1/count`, { method: "POST", headers: { Cookie: cookie, "Content-Type": "application/json" }, body: "{\"onHand\":1}" })).status, 403);
  assert.equal((await fetch(`${URL0}/api/studio/ping`)).status, 401);
  assert.equal((await fetch(`${URL0}/api/studio/ping`, { headers: { Authorization: "Bearer mcc_wrong" } })).status, 401);
});
