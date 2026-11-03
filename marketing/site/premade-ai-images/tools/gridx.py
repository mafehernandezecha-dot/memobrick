# generalized grid.py + cells2.py: src crop box, expected stud counts -> cells.npy + preview
import numpy as np, sys
from PIL import Image
src,box,nxe,nye,out=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4]),sys.argv[5]
x0,y0,x1,y1=[int(v) for v in box.split(',')]
rgb=np.asarray(Image.open(src).convert('RGB')).astype(float)[y0:y1,x0:x1]
L=rgb.mean(2)
def est(prof,guess):
    p=prof-prof.mean(); t=np.arange(len(p)); best=None
    for pitch in np.arange(guess*0.93,guess*1.07,0.005):
        z=np.sum(p*np.exp(-2j*np.pi*t/pitch)); c=abs(z)
        if best is None or c>best[0]: best=(c,pitch,np.angle(z))
    c,pitch,ph=best; off=(-ph/(2*np.pi))*pitch % pitch
    return pitch,off
H,W=L.shape
# use gradient-free profile: mean of luminance per column (stud highlights periodic)
def joint(px_,py_):
    best=None
    for g in np.arange(0.93,1.07,0.0005):
        tot=0; phs=[]
        for prof,pp in ((L.mean(0),px_*g),(L.mean(1),py_*g)):
            p=prof-prof.mean(); t=np.arange(len(p)); z=np.sum(p*np.exp(-2j*np.pi*t/pp)); tot+=abs(z)/np.sqrt(len(p)); phs.append(np.angle(z))
        if best is None or tot>best[0]: best=(tot,g,phs)
    _,g,phs=best; px=px_*g; py=py_*g
    return px,(-phs[0]/(2*np.pi))*px%px,py,(-phs[1]/(2*np.pi))*py%py
g0=min(W/nxe,H/nye)
px,ox,py,oy=joint(g0,g0)
# refine offsets: cell edges = where colour changes between neighbouring cells (fold gradient modulo pitch)
def edge_off(axis,pitch):
    a=rgb if axis==1 else rgb.transpose(1,0,2)
    gx=np.abs(np.diff(a,axis=1)).sum(2)          # gradient along axis
    # keep only big colour jumps (cell boundaries), ignore stud shading
    thr=np.percentile(gx,97); prof=(gx*(gx>thr)).sum(0)
    t=np.arange(len(prof))+0.5
    bins=np.zeros(int(round(pitch*4)))
    idx=((t%pitch)/pitch*len(bins)).astype(int)%len(bins)
    np.add.at(bins,idx,prof)
    bins=np.convolve(np.r_[bins,bins,bins],np.ones(5)/5,'same')[len(bins):2*len(bins)]
    e=(np.argmax(bins)+0.5)/len(bins)*pitch
    return (e+pitch/2)%pitch
ch=rgb-rgb.mean(2,keepdims=True)   # chroma only (ignore stud shading)
rng=np.random.default_rng(0)
nxx=int((W-px)//px); nyy=int((H-py)//py)
ci=rng.integers(0,nxx,600); cj=rng.integers(0,nyy,600)
def score(o_x,o_y):
    tot=0
    hw=max(1,int(px*0.32))
    for i,j in zip(ci,cj):
        cx=int(o_x+i*px); cy=int(o_y+j*py)
        p=ch[max(0,cy-hw):cy+hw+1, max(0,cx-hw):cx+hw+1].reshape(-1,3)
        tot+=p.std(0).sum()
    return tot
st=max(0.5,px/30)
best=min(((score(a,b),a,b) for a in np.arange(0,px,st) for b in np.arange(0,py,st)))
ox,oy=best[1],best[2]
# offset is the stud-bright point; cell centre ~ that point. bring first centre into [0,pitch)
nx=int(round((W-ox)/px+0.5)); ny=int(round((H-oy)/py+0.5))
nx=int((W-ox-px*0.5)//px+1); ny=int((H-oy-py*0.5)//py+1)
if abs(nx-nxe)<=1 and ox+(nxe-1)*px < W-px*0.3: nx=nxe
if abs(ny-nye)<=1 and oy+(nye-1)*py < H-py*0.3: ny=nye
print('pitch %.3f %.3f off %.2f %.2f cells %d x %d'%(px,py,ox,oy,nx,ny))
cols=np.zeros((ny,nx,3))
for j in range(ny):
  for i in range(nx):
    cx=ox+i*px; cy=oy+j*py; r=0.28
    patch=rgb[max(0,int(cy-py*r)):int(cy+py*r)+1, max(0,int(cx-px*r)):int(cx+px*r)+1].reshape(-1,3)
    lum=patch.mean(1); keep=patch[(lum>=np.percentile(lum,15))&(lum<=np.percentile(lum,80))]
    cols[j,i]=np.median(keep if len(keep) else patch,0)
np.save(out,cols)
Image.fromarray(cols.astype('uint8')).resize((nx*12,ny*12),Image.NEAREST).save(out.replace('.npy','_preview.png'))
# overlay check: draw sample centres on crop
ov=Image.fromarray(rgb.astype('uint8')).copy()
from PIL import ImageDraw
d=ImageDraw.Draw(ov)
for j in range(ny):
  for i in range(nx):
    cx=ox+i*px; cy=oy+j*py; d.point((cx,cy),fill=(255,0,0)) if False else d.rectangle((cx-1,cy-1,cx+1,cy+1),fill=(255,0,0))
ov.save(out.replace('.npy','_overlay.png'))
