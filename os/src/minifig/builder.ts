import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { drawFace, drawTorso } from './prints';
import { Accessory, MinifigSpec, SKIN } from './types';

/**
 * One parametric LEGO-style minifigure. Units: the figure stands on y = 0 and is
 * about 4 units tall, facing +z. Named children ('head', 'armL', 'armR', 'torso')
 * are animated by the scene.
 */

const plastic = (color: string, opts: Partial<THREE.MeshPhysicalMaterialParameters> = {}) =>
  new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.32,
    metalness: 0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.18,
    ...opts,
  });

const texture = (c: HTMLCanvasElement) => {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Torso: trapezoid that narrows toward the shoulders, constant depth. */
function torsoGeometry(topW: number, botW: number, h: number, d: number) {
  const t = topW / 2, b = botW / 2, z = d / 2;
  const v = [
    [-b, 0, z], [b, 0, z], [t, h, z], [-t, h, z],
    [-b, 0, -z], [b, 0, -z], [t, h, -z], [-t, h, -z],
  ];
  const faces = [
    [0, 1, 2, 3], [5, 4, 7, 6], [4, 0, 3, 7], [1, 5, 6, 2], [3, 2, 6, 7], [4, 5, 1, 0],
  ];
  const pos: number[] = [];
  for (const [a, bb, c, dd] of faces) for (const i of [a, bb, c, a, c, dd]) pos.push(...v[i]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

/** Front print plane matching the torso's trapezoid front face. */
function torsoFront(topW: number, botW: number, h: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-botW / 2, 0);
  shape.lineTo(botW / 2, 0);
  shape.lineTo(topW / 2, h);
  shape.lineTo(-topW / 2, h);
  shape.closePath();
  const g = new THREE.ShapeGeometry(shape);
  const p = g.attributes.position;
  const uv: number[] = [];
  for (let i = 0; i < p.count; i++) uv.push((p.getX(i) + botW / 2) / botW, p.getY(i) / h);
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return g;
}

/** Rounded cylinder head as a lathe, front of the face at u = 0.5. */
function headGeometry(r: number, h: number) {
  const pts: THREE.Vector2[] = [];
  const bev = 0.1;
  pts.push(new THREE.Vector2(0, 0));
  for (let i = 0; i <= 6; i++) {
    const a = -Math.PI / 2 + (i / 6) * (Math.PI / 2);
    pts.push(new THREE.Vector2(r - bev + Math.cos(a) * bev, bev + Math.sin(a) * bev));
  }
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * (Math.PI / 2);
    pts.push(new THREE.Vector2(r - bev + Math.cos(a) * bev, h - bev + Math.sin(a) * bev));
  }
  pts.push(new THREE.Vector2(0, h));
  const g = new THREE.LatheGeometry(pts, 48, Math.PI, Math.PI * 2);
  // Remap v so the face texture spans the straight side only.
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setY(i, THREE.MathUtils.clamp((p.getY(i) - bev) / (h - 2 * bev), 0, 1));
  return g;
}

function hand(mat: THREE.Material) {
  const g = new THREE.Group();
  const claw = mesh(new THREE.TorusGeometry(0.15, 0.07, 12, 24, Math.PI * 1.55), mat);
  claw.rotation.set(Math.PI / 2, 0, Math.PI * 0.72);
  g.add(claw);
  const wrist = mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 12), mat, 0, 0.14, 0);
  g.add(wrist);
  return g;
}

function arm(spec: MinifigSpec, side: 1 | -1) {
  const sleeve = plastic(spec.sleeves === 'short' ? SKIN : spec.torsoColor);
  const skin = plastic(SKIN);
  const g = new THREE.Group();
  g.name = side === 1 ? 'armR' : 'armL';
  const shoulder = mesh(new THREE.SphereGeometry(0.22, 20, 16), plastic(spec.torsoColor));
  g.add(shoulder);
  const upper = mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.85, 20), sleeve, 0, -0.42, 0.04);
  upper.rotation.x = -0.12;
  g.add(upper);
  const h = hand(skin);
  h.position.set(0, -0.98, 0.16);
  h.rotation.x = -0.35;
  h.name = 'hand';
  g.add(h);
  g.position.set(side * 0.68, 2.55, 0);
  g.rotation.z = side * 0.12;
  return g;
}

