import { FaceSpec, MinifigSpec, SKIN } from './types';

const INK = '#1f1a17';

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

/**
 * Face texture wrapped around the head cylinder. The face is centered at x = w/2,
 * which the head geometry maps to the front (+z).
 */
export function drawFace(face: FaceSpec): HTMLCanvasElement {
  // 4:1 so texture pixels are square on the head (circumference : straight height).
  const W = 2048, H = 512;
  const [c, g] = canvas(W, H);
  g.fillStyle = SKIN;
  g.fillRect(0, 0, W, H);
  const cx = W / 2, eyeY = 228, eyeDX = 62;
  // Features are drawn in a 1024-wide design space, scaled up around the face center.
  g.translate(cx, 312);
  g.scale(1.55, 1.2);
  g.translate(-cx, -290);
  g.lineCap = 'round';
  g.lineJoin = 'round';

  // Cheeks
  if (face.blush) {
    g.fillStyle = 'rgba(232,120,90,0.35)';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.ellipse(cx + s * 108, 300, 34, 20, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  if (face.freckles) {
    g.fillStyle = 'rgba(150,90,40,0.55)';
    for (const s of [-1, 1]) for (const [dx, dy] of [[90, 285], [110, 300], [125, 282], [100, 312]]) {
      g.beginPath();
      g.arc(cx + s * dx, dy, 4, 0, Math.PI * 2);
      g.fill();
    }
  }

  // Brows
  g.strokeStyle = INK;
  const browW = face.brows === 'thick' ? 13 : face.brows === 'arched' ? 8 : 7;
  g.lineWidth = browW;
  for (const s of [-1, 1]) {
    g.beginPath();
    if (face.brows === 'arched') {
      g.moveTo(cx + s * (eyeDX - 32), eyeY - 46);
      g.quadraticCurveTo(cx + s * eyeDX, eyeY - 72, cx + s * (eyeDX + 34), eyeY - 50);
    } else {
      g.moveTo(cx + s * (eyeDX - 30), eyeY - 50);
      g.lineTo(cx + s * (eyeDX + 30), eyeY - (face.smile === 'serious' ? 44 : 54));
    }
    g.stroke();
  }

  // Eyes: classic minifig dots with a white glint
  for (const s of [-1, 1]) {
    g.fillStyle = INK;
    g.beginPath();
    g.ellipse(cx + s * eyeDX, eyeY, 15, 19, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.arc(cx + s * eyeDX + 5, eyeY - 7, 5, 0, Math.PI * 2);
    g.fill();
    if (face.lashes) {
      g.strokeStyle = INK;
      g.lineWidth = 5;
      g.beginPath();
      g.moveTo(cx + s * (eyeDX + 14), eyeY - 12);
      g.lineTo(cx + s * (eyeDX + 28), eyeY - 22);
      g.stroke();
    }
  }

  // Glasses
  const glasses = face.glasses ?? 'none';
  if (glasses === 'bigRound') {
    g.strokeStyle = '#4a2c16';
    g.lineWidth = 14;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.arc(cx + s * eyeDX, eyeY + 4, 50, 0, Math.PI * 2);
      g.stroke();
    }
    g.beginPath();
    g.moveTo(cx - 14, eyeY - 4);
    g.lineTo(cx + 14, eyeY - 4);
    g.stroke();
    g.beginPath();
    g.moveTo(cx - eyeDX - 50, eyeY - 4);
    g.lineTo(cx - eyeDX - 150, eyeY - 18);
    g.moveTo(cx + eyeDX + 50, eyeY - 4);
    g.lineTo(cx + eyeDX + 150, eyeY - 18);
    g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.25)';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.arc(cx + s * eyeDX - 14, eyeY - 14, 12, 0, Math.PI * 2);
      g.fill();
    }
  } else if (glasses === 'small' || glasses === 'chain') {
    g.strokeStyle = glasses === 'chain' ? '#8a6a2a' : '#3b3b3b';
    g.lineWidth = 7;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.ellipse(cx + s * eyeDX, eyeY + 4, 34, 28, 0, 0, Math.PI * 2);
      g.stroke();
    }
    g.beginPath();
    g.moveTo(cx - 28, eyeY);
    g.lineTo(cx + 28, eyeY);
    g.stroke();
    if (glasses === 'chain') {
      g.lineWidth = 4;
      g.setLineDash([6, 8]);
      for (const s of [-1, 1]) {
        g.beginPath();
        g.moveTo(cx + s * (eyeDX + 34), eyeY + 8);
        g.quadraticCurveTo(cx + s * (eyeDX + 70), 420, cx + s * (eyeDX + 120), 500);
        g.stroke();
      }
      g.setLineDash([]);
    }
  } else if (glasses === 'rectangle') {
    g.strokeStyle = '#2a2a2a';
    g.lineWidth = 8;
    for (const s of [-1, 1]) g.strokeRect(cx + s * eyeDX - 36, eyeY - 22, 72, 50);
    g.beginPath();
    g.moveTo(cx - 26, eyeY);
    g.lineTo(cx + 26, eyeY);
    g.stroke();
  }

  // Mustache
  if (face.mustache) {
    g.fillStyle = '#3a2516';
    g.beginPath();
    g.moveTo(cx, 322);
    g.quadraticCurveTo(cx - 40, 304, cx - 74, 336);
    g.quadraticCurveTo(cx - 38, 334, cx, 342);
    g.quadraticCurveTo(cx + 38, 334, cx + 74, 336);
    g.quadraticCurveTo(cx + 40, 304, cx, 322);
    g.fill();
  }

  // Mouth
  const mouthY = 350;
  const smile = face.smile ?? 'soft';
  g.strokeStyle = INK;
  g.lineWidth = 9;
  if (face.braces) {
    g.fillStyle = INK;
    g.beginPath();
    g.moveTo(cx - 70, mouthY - 10);
    g.quadraticCurveTo(cx, mouthY + 70, cx + 70, mouthY - 10);
    g.closePath();
    g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.moveTo(cx - 60, mouthY - 4);
    g.quadraticCurveTo(cx, mouthY + 32, cx + 60, mouthY - 4);
    g.closePath();
    g.fill();
    g.strokeStyle = '#9aa3ad';
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(cx - 56, mouthY + 4);
    g.quadraticCurveTo(cx, mouthY + 26, cx + 56, mouthY + 4);
    g.stroke();
    g.fillStyle = '#9aa3ad';
    for (const dx of [-40, -20, 0, 20, 40]) g.fillRect(cx + dx - 4, mouthY + 8 + Math.abs(dx) * -0.12, 8, 8);
  } else if (smile === 'open' || smile === 'grin') {
    g.fillStyle = face.lipstick ?? INK;
    g.beginPath();
    g.moveTo(cx - 62, mouthY - 8);
    g.quadraticCurveTo(cx, mouthY + (smile === 'open' ? 70 : 56), cx + 62, mouthY - 8);
    g.closePath();
    g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath();
    g.moveTo(cx - 50, mouthY - 4);
    g.quadraticCurveTo(cx, mouthY + 18, cx + 50, mouthY - 4);
    g.closePath();
    g.fill();
  } else if (smile === 'smirk') {
    g.strokeStyle = face.lipstick ?? INK;
    g.beginPath();
    g.moveTo(cx - 44, mouthY + 6);
    g.quadraticCurveTo(cx + 10, mouthY + 22, cx + 56, mouthY - 10);
    g.stroke();
  } else if (smile === 'serious') {
    g.strokeStyle = face.lipstick ?? INK;
    g.beginPath();
    g.moveTo(cx - 38, mouthY + 10);
    g.quadraticCurveTo(cx, mouthY + 16, cx + 38, mouthY + 10);
    g.stroke();
  } else {
    g.strokeStyle = face.lipstick ?? INK;
    g.lineWidth = face.lipstick ? 13 : 9;
    g.beginPath();
    g.moveTo(cx - 52, mouthY);
    g.quadraticCurveTo(cx, mouthY + 40, cx + 52, mouthY);
    g.stroke();
  }

  if (face.wrinkles) {
    g.strokeStyle = 'rgba(120,80,20,0.6)';
    g.lineWidth = 4;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(cx + s * (eyeDX + 28), eyeY + 14);
      g.lineTo(cx + s * (eyeDX + 44), eyeY + 22);
      g.moveTo(cx + s * 62, 330);
      g.quadraticCurveTo(cx + s * 74, 352, cx + s * 66, 372);
      g.stroke();
    }
  }
  return c;
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

  switch (spec.torso) {
    case 'suit':
    case 'blazer': {
      vNeck(300, 120, shirt);
      if (spec.torso === 'suit') {
        g.fillStyle = accent;
        g.beginPath();
        g.moveTo(cx - 22, 14);
        g.lineTo(cx + 22, 14);
        g.lineTo(cx + 32, 230);
        g.lineTo(cx, 280);
        g.lineTo(cx - 32, 230);
        g.closePath();
        g.fill();
        g.fillRect(cx - 26, 0, 52, 30);
      }
      g.strokeStyle = 'rgba(0,0,0,0.35)';
      g.lineWidth = 8;
      g.beginPath();
      g.moveTo(cx - 120, 0);
      g.lineTo(cx - 40, 210);
      g.lineTo(cx - 70, 150);
      g.moveTo(cx + 120, 0);
      g.lineTo(cx + 40, 210);
      g.lineTo(cx + 70, 150);
      g.stroke();
      g.fillStyle = 'rgba(0,0,0,0.4)';
      for (const y of [330, 410]) {
        g.beginPath();
        g.arc(cx - 22, y, 9, 0, Math.PI * 2);
        g.fill();
      }
      g.fillStyle = spec.torso === 'blazer' ? accent : 'rgba(255,255,255,0.85)';
      g.fillRect(cx + 110, 220, 70, 12);
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
      if (spec.torso === 'blouse') {
        g.fillStyle = accent;
        for (const y of [150, 230, 310, 390]) {
          g.beginPath();
          g.arc(cx, y, 10, 0, Math.PI * 2);
          g.fill();
        }
      } else {
        g.fillStyle = accent;
        g.fillRect(0, 300, S, 26);
      }
      break;
    }
    case 'vest': {
      // Blouse with a big collar under a knitted vest, Betty style
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
      g.strokeStyle = 'rgba(0,0,0,0.12)';
      g.lineWidth = 3;
      for (let x = 20; x < S; x += 26) {
        g.beginPath();
        g.moveTo(x, 200);
        g.lineTo(x, S);
        g.stroke();
      }
      g.fillStyle = accent;
      g.beginPath();
      g.moveTo(cx - 110, 0);
      g.lineTo(cx - 10, 70);
      g.lineTo(cx - 60, 120);
      g.closePath();
      g.moveTo(cx + 110, 0);
      g.lineTo(cx + 10, 70);
      g.lineTo(cx + 60, 120);
      g.closePath();
      g.fill();
      g.fillStyle = '#7a5a3a';
      for (const y of [270, 340, 410]) {
        g.beginPath();
        g.arc(cx, y, 9, 0, Math.PI * 2);
        g.fill();
      }
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
      g.strokeRect(70, 330, 90, 70);
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
      g.fillStyle = 'rgba(255,255,255,0.55)';
      for (let i = 0; i < 14; i++) {
        g.beginPath();
        g.arc(cx + 10 + (i % 3) * 18, 130 + i * 14, 4, 0, Math.PI * 2);
        g.fill();
      }
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
      const bx = 120, by = 120;
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 16 : 34;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        g.lineTo(bx + Math.cos(a) * r, by + Math.sin(a) * r);
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
      g.fillStyle = '#ffffff';
      for (const y of [90, 140]) {
        g.beginPath();
        g.arc(cx, y, 7, 0, Math.PI * 2);
        g.fill();
      }
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
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = cx - 90 + t * 180;
      const y = 30 + Math.sin(t * Math.PI) * 90;
      g.beginPath();
      g.arc(x, y, 11, 0, Math.PI * 2);
      g.fill();
    }
  }
  return c;
}
