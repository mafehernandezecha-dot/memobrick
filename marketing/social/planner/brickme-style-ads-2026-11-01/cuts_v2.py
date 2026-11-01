#!/usr/bin/env python3
"""v2 rough cuts for the Brick Me style ads (2026-11-01), after Eden: "the ad is boring". Local review only.

What changed from v1: the payoff or a face in frame 1 with a big hook, cuts on the beat of an upbeat
original track (112 bpm, 0.54 s per beat, cuts every 1 to 2 beats), punch-in zooms, white flashes
between photo and bricks, big caption cards that change every cut, the fill timelapse sped up to
about 2.7 s mid-ad, and a bright 1.5 s end card.

Rules kept:
- No frame interpolation. Speed-ups drop frames; a held moment repeats one real frame.
- No warping. A zoom crops a smaller box with the output's own shape and scales it evenly.
- Real product only: real footage of built kits, plus MemoBrick Studio exports of a real photo
  (the couple's selfie, made on 2026-10-28, settings in sprint-2026-10-29/S-20261030-2-v3.md).
- Same cleared footage as v1 (see cuts.py for the Drive IDs). Old captions in the committed reels sit
  in a band at y 240 to 440 of the 9:16 frame: 4:5 crops start below it, and in 9:16 an opaque
  caption card covers it.

Usage: python3 cuts_v2.py <path to 5e8c35f05ec14e9a833219ddf20a1784.MOV> <out dir>
"""
import os, sys, subprocess, shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
SPR = os.path.join(REPO, 'marketing/social/planner/sprint-2026-10-29')
COUPLE = os.path.join(SPR, 'S-20261030-2-v3.mp4')
PET = os.path.join(SPR, 'S-20261029-2-v3.mp4')
SELFIE = os.path.join(SPR, 'S-20261030-2-v3-photo.jpg')
STUDIO30 = os.path.join(SPR, 'S-20261030-2-v3-studio-30x30.png')
MUSIC = os.path.join(REPO, 'marketing/social/publisher/music/add-music.sh')
FB = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
FPS = 30
BEAT = 60 / 112                       # playful mood tempo in compose.py
INK = (24, 24, 24)
CREAM = (251, 246, 238)
CORAL = (232, 76, 61)


def font(px):
    return ImageFont.truetype(FB, px)


# ---------- sources ----------

def video(src, ss, n, crop, size, speed=1.0):
    """n output frames from src starting at ss. crop=(w,h,x,y) in source pixels, same shape as size."""
    w, h, x, y = crop
    assert abs(w * size[1] - h * size[0]) <= max(size) * 2, ('crop shape', crop, size)
    vf = f'crop={w}:{h}:{x}:{y},scale={size[0]}:{size[1]}:flags=lanczos'
    if speed != 1:
        vf += f',setpts=PTS/{speed}'
    vf += f',fps={FPS}'
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(ss), '-t', str(n / FPS * speed + 0.5), '-i', src,
                          '-vf', vf, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
                         check=True, capture_output=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, size[1], size[0], 3)
    frames = [Image.fromarray(f) for f in fr[:n]]
    while len(frames) < n:                # hold the last real frame (no invented frames)
        frames.append(frames[-1])
    return frames


def still(path, n, size, box=None):
    """A real still, cover-fitted to size with an even scale (box = optional crop in source pixels)."""
    im = Image.open(path).convert('RGB')
    if box:
        im = im.crop(box)
    s = max(size[0] / im.width, size[1] / im.height)
    r = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (r.width - size[0]) // 2, (r.height - size[1]) // 2
    return [r.crop((l, t, l + size[0], t + size[1]))] * n


# ---------- effects ----------

def zoom(frames, z0, z1, cx=0.5, cy=0.5):
    """Punch-in: crop a box of the frame's own shape, 1/z of the size, and scale it back evenly."""
    out, n = [], len(frames)
    for i, f in enumerate(frames):
        z = z0 + (z1 - z0) * (i / max(1, n - 1)) ** 0.6     # fast start, eases out
        w, h = f.width / z, f.height / z
        l = (f.width - w) * cx
        t = (f.height - h) * cy
        out.append(f.resize(f.size, Image.LANCZOS, box=(l, t, l + w, t + h)))
    return out


def flash(frames, k=4):
    out = list(frames)
    for i in range(min(k, len(out))):
        a = 1 - i / k
        out[i] = Image.blend(out[i], Image.new('RGB', out[i].size, (255, 255, 255)), a * 0.9)
    return out


