# global colour match of gemini photo back toward the exact render (60/40), per-channel mean/std in Lab-ish RGB
import numpy as np, sys
from PIL import Image
gem, ref, out = sys.argv[1:4]
g=np.asarray(Image.open(gem).convert('RGB')).astype(float)
r=np.asarray(Image.open(ref).convert('RGB').resize((g.shape[1],g.shape[0]),Image.LANCZOS)).astype(float)
m=(g-g.mean((0,1)))/(g.std((0,1))+1e-6)*r.std((0,1))+r.mean((0,1))
o=np.clip(0.6*m+0.4*g,0,255).astype('uint8')
Image.fromarray(o).save(out,quality=92); print('saved',out,o.shape)
