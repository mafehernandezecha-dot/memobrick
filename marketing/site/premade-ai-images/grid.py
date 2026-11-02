import numpy as np, sys
from PIL import Image
src=sys.argv[1]
rgb=np.asarray(Image.open(src).convert('RGB')).astype(float); L=rgb.mean(2)
def est(prof):
    p=prof-prof.mean(); n=len(p)
    best=None
    for pitch in np.arange(20.0,26.0,0.01):
        t=np.arange(n); c=np.abs(np.sum(p*np.exp(-2j*np.pi*t/pitch)))
        if best is None or c>best[0]: best=(c,pitch,np.angle(np.sum(p*np.exp(-2j*np.pi*t/pitch))))
    c,pitch,ph=best; off=(-ph/(2*np.pi))*pitch % pitch
    return pitch,off
px,ox=est(L.mean(0)); py,oy=est(L.mean(1))
print('pitch',px,py,'offset',ox,oy)
# stud centers = brightest periodic point; cell centers same
nx=int((rgb.shape[1]-ox)//px+1); ny=int((rgb.shape[0]-oy)//py+1)
cols=np.zeros((ny,nx,3))
for j in range(ny):
  for i in range(nx):
    cx=ox+i*px; cy=oy+j*py
    # sample ring around stud edge-free: take patch at cell corner area (flat part), median
    x0=int(cx-px*0.45); x1=int(cx+px*0.45); y0=int(cy-py*0.45); y1=int(cy+py*0.45)
    patch=rgb[max(0,y0):y1, max(0,x0):x1].reshape(-1,3)
    if len(patch)==0: continue
    cols[j,i]=np.median(patch,0)
np.save('cells.npy',cols); print('cells',ny,nx)
Image.fromarray(cols.astype('uint8')).resize((nx*10,ny*10),Image.NEAREST).save('cells_preview.png')
