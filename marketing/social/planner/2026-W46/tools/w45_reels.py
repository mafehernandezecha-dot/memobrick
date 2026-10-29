import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/e48fdd61-175f-530e-a1aa-f3d8cc553037/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W45/'
which=sys.argv[1]
T=SC+'/tmp'+which
def wall_end(mos, iw, ih, cy=640):
    return frame_on(wall_bg(), mos, W//2, cy, iw, ih)
def finish(o, pid):
    encode(o.d, P+pid+'.mp4'); preview(P+pid+'.mp4', P+pid+'-preview.jpg'); shutil.rmtree(o.d)

if which=='1102':
    mos=cap(SC+'/st/family.png'); ph=cap(SC+'/ph/family.png')
    o=Out(SC+'/f1102')
    o.add(clip('press',12,1.2,T,x0=100),['Her whole world,','in 1×1 bricks'])
    pw=wipe_frames(ph,mos,800,int(1.8*FPS))
    o.hold(mosaic_on_cream(ph,800)[0],0.6,['Her photo'])
    o.add(pw,['Turns into','1×1 bricks'])
    o.hold(mosaic_on_cream(mos,800)[0],0.8,['Turns into','1×1 bricks'])
    o.add(clip('kit',1,3,T,x0=500),['Then the kit arrives'])
    o.add(clip('press',12,4,T,x0=100),['Pressed by hand'])
    o.add(clip('fill',2,9,T,speed=3,x0=300),['Row after row'])
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Built by hand','Mom and her two kids','Order by December 15 to get it before Christmas.','20% off with code EARLYHOLIDAY20',y1=1290),4)
    finish(o,'S-20261102-1')
if which=='1104':
    mos=cap(SC+'/st/dog.png'); ph=cap(SC+'/ph/dog.png')
    o=Out(SC+'/f1104')
    o.add(clip('press',2,1.2,T,x0=0),['Camera roll'])
    o.hold(mosaic_on_cream(ph,800)[0],0.8,['Camera roll'])
    o.add(wipe_frames(ph,mos,800,int(1.8*FPS)),['to wall'])
    o.hold(mosaic_on_cream(mos,800)[0],0.6,['to wall'])
    o.add(clip('kit',6,3,T,x0=300),['The kit arrives'])
    o.add(clip('press',4,2,T,x0=100,slow=2),['One 1×1 brick at a time'])
    o.add(clip('fill',1,12,T,speed=4,x0=300),['About 6 hours for a 20×30'])
    base=wall_end(mos,480,720,cy=900)
    o.add([push(base,k,150,0.05) for k in range(150)],['Your dog, on the wall'],top=300)
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,"Try your dog's photo",'See your mosaic before you order','20×30 kit. Frame sold separately.','Start your design',y1=1290),3.4)
    finish(o,'S-20261104-1')
if which=='1106':
    mos=cap(SC+'/st/grandma.png'); ph=cap(SC+'/ph/grandma.png')
    o=Out(SC+'/f1106')
    base,_=mosaic_on_cream(mos,800)
    zf=zoom_frames(base,int(7*FPS),7,1,0.5,0.36)
    o.add(zf[:105],['Guess the photo Friday']); o.add(zf[105:],['What is it?'])
    o.hold(base,2.5,['A grandma,','in 1×1 bricks'])
    o.hold(mosaic_on_cream(ph,800)[0],2.5,['The original photo'])
    o.add(clip('kit',8,3,T,x0=420),['Someone you love','could be next'])
    c,_=mosaic_on_cream(mos,600,cy=680)
    o.hold(endcard(c,'Guess the photo Friday','Follow for next Friday','Same time, new photo.','Follow for the next one',y1=1290),3.5)
    finish(o,'S-20261106-1')
