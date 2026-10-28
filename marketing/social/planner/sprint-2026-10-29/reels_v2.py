"""Build the v2 sprint reels from real cleared Drive footage (Eden, Oct 28: "Use new footage").
S-20261029-2-v2 (pet): real footage only, no generated mosaic.
S-20261030-2-v2 (sizes): real footage plus three MemoBrick Studio exports made from a frame of a cleared clip.
Usage: python3 reels_v2.py a|b <footage dir> <out frames dir>
Raw footage stays outside the repo; only this script and the finished reels are committed."""
import sys, os, subprocess, shutil, math
import numpy as np, cv2
from PIL import Image, ImageOps
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reels import W, H, FPS, boxtext, on_cream, zoom_frame, ease, endcard, write, CREAM  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))


def clip(src, ss, dur, tmp, speed=1.0, crop=None, slow_interp=False):
    """Frames of src from ss for dur seconds of source time, at 1080x1920 30 fps, played at `speed`."""
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    vf = []
    if crop:
        vf.append('crop=%d:%d:%d:%d' % crop)
    vf.append('scale=%d:%d' % (W, H))
    vf.append('setpts=PTS/%s' % speed)
    vf.append('minterpolate=fps=30:mi_mode=mci' if slow_interp else 'fps=30')
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


def reel_a(fd, out):
    o = Out(out); t = os.path.join(out, '_tmp')
    pink = os.path.join(fd, 'new', '1th9iw6q12MJYTzx6Weq3I09bO47wJhB9.vid')     # Pink Butters raw, 2022
    shih = os.path.join(fd, 'new', '1mkFJcWG-ceCM7p9oN415YEBtmP6ATSXK.vid')     # pet videos, shih tzu
    # 1) 0-2.4 s: macro, fingers press a light-blue 1x1 brick into the pink dog mosaic, slowed 1.6x
    o.add(clip(pink, 29.5, 1.5, t, speed=0.625, slow_interp=True), ['We brick your pet', 'Episode 1'])
    # 2) 2.4-3.4 s: the color-sorted brick bags
    o.add(clip(pink, 8.6, 1.0, t), ['Their photo', 'becomes a kit'])
    # 3) 3.4-4.4 s: the printed color map
    o.add(clip(pink, 10.0, 1.0, t), ['Their photo', 'becomes a kit'])
    # 4) 4.4-6.9 s: building, sped up 4x and 5x
    o.add(clip(pink, 14.0, 4.0, t, speed=4), ['Brick by brick'])
    o.add(clip(pink, 19.5, 7.5, t, speed=5), ['Brick by brick'])
    # 5) 6.9-8.9 s: a second pet, a shih tzu mosaic, fingers pressing one brick
    o.add(clip(shih, 0.3, 2.0, t), ['Any pet, any fur'])
    # 6) 8.9-11.4 s: the framed pink dog on the wall, then the real dog in her arms (cropped in, shelf left out)
    o.add(clip(pink, 34.0, 2.5, t, crop=(810, 1440, 0, 480)), ['Then meet', 'the real one'])
    # 7) 11.4-15.4 s: end card on the real framed piece (photo from the same shoot)
    p1 = ImageOps.exif_transpose(Image.open(os.path.join(fd, 'p1.jpg'))).convert('RGB')
    fr = p1.crop((927, 900, 2863, 2379))   # the framed piece, below the candelabra
    ec = endcard(fr, 'Want your pet next?', 'DM us their photo', 'We always ask before we post a photo.', 'Send us your pet')
    o.add([ec] * 120)
    shutil.rmtree(t)
    return o.i


def reel_b(fd, out):
    o = Out(out); t = os.path.join(out, '_tmp')
    cpl = os.path.join(fd, 'new', '19BL-wPltl_f3n6e8vSVM4zOo3aFazmz5.vid')      # MEMOBRICK_video_original_463981 2.mp4
    bil = os.path.join(fd, 'billo', 'billo-276825-orig.MP4')                      # billo-276825-orig.MP4
    sz = ['16x16', '20x20', '30x30']
    lab = {'16x16': ('16×16', '2,500 bricks'), '20x20': ('20×20', '4,096 bricks'), '30x30': ('30×30', '9,216 bricks')}
    mos = {z: Image.open(os.path.join(HERE, 'S-20261030-2-v2-studio-%s.png' % z)).convert('RGB').resize((1248, 1248), Image.NEAREST) for z in sz}
    # 1) 0-2.0 s: macro of the couple's real finished mosaic, then the whole piece
    o.add(clip(cpl, 16.0, 2.0, t), ['Same photo.', '3 sizes.'])
    # 2) 2.0-3.6 s: their selfie, the photo the mosaics are made from
    o.add(clip(cpl, 7.3, 1.6, t, crop=(864, 1536, 108, 0)), ['The photo'])
    # 3) 3.6-12.0 s: each size from the Studio, gentle push-in
    for z in sz:
        b, _ = on_cream(mos[z], 1000, cy=1080)
        fr = []
        for k in range(84):
            s = 1 + 0.04 * k / 84
            im = b.resize((round(W * s), round(H * s)), Image.LANCZOS)
            fr.append(im.crop(((im.width - W) // 2, (im.height - H) // 2, (im.width - W) // 2 + W, (im.height - H) // 2 + H)))
        o.add(fr, list(lab[z]))
    # 4) 12.0-14.6 s: side by side
    from PIL import ImageDraw
    from reels import F
    c = Image.new('RGB', (W, H), CREAM); d = ImageDraw.Draw(c)
    for n, z in enumerate(sz):
        w = 320; x = 30 + n * (w + 25)
        c.paste(mos[z].resize((w, w), Image.LANCZOS), (x, 820))
        d.text((x + w / 2, 1190), lab[z][0], font=F, fill=(40, 40, 40), anchor='mm')
    sbs = boxtext(c, ['Which one would', 'you hang?'], top=420)
    sbs = boxtext(sbs, ['Comment 16, 20 or 30'], top=1320)
    o.add([sbs] * 78)
    # 5) 14.6-17.4 s: building at home (billo clip): bags, a brick on the tool, hands on the board
    o.add(clip(bil, 7.0, 0.8, t), ['You build it at home'])
    o.add(clip(bil, 9.0, 1.0, t), ['You build it at home'])
    o.add(clip(bil, 21.0, 3.0, t, speed=3), ['You build it at home'])
    # 6) 17.4-19.0 s: the finished piece held up
    o.add(clip(bil, 28.6, 1.6, t), ['Then you hang it'])
    # 7) 19.0-23.0 s: end card
    ec = endcard(mos['30x30'], 'More bricks, more detail', 'Compare sizes with your photo', 'Upload a photo to see your preview.', 'Start your design')
    o.add([ec] * 120)
    shutil.rmtree(t)
    return o.i


if __name__ == '__main__':
    which, fd, out = sys.argv[1], sys.argv[2], sys.argv[3]
    print(which, (reel_a if which == 'a' else reel_b)(fd, out), 'frames')
