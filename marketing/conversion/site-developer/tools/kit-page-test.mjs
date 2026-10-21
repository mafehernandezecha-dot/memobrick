// Kit page creator-check test. Usage: node kit-page-test.mjs <outdir> <theme_id|live>
// Loads product pages on phone and desktop, records buttons, sticky bar, and follows the main editor button. Never adds to cart, never checks out.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir, theme] = process.argv;
const q = theme === 'live' ? '' : `?preview_theme_id=${theme}`;
const handles = ['2-2-boards','1-big-board','2-3-boards','3-3-boards','custom-bricked-mosaic-10x10','60x60-fits-1-9-individuals','5-5-board','frame-2-2','donuts-20x20','bag-of-bricks-black-01'];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const out = [];
for (const device of ['phone','desktop']) {
  const vp = device==='phone' ? {width:390,height:844} : {width:1440,height:900};
  const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message.slice(0,150)));
  for (const h of handles) {
    await page.goto(`https://mymemobrick.com/products/${h}${q}`, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(800);
    const info = await page.evaluate(() => {
      const vis = el => { const r = el.getBoundingClientRect(); return r.width>0 && r.height>0; };
      const ctas = [...document.querySelectorAll('.pdp-buy .pdp-cta')].filter(vis).map(e => ({ text: e.innerText.trim().slice(0,40), href: e.getAttribute('href') }));
      return { title: document.querySelector('h1')?.innerText.slice(0,70), ctas, buyNowForm: !!document.querySelector('.pdp-buy form[action="/cart/add"]'), sticky: document.querySelector('#pdpSticky')?.innerText.replace(/\s+/g,' ').trim(), specs: !!document.querySelector('.pdp-specs'), sw: document.documentElement.scrollWidth, iw: innerWidth };
    });
    out.push({ device, handle: h, ...info });
    if (h === '2-2-boards' || h === 'frame-2-2') await page.screenshot({ path: `${outdir}/${theme==='live'?'before':'after'}-${device}-${h}.jpg`, type: 'jpeg', quality: 60 });
  }
  // follow the main button on 20x20
  await page.goto(`https://mymemobrick.com/products/2-2-boards${q}`, { waitUntil: 'load', timeout: 60000 });
  const cta = page.locator('.pdp-buy a.pdp-cta').first();
  if (await cta.count()) { await cta.click({ force: true }); await page.waitForLoadState('load'); await page.waitForTimeout(1500); out.push({ device, follow: page.url(), editorFileInput: await page.locator('#file').count() }); }
  // sticky bar after scrolling (phone)
  if (device==='phone') { await page.goto(`https://mymemobrick.com/products/2-2-boards${q}`, { waitUntil: 'load' }); await page.evaluate(()=>window.scrollTo(0, 1800)); await page.waitForTimeout(800); out.push({ device, stickyHidden: await page.evaluate(()=>document.querySelector('#pdpSticky').hidden), stickyText: await page.evaluate(()=>document.querySelector('#pdpSticky').innerText.replace(/\s+/g,' ')) }); await page.screenshot({ path: `${outdir}/${theme==='live'?'before':'after'}-phone-sticky.jpg`, type:'jpeg', quality:60 }); }
  out.push({ device, jsErrors: [...new Set(errs.map(e=>e.slice(0,90)))] });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
