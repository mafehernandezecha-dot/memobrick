import sys
from PIL import Image, ImageDraw, ImageFilter
P='/home/user/memobrick/marketing/social/planner/2026-W44/'
O='out/'
M=lambda pid: Image.open(O+pid+'-studio-mosaic.png').convert('RGB')
def fit(im,w,h): return im.resize((w,h),Image.LANCZOS)

# S-20261027-1 slide 3: bottom band (y 679..1350) gets the 30x20 Studio mosaic, pill redrawn
s=Image.open(P+'S-20261027-1-3.png').convert('RGB'); orig=s.copy()
m=M('S-20261027-1'); mw=1080; mh=round(m.height*1080/m.width)   # 720
mm=fit(m,mw,mh); top=(mh-671)//2
s.paste(mm.crop((0,top,1080,top+671)),(0,679))
x0,y0,x1,y1=40,711,321,792; SS=4
pill=Image.new('L',((x1-x0)*SS,(y1-y0)*SS),0)
ImageDraw.Draw(pill).rounded_rectangle((0,0,(x1-x0)*SS-1,(y1-y0)*SS-1),radius=(y1-y0)*SS//2,fill=255)
pill=pill.resize((x1-x0,y1-y0),Image.LANCZOS)
s.paste(Image.new('RGB',(x1-x0,y1-y0),orig.getpixel((60,750))),(x0,y0),pill)
inner=Image.new('L',(x1-x0,y1-y0),0); ImageDraw.Draw(inner).rounded_rectangle((4,4,x1-x0-5,y1-y0-5),radius=(y1-y0)//2-4,fill=255)
s.paste(orig.crop((x0,y0,x1,y1)),(x0,y0),inner)
s.save(O+'S-20261027-1-3-studio.png',optimize=True)

# S-20261031-1 slide 2: top band (0..900) = cream with the 16x16 Studio mosaic 900x900 centered
s=Image.open(P+'S-20261031-1-2.png').convert('RGB')
d=ImageDraw.Draw(s); d.rectangle((0,0,1079,899),fill=(251,246,238))
s.paste(fit(M('S-20261031-1'),860,860),(110,20))
s.save(O+'S-20261031-1-2-studio.png',optimize=True)

# framed / hung wall mosaics
def wall(src,dst,pid,rect,frame,shadow):
    s=Image.open(P+src).convert('RGB'); x0,y0,x1,y1=rect
    if frame:
        d=ImageDraw.Draw(s); d.rectangle((x0,y0,x1-1,y1-1),fill=(244,243,240))
        ix0,iy0,ix1,iy1=x0+frame,y0+frame,x1-frame,y1-frame
    else:
        # cover the AI mosaic with the wall tone sampled just outside it, then a soft shadow
        if shadow:
            sh=Image.new('L',s.size,0); ImageDraw.Draw(sh).rectangle((x0+3,y0+6,x1+3,y1+6),fill=110)
            sh=sh.filter(ImageFilter.GaussianBlur(7)); s.paste(Image.new('RGB',s.size,(60,40,25)),(0,0),sh)
        ix0,iy0,ix1,iy1=x0,y0,x1,y1
    s.paste(fit(M(pid),ix1-ix0,iy1-iy0),(ix0,iy0))
    s.save(O+dst,optimize=True)
wall('S-20261029-1.png','S-20261029-1-studio.png','S-20261029-1',(493,414,860,787),7,False)
wall('S-20261029-1-pin.png','S-20261029-1-pin-studio.png','S-20261029-1',(449,360,853,770),8,False)
wall('S-20261101-1.png','S-20261101-1-studio.png','S-20261101-1',(390,396,750,749),0,True)
wall('S-20261101-1-pin.png','S-20261101-1-pin-studio.png','S-20261101-1',(347,411,715,773),0,True)
