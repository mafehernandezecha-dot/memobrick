import { FaceSpec, MinifigSpec, SKIN } from './types';

const INK = '#1c1714';

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

/**
 * Face texture wrapped around the head cylinder (4:1 so pixels are square on the
 * head). The face is centered at x = W/2, which the head maps to the front.
 * Features are drawn in a 1024-wide design space and scaled around the face.
 */
export function drawFace(face: FaceSpec, skin: string = SKIN): HTMLCanvasElement {
  const W = 2048, H = 512;
  const [c, g] = canvas(W, H);
  g.fillStyle = skin;
  g.fillRect(0, 0, W, H);
  const cx = W / 2;
  // Centered lower on the head so hair fringes never cover the eyes.
  g.translate(cx, 334);
  g.scale(1.75, 1.3);
  g.translate(-cx, -300);
  const eyeY = 236, eyeDX = 60;
  g.lineCap = 'round';
  g.lineJoin = 'round';

  // Soft contour so the face reads as sculpted.
  const contour = g.createRadialGradient(cx, 300, 60, cx, 300, 220);
  contour.addColorStop(0, 'rgba(255,255,255,0)');
  contour.addColorStop(1, 'rgba(160,90,10,0.12)');
  g.fillStyle = contour;
  g.fillRect(cx - 260, 60, 520, 440);

  if (face.stubble) {
    g.fillStyle = 'rgba(70,45,25,0.16)';
    g.beginPath();
    g.ellipse(cx, 380, 120, 78, 0, 0, Math.PI);
    g.fill();
  }
  if (face.blush) {
    g.fillStyle = 'rgba(235,110,80,0.28)';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.ellipse(cx + s * 100, 312, 30, 17, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  if (face.eyeshadow) {
    g.fillStyle = face.eyeshadow;
    g.globalAlpha = 0.5;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.ellipse(cx + s * eyeDX, eyeY - 14, 30, 17, 0, Math.PI, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
  }

  // Eyes: white almond, dark iris, highlight; lash line for feminine prints.
  for (const s of [-1, 1]) {
    const ex = cx + s * eyeDX;
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.ellipse(ex, eyeY, 24, 16, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#3b2414';
    g.beginPath();
    g.arc(ex + s, eyeY + 1, 13, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = INK;
    g.beginPath();
    g.arc(ex + s, eyeY + 1, 7, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.arc(ex + 5, eyeY - 5, 4, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = INK;
    g.lineWidth = face.lashes ? 6 : 4;
    g.beginPath();
    g.moveTo(ex - s * 26, eyeY + 2);
    g.quadraticCurveTo(ex, eyeY - 24, ex + s * 26, eyeY - 4);
    if (face.lashes) g.lineTo(ex + s * 36, eyeY - 14);
    g.stroke();
    if (face.lashes) {
      g.lineWidth = 2.5;
      g.beginPath();
      g.moveTo(ex - s * 20, eyeY + 12);
      g.quadraticCurveTo(ex, eyeY + 20, ex + s * 22, eyeY + 10);
      g.stroke();
    }
  }

  // Brows: tapered shapes
  const brow = face.brows ?? 'thin';
  g.fillStyle = INK;
  for (const s of [-1, 1]) {
    const ex = cx + s * eyeDX;
    const thick = brow === 'thick' || brow === 'determined' ? 10 : brow === 'arched' ? 6 : 5;
    const inner = brow === 'determined' ? eyeY - 30 : eyeY - 40;
    const peak = brow === 'arched' ? eyeY - 58 : eyeY - 46;
    g.beginPath();
    g.moveTo(ex - s * 30, inner);
    g.quadraticCurveTo(ex + s * 2, peak - thick, ex + s * 34, eyeY - 38);
    g.quadraticCurveTo(ex + s * 2, peak + thick * 0.4, ex - s * 30, inner + thick);
    g.closePath();
    g.fill();
  }

  // Nose and cheek lines
  g.strokeStyle = 'rgba(120,60,10,0.55)';
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(cx - 8, 300);
  g.quadraticCurveTo(cx, 310, cx + 10, 300);
  g.stroke();
  if (face.smile === 'grin' || face.smile === 'open' || face.smile === 'smirk') {
    for (const s of face.smile === 'smirk' ? [1] : [-1, 1]) {
      g.beginPath();
      g.moveTo(cx + s * 72, 318);
      g.quadraticCurveTo(cx + s * 82, 342, cx + s * 72, 360);
      g.stroke();
    }
  }

  if (face.mustache) {
    g.fillStyle = '#3a2516';
    g.beginPath();
    g.moveTo(cx, 326);
    g.quadraticCurveTo(cx - 40, 308, cx - 70, 338);
    g.quadraticCurveTo(cx - 36, 334, cx, 344);
    g.quadraticCurveTo(cx + 36, 334, cx + 70, 338);
    g.quadraticCurveTo(cx + 40, 308, cx, 326);
    g.fill();
  }
  if (face.goatee) {
    g.fillStyle = '#2a1a10';
    g.beginPath();
    g.ellipse(cx, 418, 22, 20, 0, 0, Math.PI * 2);
    g.fill();
  }

  // Mouth
  const mouthY = 356;
  const smile = face.smile ?? 'soft';
  const lip = face.lipstick;
  if (face.braces || smile === 'grin' || smile === 'open') {
    const open = smile === 'open' ? 56 : 44;
    g.fillStyle = lip ?? '#7a1f1f';
    g.beginPath();
    g.moveTo(cx - 58, mouthY - 6);
    g.quadraticCurveTo(cx, mouthY + open + 10, cx + 58, mouthY - 6);
    g.quadraticCurveTo(cx, mouthY + 4, cx - 58, mouthY - 6);
    g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.moveTo(cx - 48, mouthY - 2);
    g.quadraticCurveTo(cx, mouthY + open * 0.55, cx + 48, mouthY - 2);
    g.quadraticCurveTo(cx, mouthY + 6, cx - 48, mouthY - 2);
    g.fill();
    if (face.braces) {
      g.strokeStyle = '#8f99a3';
      g.lineWidth = 4;
      g.beginPath();
      g.moveTo(cx - 44, mouthY + 6);
      g.quadraticCurveTo(cx, mouthY + 22, cx + 44, mouthY + 6);
      g.stroke();
      g.fillStyle = '#8f99a3';
      for (const dx of [-32, -16, 0, 16, 32]) g.fillRect(cx + dx - 3.5, mouthY + 8 + (32 - Math.abs(dx)) * 0.18, 7, 7);
    }
  } else if (smile === 'smirk') {
    if (lip) {
      g.fillStyle = lip;
      g.beginPath();
      g.moveTo(cx - 40, mouthY + 6);
      g.quadraticCurveTo(cx, mouthY - 6, cx + 46, mouthY - 8);
      g.quadraticCurveTo(cx + 6, mouthY + 24, cx - 40, mouthY + 6);
      g.fill();
    } else {
      g.strokeStyle = INK;
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(cx - 36, mouthY + 8);
      g.quadraticCurveTo(cx + 8, mouthY + 18, cx + 46, mouthY - 6);
      g.stroke();
    }
  } else {
    const curve = smile === 'serious' ? 6 : 20;
    if (lip) {
      g.fillStyle = lip;
      g.beginPath();
      g.moveTo(cx - 42, mouthY);
      g.quadraticCurveTo(cx, mouthY - 10, cx + 42, mouthY);
      g.quadraticCurveTo(cx, mouthY + curve + 12, cx - 42, mouthY);
      g.fill();
      g.fillStyle = 'rgba(255,255,255,0.35)';
      g.beginPath();
      g.ellipse(cx + 8, mouthY + 6, 10, 3, 0, 0, Math.PI * 2);
      g.fill();
    } else {
      g.strokeStyle = INK;
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(cx - 40, mouthY);
      g.quadraticCurveTo(cx, mouthY + curve, cx + 40, mouthY);
      g.stroke();
    }
  }

  if (face.wrinkles) {
    g.strokeStyle = 'rgba(130,70,10,0.5)';
    g.lineWidth = 3;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(cx + s * (eyeDX + 30), eyeY + 6);
      g.lineTo(cx + s * (eyeDX + 44), eyeY + 14);
      g.stroke();
    }
    g.beginPath();
    g.moveTo(cx - 40, eyeY - 74);
    g.lineTo(cx + 40, eyeY - 74);
    g.stroke();
  }
  return c;
}

/** Strand texture for sculpted hair: returns [color map, bump map]. */
export function drawHairTexture(color: string): [HTMLCanvasElement, HTMLCanvasElement] {
  const S = 512;
  const [c, g] = canvas(S, S);
  const [b, gb] = canvas(S, S);
  g.fillStyle = color;
  g.fillRect(0, 0, S, S);
  gb.fillStyle = '#808080';
  gb.fillRect(0, 0, S, S);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 260; i++) {
    const x = rand() * S;
    const w = 2 + rand() * 6;
    const bend = (rand() - 0.5) * 40;
    const light = rand() > 0.5;
    g.strokeStyle = light ? shade(color, 0.08) : shade(color, -0.1);
    gb.strokeStyle = light ? '#b0b0b0' : '#404040';
    for (const ctx of [g, gb]) {
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + bend, S * 0.33, x - bend, S * 0.66, x + bend * 0.5, S);
      ctx.stroke();
    }
  }
  return [c, b];
}

/** Front torso print, drawn on a square canvas mapped onto the trapezoid front face. */
export function drawTorso(spec: MinifigSpec): HTMLCanvasElement {
  const S = 512;
  const [c, g] = canvas(S, S);
  g.fillStyle = spec.torsoColor;
  g.fillRect(0, 0, S, S);
  const cx = S / 2;
  const accent = spec.accentColor;
  const shirt = spec.shirtColor ?? '#f4f1ea';
  g.lineJoin = 'round';
  g.lineCap = 'round';

  const vNeck = (depth: number, width: number, fill: string) => {
    g.fillStyle = fill;
    g.beginPath();
    g.moveTo(cx - width, 0);
    g.lineTo(cx, depth);
    g.lineTo(cx + width, 0);
    g.closePath();
    g.fill();
  };
  const lapels = (depth: number, width: number) => {
    g.strokeStyle = 'rgba(0,0,0,0.38)';
    g.lineWidth = 7;
    g.beginPath();
    g.moveTo(cx - width, 0);
    g.lineTo(cx - 30, depth);
    g.lineTo(cx - 62, depth * 0.62);
    g.moveTo(cx + width, 0);
    g.lineTo(cx + 30, depth);
    g.lineTo(cx + 62, depth * 0.62);
    g.stroke();
  };
  const leopard = (x0: number, y0: number, w: number, h: number) => {
    g.save();
    g.beginPath();
    g.rect(x0, y0, w, h);
    g.clip();
    g.fillStyle = '#e8c48a';
    g.fillRect(x0, y0, w, h);
    let seed = 3;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 70; i++) {
      const x = x0 + rand() * w, y = y0 + rand() * h, r = 7 + rand() * 7;
      g.lineWidth = 5;
      g.strokeStyle = '#3a2410';
      g.beginPath();
      g.arc(x, y, r, 0.3, Math.PI * 1.7);
      g.stroke();
      g.fillStyle = '#a8743a';
      g.beginPath();
      g.arc(x, y, r * 0.5, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
  };

  switch (spec.torso) {
    case 'suit':
    case 'blazer': {
      vNeck(300, 118, shirt);
      if (spec.torso === 'suit') {
        g.fillStyle = accent;
        g.beginPath();
        g.moveTo(cx - 20, 18);
        g.lineTo(cx + 20, 18);
        g.lineTo(cx + 30, 236);
        g.lineTo(cx, 286);
        g.lineTo(cx - 30, 236);
        g.closePath();
        g.fill();
        g.beginPath();
        g.moveTo(cx - 28, 0);
        g.lineTo(cx + 28, 0);
        g.lineTo(cx + 18, 34);
        g.lineTo(cx - 18, 34);
        g.closePath();
        g.fill();
      }
      lapels(220, 118);
      g.fillStyle = 'rgba(0,0,0,0.4)';
      for (const y of [340, 420]) {
        g.beginPath();
        g.arc(cx - 20, y, 8, 0, Math.PI * 2);
        g.fill();
      }
      g.strokeStyle = 'rgba(0,0,0,0.3)';
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(cx + 110, 250);
      g.lineTo(cx + 190, 250);
      g.stroke();
      if (spec.pocketSquare) {
        g.fillStyle = '#ffffff';
        g.beginPath();
        g.moveTo(cx + 120, 250);
        g.lineTo(cx + 140, 222);
        g.lineTo(cx + 158, 240);
        g.lineTo(cx + 178, 220);
        g.lineTo(cx + 184, 250);
        g.closePath();
        g.fill();
      }
      break;
    }
    case 'turtleneckBlazer': {
      vNeck(330, 112, shirt);
      g.fillStyle = shade(shirt, -0.08);
      g.fillRect(cx - 80, 0, 160, 40);
      lapels(240, 112);
      break;
    }
    case 'leopardJacket': {
      leopard(cx - 110, 0, 220, S);
      g.fillStyle = spec.torsoColor;
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(cx - 100, 0);
      g.lineTo(cx - 70, S);
      g.lineTo(0, S);
      g.closePath();
      g.moveTo(S, 0);
      g.lineTo(cx + 100, 0);
      g.lineTo(cx + 70, S);
      g.lineTo(S, S);
      g.closePath();
      g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.3)';
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(cx - 100, 0);
      g.lineTo(cx - 70, S);
      g.moveTo(cx + 100, 0);
      g.lineTo(cx + 70, S);
      g.stroke();
      break;
    }
    case 'bowBlouseJacket': {
      vNeck(320, 110, shirt);
      g.fillStyle = shade(shirt, -0.06);
      g.beginPath();
      g.ellipse(cx - 34, 60, 34, 20, -0.4, 0, Math.PI * 2);
      g.ellipse(cx + 34, 60, 34, 20, 0.4, 0, Math.PI * 2);
      g.fill();
      g.fillRect(cx - 14, 60, 12, 120);
      g.fillRect(cx + 4, 60, 12, 110);
      lapels(240, 110);
      break;
    }
    case 'blouse':
    case 'dress': {
      g.fillStyle = accent;
      g.beginPath();
      g.moveTo(cx - 95, 0);
      g.quadraticCurveTo(cx - 60, 80, cx, 90);
      g.quadraticCurveTo(cx + 60, 80, cx + 95, 0);
      g.closePath();
      g.fill();
      g.fillStyle = spec.torsoColor;
      g.beginPath();
      g.moveTo(cx - 60, 0);
      g.quadraticCurveTo(cx, 70, cx + 60, 0);
      g.fill();
      g.fillStyle = accent;
      if (spec.torso === 'blouse') {
        for (const y of [150, 230, 310, 390]) {
          g.beginPath();
          g.arc(cx, y, 9, 0, Math.PI * 2);
          g.fill();
        }
      } else g.fillRect(0, 300, S, 24);
      break;
    }
    case 'vest': {
      g.fillStyle = shirt;
      g.fillRect(0, 0, S, S);
      g.fillStyle = spec.torsoColor;
      g.beginPath();
      g.moveTo(40, 0);
      g.lineTo(cx - 70, 0);
      g.lineTo(cx, 220);
      g.lineTo(cx + 70, 0);
      g.lineTo(S - 40, 0);
      g.lineTo(S, S);
      g.lineTo(0, S);
      g.closePath();
      g.fill();
      g.fillStyle = accent;
      g.fillRect(cx - 10, 0, 20, 200);
      break;
    }
    case 'cardigan': {
      vNeck(240, 90, shirt);
      g.strokeStyle = accent;
      g.lineWidth = 16;
      g.beginPath();
      g.moveTo(cx - 90, 0);
      g.lineTo(cx - 8, 240);
      g.lineTo(cx - 8, S);
      g.moveTo(cx + 90, 0);
      g.lineTo(cx + 8, 240);
      g.lineTo(cx + 8, S);
      g.stroke();
      g.fillStyle = accent;
      for (const y of [300, 370, 440]) {
        g.beginPath();
        g.arc(cx - 30, y, 9, 0, Math.PI * 2);
        g.fill();
      }
      break;
    }
    case 'designer': {
      vNeck(200, 80, shirt);
      g.fillStyle = accent;
      g.beginPath();
      g.moveTo(cx - 110, 0);
      g.quadraticCurveTo(cx, 120, cx + 110, 0);
      g.lineTo(cx + 80, 0);
      g.quadraticCurveTo(cx, 80, cx - 80, 0);
      g.closePath();
      g.fill();
      g.beginPath();
      g.moveTo(cx + 20, 90);
      g.lineTo(cx + 70, 330);
      g.lineTo(cx + 20, 320);
      g.lineTo(cx - 10, 100);
      g.closePath();
      g.fill();
      break;
    }
    case 'argyle': {
      vNeck(150, 90, shirt);
      g.save();
      g.beginPath();
      g.rect(0, 0, S, S);
      g.moveTo(cx - 90, 0);
      g.lineTo(cx, 150);
      g.lineTo(cx + 90, 0);
      g.clip('evenodd');
      g.fillStyle = accent;
      for (let y = 140; y < S + 80; y += 120) for (let x = 0; x < S + 80; x += 120) {
        g.beginPath();
        g.moveTo(x, y - 60);
        g.lineTo(x + 50, y);
        g.lineTo(x, y + 60);
        g.lineTo(x - 50, y);
        g.closePath();
        g.fill();
      }
      g.restore();
      g.fillStyle = '#d64545';
      g.beginPath();
      g.moveTo(cx, 40);
      g.lineTo(cx - 48, 16);
      g.lineTo(cx - 48, 64);
      g.closePath();
      g.moveTo(cx, 40);
      g.lineTo(cx + 48, 16);
      g.lineTo(cx + 48, 64);
      g.closePath();
      g.fill();
      break;
    }
    case 'patterned': {
      g.fillStyle = accent;
      for (let y = 0; y < S; y += 70) for (let x = (y / 70) % 2 ? 35 : 0; x < S; x += 70) {
        g.beginPath();
        g.ellipse(x, y, 22, 12, Math.PI / 4, 0, Math.PI * 2);
        g.fill();
      }
      vNeck(200, 120, shirt);
      vNeck(150, 70, spec.torsoColor);
      break;
    }
    case 'uniform': {
      g.fillStyle = accent;
      g.beginPath();
      g.moveTo(cx - 80, 0);
      g.lineTo(cx, 70);
      g.lineTo(cx + 80, 0);
      g.closePath();
      g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.35)';
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(cx, 70);
      g.lineTo(cx, S);
      g.stroke();
      g.strokeRect(70, 150, 100, 80);
      g.strokeRect(S - 170, 150, 100, 80);
      g.fillStyle = '#e8c547';
      g.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 16 : 34;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        g.lineTo(120 + Math.cos(a) * r, 120 + Math.sin(a) * r);
      }
      g.closePath();
      g.fill();
      break;
    }
    case 'polo': {
      g.fillStyle = accent;
      g.beginPath();
      g.moveTo(cx - 90, 0);
      g.lineTo(cx - 20, 60);
      g.lineTo(cx - 60, 90);
      g.closePath();
      g.moveTo(cx + 90, 0);
      g.lineTo(cx + 20, 60);
      g.lineTo(cx + 60, 90);
      g.closePath();
      g.fill();
      g.fillRect(cx - 10, 50, 20, 120);
      break;
    }
    case 'tshirt': {
      g.fillStyle = accent;
      g.beginPath();
      g.arc(cx, -10, 70, 0, Math.PI);
      g.fill();
      g.fillStyle = spec.torsoColor;
      g.beginPath();
      g.arc(cx, -10, 56, 0, Math.PI);
      g.fill();
      g.fillStyle = accent;
      g.beginPath();
      g.roundRect(cx - 80, 200, 160, 110, 24);
      g.fill();
      break;
    }
  }

  if (spec.necklace === 'pearls' || spec.necklace === 'gold') {
    g.fillStyle = spec.necklace === 'pearls' ? '#fbf7ee' : '#d8b04a';
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      g.beginPath();
      g.arc(cx - 86 + t * 172, 26 + Math.sin(t * Math.PI) * 80, 10, 0, Math.PI * 2);
      g.fill();
    }
  } else if (spec.necklace === 'pendant') {
    g.strokeStyle = '#d8b04a';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(cx - 40, 40);
    g.quadraticCurveTo(cx, 130, cx + 40, 40);
    g.stroke();
    g.fillStyle = '#d8b04a';
    g.beginPath();
    g.arc(cx, 112, 7, 0, Math.PI * 2);
    g.fill();
  }
  // Fabric shading so the torso does not look flat
  const fold = g.createLinearGradient(0, 0, S, 0);
  fold.addColorStop(0, 'rgba(0,0,0,0.10)');
  fold.addColorStop(0.5, 'rgba(255,255,255,0.04)');
  fold.addColorStop(1, 'rgba(0,0,0,0.10)');
  g.fillStyle = fold;
  g.fillRect(0, 0, S, S);
  return c;
}
