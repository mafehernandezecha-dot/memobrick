// Renders the dog landing page body inside the live default page template by loading /pages/about-us
// (same template the unpublished page uses) and swapping in title and body. Then follows links and
// opens each editor button, uploads a generated test image (no person, no real dog) and reads the size/price.
// Usage: node test-page.mjs <body.html> <outdir> <test-image>
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, bodyFile, outdir, testImg] = process.argv;
const body = fs.readFileSync(bodyFile, 'utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const results = [];
const hidePopups = () => document.querySelectorAll('[id*=popup i],[class*=popup i],[class*=klaviyo i],[class*=omnisend i]').forEach(e => { if (getComputedStyle(e).position==='fixed') e.style.display='none'; });
for (const device of ['phone', 'desktop']) {
  const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone', deviceScaleFactor: 1,
    userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message.slice(0,150)));
  await page.goto('https://mymemobrick.com/pages/about-us', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.evaluate((body) => {
    const prose = document.querySelector('.page-prose'); prose.innerHTML = body;
    for (const s of prose.querySelectorAll('script')) { const n = document.createElement('script'); n.textContent = s.textContent; s.replaceWith(n); }
    const wrap = prose.closest('.wrap'); const h1 = wrap.querySelector('h1'); h1.textContent = 'Your Dog in Bricks';
    const crumb = wrap.querySelector('p'); if (crumb && crumb.lastChild) crumb.lastChild.textContent = ' Your Dog in Bricks';
    document.title = 'Your Dog in Bricks';
  }, body);
  await page.evaluate(hidePopups);
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelectorAll('.dlp img').forEach(i => i.loading='eager'));
  await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=600) { scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } scrollTo(0,0); });
  await page.waitForTimeout(1500);
  await page.evaluate(hidePopups);
  await page.screenshot({ path: `${outdir}/${device}-first-screen.jpg`, type: 'jpeg', quality: 62 });
  await page.screenshot({ path: `${outdir}/${device}-full.jpg`, type: 'jpeg', quality: 55, fullPage: true });
  const info = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('.dlp img')].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 }));
    const links = [...document.querySelectorAll('.dlp a')].map(a => ({ text: a.innerText.trim(), href: a.href, top: Math.round(a.getBoundingClientRect().top + scrollY), bottom: Math.round(a.getBoundingClientRect().bottom + scrollY), w: Math.round(a.getBoundingClientRect().width) }));
    const hidden = [...document.querySelectorAll('.dlp [data-dlp-until]')].map(e => ({ until: e.dataset.dlpUntil, shown: getComputedStyle(e).display !== 'none' }));
    return { scrollW: document.documentElement.scrollWidth, innerW: innerWidth, innerH: innerHeight, imgs, links, hidden };
  });
  results.push({ device, errs, ...info });
  await page.locator('.dlp details summary').first().click();
  await page.locator('.dlp details').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outdir}/${device}-faq-open.jpg`, type: 'jpeg', quality: 62 });
  await page.locator('.dlp-sizes').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outdir}/${device}-sizes.jpg`, type: 'jpeg', quality: 62 });
  await page.locator('.dlp-revs').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outdir}/${device}-reviews.jpg`, type: 'jpeg', quality: 62 });
  if (device === 'phone') {
    for (const l of info.links) {
      const r = await ctx.request.get(l.href, { maxRedirects: 5 }).catch(e => ({ status: () => 'ERR '+e.message.slice(0,80) }));
      l.status = r.status();
    }
  }
  // click the hero button for real, then upload a generated test image in the editor
  const sizes = device === 'phone' ? ['hero', 'size-16', 'size-30'] : ['hero'];
  for (const cta of sizes) {
    const p2 = await ctx.newPage();
    await p2.goto('https://mymemobrick.com/pages/about-us', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p2.evaluate((body) => { document.querySelector('.page-prose').innerHTML = body; }, body);
    await Promise.all([p2.waitForURL(/\/pages\/editor/, { timeout: 60000 }), p2.locator(`[data-dlp-cta="${cta}"]`).click()]);
    await p2.waitForLoadState('load').catch(()=>{});
    await p2.waitForTimeout(5000);
    await p2.evaluate(hidePopups);
    await p2.screenshot({ path: `${outdir}/${device}-editor-${cta}.jpg`, type: 'jpeg', quality: 60 });
    const before = await p2.evaluate(() => document.body.innerText.replace(/\s+/g,' ').match(/\d\d\s*[×x]\s*\d\d\s*["”]?\s*\$\d+[.,]\d\d/g)?.slice(0,3));
    let after = null;
    try {
      await p2.setInputFiles('#file', testImg);
      await p2.waitForTimeout(8000);
      await p2.keyboard.press('Escape');
      const b = p2.getByRole('button', { name: 'Design it myself' }).first(); if (await b.isVisible().catch(()=>false)) { await b.click(); await p2.waitForTimeout(1500); }
      await p2.keyboard.press('Escape');
      await p2.evaluate(hidePopups);
      await p2.waitForTimeout(1000);
      await p2.screenshot({ path: `${outdir}/${device}-editor-${cta}-after-upload.jpg`, type: 'jpeg', quality: 60 });
      after = await p2.evaluate(() => document.body.innerText.replace(/\s+/g,' ').match(/.{0,30}\d\d\s*[×x]\s*\d\d\s*["”]?.{0,40}/g)?.slice(0,4));
    } catch (e) { after = 'upload failed: ' + e.message.slice(0,100); }
    results.push({ device, cta, editorUrl: p2.url(), before, after });
    await p2.close();
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/results.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
