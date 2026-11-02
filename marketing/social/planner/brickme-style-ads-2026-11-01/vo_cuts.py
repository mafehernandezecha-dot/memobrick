#!/usr/bin/env python3
"""A3 pet ad with voice-over (2026-11-02), after Eden: "make it more human, best practices for the text".

One edit per voice (voice/vo_881.wav, vo_886.wav, vo_564.wav), each in 4:5 and 9:16. Shots are cut to the
phrases in voice/vo_cues.json so the picture matches the words, and each phrase's caption shows from its
start until the next phrase starts (one caption at a time, no blinking gaps). The hook caption is on
screen from frame 1.

Same cleared footage and rules as cuts_v2.py (imported): no frame interpolation (a held moment repeats one
real frame), no warping (zooms crop the output's own shape and scale evenly), real product only.

Captions: dark text on a white card, 76 px, key word in brand coral. 4:5 card in the upper middle.
9:16 card between 14% and 65% of the height (Reels UI safe zone); there the zoom is anchored at the top
and never below 1.14x, so the old caption band of the source reel (y 243 to 431) always sits under the card.

Audio: voice high-passed at 90 Hz and lightly compressed, up front; original music (compose.py playful)
ducked to 20% under the voice, 45% on the end card while the last phrase plays, full after it; whole mix normalized to -14 LUFS, -1.5 dBTP.

Usage: python3 vo_cuts.py <out dir>
"""
import os, sys, json, subprocess, shutil, tempfile
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import cuts_v2 as c2   # noqa: E402

VOICE = os.path.join(HERE, 'voice')
COMPOSE = os.path.join(c2.REPO, 'marketing/social/publisher/music/compose.py')
FPS = c2.FPS
PET = c2.PET
KEY = {
    'Wait… is that her dog?': 'dog?',
    'In bricks?!': 'bricks?!',
    'Yep. Real bricks.': 'Real bricks.',
    'It started with one photo': 'one photo',
    'We sent the kit': 'kit',
    'She built it': 'built',
    'Now it hangs next to the real one': 'real one',
    'Want to see yours?': 'yours?',
}


def wrap(text, f, maxw, d):
    """One line if it fits, else the most balanced two-line split (no lone word on a line)."""
    if d.textlength(text, font=f) <= maxw:
        return [text]
    w = text.split(' ')
    best = min(range(1, len(w)), key=lambda i: max(d.textlength(' '.join(w[:i]), font=f),
                                                   d.textlength(' '.join(w[i:]), font=f)))
    return [' '.join(w[:best]), ' '.join(w[best:])]


def caption_layer(size, text, cy, min_w=0, min_h=0, px=76):
    W, H = size
    f = c2.font(px)
    d0 = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    lines = wrap(text, f, 640, d0)
    lh = round(px * 1.25)
    tw = max(d0.textlength(l, font=f) for l in lines)
    cw, ch = max(tw + 96, min_w), max(len(lines) * lh + 64, min_h)
    box = (W / 2 - cw / 2, cy - ch / 2, W / 2 + cw / 2, cy + ch / 2)
    layer = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((box[0] + 6, box[1] + 10, box[2] + 6, box[3] + 10), radius=30, fill=(0, 0, 0, 70))
    d.rounded_rectangle(box, radius=30, fill=(255, 255, 255, 255))
    key = KEY.get(text, '')
    kstart = text.find(key) if key else -1
    kend = kstart + len(key)
    pos = 0
    y = cy - len(lines) * lh / 2 + lh / 2
    for line in lines:
        x = W / 2 - d.textlength(line, font=f) / 2
        start = text.find(line, pos)
        for i, ch_ in enumerate(line):
            gi = start + i
            col = c2.CORAL if kstart <= gi < kend else c2.INK
            d.text((x, y), ch_, font=f, fill=col, anchor='lm')
            x += d.textlength(line[:i + 1], font=f) - d.textlength(line[:i], font=f)
        pos = start + len(line)
        y += lh
    return layer


