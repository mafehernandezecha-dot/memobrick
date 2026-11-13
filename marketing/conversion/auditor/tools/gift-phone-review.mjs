// Read-only phone review of the gift collection (no cart, no checkout). Usage: node gift-phone-review.mjs <outdir>
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, outdir] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
const ctx = await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2,
  userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
const t0=Date.now();
await p.goto('https://mymemobrick.com/collections/the-gift-for-everyone?utm_source=facebook&utm_medium=paid',{waitUntil:'domcontentloaded'});
const dcl=Date.now()-t0; await p.waitForLoadState('load'); const load=Date.now()-t0; await p.waitForTimeout(2500);
await p.screenshot({path:`${outdir}/phone-gift-01-first-screen.jpg`,type:'jpeg',quality:60});
const info = await p.evaluate(()=>{
  const vis=el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'};
  const txt=document.body.innerText;
  const priceEls=[...document.querySelectorAll('*')].filter(e=>e.children.length===0&&/\$\s?\d/.test(e.textContent||'')&&vis(e));
  const firstPrice=priceEls.map(e=>({t:e.textContent.trim().slice(0,40),top:Math.round(e.getBoundingClientRect().top+scrollY)})).sort((a,b)=>a.top-b.top).slice(0,8);
  const tiles=[...document.querySelectorAll('a[href*="/products/"]')].filter(vis);
  const uniq=[...new Set(tiles.map(a=>a.getAttribute('href').split('?')[0]))];
  const tileTitles=[...new Set(tiles.map(a=>(a.innerText||'').trim().replace(/\s+/g,' ')).filter(Boolean))].slice(0,40);
  const firstTile=tiles[0]?Math.round(tiles[0].getBoundingClientRect().top+scrollY):null;
  const ctas=[...document.querySelectorAll('a,button')].filter(vis).filter(e=>e.getBoundingClientRect().top<844).map(e=>(e.innerText||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40)+' @'+Math.round(e.getBoundingClientRect().top));
  const m=(re)=>{const i=txt.search(re);return i<0?null:txt.slice(Math.max(0,i-60),i+120).replace(/\n+/g,' | ')};
  return {title:document.title, h:document.documentElement.scrollHeight, sw:document.documentElement.scrollWidth,
    firstPrice, nProducts:uniq.length, products:uniq, tileTitles, firstTile, ctasFirstScreen:ctas,
    dec15:m(/December 15|Dec\.? 15/i), christmas:m(/Christmas/i), freeShip:m(/free shipping|ships free/i), s125:m(/\$125/),
    editor:[...document.querySelectorAll('a[href*="editor"]')].map(a=>a.getAttribute('href')+' vis:'+vis(a)).slice(0,10),
    sizeFilter:[...document.querySelectorAll('select,input[type=checkbox],details,[class*=filter]')].filter(vis).map(e=>e.tagName+':'+(e.innerText||e.name||'').trim().slice(0,40)).slice(0,15),
    stars:m(/review/i), firstScreenText:txt.slice(0,700).replace(/\n+/g,' | ')};
});
// scroll screenshots
for (let i=1;i<=4;i++){ await p.evaluate(y=>scrollTo(0,y),844*i); await p.waitForTimeout(700); await p.screenshot({path:`${outdir}/phone-gift-0${i+1}-scroll-${i}.jpg`,type:'jpeg',quality:55}); }
await p.screenshot({path:`${outdir}/phone-gift-full.jpg`,type:'jpeg',quality:40,fullPage:true});
// tap first product tile
await p.evaluate(()=>scrollTo(0,0));
const t1=Date.now();
await p.locator('a[href*="/products/"]').filter({visible:true}).first().click();
await p.waitForLoadState('load'); const prodMs=Date.now()-t1; await p.waitForTimeout(2500);
await p.screenshot({path:`${outdir}/phone-gift-06-product-first.jpg`,type:'jpeg',quality:60});
const prod = await p.evaluate(()=>{const vis=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0};const txt=document.body.innerText;
  const m=(re)=>{const i=txt.search(re);return i<0?null:txt.slice(Math.max(0,i-60),i+120).replace(/\n+/g,' | ')};
  return {url:location.pathname+location.search, firstScreen:[...document.querySelectorAll('a,button')].filter(vis).filter(e=>e.getBoundingClientRect().top<844).map(e=>(e.innerText||'').trim().replace(/\s+/g,' ').slice(0,40)+' @'+Math.round(e.getBoundingClientRect().top)).filter(x=>!/^ @/.test(x)),
  dec15:m(/December 15/i), freeShip:m(/free shipping|ships free/i), sizes:[...document.querySelectorAll('select option, input[type=radio]')].map(o=>(o.value||o.textContent).trim()).slice(0,20), text:txt.slice(0,600).replace(/\n+/g,' | ')}});
// find editor CTA
let editor=null;
const cta=p.locator('a,button').filter({hasText:/Create|Upload|Start|Design|Personali[sz]e/i}).filter({visible:true}).first();
if (await cta.count()){ const label=(await cta.innerText()).trim(); const top=await cta.evaluate(e=>Math.round(e.getBoundingClientRect().top+scrollY)); const t2=Date.now(); await cta.click(); await p.waitForLoadState('load').catch(()=>{}); await p.waitForTimeout(3000);
  editor={label,top,ms:Date.now()-t2,url:p.url().replace('https://mymemobrick.com','')}; await p.screenshot({path:`${outdir}/phone-gift-07-editor-first.jpg`,type:'jpeg',quality:60}); }
console.log(JSON.stringify({dcl,load,info,prodMs,prod,editor,errs},null,1)); await b.close();
