// Usage: node article-photo-shot.mjs <outdir> <label> <theme_id|live> <devices: phone,desktop> <full:0|1> <overrides.json|-> <handle...>
// Read-only. Screenshots article tops (and optionally full pages). overrides.json maps handle -> local image path:
// the hero <img> is swapped for that local file in the browser only (stand-in for a proposed featured image), and if
// the stand-in is the couple photo the "Make yours" card picture is swapped to the woman photo, as the template does.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs'; import path from 'path';
const [,, outdir, label, theme, devs, full, ovr, ...handles] = process.argv;
fs.mkdirSync(outdir, { recursive: true });
const overrides = ovr && ovr !== '-' ? JSON.parse(fs.readFileSync(ovr, 'utf8')) : {};
const q = theme === 'live' ? '' : `?preview_theme_id=${theme}`;
const exe = fs.readdirSync('/opt/pw-browsers').filter(d=>d.startsWith('chromium-')).map(d=>`/opt/pw-browsers/${d}/chrome-linux/chrome`).find(p=>fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const out = [];
for (const device of devs.split(',')) {
  const vp = device==='phone' ? {width:390,height:844} : {width:1440,height:900};
  const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone', deviceScaleFactor: device==='phone' ? 2 : 1,
    userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36' : undefined });
  await ctx.route('https://mymemobrick.com/__standin/**', r => { const f = decodeURIComponent(r.request().url().split('/__standin/')[1]); r.fulfill({ status: 200, contentType: 'image/jpeg', body: fs.readFileSync(f) }); });
  const page = await ctx.newPage();
  for (const h of handles) {
    const url = `https://mymemobrick.com/blogs/news/${h}${q}`;
    let status = null;
    try { const r = await page.goto(url, { waitUntil: 'load', timeout: 60000 }); status = r && r.status(); } catch (e) { out.push({device,h,error:e.message.slice(0,120)}); continue; }
    await page.waitForTimeout(2000);
    await page.addStyleTag({ content: '#shopify-pc__banner{display:none !important}' }).catch(()=>{});
    if (overrides[h]) {
      const src = '/__standin/' + encodeURIComponent(overrides[h]);
      const woman = await page.evaluate(()=>{ const i=[...document.images].find(i=>i.src.includes('mb-real-woman-portrait')); return null; });
      await page.evaluate(([src, isCouple]) => {
        const img = document.querySelector('.mba-hero img') || document.querySelector('article img');
        if (img) { img.removeAttribute('srcset'); img.src = src; img.style.objectPosition = '50% 40%'; }
        if (isCouple) document.querySelectorAll('.mba-card-img img').forEach(c => { c.src = c.src.replace('mb-real-couple-wall', 'mb-real-woman-portrait'); });
      }, [src, /framed-couple-wall/.test(overrides[h])]);
      await page.waitForTimeout(1200);
    }
    const info = await page.evaluate(() => {
      const hero = document.querySelector('.mba-hero img') || document.querySelector('.wrap img');
      const r = hero ? hero.getBoundingClientRect() : null;
      return { heroSrc: hero ? hero.currentSrc.slice(0,140) : null, heroBox: r ? [Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)] : null,
        heroNatural: hero ? [hero.naturalWidth, hero.naturalHeight] : null, heroFit: hero ? getComputedStyle(hero).objectFit : null,
        sw: document.documentElement.scrollWidth, iw: innerWidth, h1: document.querySelectorAll('h1').length,
        cardImgs: [...document.querySelectorAll('.mba-card-img img')].map(i=>i.currentSrc.split('/').pop().split('?')[0]),
        broken: [...document.images].filter(i=>i.complete && i.naturalWidth===0 && i.getBoundingClientRect().width>0).map(i=>i.src.slice(0,90)) };
    });
    out.push({ device, h, status, ...info });
    await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-top.jpg`, type: 'jpeg', quality: 70 });
    if (full === '1') {
      for (let y = 0; y < await page.evaluate(()=>document.body.scrollHeight); y += 700) { await page.evaluate(v=>window.scrollTo(0,v), y); await page.waitForTimeout(100); }
      await page.waitForTimeout(1500); await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(600);
      const card = await page.$('.mba-card');
      if (card) { await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-card.jpg`, type: 'jpeg', quality: 70 }); }
      await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(400);
      await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-full.jpg`, type: 'jpeg', quality: 50, fullPage: true });
    }
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/${label}-results.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.map(o=>({d:o.device,h:o.h,s:o.status,hero:o.heroBox,nat:o.heroNatural,fit:o.heroFit,cards:o.cardImgs,sw:o.sw,broken:o.broken}))));
