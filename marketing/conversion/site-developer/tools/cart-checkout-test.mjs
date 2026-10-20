// Cart -> checkout test (2026-10-20, A-2026W42-045 rollback).
// Usage: node cart-checkout-test.mjs <themeId|live> <outdir> <prefix>
// Adds one kit to this test browser's own cart with a generated test picture as "Final Design"
// (no real photo), opens the cart drawer and the cart page, clicks Checkout until Shopify's
// checkout page loads, and stops there. Never enters an email, address or payment.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, theme, outdir, prefix] = process.argv;
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (path) => `https://mymemobrick.com${path}${pv ? (path.includes('?') ? '&' : '?') + pv : ''}`;
const VARIANT = 43590610682076; // 10x10 build-at-home kit, as in earlier tests
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const out = {};
const devices = (process.env.DEVICES || 'phone,desktop').split(',');
for (const device of devices) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone',
    userAgent: device === 'phone'
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  // The sandbox cannot reach shop.app (Shop Pay). After the Checkout click is redirected there, the same checkout
  // token is opened on the store's own checkout with skip_shop_pay=true.
  const page = await ctx.newPage();
  const r = out[device] = { console: [], pageErrors: [], failed: [] };
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') r.console.push(`${m.type()}: ${m.text().slice(0, 300)} @ ${page.url().replace(/\?.*/, '')}`); });
  page.on('pageerror', e => r.pageErrors.push(`${e.message.slice(0, 300)} @ ${page.url().replace(/\?.*/, '')}`));
  r.nav = []; let lastLocation = null;
  page.on('requestfailed', q => { const f = q.failure()?.errorText || ''; if (!/ERR_ABORTED/.test(f) && /mymemobrick\.com|shop\.app|\/checkouts?\//.test(q.url())) r.failed.push(`${f} ${q.url().slice(0, 140)}`); });
  page.on('response', resp => { const q = resp.request(); if (q.isNavigationRequest() && q.frame() === page.mainFrame()) r.nav.push(`${resp.status()} ${q.url().replace(/\?.*/, '').slice(0, 110)}${(resp.headers()['location'] && (lastLocation = resp.headers()['location'])) ? ' -> ' + resp.headers()['location'].replace(/\?.*/, '').slice(0, 110) : ''}`); });
  try {
    await page.goto(u('/'), { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);
    r.add = await page.evaluate(async (VARIANT) => {
      await fetch('/cart/clear.js', { method: 'POST' });
      const c = document.createElement('canvas'); c.width = c.height = 400;
      const g = c.getContext('2d');
      for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) { g.fillStyle = `hsl(${(x * 18 + y * 7) % 360},60%,${45 + (y % 3) * 8}%)`; g.fillRect(x * 20, y * 20, 20, 20); }
      const blob = await new Promise(b => c.toBlob(b, 'image/png'));
      const fd = new FormData();
      fd.append('id', VARIANT); fd.append('quantity', 1);
      const props = { 'Design ID': 'TEST-ROLLBACK-1020', 'Brick grid': '40x40', 'Build service': 'No', 'Orientation': 'square', 'Design method': 'Self design' };
      Object.entries(props).forEach(([k, v]) => fd.append(`properties[${k}]`, v));
      fd.append('properties[Final Design]', blob, 'memobrick-test.png');
      const res = await fetch('/cart/add.js', { method: 'POST', body: fd });
      const j = await res.json().catch(() => ({}));
      return { status: res.status, finalDesign: (j.properties || {})['Final Design'] || null, price: j.final_line_price };
    }, VARIANT);
    // Cart drawer (what the editor opens after "add to cart")
    await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(2000);
    r.drawer = await page.evaluate(async () => {
      if (!window.MB_openCartDrawer) return { available: false };
      window.MB_openCartDrawer();
      await new Promise(s => setTimeout(s, 2500));
      const d = document.querySelector('#cartDrawer');
      const img = d?.querySelector('.cart-drawer-item img');
      const foot = d?.querySelector('#cartDrawerFoot');
      const co = foot && [...foot.querySelectorAll('a,button')].find(e => /checkout/i.test(e.textContent + (e.getAttribute('href') || '')));
      const rc = co?.getBoundingClientRect();
      return { available: true, open: d && !d.hidden, imgSrc: img ? img.getAttribute('src').slice(0, 120) : null,
        itemText: d?.querySelector('.cart-drawer-item-info')?.innerText.replace(/\s+/g, ' ').trim(),
        checkout: co ? { tag: co.tagName, text: co.textContent.trim(), href: co.getAttribute('href'), top: Math.round(rc.top), bottom: Math.round(rc.bottom), inView: rc.bottom <= innerHeight && rc.top >= 0 } : null };
    });
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-drawer.jpg`, type: 'jpeg', quality: 60 });
    if (r.drawer.checkout) {
      const t0 = Date.now();
      await page.locator('#cartDrawerFoot').getByText(/checkout/i).first().click({ timeout: 10000 }).catch(e => r.drawer.clickErr = e.message.slice(0, 200));
      await page.waitForURL(/\/checkouts?\/|chrome-error/, { timeout: 30000 }).catch(() => {});
      r.drawer.redirect = r.nav.filter(x => /^30\d .*shop\.app\/checkout/.test(x)).pop() || null;
      { const tok = (lastLocation || '').match(/\/cn\/([^/?]+)/);
        if (tok && !/mymemobrick\.com\/checkouts/.test(page.url())) await page.goto(`https://mymemobrick.com/checkouts/cn/${tok[1]}?skip_shop_pay=true`, { waitUntil: 'load', timeout: 60000 }).catch(e => r.drawer.skipErr = e.message.slice(0, 200)); }
      await page.waitForTimeout(4000);
      r.drawer.after = { url: page.url().replace(/\?.*/, '').replace(/\/c\/[^/]+/, '/c/<token>').replace(/checkouts\/[^/?]+/, 'checkouts/<token>'), secs: ((Date.now() - t0) / 1000).toFixed(1), title: await page.title() };
      await page.screenshot({ path: `${outdir}/${prefix}-${device}-drawer-checkout.jpg`, type: 'jpeg', quality: 60 });
    }
    // Cart page
    await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2000);
    r.cart = await page.evaluate(() => {
      const t = document.body.innerText;
      const btn = document.querySelector('form[action="/cart"] button[name="checkout"]');
      const rc = btn?.getBoundingClientRect();
      const img = document.querySelector('form[action="/cart"] img');
      const at = btn ? document.elementFromPoint(rc.left + rc.width / 2, rc.top + rc.height / 2) : null;
      return { checkoutBtn: btn ? { top: Math.round(rc.top), bottom: Math.round(rc.bottom), inFirstScreen: rc.bottom <= innerHeight, disabled: btn.disabled, topElementIsButton: at === btn || btn.contains(at) } : null,
        imgSrc: img ? img.getAttribute('src').slice(0, 120) : null,
        shownFields: [...t.matchAll(/^(Final Design|Design ID|Brick grid|Build service|Orientation|Design method):.*$/gm)].map(m => m[0].slice(0, 60)),
        variantLine: (t.match(/Build-at-home kit|No \(Build at home\)|10x10[^\n]*/) || [null])[0],
        shippingBox: !!document.querySelector('#mbShip'), freeLine: /Free US shipping on orders \$125/.test(t), dec15: /December 15/.test(t),
        footnote: (t.match(/Taxes[^\n]*/) || [null])[0], overlays: [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return (s.position === 'fixed') && s.display !== 'none' && s.visibility !== 'hidden' && b.width * b.height > 40000; }).map(e => (e.id || e.className || e.tagName).toString().slice(0, 60)),
        sw: document.documentElement.scrollWidth, iw: innerWidth };
    });
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart.jpg`, type: 'jpeg', quality: 60 });
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart-full.jpg`, type: 'jpeg', quality: 60, fullPage: true });
    const t1 = Date.now();
    await page.locator('form[action="/cart"] button[name="checkout"]').click({ timeout: 10000 }).catch(e => r.cart.clickErr = e.message.slice(0, 200));
    await page.waitForURL(/\/checkouts?\/|chrome-error/, { timeout: 30000 }).catch(() => {});
    r.cart.redirect = r.nav.filter(x => /^30\d .*shop\.app\/checkout/.test(x)).pop() || null;
    { const tok = (lastLocation || '').match(/\/cn\/([^/?]+)/);
      if (tok && !/mymemobrick\.com\/checkouts/.test(page.url())) await page.goto(`https://mymemobrick.com/checkouts/cn/${tok[1]}?skip_shop_pay=true`, { waitUntil: 'load', timeout: 60000 }).catch(e => r.cart.skipErr = e.message.slice(0, 200)); }
    await page.waitForTimeout(4000);
    r.cart.after = { url: page.url().replace(/\?.*/, '').replace(/checkouts\/[^/?]+/, 'checkouts/<token>').replace(/\/c\/[^/]+/, '/c/<token>'), secs: ((Date.now() - t1) / 1000).toFixed(1), title: await page.title(),
      hasContactField: await page.locator('input[name="email"], input[autocomplete*="email"]').count() };
    await page.screenshot({ path: `${outdir}/${prefix}-${device}-checkout.jpg`, type: 'jpeg', quality: 60 });
    // leave nothing behind
    await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' })).catch(() => {});
  } catch (e) { r.fatal = e.message.slice(0, 300); }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
