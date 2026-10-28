"""Build the v3 sprint reels (Eden, Oct 28: "the media of connie is distorted",
"the second video improve the memobrick result", children OK).
- No motion interpolation anywhere: every clip runs at real speed or is sped up by dropping frames.
- Every clip keeps its aspect ratio: crops are 9:16 and scaled uniformly (or not at all).
- S-20261030-2-v3 shows the Studio exports large, framed on a wall, at their own resolution (downscaled only).
Usage: python3 reels_v3.py a|b <footage dir> <out frames dir>"""
import sys, os, subprocess, shutil
from PIL import Image, ImageOps, ImageDraw, ImageFilter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reels import W, H, FPS, boxtext, write, CREAM, F, FS, FL  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
WALL = (236, 230, 221)


def clip(src, ss, dur, tmp, speed=1.0, crop=None):
    """Frames of src from ss for dur seconds of source time at 1080x1920, 30 fps.
    speed > 1 drops frames (no blending, no interpolation). crop must be 9:16."""
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    vf = []
    if crop:
        w, h, x, y = crop
        assert abs(w * 16 - h * 9) <= 16, 'crop must be 9:16'
        vf.append('crop=%d:%d:%d:%d' % crop)
    vf.append('scale=%d:%d:flags=lanczos' % (W, H))
    if speed != 1.0:
        vf.append('setpts=PTS/%s' % speed)
    vf.append('fps=30')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(ss), '-t', str(dur), '-i', src,
                    '-vf', ','.join(vf), os.path.join(tmp, '%04d.png')], check=True)
    n = int(round(dur / speed * FPS))
    fs = sorted(os.listdir(tmp))[:n]
    return [Image.open(os.path.join(tmp, f)).convert('RGB') for f in fs]


class Out:
    def __init__(self, d):
        self.d = d; self.i = 0
        if os.path.exists(d):
            shutil.rmtree(d)
        os.makedirs(d)

    def add(self, frames, lines=None, **kw):
        for f in frames:
            self.i += 1
            write(self.d, self.i, boxtext(f, lines, **kw) if lines else f)


def wall():
    """A plain warm wall, lighter at the top left (smooth gradient, no texture)."""
    import numpy as np
    yy, xx = np.mgrid[0:H, 0:W]
    t = np.clip((xx / W) * 0.35 + (yy / H) * 0.65, 0, 1)[..., None]
    a = np.array(WALL, float); b = np.array((218, 210, 199), float)
    return Image.fromarray((a * (1 - t) + b * t).astype('uint8'))


def framed(mos, inner, wall_im, cx, cy, mat=None, border=None):
    """Hang a Studio export in a white frame with a mat and a soft shadow; inner = mosaic width in px."""
    mat = mat if mat is not None else max(10, inner // 14)
    border = border if border is not None else max(8, inner // 22)
    m = mos.resize((inner, inner), Image.LANCZOS)          # downscale only: exports are 1216 to 1250 px
    ow = inner + 2 * (mat + border)
    x0, y0 = cx - ow // 2, cy - ow // 2
    sh = Image.new('L', (W, H), 0); ImageDraw.Draw(sh).rectangle((x0 + 10, y0 + 18, x0 + ow + 10, y0 + ow + 18), fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(18))
    im = Image.composite(Image.new('RGB', (W, H), (120, 110, 100)), wall_im, sh)
    d = ImageDraw.Draw(im)
    d.rectangle((x0, y0, x0 + ow, y0 + ow), fill=(250, 250, 248))                       # frame
    d.rectangle((x0 + border - 2, y0 + border - 2, x0 + ow - border + 2, y0 + ow - border + 2), outline=(222, 222, 220), width=2)
    d.rectangle((x0 + border, y0 + border, x0 + ow - border, y0 + ow - border), fill=(244, 243, 240))   # mat
    im.paste(m, (x0 + border + mat, y0 + border + mat))
    return im


def push(base, k, n, amt=0.03):
    s = 1 + amt * k / n
    im = base.resize((round(W * s), round(H * s)), Image.LANCZOS)
    return im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H))


def endcard_on(top_img, l1, l2, small, pill):
    c = top_img.copy(); d = ImageDraw.Draw(c)
    d.text((W / 2, 1290), l1, font=FL, fill=(40, 40, 40), anchor='mm')
    d.text((W / 2, 1395), l2, font=F, fill=(40, 40, 40), anchor='mm')
    tw = d.textlength(pill, font=F)
    d.rounded_rectangle((W / 2 - tw / 2 - 50, 1480, W / 2 + tw / 2 + 50, 1600), radius=60, fill=(232, 76, 61))
    d.text((W / 2, 1540), pill, font=F, fill=(255, 255, 255), anchor='mm')
    d.text((W / 2, 1680), small, font=FS, fill=(90, 90, 90), anchor='mm')
    d.text((W / 2, 1760), 'mymemobrick.com', font=FS, fill=(90, 90, 90), anchor='mm')
    return c


