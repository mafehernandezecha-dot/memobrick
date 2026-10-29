import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/e48fdd61-175f-530e-a1aa-f3d8cc553037/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W45/'
st=lambda n: cap(SC+'/st/'+n+'.png')
# S-20261105-1 slide 1 + pin: xmas room, mother and daughter Studio 20x20
tw=st('twowomen')
scene_slide(SC+'/sc/xmas-4x5-flip.png', tw, (1080,1350), 420, 760, 400, 400, 'Who is on your Christmas list?', 'A mosaic from a photo they love.', 'Swipe for ideas', P+'S-20261105-1.png', crop=(0,0,896,1120))
scene_slide(SC+'/sc/xmas-2x3-flip.png', tw, (1000,1500), 400, 830, 380, 380, 'Who is on your Christmas list?', 'A mosaic from a photo they love.', None, P+'S-20261105-1-pin.png')
# S-20261107-1 slide 1 + pin: dog hall, Studio mosaic of the dog in the scene (20x30)
sd=st('scenedog')
scene_slide(SC+'/sc/doghall-2x3.png', sd, (1080,1350), 400, 800, 270, 405, 'Tag someone who keeps every photo of their dog', '20×30 kit shown. Frame sold separately.', 'Swipe', P+'S-20261107-1.png', crop=(0,130,832,1170))
scene_slide(SC+'/sc/doghall-2x3.png', sd, (1000,1500), 330, 760, 250, 375, 'Tag someone who keeps every photo of their dog', '20×30 kit shown. Frame sold separately.', None, P+'S-20261107-1-pin.png')
# S-20261108-1 slide 1 + pin: real footage frame (F7093 4 s) under a cream title band
def real(size, band, crop, out, button):
    im = Image.new('RGB', size, CREAM)
    ph = Image.open(SC+'/fr/fill3.png').convert('RGB').crop(crop)
    ph = ph.resize((size[0], size[1]-band), Image.LANCZOS)
    im.paste(ph, (0, band)); t=out+'.tmp.png'; im.save(t)
    cmd=[sys.executable,'/home/user/memobrick/marketing/tools/add_text.py',t,out,'--headline','How your photo becomes a mosaic','--sub','4 simple steps. Swipe.','--place','top-left']
    if button: cmd+=['--button',button]
    subprocess.run(cmd,check=True,capture_output=True); os.remove(t)
real((1080,1350),480,(300,100,1380,970),P+'S-20261108-1.png','Swipe for steps')
real((1000,1500),560,(300,60,1300,1000),P+'S-20261108-1-pin.png',None)
# keep the Studio exports next to the posts
shutil.copy(SC+'/st/twowomen.png',P+'S-20261105-1-studio-mosaic.png')
shutil.copy(SC+'/st/scenedog.png',P+'S-20261107-1-studio-mosaic.png')
shutil.copy(SC+'/st/family.png',P+'S-20261102-1-studio-mosaic.png')
shutil.copy(SC+'/st/dog.png',P+'S-20261104-1-studio-mosaic.png')
shutil.copy(SC+'/st/grandma.png',P+'S-20261106-1-studio-mosaic.png')
