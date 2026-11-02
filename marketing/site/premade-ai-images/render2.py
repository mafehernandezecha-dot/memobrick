import numpy as np, sys
from PIL import Image, ImageFilter
cells=np.load(sys.argv[1]).astype(float)[1:]; out=sys.argv[2]; P=int(sys.argv[3]) if len(sys.argv)>3 else 64
ny,nx,_=cells.shape
y,x=np.mgrid[0:P,0:P]+0.5; u=(x-P/2)/(P/2); v=(y-P/2)/(P/2)
r=np.hypot(u,v); R=0.60
edge=np.minimum.reduce([x,y,P-x,P-y])
# brick top surface
surf=np.ones((P,P))*0.97
surf*=np.clip(0.55+edge/2.2,0.55,1.0)            # seam + ambient occlusion near edges
# soft stud shadow toward bottom-right
d=np.hypot(u-0.16,v-0.20)
shadow=1-0.28*np.clip((R+0.22-d)/0.22,0,1)
surf*=np.where(r<R,1,shadow)
# stud: flat top a touch brighter, bevel rim lit top-left, dark bottom-right
ang=np.arctan2(v,u)                       # light dir from (-1,-1)
lit=np.cos(ang-(-3*np.pi/4))              # 1 at top-left
rimband=(r>R-0.10)&(r<R)
stud=np.where(r<R,1.03,0)+np.where(rimband,0.16*lit,0)
shade=np.where(r<R,stud,surf)
spec=np.where(rimband&(lit>0.6),0.18*(lit-0.6)/0.4,0)   # thin glossy glint on the rim
# anti-alias the stud edge
aa=np.clip((R-r)*P/2+0.5,0,1)
shade=aa*np.where(r<R+1,stud if False else np.where(rimband|(r<R),stud,surf),surf)+(1-aa)*surf
H=ny*P; W=nx*P; img=np.zeros((H,W,3))
for j in range(ny):
  for i in range(nx):
    img[j*P:(j+1)*P,i*P:(i+1)*P]=cells[j,i]*shade[...,None]+255*spec[...,None]
# global soft light from top-left + slight gloss
gy,gx=np.mgrid[0:H,0:W]; glob=1.04-0.08*((gx/W)+(gy/H))/2
img*=glob[...,None]
img=np.clip(img+np.random.default_rng(1).normal(0,1.2,img.shape),0,255).astype('uint8')
Image.fromarray(img).save(out); print(out,img.shape)
