"""Memobrick W45/W46 build kit. Every bricked image is a MemoBrick Studio export (st/*.png);
photos and rooms are AI images without any mosaic; footage is cleared real footage.
Run with /usr/bin/python3."""
import os, sys, shutil, subprocess, math
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30
FB = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F = ImageFont.truetype(FB, 66); FS = ImageFont.truetype(FB, 40); FL = ImageFont.truetype(FB, 84)
CREAM = (251, 246, 238); NAVY = (27, 38, 79); PINK = (214, 106, 126); CORAL = (232, 76, 61)
SC = '/tmp/claude-0/-home-user-memobrick/e48fdd61-175f-530e-a1aa-f3d8cc553037/scratchpad'
FD = SC + '/fd'
VID = {'kit': FD + '/1BWqgv3ZlebkHeMFD1EK4I_KHboK0tJe9.vid',      # F7071 kit box
       'press': FD + '/1E3DFJDbupvxkfxYdj9p13kUw8IdCzpea.vid',    # F7093 fingers pressing 1x1 bricks
       'fill': FD + '/1knhLwYr_JO62ef-tt1VwOg6wIMLZ1593.vid',     # F7089 hands filling the baseplate
       'pink': FD + '/1th9iw6q12MJYTzx6Weq3I09bO47wJhB9.vid',     # Pink Butters (portrait 1080x1920)
       'shih': FD + '/1mkFJcWG-ceCM7p9oN415YEBtmP6ATSXK.vid'}     # shih tzu macro (portrait)


def cap(path):
    return Image.open(path).convert('RGB')


def boxtext(im, lines, top=230, font=F, lh=112):
    im = im.convert('RGBA')
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov); y = top
    for ln in lines:
        tw = d.textlength(ln, font=font); bx = round((im.width - tw) / 2) - 28
        d.rounded_rectangle((bx, y, bx + round(tw) + 56, y + lh - 8), radius=18, fill=(0, 0, 0, 135)); y += lh
    im = Image.alpha_composite(im, ov); d = ImageDraw.Draw(im); y = top
    for ln in lines:
        d.text((im.width / 2, y + (lh - 8) / 2), ln, font=font, fill=(255, 255, 255, 255), anchor='mm'); y += lh
    return im.convert('RGB')


class Out:
    def __init__(self, d):
        self.d = d; self.i = 0
        if os.path.exists(d): shutil.rmtree(d)
        os.makedirs(d)

    def add(self, frames, lines=None, **kw):
        for f in frames:
            self.i += 1
            (boxtext(f, lines, **kw) if lines else f).save(os.path.join(self.d, '%04d.png' % self.i))

    def hold(self, im, secs, lines=None, **kw):
        n = int(round(secs * FPS)); f = boxtext(im, lines, **kw) if lines else im
        for _ in range(n):
            self.i += 1; f.save(os.path.join(self.d, '%04d.png' % self.i))


def encode(frames_dir, out_mp4):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-framerate', '30', '-i', os.path.join(frames_dir, '%04d.png'),
                    '-c:v', 'libx264', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out_mp4], check=True)
    sz = os.path.getsize(out_mp4) / 1e6
    print(out_mp4, '%.1f MB' % sz)


def preview(mp4, out_jpg):
    d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp4]))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp4, '-vf', 'fps=10/%f,scale=216:-2,tile=10x1' % d, '-frames:v', '1', out_jpg], check=True)


def cream_canvas():
    return Image.new('RGB', (W, H), CREAM)