def apply(frames, layer):
    out = []
    for fr in frames:
        c = fr.convert('RGBA'); c.alpha_composite(layer); out.append(c.convert('RGB'))
    return out


def endcard(img, n, size):
    """Bright end card. In 9:16 all text stays above 65% of the height (Reels UI)."""
    if size[1] < 1500:
        return c2.endcard(img, n, size)
    W, H = size
    side, top = 640, 290
    im = img.copy()
    s = max(side / im.width, side / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((l, t, l + side, t + side))
    base = Image.new('RGB', size, c2.CREAM)
    mask = Image.new('L', (side, side), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, side - 1, side - 1), 24, fill=255)
    base.paste(im, ((W - side) // 2, top), mask)
    d = ImageDraw.Draw(base)
    y = top + side + 80
    d.text((W / 2, y), 'See your photo in bricks', font=c2.font(76), fill=c2.INK, anchor='mm')
    pf = c2.font(64); pw = d.textlength('Free preview', font=pf); py = y + 125
    d.rounded_rectangle((W / 2 - pw / 2 - 56, py - 54, W / 2 + pw / 2 + 56, py + 54), radius=54, fill=c2.CORAL)
    d.text((W / 2, py), 'Free preview', font=pf, fill=(255, 255, 255), anchor='mm')
    d.text((W / 2, py + 100), 'mymemobrick.com', font=c2.font(50), fill=(70, 70, 70), anchor='mm')
    return c2.zoom([base] * n, 1.0, 1.03)


def build(vo, size):
    cues = json.load(open(os.path.join(VOICE, 'vo_cues.json')))[vo]['cues']
    total = round((float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                                                   '-of', 'csv=p=0', os.path.join(VOICE, f'vo_{vo}.wav')])) + 0.5) * FPS)
    starts = [0] + [round(c['start'] * FPS) for c in cues[1:]] + [total]
    lens = [starts[i + 1] - starts[i] for i in range(len(cues))]
    v = size[1] > 1500
    win = (lambda y: c2.R916) if v else c2.R45
    if v:   # anchored at the top, never below 1.14x: the old caption band stays under the card
        Z = lambda fr, z0, z1, cy=0.5: c2.zoom(fr, 1.14 + (z0 - 1), 1.14 + (z1 - 1), cy=0.0)
        cap = lambda t: caption_layer(size, t, cy=420, min_w=820, min_h=290)
    else:
        Z = c2.zoom
        cap = lambda t: caption_layer(size, t, cy=330)
    vid = lambda ss, n, y=470: c2.video(PET, ss, n, win(y), size)

    def split(n, a):   # first part a of n frames
        return min(n - 1, a), n - min(n - 1, a)

    shots = []
    # 0 "Wait... is that her dog?": the woman hugging her real dog (face), punch-in; caption from frame 1
    shots.append(Z(vid(9.5, lens[0], 440), 1.0, 1.14, cy=0.3))
    # 1 "In bricks?!": white flash to the framed mosaic (0.55 s of real footage, then its last frame held)
    shots.append(c2.flash(Z(vid(8.9, lens[1], 440), 1.04, 1.2)))
    # 2 "Yep. Real bricks.": macro of the studs, a finger pressing a brick
    shots.append(Z(vid(0.0, lens[2]), 1.0, 1.1))
    # 3 "It started with one photo": the printed color map of her dog's photo
    m = vid(3.4, min(lens[3], 22))                      # the map is on screen 3.4 to 4.15 s
    shots.append(Z(m + [m[-1]] * (lens[3] - len(m)), 1.0, 1.14))   # then its last real frame is held
    # 4 "We sent the kit": the color-sorted bags
    shots.append(Z(vid(2.4, lens[4]), 1.1, 1.0))
    # 5 "She built it": hands pressing bricks onto the board (already 4x in the source reel)
    shots.append(Z(vid(4.45, lens[5]), 1.0, 1.1))
    # 6 "Now it hangs next to the real one": the framed piece on the wall, then the real dog
    a, b = split(lens[6], 18)
    shots.append(Z(vid(8.9, a, 440), 1.0, 1.08) + Z(vid(9.65, b, 440), 1.0, 1.12, cy=0.35))
    # 7 "Want to see yours?": the mosaic close, studs filling the frame
    shots.append(Z(vid(1.2, lens[7]), 1.06, 1.18))
    # 8 the last phrase: bright end card (its text is the caption)
    end_img = c2.video(PET, 8.95, 1, (1080, 1920, 0, 0), (1080, 1920))[0].crop(c2.FRAMED_BOX)
    frames = []
    for i, (cue, sh) in enumerate(zip(cues, shots)):
        frames += apply(sh, cap(cue['caption']))
    frames += endcard(end_img, lens[8], size)
    assert len(frames) == total, (len(frames), total)
    return frames, total / FPS, starts[8] / FPS


