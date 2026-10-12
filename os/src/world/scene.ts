// "El mundo": the isometric LEGO city block with the Memobrick office.
// Three.js with an orthographic camera; HTML overlays (room labels, badges,
// speech bubbles) are positioned each frame from 3D anchor points.
import * as THREE from 'three';
import { buildMinifig } from '../minifig/builder';
import { block, canvasTexture, PLATE, plastic, S, slab, Studs, tileTexture } from './kit';
import { OFFICE, placeAgents, ROOMS } from './layout';
import type { Room } from './layout';
import { specFor } from './looks';
import * as P from './props';

export type FigureInfo = {
  agent: string;
  character: string;
  state: 'working' | 'needs' | 'ghost';
};

const OX = (-OFFICE.w * S) / 2;
const OZ = (-OFFICE.d * S) / 2;
/** Stud coordinates to scene coordinates. */
const sx = (x: number) => OX + x * S;
const sz = (z: number) => OZ + z * S;

const BASE_H = 0.3; // cream office baseplate
const FLOOR_Y = BASE_H + 0.06;
const WALL_H = 2.1;
const WALL_T = 0.6;
const WALL_COLOR = '#f3ead2';
const WALL_TOP = '#e6c66f';

/** Direction from the target to the camera: a classic isometric-style view from the front right. */
const VIEW_DIR = new THREE.Vector3(0.62, 0.95, 1).normalize();

const MARGIN = 5; // studs of cream sidewalk around the office
const ROAD = 9; // road width in studs

export class OfficeWorld {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.OrthographicCamera;
  private target = new THREE.Vector3(0, 0, 2);
  private frustum = 60;
  private figures = new Map<string, { group: THREE.Group; info: FigureInfo; phase: number }>();
  private partyAt = -100;
  private figureRoot = new THREE.Group();
  private cars: { obj: THREE.Object3D; t: number; speed: number; lane: number }[] = [];
  private roadPath: { a: THREE.Vector2; b: THREE.Vector2; len: number }[] = [];
  private overlay: HTMLElement | null = null;
  private anchors = new Map<string, THREE.Vector3>();
  private raf = 0;
  private clock = new THREE.Clock();
  private resizeObs: ResizeObserver;
  private ghostMat = new THREE.MeshStandardMaterial({ color: '#c3c8cf', transparent: true, opacity: 0.38, roughness: 0.5, depthWrite: false });
  private pointers = new Map<number, { x: number; y: number }>();
  private dragDist = 0;
  private pinchStart = 0;
  private zoomStart = 1;
  private sized = false;

