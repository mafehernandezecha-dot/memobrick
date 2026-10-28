// Renders the Calm Build Gift page body inside the live default page template (page.liquid, same as the
// unpublished page will use) by loading a published page on that template (/pages/about-us) and swapping in
// the title and body. Then checks the links. Usage: node test-page.mjs <body.html> <outdir> <label>
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, bodyFile, outdir, label] = process.argv;
const body = fs.readFileSync(bodyFile, 'utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const results = [];
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
    const h1 = prose.closest('.wrap').querySelector('h1'); h1.textContent = 'Calm Build Gift';
    const crumb = prose.closest('.wrap').querySelector('p'); crumb.lastChild.textContent = ' Calm Build Gift';
    document.title = 'Calm Build Gift';
  }, body);
  // close any pop-up overlay so the page itself is visible
  await page.evaluate(() => document.querySelectorAll('[id*=popup i],[class*=popup i],[class*=klaviyo i],[class*=omnisend i]').forEach(e => { if (getComputedStyle(e).position==='fixed') e.style.display='none'; }));
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelectorAll('.cbg img').forEach(i => i.loading='eager'));
  await page.evaluate(async () => { for (let y=0; y<document.body.scrollHeight; y+=600) { scrollTo(0,y); await new Promise(r=>setTimeout(r,120)); } scrollTo(0,0); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${outdir}/${label}-${device}-first-screen.jpg`, type: 'jpeg', quality: 60 });
  await page.screenshot({ path: `${outdir}/${label}-${device}-full.jpg`, type: 'jpeg', quality: 55, fullPage: true });
  const info = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('.cbg img')].map(i => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 }));
    const links = [...document.querySelectorAll('.cbg a')].map(a => ({ text: a.innerText.trim(), href: a.href, top: Math.round(a.getBoundingClientRect().top + scrollY), w: Math.round(a.getBoundingClientRect().width) }));
    return { scrollW: document.documentElement.scrollWidth, innerW: innerWidth, imgs, links };
  });
  results.push({ device, errs, ...info });
  // open the FAQ first item and screenshot it
  await page.locator('.cbg details summary').first().click();
  await page.locator('.cbg details').first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${outdir}/${label}-${device}-faq-open.jpg`, type: 'jpeg', quality: 60 });
  // follow the links
  if (device === 'phone') {
    for (const l of info.links) {
      const r = await ctx.request.get(l.href, { maxRedirects: 5 }).catch(e => ({ status: () => 'ERR '+e.message.slice(0,80), headers: () => ({}) }));
      l.status = r.status(); l.type = (r.headers()['content-type']||'').split(';')[0];
    }
  }
  if (device === 'phone' || device === 'desktop') {
    const ed = await ctx.newPage();
    await ed.goto('https://mymemobrick.com/pages/editor?size=16x16#editor', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await ed.waitForTimeout(5000);
    await ed.evaluate(() => document.querySelectorAll('[id*=popup i],[class*=popup i]').forEach(e => { if (getComputedStyle(e).position==='fixed') e.style.display='none'; }));
    await ed.screenshot({ path: `${outdir}/${label}-${device}-cta-editor.jpg`, type: 'jpeg', quality: 60 });
    const t = await ed.evaluate(() => document.body.innerText.replace(/\s+/g,' ').match(/.{0,60}16\s*[×x]\s*16.{0,80}/g)?.slice(0,4));
    results.push({ device, editorUrl: ed.url(), editor16: t });
    await ed.close();
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/${label}-results.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
