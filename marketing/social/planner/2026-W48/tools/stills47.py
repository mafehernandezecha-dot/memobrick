import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/42d6fb90-edd2-5dc1-8a6e-4c06ab36e51d/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W47/'
os.makedirs(P,exist_ok=True)
st=lambda n: cap(SC+'/st/'+n+'.png')
OFFER="Code EARLYHOLIDAY20 takes 20% off until November 22. Or free shipping on US orders of $125 or more. Offers can't be combined."
def ss(room,mos,pid,head,sub,btn,c45,c23):
    scene_slide(SC+'/sc/'+room+'.png',st(mos),(1080,1350),c45[0],c45[1],c45[2],c45[3],head,sub,btn,P+pid+'.png',crop=(0,0,832,1040))
    scene_slide(SC+'/sc/'+room+'.png',st(mos),(1000,1500),c23[0],c23[1],c23[2],c23[3],head,sub,None,P+pid+'-pin.png')
# Mon Nov 16
ss('roomA','momdaughter','S-20261116-1','Which photo to pick?','One with a clear, close face.','Swipe',(740,590,290,435),(700,520,300,450))
card_slide('Three things that make a great mosaic',[('Faces up close','Pick a photo where the faces fill the frame.'),('Good light','Daylight and a simple background show up best.'),('A photo you love','Upload it in the editor and preview your mosaic before you order. Want help? Our designers can send a free proof. Optional.')],'Swipe').save(P+'S-20261116-1-2.png')
card_slide('Six days left for 20% off',[('Ends November 22',OFFER),('Order by December 15','Order by December 15 to receive it before Christmas.')],'Start your design').save(P+'S-20261116-1-3.png')
# Wed Nov 18
ss('roomC','momkids','S-20261118-1','A gift for mom, from the kids','Give her the photo she would keep.','Swipe',(740,560,290,435),(700,520,300,450))
card_slide('Why it works for mom',[('It is about her family','Use a photo of her with the kids, or all of you together. It is built from small 1×1 bricks.'),('Build it together','The kit has the bricks, baseplates, a color map and the tool. About 4 hours for a 20×20.'),('See it before you order','Upload a photo in the editor and preview your mosaic. Frames are sold separately.')],'Swipe').save(P+'S-20261118-1-2.png')
card_slide('Order by December 15',[('Get it before Christmas','Order by December 15 to receive it before Christmas.'),('Save 20% until November 22',OFFER)],'Start your design').save(P+'S-20261118-1-3.png')
# Sat Nov 21
ss('roomD','couple2','S-20261121-1','For the one you love','Their favorite photo of you two.','Swipe',(740,560,290,435),(700,520,300,450))
card_slide('Why it makes a gift she keeps',[('It is you two','Use a photo from a trip, a wedding or a quiet Sunday. Built from small 1×1 bricks.'),('Build it, then hang it','The kit has the bricks, baseplates, a color map and the tool. Frame sold separately.'),('See it before you order','Preview your mosaic in the editor. Want help? Our designers can send a free proof. Optional.')],'Swipe').save(P+'S-20261121-1-2.png')
card_slide('Code ends tomorrow',[('Sunday, November 22',OFFER),('Order by December 15','Order by December 15 to receive it before Christmas.')],'Start your design').save(P+'S-20261121-1-3.png')
# Sun Nov 22
fm=st('family4').resize((428,642),Image.LANCZOS)
card_slide('Last day for 20% off',[('Ends tonight, November 22',"Code EARLYHOLIDAY20 takes 20% off until 11:59 pm ET. Or free shipping on US orders of $125 or more. Offers can't be combined.")],'Swipe',mos=fm).save(P+'S-20261122-1.png')
fm2=st('family4').resize((420,630),Image.LANCZOS)
card_slide('Last day for 20% off',[('Ends tonight, November 22',"Code EARLYHOLIDAY20 takes 20% off until 11:59 pm ET. Or free shipping on US orders of $125 or more. Offers can't be combined.")],None,size=(1000,1500),mos=fm2).save(P+'S-20261122-1-pin.png')
card_slide('Your Christmas timeline',[('Tonight','Code EARLYHOLIDAY20 ends at 11:59 pm ET.'),('December 15','Last day to order to receive it before Christmas.'),('Any time','Upload a photo and preview your mosaic before you order.')],'Swipe').save(P+'S-20261122-1-2.png')
card_slide('Not sure where to start?',[('Pick a photo you love','Faces up close, good light, a simple background.'),('Preview it','See your mosaic in the editor before you order.'),('Want help?','Our designers can create it and send a free proof before production. Optional.')],'Start your design').save(P+'S-20261122-1-3.png')
for n,pid in [('momdaughter','S-20261116-1'),('family4','S-20261117-1'),('momkids','S-20261118-1'),('cat','S-20261119-1'),('friends','S-20261120-1'),('couple2','S-20261121-1'),('family4','S-20261122-1')]:
    shutil.copy(SC+'/st/%s.png'%n,P+pid+'-studio-mosaic.png')
