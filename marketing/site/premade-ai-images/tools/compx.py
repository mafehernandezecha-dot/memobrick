import sys, numpy as np
from PIL import Image
scene, design, out = sys.argv[1:4]
im = Image.open(scene).convert('RGB'); a = np.asarray(im).astype(int)
g = (a[:,:,1] > 150) & (a[:,:,0] < 110) & (a[:,:,2] < 120)
ys, xs = np.where(g)
# robust bbox: rows/cols with many green pixels
rows = np.where(g.sum(1) > 0.5*g.sum(1).max())[0]; cols = np.where(g.sum(0) > 0.5*g.sum(0).max())[0]
x0,x1,y0,y1 = cols.min(), cols.max()+1, rows.min(), rows.max()+1
print('green box', x0,y0,x1,y1, x1-x0, y1-y0)
pad = 2
d = Image.open(design).convert('RGB').resize((x1-x0+2*pad, y1-y0+2*pad), Image.LANCZOS)
im.paste(d, (x0-pad, y0-pad))
# hide any green fringe left
a2 = np.asarray(im).astype(int); gg = (a2[:,:,1] > 150) & (a2[:,:,0] < 110) & (a2[:,:,2] < 120)
print('green left', int(gg.sum()))
im.save(out, quality=95)
# clean green fringe: pixels where green clearly dominates, within 12 px of the box -> frame black
a3 = np.asarray(im).astype(int)
fr = (a3[:,:,1] - np.maximum(a3[:,:,0], a3[:,:,2]) > 25)
mask = np.zeros_like(fr); mask[max(0,y0-12):y1+12, max(0,x0-12):x1+12] = True
inner = np.zeros_like(fr); inner[y0-pad:y1+pad, x0-pad:x1+pad] = True
fix = fr & mask & ~inner
a3[fix] = [28,28,28]
print('fringe fixed', int(fix.sum()))
Image.fromarray(a3.astype('uint8')).save(out, quality=95)
