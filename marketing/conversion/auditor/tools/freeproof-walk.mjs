// Walks the free-proof path (home hero link and /pages/free-preview) and records whether the Hulk form renders.
// Never fills or submits the form. Usage: node freeproof-walk.mjs <phone|desktop> <outdir>
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, device, outdir] = process.argv;
const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone',
  userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
const page = await ctx.newPage();
const hulk = [];
page.on('requestfailed', r => { if (/hulk|formsubmit/i.test(r.url())) hulk.push('FAILED '+r.url().slice(0,140)+' '+(r.failure()?.errorText||'')); });
page.on('response', r => { if (/hulk|formsubmit/i.test(r.url())) hulk.push(r.status()+' '+r.url().slice(0,140)); });
const out = { device, steps: [] };
const card = async () => page.evaluate(() => { const c = [...document.querySelectorAll('.pxFormGenerator')].find(e => e.getBoundingClientRect().height>0) || document.querySelector('.pxFormGenerator');
  if (!c) return { found:false }; const r=c.getBoundingClientRect(); return { found:true, id:c.id, h:Math.round(r.height), top:Math.round(r.top+scrollY), inputs:c.querySelectorAll('input,textarea,select').length, file:c.querySelectorAll('input[type=file]').length, text:c.innerText.trim().slice(0,200) }; });
let t=Date.now(); await page.goto('https://mymemobrick.com/', { waitUntil:'load', timeout:60000 }); out.steps.push({ step:'home', ms:Date.now()-t });
await page.screenshot({ path:`${outdir}/${device}-proof-01-home.jpg`, type:'jpeg', quality:55 });
const link = page.locator('button.linky2[data-go="freeproof"]').filter({visible:true}).first();
const linkTop = await link.evaluate(e=>Math.round(e.getBoundingClientRect().top)).catch(()=>null);
t=Date.now(); await link.click({ timeout:15000 }); await page.waitForTimeout(6000); out.steps.push({ step:'hero-link-to-proof-view', ms:Date.now()-t, linkTop, url:page.url(), card: await card() });
await page.screenshot({ path:`${outdir}/${device}-proof-02-home-proof-view.jpg`, type:'jpeg', quality:55, fullPage:true });
t=Date.now(); await page.goto('https://mymemobrick.com/pages/free-preview', { waitUntil:'load', timeout:60000 }); await page.waitForTimeout(6000); out.steps.push({ step:'free-preview-page', ms:Date.now()-t, card: await card() });
await page.screenshot({ path:`${outdir}/${device}-proof-03-free-preview.jpg`, type:'jpeg', quality:55, fullPage:true });
out.hulk = [...new Set(hulk)].slice(0,12);
console.log(JSON.stringify(out, null, 1)); await browser.close();
