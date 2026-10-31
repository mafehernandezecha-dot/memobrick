import sys, types; sys.modules['cv2']=types.ModuleType('cv2')
sys.path.insert(0,'/home/user/memobrick/marketing/social/planner/2026-W46/tools')
from kit import *
R='/home/user/memobrick/marketing/'
O=R+'social/planner/pins-2026-10-30/'
def pin(name, src, size, title, head, body, btn):
    m=Image.open(src).convert('RGB'); m=m.resize(size,Image.LANCZOS)
    card_slide(title,[(head,body)],btn,size=(1000,1500),mos=m).save(O+name+'.png')
D=R+'seo/writer/drafts/images/'
pin('pin-grandparents',D+'christmas-gifts-for-grandparents-from-grandkids-studio.png',(780,520),'Christmas gifts for grandparents from the grandkids','Order by December 15','A custom brick mosaic of the grandkids, built from your photo. They can help build it.','Read the gift guide')
pin('pin-last-minute',D+'last-minute-personalized-christmas-gifts-studio.png',(620,620),'Last-minute personalized Christmas gifts','Order by December 15','Preview your photo as a custom brick mosaic before you order.','See the honest dates')
pin('pin-wife',D+'photo-christmas-gift-for-wife-studio.png',(620,620),'A photo Christmas gift for your wife','She can build it, then hang it','A custom brick mosaic kit from a photo of the two of you. Order by December 15.','Read the gift guide')
pin('pin-dog',R+'social/planner/2026-W45/S-20261104-1-studio-mosaic.png',(500,750),'A custom brick mosaic of your dog','From a photo of your pet','Preview your dog as a DIY brick mosaic kit made of 1×1 bricks.','See the dog mosaic')
