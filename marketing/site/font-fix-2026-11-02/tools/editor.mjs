// Editor + cart walk with a generated test image (no person). Stops at the cart. No checkout, no order.
// Usage: node editor.mjs <themeId|live> <phone|desktop> <outdir> <label>
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, theme, dev, outdir, label] = process.argv;
fs.mkdirSync(outdir, { recursive: true });
const q = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (p) => { const [a, h] = p.split('#'); return `https://mymemobrick.com${a}${q ? (a.includes('?') ? '&' : '?') + q : ''}${h ? '#' + h : ''}`; };
const vp = dev === 'phone' ? { width: 390, height: 844 } : { width: 1366, height: 900 };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: vp, isMobile: dev === 'phone', hasTouch: dev === 'phone', deviceScaleFactor: 1,
  userAgent: dev === 'phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
await ctx.route(/^https:\/\/shop\.app\//, r => r.abort());
const page = await ctx.newPage();
const log = [];
const shot = async (name, full) => page.screenshot({ path: `${outdir}/${label}-${dev}-${name}.jpg`, type: 'jpeg', quality: 60, fullPage: !!full }).catch(() => {});
const check = async (name) => {
  const r = await page.evaluate(() => {
    const clipped = []; const small = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      const rc = el.getBoundingClientRect(); if (rc.width < 1 || rc.height < 1) continue;
      let own = ''; for (const c of el.childNodes) if (c.nodeType === 3) own += c.textContent; own = own.trim();
      if (!own) continue;
      const s = getComputedStyle(el);
      if ((s.overflow === 'hidden' || s.textOverflow === 'ellipsis' || s.whiteSpace === 'nowrap') && el.scrollWidth > el.clientWidth + 1) clipped.push(`${el.tagName.toLowerCase()}.${(el.className && el.className.baseVal === undefined ? el.className : '').split(' ')[0]} "${own.slice(0, 30)}" ${el.scrollWidth}>${el.clientWidth}`);
      if (parseFloat(s.fontSize) < 14) small.push(`${parseFloat(s.fontSize)} ${s.fontFamily.split(',')[0]} ${el.tagName.toLowerCase()}.${(el.className && el.className.baseVal === undefined ? el.className : '').split(' ')[0]} "${own.slice(0, 30)}"`);
    }
    const fams = {}; for (const el of document.querySelectorAll('body *')) { const f = getComputedStyle(el).fontFamily.split(',')[0].replace(/"/g, ''); fams[f] = (fams[f] || 0) + 1; }
    return { sw: document.documentElement.scrollWidth, iw: innerWidth, clipped: clipped.slice(0, 30), small, mono: Object.keys(fams).filter(f => /mono/i.test(f)) };
  });
  log.push({ name, ...r });
};
const click = async (sel) => page.locator(sel).filter({ visible: true }).first().click({ timeout: 15000 });
try {
  await page.goto(u('/pages/editor?size=20x20#editor'), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2500);
  const d = page.getByRole('button', { name: 'Decline', exact: true }); if (await d.isVisible().catch(() => false)) await d.click();
  await page.setInputFiles('#file', 'test-photo.jpg');
  await page.locator('#dcSelf').waitFor({ state: 'visible', timeout: 30000 });
  await click('#dcSelf');
  await page.locator('.mbeg-skip').filter({ visible: true }).first().waitFor({ timeout: 10000 }).then(() => click('.mbeg-skip')).catch(() => {});
  await page.waitForTimeout(2000);
  await shot('editor'); await check('editor');
  await shot('editor-full', true);
  await click(dev === 'phone' ? '#mobFinish' : 'button:has-text("Finish Editing")');
  await page.locator('#cartDrawerCheckout').filter({ visible: true }).first().waitFor({ timeout: 30000 });
  await page.waitForTimeout(1000);
  await shot('cart-drawer'); await check('cart-drawer');
  await page.goto(u('/cart'), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  await shot('cart-mosaic'); await shot('cart-mosaic-full', true); await check('cart-mosaic');
} catch (e) { log.push({ error: e.message.split('\n')[0] }); await shot('error'); }
fs.writeFileSync(`${outdir}/${label}-${dev}-editor.json`, JSON.stringify(log, null, 1));
console.log(JSON.stringify(log, null, 1).slice(0, 6000));
await browser.close();
