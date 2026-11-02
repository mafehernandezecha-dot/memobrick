// Usage: node measure.mjs <themeId|live> <outdir> <label>
// Measures fonts on home, a photo-kit product page and the cart at 390x844 and 1366x900.
// Adds one bag-of-bricks item to a throwaway cart (no checkout, no order).
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, theme, outdir, label] = process.argv;
fs.mkdirSync(outdir, { recursive: true });
const q = (theme === 'live' || theme === 'inject') ? '' : `preview_theme_id=${theme}`;
const u = (p) => `https://mymemobrick.com${p}${q ? (p.includes('?') ? '&' : '?') + q : ''}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const pages = [['home', '/'], ['product', '/products/2-2-boards'], ['cart', '/cart'], ['editor', '/pages/editor?size=20x20']];
const results = {};
for (const [dev, vp] of [['phone', { width: 390, height: 844 }], ['desktop', { width: 1366, height: 900 }]]) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: dev === 'phone', hasTouch: dev === 'phone', deviceScaleFactor: 1,
    userAgent: dev === 'phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
  await ctx.route(/^https:\/\/shop\.app\//, r => r.abort());
  if (theme === 'inject') {
    const cssText = fs.readFileSync(new URL('./after-files/assets/memobrick-type.css', import.meta.url), 'utf8');
    await ctx.route('https://local.test/memobrick-type.css', r => r.fulfill({ status: 200, contentType: 'text/css', body: cssText }));
    await ctx.route(/^https:\/\/mymemobrick\.com\/(\?.*)?(products\/[^.?]*|cart|pages\/[^.?]*)?(\?.*)?$/, async (route) => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const resp = await route.fetch(); let body = await resp.text();
      body = body.replace(/https:\/\/fonts\.googleapis\.com\/css2\?family=Fredoka[^"]*/, 'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Inter:wght@400;600;700&display=swap');
      body = body.replace(/(<link[^>]*memobrick\.css[^>]*>)/, '$1<link href="https://local.test/memobrick-type.css" rel="stylesheet" type="text/css" media="all">');
      await route.fulfill({ response: resp, body });
    });
  }
  const page = await ctx.newPage();
  const fontReqs = new Set();
  page.on('request', r => { const x = r.url(); if (/fonts\.(googleapis|gstatic)\.com/.test(x)) fontReqs.add(x.slice(0, 200)); });
  const nav = async (url) => { for (let i = 0; i < 4; i++) { try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); return; } catch (e) { if (i == 3) throw e; await page.waitForTimeout(4000); } } };
  for (const [name, path] of pages) {
    if (name === 'cart') {
      await page.evaluate(async () => {
        const c = await (await fetch('/cart.js')).json();
        if (c.item_count === 0) {
          const p = await (await fetch('/products/bag-of-bricks-black-01.js')).json();
          await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: p.variants[0].id, quantity: 1 }] }) });
        }
      }).catch(e => console.error('cart add failed', e.message));
    }
    await nav(u(path));
    await page.waitForTimeout(2500);
    // dismiss popups that cover content (Omnisend / vitals) by pressing Escape only
    await page.keyboard.press('Escape').catch(() => {});
    for (const t of ['Decline']) { const b = page.getByRole('button', { name: t, exact: true }); if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(500); } }
    // scroll through to trigger lazy content
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${outdir}/${label}-${dev}-${name}.jpg`, type: 'jpeg', quality: 60 });
    await page.screenshot({ path: `${outdir}/${label}-${dev}-${name}-full.jpg`, type: 'jpeg', quality: 50, fullPage: true }).catch(() => {});
    const info = await page.evaluate(() => {
      const out = [];
      const all = document.querySelectorAll('body *');
      for (const el of all) {
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'PATH', 'IFRAME', 'TEMPLATE'].includes(el.tagName.toUpperCase())) continue;
        let own = '';
        for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent;
        own = own.replace(/\s+/g, ' ').trim();
        const s = getComputedStyle(el);
        const pseudo = getComputedStyle(el, '::before').content;
        if (!own) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1 || s.visibility === 'hidden' || s.opacity === '0') continue;
        // hidden ancestors
        if (el.closest('[aria-hidden="true"]') && s.position === 'fixed') continue;
        if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
        const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
        out.push({ fam, size: parseFloat(s.fontSize), weight: s.fontWeight, tt: s.textTransform, ls: s.letterSpacing,
          sel: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''),
          parent: el.parentElement ? (el.parentElement.tagName.toLowerCase() + (typeof el.parentElement.className === 'string' && el.parentElement.className ? '.' + el.parentElement.className.trim().split(/\s+/)[0] : '')) : '',
          inlineSize: !!(el.style && el.style.fontSize), text: own.slice(0, 50), top: Math.round(r.top + scrollY), fixed: s.position });
      }
      const fonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`);
      const links = [...document.querySelectorAll('link[href*="fonts.g"]')].map(l => l.rel + ' ' + l.href);
      return { els: out, fonts: [...new Set(fonts)], links, sw: document.documentElement.scrollWidth, iw: innerWidth, title: document.title, url: location.href };
    });
    info.fontReqs = [...fontReqs];
    results[`${dev}-${name}`] = info;
    console.error(dev, name, info.els.length, info.url, 'sw', info.sw, 'iw', info.iw);
  }
  await ctx.close();
}
fs.writeFileSync(`${outdir}/${label}-measure.json`, JSON.stringify(results, null, 1));
await browser.close();
