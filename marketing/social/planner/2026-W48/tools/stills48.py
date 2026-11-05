import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/c69447ac-ad7d-541b-8551-4ddf387065ab/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W48/'
st=lambda n: cap(SC+'/st/'+n+'.png')
def ss(room,mos,pid,head,sub,btn,c45,c23,place='top-left'):
    scene_slide(SC+'/sc/'+room+'.png',st(mos),(1080,1350),c45[0],c45[1],c45[2],c45[3],head,sub,btn,P+pid+'.png',crop=(0,0,832,1040),place=place)
    scene_slide(SC+'/sc/'+room+'.png',st(mos),(1000,1500),c23[0],c23[1],c23[2],c23[3],head,sub,None,P+pid+'-pin.png',place=place)
BF="Code BRICKFRIDAY25 takes 25% off from Friday, November 27 to Sunday, November 29, 11:59 pm ET. Or free shipping on US orders of $125 or more. Offers can't be combined."
# Mon Nov 23 pet
ss('roomE','corgi','S-20261123-1','Your dog, in 1×1 bricks','A gift for the dog lover.','Swipe',(760,520,290,435),(720,470,300,450))
card_slide('Why a pet mosaic works',[('Their face, up close','Pick a photo where your dog or cat fills the frame, looking at you.'),('Built from 1×1 bricks','The kit has the bricks, baseplates, a color map and the tool. About 6 hours for a 20×30.'),('See it before you order','Upload a photo in the editor and preview your mosaic. Frames are sold separately.')],'Swipe').save(P+'S-20261123-1-2.png')
card_slide('Order by December 15',[('Get it before Christmas','Order by December 15 to receive it before Christmas.'),('Free shipping','Free shipping on US orders of $125 or more.'),('Want help?','Our designers can create it and send a free proof before production. Optional.')],'Start your design').save(P+'S-20261123-1-3.png')
# Wed Nov 25 thanksgiving tips
tm=st('threegen').resize((428,642),Image.LANCZOS)
card_slide('Take the photo at the table',[('Thanksgiving is the photo','Everyone is together. Ask for one close photo before dessert.')],'Swipe',mos=tm).save(P+'S-20261125-1.png')
tm2=st('threegen').resize((420,630),Image.LANCZOS)
card_slide('Take the photo at the table',[('Thanksgiving is the photo','Everyone is together. Ask for one close photo before dessert.')],None,size=(1000,1500),mos=tm2).save(P+'S-20261125-1-pin.png')
card_slide('How to get a photo that works',[('Get close','Faces should fill the frame. Two or three people in a tight shot.'),('Use daylight','A window beats a flash. A simple background helps.'),('Take a few','Pick the one where everyone is looking at the camera.')],'Swipe').save(P+'S-20261125-1-2.png')
card_slide('Then make it a gift',[('Preview your mosaic','Upload the photo in the editor and see it before you order.'),('Order by December 15','Order by December 15 to receive it before Christmas.'),('Want help?','Our designers can send a free proof. Optional.')],'Start your design').save(P+'S-20261125-1-3.png')
# Sat Nov 28 dad
ss('roomF','dad','S-20261128-1','A gift for dad','Father and son, in bricks.','Swipe',(740,540,290,435),(700,480,300,450))
card_slide('Why it works for dad',[('A photo he already loves','Use a photo of the two of you, or the whole family. Built from small 1×1 bricks.'),('Build it together','The kit has the bricks, baseplates, a color map and the tool. About 6 hours for a 20×30.'),('See it before you order','Preview your mosaic in the editor. Frames are sold separately.')],'Swipe').save(P+'S-20261128-1-2.png')
card_slide('Black Friday weekend',[('25% off until tomorrow night',BF),('Order by December 15','Order by December 15 to receive it before Christmas.')],'Start your design').save(P+'S-20261128-1-3.png')
# Sun Nov 29 last day
cm=st('couple').resize((428,642),Image.LANCZOS)
t="Code BRICKFRIDAY25 takes 25% off until 11:59 pm ET. Or free shipping on US orders of $125 or more. Offers can't be combined."
card_slide('Last day for 25% off',[('Ends tonight, November 29',t)],'Swipe',mos=cm).save(P+'S-20261129-1.png')
cm2=st('couple').resize((420,630),Image.LANCZOS)
card_slide('Last day for 25% off',[('Ends tonight, November 29',t)],None,size=(1000,1500),mos=cm2).save(P+'S-20261129-1-pin.png')
card_slide('Your Christmas timeline',[('Tonight','Code BRICKFRIDAY25 ends at 11:59 pm ET.'),('December 15','Last day to order to receive it before Christmas.'),('Any time','Upload a photo and preview your mosaic before you order.')],'Swipe').save(P+'S-20261129-1-2.png')
card_slide('Not sure where to start?',[('Pick a photo you love','Faces up close, good light, a simple background.'),('Preview it','See your mosaic in the editor before you order.'),('Want help?','Our designers can create it and send a free proof before production. Optional.')],'Start your design').save(P+'S-20261129-1-3.png')
for n,pid in [('corgi','S-20261123-1'),('grand','S-20261124-1'),('threegen','S-20261125-1'),('frenchie','S-20261126-1'),('couple','S-20261127-1'),('dad','S-20261128-1'),('couple','S-20261129-1')]:
    shutil.copy(SC+'/st/%s.png'%n,P+pid+'-studio-mosaic.png')
