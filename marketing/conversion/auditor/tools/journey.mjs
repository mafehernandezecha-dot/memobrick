// Weekly purchase-path walk for the conversion-auditor.
// Usage: TEST_PHOTO=/path/to/generated-test-image.jpg node journey.mjs <phone|desktop> <home|p20|p16> <outdir> <prefix>
// TEST_PHOTO must be a generated stock-style image (never a customer photo or a real person).
// Phone runs use an Android Chrome user agent: in the agent sandbox shop.app is blocked, and Shopify bounces
// iPhone Safari through shop.app/accounts/sur. Checkout redirects to Shop Pay on shop.app, so the walk also opens
// /checkout?skip_shop_pay=true. It STOPS at the checkout page: no payment details, no order.
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
// Walks the purchase path and STOPS at the checkout page. Never fills payment or places an order.
const [,, device, start, outdir, prefix] = process.argv;
const vp = device === 'phone' ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: vp, isMobile: device==='phone', hasTouch: device==='phone', deviceScaleFactor: 1,
  userAgent: device==='phone' ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' : undefined });
const page = await ctx.newPage();
// shop.app is blocked by this sandbox's proxy. Shopify sends iPhone Safari through shop.app/accounts/sur and back;
// simulate the bounce by redirecting straight to the redirect_uri inside the signed code.
let surCount = 0;
await ctx.route(/^https:\/\/shop\.app\/accounts\/sur/, async (route) => {
  surCount++;
  try { const code = new URL(route.request().url()).searchParams.get('code'); const body = JSON.parse(Buffer.from(code.split('.')[1], 'base64url').toString()); const ru = body.body?.redirect_uri || body.redirect_uri; await route.fulfill({ status: 302, headers: { location: ru } }); }
  catch (e) { await route.abort(); }
});
const errs = [];
page.on('request', r => { if (r.isNavigationRequest() && r.frame() === page.mainFrame() && !r.url().startsWith('https://mymemobrick.com')) errs.push('OFFSITE-NAV: '+r.url().slice(0,300)); });
page.on('pageerror', e => errs.push(e.message.slice(0,160)));
const SKIP = ['MEMOBRICK','How it works','Reviews','Blog','Business services','Ready-made designs','Frames','Track your order','Sizes','Gift kit','FAQs','Contact','Corporate & bulk','Get My Free Proof'];
const log = [];
let n = 0;
const step = async (name, fn, opts={}) => {
  const t0 = Date.now();
  let ok = true, err = '';
  try { await fn(); } catch (e) { ok = false; err = e.message.split('\n')[0].slice(0,200); }
  const ms = Date.now()-t0;
  n++;
  const file = `${prefix}-${String(n).padStart(2,'0')}-${name}.jpg`;
  await page.screenshot({ path: `${outdir}/${file}`, type: 'jpeg', quality: 55, fullPage: !!opts.full }).catch(()=>{});
  const info = await page.evaluate((SKIP) => {
    const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none' && s.opacity!=='0'; };
    const btns = [...document.querySelectorAll('a,button,select,[role=button]')].filter(vis).map(el => (el.id?'#'+el.id+' ':'')+(el.innerText||el.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40)+'@'+Math.round(el.getBoundingClientRect().top)).filter(b=>!SKIP.some(s=>b.endsWith(s)||b.startsWith(s+'@')));
    return { sw: document.documentElement.scrollWidth, iw: innerWidth, url: location.href, title: document.title, btns: btns.slice(0,45), text: document.body.innerText.replace(/\n+/g,' | ').slice(0,1500) };
  }, SKIP).catch(e => ({ url: page.url(), err: e.message }));
  log.push({ step: n, name, ok, ms, err, file, ...info });
  console.error(`${n} ${name} ok=${ok} ${ms}ms ${err}`);
  return ok;
};
const nav = async (url) => { for (let i=0;i<4;i++){ try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); return; } catch(e){ if (i==3 || !/TUNNEL|RESET|CLOSED/.test(e.message)) throw e; await page.waitForTimeout(3000); } } };
const click = async (sel) => { const l = page.locator(sel).filter({ visible: true }).first(); await l.click({ timeout: 15000 }); };

