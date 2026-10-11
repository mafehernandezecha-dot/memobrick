// Shared LEGO building blocks for the office scene: glossy plastic materials,
// beveled bricks, and studs drawn as instanced cylinders.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/** Scene units per stud. A minifig is about 4 units tall, like the real 5-stud figure. */
export const S = 0.8;
/** Height of one plate (a brick is three plates). */
export const PLATE = 0.32;

const mats = new Map<string, THREE.MeshStandardMaterial>();
export function plastic(color: string, opts: { roughness?: number; map?: THREE.Texture; transparent?: boolean; opacity?: number } = {}) {
  const key = `${color}|${opts.roughness ?? ''}|${opts.map?.uuid ?? ''}|${opts.opacity ?? ''}`;
  let m = mats.get(key);
  if (!m) {
    m = new THREE.MeshStandardMaterial({
      color,
      roughness: opts.roughness ?? 0.32,
      metalness: 0,
      map: opts.map,
      transparent: opts.transparent,
      opacity: opts.opacity ?? 1,
    });
    mats.set(key, m);
  }
  return m;
}

const geos = new Map<string, THREE.BufferGeometry>();
function roundedBox(w: number, h: number, d: number) {
  const key = `${w.toFixed(3)}|${h.toFixed(3)}|${d.toFixed(3)}`;
  let g = geos.get(key);
  if (!g) {
    const r = Math.min(0.06, w / 4, h / 4, d / 4);
    g = new RoundedBoxGeometry(w, h, d, 2, r);
    geos.set(key, g);
  }
  return g;
}

/** A beveled box with its bottom at y. Sizes are in scene units. */
export function block(w: number, h: number, d: number, color: string, x: number, y: number, z: number, parent?: THREE.Object3D) {
  const m = new THREE.Mesh(roundedBox(w, h, d), plastic(color));
  m.position.set(x, y + h / 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent?.add(m);
  return m;
}

export function cylinder(r: number, h: number, color: string, x: number, y: number, z: number, parent?: THREE.Object3D, segments = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, segments), plastic(color));
  m.position.set(x, y + h / 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent?.add(m);
  return m;
}

/** Collects stud positions per color and turns them into one InstancedMesh each. */
export class Studs {
  private byColor = new Map<string, THREE.Vector3[]>();
  add(color: string, x: number, y: number, z: number) {
    const list = this.byColor.get(color) ?? [];
    list.push(new THREE.Vector3(x, y, z));
    this.byColor.set(color, list);
  }
  /** Studs covering a rectangle (scene units) on top of a surface at height y. */
  fill(color: string, x0: number, z0: number, w: number, d: number, y: number) {
    const nx = Math.max(1, Math.round(w / S));
    const nz = Math.max(1, Math.round(d / S));
    for (let i = 0; i < nx; i++)
      for (let j = 0; j < nz; j++) this.add(color, x0 + (i + 0.5) * (w / nx), y, z0 + (j + 0.5) * (d / nz));
  }
  build(parent: THREE.Object3D) {
    const geo = new THREE.CylinderGeometry(0.24, 0.24, 0.17, 14);
    geo.translate(0, 0.085, 0);
    const m4 = new THREE.Matrix4();
    for (const [color, list] of this.byColor) {
      const inst = new THREE.InstancedMesh(geo, plastic(color), list.length);
      list.forEach((p, i) => inst.setMatrixAt(i, m4.makeTranslation(p.x, p.y, p.z)));
      inst.castShadow = false;
      inst.receiveShadow = true;
      parent.add(inst);
    }
  }
}

/** Canvas texture helper. */
export function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, repeat?: [number, number]) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

/** Square floor tiles with thin grout lines. */
export function tileTexture(base: string, grout: string, repeat: [number, number], tiles = 2) {
  return canvasTexture(128, 128, (ctx) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = grout;
    ctx.lineWidth = 3;
    const step = 128 / tiles;
    for (let i = 0; i <= tiles; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, 128);
      ctx.moveTo(0, i * step);
      ctx.lineTo(128, i * step);
      ctx.stroke();
    }
  }, repeat);
}

/** A flat textured slab (floors, carpets, road). Top surface at y + h. */
export function slab(w: number, d: number, h: number, mat: THREE.Material, x: number, y: number, z: number, parent?: THREE.Object3D) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x + w / 2, y + h / 2, z + d / 2);
  m.receiveShadow = true;
  parent?.add(m);
  return m;
}
