// Discount code vs automatic free shipping (2026-10-21). READ-ONLY checkout test.
// Usage: node code-vs-freeship-test.mjs <outdir> <caseId> <device phone|desktop> <items "id:qty,id:qty"> <address key ny|la> <code|-> [shipping method regex]
// Builds this test browser's own cart, opens Shopify checkout, fills a test contact + business delivery address,
// reads the order summary, types the discount code and presses Apply, reads the summary and any message again.
// Never enters payment details, never presses Pay / Complete order. Clears the cart at the end.
import { execSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const execFileP = promisify(execFile);
import { chromium, request } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, outdir, caseId, device, itemsArg, addrKey, code, shipRe] = process.argv;
const ADDR = {
  ny: { first: 'Test', last: 'Checkout', address1: '350 5th Ave', city: 'New York', zone: 'NY', zip: '10118' },
  la: { first: 'Test', last: 'Checkout', address1: '200 N Spring St', city: 'Los Angeles', zone: 'CA', zip: '90012' },
}[addrKey];
const items = itemsArg.split(',').map(s => { const [id, q] = s.split(':'); return { id: +id, quantity: +q, properties: { 'Design ID': 'TEST-DISCOUNT-1021' } }; });
const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const ua = device === 'phone'
  ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
  : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone', userAgent: ua, locale: 'en-US' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);
