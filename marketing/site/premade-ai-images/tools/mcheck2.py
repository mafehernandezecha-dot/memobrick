# compare per-cell colours: exact render vs the mosaic found inside the dark frame of the main photo
import numpy as np, sys
from PIL import Image
render, main, nx, ny = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
R=np.asarray(Image.open(render).convert('RGB')).astype(float)
B=np.asarray(Image.open(main).convert('RGB')).astype(float); H,W,_=B.shape
L=B.mean(2); dark=L<55
rows=np.where(dark.mean(1)>0.25)[0]; cols=np.where(dark.mean(0)>0.25)[0]
oy0,oy1,ox0,ox1=rows.min(),rows.max(),cols.min(),cols.max()
def cells(I,x0,y0,x1,y1):
    pw=(x1-x0)/nx; ph=(y1-y0)/ny; c=np.zeros((ny,nx,3)); r=max(1,pw*0.22)
    for j in range(ny):
        for i in range(nx):
            cx=x0+(i+.5)*pw; cy=y0+(j+.5)*ph
            c[j,i]=np.median(I[int(cy-r):int(cy+r)+1,int(cx-r):int(cx+r)+1].reshape(-1,3),0)
    return c
ref=cells(R,0,0,R.shape[1],R.shape[0])
best=None
for t in range(0,int(0.06*W),2):
  for dt in (-4,-2,0,2,4):
    b=cells(B,ox0+t,oy0+t+dt,ox1-t,oy1-t+dt)
    d=np.sqrt(((ref-b)**2).sum(2)); s=np.median(d)
    if best is None or s<best[0]: best=(s,t,dt,d)
s,t,dt,d=best
print('frame box',ox0,oy0,ox1,oy1,'inset',t,dt,'| cell dist mean %.1f median %.1f p90 %.1f frac>60 %.3f'%(d.mean(),np.median(d),np.percentile(d,90),(d>60).mean()))
