// Renders every character's portrait and full-body PNG from the one minifigure builder.
import { createServer } from 'vite';
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'public/portraits');
mkdirSync(outDir, { recursive: true });

const server = await createServer({ root, server: { port: 5199, strictPort: true }, logLevel: 'error' });
await server.listen();
const executablePath = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('page error:', e.message));
page.on('console', (m) => { if (m.text().startsWith('rendered')) console.log(m.text()); });
await page.goto('http://localhost:5199/portraits.html', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__done === true, null, { timeout: 600000 });
const portraits = await page.evaluate(() => window.__portraits);
for (const [id, url] of Object.entries(portraits)) {
  writeFileSync(resolve(outDir, `${id}.png`), Buffer.from(url.split(',')[1], 'base64'));
}
const sheetPath = process.argv[2];
if (sheetPath) await page.screenshot({ path: sheetPath, fullPage: true });
console.log(`wrote ${Object.keys(portraits).length} images to public/portraits`);
await browser.close();
await server.close();