if (start === 'home') {
  await step('home', () => nav('https://mymemobrick.com/'));
  await step('home-cta-to-editor', async () => { await Promise.all([page.waitForURL(/\/pages\/editor/, {timeout: 30000}), click('a[href^="/pages/editor"]')]); await page.waitForLoadState('load'); });
} else {
  const url = start === 'p16' ? 'https://mymemobrick.com/products/1-big-board' : 'https://mymemobrick.com/products/2-2-boards';
  await step('product', () => nav(url));
  await step('product-full', async () => {}, { full: true });
  await step('product-cta-to-editor', async () => { await Promise.all([page.waitForURL(/\/pages\/editor/, {timeout: 30000}), click('a[href*="/pages/editor"][href*="#editor"]')]); await page.waitForLoadState('load'); });
}
await page.waitForTimeout(1500);
for (let i=0;i<3;i++){ const t = await page.title().catch(()=> ''); if (/Something went wrong/.test(t) || page.url().startsWith('chrome-error')) { console.error('editor error page seen ('+t+'), retry '+(i+1)); errs.push('ERRORPAGE: '+t+' '+page.url()); await page.waitForTimeout(3000); await nav('https://mymemobrick.com/pages/editor?size=' + (start==='p16'?'16x16':'20x20') + '#editor'); } else break; }
await step('upload-photo', async () => {
  await page.setInputFiles('#file', process.env.TEST_PHOTO);
  await page.locator('#dcSelf').waitFor({ state: 'visible', timeout: 30000 });
});
await step('choose-design-myself', async () => { await click('#dcSelf'); await page.locator('.mbeg-skip').filter({visible:true}).first().waitFor({ timeout: 10000 }); });
await step('email-gate-skip', async () => { await click('.mbeg-skip'); await page.waitForTimeout(800); });
// adjust: open Crop tool, then Background tool, then step through
await step('adjust-crop', async () => {
  const sel = device==='phone' ? '.mob-toolcard:has-text("Crop")' : 'button:has-text("Crop")';
  await click(sel); await page.waitForTimeout(1200);
});
await step('adjust-next-step', async () => {
  // close any open sheet, then go to next editor step
  await page.keyboard.press('Escape').catch(()=>{});
  const sel = device==='phone' ? '#mStepNext' : 'button:has-text("Next")';
  await click(sel); await page.waitForTimeout(1200);
});
await step('finish-editing-add-to-cart', async () => {
  await page.keyboard.press('Escape').catch(()=>{});
  const sel = device==='phone' ? '#mobFinish' : 'button:has-text("Finish Editing")';
  await click(sel);
  await page.locator('#cartDrawerCheckout').filter({visible:true}).first().waitFor({ timeout: 30000 });
});
await step('cart-page', async () => { await nav('https://mymemobrick.com/cart'); }, { full: true });
await step('checkout-page', async () => {
  const btn = page.locator('button[name="checkout"], a[href="/checkout"], input[name="checkout"], #cartCheckout, button:has-text("Checkout"), a:has-text("Checkout")').filter({visible:true}).first();
  await Promise.all([page.waitForURL(/checkouts?\//, { timeout: 45000 }), btn.click({ timeout: 15000 })]);
  await page.waitForLoadState('load', { timeout: 45000 }).catch(()=>{});
  await page.waitForTimeout(4000);
}, { full: true });
await step('checkout-page-skip-shop-pay', async () => {
  await nav('https://mymemobrick.com/checkout?skip_shop_pay=true');
  await page.waitForTimeout(5000);
}, { full: true });
// STOP HERE. No payment details, no order.
console.log(JSON.stringify({ device, start, surCount, log, errs: [...new Set(errs)].slice(0,15) }, null, 1));
await browser.close();