def mix(vo, video_path, dur, end_t, out):
    vend = json.load(open(os.path.join(VOICE, 'vo_cues.json')))[vo]['cues'][-1]['end']
    tmp = tempfile.mkdtemp()
    music = os.path.join(tmp, 'm.wav')
    subprocess.run(['python3', COMPOSE, 'playful', str(dur + 1), music, str(3000 + (int(vo) if vo.isdigit() else sum(map(ord, vo))))], check=True,
                   capture_output=True)
    fc = (f"[0:a]aresample=44100,highpass=f=90,acompressor=threshold=-20dB:ratio=3:attack=5:release=120:makeup=2,"
          f"loudnorm=I=-16:TP=-2,aresample=44100,apad,atrim=0:{dur}[v];"
          f"[1:a]aresample=44100,atrim=0:{dur},loudnorm=I=-16:TP=-2,aresample=44100,"
          f"volume='if(lt(t,{end_t}),0.2,if(lt(t,{vend}),min(0.45,0.2+(t-{end_t})/0.3*0.25),min(1,0.45+(t-{vend})/0.15*0.55)))':eval=frame,"
          f"afade=t=in:d=0.2,afade=t=out:st={dur - 0.35}:d=0.35[m];"
          f"[v][m]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(VOICE, f'vo_{vo}.wav'), '-i', music,
                    '-i', video_path, '-filter_complex', fc, '-map', '2:v', '-map', '[a]', '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], check=True)
    shutil.rmtree(tmp)


def render(vo, size, out):
    tag = '9x16' if size[1] > 1500 else '4x5'
    name = f'A3-pet-vo{vo}-{tag}'
    frames, dur, end_t = build(vo, size)
    tmp = tempfile.mkdtemp()
    silent = os.path.join(tmp, 's.mp4')
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s',
                            f'{size[0]}x{size[1]}', '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '22',
                            '-preset', 'slow', '-pix_fmt', 'yuv420p', silent], stdin=subprocess.PIPE)
    for f in frames:
        enc.stdin.write(f.tobytes())
    enc.stdin.close(); enc.wait()
    mp4 = os.path.join(out, name + '.mp4')
    mix(vo, silent, dur, end_t, mp4)
    shutil.rmtree(tmp)
    # short contact sheet: the middle frame of each phrase's shot
    cues = json.load(open(os.path.join(VOICE, 'vo_cues.json')))[vo]['cues']
    ts = [0.05] + [(cues[i]['start'] + (cues[i + 1]['start'] if i + 1 < len(cues) else dur)) / 2 for i in range(1, len(cues))]
    sel = '+'.join(f'eq(n\\,{round(t * FPS)})' for t in ts)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp4, '-vf', f"select='{sel}',scale=240:-2,tile={len(ts)}x1",
                    '-vsync', '0', '-frames:v', '1', os.path.join(out, name + '-sheet.png')], check=True)
    print(f'{mp4}  {dur:.2f}s  {os.path.getsize(mp4) / 1e6:.1f} MB')


if __name__ == '__main__':
    out = os.path.abspath(sys.argv[1])
    os.makedirs(out, exist_ok=True)
    for vo in (os.environ.get('VOS') or '881,886,564').split(','):
        for size in (c2.S45, c2.S916):
            render(vo, size, out)
