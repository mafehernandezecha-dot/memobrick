import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/700.css';
import { CHARACTERS } from '../characters';
import { renderFullBody, renderPortrait } from '../minifig/render';

declare global {
  interface Window { __portraits?: Record<string, string>; __done?: boolean }
}

const style = document.createElement('style');
style.textContent = `
  body { margin: 0; background: #f6f4ef; font-family: 'Plus Jakarta Sans', sans-serif; color: #23201c; }
  h1 { font-size: 22px; margin: 28px 32px 4px; }
  p.sub { margin: 0 32px 20px; color: #7b746b; font-size: 13px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 18px; padding: 0 32px 32px; }
  .card { background: rgba(255,255,255,0.8); border: 1px solid rgba(0,0,0,0.06); border-radius: 20px; padding: 12px; box-shadow: 0 6px 20px rgba(60,40,10,0.06); text-align: center; }
  .card img.p { width: 100%; display: block; }
  .card img.f { width: 100%; display: block; margin-top: 6px; }
  .card b { display: block; font-size: 13px; margin-top: 8px; }
`;
document.head.appendChild(style);

const sheet = document.getElementById('sheet')!;
sheet.innerHTML = `<h1>Reparto Memobrick</h1><p class="sub">22 minifiguras · un solo constructor · retrato y cuerpo completo</p><div class="grid"></div>`;
const grid = sheet.querySelector('.grid')!;
const portraits: Record<string, string> = {};

async function run() {
for (const c of CHARACTERS) {
  await new Promise((r) => setTimeout(r, 0));
  const t0 = performance.now();
  const p = renderPortrait(c.spec, 512);
  const f = renderFullBody(c.spec, 420);
  portraits[c.id] = p;
  portraits[`${c.id}-full`] = f;
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img class="p" src="${p}" alt="${c.name}"><img class="f" src="${f}" alt="${c.name} cuerpo completo"><b>${c.name}</b>`;
  grid.appendChild(card);
  console.log(`rendered ${c.id} in ${Math.round(performance.now() - t0)} ms`);
}
window.__portraits = portraits;
window.__done = true;
}
run();
