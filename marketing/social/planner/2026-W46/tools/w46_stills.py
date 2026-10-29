import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-memobrick/e48fdd61-175f-530e-a1aa-f3d8cc553037/scratchpad')
from kit import *
P='/home/user/memobrick/marketing/social/planner/2026-W46/'
st=lambda n: cap(SC+'/st/'+n+'.png')
CODE="Code EARLYHOLIDAY20 takes 20% off until November 22. Or free shipping on US orders of $125 or more. Offers can't be combined."
# Wed Nov 11: for him
hw=st('husbwife')
scene_slide(SC+'/sc/den-4x5.png', hw, (1080,1350), 640, 760, 420, 420, 'Hard to shop for him?', 'Give him the photo he would keep.', 'Swipe', P+'S-20261111-1.png', crop=(0,0,896,1120), light=True)
scene_slide(SC+'/sc/den-2x3.png', hw, (1000,1500), 600, 840, 400, 400, 'Hard to shop for him?', 'Give him the photo he would keep.', None, P+'S-20261111-1-pin.png', light=True)
card_slide('Why it works for him',[('It is about him','Use a photo of the two of you, his kids or his dog. It is built from small 1×1 bricks.'),
  ('Built at home','The kit has the bricks, baseplates, a color map and the tool. About 4 hours for a 20×20.'),
  ('See it before you order','Upload a photo in the editor and preview your mosaic. Want help? Our designers can send a free proof. Optional.')],'Swipe').save(P+'S-20261111-1-2.png')
card_slide('Order by December 15',[('Get it before Christmas','Order by December 15 to receive it before Christmas.'),('Save 20% until November 22',CODE)],'Start your design').save(P+'S-20261111-1-3.png')
# Sat Nov 14: grandparents
gp=st('grandparents')
scene_slide(SC+'/sc/grand-4x5.png', gp, (1080,1350), 620, 780, 420, 420, 'Grandparents who have everything?', 'Give them the grandkids, in 1×1 bricks.', 'Swipe', P+'S-20261114-1.png', crop=(0,0,896,1120))
scene_slide(SC+'/sc/grand-2x3.png', gp, (1000,1500), 560, 850, 400, 400, 'Grandparents who have everything?', 'Give them the grandkids, in 1×1 bricks.', None, P+'S-20261114-1-pin.png')
card_slide('A gift they will keep',[('One photo, all of them','Pick a photo with the whole family. Upload it and preview your mosaic before you order.'),
  ('Not sure which size?','More bricks show more detail. Compare sizes with your photo in the editor.'),
  ('Ready to build','The kit has 1×1 bricks, baseplates, a color map and the tool. Frame sold separately.')],'Swipe').save(P+'S-20261114-1-2.png')
card_slide('Order by December 15',[('Get it before Christmas','Order by December 15 to receive it before Christmas.'),('Save 20% until November 22',CODE)],'Start your design').save(P+'S-20261114-1-3.png')
# Sun Nov 15: one week left
fm=st('family').resize((428,642),Image.LANCZOS)
card_slide('One week left for 20% off',[('Ends November 22',"Code EARLYHOLIDAY20 takes 20% off. Or free shipping on US orders of $125 or more. Offers can't be combined.")],'Swipe',mos=fm).save(P+'S-20261115-1.png')
fm2=st('family').resize((420,630),Image.LANCZOS)
card_slide('One week left for 20% off',[('Ends November 22',"Code EARLYHOLIDAY20 takes 20% off. Or free shipping on US orders of $125 or more. Offers can't be combined.")],None,size=(1000,1500),mos=fm2).save(P+'S-20261115-1-pin.png')
card_slide('Your Christmas timeline',[('Today','Upload a photo, preview your mosaic and order.'),('November 22','Code EARLYHOLIDAY20 ends. 20% off.'),('December 15','Last day to order to receive it before Christmas.')],'Swipe').save(P+'S-20261115-1-2.png')
card_slide('Not sure where to start?',[('Pick a photo you love','Faces up close, good light, a simple background.'),('Preview it','See your mosaic in the editor before you order.'),('Want help?','Our designers can create it and send a free proof before production. Optional.')],'Start your design').save(P+'S-20261115-1-3.png')
for n,pid in [('husbwife','S-20261111-1'),('grandparents','S-20261114-1'),('family','S-20261115-1')]: shutil.copy(SC+'/st/%s.png'%n,P+pid+'-studio-mosaic.png')
for n,pid in [('father','S-20261110-1'),('collie','S-20261112-1'),('couple','S-20261113-1')]: shutil.copy(SC+'/st/%s.png'%n,P+pid+'-studio-mosaic.png')
