#!/usr/bin/env python3
"""Rough cuts for the Brick Me style ad plan (2026-11-01). Local review only, never posted.

Rules kept (Eden's distortion complaint):
- No frame interpolation: clips run at real speed, or faster by dropping frames.
- Aspect ratio always kept: only crops and uniform scales, never a stretch.
- Every brick on screen is real built product filmed in the cleared Drive library.

Sources:
- NEW: 5e8c35f05ec14e9a833219ddf20a1784.MOV (Drive 1rreKRggm1S7j1I8Ctz-4HVr4Q2aBa9fn), overhead build
  timelapse of a couple portrait, 640x1138 with a 640x848 picture inside black bars.
- Already cleared and reviewed clips, taken from our own committed reels because the Drive library is
  owner-only today and the source files are over the connector's 10 MB limit. The upper text band
  (y < 470 px) of those reels is cropped away, so no old caption shows:
  - S-20261030-2-v3.mp4: billo-276825-orig (Drive 1kF6KYcVmMG9iK9fxVC7NDngkgh-dHDTD) and
    MEMOBRICK_video_original_463981 2 (Drive 19BL-wPltl_f3n6e8vSVM4zOo3aFazmz5).
  - S-20261029-2-v3.mp4: Pink Butters raw (Drive 1th9iw6q12MJYTzx6Weq3I09bO47wJhB9) and
    Video Jun 02 shih tzu (Drive 1mkFJcWG-ceCM7p9oN415YEBtmP6ATSXK).

Usage: python3 cuts.py <path to 5e8c35f05ec14e9a833219ddf20a1784.MOV> <out dir>
"""
import os, subprocess, sys, shutil

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'))
SPRINT = os.path.join(REPO, 'marketing/social/planner/sprint-2026-10-29')
COUPLE = os.path.join(SPRINT, 'S-20261030-2-v3.mp4')
PET = os.path.join(SPRINT, 'S-20261029-2-v3.mp4')
MUSIC = os.path.join(REPO, 'marketing/social/publisher/music/add-music.sh')
FONT = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
W, H, FPS = 1080, 1350, 30
REEL_CROP = 'crop=1080:1350:0:470'                       # 9:16 reel -> 4:5, below the old text band
NEW_FIT = 'crop=640:848:0:146,scale=1080:1431:flags=lanczos,crop=1080:1350:0:40'  # uniform 1.6875x


def esc(s):
    return s.replace('\\', '\\\\').replace("'", "’").replace(':', '\\:').replace(',', '\\,').replace('%', '\\%')


def text(lines, top=90, size=50):
    """White Inter Bold lines on a translucent dark box, upper part of the frame."""
    f = []
    for i, l in enumerate(lines):
        f.append(f"drawtext=fontfile={FONT}:text='{esc(l)}':fontsize={size}:fontcolor=white:"
                 f"box=1:boxcolor=black@0.55:boxborderw=18:x=(w-text_w)/2:y={top + i * (size + 40)}")
    return ','.join(f)


def run(args):
    subprocess.run(['ffmpeg', '-v', 'error', '-y'] + args, check=True)


class Cut:
    def __init__(self, out, name):
        self.tmp = os.path.join(out, '_tmp_' + name)
        os.makedirs(self.tmp, exist_ok=True)
        self.segs, self.out, self.name = [], out, name

    def seg(self, src, ss, dur, base, lines=None, speed=1.0):
        p = os.path.join(self.tmp, f'{len(self.segs):02d}.mp4')
        vf = base + (f',setpts=PTS/{speed}' if speed != 1 else '') + f',fps={FPS}'
        if lines:
            vf += ',' + text(lines)
        run(['-ss', str(ss), '-t', str(dur * speed), '-i', src, '-vf', vf + ',format=yuv420p', '-an',
             '-c:v', 'libx264', '-crf', '18', '-r', str(FPS), p])
        self.segs.append(p)

    def still(self, src, at, dur, base, lines, extra=''):
        """A held real frame (no motion), with text; optional extra filters such as a dark overlay."""
        png = os.path.join(self.tmp, f'still{len(self.segs):02d}.png')
        run(['-ss', str(at), '-i', src, '-frames:v', '1', '-vf', base, png])
        p = os.path.join(self.tmp, f'{len(self.segs):02d}.mp4')
        vf = (extra + ',' if extra else '') + text(lines, top=lines_top(lines)) + ',format=yuv420p'
        run(['-loop', '1', '-t', str(dur), '-i', png, '-vf', vf, '-r', str(FPS), '-c:v', 'libx264', '-crf', '18', p])
        self.segs.append(p)

    def pushin(self, src, at, dur, base, lines, zmax=1.3, cx=0.5, cy=0.45):
        """Slow push-in on a real frame: the frame is upscaled 3x once, then cropped smaller each frame
        with the same 4:5 shape and scaled back, so nothing is stretched."""
        png = os.path.join(self.tmp, f'push{len(self.segs):02d}.png')
        run(['-ss', str(at), '-i', src, '-frames:v', '1', '-vf', base + ',scale=3240:4050:flags=lanczos', png])
        p = os.path.join(self.tmp, f'{len(self.segs):02d}.mp4')
        n = int(dur * FPS)
        z = f"1+({zmax}-1)*on/{n}"
        vf = (f"zoompan=z='{z}':x='(iw-iw/zoom)*{cx}':y='(ih-ih/zoom)*{cy}':d={n}:s={W}x{H}:fps={FPS},"
              + text(lines) + ',format=yuv420p')
        run(['-i', png, '-vf', vf, '-frames:v', str(n), '-c:v', 'libx264', '-crf', '18', p])
        self.segs.append(p)

    def finish(self, mood, seed):
        lst = os.path.join(self.tmp, 'list.txt')
        with open(lst, 'w') as f:
            f.writelines(f"file '{s}'\n" for s in self.segs)
        silent = os.path.join(self.tmp, 'silent.mp4')
        run(['-f', 'concat', '-safe', '0', '-i', lst, '-c:v', 'libx264', '-crf', '24', '-preset', 'slow',
             '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent])
        mp4 = os.path.join(self.out, self.name + '.mp4')
        subprocess.run(['sh', MUSIC, mood, silent, mp4, str(seed)], check=True)
        d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                           '-of', 'csv=p=0', mp4]))
        run(['-i', mp4, '-vf', f'fps=12/{d},scale=270:-2,tile=6x2', '-frames:v', '1',
             os.path.join(self.out, self.name + '-sheet.png')])
        shutil.rmtree(self.tmp)
        return mp4, d


