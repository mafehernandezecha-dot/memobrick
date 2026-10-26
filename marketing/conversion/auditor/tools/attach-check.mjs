// Checks that the editor's add to cart attaches the design to the cart line (phone and desktop).
// Usage: TEST_PHOTO=/path/generated.jpg node attach-check.mjs <phone|desktop> <outdir>
// Generated test image only (never a customer photo). Stops at the cart: no checkout, no order.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, device, outdir] = process.argv;
const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone',
  userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
const page = await ctx.newPage();
const adds = [];
page.on('request', r => { if (/\/cart\/add/.test(r.url())) adds.push({ url: r.url().replace('https://mymemobrick.com',''), body: (r.postData()||'').slice(0,3000) }); });
const vis = s => page.locator(s).filter({ visible: true }).first();
await page.goto('https://mymemobrick.com/pages/editor?size=20x20#editor', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(2000);
await page.setInputFiles('#file', process.env.TEST_PHOTO);
await page.waitForTimeout(1500);
for (const s of ['#dcSelf', '.mbeg-skip']) { try { await vis(s).click({ timeout: 5000 }); await page.waitForTimeout(900); } catch {} }
await page.keyboard.press('Escape').catch(()=>{});
const fin = device==='phone' ? '#mobFinish' : 'button:has-text("Finish Editing")';
await vis(fin).click({ timeout: 20000 });
await page.waitForTimeout(6000);
await page.screenshot({ path: `${outdir}/${device}-attach-after-finish.jpg`, type: 'jpeg', quality: 55 });
const cart = await page.evaluate(async () => (await fetch('/cart.js')).json());
const lines = cart.items.map(i => ({ title: i.product_title, variant: i.variant_title, props: Object.fromEntries(Object.entries(i.properties||{}).map(([k,v]) => [k, typeof v==='string' ? (v.length>90 ? v.slice(0,90)+'…' : v) : v])) }));
await page.goto('https://mymemobrick.com/cart', { waitUntil: 'load' });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${outdir}/${device}-attach-cart.jpg`, type: 'jpeg', quality: 55, fullPage: true });
const imgs = await page.evaluate(() => [...document.querySelectorAll('img')].filter(i=>i.getBoundingClientRect().width>40).map(i=>({src:(i.currentSrc||i.src).slice(0,120), ok:i.complete && i.naturalWidth>0, alt:i.alt})).slice(0,8));
console.log(JSON.stringify({ device, item_count: cart.item_count, lines, adds: adds.map(a=>({url:a.url, bodyKeys: a.body.slice(0,600)})), cartImgs: imgs }, null, 1));
await browser.close();
