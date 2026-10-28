// Opens ready-made design pages (zero add-to-cart landing pages) on phone and desktop and lists the buy controls. Read-only; no cart, no checkout.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir] = process.argv;
const urls = {yinyan:'/products/bricked-mosaic-portrait-10x10-yin-yan', caterpillar:'/products/cute-caterpillar-home-decoration-bricked-mosaic-portrait-16x16', silvestre:'/products/bricked-mosaic-20x30-silvestre'};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
for (const [dev, vp] of [['phone',{width:390,height:844}],['desktop',{width:1440,height:900}]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: dev==='phone', hasTouch: dev==='phone' });
  for (const [k,u] of Object.entries(urls)) {
    const p = await ctx.newPage(); const t0=Date.now();
    await p.goto('https://mymemobrick.com'+u, {waitUntil:'load', timeout:45000}).catch(()=>{});
    await p.waitForTimeout(1500); const ms=Date.now()-t0;
    await p.screenshot({path:`${outdir}/${dev}-ready-${k}.jpg`, type:'jpeg', quality:55});
    const info = await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
      return {title:document.title, price:(document.body.innerText.match(/\$[\d.,]+/g)||[]).slice(0,4), btns:[...document.querySelectorAll('button,a.button,input[type=submit],a')].filter(vis).map(e=>(e.innerText||e.value||'').trim().replace(/\s+/g,' ').slice(0,35)).filter(t=>/cart|buy|design|create|edit|order|photo|sold/i.test(t)).slice(0,10), form: !!document.querySelector('form[action*="/cart/add"]')}});
    console.log(dev,k,ms,JSON.stringify(info)); await p.close();
  }
}
await b.close();
