// Smoke check of a theme (live or a preview copy): home, free proof, product, cart with one kit and no photo.
// Usage: node publish-card-check.mjs <themeId|live> <outdir> <prefix>
// Adds one 10x10 kit to this test browser's own cart. Never opens checkout, never pays, no address.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, theme, outdir, prefix] = process.argv;
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (p) => `https://mymemobrick.com${p}${pv ? (p.includes('?') ? '&' : '?') + pv : ''}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] }).catch(async () =>
  chromium.launch({ args: ['--no-sandbox'] }));
const out = {};
for (const device of ['phone', 'desktop']) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone', deviceScaleFactor: device === 'phone' ? 2.5 : 0.7,
    userAgent: device === 'phone'
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(String(e.message).slice(0, 160)));
  const r = out[device] = {};
  const shot = async (name) => { try { const d = page.getByRole('button', { name: 'Decline' }); if (await d.count()) await d.first().click({ timeout: 2000 }); } catch (e) {} await page.waitForTimeout(300); return page.screenshot({ path: `${outdir}/${prefix}-${device}-${name}.jpg`, type: 'jpeg', quality: 60 }); };
  const info = () => page.evaluate(() => ({ theme: window.Shopify && Shopify.theme && Shopify.theme.id, sw: document.documentElement.scrollWidth, iw: innerWidth,
    brick: (document.body.innerText.match(/[^.\n]*(as long as you own|14 days of delivery)[^.\n]*/) || [null])[0] }));
  await page.goto(u('/'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2500);
  r.home = await info(); await shot('home');
  await page.goto(u('/pages/free-preview'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(12000);
  r.freeProof = { ...(await info()), fallbackShown: await page.evaluate(() => { const f = document.querySelector('.fp-fallback'); return f ? !f.hidden : 'no fallback element'; }) };
  await page.evaluate(() => document.querySelector('.hulk-form-embed')?.scrollIntoView({ block: 'center' })); await page.waitForTimeout(500);
  await shot('free-proof');
  await page.goto(u('/products/custom-bricked-mosaic-10x10'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2500);
  r.product = await info(); await shot('product');
  const v = await page.evaluate(async () => { const p = await (await fetch('/products/custom-bricked-mosaic-10x10.js')).json(); return p.variants[0].id; });
  r.add = await page.evaluate(async (id) => { await fetch('/cart/clear.js', { method: 'POST' }); const res = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id, quantity: 1 }] }) }); return res.status; }, v);
  await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2500);
  r.cart = { ...(await info()), text: await page.evaluate(() => (document.querySelector('main') || document.body).innerText.replace(/\s+/g, ' ').slice(0, 700)) };
  await shot('cart');
  await page.evaluate(async () => fetch('/cart/clear.js', { method: 'POST' }));
  r.errors = errs; await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/${prefix}-results.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