  constructor(private container: HTMLElement, private onPick: (agent: string) => void) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setClearColor('#dfeccf');
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.touchAction = 'none';

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    this.scene.add(this.figureRoot);
    this.lights();
    this.city();
    this.office();

    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    this.bindControls();
    this.loop();
  }

  setOverlay(el: HTMLElement | null) {
    this.overlay = el;
  }

  /** Anchor points for overlays, keyed like "room:presidencia" or "agent:seo-technical". */
  anchorKeys() {
    return [...this.anchors.keys()];
  }

  setFigures(list: FigureInfo[]) {
    const placed = placeAgents(list.map((f) => f.character));
    for (const info of list) {
      const prev = this.figures.get(info.agent);
      if (prev && prev.info.state === info.state && prev.info.character === info.character) continue;
      if (prev) this.figureRoot.remove(prev.group);
      const spec = specFor(info.character);
      const spot = placed.get(info.character);
      if (!spec || !spot) continue;
      const fig = buildMinifig({ ...spec, pose: info.state === 'working' ? 'type' : spec.pose });
      fig.scale.setScalar(0.92);
      fig.position.set(sx(spot.x), FLOOR_Y, sz(spot.z));
      fig.userData.agent = info.agent;
      fig.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          if (info.state === 'ghost') {
            o.material = this.ghostMat;
            o.castShadow = false;
          } else {
            o.castShadow = true;
          }
          o.userData.agent = info.agent;
        }
      });
      this.figureRoot.add(fig);
      this.figures.set(info.agent, { group: fig, info, phase: Math.random() * Math.PI * 2 });
      this.anchors.set(`agent:${info.agent}`, new THREE.Vector3(sx(spot.x) + 0.9, FLOOR_Y + 4.1, sz(spot.z)));
    }
    for (const [agent, f] of this.figures)
      if (!list.some((l) => l.agent === agent)) {
        this.figureRoot.remove(f.group);
        this.figures.delete(agent);
        this.anchors.delete(`agent:${agent}`);
      }
  }

  /** Everyone jumps for a few seconds: a sale just came in. */
  celebrate() {
    this.partyAt = this.clock.getElapsedTime();
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.resizeObs.disconnect();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // Setup

  private lights() {
    this.scene.add(new THREE.HemisphereLight('#ffffff', '#b9c9a2', 1.25));
    const sun = new THREE.DirectionalLight('#fff6e6', 1.9);
    sun.position.set(-30, 60, 25);
    sun.target.position.set(0, 0, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    const c = sun.shadow.camera;
    c.left = -70;
    c.right = 70;
    c.top = 70;
    c.bottom = -70;
    c.near = 1;
    c.far = 200;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    sun.shadow.radius = 3;
    this.scene.add(sun, sun.target);
  }

  private city() {
    const root = new THREE.Group();
    this.scene.add(root);
    const studs = new Studs();
    const ctx = { root, studs };

    const grass = canvasTexture(256, 256, (c) => {
      c.fillStyle = '#6cc35a';
      c.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 900; i++) {
        c.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,60,0,0.05)';
        c.fillRect(Math.random() * 256, Math.random() * 256, 3, 3);
      }
    }, [30, 30]);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ map: grass, roughness: 0.9 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    root.add(ground);

    // Road loop around the office block.
    const x0 = -MARGIN - ROAD, x1 = OFFICE.w + MARGIN + ROAD;
    const z0 = -MARGIN - ROAD, z1 = OFFICE.d + MARGIN + ROAD;
    const asphalt = new THREE.MeshStandardMaterial({ color: '#3b3f45', roughness: 0.85 });
    const rs = (x: number, z: number, w: number, d: number) => slab(w * S, d * S, 0.1, asphalt, sx(x), 0, sz(z), root);
    rs(x0, z0, x1 - x0, ROAD);
    rs(x0, z1 - ROAD, x1 - x0, ROAD);
    rs(x0, z0 + ROAD, ROAD, z1 - z0 - 2 * ROAD);
    rs(x1 - ROAD, z0 + ROAD, ROAD, z1 - z0 - 2 * ROAD);

    // Dashed center line.
    const dash = plastic('#f4f4f0', { roughness: 0.6 });
    const mid = ROAD / 2;
    const cx0 = x0 + mid, cx1 = x1 - mid, cz0 = z0 + mid, cz1 = z1 - mid;
    const dashes = (ax: number, az: number, bx: number, bz: number) => {
      const len = Math.hypot(bx - ax, bz - az);
      const n = Math.floor(len / 4);
      for (let i = 0; i < n; i++) {
        const t = (i + 0.25) / n;
        const m = new THREE.Mesh(new THREE.BoxGeometry(bx !== ax ? 1.6 * S : 0.25, 0.04, bz !== az ? 1.6 * S : 0.25), dash);
        m.position.set(sx(ax + (bx - ax) * t), 0.12, sz(az + (bz - az) * t));
        root.add(m);
      }
    };
    dashes(cx0 + 4, cz0, cx1 - 4, cz0);
    dashes(cx0 + 4, cz1, cx1 - 4, cz1);
    dashes(cx0, cz0 + 4, cx0, cz1 - 4);
    dashes(cx1, cz0 + 4, cx1, cz1 - 4);
    // Crosswalk in front of the entrance.
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.7 * S, 0.04, (ROAD - 1.5) * S), dash);
      m.position.set(sx(31 + i * 1.3), 0.12, sz(z0 + ROAD / 2));
      root.add(m);
    }
    // Car path along the lanes.
    const lanePts = (inset: number) => [
      new THREE.Vector2(sx(x0 + inset), sz(z0 + inset)),
      new THREE.Vector2(sx(x1 - inset), sz(z0 + inset)),
      new THREE.Vector2(sx(x1 - inset), sz(z1 - inset)),
      new THREE.Vector2(sx(x0 + inset), sz(z1 - inset)),
    ];
    const pts = lanePts(mid - 2);
    for (let i = 0; i < 4; i++) {
      const a = pts[i], b = pts[(i + 1) % 4];
      this.roadPath.push({ a, b, len: a.distanceTo(b) });
    }
    [['#d63a2f', 0.02], ['#f2c12e', 0.38], ['#f4f4f0', 0.64], ['#2f6fd6', 0.86]].forEach(([color, t], i) => {
      const obj = P.car(ctx, color as string);
      this.cars.push({ obj, t: t as number, speed: 0.012 + i * 0.002, lane: 0 });
    });

    // Apartment blocks behind the road.
    const colors = ['#f08a3c', '#2fae9e', '#f2c94c', '#f28cb8', '#7cc4ef', '#e4b07a', '#9b8cd9'];
    let bx = x0 - 6;
    let i = 0;
    while (bx < x1 + 6) {
      const w = 10 + ((i * 7) % 6);
      const h = 9 + ((i * 5) % 4) * 2.4;
      P.building(ctx, sx(bx + w / 2), 0, sz(z0 - 10), w * S, h, 8 * S, colors[i % colors.length]);
      bx += w + 2;
      i++;
    }
    // Side blocks.
    for (let j = 0; j < 4; j++) {
      P.building(ctx, sx(x0 - 12), 0, sz(z0 + 6 + j * 16), 9 * S, 8 + (j % 2) * 3, 12 * S, colors[(j + 3) % colors.length]);
      P.building(ctx, sx(x1 + 12), 0, sz(z0 + 6 + j * 16), 9 * S, 7 + ((j + 1) % 2) * 3, 12 * S, colors[(j + 5) % colors.length]);
    }

    // Trees and street lamps on the sidewalk and verge.
    const treeSpots: [number, number][] = [[-3, -3], [OFFICE.w + 3, -3], [-3, OFFICE.d + 3], [OFFICE.w + 3, OFFICE.d + 3], [20, -3], [46, -3], [x0 - 3, 10], [x1 + 3, 30], [x0 - 3, 40], [x1 + 3, 0]];
    for (const [tx, tz] of treeSpots) P.tree(ctx, sx(tx), BASE_H, sz(tz), 0.75);
    for (const lx of [8, 26, 42, 58]) {
      P.lampPost(ctx, sx(lx), BASE_H, sz(-MARGIN + 1));
      P.lampPost(ctx, sx(lx), BASE_H, sz(OFFICE.d + MARGIN - 1));
    }
    for (const lz of [10, 34]) {
      P.lampPost(ctx, sx(-MARGIN + 1), BASE_H, sz(lz));
      P.lampPost(ctx, sx(OFFICE.w + MARGIN - 1), BASE_H, sz(lz));
    }
    studs.build(root);
  }

  private office() {
    const root = new THREE.Group();
    this.scene.add(root);
    const studs = new Studs();
    const ctx = { root, studs };

    // Cream tiled baseplate that the office sits on.
    const cream = new THREE.MeshStandardMaterial({ map: tileTexture('#efe6cf', '#ddd2b6', [(OFFICE.w + 2 * MARGIN) / 2, (OFFICE.d + 2 * MARGIN) / 2]), roughness: 0.55 });
    slab((OFFICE.w + 2 * MARGIN) * S, (OFFICE.d + 2 * MARGIN) * S, BASE_H, cream, sx(-MARGIN), 0, sz(-MARGIN), root);

    // Hallway carpet.
    const lilac = new THREE.MeshStandardMaterial({ color: '#c3b6e6', roughness: 0.9 });
    slab(OFFICE.w * S, 7 * S, 0.06, lilac, sx(0), BASE_H, sz(18), root);
    slab(8 * S, 8 * S, 0.06, lilac, sx(30), BASE_H, sz(10), root);

    for (const r of ROOMS) this.room(ctx, r);
    this.walls(ctx);

    P.elevator(ctx, sx(27), BASE_H, sz(19.2));
    P.plant(ctx, sx(1.5), BASE_H, sz(19.5));
    P.plant(ctx, sx(62.5), BASE_H, sz(19.5));
    // Company pennants over the hallway, facing the camera.
    P.pennants(ctx, 'MEMOBRICK', sx(39), sx(49), WALL_H + BASE_H + 1.7, sz(14) + 0.45);
    block(0.12, 2.1, 0.12, '#3a3f46', sx(38.9), BASE_H + WALL_H, sz(14) + 0.45, root);
    block(0.12, 2.1, 0.12, '#3a3f46', sx(49.1), BASE_H + WALL_H, sz(14) + 0.45, root);
    studs.build(root);
  }

  private room(ctx: { root: THREE.Group; studs: Studs }, r: Room) {
    const floors: Record<Room['floor'], THREE.Material> = {
      tile: new THREE.MeshStandardMaterial({ map: tileTexture('#c9ccd0', '#b3b7bc', [r.w / 2, r.d / 2]), roughness: 0.5 }),
      wood: new THREE.MeshStandardMaterial({ map: tileTexture('#c9905a', '#ad7746', [r.w / 2, r.d], 1), roughness: 0.6 }),
      carpet: new THREE.MeshStandardMaterial({ color: '#d9e9e3', roughness: 0.9 }),
      red: new THREE.MeshStandardMaterial({ color: '#8f2a25', roughness: 0.8 }),
    };
    slab(r.w * S, r.d * S, 0.06, floors[r.floor], sx(r.x), BASE_H, sz(r.z), ctx.root);

    r.seats.forEach((s, i) => {
      const ch = r.cast[i];
      if (r.id === 'entrada') return;
      if (r.id === 'presidencia') {
        P.bigDesk(ctx, sx(r.x + s.x), FLOOR_Y, sz(r.z + s.z + 2));
        P.chair(ctx, sx(r.x + s.x), FLOOR_Y, sz(r.z + s.z - 1), '#2b2f36');
        return;
      }
      if (ch !== undefined || r.seats.length) P.desk(ctx, sx(r.x + s.x), FLOOR_Y, sz(r.z + s.z + 1.8));
    });
    for (const f of r.furniture) {
      const x = sx(r.x + f.x), z = sz(r.z + f.z);
      switch (f.kind) {
        case 'conference': P.conferenceTable(ctx, x, FLOOR_Y, z); break;
        case 'sofa': P.sofa(ctx, x, FLOOR_Y, z, r.id === 'marcela' ? '#d98bb0' : undefined); break;
        case 'bookshelf': P.bookshelf(ctx, x, FLOOR_Y, z); break;
        case 'cabinet': P.cabinet(ctx, x, FLOOR_Y, z); break;
        case 'plant': P.plant(ctx, x, FLOOR_Y, z); break;
        case 'rug': P.rug(ctx, x, FLOOR_Y, z); break;
        case 'counter': P.counter(ctx, x, FLOOR_Y, z); break;
        case 'shelves': P.shelves(ctx, x, FLOOR_Y, z); break;
        case 'boxes': P.boxes(ctx, x, FLOOR_Y, z); break;
        case 'mannequin': P.mannequin(ctx, x, FLOOR_Y, z); break;
        case 'rack': P.rack(ctx, x, FLOOR_Y, z); break;
        case 'whiteboard': P.whiteboard(ctx, x, FLOOR_Y, z); break;
        case 'bigdesk': P.bigDesk(ctx, x, FLOOR_Y, z); break;
      }
    }
    // Labels sit on the room's back-left corner, like name plates.
    this.anchors.set(`room:${r.id}`, new THREE.Vector3(sx(r.x + 0.6), BASE_H + WALL_H + 0.5, sz(r.z + 0.4)));
  }

  /** Walls from room edges, shared edges built once, door openings left open. */
  private walls(ctx: { root: THREE.Group; studs: Studs }) {
    const edges = new Set<string>();
    const doors = new Set<string>();
    for (const r of ROOMS) {
      for (let x = r.x; x < r.x + r.w; x++) {
        edges.add(`h:${x}:${r.z}`);
        edges.add(`h:${x}:${r.z + r.d}`);
      }
      for (let z = r.z; z < r.z + r.d; z++) {
        edges.add(`v:${r.x}:${z}`);
        edges.add(`v:${r.x + r.w}:${z}`);
      }
      for (const d of r.doors)
        for (let i = 0; i < d.width; i++) {
          if (d.side === 'n') doors.add(`h:${r.x + d.at + i}:${r.z}`);
          if (d.side === 's') doors.add(`h:${r.x + d.at + i}:${r.z + r.d}`);
          if (d.side === 'w') doors.add(`v:${r.x}:${r.z + d.at + i}`);
          if (d.side === 'e') doors.add(`v:${r.x + r.w}:${r.z + d.at + i}`);
        }
    }
    for (const d of doors) edges.delete(d);

    const runs = (dir: 'h' | 'v') => {
      const byLine = new Map<number, number[]>();
      for (const e of edges) {
        const [k, a, b] = e.split(':');
        if (k !== dir) continue;
        const line = dir === 'h' ? +b : +a;
        const pos = dir === 'h' ? +a : +b;
        byLine.set(line, [...(byLine.get(line) ?? []), pos]);
      }
      const out: { line: number; start: number; end: number }[] = [];
      for (const [line, list] of byLine) {
        list.sort((p, q) => p - q);
        let start = list[0];
        let prev = list[0];
        for (const p of list.slice(1)) {
          if (p !== prev + 1) {
            out.push({ line, start, end: prev + 1 });
            start = p;
          }
          prev = p;
        }
        out.push({ line, start, end: prev + 1 });
      }
      return out;
    };

    const y = BASE_H;
    for (const r of runs('h')) {
      const len = (r.end - r.start) * S + WALL_T;
      const cx = (sx(r.start) + sx(r.end)) / 2;
      block(len, WALL_H, WALL_T, WALL_COLOR, cx, y, sz(r.line), ctx.root);
      block(len, PLATE, WALL_T + 0.08, WALL_TOP, cx, y + WALL_H, sz(r.line), ctx.root);
      for (let p = r.start; p < r.end; p++) ctx.studs.add(WALL_TOP, sx(p + 0.5), y + WALL_H + PLATE, sz(r.line));
    }
    for (const r of runs('v')) {
      const len = (r.end - r.start) * S + WALL_T;
      const cz = (sz(r.start) + sz(r.end)) / 2;
      block(WALL_T, WALL_H, len, WALL_COLOR, sx(r.line), y, cz, ctx.root);
      block(WALL_T + 0.08, PLATE, len, WALL_TOP, sx(r.line), y + WALL_H, cz, ctx.root);
      for (let p = r.start; p < r.end; p++) ctx.studs.add(WALL_TOP, sx(r.line), y + WALL_H + PLATE, sz(p + 0.5));
    }
  }

  // Camera and input

  private resize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    const aspect = w / h;
    // Fit the office block across the width on wide screens.
    this.frustum = Math.max(78 / aspect, 46);
    this.camera.left = (-this.frustum * aspect) / 2;
    this.camera.right = (this.frustum * aspect) / 2;
    this.camera.top = this.frustum / 2;
    this.camera.bottom = -this.frustum / 2;
    if (!this.sized && aspect < 0.8) this.camera.zoom = 1.5;
    this.sized = true;
    this.placeCamera();
  }

  private placeCamera() {
    this.camera.position.copy(this.target).addScaledVector(VIEW_DIR, 150);
    this.camera.lookAt(this.target);
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld();
  }

  private bindControls() {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', (e) => {
      el.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      this.dragDist = 0;
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        this.pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
        this.zoomStart = this.camera.zoom;
      }
    });
    el.addEventListener('pointermove', (e) => {
      const prev = this.pointers.get(e.pointerId);
      if (!prev) {
        this.hover(e);
        return;
      }
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (this.pointers.size === 2) {
        const [a, b] = [...this.pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        this.setZoom(this.zoomStart * (dist / Math.max(1, this.pinchStart)));
        this.dragDist += 10;
        return;
      }
      this.dragDist += Math.abs(dx) + Math.abs(dy);
      this.pan(dx, dy);
    });
    const end = (e: PointerEvent) => {
      if (this.pointers.has(e.pointerId) && this.pointers.size === 1 && this.dragDist < 6) this.pick(e);
      this.pointers.delete(e.pointerId);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', (e) => this.pointers.delete(e.pointerId));
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.setZoom(this.camera.zoom * Math.exp(-e.deltaY * 0.0015));
    }, { passive: false });
  }

  private setZoom(z: number) {
    this.camera.zoom = THREE.MathUtils.clamp(z, 0.7, 4);
    this.camera.updateProjectionMatrix();
  }

  private pan(dx: number, dy: number) {
    const h = this.container.clientHeight || 1;
    const wpp = this.frustum / this.camera.zoom / h;
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1);
    // Move along the ground so the view never drifts up or down.
    right.y = 0;
    up.y = 0;
    // A ground step of L moves the image by L * sin(elevation).
    up.normalize().multiplyScalar(1 / VIEW_DIR.y);
    this.target.addScaledVector(right.normalize(), -dx * wpp).addScaledVector(up, dy * wpp);
    this.target.x = THREE.MathUtils.clamp(this.target.x, -60, 60);
    this.target.z = THREE.MathUtils.clamp(this.target.z, -50, 50);
    this.placeCamera();
  }

  private ray(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    const rc = new THREE.Raycaster();
    rc.setFromCamera(ndc, this.camera);
    const hit = rc.intersectObjects(this.figureRoot.children, true)[0];
    return (hit?.object.userData.agent as string | undefined) ?? null;
  }

  private hover(e: PointerEvent) {
    this.renderer.domElement.style.cursor = this.ray(e) ? 'pointer' : 'grab';
  }

  private pick(e: PointerEvent) {
    const agent = this.ray(e);
    if (agent) this.onPick(agent);
  }

  // Frame loop

  private loop = () => {
    this.raf = requestAnimationFrame(this.loop);
    this.animate(this.clock.getElapsedTime());
    this.renderer.render(this.scene, this.camera);
    this.positionOverlays();
  };

  private animate(t: number) {
    const total = this.roadPath.reduce((n, s) => n + s.len, 0);
    for (const car of this.cars) {
      car.t = (car.t + car.speed * 0.016) % 1;
      let d = car.t * total;
      for (const seg of this.roadPath) {
        if (d <= seg.len) {
          const p = seg.a.clone().lerp(seg.b, d / seg.len);
          car.obj.position.set(p.x, 0.1, p.y);
          car.obj.rotation.y = -Math.atan2(seg.b.y - seg.a.y, seg.b.x - seg.a.x);
          break;
        }
        d -= seg.len;
      }
    }
    const party = t - this.partyAt;
    for (const f of this.figures.values()) {
      if (party < 3.5) {
        // Hop with arms up; ghosts join in too, it's a sale.
        f.group.position.y = FLOOR_Y + Math.max(0, Math.sin(party * 9 + f.phase)) * 0.45 * (1 - party / 3.5);
        const torso = f.group.getObjectByName('torso');
        for (const arm of ['armL', 'armR']) {
          const a = torso?.getObjectByName(arm);
          if (!a) continue;
          if (a.userData.rest === undefined) a.userData.rest = a.rotation.x;
          a.rotation.x = -2.6 + Math.sin(party * 12 + f.phase) * 0.3;
        }
        continue;
      }
      if (f.group.position.y !== FLOOR_Y) {
        f.group.position.y = FLOOR_Y;
        const torso = f.group.getObjectByName('torso');
        for (const arm of ['armL', 'armR']) {
          const a = torso?.getObjectByName(arm);
          if (a && a.userData.rest !== undefined) {
            a.rotation.x = a.userData.rest;
            delete a.userData.rest;
          }
        }
      }
      if (f.info.state !== 'working') continue;
      const torso = f.group.getObjectByName('torso');
      const l = torso?.getObjectByName('armL');
      const r = torso?.getObjectByName('armR');
      const k = Math.sin(t * 10 + f.phase) * 0.12;
      if (l) l.rotation.x = -1.2 + k;
      if (r) r.rotation.x = -1.2 - k;
    }
  }

  private positionOverlays() {
    if (!this.overlay) return;
    const w = this.container.clientWidth, h = this.container.clientHeight;
    // When the office is small on screen, room labels shrink to icon and badge.
    this.overlay.classList.toggle('compact', h / (this.frustum / this.camera.zoom) < 9);
    const v = new THREE.Vector3();
    for (const el of this.overlay.querySelectorAll<HTMLElement>('[data-anchor]')) {
      const a = this.anchors.get(el.dataset.anchor!);
      if (!a) {
        el.style.display = 'none';
        continue;
      }
      v.copy(a).project(this.camera);
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-v.y * 0.5 + 0.5) * h;
      el.style.display = x < -80 || x > w + 80 || y < -40 || y > h + 40 ? 'none' : '';
      const shift = el.dataset.align === 'left' ? '-10px' : '-50%';
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(${shift}, -100%)`;
    }
  }
}