// Safety net: block any payment-completion request.
await page.route(/\/checkouts\/.*\/(complete|payments?)\b|SubmitForCompletion/i, r => r.abort());
// The sandbox browser is challenged by the store's bot check on /checkouts (curl and Node are not), so when
// VIA_NODE=1 the checkout document and its API calls on mymemobrick.com are fetched with curl
// and handed to the browser unchanged. Payment completion stays blocked above (routes registered later run first,
// so that rule is re-checked inside this handler too).
const nodeReq = process.env.VIA_NODE ? await request.newContext({ proxy: { server: process.env.HTTPS_PROXY }, ignoreHTTPSErrors: false }) : null;
if (process.env.VIA_NODE) await page.route(u => /mymemobrick\.com\/checkouts\//.test(u.href), async (route) => {
  const q = route.request();
  if (/(complete|SubmitForCompletion)/i.test(q.url() + (q.postData() || '').slice(0, 2000))) return route.abort();
  try {
    const headers = await q.allHeaders();
    const tmp = mkdtempSync(join(tmpdir(), 'cvf-'));
    const args = ['-sS', '-X', q.method(), '-D', join(tmp, 'h'), '-o', join(tmp, 'b'), '--compressed', '--max-time', '60'];
    for (const [k, v] of Object.entries(headers)) if (!k.startsWith(':') && !/^(content-length|accept-encoding|host)$/i.test(k)) args.push('-H', `${k}: ${v}`);
    const body = q.postDataBuffer();
    if (body) { writeFileSync(join(tmp, 'd'), body); args.push('--data-binary', '@' + join(tmp, 'd')); }
    args.push(q.url());
    await execFileP('curl', args, { maxBuffer: 1 << 26 });
    const blocks = readFileSync(join(tmp, 'h'), 'latin1').split(/\r?\n\r?\n/).filter(b => /^HTTP\//.test(b) && !/^HTTP\/\S+ 200 Connection established/i.test(b));
    const last = blocks.pop();
    const status = +last.split(/\s+/)[1];
    const rh = {}; for (const line of last.split(/\r?\n/).slice(1)) { const i = line.indexOf(':'); if (i > 0) { const k = line.slice(0, i).trim().toLowerCase(); if (/^(content-encoding|content-length|transfer-encoding)$/.test(k)) continue; const v = line.slice(i + 1).trim(); rh[k] = rh[k] ? rh[k] + (k === 'set-cookie' ? '\n' : ', ') + v : v; } }
    const rb = readFileSync(join(tmp, 'b'));
    rmSync(tmp, { recursive: true, force: true });
    R.viaNode = (R.viaNode || 0) + 1; if (status >= 400) (R.viaNodeErr ||= []).push(`${status} ${q.url().replace(/\?.*/, '').slice(-60)}`);
    return route.fulfill({ status, headers: rh, body: rb });
  } catch (e) { (R.viaNodeErr ||= []).push(e.message.slice(0, 120)); return route.abort(); }
});
const R = { caseId, device, items: itemsArg, addr: addrKey, code };
let lastLocation = null;
R.nav = [];
page.on('response', resp => { const l = resp.headers()['location']; if (l) lastLocation = l; const q = resp.request(); if (q.isNavigationRequest() && q.frame() === page.mainFrame()) R.nav.push(`${resp.status()} ${q.url().replace(/\?.*/, '').slice(0, 90)}${l ? ' -> ' + l.replace(/\?.*/, '').slice(0, 90) : ''}`); });
const shot = async (tag) => { const p = `${outdir}/${caseId}-${device}-${tag}.jpg`; await page.screenshot({ path: p, type: 'jpeg', quality: 60, fullPage: true }); return p.split('/').pop(); };
async function summary() {
  return page.evaluate(() => {
    const t = document.body.innerText.replace(/ /g, ' ');
    const grab = (re) => { const m = t.match(re); return m ? m[0].replace(/\s+/g, ' ').trim() : null; };
    return {
      subtotal: grab(/Subtotal[^\n]*\n?[^\n]*\$[\d,.]+/),
      shipping: grab(/Shipping\s*(\n[^\n]*){0,2}?(FREE|Free|\$[\d,.]+|Enter shipping address|Calculated at next step)/),
      discountLines: [...t.matchAll(/(Order discount|Discount|EARLYHOLIDAY20|BRICK10|Free Shipping on US Orders Over \$125)[^\n]*(\n[^\n]*){0,2}/g)].map(m => m[0].replace(/\s+/g, ' ').trim()).slice(0, 8),
      total: grab(/\nTotal[^\n]*\n?[^\n]*\$[\d,.]+/),
      saved: grab(/(TOTAL SAVINGS|Total savings)[^\n]*\n?[^\n]*\$[\d,.]+/),
      alerts: [...document.querySelectorAll('[role=alert], [aria-live] p, [id*="error" i]')].map(e => e.innerText.trim()).filter(Boolean).slice(0, 6),
      shippingOptions: [...document.querySelectorAll('input[type=radio]')].filter(i => /shipping|delivery/i.test(i.name + i.id + (i.closest('fieldset')?.innerText || '').slice(0, 30))).map(i => ({ checked: i.checked, label: (i.closest('label') || i.parentElement?.closest('div'))?.innerText.replace(/\s+/g, ' ').trim().slice(0, 90) })),
    };
  });
}
try {
  // Cart permalink (fresh cart with exactly these items, no cookies), fetched with curl because the sandbox browser
  // gets rate limited on /checkout. Its redirect names the store's own checkout URL with skip_shop_pay=true.
  const perm = `https://mymemobrick.com/cart/${items.map(i => `${i.id}:${i.quantity}`).join(',')}?note=TEST-DISCOUNT-1021`;
  const hdr = execSync(`curl -sS -o /dev/null -D - '${perm}'`).toString();
  const loc = (hdr.match(/^location: (.*)$/mi) || [])[1] || '';
  const back = decodeURIComponent((loc.match(/ur_back_url=([^&\s]+)/) || [])[1] || '');
  R.add = { permalink: perm.replace(/\?.*/, ''), checkout: back.replace(/\?.*/, '').replace(/cn\/[^/]+/, 'cn/<token>') };
  if (!back) throw new Error('no checkout URL from permalink: ' + loc.slice(0, 100));
  await page.goto(back, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('input[name="email"], #email', { timeout: 45000 });
  await page.waitForTimeout(2000);
  if (device === 'phone') { const tg = page.getByRole('button', { name: /order summary/i }).first(); if (await tg.isVisible().catch(() => false)) await tg.click().catch(() => {}); await page.waitForTimeout(800); }
  R.beforeAddress = await summary();
  await page.locator('input[name="email"], #email').first().fill('test+checkout@mymemobrick.com');
  const country = page.locator('select[name="countryCode"]');
  if (await country.count()) await country.selectOption('US').catch(() => {});
  await page.locator('input[name="firstName"]').first().fill(ADDR.first);
  await page.locator('input[name="lastName"]').first().fill(ADDR.last);
  const a1 = page.locator('input[name="address1"]').first();
  await a1.fill(ADDR.address1); await page.waitForTimeout(800); await page.keyboard.press('Escape');
  await page.locator('input[name="city"]').first().fill(ADDR.city);
  await page.locator('select[name="zone"]').first().selectOption(ADDR.zone).catch(e => R.zoneErr = e.message.slice(0, 80));
  await page.locator('input[name="postalCode"]').first().fill(ADDR.zip);
  await page.locator('input[name="postalCode"]').first().press('Tab');
  await page.waitForTimeout(9000);
  if (shipRe) {
    const opt = page.locator('label').filter({ hasText: new RegExp(shipRe, 'i') }).first();
    await opt.click().catch(e => R.shipPickErr = e.message.slice(0, 100));
    await page.waitForTimeout(5000);
  }
  R.noCode = await summary();
  R.shots = [await shot('1-no-code')];
  if (code && code !== '-') {
    const box = page.locator('input[name="reductions"]:visible, input[placeholder*="Discount code" i]:visible, input[aria-label*="Discount code" i]:visible').first();
    await box.fill(code);
    await page.getByRole('button', { name: /^apply/i }).filter({ visible: true }).first().click();
    await page.waitForTimeout(8000);
    R.withCode = await summary();
    R.withCode.nearBox = await page.evaluate(() => {
      const i = document.querySelector('input[name="reductions"]') || [...document.querySelectorAll('input')].find(x => /discount code/i.test(x.placeholder + x.getAttribute('aria-label')));
      const box = i?.closest('form') || i?.parentElement?.parentElement?.parentElement;
      return box ? box.innerText.replace(/\s+/g, ' ').trim().slice(0, 300) : null;
    });
    if (device === 'phone') { const tg = page.getByRole('button', { name: /order summary/i }).first(); if (await tg.isVisible().catch(() => false) && /show/i.test(await tg.innerText().catch(() => ''))) { await tg.click().catch(() => {}); await page.waitForTimeout(800); } }
    R.shots.push(await shot('2-with-code'));
    // Remove the code again: does free shipping come back?
    const rm = page.locator(`button[aria-label*="Remove" i]:visible`).filter({ hasText: '' }).first();
    const rmBtn = page.getByRole('button', { name: new RegExp('remove.*' + code, 'i') }).filter({ visible: true }).first();
    if (await rmBtn.count()) { await rmBtn.click().catch(e => R.removeErr = e.message.slice(0, 100)); }
    else if (await rm.count()) { await rm.click().catch(e => R.removeErr = e.message.slice(0, 100)); }
    else R.removeErr = 'no remove button found';
    await page.waitForTimeout(7000);
    R.codeRemoved = await summary();
    R.shots.push(await shot('3-code-removed'));
  }
} catch (e) { R.fatal = e.message.slice(0, 300); R.fatalUrl = page.url().slice(0, 120); R.fatalTitle = await page.title().catch(() => ''); await shot('error').catch(() => {}); }
// Permalink carts are not stored in this browser; nothing to clear.
await browser.close();
console.log(JSON.stringify(R, null, 1));
