"""Replace a portrait's plain background with a solid seamless color and soft vignette.

Usage: python3 scripts/rebackdrop.py <input> <output.png> <hex color>
"""
import sys

import numpy as np
from scipy import ndimage

from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove

src, out, color = sys.argv[1], sys.argv[2], sys.argv[3].lstrip('#')
base = tuple(int(color[i:i + 2], 16) for i in (0, 2, 4))
im = Image.open(src).convert('RGBA')
w, h = im.size
fig = remove(im, session=new_session('isnet-general-use'), alpha_matting=True)
# The figure must be fully opaque inside its outline: clothes the same color as the
# old backdrop can otherwise come out see-through. Fill holes in a solid mask, treating
# the bottom edge (where the torso is cropped) as part of the figure.
solid = np.array(fig.getchannel('A')) > 128
padded = np.pad(solid, ((0, 1), (0, 0)), constant_values=True)
padded[-1] = padded[-2] | padded[-1]
filled = ndimage.binary_fill_holes(padded)[:-1]
filled = ndimage.binary_opening(filled, iterations=2)
mask = Image.fromarray((filled * 255).astype('uint8'))
# Pull the edge in slightly so no fringe of the old backdrop color survives.
mask = mask.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
fig = im.copy()
fig.putalpha(mask)

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
