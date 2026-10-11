// Furniture and street props built from beveled bricks. Every builder places
// its object with the base centered on (x, z) at floor height y, in scene units.
import * as THREE from 'three';
import { block, canvasTexture, cylinder, plastic, S, Studs } from './kit';

const TAN = '#d9bf8c';
const TAN_DARK = '#b89c66';
const WHITE = '#f4f4f0';
const DARK = '#3a3f46';
const BROWN = '#7a4a2a';
const ORANGE = '#f08a24';
const GREEN = '#3fa34d';
const GREEN_LIGHT = '#5cc160';

type Ctx = { root: THREE.Object3D; studs: Studs };

function group(ctx: Ctx, x: number, y: number, z: number, rot = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rot;
  ctx.root.add(g);
  return g;
}

/** Office desk with a white computer and an orange lamp. The person stands on the -z side. */
export function desk(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  const w = 4 * S, d = 2 * S, h = 1.75;
  block(w, 0.24, d, TAN, 0, h - 0.24, 0, g);
  for (const sx of [-1, 1]) block(0.3, h - 0.24, d - 0.2, TAN_DARK, sx * (w / 2 - 0.25), 0, 0, g);
  // Monitor faces the person behind the desk; the camera sees its back.
  block(1.3, 0.85, 0.12, WHITE, -0.35, h + 0.12, 0.25, g);
  block(0.16, 0.14, 0.16, WHITE, -0.35, h, 0.25, g);
  block(0.9, 0.06, 0.32, '#d9dde2', -0.35, h, -0.3, g);
  // Lamp
  cylinder(0.16, 0.06, ORANGE, 1.05, h, 0.2, g);
  const arm = cylinder(0.04, 0.6, DARK, 1.05, h + 0.05, 0.2, g, 8);
  arm.rotation.z = 0.25;
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.26, 16, 1, true), plastic(ORANGE));
  shade.position.set(0.95, h + 0.72, 0.2);
  shade.castShadow = true;
  g.add(shade);
  ctx.studs.add(TAN, w / 2 - 0.4 + x, y + h, z - d / 2 + 0.4);
  return g;
}

export function chair(ctx: Ctx, x: number, y: number, z: number, color = DARK, rot = 0) {
  const g = group(ctx, x, y, z, rot);
  block(1.2, 0.2, 1.2, color, 0, 0.75, 0, g);
  block(1.2, 1.0, 0.2, color, 0, 0.95, -0.5, g);
  cylinder(0.08, 0.75, '#555a60', 0, 0, 0, g, 8);
  return g;
}

export function conferenceTable(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  const w = 12 * S, d = 4 * S;
  block(w, 0.3, d, '#b3262a', 0, 1.35, 0, g);
  block(w - 2, 1.35, 0.5, '#7d1a1d', 0, 0, 0, g);
  for (let i = 0; i < 5; i++) {
    const cx = -w / 2 + 1.3 + i * ((w - 2.6) / 4);
    chair(ctx, x + cx, y, z - d / 2 - 0.9, BROWN, 0);
    chair(ctx, x + cx, y, z + d / 2 + 0.9, BROWN, Math.PI);
  }
  // Papers on the table
  block(0.6, 0.03, 0.8, WHITE, -2, 1.65, 0.3, g);
  block(0.6, 0.03, 0.8, WHITE, 2.4, 1.65, -0.4, g);
  return g;
}

export function sofa(ctx: Ctx, x: number, y: number, z: number, color = ORANGE) {
  const g = group(ctx, x, y, z);
  block(4.2, 0.7, 1.6, color, 0, 0, 0, g);
  block(4.2, 1.0, 0.45, color, 0, 0.7, 0.58, g);
  for (const s of [-1, 1]) block(0.45, 0.6, 1.6, color, s * 1.9, 0.7, 0, g);
  return g;
}

export function bookshelf(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  const w = 3.6, h = 3.2, d = 0.8;
  block(w, h, d, '#8a5a34', 0, 0, 0, g);
  const colors = ['#2f6fd6', '#d63a2f', '#f2c12e', '#2fae6a', '#2f6fd6', '#d63a2f'];
  for (let row = 0; row < 3; row++)
    for (let i = 0; i < 6; i++)
      block(0.42, 0.75, 0.2, colors[(i + row) % colors.length], -w / 2 + 0.4 + i * 0.55, 0.25 + row * 1.0, d / 2 + 0.02, g);
  return g;
}

