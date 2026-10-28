"""Build the two sprint reels (S-20261029-2 pet, S-20261030-2 size check) as PNG frames.
Every mosaic pixel comes from a MemoBrick Studio export; the photos are AI images;
the opening of reel A is real cleared footage (F91A7101.MP4)."""
import sys, os, math, subprocess
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30
FB = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
F = ImageFont.truetype(FB, 66)
FS = ImageFont.truetype(FB, 40)
FL = ImageFont.truetype(FB, 84)
CREAM = (251, 246, 238)
HERE = os.path.dirname(os.path.abspath(__file__))


def pil(img):
    return Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)) if isinstance(img, np.ndarray) else img


def boxtext(im, lines, top=230, font=F, lh=112):
    im = pil(im).convert('RGBA')
    ov = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(ov); y = top
    for ln in lines:
        tw = d.textlength(ln, font=font); bx = round((W - tw) / 2) - 28
        d.rounded_rectangle((bx, y, bx + round(tw) + 56, y + lh - 8), radius=18, fill=(0, 0, 0, 135)); y += lh
    im = Image.alpha_composite(im, ov); d = ImageDraw.Draw(im); y = top
    for ln in lines:
        d.text((W / 2, y + (lh - 8) / 2), ln, font=font, fill=(255, 255, 255, 255), anchor='mm'); y += lh
    return im.convert('RGB')