def card(frames, lines, size_px=72, cy=None, min_w=0, min_h=0):
    """Big caption: dark text on an opaque white card, centered in the upper third."""
    if not lines:
        return frames
    W, H = frames[0].size
    f = font(size_px)
    lh = round(size_px * 1.22)
    tw = max(ImageDraw.Draw(frames[0]).textlength(l, font=f) for l in lines)
    cw = max(tw + 2 * 44, min_w)
    ch = max(len(lines) * lh + 2 * 30, min_h)
    cy = cy if cy is not None else round(H * 0.22)
    box = (W / 2 - cw / 2, cy - ch / 2, W / 2 + cw / 2, cy + ch / 2)
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((box[0] + 6, box[1] + 10, box[2] + 6, box[3] + 10), radius=28, fill=(0, 0, 0, 70))
    d.rounded_rectangle(box, radius=28, fill=(255, 255, 255, 255))
    y0 = cy - (len(lines) * lh) / 2 + lh / 2
    for i, l in enumerate(lines):
        d.text((W / 2, y0 + i * lh), l, font=f, fill=INK, anchor='mm')
    out = []
    for fr in frames:
        c = fr.convert('RGBA')
        c.alpha_composite(layer)
        out.append(c.convert('RGB'))
    return out


def endcard(img, n, size):
    """Bright end card: cream, a real image on top, short text, coral pill."""
    W, H = size
    tall = H > 1500
    side = 760 if not tall else 860
    top = 110 if not tall else 260
    im = img.copy()
    s = max(side / im.width, side / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((l, t, l + side, t + side))
    base = Image.new('RGB', size, CREAM)
    sh = Image.new('RGBA', size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle(((W - side) // 2 + 8, top + 14, (W + side) // 2 + 8, top + side + 14), 24, fill=(0, 0, 0, 40))
    base = base.convert('RGBA'); base.alpha_composite(sh); base = base.convert('RGB')
    mask = Image.new('L', (side, side), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, side - 1, side - 1), 24, fill=255)
    base.paste(im, ((W - side) // 2, top), mask)
    d = ImageDraw.Draw(base)
    y = top + side + (95 if not tall else 150)
    d.text((W / 2, y), 'See your photo in bricks', font=font(76), fill=INK, anchor='mm')
    pf = font(64)
    pw = d.textlength('Free preview', font=pf)
    py = y + (130 if not tall else 170)
    d.rounded_rectangle((W / 2 - pw / 2 - 56, py - 56, W / 2 + pw / 2 + 56, py + 56), radius=56, fill=CORAL)
    d.text((W / 2, py), 'Free preview', font=pf, fill=(255, 255, 255), anchor='mm')
    d.text((W / 2, py + (115 if not tall else 150)), 'mymemobrick.com', font=font(50), fill=(70, 70, 70), anchor='mm')
    return zoom([base] * n, 1.0, 1.03)


# ---------- assembly ----------

def beats(b):
    return round(b * BEAT * FPS)


def render(name, shots, out, seed):
    W, H = shots[0][0].size
    tmp = os.path.join(out, '_tmp_' + name)
    os.makedirs(tmp, exist_ok=True)
    silent = os.path.join(tmp, 'silent.mp4')
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
                            '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '22', '-preset', 'slow',
                            '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent], stdin=subprocess.PIPE)
    for frames in shots:
        for f in frames:
            enc.stdin.write(f.tobytes())
    enc.stdin.close(); enc.wait()
    mp4 = os.path.join(out, name + '.mp4')
    subprocess.run(['sh', MUSIC, 'playful', silent, mp4, str(seed)], check=True)
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                       '-of', 'csv=p=0', mp4]))
    tile = '6x2' if H < 1500 else '8x2'
    k = 12 if H < 1500 else 16
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp4, '-vf', f'fps={k}/{d},scale=270:-2,tile={tile}',
                    '-frames:v', '1', os.path.join(out, name + '-sheet.png')], check=True)
    shutil.rmtree(tmp)
    print(f'{mp4}  {d:.1f}s  {os.path.getsize(mp4) / 1e6:.1f} MB  {W}x{H}')


S45 = (1080, 1350)
S916 = (1080, 1920)
R45 = lambda y: (1080, 1350, 0, y)          # 4:5 window of a 1080x1920 reel frame
R916 = (1080, 1920, 0, 0)
NEW45 = (640, 800, 0, 170)                 # 4:5 window inside the new clip's 640x848 picture
FRAMED_BOX = (150, 360, 930, 1290)         # the framed pink dog in the pet reel at 8.95 s


