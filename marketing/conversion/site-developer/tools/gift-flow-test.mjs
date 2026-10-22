// Art Gift Kit workflow test (2026-10-22).
// Usage: TEST_PHOTO=<generated image> node gift-flow-test.mjs <themeId|live> <outdir> <prefix> [real]
// 1. Gift kit product page: quantity, "what happens after you buy", Add to cart with 2 kits (no checkout).
// 2. Gift link in the editor (test refs #99999 and #99998, test buyer email): banner, no prices, size labels,
//    "I have another gift link", details form, submit. The POST to /contact is INTERCEPTED (not sent) unless the
//    5th argument is "real" (then exactly one real contact-form email goes to the store, phone only).
// 3. Used-link notice on reload.  4. A normal (non-gift) editor session still adds to cart and opens the drawer.
// Uploads a GENERATED test picture only. Never checks out, never pays. Clears the test cart at the end.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const [,, theme, outdir, prefix, mode] = process.argv;
const REAL = mode === 'real';
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (path, hash = '') => `https://mymemobrick.com${path}${pv ? (path.includes('?') ? '&' : '?') + pv : ''}${hash}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const out = {};
for (const device of (process.env.DEVICES || 'phone,desktop').split(',')) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone', deviceScaleFactor: 1,
    userAgent: device === 'phone'
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  await ctx.route(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\/(uploads|files)\//, async route => {
    const url = route.request().url().replace(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\//, 'https://mymemobrick.com/cdn/shop/');
    await route.fulfill({ status: 302, headers: { location: url, 'access-control-allow-origin': '*' } });
  });
  const r = out[device] = { steps: [], pageErrors: [], contactPosts: [] };
  const sendReal = REAL && device === 'phone';
  await ctx.route(/mymemobrick\.com\/contact(\?|$)/, async route => {
    const q = route.request();
    if (q.method() !== 'POST') return route.continue();
    r.contactPosts.push({ real: sendReal, body: (q.postData() || '').slice(0, 6000) });
    if (sendReal) return route.continue();
    await route.fulfill({ status: 302, headers: { location: '/pages/editor?contact_posted=true' + (pv ? '&' + pv : '') } });
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => { if (!/cdn\.shopify\.com|tiktok|privacy_banner|Failed to fetch/.test(e.message)) r.pageErrors.push(e.message.slice(0, 200)); });
  page.on('dialog', d => d.dismiss().catch(() => {}));
  const shot = (name) => page.screenshot({ path: `${outdir}/${prefix}-${device}-${name}.jpg`, type: 'jpeg', quality: 55 }).catch(() => {});
  const step = async (name, fn) => { const t0 = Date.now(); try { await fn(); r.steps.push(`${name}: ok ${((Date.now() - t0) / 1000).toFixed(1)}s`); return true; } catch (e) { r.steps.push(`${name}: FAILED ${e.message.split('\n')[0].slice(0, 160)}`); await shot('FAILED-' + name); return false; } };
  const click = sel => page.locator(sel).filter({ visible: true }).first().click({ timeout: 15000 });
  const declineCookies = async () => { const b = page.locator('button:has-text("Decline")').filter({ visible: true }).first(); if (await b.count()) await b.click({ timeout: 3000 }).catch(() => {}); };
  const upload = async (url) => {
    for (let i = 0; i < 3 && !(await page.locator('#file').count()); i++) { await page.waitForTimeout(5000); await page.goto(url, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(3000); await declineCookies(); }
    await page.setInputFiles('#file', process.env.TEST_PHOTO);
    const self = page.locator('#dcSelf');
    await self.waitFor({ state: 'visible', timeout: 30000 }).then(() => self.click()).catch(() => {});
    await page.waitForTimeout(2500);
  };
  try {
    // ---------- 1. product page ----------
    await step('product-page', async () => { await page.goto(u('/products/unlimited-memobrick'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2000); await declineCookies(); });
    await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' }));
    r.product = await page.evaluate(() => {
      const buy = document.querySelector('.pdp-buy'); const t = buy ? buy.innerText : '';
      return { gkForm: !!document.querySelector('#gkForm'), qty: !!document.querySelector('#gkQty'), creatorBtn: /Design your own MemoBrick/.test(t),
        buyBtn: (document.querySelector('.pdp-buy button[type=submit]') || {}).innerText || null, steps: !!document.querySelector('.gk-steps'),
        stepsText: (document.querySelector('.gk-steps') || {}).innerText || null, sw: document.documentElement.scrollWidth, iw: innerWidth };
    });
    await shot('product');
    const steps = page.locator('.gk-steps');
    if (await steps.count()) { await steps.scrollIntoViewIfNeeded(); await shot('product-steps'); }
    if (r.product.gkForm) {
      await step('add-2-kits-to-cart', async () => {
        await page.selectOption('#gkQty', '2');
        await page.locator('#gkForm button:has-text("Add to cart")').click({ timeout: 10000 });
        await page.waitForURL(/\/cart/, { timeout: 30000 });
        await page.waitForTimeout(2000);
      });
      r.cartAfterAdd = await page.evaluate(async () => { const c = await (await fetch('/cart.js')).json(); return c.items.map(i => ({ title: i.product_title, qty: i.quantity, props: Object.keys(i.properties || {}) })); });
      await shot('cart-2-kits');
      await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' }));
    }
    if (theme === 'live') { r.note = 'live: product page only'; await ctx.close(); continue; }

    // ---------- 2. gift link ----------
    const giftUrl = u('/pages/editor?gift=%2399999&email=gift-test%40example.com&size=20x20', '#editor');
    await step('open-gift-link', async () => { await page.goto(giftUrl, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2500); await declineCookies(); });
    r.giftStart = await page.evaluate(() => ({ banner: (document.querySelector('.mbg-banner') || {}).innerText || null, giftClass: document.body.classList.contains('mb-gift'),
      emailGateCfg: window.MB_EMAIL_GATE ? window.MB_EMAIL_GATE.enabled : null }));
    await step('upload-generated-photo', () => upload(giftUrl));
    await step('email-gate-not-shown', async () => { const s = page.locator('.mbeg-skip').filter({ visible: true }); if (await s.count()) throw new Error('email gate visible'); });
    await page.waitForTimeout(1500);
    await shot('gift-editor');
    const labels = () => page.evaluate(() => ({
      finish: [...document.querySelectorAll('#edTopFinish,#mobFinish,#orderBtn')].map(b => b.id + '=' + b.innerText.trim()),
      sizes: [...document.querySelectorAll('#sizeGrid .sizebtn')].filter(b => b.style.display !== 'none').map(b => b.dataset.id + ' ' + (b.querySelector('small') || {}).innerText),
      mobSizes: [...document.querySelectorAll('.mob-size')].filter(b => b.style.display !== 'none').map(b => b.dataset.size + ' ' + (b.querySelector('em') || {}).innerText),
      dollarsShown: [...document.querySelectorAll('.editor, #editor, .mob-sheet, .mbg-banner')].some(e => e.offsetParent !== null && /\$\d/.test(e.innerText)),
      credit: (document.querySelector('#mbgCredit') || {}).innerText || null, mobCredit: (document.querySelector('#mbgMobCredit') || {}).innerText || null,
      pricesVisible: [...document.querySelectorAll('#pcAmt,#mobTopPrice,#bbPrice')].filter(e => e.offsetParent).map(e => e.id),
      size: (document.querySelector('#sizeAll') || {}).value, banner: (document.querySelector('.mbg-banner') || {}).innerText }));
    r.giftLabels1 = await labels();
    if (device === 'phone') {
      const sz = page.locator('[data-tool="size"]').filter({ visible: true }).first();
      if (await sz.count()) { await sz.click().catch(() => {}); await page.waitForTimeout(1200); r.giftLabels1 = await labels(); await shot('gift-sizes'); }
    }
    // ---------- combine ----------
    await step('add-second-gift-link', async () => {
      // the link under the size choices first (on phones the top banner sits under the full-screen editor)
      const under = page.locator('.mbg-addlink').filter({ visible: true }).first();
      if (await under.count()) { await under.scrollIntoViewIfNeeded(); await under.click({ timeout: 15000 }); }
      else await page.locator('[data-mbg-add]').filter({ visible: true }).first().click({ timeout: 15000 });
      await page.locator('#mbgLink').waitFor({ state: 'visible', timeout: 10000 });
      await page.fill('#mbgLink', 'https://mymemobrick.com/pages/editor?gift=%2399998&email=gift-test%40example.com&size=20x20');
      await shot('gift-add-link');
      await page.locator('.mbg-card button[type=submit]').click();
      await page.waitForTimeout(1500);
    });
    r.giftLabels2 = await labels();
    if (device === 'phone') {
      await step('pick-20x30-phone', async () => { await page.locator('.mob-size[data-size="20x30"]').filter({ visible: true }).first().click({ timeout: 10000 }); await page.waitForTimeout(2500); });
      r.giftLabels3 = await labels();
    }
    if (device === 'desktop') {
      // 30x30 is not covered by 2 kits: gift mode must refuse it and go back to an included size
      await step('locked-30x30-refused', async () => { await page.evaluate(() => { const s = document.querySelector('#sizeAll'); s.value = '30x30'; s.dispatchEvent(new Event('change', { bubbles: true })); }); await page.waitForTimeout(2500);
        const v = await page.evaluate(() => document.querySelector('#sizeAll').value); if (v === '30x30') throw new Error('30x30 kept'); });
      r.giftLabels3 = await labels();
    }
    await shot('gift-two-kits');
    // ---------- submit ----------
    await step('finish-opens-details', async () => {
      await click(device === 'phone' ? '#mobFinish' : '#edTopFinish');
      await page.locator('#mbgName').waitFor({ state: 'visible', timeout: 15000 });
    });
    r.details = await page.evaluate(() => (document.querySelector('.mbg-card') || {}).innerText || null);
    await shot('gift-details');
    await step('fill-and-send', async () => {
      await page.fill('#mbgName', 'TEST Gift Recipient (site-developer test, please ignore)');
      await page.fill('#mbgEmail', 'gift-test@example.com');
      await page.fill('#mbgA1', '1 Test Street');
      await page.fill('#mbgCity', 'Miami'); await page.fill('#mbgState', 'FL'); await page.fill('#mbgZip', '33101');
      await page.fill('#mbgNote', 'TEST submission by Memobrick site-developer agent. No order, please ignore.');
      const ok = page.locator('#mbgDiffOk'); if (await ok.count()) await ok.check();
      await page.locator('.mbg-card button[type=submit]').click();
      await page.locator('.mbg-done').waitFor({ state: 'visible', timeout: 120000 });
      await page.waitForTimeout(1000);
    });
    r.done = await page.evaluate(() => (document.querySelector('.mbg-done') || {}).innerText || null);
    await shot('gift-done');
    r.cartAfterGift = await page.evaluate(async () => { const t = await (await fetch('/cart.js')).text(); try { return JSON.parse(t).item_count; } catch (e) { return 'not JSON (bot check?): ' + t.slice(0, 80); } });
    r.usedFlag = await page.evaluate(() => localStorage.getItem('mb_gift_used'));
    // ---------- used link ----------
    await step('reopen-used-link', async () => { await page.goto(giftUrl, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2500); await page.locator('.mbg-used').waitFor({ state: 'visible', timeout: 15000 }); });
    r.used = await page.evaluate(() => (document.querySelector('.mbg-used') || {}).innerText || null);
    await shot('gift-used');
    // ---------- 4. normal editor ----------
    const normalUrl = u('/pages/editor', '#editor');
    await step('normal-open', async () => { await page.evaluate(() => { try { sessionStorage.clear(); } catch (e) {} }); await page.goto(normalUrl, { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2000); });
    await step('normal-upload', () => upload(normalUrl));
    await step('normal-email-gate-skip-if-shown', async () => { const s = page.locator('.mbeg-skip').filter({ visible: true }).first(); if (await s.count()) await s.click({ timeout: 5000 }); await page.waitForTimeout(800); });
    r.normal = await page.evaluate(() => ({ banner: !!document.querySelector('.mbg-banner'), giftClass: document.body.classList.contains('mb-gift'),
      finish: [...document.querySelectorAll('#edTopFinish,#mobFinish')].map(b => b.id + '=' + b.innerText.trim()),
      price: ((document.querySelector('#mobTopPrice') || {}).innerText || '') + ' ' + ((document.querySelector('#pcAmt') || {}).innerText || '') }));
    await shot('normal-editor');
    await step('normal-finish-to-drawer', async () => {
      await page.keyboard.press('Escape').catch(() => {});
      await click(device === 'phone' ? '#mobFinish' : '#edTopFinish');
      await page.locator('#cartDrawerCheckout').filter({ visible: true }).first().waitFor({ timeout: 90000 });
      await page.waitForTimeout(2000);
    });
    r.normalCart = await page.evaluate(async () => { const c = await (await fetch('/cart.js')).json(); const l = c.items[0] || {}; return { count: c.item_count, title: l.product_title, designId: (l.properties || {})['Design ID'] || null, finalDesign: !!(l.properties || {})['Final Design'] }; });
    await shot('normal-drawer');
  } catch (e) { r.fatal = e.message.slice(0, 300); }
  await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' })).catch(() => {});
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/${prefix}-results.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
