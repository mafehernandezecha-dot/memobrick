// Real editor -> cart drawer -> cart page -> checkout test (2026-10-20, A-2026W42-046).
// Usage: TEST_PHOTO=<generated image> node editor-cart-checkout-test.mjs <themeId|live> <outdir> <prefix>
// Uploads a GENERATED test picture (never a customer or real person photo) in the real editor, lets the editor
// make its own design (real Design ID and Final Design file), clicks Checkout from the drawer and the cart page,
// and stops at the Contact step. Never enters an email, address or payment. Clears the test cart at the end.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, theme, outdir, prefix] = process.argv;
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
  // Dismiss Shopify's cookie box up front (declined) so it does not cover the page in screenshots.
  // The sandbox blocks cdn.shopify.com. Serve the store's own uploaded files through the store domain
  // (same file, Shopify's /cdn/shop/ path) so the screenshots show what a real visitor sees.
  await ctx.route(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\/(uploads|files)\//, async route => {
    const url = route.request().url().replace(/^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0375\/0107\/5595\//, 'https://mymemobrick.com/cdn/shop/');
    await route.fulfill({ status: 302, headers: { location: url, 'access-control-allow-origin': '*' } });
  });
  const page = await ctx.newPage();
  const r = out[device] = { steps: [], pageErrors: [], themeConsoleErrors: [] };
  let lastLocation = null;
  page.on('pageerror', e => { if (!/cdn\.shopify\.com|tiktok|privacy_banner|Failed to fetch/.test(e.message)) r.pageErrors.push(e.message.slice(0, 200)); });
  page.on('console', m => { if (m.type() === 'error' && /memobrick|cart\.liquid|mbShip/i.test(m.text()) && !/Reach Pixel|Failed to load resource/.test(m.text())) r.themeConsoleErrors.push(m.text().slice(0, 200)); });
  page.on('response', resp => { const q = resp.request(); if (q.isNavigationRequest() && q.frame() === page.mainFrame() && resp.headers()['location']) lastLocation = resp.headers()['location']; });
  const step = async (name, fn) => { const t0 = Date.now(); try { await fn(); r.steps.push(`${name}: ok ${((Date.now() - t0) / 1000).toFixed(1)}s`); return true; } catch (e) { r.steps.push(`${name}: FAILED ${e.message.split('\n')[0].slice(0, 160)}`); await page.screenshot({ path: `${outdir}/${prefix}-${device}-FAILED-${name}.jpg`, type: 'jpeg', quality: 55 }).catch(() => {}); return false; } };
  const click = sel => page.locator(sel).filter({ visible: true }).first().click({ timeout: 15000 });
  const declineCookies = async () => { const b = page.locator('button:has-text("Decline")').filter({ visible: true }).first(); if (await b.count()) await b.click({ timeout: 3000 }).catch(() => {}); };
  const toCheckout = async (label) => {
    await page.waitForURL(/\/checkouts?\/|chrome-error/, { timeout: 30000 }).catch(() => {});
    const tok = (lastLocation || '').match(/\/cn\/([^/?]+)/);
    r[label + 'Redirect'] = lastLocation ? lastLocation.replace(/\?.*/, '').replace(/cn\/[^/]+/, 'cn/<token>') : null;
    if (tok && !/mymemobrick\.com\/checkouts/.test(page.url())) await page.goto(`https://mymemobrick.com/checkouts/cn/${tok[1]}?skip_shop_pay=true`, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(4000);
    r[label + 'Checkout'] = { title: await page.title(), contactStep: await page.locator('input[name="email"], input[autocomplete*="email"]').count() > 0 };
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-${label}-checkout.jpg`, type: 'jpeg', quality: 55 });
  };
  try {
    await page.goto(u('/'), { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1500); await declineCookies();
    await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' }));
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
      await page.waitForTimeout(2500);
    });
    if (ok) {
      r.line = await page.evaluate(async () => { const c = await (await fetch('/cart.js')).json(); const l = c.items[0] || {}; return { count: c.item_count, total: c.total_price, title: l.product_title, variant: l.variant_title, designId: (l.properties || {})['Design ID'] || null, finalDesign: ((l.properties || {})['Final Design'] || '').slice(0, 100), propKeys: Object.keys(l.properties || {}) }; });
      r.drawer = await page.evaluate(() => { const d = document.querySelector('#cartDrawer'); const img = d?.querySelector('.cart-drawer-item img'); return { imgSrc: img ? img.getAttribute('src').slice(0, 100) : null, imgLoaded: img ? img.naturalWidth > 0 : null, text: d?.innerText.replace(/\s+/g, ' ').trim().slice(0, 300) }; });
      await page.screenshot({ path: `${outdir}/${prefix}-${device}-drawer.jpg`, type: 'jpeg', quality: 55 });
      await step('drawer-checkout', async () => { await click('#cartDrawerCheckout'); await toCheckout('drawer'); });
      await step('cart-page', async () => { await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }); await page.waitForTimeout(2000); await declineCookies(); });
      r.cart = await page.evaluate(() => {
        const t = document.body.innerText; const btn = document.querySelector('form[action="/cart"] button[name="checkout"]'); const rc = btn.getBoundingClientRect();
        const img = document.querySelector('form[action="/cart"] img');
        const below = []; let el = btn.closest('div').nextElementSibling; while (el) { below.push(el.innerText.replace(/\s+/g, ' ').trim().slice(0, 80)); el = el.nextElementSibling; }
        return { checkoutTop: Math.round(rc.top), inFirstScreen: rc.bottom <= innerHeight, imgSrc: img ? img.getAttribute('src').slice(0, 100) : null, imgAlt: img?.alt, imgLoaded: img ? img.naturalWidth > 0 : null,
          shownProps: [...t.matchAll(/^([A-Z][A-Za-z ]+): .*$/gm)].map(m => m[0].slice(0, 50)), kitLabel: /Build-at-home kit/.test(t), rawBuildAtHome: /No \(Build at home\)/.test(t),
          underCheckout: below, shippingBox: !!document.querySelector('#mbShip'), freeLine: /Free US shipping on orders|more to get free shipping/.test(t), estimator: /Get rates/.test(t), dec15: /December 15/.test(t), taxes: (t.match(/Taxes[^\n]*/) || [null])[0],
          sw: document.documentElement.scrollWidth, iw: innerWidth };
      });
      await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart.jpg`, type: 'jpeg', quality: 55 });
      await step('cart-checkout', async () => { await page.locator('form[action="/cart"] button[name="checkout"]').click({ timeout: 10000 }); await toCheckout('cart'); });
    }
  } catch (e) { r.fatal = e.message.slice(0, 300); }
  await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' })).catch(() => {});
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
