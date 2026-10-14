// Checks that the Pro Design page keeps the size from ?size= (item A-2026W42-013).
// Usage: node prodesign-size.mjs <themeId|live> <outdir> <prefix>
// Read-only: opens pages, takes screenshots, never adds to cart or opens checkout.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
const [,, theme, outdir, prefix] = process.argv;
const pv = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const results = [];
for (const device of ['phone', 'desktop']) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device === 'phone', hasTouch: device === 'phone',
    userAgent: device === 'phone'
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message.slice(0, 160)));
  for (const size of ['20x20', '16x16', '40x30', '']) {
    const q = [size ? `size=${size}` : '', pv].filter(Boolean).join('&');
    const url = `https://mymemobrick.com/pages/editor${q ? '?' + q : ''}#design`;
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(2500);
    const info = await page.evaluate(() => {
      const t = s => (document.querySelector(s)?.textContent || '').trim();
      const on = [...document.querySelectorAll('#svcSizes .svc-size.on')].map(b => b.dataset.size);
      const card = document.querySelector('#svcSizes');
      return { label: t('#svcSizeLbl'), price: t('#svcPrice'), bricks: t('#svcBricks'), on, more: t('#svcMoreSizes'),
        cards: document.querySelectorAll('#svcSizes .svc-size').length,
        stickyStyle: !!document.querySelector('style[data-mb-sticky-topbar]'),
        sw: document.documentElement.scrollWidth, iw: innerWidth,
        cardTop: card ? Math.round(card.getBoundingClientRect().top + scrollY) : null };
    });
    const sel = await page.$('#svcSizes .svc-size.on');
    if (sel) await sel.scrollIntoViewIfNeeded();
    else await page.$('#svcSizes').then(e => e && e.scrollIntoViewIfNeeded());
    await page.waitForTimeout(400);
    const file = `${prefix}-${device}-prodesign-${size || 'nosize'}.jpg`;
    await page.screenshot({ path: `${outdir}/${file}`, type: 'jpeg', quality: 60 });
    results.push({ device, size: size || '(none)', ...info, file });
  }
  results.push({ device, pageErrors: errs });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 1));