def clip(name, ss, dur, tmp, speed=1.0, x0=None, slow=1, mode='sq', cy=960, size=1080):
    """Real footage frames on a cream 9:16 canvas. mode 'sq': square crop of a 16:9 clip at x offset x0
    (no upscaling when size=1080), 'full': a portrait clip as is. speed>1 drops frames, slow>1 repeats frames
    (no interpolation, no blending)."""
    src = VID[name]
    if os.path.exists(tmp): shutil.rmtree(tmp)
    os.makedirs(tmp)
    vf = []
    if mode == 'sq':
        vf.append('crop=1080:1080:%d:0' % (x0 if x0 is not None else 420))
        if size != 1080: vf.append('scale=%d:%d:flags=lanczos' % (size, size))
    else:
        vf.append('scale=%d:%d:flags=lanczos' % (W, H))
    if speed != 1.0: vf.append('setpts=PTS/%s' % speed)
    vf.append('fps=30')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(dur), '-i', src, '-vf', ','.join(vf), os.path.join(tmp, '%04d.png')], check=True)
    fs = sorted(os.listdir(tmp))
    n = int(round(dur / speed * FPS)); fs = fs[:n]
    out = []
    for f in fs:
        im = Image.open(os.path.join(tmp, f)).convert('RGB')
        if mode == 'sq':
            c = cream_canvas(); c.paste(im, ((W - size) // 2, cy - size // 2)); im = c
        out += [im] * slow
    return out


def mosaic_on_cream(mos, w, cy=960):
    c = cream_canvas(); r = mos.resize((w, round(mos.height * w / mos.width)), Image.LANCZOS)
    c.paste(r, ((W - w) // 2, cy - r.height // 2)); return c, ((W - w) // 2, cy - r.height // 2, r.width, r.height)


def ease(t):
    t = min(max(t, 0), 1); return t * t * (3 - 2 * t)


def zoom_frames(base_pil, n, z0, z1, fx, fy):
    """Zoom from z0 to z1 on a 9:16 canvas, focus point (fx,fy) as fractions. Renders from a 2x canvas."""
    big = base_pil.resize((W * 2, H * 2), Image.LANCZOS)
    big = cv2.cvtColor(np.array(big), cv2.COLOR_RGB2BGR)
    out = []
    for k in range(n):
        z = z0 * (z1 / z0) ** ease(k / max(1, n - 1))
        vw, vh = W * 2 / z, H * 2 / z
        cx = min(max(fx * W * 2, vw / 2), W * 2 - vw / 2); cy = min(max(fy * H * 2, vh / 2), H * 2 - vh / 2)
        x0 = int(round(cx - vw / 2)); y0 = int(round(cy - vh / 2))
        c = big[y0:y0 + int(vh), x0:x0 + int(vw)]
        c = cv2.resize(c, (W, H), interpolation=cv2.INTER_CUBIC if z > 2 else cv2.INTER_AREA)
        out.append(Image.fromarray(cv2.cvtColor(c, cv2.COLOR_BGR2RGB)))
    return out


def wipe_frames(photo, mos, w, n, cy=960):
    """Photo turns into the Studio mosaic row by row (top to bottom) on cream. photo and mos same aspect."""
    c0, (x, y, rw, rh) = mosaic_on_cream(photo, w, cy)
    c1, _ = mosaic_on_cream(mos, w, cy)
    out = []
    for k in range(n):
        t = ease(k / max(1, n - 1)); cut = int(round(rh * t))
        f = c0.copy(); f.paste(c1.crop((x, y, x + rw, y + cut)), (x, y))
        if 0 < cut < rh:
            ImageDraw.Draw(f).rectangle((x, y + cut - 2, x + rw, y + cut + 1), fill=(255, 255, 255))
        out.append(f)
    return out


def wall_bg(w=W, h=H):
    yy, xx = np.mgrid[0:h, 0:w]
    t = np.clip((xx / w) * 0.35 + (yy / h) * 0.65, 0, 1)[..., None]
    a = np.array((236, 230, 221), float); b = np.array((218, 210, 199), float)
    return Image.fromarray((a * (1 - t) + b * t).astype('uint8'))


def frame_on(im, mos, cx, cy, iw, ih, thin=True):
    """Hang a Studio export (iw x ih px) in a white frame with a mat and a soft shadow on im (PIL RGB)."""
    mat = max(8, iw // 16); border = max(6, iw // 28)
    ow, oh = iw + 2 * (mat + border), ih + 2 * (mat + border)
    x0, y0 = int(cx - ow / 2), int(cy - oh / 2)
    sh = Image.new('L', im.size, 0); ImageDraw.Draw(sh).rectangle((x0 + 8, y0 + 14, x0 + ow + 8, y0 + oh + 14), fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(max(6, iw // 25)))
    im = Image.composite(Image.new('RGB', im.size, (60, 45, 35)), im, sh)
    d = ImageDraw.Draw(im)
    d.rectangle((x0, y0, x0 + ow, y0 + oh), fill=(250, 250, 248))
    d.rectangle((x0 + border, y0 + border, x0 + ow - border, y0 + oh - border), fill=(244, 243, 240))
    im.paste(mos.resize((iw, ih), Image.LANCZOS), (x0 + border + mat, y0 + border + mat))
    return im


def endcard(top_img, l1, l2, small, pill, y1=1290):
    c = top_img.copy(); d = ImageDraw.Draw(c)
    d.text((W / 2, y1), l1, font=FL if len(l1) < 24 else F, fill=(40, 40, 40), anchor='mm')
    d.text((W / 2, y1 + 105), l2, font=F if len(l2) < 26 else FS, fill=(40, 40, 40), anchor='mm')
    pf = F if d.textlength(pill, font=F) < 800 else FS
    tw = d.textlength(pill, font=pf)
    d.rounded_rectangle((W / 2 - tw / 2 - 50, y1 + 190, W / 2 + tw / 2 + 50, y1 + 310), radius=60, fill=CORAL)
    d.text((W / 2, y1 + 250), pill, font=pf, fill=(255, 255, 255), anchor='mm')
    d.text((W / 2, y1 + 390), small, font=FS, fill=(90, 90, 90), anchor='mm')
    d.text((W / 2, y1 + 460), 'mymemobrick.com', font=FS, fill=(90, 90, 90), anchor='mm')
    return c


def push(base, k, n, amt=0.03):
    s = 1 + amt * k / n
    im = base.resize((round(base.width * s), round(base.height * s)), Image.LANCZOS)
    return im.crop(((im.width - base.width) // 2, (im.height - base.height) // 2, (im.width - base.width) // 2 + base.width, (im.height - base.height) // 2 + base.height))


# ---------- stills ----------
CAL = subprocess.run(['fc-match', '-f', '%{file}', 'Caladea:bold'], capture_output=True, text=True).stdout
IMED = subprocess.run(['fc-match', '-f', '%{file}', 'Inter:style=Medium'], capture_output=True, text=True).stdout
ISEMI = subprocess.run(['fc-match', '-f', '%{file}', 'Inter:style=SemiBold'], capture_output=True, text=True).stdout


def wrap(d, text, fnt, width):
    lines, line = [], ''
    for w in text.split():
        t = (line + ' ' + w).strip()
        if d.textlength(t, font=fnt) <= width or not line: line = t
        else: lines.append(line); line = w
    return lines + ([line] if line else [])


def card_slide(title, items, button=None, size=(1080, 1350), mos=None, note=None):
    """Cream carousel card: serif title, white rounded cards sized to their text, optional pink pill, brand."""
    w, h = size; s = w / 1080
    im = Image.new('RGB', size, CREAM); d = ImageDraw.Draw(im)
    tf = ImageFont.truetype(CAL, int(74 * s)); hf = ImageFont.truetype(CAL, int(52 * s)); bf = ImageFont.truetype(IMED, int(39 * s))
    pf = ImageFont.truetype(ISEMI, int(38 * s)); sf = ImageFont.truetype(FB, int(34 * s))
    x = int(80 * s); cw = w - 2 * x; y = int(70 * s)
    for ln in wrap(d, title, tf, cw):
        d.text((x, y), ln, font=tf, fill=NAVY); y += int(tf.size * 1.12)
    y += int(30 * s)
    if mos is not None:
        mh = int(mos.height * min(1.0, 1.0)); r = mos
        im.paste(r, ((w - r.width) // 2, y)); y += r.height + int(30 * s)
    for head, body in items:
        hl = wrap(d, head, hf, cw - int(80 * s)); bl = wrap(d, body, bf, cw - int(80 * s))
        ch = int(40 * s) * 2 + len(hl) * int(hf.size * 1.15) + int(10 * s) + len(bl) * int(bf.size * 1.32)
        d.rounded_rectangle((x, y, x + cw, y + ch), radius=int(36 * s), fill=(255, 255, 255))
        yy = y + int(40 * s)
        for ln in hl: d.text((x + int(40 * s), yy), ln, font=hf, fill=NAVY); yy += int(hf.size * 1.15)
        yy += int(10 * s)
        for ln in bl: d.text((x + int(40 * s), yy), ln, font=bf, fill=(90, 98, 130)); yy += int(bf.size * 1.32)
        y += ch + int(24 * s)
    if note:
        for ln in wrap(d, note, bf, cw): d.text((x, y), ln, font=bf, fill=(90, 98, 130)); y += int(bf.size * 1.32)
    by_bottom = h - int(60 * s)
    if button:
        tw = d.textlength(button, font=pf); bw, bh = tw + pf.size * 2.4, pf.size * 2.3
        by = by_bottom - bh
        d.rounded_rectangle((x, by, x + bw, by + bh), radius=bh / 2, fill=PINK)
        d.text((x + bw / 2, by + bh / 2), button, font=pf, fill=(255, 255, 255), anchor='mm')
    d.text((w - x, by_bottom - int(20 * s)), 'mymemobrick.com', font=sf, fill=NAVY, anchor='rs')
    assert y < by_bottom - int(100 * s) or not button, 'card content too tall: y=%d' % y
    return im


def scene_slide(scene_path, mos, size, cx, cy, iw, ih, headline, sub=None, button=None, out=None, crop=None, place='top-left', light=False):
    sc = Image.open(scene_path).convert('RGB')
    if crop: sc = sc.crop(crop)
    sc = sc.resize(size, Image.LANCZOS)
    sc = frame_on(sc, mos, cx, cy, iw, ih)
    tmp = out + '.tmp.png'; sc.save(tmp)
    cmd = [sys.executable, '/home/user/memobrick/marketing/tools/add_text.py', tmp, out, '--headline', headline, '--place', place]
    if sub: cmd += ['--sub', sub]
    if button: cmd += ['--button', button]
    if light: cmd += ['--light']
    subprocess.run(cmd, check=True, capture_output=True); os.remove(tmp)
    return Image.open(out)


def build_frames(mos, w, n, gw, gh, cy=960, hold_end=0):
    """Studio mosaic 'built' stud by stud (row by row, left to right) on a baseplate grey, shown on cream."""
    m = mos.resize((w, round(mos.height * w / mos.width)), Image.LANCZOS); mh = m.height
    pitch = w / gw
    plate = Image.new('RGB', (w, mh), (228, 228, 224)); d = ImageDraw.Draw(plate)
    for r in range(gh):
        for c in range(gw):
            x = (c + .5) * pitch; y = (r + .5) * (mh / gh); rr = pitch * 0.28
            d.ellipse((x - rr, y - rr, x + rr, y + rr), outline=(205, 205, 200))
    marr = np.array(m); parr = np.array(plate)
    ys = (np.arange(mh) / (mh / gh)).astype(int)[:, None]; xs = (np.arange(w) / pitch).astype(int)[None, :]
    idx = ys * gw + xs
    c = cream_canvas(); x0 = (W - w) // 2; y0 = cy - mh // 2
    out = []
    for k in range(n):
        t = ease(k / max(1, n - 1)); cells = int(round(t * gw * gh))
        mask = (idx < cells)[..., None]
        f = Image.fromarray(np.where(mask, marr, parr).astype('uint8'))
        cc = c.copy(); cc.paste(f, (x0, y0)); out.append(cc)
    return out