export function cabinet(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(1.4, 2.4, 1.2, '#9aa0a6', 0, 0, 0, g);
  for (let i = 0; i < 3; i++) block(0.5, 0.08, 0.06, '#d7dade', 0, 0.5 + i * 0.75, 0.62, g);
  return g;
}

export function plant(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  cylinder(0.45, 0.7, WHITE, 0, 0, 0, g);
  cylinder(0.12, 0.6, BROWN, 0, 0.7, 0, g, 8);
  const leaf = plastic(GREEN_LIGHT);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const l = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.1, 6), leaf);
    l.position.set(Math.cos(a) * 0.35, 1.55, Math.sin(a) * 0.35);
    l.rotation.set(Math.sin(a) * 0.7, 0, -Math.cos(a) * 0.7);
    l.castShadow = true;
    g.add(l);
  }
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 6), leaf);
  top.position.set(0, 1.9, 0);
  top.castShadow = true;
  g.add(top);
  return g;
}

export function rug(ctx: Ctx, x: number, y: number, z: number, color = '#b9a4d9') {
  const g = group(ctx, x, y, z);
  block(5.2, 0.06, 3.4, color, 0, 0, 0, g);
  return g;
}

export function counter(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(5, 1.6, 1.2, WHITE, 0, 0, 0, g);
  block(5.2, 0.15, 1.4, TAN, 0, 1.6, 0, g);
  return g;
}

export function shelves(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(6, 0.12, 1.0, '#9aa0a6', 0, 0.9, 0, g);
  block(6, 0.12, 1.0, '#9aa0a6', 0, 2.0, 0, g);
  for (const s of [-1, 1]) block(0.15, 3, 1.0, '#7d838a', s * 2.95, 0, 0, g);
  for (let i = 0; i < 5; i++) block(0.9, 0.7, 0.8, '#c99a5b', -2.3 + i * 1.15, 1.02, 0, g);
  for (let i = 0; i < 4; i++) block(0.9, 0.7, 0.8, '#d8b07a', -1.8 + i * 1.2, 2.12, 0, g);
  return g;
}

export function boxes(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(1.2, 1.0, 1.2, '#c99a5b', 0, 0, 0, g);
  block(1.0, 0.8, 1.0, '#d8b07a', 1.2, 0, 0.3, g);
  block(0.9, 0.7, 0.9, '#d8b07a', 0.2, 1.0, 0.1, g);
  return g;
}

/** Dress form for the design studio. */
export function mannequin(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  cylinder(0.4, 0.1, DARK, 0, 0, 0, g);
  cylinder(0.06, 1.4, DARK, 0, 0.1, 0, g, 8);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.55, 1.4, 16), plastic('#e86aa6'));
  body.position.set(0, 2.1, 0);
  body.castShadow = true;
  g.add(body);
  return g;
}

/** Clothes rail with colorful pieces. */
export function rack(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  for (const s of [-1, 1]) cylinder(0.06, 2.6, DARK, s * 1.8, 0, 0, g, 8);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.7, 8), plastic(DARK));
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 2.55, 0);
  g.add(bar);
  ['#e84393', '#2f6fd6', '#f2c12e', '#2fae6a', '#8e5bd9', '#f08a24'].forEach((c, i) => block(0.45, 1.3, 0.5, c, -1.4 + i * 0.56, 1.15, 0, g));
  return g;
}

export function whiteboard(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(4, 2, 0.15, WHITE, 0, 1.0, 0, g);
  block(4.2, 0.12, 0.3, '#9aa0a6', 0, 0.95, 0.05, g);
  block(1.4, 0.06, 0.02, '#2f6fd6', -0.8, 2.3, 0.09, g);
  block(2.0, 0.06, 0.02, '#d63a2f', 0.4, 1.9, 0.09, g);
  block(1.0, 0.06, 0.02, '#2fae6a', -0.4, 1.5, 0.09, g);
  return g;
}

/** Big boss desk for Presidencia. */
export function bigDesk(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(5.6, 1.75, 2.0, '#6b3e22', 0, 0, 0, g);
  block(5.8, 0.18, 2.2, '#8a5432', 0, 1.75, 0, g);
  block(1.6, 1.0, 0.12, '#2b2f36', -0.6, 1.93, 0.35, g);
  cylinder(0.16, 0.06, ORANGE, 1.9, 1.93, 0.3, g);
  return g;
}

