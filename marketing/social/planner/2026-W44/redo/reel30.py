import numpy as np, cv2, math
from PIL import Image, ImageDraw, ImageFont
F=ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf',69)
m=cv2.imread('out/S-20261030-1-studio-mosaic.png')            # 1216x1824 Studio export, 20x30
W,H=1080,1920; S=3                                              # build the canvas at 3x for crisp macro shots
cw,ch=W*S,H*S
mw=cw; mh=round(m.shape[0]*mw/m.shape[1])                      # fit width
canvas=np.full((ch,cw,3),(238,246,251),np.uint8)               # cream (BGR)
y0=(ch-mh)//2
canvas[y0:y0+mh]=cv2.resize(m,(mw,mh),interpolation=cv2.INTER_CUBIC)
# cat's nose in the mosaic (fraction of the mosaic), where the macro starts
nx,ny=0.50,0.40
sx,sy=nx*cw, y0+ny*mh
def frame(z,cx,cy):
    vw,vh=cw/z,ch/z
    cx=min(max(cx,vw/2),cw-vw/2); cy=min(max(cy,vh/2),ch-vh/2)
    x0=int(round(cx-vw/2)); y0c=int(round(cy-vh/2)); w=int(round(vw)); h=int(round(vh))
    x0=min(max(x0,0),cw-w); y0c=min(max(y0c,0),ch-h)
    c=canvas[y0c:y0c+h,x0:x0+w]
    return cv2.resize(c,(W,H),interpolation=cv2.INTER_AREA if w>W else cv2.INTER_CUBIC)
def text(img,lines,top=228):
    im=Image.fromarray(cv2.cvtColor(img,cv2.COLOR_BGR2RGB)).convert('RGBA')
    ov=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(ov); y=top
    for ln in lines:
        tw=d.textlength(ln,font=F); bx=round((W-tw)/2)-26
        d.rectangle((bx,y,bx+round(tw)+52,y+110),fill=(0,0,0,128)); y+=117
    im=Image.alpha_composite(im,ov); d=ImageDraw.Draw(im); y=top
    for ln in lines:
        d.text((W/2,y+55),ln,font=F,fill=(255,255,255,255),anchor='mm'); y+=117
    return cv2.cvtColor(np.array(im.convert('RGB')),cv2.COLOR_RGB2BGR)
Z0=4.0   # start: 4x the full view
N=195
for i in range(1,271):
    if i<=N:
        t=(i-1)/(N-1); e=t*t*(3-2*t)
        z=math.exp(math.log(Z0)*(1-e)+math.log(1)*e)
        z=max(z,1.0)
        cx=sx+(cw/2-sx)*e; cy=sy+(ch/2-sy)*e
        img=frame(z,cx,cy)
    else:
        img=frame(1.0,cw/2,ch/2)
    lines=['Guess the photo','Friday'] if i<=97 else (['What is it?'] if i<=195 else ['A cat, in 1×1 bricks'])
    cv2.imwrite('v30/%04d.png'%i,text(img,lines))
