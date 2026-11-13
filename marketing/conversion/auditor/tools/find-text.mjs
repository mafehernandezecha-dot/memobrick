// Read-only: page y position of text matches at phone width. Usage: node find-text.mjs <path> <regex>
import { chromium } from '/opt/node-tools/node_modules/playwright-core/index.mjs';
const [,, path, re] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', args: ['--no-sandbox'] });
const p = await (await b.newContext({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true })).newPage();
await p.goto('https://mymemobrick.com'+path,{waitUntil:'load'}); await p.waitForTimeout(2000);
const r = await p.evaluate(re=>{const R=new RegExp(re,'i');return {h:document.documentElement.scrollHeight,hits:[...document.querySelectorAll('body *')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&R.test(n.textContent))).map(e=>{const b=e.getBoundingClientRect();return {t:e.textContent.trim().replace(/\s+/g,' ').slice(0,90),y:Math.round(b.top+scrollY),h:Math.round(b.height),fixed:getComputedStyle(e.closest('[class]')||e).position}})}},re);
console.log(JSON.stringify(r,null,1)); await b.close();
