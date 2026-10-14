// Quick check that the 2026-10-14 bundle (A-2026W42-009, -010, -013, -021, -022) is in place.
// Usage: node verify-bundle.mjs <themeId|live> <outdir> <prefix>
// Adds one 10x10 kit to this test browser's own cart (never checks out, never pays, no address entered).
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, theme, outdir, prefix] = process.argv;
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (path, q = '') => `https://mymemobrick.com${path}?${[q, pv].filter(Boolean).join('&')}`.replace(/\?$/, '');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const out = {};
for (const device of ['phone', 'desktop']) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone',
    userAgent: device === 'phone'
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  const r = out[device] = {};
  // 009 home: CTA above the fold on phone, hidden on desktop
  await page.goto(u('/'), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  r.home = await page.evaluate(() => {
    const top = document.querySelector('.hero-cta-top');
    const vis = top && getComputedStyle(top).display !== 'none';
    const b = top && top.querySelector('a');
    return { block: !!top, visible: !!vis, btnTop: vis ? Math.round(b.getBoundingClientRect().top) : null,
      note: top ? top.innerText.replace(/\s+/g, ' ').trim() : null, sw: document.documentElement.scrollWidth, iw: innerWidth };
  });
  await page.screenshot({ path: `${outdir}/${prefix}-${device}-home.jpg`, type: 'jpeg', quality: 60 });
  // 010 email gate script version, 022 sticky style, 013 Pro Design size
  await page.goto(u('/pages/editor', 'size=20x20') + '#design', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2500);
  r.editor = await page.evaluate(async () => {
    const gate = [...document.scripts].map(s => s.src).find(s => /memobrick-email-gate/.test(s));
    let gateAB = null;
    if (gate) { try { gateAB = /mb_ab_gate/.test(await (await fetch(gate)).text()); } catch (e) { gateAB = 'fetch failed: ' + e.message; } }
    return { stickyStyle: !!document.querySelector('style[data-mb-sticky-topbar]'),
      proSize: (document.querySelector('#svcSizeLbl')?.textContent || '').trim(),
      proOn: [...document.querySelectorAll('#svcSizes .svc-size.on')].map(b => b.dataset.size), gateSrc: gate || null, gateAB };
  });
  await page.screenshot({ path: `${outdir}/${prefix}-${device}-prodesign-20x20.jpg`, type: 'jpeg', quality: 60 });
  // 021 cart page
  await page.evaluate(async () => {
    await fetch('/cart/clear.js', { method: 'POST' });
    await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: 43590610682076, quantity: 1 }) });
  });
  await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  r.cart = await page.evaluate(() => {
    const t = document.body.innerText;
    return { freeLine: /Free US shipping on orders \$125 and up/.test(t), addMore: (t.match(/Add \$[\d.,]+ more[^\n]*/) || [null])[0],
      dec15: /December 15/.test(t), zip: !!document.querySelector('input[name*="zip" i], input[id*="zip" i], input[autocomplete="postal-code"]'),
      sw: document.documentElement.scrollWidth, iw: innerWidth };
  });
  await page.screenshot({ path: `${outdir}/${prefix}-${device}-cart.jpg`, type: 'jpeg', quality: 60, fullPage: true });
  await page.evaluate(() => fetch('/cart/clear.js', { method: 'POST' }));
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
