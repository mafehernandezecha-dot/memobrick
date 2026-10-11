import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { buildMinifig } from './builder';
import { MinifigSpec } from './types';

let renderer: THREE.WebGLRenderer | null = null;
let envMap: THREE.Texture | null = null;

function getRenderer(size: number) {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const pmrem = new THREE.PMREMGenerator(renderer);
    envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  }
  renderer.setPixelRatio(1);
  renderer.setSize(size, size, false);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

/** Studio lighting shared by portraits and full-body renders so all 22 match. */
export function studioScene() {
  const scene = new THREE.Scene();
  scene.environment = envMap;
  scene.environmentIntensity = 0.55;
  const key = new THREE.DirectionalLight('#fff6e8', 2.4);
  key.position.set(-4, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 6;
  scene.add(key);
  const rim = new THREE.DirectionalLight('#dfe9ff', 1.1);
  rim.position.set(5, 4, -4);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight('#ffffff', '#c9b79a', 0.5));
  return scene;
}

function lighten(hex: string, amt: number) {
  const c = new THREE.Color(hex);
  c.lerp(new THREE.Color('#ffffff'), amt);
  return `#${c.getHexString()}`;
}

/** Square rounded-corner portrait: glossy colored tile with head and shoulders. */
export function renderPortrait(spec: MinifigSpec, size = 512): string {
  const r = getRenderer(size);
  const scene = studioScene();
  const fig = buildMinifig(spec);
  fig.rotation.y = -0.28;
  scene.add(fig);
  const cam = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
  cam.position.set(1.2, 3.4, 8.6);
  cam.lookAt(0, 2.62, 0);
  r.render(scene, cam);

  // Sticker-style tile: thick white rounded border around a solid color square.
  const out = document.createElement('canvas');
  out.width = out.height = size;
  const g = out.getContext('2d')!;
  const border = size * 0.045;
  const radius = size * 0.16;
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.roundRect(0, 0, size, size, radius);
  g.fill();
  g.save();
  g.beginPath();
  g.roundRect(border, border, size - border * 2, size - border * 2, radius - border * 0.6);
  g.clip();
  const grad = g.createRadialGradient(size * 0.5, size * 0.35, size * 0.1, size * 0.5, size * 0.5, size * 0.75);
  grad.addColorStop(0, lighten(spec.background, 0.12));
  grad.addColorStop(1, spec.background);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  g.drawImage(r.domElement, 0, 0, size, size);
  g.restore();
  disposeScene(scene);
  return out.toDataURL('image/png');
}

/** Full-body render on a transparent background, three-quarter view. */
export function renderFullBody(spec: MinifigSpec, size = 512): string {
  const r = getRenderer(size);
  const scene = studioScene();
  const fig = buildMinifig(spec);
  fig.rotation.y = -0.45;
  scene.add(fig);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(2.2, 48), new THREE.ShadowMaterial({ opacity: 0.22 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const cam = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
  cam.position.set(3.2, 4.2, 9.6);
  cam.lookAt(0, 1.95, 0);
  r.render(scene, cam);
  const url = r.domElement.toDataURL('image/png');
  disposeScene(scene);
  return url;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) m.geometry.dispose();
    const mat = m.material as THREE.MeshPhysicalMaterial | undefined;
    if (mat) {
      mat.map?.dispose();
      mat.dispose();
    }
  });
}
