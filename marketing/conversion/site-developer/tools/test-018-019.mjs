// A-2026W44-018 and 019 test. Usage: TEST_PHOTO=<generated image> node test-018-019.mjs <themeId|live> <outdir> <prefix> [skipEditor]
// Uploads only a GENERATED picture. Stops at the cart page: never clicks Checkout, never enters any details. Clears the test cart at the end.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, theme, outdir, prefix, skipEditor] = process.argv;
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (path, hash = '') => `https://mymemobrick.com${path}${pv ? (path.includes('?') ? '&' : '?') + pv : ''}${hash}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const out = {};
for (const device of (process.env.DEVICES || 'phone,desktop').split(',')) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone', deviceScaleFactor: device === 'phone' ? 2.5 : 1,
    userAgent: device === 'phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  await ctx.route(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\/(uploads|files)\//, async route => {
    const url = route.request().url().replace(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\//, 'https://mymemobrick.com/cdn/shop/');
    await route.fulfill({ status: 302, headers: { location: url, 'access-control-allow-origin': '*' } });
  });
  const page = await ctx.newPage();
  const r = out[device] = { steps: [], pageErrors: [] };
  page.on('pageerror', e => { if (!/cdn\.shopify\.com|tiktok|privacy_banner|Failed to fetch/.test(e.message)) r.pageErrors.push(e.message.slice(0, 200)); });
  const step = async (name, fn) => { const t0 = Date.now(); try { await fn(); r.steps.push(`${name}: ok ${((Date.now() - t0) / 1000).toFixed(1)}s`); return true; } catch (e) { r.steps.push(`${name}: FAILED ${e.message.split('\n')[0].slice(0, 160)}`); await page.screenshot({ path: `${outdir}/${prefix}-${device}-FAILED-${name}.jpg`, type: 'jpeg', quality: 55 }).catch(() => {}); return false; } };
  const click = sel => page.locator(sel).filter({ visible: true }).first().click({ timeout: 15000 });
  const declineCookies = async () => { const b = page.locator('button:has-text("Decline")').filter({ visible: true }).first(); if (await b.count()) await b.click({ timeout: 3000 }).catch(() => {}); };
  const fb = () => page.evaluate(() => [...document.querySelectorAll('.hulk-form-embed')].map(w => { const f = w.querySelector('.fp-fallback'); const a = f && f.querySelector('a'); const rc = f && f.getBoundingClientRect();
    return { fallbackExists: !!f, fallbackVisible: !!(f && !f.hidden && rc.height > 0), btnHref: a ? a.getAttribute('href').slice(0, 80) : null, btnW: a ? Math.round(a.getBoundingClientRect().width) : null, formFields: w.querySelectorAll('.pxFormGenerator input,.pxFormGenerator textarea,.pxFormGenerator select,.pxFormGenerator iframe').length }; }));
  const sw = () => page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
  try {
    // 018 a: /pages/free-preview, Hulk script as the sandbox gets it (blocked)
    await step('free-preview', async () => { await page.goto(u('/pages/free-preview'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(1500); await declineCookies(); });
    await page.waitForTimeout(3000); r.fp_at_4s = await fb();
    await page.waitForTimeout(7000); r.fp_at_11s = await fb(); r.fp_sw = await sw();
    await page.locator('#proofForm').scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(500);
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-free-preview.jpg`, type: 'jpeg', quality: 60 });
    // 018 b: same page, a form that does load (a field is put into the Hulk box at 3 s, as the Hulk script would)
    if (theme !== 'live') {
      await page.goto(u('/pages/free-preview'), { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(3000);
      await page.evaluate(() => { const g = document.querySelector('.pxFormGenerator'); const i = document.createElement('input'); i.placeholder = 'TEST simulated Hulk field'; g.appendChild(i); });
      await page.waitForTimeout(9000); r.fp_formLoaded_at_12s = await fb();
      // late form: field appears at 14 s, fallback must hide again
      await page.goto(u('/pages/free-preview'), { waitUntil: 'load', timeout: 60000 });
      await page.waitForTimeout(10000); r.fp_late_before = await fb();
      await page.evaluate(() => { const g = document.querySelector('.pxFormGenerator'); const i = document.createElement('input'); g.appendChild(i); });
      await page.waitForTimeout(4000); r.fp_late_after = await fb();
    }
    // 018 c: home page "Not sure yet? Get a free design proof first" view
    await step('home-proof-view', async () => { await page.goto(u('/'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(1500); await declineCookies();
      await page.locator('[data-go="freeproof"]').filter({ visible: true }).first().click({ timeout: 15000 }); });
    await page.waitForTimeout(10000); r.home_at_11s = await fb(); r.home_sw = await sw();
    await page.locator('#view-freeproof .fp-form-card').scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(500);
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-home-proof-view.jpg`, type: 'jpeg', quality: 60 });

    // 019: real editor path, then a bare kit line and a frame
    await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' }));
    if (!skipEditor) {
      let ok = await step('open-editor', async () => { await page.goto(u('/pages/editor', '#editor'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2000); await declineCookies(); });
      ok = ok && await step('upload-generated-photo', async () => {
        for (let i = 0; i < 3 && !(await page.locator('#file').count()); i++) { await page.waitForTimeout(5000); await page.goto(u('/pages/editor', '#editor'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(3000); await declineCookies(); }
        await page.setInputFiles('#file', process.env.TEST_PHOTO); await page.locator('#dcSelf').waitFor({ state: 'visible', timeout: 30000 }); });
      ok = ok && await step('design-myself', async () => { await click('#dcSelf'); await page.waitForTimeout(1200); });
      if (ok) await step('email-gate-skip-if-shown', async () => { const s = page.locator('.mbeg-skip').filter({ visible: true }).first(); if (await s.count()) await s.click({ timeout: 5000 }); await page.waitForTimeout(800); });
      ok = ok && await step('finish-and-add-to-cart', async () => {
        await page.keyboard.press('Escape').catch(() => {});
        await click(device === 'phone' ? '#mobFinish' : 'button:has-text("Finish Editing")');
        await page.locator('#cartDrawerCheckout').filter({ visible: true }).first().waitFor({ timeout: 60000 });
        await page.waitForTimeout(2500); });
      await step('cart-editor-only', async () => { await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(1500); await declineCookies(); });
      r.cartEditorOnly = await page.evaluate(() => ({ notices: document.querySelectorAll('.mb-kit-nophoto').length, editAgain: /Edit this design again/.test(document.body.innerText), lines: document.querySelectorAll('form[action="/cart"] input[name="updates[]"]').length }));
      await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart-editor-line.jpg`, type: 'jpeg', quality: 60 });
    }
    await step('add-bare-kit-and-frame', async () => {
      const res = await page.evaluate(async () => { const a = await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: 33536109281419, quantity: 1 }, { id: 33176299208843, quantity: 1 }] }) }); return a.status; });
      if (res !== 200) throw new Error('add ' + res); });
    await step('cart-mixed', async () => { await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(1500); await declineCookies(); });
    r.cartMixed = await page.evaluate(() => { const rows = [...document.querySelectorAll('form[action="/cart"] > div')].filter(d => d.querySelector('input[name="updates[]"]'));
      return { rows: rows.map(d => ({ title: (d.querySelector('b')?.innerText || '').slice(0, 60), notice: !!d.querySelector('.mb-kit-nophoto'), editAgain: /Edit this design again/.test(d.innerText) })), sw: document.documentElement.scrollWidth, iw: innerWidth }; });
    const n = page.locator('.mb-kit-nophoto').first(); if (await n.count()) await n.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart-mixed.jpg`, type: 'jpeg', quality: 60, fullPage: true });
  } catch (e) { r.fatal = e.message.slice(0, 300); }
  await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' })).catch(() => {});
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