function hair(spec: MinifigSpec): THREE.Group {
  const g = new THREE.Group();
  const m = plastic(spec.hairColor, { roughness: 0.38 });
  // Head straight side spans y 2.82..3.48 and its top is 3.58; brows sit near 3.3.
  const top = 3.58;
  void top;
  const R = 0.475;
  const rimY = 3.33;
  const cap = (scaleY = 1.08, r = R) => {
    const c = mesh(new THREE.SphereGeometry(r, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2), m, 0, rimY, -0.01);
    c.scale.set(1, scaleY, 1);
    return c;
  };
  const back = (yBottom: number, arc = Math.PI, r = R) => {
    const h = rimY + 0.02 - yBottom;
    const b = mesh(
      new THREE.CylinderGeometry(r, r + 0.02, h, 36, 1, true, Math.PI / 2, arc),
      m,
      0,
      yBottom + h / 2,
      -0.01,
    );
    (b.material as THREE.MeshPhysicalMaterial).side = THREE.DoubleSide;
    b.position.y = yBottom + h / 2;
    return b;
  };
  const bangs = () => {
    const b = mesh(new THREE.CylinderGeometry(R + 0.006, R + 0.006, 0.09, 36, 1, true, -Math.PI * 0.36, Math.PI * 0.72), m, 0, rimY - 0.02, 0);
    (b.material as THREE.MeshPhysicalMaterial).side = THREE.DoubleSide;
    return b;
  };

  switch (spec.hair) {
    case 'short':
      g.add(cap(), back(3.0));
      break;
    case 'slick': {
      const c = cap(1.1);
      g.add(c, back(3.05));
      break;
    }
    case 'ponytail': {
      g.add(cap(), back(3.05));
      const tie = mesh(new THREE.SphereGeometry(0.17, 16, 12), m, 0, rimY + 0.08, -0.48);
      const tail = mesh(new THREE.CapsuleGeometry(0.13, 0.62, 6, 14), m, 0, rimY - 0.38, -0.6);
      tail.rotation.x = 0.22;
      const band = mesh(new THREE.TorusGeometry(0.12, 0.04, 8, 16), plastic('#c0392b'), 0, rimY + 0.02, -0.54);
      g.add(tie, tail, band);
      break;
    }
    case 'long':
      g.add(cap(), back(2.45, Math.PI * 1.3, 0.49));
      break;
    case 'bob':
      g.add(cap(1.06, 0.49), back(2.85, Math.PI * 1.35, 0.49));
      break;
    case 'bun': {
      g.add(cap(1.02), back(3.1));
      const bun = mesh(new THREE.SphereGeometry(0.25, 20, 16), m, 0, rimY + 0.36, -0.3);
      g.add(bun);
      break;
    }
    case 'curly': {
      g.add(cap(1.1, 0.49), back(2.9, Math.PI * 1.25, 0.49));
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        const s = mesh(new THREE.SphereGeometry(0.16, 12, 10), m, Math.sin(a) * 0.45, rimY + 0.12 - (i % 2) * 0.12, Math.cos(a) * 0.45 - 0.03);
        if (Math.cos(a) > 0.55) continue;
        g.add(s);
      }
      break;
    }
    case 'voluminous': {
      const c = cap(1.12, 0.5);
      c.scale.set(1.16, 0.95, 1.12);
      g.add(c, back(2.5, Math.PI * 1.35, 0.56));
      break;
    }
    case 'receding': {
      const c = mesh(new THREE.CylinderGeometry(R + 0.01, R + 0.01, 0.42, 32, 1, true, Math.PI * 0.62, Math.PI * 0.76), m, 0, rimY - 0.12, 0);
      (c.material as THREE.MeshPhysicalMaterial).side = THREE.DoubleSide;
      g.add(c);
      break;
    }
    case 'guardcap':
    case 'messengercap': {
      const capColor = plastic(spec.accentColor);
      const crown = mesh(new THREE.CylinderGeometry(0.46, 0.49, 0.34, 32), capColor, 0, rimY + 0.2, 0);
      const brim = mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 24, 1, false, -Math.PI / 2, Math.PI), capColor, 0, rimY + 0.06, 0.36);
      brim.scale.set(1.15, 1, 0.9);
      g.add(crown, brim, back(3.05));
      if (spec.hair === 'guardcap') {
        const badge = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 12), plastic('#e8c547'), 0, rimY + 0.24, 0.47);
        badge.rotation.x = Math.PI / 2;
        g.add(badge);
      }
      break;
    }
  }
  if (spec.bangs) g.add(bangs());
  if (spec.face.glasses === 'sunglassesOnHead') {
    const glass = plastic('#1d1d1d');
    for (const s of [-1, 1]) {
      const lens = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.05, 16), glass, s * 0.17, rimY + 0.36, 0.24);
      lens.rotation.x = Math.PI / 2.6;
      g.add(lens);
    }
  }
  return g;
}

