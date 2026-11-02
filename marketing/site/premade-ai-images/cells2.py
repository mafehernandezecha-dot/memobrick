import numpy as np, sys
from PIL import Image
src=sys.argv[1]; px,py,ox,oy=[float(v) for v in sys.argv[2:6]]
rgb=np.asarray(Image.open(src).convert('RGB')).astype(float)
nx=int((rgb.shape[1]-ox)//px+1); ny=int((rgb.shape[0]-oy)//py+1)
cols=np.zeros((ny,nx,3))
for j in range(ny):
  for i in range(nx):
    cx=ox+i*px; cy=oy+j*py
    r=0.28
    patch=rgb[int(cy-py*r):int(cy+py*r)+1, int(cx-px*r):int(cx+px*r)+1].reshape(-1,3)
    if len(patch)==0: continue
    lum=patch.mean(1); keep=patch[(lum>np.percentile(lum,15))&(lum<np.percentile(lum,80))]
    cols[j,i]=np.median(keep if len(keep) else patch,0)
# k-means palette
X=cols.reshape(-1,3); K=int(sys.argv[6]) if len(sys.argv)>6 else 0
snap=cols
np.save('cells.npy',snap); print(ny,nx)
Image.fromarray(snap.astype('uint8')).resize((nx*10,ny*10),Image.NEAREST).save('cells_preview.png')