def reel_a(fd, out):
    o = Out(out); t = os.path.join(out, '_tmp')
    pink = os.path.join(fd, 'new', '1th9iw6q12MJYTzx6Weq3I09bO47wJhB9.vid')     # Pink Butters raw, 2022
    shih = os.path.join(fd, 'new', '1mkFJcWG-ceCM7p9oN415YEBtmP6ATSXK.vid')     # pet videos, shih tzu
    # 1) 0-2.4 s: macro, fingers press a light-blue 1x1 brick into the pink dog mosaic, real speed
    o.add(clip(pink, 29.4, 2.4, t), ['We brick your pet', 'Episode 1'])
    # 2) 2.4-3.4 s: the color-sorted brick bags
    o.add(clip(pink, 8.6, 1.0, t), ['Their photo', 'becomes a kit'])
    # 3) 3.4-4.4 s: the printed color map
    o.add(clip(pink, 10.0, 1.0, t), ['Their photo', 'becomes a kit'])
    # 4) 4.4-6.9 s: building, sped up 4x and 5x (frames dropped, not blended)
    o.add(clip(pink, 14.0, 4.0, t, speed=4), ['Brick by brick'])
    o.add(clip(pink, 19.5, 7.5, t, speed=5), ['Brick by brick'])
    # 5) 6.9-8.9 s: a second pet, a shih tzu mosaic, fingers pressing one brick
    o.add(clip(shih, 0.3, 2.0, t), ['Any pet, any fur'])
    # 6) 8.9-11.4 s: the framed pink dog on the wall, then the real dog in her arms (9:16 crop, 1.18x)
    o.add(clip(pink, 34.0, 2.5, t, crop=(918, 1632, 0, 288)), ['Then meet', 'the real one'])
    # 7) 11.4-15.4 s: end card on the real framed piece (photo from the same shoot), aspect kept
    p1 = ImageOps.exif_transpose(Image.open(os.path.join(fd, 'p1.jpg'))).convert('RGB')
    fr = p1.crop((927, 900, 2370, 2220))   # the framed piece, clear of the candelabra
    c = Image.new('RGB', (W, H), CREAM)
    r = fr.resize((900, round(fr.height * 900 / fr.width)), Image.LANCZOS)
    c.paste(r, ((W - 900) // 2, 1120 - r.height - 40))
    ec = endcard_on(c, 'Want your pet next?', 'DM us their photo', 'We always ask before we post a photo.', 'Send us your pet')
    o.add([ec] * 120)
    shutil.rmtree(t)
    return o.i


def reel_b(fd, out):
    o = Out(out); t = os.path.join(out, '_tmp')
    cpl = os.path.join(fd, 'new', '19BL-wPltl_f3n6e8vSVM4zOo3aFazmz5.vid')      # MEMOBRICK_video_original_463981 2.mp4
    bil = os.path.join(fd, 'billo', 'billo-276825-orig.MP4')                      # billo-276825-orig.MP4
    sz = ['16x16', '20x20', '30x30']
    lab = {'16x16': ('16×16', '2,500 bricks'), '20x20': ('20×20', '4,096 bricks'), '30x30': ('30×30', '9,216 bricks')}
    mos = {z: Image.open(os.path.join(HERE, 'S-20261030-2-v3-studio-%s.png' % z)).convert('RGB') for z in sz}
    wl = wall()
    # 1) 0-2.0 s: the couple's real finished mosaic on a table
    o.add(clip(cpl, 16.0, 2.0, t), ['Same photo.', '3 sizes.'])
    # 2) 2.0-3.6 s: their selfie (the sharpest stretch of the clip), 9:16 crop above the shirt lettering
    o.add(clip(cpl, 9.0, 1.6, t, crop=(864, 1536, 108, 0)), ['The photo'])
    # 3) 3.6-12.0 s: each Studio export framed on the wall, 820 px wide (downscaled, never upscaled), slow push-in
    for z in sz:
        b = framed(mos[z], 820, wl, W // 2, 1060)
        o.add([push(b, k, 84) for k in range(84)], list(lab[z]))
    # 4) 12.0-14.6 s: the three on one wall at their real relative sizes (16 : 20 : 30)
    c = wl.copy()
    unit = 12.5   # px per inch
    xs = [140, 436, 836]
    for z, cx in zip(sz, xs):
        inch = int(z.split('x')[0]); inner = int(inch * unit)
        c = framed(mos[z], inner, c, cx, 1060, mat=max(8, inner // 16), border=max(6, inner // 26))
    d = ImageDraw.Draw(c)
    for z, cx in zip(sz, xs):
        d.text((cx, 1060 + int(int(z.split('x')[0]) * unit) // 2 + 70), lab[z][0], font=F, fill=(40, 40, 40), anchor='mm')
    sbs = boxtext(c, ['Which one would', 'you hang?'], top=360)
    sbs = boxtext(sbs, ['Comment 16, 20 or 30'], top=1500)
    o.add([sbs] * 78)
    # 5) 14.6-17.4 s: building at home (billo clip): bags, a brick on the tool, hands on the board
    o.add(clip(bil, 7.0, 0.8, t), ['You build it at home'])
    o.add(clip(bil, 9.0, 1.0, t), ['You build it at home'])
    o.add(clip(bil, 21.0, 3.0, t, speed=3), ['You build it at home'])
    # 6) 17.4-19.0 s: the finished piece held up
    o.add(clip(bil, 28.6, 1.6, t), ['Then you hang it'])
    # 7) 19.0-23.0 s: end card, the 30x30 framed on the wall
    top = framed(mos['30x30'], 760, wl, W // 2, 620)
    ec = endcard_on(top, 'More bricks, more detail', 'Compare sizes with your photo', 'Upload a photo to see your preview.', 'Start your design')
    o.add([ec] * 120)
    shutil.rmtree(t)
    return o.i


if __name__ == '__main__':
    which, fd, out = sys.argv[1], sys.argv[2], sys.argv[3]
    print(which, (reel_a if which == 'a' else reel_b)(fd, out), 'frames')