function accessory(kind: Accessory, color = '#d9534f'): THREE.Object3D | null {
  const g = new THREE.Group();
  const c = plastic(color);
  const white = plastic('#f7f7f2');
  const dark = plastic('#2b2f36');
  switch (kind) {
    case 'folder':
      g.add(mesh(new RoundedBoxGeometry(0.7, 0.9, 0.08, 2, 0.02), c));
      g.add(mesh(new THREE.BoxGeometry(0.62, 0.82, 0.04), white, 0.02, 0.01, 0.04));
      break;
    case 'laptop': {
      g.add(mesh(new RoundedBoxGeometry(0.9, 0.06, 0.6, 2, 0.02), plastic('#c9ccd2'), 0, 0, 0));
      const lid = mesh(new RoundedBoxGeometry(0.9, 0.6, 0.05, 2, 0.02), plastic('#c9ccd2'), 0, 0.3, -0.3);
      lid.rotation.x = -0.25;
      g.add(lid);
      g.add(mesh(new THREE.SphereGeometry(0.05, 10, 8), white, 0, 0.32, -0.36));
      break;
    }
    case 'tablet':
      g.add(mesh(new RoundedBoxGeometry(0.6, 0.8, 0.06, 2, 0.03), dark));
      g.add(mesh(new THREE.BoxGeometry(0.5, 0.68, 0.01), plastic('#7fb3e6', { emissive: '#3a6ea8', emissiveIntensity: 0.3 }), 0, 0, 0.035));
      break;
    case 'phone':
      g.add(mesh(new RoundedBoxGeometry(0.26, 0.48, 0.05, 2, 0.03), color === '#d9534f' ? dark : c));
      break;
    case 'envelope':
      g.add(mesh(new RoundedBoxGeometry(0.75, 0.5, 0.05, 2, 0.01), plastic('#f3e3b5')));
      g.add(mesh(new THREE.ConeGeometry(0.3, 0.24, 3), plastic('#e3cf95'), 0, 0.12, 0.03));
      break;
    case 'tarot':
      for (let i = 0; i < 3; i++) {
        const card = mesh(new RoundedBoxGeometry(0.34, 0.54, 0.03, 2, 0.02), plastic(['#6b3fa0', '#d4a017', '#2e86ab'][i]), (i - 1) * 0.16, 0, i * 0.02);
        card.rotation.z = (1 - i) * 0.3;
        g.add(card);
      }
      break;
    case 'tapemeasure':
      g.add(mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.16, 20), plastic('#f1c40f')));
      g.children[0].rotation.x = Math.PI / 2;
      g.add(mesh(new THREE.BoxGeometry(0.7, 0.08, 0.02), plastic('#f7e7a0'), 0.4, -0.16, 0));
      break;
    case 'sketchbook': {
      g.add(mesh(new RoundedBoxGeometry(0.8, 0.6, 0.06, 2, 0.02), c));
      g.add(mesh(new THREE.BoxGeometry(0.7, 0.5, 0.02), white, 0, 0, 0.035));
      const pencil = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8), plastic('#f4c430'), 0.2, 0.05, 0.08);
      pencil.rotation.z = 0.9;
      g.add(pencil);
      break;
    }
    case 'headset':
      return null; // drawn on the head instead
    case 'walkie':
      g.add(mesh(new RoundedBoxGeometry(0.24, 0.46, 0.14, 2, 0.04), dark));
      g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8), dark, 0.06, 0.35, 0));
      break;
    case 'briefcase':
      g.add(mesh(new RoundedBoxGeometry(0.8, 0.56, 0.22, 2, 0.04), c));
      g.add(mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 16, Math.PI), c, 0, 0.28, 0));
      break;
    case 'calculator':
      g.add(mesh(new RoundedBoxGeometry(0.42, 0.6, 0.07, 2, 0.03), dark));
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++)
        g.add(mesh(new THREE.BoxGeometry(0.08, 0.06, 0.02), white, -0.12 + k * 0.12, -0.12 - r * 0.1, 0.04));
      g.add(mesh(new THREE.BoxGeometry(0.32, 0.12, 0.02), plastic('#9ccc65'), 0, 0.17, 0.04));
      break;
    case 'clipboard':
      g.add(mesh(new RoundedBoxGeometry(0.62, 0.84, 0.05, 2, 0.02), plastic('#a0703c')));
      g.add(mesh(new THREE.BoxGeometry(0.52, 0.66, 0.02), white, 0, -0.04, 0.03));
      g.add(mesh(new THREE.BoxGeometry(0.24, 0.08, 0.06), plastic('#b0b5bb'), 0, 0.36, 0.03));
      break;
    case 'coffee':
      g.add(mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.36, 18), white));
      g.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 18), c, 0, 0.16, 0));
      break;
    case 'magnifier':
      g.add(mesh(new THREE.TorusGeometry(0.2, 0.05, 10, 24), dark));
      g.add(mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 20), plastic('#bfe3ff', { transparent: true, opacity: 0.5 })));
      g.children[1].rotation.x = Math.PI / 2;
      g.add(mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 10), c, 0, -0.38, 0));
      break;
    case 'shoppingbag':
      g.add(mesh(new RoundedBoxGeometry(0.6, 0.6, 0.26, 2, 0.03), c));
      g.add(mesh(new THREE.TorusGeometry(0.14, 0.025, 8, 16, Math.PI), dark, 0, 0.3, 0));
      break;
    case 'star': {
      const s = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 0.14 : 0.32;
        const a = Math.PI / 2 + (i * Math.PI) / 5;
        if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      g.add(mesh(new THREE.ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 }), plastic('#f5c518')));
      break;
    }
    case 'parcel':
      g.add(mesh(new RoundedBoxGeometry(0.7, 0.5, 0.5, 2, 0.03), plastic('#c8955a')));
      g.add(mesh(new THREE.BoxGeometry(0.72, 0.08, 0.52), plastic('#e8d6b0')));
      break;
    case 'scanner':
      g.add(mesh(new RoundedBoxGeometry(0.26, 0.5, 0.2, 2, 0.05), dark));
      g.add(mesh(new RoundedBoxGeometry(0.4, 0.22, 0.24, 2, 0.05), plastic('#f39c12'), 0, 0.3, 0.06));
      break;
    case 'pen': {
      const p = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 10), c);
      p.rotation.z = 0.5;
      g.add(p);
      g.add(mesh(new RoundedBoxGeometry(0.56, 0.72, 0.05, 2, 0.02), white, -0.32, -0.1, -0.06));
      break;
    }
    case 'none':
      return null;
  }
  return g;
}

