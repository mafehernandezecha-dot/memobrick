// Generates LEGO-photo portraits (avatars/<id>.png) and full-body figures
// (sprites/raw/<id>.png) with the Gemini image API, using reference images for
// style consistency. Requires GEMINI_API_KEY in the environment.
//
//   node scripts/gen-avatars.mjs --only betty            portrait for Betty
//   node scripts/gen-avatars.mjs --all                   portraits for everyone except approved ones
//   node scripts/gen-avatars.mjs --sprites --only betty  full-body figure
//   node scripts/gen-avatars.mjs --all --force           regenerate even if the file exists
//
// After Betty is approved, her portrait is added as a style reference for the others.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const cfg = JSON.parse(readFileSync(resolve(root, 'prompts/avatars.json'), 'utf8'));
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error('GEMINI_API_KEY is not set. Add it in the environment settings (Network secrets) and start a new session.');
  process.exit(1);
}
const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const sprites = flag('--sprites');
const only = opt('--only');
const force = flag('--force');
const outDir = resolve(root, sprites ? 'sprites/raw' : 'avatars');
mkdirSync(outDir, { recursive: true });

const mime = (p) => ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' })[extname(p).toLowerCase()];
const inline = (p) => ({ inline_data: { mime_type: mime(p), data: readFileSync(resolve(root, p)).toString('base64') } });

const defaultRefs = ['reference/betty.jpg', 'reference/armando.jpg', 'reference/marcela.jpg'];
const bettyApproved = existsSync(resolve(root, 'avatars/betty.png')) && existsSync(resolve(root, 'avatars/.betty-approved'));

async function generate(c) {
  const out = resolve(outDir, `${c.id}.png`);
  if (existsSync(out) && !force) {
    console.log(`skip ${c.id} (exists; use --force to regenerate)`);
    return;
  }
  let refs = c.refs ?? defaultRefs;
  if (!sprites && c.id !== 'betty' && bettyApproved) refs = ['avatars/betty.png', ...refs];
  if (sprites) refs = [`avatars/${c.id}.png`];
  const text = sprites
    ? `${cfg.spriteStyle}\n\nThe reference image is this character's approved portrait. ${c.prompt.replace(/[^.]*backdrop\.\s*$/i, '')}`
    : `${cfg.style}\n\n${cfg.consistency}\n\n${c.prompt}`;
  const body = {
    contents: [{ parts: [{ text }, ...refs.filter((r) => existsSync(resolve(root, r))).map(inline)] }],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '1:1' } },
  };
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    const part = json?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData || p.inline_data);
    const data = part?.inlineData?.data ?? part?.inline_data?.data;
    if (res.ok && data) {
      writeFileSync(out, Buffer.from(data, 'base64'));
      console.log(`wrote ${out.replace(root + '/', '')}`);
      return;
    }
    console.error(`${c.id} attempt ${attempt} failed: ${res.status} ${JSON.stringify(json?.error ?? json?.candidates?.[0]?.finishReason ?? json).slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
  }
  process.exitCode = 1;
}

const list = cfg.characters.filter((c) => (only ? c.id === only : flag('--all')));
if (!list.length) {
  console.error('Nothing selected. Use --only <id> or --all.');
  process.exit(1);
}
for (const c of list) await generate(c);
