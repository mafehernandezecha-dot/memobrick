// Collection page to product page walk (read-only: no cart, no checkout). Usage: node collection-walk.mjs <outdir>
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
const out=[];
for (const [dev, vp] of [['phone',{width:390,height:844}],['desktop',{width:1440,height:900}]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: dev==='phone', hasTouch: dev==='phone' });
  const p = await ctx.newPage();
  await p.goto('https://mymemobrick.com/collections/the-gift-for-everyone',{waitUntil:'load'}); await p.waitForTimeout(1000);
  const links = await p.evaluate(()=>[...document.querySelectorAll('a[href*="/products/"]')].map(a=>a.getAttribute('href')).filter((v,i,a)=>a.indexOf(v)===i).slice(0,6));
  const hdr = await p.evaluate(()=>({cta:!![...document.querySelectorAll('a')].find(a=>/Create My MemoBrick/i.test(a.innerText)&&a.getBoundingClientRect().width>0), text:document.body.innerText.slice(0,500).replace(/\n+/g,' | ')}));
  const tail = await p.evaluate(()=>document.body.innerText.slice(-900).replace(/\n+/g,' | '));
  const t0=Date.now();
  await p.locator('a[href*="/products/"]').filter({visible:true}).nth(2).click();
  await p.waitForLoadState('load'); const ms=Date.now()-t0; await p.waitForTimeout(1500);
  await p.screenshot({path:`${outdir}/${dev}-gift-product-first.jpg`,type:'jpeg',quality:55});
  await p.screenshot({path:`${outdir}/${dev}-gift-product-full.jpg`,type:'jpeg',quality:45,fullPage:true});
  const info = await p.evaluate(()=>{const vis=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0};return {url:location.pathname,btns:[...document.querySelectorAll('a,button')].filter(vis).map(e=>(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,40)+'@'+Math.round(e.getBoundingClientRect().top)).filter(x=>!/^@/.test(x)).slice(0,25), dec15:/December 15/i.test(document.body.innerText), sw:document.documentElement.scrollWidth}});
  out.push({dev,links,hdr,tail,ms,...info}); await ctx.close();
}
console.log(JSON.stringify(out,null,1)); await b.close();
