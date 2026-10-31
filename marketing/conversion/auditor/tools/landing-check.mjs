// Opens landing pages at phone and desktop size, times load, lists visible buttons with their y position, notes price/trust text. Read-only: no cart, no checkout.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir, ...pairs] = process.argv; // name=url
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
const out = [];
for (const [dev, vp] of [['phone',{width:390,height:844}],['desktop',{width:1440,height:900}]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: dev==='phone', hasTouch: dev==='phone' });
  for (const pr of pairs) {
    const [k, u] = [pr.split('=')[0], pr.slice(pr.indexOf('=')+1)];
    const p = await ctx.newPage(); const t0 = Date.now();
    await p.goto(u, {waitUntil:'load', timeout:60000}).catch(e=>console.error(e.message));
    const ms = Date.now()-t0; await p.waitForTimeout(1500);
    await p.screenshot({path:`${outdir}/${dev}-${k}-first.jpg`, type:'jpeg', quality:55});
    await p.screenshot({path:`${outdir}/${dev}-${k}-full.jpg`, type:'jpeg', quality:45, fullPage:true});
    const info = await p.evaluate(()=>{ const vis=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(el).visibility!=='hidden'};
      const btns=[...document.querySelectorAll('a,button')].filter(vis).map(el=>(el.innerText||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40)+'@'+Math.round(el.getBoundingClientRect().top)).filter(x=>!/^@/.test(x));
      const t=document.body.innerText; return {title:document.title, sw:document.documentElement.scrollWidth, iw:innerWidth, btns:btns.slice(0,30), price:(t.match(/\$\d+(\.\d\d)?/g)||[]).slice(0,6), flags:{proof:/free (design )?proof/i.test(t), dec15:/December 15/i.test(t), reviews:/reviews|customers|4\.\d/i.test(t)}}});
    out.push({dev,k,ms,...info}); await p.close();
  }
}
console.log(JSON.stringify(out,null,1)); await b.close();
