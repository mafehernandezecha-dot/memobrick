// For every visible text element under 14px on phone pages, find the CSS rule (or inline style) that sets its font-size.
// Usage: node rules.mjs <themeId|live> <out.json> [paths...]
import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const [,, theme, outFile, ...paths] = process.argv;
const q = theme === 'live' ? '' : `preview_theme_id=${theme}`;
const u = (p) => `https://mymemobrick.com${p}${q ? (p.includes('?') ? '&' : '?') + q : ''}`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' });
await ctx.route(/^https:\/\/shop\.app\//, r => r.abort());
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
const out = [];
for (const path of (paths.length ? paths : ['/', '/products/2-2-boards', '/cart'])) {
  if (path === '/cart') {
    await page.evaluate(async () => { const c = await (await fetch('/cart.js')).json(); if (!c.item_count) { const p = await (await fetch('/products/bag-of-bricks-black-01.js')).json(); await fetch('/cart/add.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: p.variants[0].id, quantity: 1 }] }) }); } }).catch(() => {});
  }
  await page.goto(u(path), { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } window.scrollTo(0, 0); });
  const n = await page.evaluate(() => {
    let i = 0;
    for (const el of document.querySelectorAll('body *')) {
      let own = ''; for (const c of el.childNodes) if (c.nodeType === 3) own += c.textContent;
      if (!own.trim()) continue;
      const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      { const fz = parseFloat(s.fontSize); if (fz >= 15 || (fz >= 14 && !['P','LI'].includes(el.tagName))) continue; }
      // walk up to the element that sets the size
      el.setAttribute('data-ffid', String(i++));
    }
    return i;
  });
  const sheets = {};
  cdp.on('CSS.styleSheetAdded', e => { sheets[e.header.styleSheetId] = e.header.sourceURL || (e.header.isInline ? 'inline-style-tag' : e.header.origin); });
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: -1 });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '[data-ffid]' });
  for (const nodeId of nodeIds) {
    let cur = nodeId; let found = null; let hops = 0;
    const info = await cdp.send('DOM.describeNode', { nodeId });
    while (cur && hops < 8 && !found) {
      const m = await cdp.send('CSS.getMatchedStylesForNode', { nodeId: cur });
      const has = (style) => style && style.cssProperties.some(p => (p.name === 'font-size' || p.name === 'font') && !p.disabled && p.parsedOk !== false && (p.implicit !== true));
      if (has(m.inlineStyle)) found = { kind: 'inline', css: m.inlineStyle.cssText || '', hops };
      else {
        const rules = (m.matchedCSSRules || []).filter(r => r.rule.origin !== 'user-agent' && has(r.rule.style));
        if (rules.length) { const r = rules[rules.length - 1].rule; found = { kind: 'rule', sel: r.selectorList.text, media: (r.media || []).map(x => x.text).join(' | '), sheet: sheets[r.styleSheetId] || r.styleSheetId, hops }; }
      }
      if (!found) { const d = await cdp.send('DOM.describeNode', { nodeId: cur }); const p = await cdp.send('DOM.resolveNode', { nodeId: cur }); const par = await cdp.send('Runtime.callFunctionOn', { objectId: p.object.objectId, functionDeclaration: 'function(){return this.parentElement}', returnByValue: false }); if (!par.result.objectId) break; const rn = await cdp.send('DOM.requestNode', { objectId: par.result.objectId }); cur = rn.nodeId; hops++; }
    }
    const meta = await page.evaluate((id) => { const el = document.querySelector(`[data-ffid="${id}"]`); const s = getComputedStyle(el); let own = ''; for (const c of el.childNodes) if (c.nodeType === 3) own += c.textContent; return { size: parseFloat(s.fontSize), fam: s.fontFamily.split(',')[0].replace(/"/g, ''), tag: el.tagName.toLowerCase(), cls: el.className && el.className.baseVal === undefined ? el.className : '', text: own.trim().slice(0, 40) }; }, info.node.attributes[info.node.attributes.indexOf('data-ffid') + 1]);
    out.push({ path, ...meta, ...(found || { kind: 'none' }) });
  }
  await cdp.send('CSS.disable'); await cdp.send('DOM.disable');
  console.error(path, n);
}
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
await browser.close();