def lines_top(lines):
    return 1350 - 140 - len(lines) * 90


END = ['See your photo in bricks', 'Free photo preview', 'mymemobrick.com']
DIM = 'drawbox=x=0:y=0:w=iw:h=ih:color=black@0.25:t=fill'


def cut_fill(new, out):
    """Ad 1: Look closer + watch it fill (Brick Me #2), couple angle, 4:5, about 15 s."""
    c = Cut(out, 'A1-look-closer-fill-4x5')
    c.pushin(new, 9.5, 2.0, NEW_FIT, ['Look closer'], zmax=1.35, cx=0.3, cy=0.4)   # the finished couple, into the bricks
    c.seg(new, 0.0, 1.2, NEW_FIT, ['Watch their photo fill in'])
    c.seg(new, 1.2, 4.3, NEW_FIT, ['Then 1×1 bricks', 'fill in their photo'])
    c.seg(new, 5.5, 4.1, NEW_FIT, ['Brick by brick'])
    c.still(new, 9.5, 3.4, NEW_FIT, END, extra=DIM)
    return c.finish('warm', 1101)


def cut_kit(new, out):
    """Ad 2: How it works, building at home (Brick Me #6 and #7), family and couple gift angle, 4:5."""
    c = Cut(out, 'A2-family-build-at-home-4x5')
    c.seg(COUPLE, 17.4, 1.6, 'crop=1080:1350:0:360', ['A family photo', 'in 1×1 bricks'])            # she holds up the mosaic
    c.seg(COUPLE, 0.0, 2.0, REEL_CROP, ['Couples, families, pets'])                    # couple's finished mosaic
    c.seg(COUPLE, 14.6, 0.8, REEL_CROP, ['The kit comes sorted by color'])              # color-sorted bags
    c.seg(COUPLE, 15.4, 1.0, REEL_CROP, ['Bricks, baseplates and a tool'])                # brick on the tool
    c.seg(COUPLE, 16.4, 1.0, REEL_CROP, ['You build it at home'])                       # hands on the board
    c.seg(new, 1.2, 4.0, NEW_FIT, ['Brick by brick'], speed=2)                          # 2x by dropping frames
    c.seg(new, 9.2, 0.4, NEW_FIT, ['Brick by brick'])
    c.still(new, 9.5, 3.4, NEW_FIT, END, extra=DIM)
    return c.finish('warm', 1102)


def cut_pet(out):
    """Ad 3: Pet push-in (Brick Me #2 and #9), pet angle, 4:5, about 13 s."""
    c = Cut(out, 'A3-pet-bricks-first-4x5')
    c.seg(PET, 0.0, 2.4, REEL_CROP, ['Your pet, in 1×1 bricks'])                        # finger presses a brick
    c.seg(PET, 6.9, 2.0, REEL_CROP, ['Any pet, any fur'])                               # shih tzu macro
    c.seg(PET, 2.4, 2.0, REEL_CROP, ['Their photo becomes a kit'])                      # bags, color map
    c.seg(PET, 4.4, 1.0, REEL_CROP, ['Brick by brick'])                                 # build, already sped up 4x
    c.seg(PET, 8.9, 2.5, 'crop=1080:1350:0:440', ['Then meet the real one'])            # framed piece, the real dog
    c.still(PET, 11.3, 3.0, 'crop=1080:1350:0:440', END, extra=DIM)
    return c.finish('playful', 1103)


if __name__ == '__main__':
    new, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    os.makedirs(out, exist_ok=True)
    for f in (lambda: cut_fill(new, out), lambda: cut_kit(new, out), lambda: cut_pet(out)):
        mp4, d = f()
        print(f'{mp4}  {d:.1f}s  {os.path.getsize(mp4) / 1e6:.1f} MB')