export function elevator(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  block(3.2, 4.2, 1.6, '#8d939a', 0, 0, 0, g);
  block(2.4, 3.4, 0.08, '#b9bec4', 0, 0, 0.82, g);
  block(0.04, 3.4, 0.1, '#6d7379', 0, 0, 0.87, g);
  block(0.5, 0.3, 0.1, '#2fbf71', 0, 3.6, 0.82, g);
  return g;
}

// Street props

export function tree(ctx: Ctx, x: number, y: number, z: number, scale = 1) {
  const g = group(ctx, x, y, z);
  g.scale.setScalar(scale);
  cylinder(0.3, 1.4, '#7a4a2a', 0, 0, 0, g, 10);
  const leaf = plastic(GREEN);
  const sizes: [number, number][] = [[1.5, 1.6], [1.25, 2.6], [0.9, 3.5]];
  for (const [r, yy] of sizes) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), leaf);
    m.position.set(0, yy, 0);
    m.castShadow = true;
    g.add(m);
  }
  return g;
}

export function lampPost(ctx: Ctx, x: number, y: number, z: number) {
  const g = group(ctx, x, y, z);
  cylinder(0.12, 4.2, '#2b2f36', 0, 0, 0, g, 8);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 10), new THREE.MeshStandardMaterial({ color: '#fff7d6', emissive: '#fff1b0', emissiveIntensity: 0.5 }));
  head.position.set(0, 4.4, 0);
  g.add(head);
  return g;
}

export function car(ctx: Ctx, color: string) {
  const g = new THREE.Group();
  block(3.4, 0.7, 1.7, color, 0, 0.35, 0, g);
  block(1.8, 0.7, 1.5, color, -0.2, 1.05, 0, g);
  block(1.7, 0.55, 1.52, '#9fd3f2', -0.2, 1.12, 0, g);
  for (const sx of [-1.1, 1.1])
    for (const sz of [-0.8, 0.8]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.3, 16), plastic('#1d1d1f'));
      w.rotation.x = Math.PI / 2;
      w.position.set(sx, 0.38, sz);
      g.add(w);
    }
  ctx.root.add(g);
  return g;
}

/** Window grid texture for the background apartment blocks. */
function windowsTexture(base: string, cols: number, rows: number) {
  return canvasTexture(256, 256, (ctx) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    const cw = 256 / cols, rh = 256 / rows;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillRect(i * cw + cw * 0.18, j * rh + rh * 0.2, cw * 0.64, rh * 0.6);
        ctx.fillStyle = '#5aa0d8';
        ctx.fillRect(i * cw + cw * 0.24, j * rh + rh * 0.26, cw * 0.52, rh * 0.48);
      }
  });
}

export function building(ctx: Ctx, x: number, y: number, z: number, w: number, h: number, d: number, color: string) {
  const g = group(ctx, x, y, z);
  const tex = windowsTexture(color, Math.max(2, Math.round(w / 2.2)), Math.max(2, Math.round(h / 2.4)));
  const front = new THREE.MeshStandardMaterial({ color: '#ffffff', map: tex, roughness: 0.4 });
  const side = plastic(color);
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [side, side, side, side, front, side]);
  m.position.y = h / 2;
  m.castShadow = true;
  m.receiveShadow = true;
  g.add(m);
  ctx.studs.fill(color, x - w / 2, z - d / 2, w, d, y + h);
  return g;
}

/** String of pennants spelling a word, hung between two points at height y. */
export function pennants(ctx: Ctx, word: string, x0: number, x1: number, y: number, z: number) {
  const colors = ['#d63a2f', '#2f6fd6', '#f2c12e', '#2fae6a', '#8e5bd9'];
  const n = word.length;
  const step = (x1 - x0) / n;
  const line = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.04, 0.04), plastic('#3a3f46'));
  line.position.set((x0 + x1) / 2, y, z);
  ctx.root.add(line);
  [...word].forEach((ch, i) => {
    const tex = canvasTexture(64, 80, (c) => {
      c.fillStyle = colors[i % colors.length];
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(64, 0);
      c.lineTo(32, 80);
      c.closePath();
      c.fill();
      c.fillStyle = '#fff';
      c.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
      c.textAlign = 'center';
      c.fillText(ch, 32, 38);
    });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(step * 0.9, step * 1.1), new THREE.MeshStandardMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, roughness: 0.6 }));
    flag.position.set(x0 + step * (i + 0.5), y - step * 0.55, z + 0.03);
    ctx.root.add(flag);
  });
}
