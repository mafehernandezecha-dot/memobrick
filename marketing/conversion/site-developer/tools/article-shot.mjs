// Usage: node article-shot.mjs <outdir> <label> <theme_id|live> <handle...>
// Screenshots blog articles on phone and desktop and records layout facts. Read-only.
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, outdir, label, theme, ...handles] = process.argv;
fs.mkdirSync(outdir, { recursive: true });
const q = theme === 'live' ? '' : `?preview_theme_id=${theme}`;
const exe = fs.readdirSync('/opt/pw-browsers').filter(d=>d.startsWith('chromium-')).map(d=>`/opt/pw-browsers/${d}/chrome-linux/chrome`).find(p=>fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const out = [];
for (const device of ['phone','desktop']) {
  const vp = device==='phone' ? {width:390,height:844} : {width:1440,height:900};
  const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone', deviceScaleFactor: 1,
    userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36' : undefined });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message.slice(0,150)));
  for (const h of handles) {
    const url = `https://mymemobrick.com/blogs/news/${h}${q}`;
    let status = null;
    try { const r = await page.goto(url, { waitUntil: 'load', timeout: 60000 }); status = r && r.status(); } catch (e) { out.push({device,h,error:e.message.slice(0,120)}); continue; }
    await page.waitForTimeout(2500);
    // hide the preview-mode cookie banner so it does not cover the screenshot (no click, no consent change)
    await page.addStyleTag({ content: '#shopify-pc__banner{display:none !important}' }).catch(()=>{});
    // close pop-ups that may cover the page (email gate etc.) for the screenshot only
    const info = await page.evaluate(() => {
      const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none'; };
      const fixed = [...document.querySelectorAll('body *')].filter(el => { const s = getComputedStyle(el); return (s.position==='fixed'||s.position==='sticky') && vis(el); })
        .map(el => { const r = el.getBoundingClientRect(); return { tag: el.tagName, id: el.id, cls: (el.className||'').toString().slice(0,40), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; }).slice(0,15);
      const h1s = [...document.querySelectorAll('h1')].map(e=>e.innerText.slice(0,80));
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{ try { const j = JSON.parse(s.textContent); return j['@type']; } catch(e) { return 'INVALID'; } });
      const hero = document.querySelector('.mba-hero img'); 
      return { title: document.title.slice(0,80), h1s, ld, fixed, sw: document.documentElement.scrollWidth, iw: innerWidth,
        cards: [...document.querySelectorAll('.mba-card')].map(c=>c.innerText.replace(/\s+/g,' ').slice(0,160)),
        cardLinks: [...document.querySelectorAll('.mba-card a')].map(a=>a.getAttribute('href')),
        reviews: document.querySelectorAll('.mba-rev').length, stars: document.querySelector('.mba-reviews-head')?.innerText.replace(/\s+/g,' ').slice(0,120),
        trust: document.querySelector('.mba-trust')?.innerText.replace(/\s+/g,' ').slice(0,300),
        related: [...document.querySelectorAll('.mba-related a.mba-rel')].map(a=>a.getAttribute('href')),
        heroSrc: hero ? hero.currentSrc.slice(0,120) : null, heroH: hero ? Math.round(hero.getBoundingClientRect().height) : null,
        looxWidgets: document.querySelectorAll('.loox-rating, #looxReviews').length,
        brokenImgs: [...document.images].filter(i=>i.complete && i.naturalWidth===0 && vis(i)).map(i=>i.src.slice(0,100)) };
    });
    out.push({ device, h, status, ...info });
    await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-top.jpg`, type: 'jpeg', quality: 62 });
    // scroll through once so lazy images load, then back to top for the full-page shot
    for (let y = 0; y < await page.evaluate(()=>document.body.scrollHeight); y += 700) { await page.evaluate(v=>window.scrollTo(0,v), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(2500); await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(800);
    await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-full.jpg`, type: 'jpeg', quality: 50, fullPage: true });
    if (device==='phone') {
      await page.evaluate(()=>window.scrollTo(0, document.body.scrollHeight*0.45)); await page.waitForTimeout(1200);
      const sticky = await page.evaluate(()=>{ const b=document.querySelector('.mba-sticky'); if(!b) return null; const r=b.getBoundingClientRect(); return {hidden:b.hidden, x:Math.round(r.left), y:Math.round(r.top), w:Math.round(r.width), h:Math.round(r.height), text:b.innerText.replace(/\s+/g,' ')}; });
      const chat = await page.evaluate(()=>{ const c=[...document.querySelectorAll('iframe, #shopify-chat, [id*="chat" i], inbox-online-store-chat')].filter(e=>{const r=e.getBoundingClientRect(); return r.width>0 && r.top>500;}).map(e=>{const r=e.getBoundingClientRect(); return {tag:e.tagName,id:e.id,x:Math.round(r.left),y:Math.round(r.top),w:Math.round(r.width),h:Math.round(r.height)};}); return c; });
      out.push({ device, h, sticky, chat });
      await page.screenshot({ path: `${outdir}/${label}-${device}-${h}-mid.jpg`, type: 'jpeg', quality: 62 });
    }
  }
  out.push({ device, jsErrors: [...new Set(errs.map(e=>e.slice(0,100)))] });
  await ctx.close();
}
await browser.close();
fs.writeFileSync(`${outdir}/${label}-results.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
