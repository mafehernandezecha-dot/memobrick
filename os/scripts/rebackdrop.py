"""Replace a portrait's plain background with a solid seamless color and soft vignette.

Usage: python3 scripts/rebackdrop.py <input> <output.png> <hex color>
"""
import sys

from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove

src, out, color = sys.argv[1], sys.argv[2], sys.argv[3].lstrip('#')
base = tuple(int(color[i:i + 2], 16) for i in (0, 2, 4))
im = Image.open(src).convert('RGBA')
w, h = im.size
fig = remove(im, session=new_session('isnet-general-use'), alpha_matting=True)

# Backdrop: lighter center, darker edges, like the studio shots.
light = tuple(min(255, int(c * 1.12 + 10)) for c in base)
dark = tuple(int(c * 0.72) for c in base)
bg = Image.new('RGBA', (w, h), dark + (255,))
glow = Image.new('L', (w, h), 0)
ImageDraw.Draw(glow).ellipse([-w * 0.15, -h * 0.25, w * 1.15, h * 1.05], fill=255)
glow = glow.filter(ImageFilter.GaussianBlur(w * 0.18))
bg = Image.composite(Image.new('RGBA', (w, h), light + (255,)), bg, glow)
mid = Image.new('RGBA', (w, h), base + (255,))
bg = Image.blend(bg, mid, 0.35)
bg.alpha_composite(fig)
bg.convert('RGB').resize((1024, 1024), Image.LANCZOS).save(out)
print('wrote', out)
