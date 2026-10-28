// Drives MemoBrick Studio (team editor, branch claude/memobrick-editor-standalone-0dyk45)
// headless through window.MB_TEAM: new project, photo, size, crop reset to the full photo,
// saturation -35, temperature -15, then exports the Studio mosaic canvas as PNG.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path'), fs = require('fs');
const MP = '/tmp/claude-0/-home-user-memobrick/6c2afd08-63fe-5a7d-83a8-1df45d57cf83/scratchpad/mon/mp';
(async () => {
  const [,, url, photo, sizeId, out, name] = process.argv;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('pageerror', e.message));
  await p.route(/^https?:\/\/(?!localhost)/, async route => {
    const u = route.request().url();
    const m = u.match(/tasks-vision@[^/]+\/(.*)$/);
    if (m) {
      const f = path.join(MP, 'package', m[1]);
      const ct = f.endsWith('.wasm') ? 'application/wasm' : 'text/javascript';
      return route.fulfill({ status: 200, body: fs.readFileSync(f), headers: { 'content-type': ct, 'access-control-allow-origin': '*' } });
    }
    if (u.includes('blaze_face')) return route.fulfill({ status: 200, body: fs.readFileSync(path.join(MP, 'face.tflite')), headers: { 'access-control-allow-origin': '*' } });
    if (u.includes('selfie_multiclass')) return route.fulfill({ status: 200, body: fs.readFileSync(path.join(MP, 'seg.tflite')), headers: { 'access-control-allow-origin': '*' } });
    return route.abort();
  });
  await p.goto(url);
  await p.waitForFunction(() => window.MB_TEAM);
  await p.click('[data-action=new] >> nth=0');
  await p.fill('input[name=name]', name || 'Social redo');
  await p.selectOption('#teamProjectSize', sizeId);
  await p.click('#teamProjectSubmit');
  await p.setInputFiles('#file', photo);
  await p.waitForFunction(() => { const S = window.MB_TEAM.S; return S.cells && S.usedPal && S.cells.length > 0; }, null, { timeout: 60000 });
  const settle = async (label) => {
    let last = '', stable = 0;
    for (let i = 0; i < 90 && stable < 5; i++) {
      await p.waitForTimeout(1000);
      const st = await p.evaluate(() => { const S = window.MB_TEAM.S;
        let h = 0; for (let k = 0; k < S.cells.length; k++) h = (h * 31 + S.cells[k]) | 0;
        return { h, faces: S.mlFacesImg === S.imgId, size: S.size.id }; });
      const sig = JSON.stringify(st);
      if (sig === last) stable++; else stable = 0;
      last = sig;
    }
    console.log(label, last);
  };
  await settle('loaded');
  // crop reset to the full photo (same as the Reset crop button), then the adjustments
  for (let k = 0; k < 4; k++) {
    await p.evaluate(() => document.querySelector('#resetCrop').click());
    await settle('crop reset ' + k);
    const z = await p.evaluate(() => window.MB_TEAM.S.zoom);
    if (Math.abs(z - 1) < 0.001) break;
  }
  const ADJ = JSON.parse(process.env.ADJ || '{"sat":-35,"temp":-15}');
  await p.evaluate((a) => { const T = window.MB_TEAM, S = T.S;
    Object.assign(S, a); T.syncSliders(); T.render(); }, ADJ);
  await settle('adjusted');
  const data = await p.evaluate(() => { const T = window.MB_TEAM, S = T.S;
    return { size: S.size.label, id: S.size.id, gw: S.size.gw, gh: S.size.gh, colors: S.usedPal.length,
      state: window.MB_debugState(), temp: S.temp, adj: null, canvas: [T.mosaic.width, T.mosaic.height] }; });
  const png = await p.evaluate(() => window.MB_TEAM.mosaic.toDataURL('image/png'));
  fs.writeFileSync(out, Buffer.from(png.split(',')[1], 'base64'));
  fs.writeFileSync(out + '.json', JSON.stringify(data));
  await p.screenshot({ path: out.replace(/\.png$/, '-ui.jpg'), type: 'jpeg', quality: 70 });
  console.log(JSON.stringify({ size: data.size, gw: data.gw, gh: data.gh, colors: data.colors, sat: data.state.sat, temp: data.temp, zoom: data.state.zoom, ox: data.state.ox, oy: data.state.oy, canvas: data.canvas }));
  await b.close();
})();
