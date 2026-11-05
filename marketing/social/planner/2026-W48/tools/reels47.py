import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/42d6fb90-edd2-5dc1-8a6e-4c06ab36e51d/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W47/'
which=sys.argv[1]; T=SC+'/tmp47'+which
def wall_end(mos, iw, ih, cy=640): return frame_on(wall_bg(), mos, W//2, cy, iw, ih)
def finish(o, pid):
    encode(o.d, P+pid+'.mp4'); preview(P+pid+'.mp4', P+pid+'-preview.jpg'); shutil.rmtree(o.d)
st=lambda n: cap(SC+'/st/'+n+'.png'); ph=lambda n: cap(SC+'/ph/'+n+'.png')
if which=='1117':
    mos=st('family4'); p=ph('family4'); o=Out(SC+'/f1117')
    o.add(clip('press',18,1.8,T,x0=100),['Camera roll','to wall'])
    o.hold(mosaic_on_cream(p,800)[0],1.0,['Your photo'])
    o.add(wipe_frames(p,mos,800,int(2.0*FPS)),['Becomes bricks'])
    o.add(clip('kit',4,3,T,x0=500),['The kit arrives'])
    o.add(clip('fill',4,12,T,speed=4,x0=300),['You build it at home'])
    wb=wall_end(mos,480,720,cy=900)
    o.add([push(wb,k,90,0.05) for k in range(90)],['Then it goes on the wall'],top=300)
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Your family, in bricks','See your mosaic before you order','Code EARLYHOLIDAY20 ends November 22.','Start your design',y1=1290),4)
    finish(o,'S-20261117-1')
if which=='1119':
    mos=st('cat'); p=ph('cat'); o=Out(SC+'/f1119')
    o.add(clip('press',20,1.6,T,x0=100),['We brick your pet','Episode 3'])
    o.hold(mosaic_on_cream(p,800)[0],0.8,['Their photo'])
    o.add(wipe_frames(p,mos,800,int(2.0*FPS)),['Becomes bricks'])
    base,_=mosaic_on_cream(mos,800)
    o.add(zoom_frames(base,int(2.6*FPS),1,5.0,0.5,0.47),['Every whisker is 1×1 bricks'])
    o.add(clip('fill',6,6,T,speed=3,x0=300),['Brick by brick'])
    wb=wall_end(mos,480,720,cy=900)
    o.add([push(wb,k,90,0.05) for k in range(90)],['Now on the wall'],top=300)
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Want your pet next?','DM us their photo','We always ask before we post a photo.','Follow for Episode 4',y1=1290),4)
    finish(o,'S-20261119-1')
if which=='1120':
    mos=st('friends'); p=ph('friends'); o=Out(SC+'/f1120')
    o.add(clip('press',22,1.0,T,x0=100),['Guess the photo Friday'])
    base,_=mosaic_on_cream(mos,800)
    o.hold(base,2.5,['Friends, sisters','or coworkers?','Comment your guess'],top=190)
    c0,(x,y,rw,rh)=mosaic_on_cream(p,800); n=int(2.5*FPS); fr=[]
    for k in range(n):
        cut=int(round(rw*ease(k/(n-1)))); f=base.copy(); f.paste(c0.crop((x,y,x+cut,y+rh)),(x,y))
        if 0<cut<rw: ImageDraw.Draw(f).rectangle((x+cut-2,y,x+cut+1,y+rh),fill=(255,255,255))
        fr.append(f)
    o.add(fr,['The photo shows up'])
    o.hold(c0,1.5,['Two friends, laughing'])
    o.add(clip('fill',2,6,T,speed=3,x0=300),['One 1×1 brick at a time'])
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Your photo, in bricks','See your mosaic before you order','Code EARLYHOLIDAY20 ends November 22.','Start your design',y1=1290),4)
    finish(o,'S-20261120-1')
