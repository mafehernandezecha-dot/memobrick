"""W49 builder (Nov 30 to Dec 6). Run with /usr/bin/python3.13 build49.py <stills|1130|1202|1204|all>.
Every bricked image is a MemoBrick Studio export (st/*_b.png). AI images are people, a dog and rooms only."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *
P = '/home/user/memobrick/marketing/social/planner/2026-W49/'
os.makedirs(P, exist_ok=True)
st = lambda n: cap(SC + '/st/' + n + '_b.png')
ph = lambda n: cap(SC + '/ph/' + n + '.png')
which = sys.argv[1]
T = SC + '/tmp49' + which
ORDER = 'Order by December 15 for Christmas.'


def wall_end(mos, iw, ih, cy=640):
    return frame_on(wall_bg(), mos, W // 2, cy, iw, ih)


def finish(o, pid):
    encode(o.d, P + pid + '.mp4'); preview(P + pid + '.mp4', P + pid + '-preview.jpg'); shutil.rmtree(o.d)


def grid(names, cell, gap=18):
    g = Image.new('RGB', (cell * 2 + gap, cell * 2 + gap), CREAM)
    for k, n in enumerate(names):
        g.paste(st(n).resize((cell, cell), Image.LANCZOS), ((k % 2) * (cell + gap), (k // 2) * (cell + gap)))
    return g


def kit_frame(t, out, size):
    tmp = SC + '/kitframe.png'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', VID['kit'], '-frames:v', '1', tmp], check=True)
    im = Image.open(tmp).convert('RGB')  # 1920x1080
    w, h = size; cw = round(1080 * w / h)
    x0 = max(0, min(1920 - cw, 980 - cw // 2))
    return im.crop((x0, 0, x0 + cw, 1080)).resize(size, Image.LANCZOS)


def text_on(img, out, headline, sub=None, button=None, place='top-left', light=False):
    tmp = out + '.tmp.png'; img.save(tmp)
    cmd = [sys.executable, '/home/user/memobrick/marketing/tools/add_text.py', tmp, out, '--headline', headline, '--place', place]
    if sub: cmd += ['--sub', sub]
    if button: cmd += ['--button', button]
    if light: cmd += ['--light']
    subprocess.run(cmd, check=True); os.remove(tmp)


if which in ('stills', 'all'):
    # Tue Dec 1: gift guide (gift collection)
    g = grid(['momdaughter', 'couple', 'siblings', 'golden'], 300)
    card_slide('One gift for everyone on your list', [('Their favorite photo, in 1×1 bricks', 'Mom, your partner, the grandparents, the dog lover. Swipe for ideas.')], 'Swipe', mos=g).save(P + 'S-20261201-1.png')
    g2 = grid(['momdaughter', 'couple', 'siblings', 'golden'], 300)
    card_slide('One gift for everyone on your list', [('Their favorite photo, in 1×1 bricks', 'Mom, your partner, the grandparents and the dog lover.')], None, size=(1000, 1500), mos=g2).save(P + 'S-20261201-1-pin.png')
    card_slide('Who is on your list?', [('For mom', 'The photo of you two she keeps asking you to send her.'), ('For your partner', 'Your favorite photo together, built from small 1×1 bricks.'), ('For the grandparents', 'The grandkids, cheek to cheek, ready for their wall.')], 'Swipe').save(P + 'S-20261201-1-2.png')
    card_slide('And the rest of the list', [('For the dog lover', 'Their dog, every whisker in bricks. Cats work too.'), ('For dad', 'A photo with the kids, and a project to build together.'), ('For the whole family', 'One photo, one kit, one afternoon building it together.')], 'Swipe').save(P + 'S-20261201-1-3.png')
    card_slide('Order by December 15', [('Get it before Christmas', 'Order by December 15 to receive it before Christmas.'), ('Free shipping', 'Free shipping on US orders of $125 or more.'), ('Want help?', 'Our designers can create it and send a free proof before production. Optional.')], 'Find their gift').save(P + 'S-20261201-1-4.png')
    shutil.copy(SC + '/st/couple_b.png', P + 'S-20261201-1-studio-couple.png')
    for n in ['momdaughter', 'siblings', 'golden']:
        shutil.copy(SC + '/st/%s_b.png' % n, P + 'S-20261201-1-studio-%s.png' % n)

    # Thu Dec 3: what's in the box (real kit footage)
    text_on(kit_frame(3.6, None, (1080, 1350)), P + 'S-20261203-1.png', "What's in the box?", 'Everything you need to build your photo.', 'Swipe')
    text_on(kit_frame(3.6, None, (1000, 1500)), P + 'S-20261203-1-pin.png', "What's in a photo mosaic kit?", 'Everything you need to build your photo.')
    card_slide('In every kit', [('1×1 bricks', 'Sorted in small labeled bags by color.'), ('Baseplates', 'White plates that join edge to edge.'), ('Your color map', 'Printed instructions made from your photo.'), ('The building tool', 'Frames are sold separately.')], 'Swipe').save(P + 'S-20261203-1-2.png')
    card_slide('Pick your size', [('16×16', '2,500 pieces, about 2.5 hours. $69.88'), ('20×20', '4,096 pieces, about 4 hours. $99.88. Our most ordered size.'), ('20×30', '6,144 pieces, about 6 hours. $149.00')], 'Swipe').save(P + 'S-20261203-1-3.png')
    card_slide('See yours before you order', [('Upload a photo', 'Preview your mosaic in the editor and pick a size.'), ('Order by December 15', 'Order by December 15 to receive it before Christmas.'), ('Free shipping', 'Free shipping on US orders of $125 or more.')], 'Start your design').save(P + 'S-20261203-1-4.png')

    # Sat Dec 5: a gift for mom (gift collection)
    scene_slide(SC + '/ph/room45.png', st('momdaughter'), (1080, 1350), 430, 560, 380, 380, 'A gift for mom', 'Your favorite photo of you two.', 'Swipe', P + 'S-20261205-1.png', place='top-left')
    scene_slide(SC + '/ph/room23.png', st('momdaughter'), (1000, 1500), 420, 640, 400, 400, 'A gift for mom', 'Your favorite photo of you two.', None, P + 'S-20261205-1-pin.png', place='top-left')
    card_slide('Why it works for mom', [('A photo she already loves', 'Pick one where your faces fill the frame.'), ('Built from 1×1 bricks', 'The kit has the bricks, baseplates, a color map and the tool. A 20×20 takes about 4 hours.'), ('See it before you order', 'Preview your mosaic in the editor. Frames are sold separately.')], 'Swipe').save(P + 'S-20261205-1-2.png')
    card_slide('Order by December 15', [('Get it before Christmas', 'Order by December 15 to receive it before Christmas.'), ('Free shipping', 'Free shipping on US orders of $125 or more.'), ('Want help?', 'Our designers can create it and send a free proof before production. Optional.')], 'Find her gift').save(P + 'S-20261205-1-3.png')
    shutil.copy(SC + '/st/momdaughter_b.png', P + 'S-20261205-1-studio-mosaic.png')

    # Sun Dec 6: order by Dec 15 (editor)
    sm = st('siblings').resize((520, 520), Image.LANCZOS)
    card_slide('Order by December 15', [('To get it before Christmas', 'Upload a photo today and see your mosaic before you order.')], 'Swipe', mos=sm).save(P + 'S-20261206-1.png')
    sm2 = st('siblings').resize((560, 560), Image.LANCZOS)
    card_slide('Order by December 15', [('To get it before Christmas', 'A custom brick mosaic of the photo they love.')], None, size=(1000, 1500), mos=sm2).save(P + 'S-20261206-1-pin.png')
    card_slide('How it works', [('1. Upload a photo', 'Faces up close, good light, a simple background.'), ('2. See your mosaic', 'Preview it in the editor and pick a size.'), ('3. Build it at home', 'The kit has the bricks, baseplates, a color map and the tool.')], 'Swipe').save(P + 'S-20261206-1-2.png')
    card_slide('Not sure which photo?', [('Want help?', 'Our designers can create it and send a free proof before production. Optional.'), ('Free shipping', 'Free shipping on US orders of $125 or more.'), ('Order by December 15', 'Order by December 15 to receive it before Christmas.')], 'Start your design').save(P + 'S-20261206-1-3.png')
    shutil.copy(SC + '/st/siblings_b.png', P + 'S-20261206-1-studio-mosaic.png')

if which in ('1130', 'all'):
    mos = st('couple'); p = ph('couple'); o = Out(SC + '/f1130')
    o.add(clip('press', 22, 1.3, T, x0=100), ['Cyber Monday', '20% off today'])
    o.hold(mosaic_on_cream(p, 860)[0], 1.0, ['Your favorite photo of you two'], top=190)
    o.add(wipe_frames(p, mos, 860, int(2.0 * FPS)), ['Becomes 1×1 bricks'], top=190)
    o.add(clip('kit', 3, 2.4, T, x0=500), ['The kit arrives'])
    o.add(clip('fill', 4, 8, T, speed=4, x0=300), ['You build it together'])
    wb = wall_end(mos, 600, 600, cy=900)
    o.add([push(wb, k, 75, 0.05) for k in range(75)], ['About 4 hours for a 20×20'], top=300)
    top = wall_end(mos, 560, 560, cy=600)
    o.hold(endcard(top, '20% off, today only', 'Code CYBERBRICK20', 'Ends 11:59 pm ET. Order by Dec 15.', 'Start your design', y1=1290), 4.5)
    finish(o, 'S-20261130-1'); shutil.copy(SC + '/st/couple_b.png', P + 'S-20261130-1-studio-mosaic.png')

if which in ('1202', 'all'):
    mos = st('golden'); p = ph('golden'); o = Out(SC + '/f1202')
    o.add(clip('press', 20, 1.5, T, x0=100), ['We brick your pet', 'Episode 5'])
    o.hold(mosaic_on_cream(p, 800)[0], 0.8, ['Their photo'])
    o.add(wipe_frames(p, mos, 800, int(2.0 * FPS)), ['Becomes bricks'])
    base, _ = mosaic_on_cream(mos, 800)
    o.add(zoom_frames(base, int(2.6 * FPS), 1, 4.0, 0.5, 0.40), ['Every whisker is a 1×1 brick'])
    o.add(clip('fill', 6, 6, T, speed=3, x0=300), ['Brick by brick'])
    wb = wall_end(mos, 480, 720, cy=900)
    o.add([push(wb, k, 75, 0.05) for k in range(75)], ['Ready for Christmas'], top=300)
    top = wall_end(mos, 440, 660, cy=600)
    o.hold(endcard(top, 'Your pet, in bricks', 'Follow for Episode 6', ORDER, 'Start your design', y1=1290), 4)
    finish(o, 'S-20261202-1'); shutil.copy(SC + '/st/golden_b.png', P + 'S-20261202-1-studio-mosaic.png')

if which in ('1204', 'all'):
    mos = st('dadgirl'); p = ph('dadgirl'); o = Out(SC + '/f1204')
    o.add(clip('press', 18, 1.4, T, x0=100), ['Guess the photo Friday', 'Episode 5'])
    base, _ = mosaic_on_cream(mos, 1000)
    z = zoom_frames(base, int(5.0 * FPS), 10.0, 1.0, 0.36, 0.45)
    o.add(z[:int(2.5 * FPS)], ['A, B or C?', 'A: a grandma', 'B: dad and daughter', 'C: a puppy'], top=230)
    o.add(z[int(2.5 * FPS):], ['Comment your guess'], top=230)
    o.hold(base, 1.2, ['It is B: dad and daughter'], top=230)
    o.add(wipe_frames(mos, p, 860, int(1.6 * FPS)), ['The photo behind it'], top=190)
    o.add(clip('press', 2, 2.4, T, x0=100), ['Built from 1×1 bricks'])
    top = wall_end(mos, 560, 560, cy=600)
    o.hold(endcard(top, 'A gift for dad', 'New guess every Friday', ORDER, 'Start your design', y1=1290), 4)
    finish(o, 'S-20261204-1'); shutil.copy(SC + '/st/dadgirl_b.png', P + 'S-20261204-1-studio-mosaic.png')
