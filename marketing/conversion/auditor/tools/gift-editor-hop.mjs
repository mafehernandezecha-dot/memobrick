// Read-only: from a gift-collection tile to the editor on phone. Usage: node gift-editor-hop.mjs <outdir> <productPath> <tag>
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir, prod, tag] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
const ctx = await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
const p = await ctx.newPage(); const nav=[]; p.on('framenavigated',f=>{if(f===p.mainFrame())nav.push(f.url())});
p.on('requestfailed',r=>{if(r.isNavigationRequest())nav.push('FAILED '+r.url()+' '+r.failure()?.errorText)});
await p.goto('https://mymemobrick.com'+prod,{waitUntil:'load'}); await p.waitForTimeout(2000);
const sticky = await p.evaluate(()=>[...document.querySelectorAll('a,button')].filter(e=>/creator|Design your own|Design this/i.test(e.innerText||'')).map(e=>({t:(e.innerText||'').trim().slice(0,40),href:e.getAttribute('href'),top:Math.round(e.getBoundingClientRect().top),vis:e.getBoundingClientRect().width>0})));
const dec = await p.evaluate(()=>{const t=document.body.innerText;const i=t.search(/December 15/);return i<0?null:Math.round([...document.querySelectorAll('*')].find(e=>e.children.length===0&&/December 15/.test(e.textContent))?.getBoundingClientRect().top+scrollY)});
const t=Date.now();
await p.locator('a,button').filter({hasText:/Design this in the creator/i}).filter({visible:true}).first().click();
await p.waitForTimeout(6000); const ms=Date.now()-t;
await p.screenshot({path:`${outdir}/phone-gift-${tag}-editor.jpg`,type:'jpeg',quality:60});
const ed = await p.evaluate(()=>({url:location.href, txt:document.body.innerText.slice(0,500).replace(/\n+/g,' | ')})).catch(e=>({err:String(e)}));
console.log(JSON.stringify({prod,sticky,decTop:dec,ms,nav,ed},null,1)); await b.close();
