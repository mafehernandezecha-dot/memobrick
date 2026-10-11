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
  fig.rotation.y = -0.32;
  scene.add(fig);
  const cam = new THREE.PerspectiveCamera(19, 1, 0.1, 100);
  cam.position.set(1.15, 3.35, 6.4);
  cam.lookAt(0, 2.98, 0);
  r.render(scene, cam);

  const out = document.createElement('canvas');
  out.width = out.height = size;
  const g = out.getContext('2d')!;
  const radius = size * 0.2;
  g.save();
  g.beginPath();
  g.roundRect(0, 0, size, size, radius);
  g.clip();
  const grad = g.createLinearGradient(0, 0, 0, size);
  grad.addColorStop(0, lighten(spec.background, 0.28));
  grad.addColorStop(1, spec.background);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  // Soft floor glow behind the figure
  const glow = g.createRadialGradient(size / 2, size * 0.55, size * 0.05, size / 2, size * 0.55, size * 0.6);
  glow.addColorStop(0, 'rgba(255,255,255,0.35)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);
  g.drawImage(r.domElement, 0, 0, size, size);
  // Glossy top highlight
  const gloss = g.createLinearGradient(0, 0, 0, size * 0.45);
  gloss.addColorStop(0, 'rgba(255,255,255,0.28)');
  gloss.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gloss;
  g.beginPath();
  g.ellipse(size / 2, size * 0.05, size * 0.62, size * 0.32, 0, 0, Math.PI * 2);
  g.fill();
  g.restore();
  g.strokeStyle = 'rgba(255,255,255,0.6)';
  g.lineWidth = size * 0.008;
  g.beginPath();
  g.roundRect(size * 0.004, size * 0.004, size * 0.992, size * 0.992, radius);
  g.stroke();
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