def on_cream(img, size, cy=None):
    """img PIL square/rect, scaled to width `size`, centered on a cream 9:16 canvas"""
    c = Image.new('RGB', (W, H), CREAM)
    r = img.resize((size, round(img.height * size / img.width)), Image.LANCZOS)
    y = (H - r.height) // 2 if cy is None else cy - r.height // 2
    c.paste(r, ((W - r.width) // 2, y))
    return c, ((W - r.width) // 2, y, r.width, r.height)


def zoom_frame(big, z, fx, fy):
    """big: np canvas at 3x (3240x5760). view zoom z around focus fraction (fx,fy) of the canvas"""
    ch, cw = big.shape[:2]
    vw, vh = cw / z, ch / z
    cx = min(max(fx * cw, vw / 2), cw - vw / 2); cy = min(max(fy * ch, vh / 2), ch - vh / 2)
    x0 = int(round(cx - vw / 2)); y0 = int(round(cy - vh / 2)); w = int(round(vw)); h = int(round(vh))
    x0 = min(max(x0, 0), cw - w); y0 = min(max(y0, 0), ch - h)
    c = big[y0:y0 + h, x0:x0 + w]
    return cv2.resize(c, (W, H), interpolation=cv2.INTER_AREA if w > W else cv2.INTER_CUBIC)


def ease(t):
    t = min(max(t, 0), 1); return t * t * (3 - 2 * t)


def endcard(mos, l1, l2, small, pill, mosw=760):
    c, _ = on_cream(mos, mosw, cy=760)
    d = ImageDraw.Draw(c)
    d.text((W / 2, 1270), l1, font=FL, fill=(40, 40, 40), anchor='mm')
    d.text((W / 2, 1375), l2, font=F, fill=(40, 40, 40), anchor='mm')
    tw = d.textlength(pill, font=F)
    d.rounded_rectangle((W / 2 - tw / 2 - 50, 1460, W / 2 + tw / 2 + 50, 1580), radius=60, fill=(232, 76, 61))
    d.text((W / 2, 1520), pill, font=F, fill=(255, 255, 255), anchor='mm')
    d.text((W / 2, 1660), small, font=FS, fill=(90, 90, 90), anchor='mm')
    d.text((W / 2, 1740), 'mymemobrick.com', font=FS, fill=(90, 90, 90), anchor='mm')
    return c


def write(frames_dir, i, im):
    pil(im).save(os.path.join(frames_dir, '%04d.png' % i))


def reel_a(out):
    os.makedirs(out, exist_ok=True)
    mos = Image.open(os.path.join(HERE, 'S-20261029-2-studio-mosaic.png')).convert('RGB')   # 1216 sq, 64x64
    photo = Image.open(os.path.join(HERE, 'dog-crop.jpg')).convert('RGB').resize(mos.size, Image.LANCZOS)
    i = 0
    # 1) 0-3.0 s: real footage, slow motion 2x, tight vertical crop on the hand and brick
    clip = sys.argv[2]
    tmp = os.path.join(out, 'clip')
    os.makedirs(tmp, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '1.5', '-t', '1.5', '-i', clip, '-vf',
                    "crop=608:1080:900:0,scale=1080:1920,setpts=2*PTS,minterpolate=fps=30:mi_mode=mci",
                    os.path.join(tmp, '%04d.png')], check=True)
    cf = sorted(os.listdir(tmp))[:90]
    for k, f in enumerate(cf):
        im = Image.open(os.path.join(tmp, f)).convert('RGB')
        i += 1; write(out, i, boxtext(im, ['We brick your pet', 'Episode 1']))
    # 2) 3.0-5.0 s: the photo
    base, (px, py, pw, ph) = on_cream(photo, 1000, cy=1080)
    for k in range(60):
        z = 1 + 0.03 * k / 60
        im = base.resize((round(W * z), round(H * z)), Image.LANCZOS)
        im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
        i += 1; write(out, i, boxtext(im, ['You send the photo']))
    # 3) 5.0-8.5 s: row-by-row wipe to the Studio mosaic (64 rows), then hold
    mbase, _ = on_cream(mos, 1000, cy=1080)
    rows = 64; rh = ph / rows
    for k in range(105):
        t = ease(k / 75)
        n = int(round(t * rows))
        im = base.copy()
        if n:
            cut = round(n * rh)
            im.paste(mbase.crop((px, py, px + pw, py + cut)), (px, py))
        i += 1; write(out, i, boxtext(im, ['Our Studio turns it', 'into 1×1 bricks']))
    # 4) 8.5-12.0 s: macro on the eye, zoom out
    big = np.full((H * 3, W * 3, 3), CREAM[::-1], np.uint8)
    mb = cv2.cvtColor(np.array(mos.resize((3000, 3000), Image.NEAREST)), cv2.COLOR_RGB2BGR)
    oy = (H * 3 - 3000) // 2; ox = (W * 3 - 3000) // 2
    big[oy:oy + 3000, ox:ox + 3000] = mb
    ex, ey = (ox + 3000 * 0.30) / (W * 3), (oy + 3000 * 0.27) / (H * 3)   # dog's left eye
    for k in range(105):
        t = ease(k / 95)
        z = math.exp(math.log(5.0) * (1 - t))
        fx = ex + (0.5 - ex) * t; fy = ey + (0.5 - ey) * t
        im = zoom_frame(big, z, fx, fy)
        i += 1; write(out, i, boxtext(im, ['4,096 bricks', '20×20 kit']))
    # 5) 12.0-16.5 s: end card
    ec = endcard(mos, 'Want your pet next?', 'DM us their photo', 'We always ask before we post a photo.', 'Send us your pet')
    for k in range(135):
        i += 1; write(out, i, ec)
    return i


def reel_b(out):
    os.makedirs(out, exist_ok=True)
    sz = ['16x16', '20x20', '30x30']
    lab = {'16x16': ('16×16', '2,500 bricks'), '20x20': ('20×20', '4,096 bricks'), '30x30': ('30×30', '9,216 bricks')}
    mos = {z: Image.open(os.path.join(HERE, 'S-20261030-2-studio-%s.png' % z)).convert('RGB').resize((1248, 1248), Image.NEAREST) for z in sz}
    photo = Image.open(os.path.join(HERE, 'couple.jpg')).convert('RGB').resize((1248, 1248), Image.LANCZOS)
    i = 0
    # 1) 0-2.5 s: macro on the 30x30 (her eye), zoom out a little
    big = np.full((H * 3, W * 3, 3), CREAM[::-1], np.uint8)
    mb = cv2.cvtColor(np.array(mos['30x30'].resize((3000, 3000), Image.NEAREST)), cv2.COLOR_RGB2BGR)
    oy = (H * 3 - 3000) // 2; ox = (W * 3 - 3000) // 2
    big[oy:oy + 3000, ox:ox + 3000] = mb
    ex, ey = (ox + 3000 * 0.27) / (W * 3), (oy + 3000 * 0.42) / (H * 3)
    for k in range(75):
        t = ease(k / 74)
        z = math.exp(math.log(6.0) * (1 - t) + math.log(2.2) * t)
        im = zoom_frame(big, z, ex, ey)
        i += 1; write(out, i, boxtext(im, ['Same photo.', '3 sizes.']))
    # 2) 2.5-4.0 s: the photo
    base, _ = on_cream(photo, 1000, cy=1080)
    for k in range(45):
        i += 1; write(out, i, boxtext(base, ['The photo']))
    # 3) 4.0-12.4 s: each size, 2.8 s, gentle push-in
    for z in sz:
        b, _ = on_cream(mos[z], 1000, cy=1080)
        for k in range(84):
            s = 1 + 0.04 * k / 84
            im = b.resize((round(W * s), round(H * s)), Image.LANCZOS)
            im = im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))
            i += 1; write(out, i, boxtext(im, list(lab[z])))
    # 4) 12.4-15.0 s: side by side
    c = Image.new('RGB', (W, H), CREAM); d = ImageDraw.Draw(c)
    for n, z in enumerate(sz):
        w = 320; x = 30 + n * (w + 25)
        c.paste(mos[z].resize((w, w), Image.LANCZOS), (x, 820))
        d.text((x + w / 2, 1190), lab[z][0], font=F, fill=(40, 40, 40), anchor='mm')
    sbs = boxtext(c, ['Which one would', 'you hang?'], top=420)
    sbs = boxtext(sbs, ['Comment 16, 20 or 30'], top=1320)
    for k in range(78):
        i += 1; write(out, i, sbs)
    # 5) 15.0-19.0 s: end card
    ec = endcard(mos['30x30'], 'More bricks, more detail', 'Compare sizes with your photo', 'Upload a photo to see your preview.', 'Start your design')
    for k in range(120):
        i += 1; write(out, i, ec)
    return i


if __name__ == '__main__':
    which = sys.argv[1]
    out = os.path.join(HERE, 'v_' + which)
    n = reel_a(out) if which == 'a' else reel_b(out)
    print(which, n, 'frames')