export function buildMinifig(spec: MinifigSpec): THREE.Group {
  const fig = new THREE.Group();
  const skin = plastic(SKIN);
  const legsMat = plastic(spec.legsColor);
  const shoes = plastic(spec.shoesColor ?? spec.legsColor);

  // Legs and hips
  const legs = new THREE.Group();
  legs.name = 'legs';
  if (spec.skirt) {
    const skirt = mesh(new THREE.CylinderGeometry(0.62, 0.86, 1.25, 4, 1), legsMat, 0, 0.62, 0);
    skirt.rotation.y = Math.PI / 4;
    skirt.scale.set(1.15, 1, 0.66);
    legs.add(skirt);
    for (const s of [-1, 1]) legs.add(mesh(new RoundedBoxGeometry(0.6, 0.14, 0.86, 2, 0.05), shoes, s * 0.38, 0.07, 0.04));
  } else {
    for (const s of [-1, 1]) {
      legs.add(mesh(new RoundedBoxGeometry(0.76, 1.05, 0.78, 3, 0.07), legsMat, s * 0.395, 0.58, -0.02));
      legs.add(mesh(new RoundedBoxGeometry(0.76, 0.2, 0.92, 3, 0.07), shoes, s * 0.395, 0.1, 0.05));
    }
  }
  legs.add(mesh(new RoundedBoxGeometry(1.6, 0.3, 0.8, 3, 0.06), legsMat, 0, 1.25, 0));
  fig.add(legs);

  // Torso with printed front
  const torso = new THREE.Group();
  torso.name = 'torso';
  const topW = 1.18, botW = 1.6, h = 1.2, d = 0.8;
  const body = mesh(torsoGeometry(topW, botW, h, d), plastic(spec.torsoColor));
  body.position.y = 1.4;
  torso.add(body);
  const front = mesh(
    torsoFront(topW, botW, h),
    plastic('#ffffff', { map: texture(drawTorso(spec)) }),
    0,
    1.4,
    d / 2 + 0.002,
  );
  torso.add(front);
  torso.add(mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.12, 20), skin, 0, 2.66, 0));
  torso.add(arm(spec, -1), arm(spec, 1));
  fig.add(torso);

  // Head
  const head = new THREE.Group();
  head.name = 'head';
  const headMat = plastic('#ffffff', { map: texture(drawFace(spec.face)) });
  const headMesh = mesh(headGeometry(0.44, 0.86), headMat, 0, 2.72, 0);
  head.add(headMesh);
  // The top stud is hidden under hair pieces; only a receding hairline shows it.
  if (spec.hair === 'receding') head.add(mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.16, 24), skin, 0, 3.66, 0));
  head.add(hair(spec));
  if (spec.accessory === 'headset') {
    const band = mesh(new THREE.TorusGeometry(0.52, 0.04, 8, 32, Math.PI), plastic('#2b2f36'), 0, 3.25, 0);
    band.rotation.y = Math.PI / 2;
    const mic = mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), plastic('#2b2f36'), 0.36, 3.0, 0.3);
    mic.rotation.set(0, 0, 1.2);
    const pad = mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 16), plastic('#2b2f36'), 0.47, 3.15, 0);
    pad.rotation.z = Math.PI / 2;
    head.add(band, mic, pad);
  }
  fig.add(head);

  // Prop held in the right hand
  const prop = accessory(spec.accessory, spec.accessoryColor);
  if (prop) {
    prop.name = 'prop';
    const armR = torso.getObjectByName('armR')!;
    prop.position.set(0.06, -1.15, 0.42);
    prop.rotation.y = -0.3;
    armR.add(prop);
    armR.rotation.x = -0.55;
  }
  return fig;
}
