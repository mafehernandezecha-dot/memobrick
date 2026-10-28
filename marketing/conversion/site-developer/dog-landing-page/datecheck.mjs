import { chromium } from '/home/user/memobrick/os/node_modules/playwright-core/index.mjs';
import fs from 'fs';
const body = fs.readFileSync(process.argv[2], 'utf8');
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
for (const t of ['2026-10-28T12:00:00-04:00','2026-11-23T08:00:00-05:00','2026-12-16T08:00:00-05:00']) {
  const page = await browser.newPage();
  await page.clock.setFixedTime(new Date(t));
  await page.setContent('<div class="page-prose">' + body + '</div>');
  console.log(t, JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('[data-dlp-until]')].map(e => (getComputedStyle(e).display !== 'none') ? 'shown' : 'hidden'))));
  await page.close();
}
await browser.close();
