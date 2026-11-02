import numpy as np, sys
from PIL import Image, ImageFilter, ImageDraw
src=sys.argv[1]; mode=sys.argv[2]; out=sys.argv[3]
im=Image.open(src).convert('RGB')
def coeffs(pa,pb):
    A=[];B=[]
    for (x,y),(X,Y) in zip(pa,pb):
        A+=[[X,Y,1,0,0,0,-x*X,-x*Y],[0,0,0,X,Y,1,-y*X,-y*Y]]; B+=[x,y]
    return np.linalg.solve(np.array(A,float),np.array(B,float))
if mode=='closeup':
    W,H=im.size; box=tuple(int(v) for v in sys.argv[4].split(','))   # x0,y0,x1,y1 crop
    c=im.crop(box); cw,ch=c.size; O=1600
    # tilt: top edge far (narrow), bottom near (wide)
    dst=[(-0.10*O,0),(1.10*O,0),(1.45*O,O),(-0.45*O,O)]
    dst=[(-0.05*O,0),(1.05*O,0),(1.35*O,O),(-0.35*O,O)]
    src_pts=[(0,0),(cw,0),(cw,ch),(0,ch)]
    k=coeffs(src_pts,dst)
    p=c.transform((O,O),Image.PERSPECTIVE,k,Image.BICUBIC)
    # depth of field: sharp band in the middle, blur top more, bottom a bit
    sharp=np.asarray(p).astype(float)
    b1=np.asarray(p.filter(ImageFilter.GaussianBlur(5))).astype(float)
    b2=np.asarray(p.filter(ImageFilter.GaussianBlur(11))).astype(float)
    yy=np.linspace(0,1,O)[:,None,None]
    dist=np.abs(yy-0.58)
    w1=np.clip((dist-0.10)/0.15,0,1); w2=np.clip((dist-0.28)/0.2,0,1)
    img=sharp*(1-w1)+b1*w1; img=img*(1-w2)+b2*w2
    # warm side light + vignette
    gy,gx=np.mgrid[0:O,0:O]/O
    light=1.06-0.12*gx-0.04*gy; vig=1-0.18*((gx-0.5)**2+(gy-0.55)**2)*2
    img=img*light[...,None]*vig[...,None]
    img[...,0]*=1.02; img[...,2]*=0.98
    Image.fromarray(np.clip(img,0,255).astype('uint8')).resize((1200,1200),Image.LANCZOS).save(out,quality=94)
elif mode=='framed':
    S=2048; m=int(S*0.11); fw=int(S*0.022)
    bg=Image.new('RGB',(S,S),(240,240,238))
    gy,gx=np.mgrid[0:S,0:S]/S; g=np.asarray(bg).astype(float)*(1.02-0.05*np.hypot(gx-0.4,gy-0.35))[...,None]
    bg=Image.fromarray(np.clip(g,0,255).astype('uint8'))
    inner=S-2*m-2*fw
    art=im.resize((inner,inner),Image.LANCZOS)
    sh=Image.new('L',(S,S),0); ImageDraw.Draw(sh).rectangle((m+18,m+30,S-m+18,S-m+30),fill=110); sh=sh.filter(ImageFilter.GaussianBlur(28))
    bg.paste((90,90,90),(0,0),sh)
    d=ImageDraw.Draw(bg); d.rectangle((m,m,S-m-1,S-m-1),fill=(22,22,22))
    d.rectangle((m+3,m+3,S-m-4,m+6),fill=(55,55,55))      # top bevel glint
    bg.paste(art,(m+fw,m+fw))
    # inner shadow from frame onto bricks (top/left)
    a=np.asarray(bg).astype(float); x0=m+fw; y0=m+fw
    for t in range(14):
        f=1-0.30*(1-t/14)
        a[y0+t,x0:x0+inner]*=f; a[y0:y0+inner,x0+t]*=f
    Image.fromarray(np.clip(a,0,255).astype('uint8')).save(out,quality=94)
print('saved',out)
