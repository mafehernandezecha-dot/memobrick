// Test the calm phone home change against the live page.
// Usage: node calmtest.mjs <before|after> <outdir> [themeId]
//  after (no themeId): the live HTML of / is patched in the browser with the same edits as the Liquid diff
//  after with themeId: loads ?preview_theme_id=<id> unpatched (use once a theme copy exists)
// Adds two grey placeholder boxes where the Omnisend teaser (bottom-left) and Shopify Inbox chat (bottom-right)
// sit, because their scripts are blocked in this sandbox; they are labelled SIM in screenshots.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
const [,, mode, outdir, themeId] = process.argv;
const base = 'https://mymemobrick.com/' + (themeId ? `?preview_theme_id=${themeId}` : '');
const css = fs.readFileSync(new URL('./calm-home-test.css', import.meta.url), 'utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const results = {};
const go = async (page, u) => { for (let i = 0; i < 4; i++) { try { return await page.goto(u, { waitUntil: 'load', timeout: 90000 }); } catch (e) { console.error('goto retry', i, e.message.split('\n')[0]); await new Promise(r => setTimeout(r, 60000)); } } throw new Error('goto failed'); };
const devices = [
  ['phone', { width: 390, height: 844 }, true],
  ['phone360', { width: 360, height: 740 }, true],
  ['desktop', { width: 1440, height: 900 }, false],
];
for (const [name, vp, mobile] of devices) {
  const mkctx = () => browser.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2.5641 : 0.6944, isMobile: mobile, hasTouch: mobile,
    userAgent: mobile ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1'
      : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36' });
  let patched = null;
  const setup = async (page) => { if (mode === 'after' && !themeId) {
    await page.addInitScript((css) => {
      document.addEventListener('DOMContentLoaded', () => {
        const st = [...document.querySelectorAll('#view-home style')].find(x => x.textContent.includes('.hero-cta-top'));
        if (st) st.textContent = st.textContent.replace(/\n\s*$/, '\n') + css;
        let n = 0;
        document.querySelectorAll('#reviews .wrap > p, #how .wrap > p').forEach(p => { if (p.getAttribute('style') === 'text-align:center;margin-top:24px' && p.querySelector('a.btn-red[href="/pages/editor"]')) { p.classList.add('mb-mid-cta'); n++; } });
        window.__calmPatched = { style: !!st, midCtas: n };
      });
    }, css);
  } };
  let ctx = await mkctx(); let page = await ctx.newPage(); await setup(page);
  await go(page, base);
  await page.waitForTimeout(6000);
  // Simulated floating widgets at their configured spots (Omnisend teaser bottomLeft, 12px margin; Inbox chat bottom-right, lowest)
  if (mobile) await page.evaluate(() => {
    const mk = (css, t) => { const d = document.createElement('div'); d.className = 'sim-float'; d.textContent = t; d.style.cssText = 'position:fixed;z-index:2147483000;background:rgba(120,120,120,.55);color:#fff;font:600 13px system-ui;display:flex;align-items:center;justify-content:center;border-radius:30px;pointer-events:none;' + css; document.body.appendChild(d); };
    mk('left:12px;bottom:12px;width:150px;height:43px', 'SIM teaser');
    mk('right:16px;bottom:16px;width:132px;height:48px', 'SIM chat');
  });
  const r = await page.evaluate(() => {
    const vis = el => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && b.width > 0 && b.height > 0; };
    const box = el => { const b = el.getBoundingClientRect(); return [Math.round(b.left), Math.round(b.top + scrollY), Math.round(b.width), Math.round(b.height)]; };
    const home = document.querySelector('#view-home');
    const ctas = [...home.querySelectorAll('a.btn-red')].filter(vis).map(e => ({ t: e.textContent.trim(), r: box(e) }));
    const proof = [...home.querySelectorAll('[data-go="freeproof"]')].filter(vis).map(e => ({ t: e.textContent.trim(), r: box(e) }));
    const top = document.querySelector('.hero-cta-top a'), note = document.querySelector('.hero-cta-note'), link = document.querySelector('.hero-tertiary .linky2');
    const vid = document.querySelector('#heroVid');
    const sims = [...document.querySelectorAll('.sim-float')].map(e => e.getBoundingClientRect());
    const overlap = (el) => { if (!el || !vis(el)) return null; const b = el.getBoundingClientRect(); return sims.some(s => !(s.right <= b.left || s.left >= b.right || s.bottom <= b.top || s.top >= b.bottom)); };
    const hit = (el) => { if (!el || !vis(el)) return null; const b = el.getBoundingClientRect(); const x = b.left + b.width / 2, y = b.top + b.height / 2; if (y > innerHeight) return 'offscreen'; const h = document.elementFromPoint(x, y); return h === el || el.contains(h); };
    return {
      firstScreen: innerHeight,
      topCta: top && vis(top) ? box(top) : null, note: note && vis(note) ? note.textContent.trim() : null,
      proofLink: link && vis(link) ? box(link) : null, proofFullyOnFirstScreen: link ? link.getBoundingClientRect().bottom <= innerHeight : null,
      topCtaClickable: hit(top), proofClickable: hit(link), topCtaUnderFloat: overlap(top), proofUnderFloat: overlap(link),
      rail: [...document.querySelectorAll('.hero .rail')].some(vis), railBox: (e => e && vis(e) ? box(e) : null)(document.querySelector('.hero .rail')),
      videoDbg: vid ? { cs: (s => [s.display, s.visibility, s.opacity].join('/'))(getComputedStyle(vid)), rect: box(vid), fig: box(vid.parentElement), src: (vid.currentSrc || '').slice(0, 80) } : null,
      video: vid && vis(vid) ? { r: box(vid), pctOfScreen: Math.round(vid.getBoundingClientRect().height / innerHeight * 100), muted: vid.muted, autoplay: vid.autoplay, playsinline: vid.playsInline, loop: vid.loop } : 'not visible',
      mobCtaDisplay: getComputedStyle(document.querySelector('#mobCta')).display,
      ctas, proof, docH: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, iw: innerWidth,
    };
  });
  r.patched = await page.evaluate(() => window.__calmPatched || null);
  await page.screenshot({ path: `${outdir}/${mode}-${name}-screen1.jpg`, type: 'jpeg', quality: 72 });
  if (mobile) {
    for (const y of [800, 1700]) {
      await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(1200);
      r['mobCtaAt' + y] = await page.evaluate(() => getComputedStyle(document.querySelector('#mobCta')).display);
      if (name === 'phone') await page.screenshot({ path: `${outdir}/${mode}-${name}-y${y}.jpg`, type: 'jpeg', quality: 72 });
    }
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600);
    await page.evaluate(() => document.querySelectorAll('.sim-float').forEach(e => e.remove()));
  }
  if (name !== 'phone360') await page.screenshot({ path: `${outdir}/${mode}-${name}-full.jpg`, type: 'jpeg', quality: 50, fullPage: true });
  // Taps: free-proof link opens the free-proof view; main button opens the editor
  if (name !== 'desktop') {
    const link = page.locator('.hero-tertiary .linky2');
    if (await link.isVisible()) { await link.tap(); await page.waitForTimeout(1500);
      r.proofTap = await page.evaluate(() => ({ freeproofShown: !document.querySelector('#view-freeproof').hidden, hash: location.hash }));
      }
    await ctx.close(); await new Promise(r => setTimeout(r, 5000));
    ctx = await mkctx(); page = await ctx.newPage(); await setup(page); await go(page, base); await page.waitForTimeout(3000);
    const t0 = Date.now();
    await Promise.all([page.waitForURL(/\/pages\/editor/, { timeout: 30000 }).catch(e => null), page.locator('.hero-cta-top a').tap()]);
    await page.waitForTimeout(3000);
    r.ctaTap = { url: page.url().replace(/\?.*/, ''), ms: Date.now() - t0, views: await page.evaluate(() => [...document.querySelectorAll('section.view')].filter(v => !v.hidden).map(v => v.id)) };
  }
  results[name] = r;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 1));
