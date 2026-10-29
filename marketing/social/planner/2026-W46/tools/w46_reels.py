import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/e48fdd61-175f-530e-a1aa-f3d8cc553037/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W46/'
which=sys.argv[1]; T=SC+'/tmp46'+which
def wall_end(mos, iw, ih, cy=640): return frame_on(wall_bg(), mos, W//2, cy, iw, ih)
def finish(o, pid):
    encode(o.d, P+pid+'.mp4'); preview(P+pid+'.mp4', P+pid+'-preview.jpg'); shutil.rmtree(o.d)
st=lambda n: cap(SC+'/st/'+n+'.png'); ph=lambda n: cap(SC+'/ph/'+n+'.png')

if which=='1110':   # Watch it fill: 6 hours
    mos=st('father'); o=Out(SC+'/f1110')
    o.add(clip('press',12,0.8,T,x0=100,slow=2),['How long does a','20×30 take?'])
    o.add(clip('fill',2,12,T,speed=4,x0=300),['Real hands.','Real 1×1 bricks.'])
    bf=build_frames(mos,800,int(5.5*FPS),64,96)
    n=len(bf)
    labels=[(0.0,'Hour 1'),(0.2,'Hour 2'),(0.4,'Hour 3'),(0.6,'Hour 4'),(0.8,'Hour 5'),(1.0,'Hour 6')]
    seg=lambda a,b: bf[int(a*n):int(b*n)]
    for (a,l),(b,_) in zip(labels[:-1],labels[1:]): o.add(seg(a,b),[l,'1×1 brick at a time'] if l=='Hour 1' else [l])
    o.add(bf[int(0.8*n):],['Hour 6'])
    o.hold(mosaic_on_cream(mos,800)[0],1.0,['Done. About 6 hours.'])
    base=wall_end(mos,480,720,cy=900)
    o.add([push(base,k,90,0.05) for k in range(90)],['Then it goes on the wall'],top=300)
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'About 6 hours','for a 20×30 mosaic','Code EARLYHOLIDAY20 ends November 22.','Start your design',y1=1290),4)
    finish(o,'S-20261110-1')
if which=='1112':   # We brick your pet, episode 2
    mos=st('collie'); p=ph('collie'); o=Out(SC+'/f1112')
    o.add(clip('shih',0.3,1.6,T,mode='full'),['We brick your pet','Episode 2'])
    o.hold(mosaic_on_cream(p,800)[0],0.8,['Their photo'])
    o.add(wipe_frames(p,mos,800,int(2.0*FPS)),['Becomes bricks'])
    base,_=mosaic_on_cream(mos,800)
    zf=zoom_frames(base,int(2.6*FPS),1,5.5,0.44,0.27)
    o.add(zf,['Every eye is 1×1 bricks'])
    o.add(clip('press',6,8,T,speed=4,x0=100),['Brick by brick'])
    wb=wall_end(mos,480,720,cy=900)
    o.add([push(wb,k,90,0.05) for k in range(90)],['Now on the wall'],top=300)
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Want your pet next?','DM us their photo','We always ask before we post a photo.','Follow for Episode 3',y1=1290),4)
    finish(o,'S-20261112-1')
if which=='1113':   # Guess the photo Friday: couple
    mos=st('couple'); p=ph('couple'); o=Out(SC+'/f1113')
    base,_=mosaic_on_cream(mos,800)
    zf=zoom_frames(base,int(7*FPS),8,1,0.44,0.40)
    o.add(zf[:100],['Guess the photo Friday']); o.add(zf[100:],['Who is in this photo?'])
    o.hold(base,2.5,['Couple, friends','or siblings?','Comment your guess'],top=190)
    side=cream_canvas(); a=p.resize((500,750),Image.LANCZOS); b=mos.resize((500,750),Image.LANCZOS)
    side.paste(a,(30,585)); side.paste(b,(550,585))
    d=ImageDraw.Draw(side); d.text((280,540),'The photo',font=FS,fill=(40,40,40),anchor='mm'); d.text((800,540),'In 1×1 bricks',font=FS,fill=(40,40,40),anchor='mm')
    o.hold(side,3,['A couple,','cheek to cheek'])
    o.add(clip('kit',1,3,T,x0=500),['Your photo could be next'])
    top=wall_end(mos,440,660,cy=600)
    o.hold(endcard(top,'Your photo, in bricks','See your mosaic before you order','Guess the photo Friday returns next week.','Start your design',y1=1290),4)
    finish(o,'S-20261113-1')