def pet(size, new):
    """A3 v2: the payoff first (the woman hugging her real pink dog), then how, then back to the wall."""
    v = size == S916
    win = (lambda y: R916) if v else R45
    cd = (lambda fr, l, px=72: card(fr, l, px, cy=340, min_w=780, min_h=270)) if v else card
    # In 9:16 the zoom's fixed point is the old caption band (y 340), so the card always covers it.
    Z = (lambda fr, z0, z1, cy=0.5: zoom(fr, z0, z1, cy=340 / 1920)) if v else zoom
    sh = []
    sh.append(cd(Z(video(PET, 9.5, beats(2), win(440), size), 1.0, 1.16, cy=0.3), ['Her dog...', 'in bricks?'], 90))
    sh.append(cd(Z(video(PET, 8.9, beats(1), win(440), size), 1.08, 1.2), ['Yes. Real bricks.']))
    sh.append(cd(flash(Z(video(PET, 3.4, beats(1.5), win(470), size), 1.0, 1.12)), ['It starts', 'with her photo']))
    sh.append(cd(Z(video(PET, 2.4, beats(1.5), win(470), size), 1.1, 1.0), ['Kit sorted by color']))
    sh.append(cd(Z(video(PET, 0.0, beats(2), win(470), size), 1.0, 1.12), ['Tiny 1×1 bricks']))
    sh.append(cd(Z(video(PET, 4.45, beats(1.5), win(470), size), 1.0, 1.1), ['Built at home']))
    sh.append(cd(Z(video(PET, 6.9, beats(1.5), win(470), size), 1.0, 1.12), ['Any pet']))
    sh.append(cd(Z(video(PET, 7.9, beats(1), win(470), size), 1.12, 1.0), ['Any fur']))
    sh.append(cd(Z(video(PET, 1.2, beats(1.5), win(470), size), 1.0, 1.1), ['Press. Click. Repeat.']))
    sh.append(cd(flash(Z(video(PET, 8.9, beats(1), win(440), size), 1.0, 1.1)), ['Then on the wall']))
    sh.append(cd(Z(video(PET, 10.2, beats(2.5), win(440), size), 1.0, 1.12, cy=0.35), ['Next to', 'the real one']))
    end_img = video(PET, 8.95, 1, (1080, 1920, 0, 0), (1080, 1920))[0].crop(FRAMED_BOX)
    sh.append(endcard(end_img, 45, size))
    return sh


def family(size, new):
    """A2 v2: the creator holding up her family mosaic in frame 1, then how, the fill, back to her."""
    sh = []
    sh.append(card(zoom(video(COUPLE, 17.4, beats(2), R45(360), size), 1.0, 1.18, cy=0.3), ['Their family photo...'], 84, cy=150))
    sh.append(card(zoom(video(COUPLE, 18.47, beats(1), R45(360), size), 1.18, 1.32, cy=0.3), ['...in 1×1 bricks'], 84, cy=150))
    sh.append(card(flash(zoom(video(COUPLE, 14.6, beats(1.5), R45(470), size), 1.0, 1.12)), ['How? A kit']))
    sh.append(card(zoom(video(COUPLE, 15.4, beats(1.5), R45(470), size), 1.12, 1.0), ['Sorted by color']))
    sh.append(card(zoom(video(COUPLE, 16.4, beats(1.5), R45(470), size), 1.0, 1.12), ['Built at home']))
    sh.append(card(zoom(video(new, 0.0, beats(2.5), NEW45, size, speed=3.6), 1.0, 1.06), ['Watch it fill in']))
    sh.append(card(zoom(video(new, 4.8, beats(2.5), NEW45, size, speed=3.6), 1.06, 1.12), ['Face by face']))
    sh.append(card(zoom(video(COUPLE, 0.0, beats(2), R45(470), size), 1.0, 1.12), ['Couples, families, pets']))
    sh.append(card(flash(zoom(video(COUPLE, 18.0, beats(2), R45(360), size), 1.05, 1.2, cy=0.3)), ['Their family, in bricks'], cy=150))
    end_img = video(COUPLE, 18.2, 1, R45(360), size)[0]
    sh.append(endcard(end_img, 45, size))
    return sh


def couple(size, new):
    """A1 v2: their finished mosaic, back to the selfie, Studio preview, fast fill, build, the piece."""
    sh = []
    sh.append(card(zoom(video(COUPLE, 0.0, beats(2), R45(470), size), 1.0, 1.16), ['This was a selfie'], 84))
    sh.append(card(zoom(still(SELFIE, beats(1), size), 1.0, 1.1, cy=0.35), ['Just one photo']))
    sh.append(card(flash(zoom(still(STUDIO30, beats(1.5), size), 1.0, 1.12, cy=0.35)), ['See it in bricks first']))
    sh.append(card(flash(zoom(video(new, 0.0, beats(2.5), NEW45, size, speed=3.6), 1.0, 1.06)), ['Then build it']))
    sh.append(card(zoom(video(new, 4.8, beats(2.5), NEW45, size, speed=3.6), 1.06, 1.12), ['Watch faces appear']))
    sh.append(card(zoom(video(COUPLE, 16.4, beats(1.5), R45(470), size), 1.0, 1.12), ['Built at home']))
    sh.append(card(zoom(video(COUPLE, 14.6, beats(1.5), R45(470), size), 1.12, 1.0), ['Kit sorted by color']))
    sh.append(card(flash(zoom(video(COUPLE, 0.9, beats(2), R45(470), size), 1.0, 1.15)), ['Their selfie, in bricks']))
    sh.append(card(zoom(video(new, 9.55, beats(2), NEW45, size), 1.0, 1.25, cx=0.3, cy=0.4), ['Look closer']))
    end_img = video(COUPLE, 1.5, 1, R45(470), size)[0]
    sh.append(endcard(end_img, 45, size))
    return sh


if __name__ == '__main__':
    new, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    os.makedirs(out, exist_ok=True)
    render('A3-pet-bricks-first-4x5-v2', pet(S45, new), out, 2103)
    render('A3-pet-bricks-first-9x16-v2', pet(S916, new), out, 2103)
    render('A2-family-build-at-home-4x5-v2', family(S45, new), out, 2102)
    render('A1-look-closer-fill-4x5-v2', couple(S45, new), out, 2101)
