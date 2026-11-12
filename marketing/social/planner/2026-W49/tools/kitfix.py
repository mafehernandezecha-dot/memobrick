import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kit import *
P = '/home/user/memobrick/marketing/social/planner/2026-W49/'
tmp = SC + '/k8.png'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '8.2', '-i', VID['kit'], '-frames:v', '1', tmp], check=True)
im = Image.open(tmp).convert('RGB').crop((380, 40, 1820, 1040))
card_slide("What's in the box?", [('A real Memobrick kit', 'Everything you need to build your photo. Swipe to see what is inside.')], 'Swipe', mos=im.resize((920, 639), Image.LANCZOS)).save(P + 'S-20261203-1.png')
card_slide("What's in a photo mosaic kit?", [('A real Memobrick kit', 'Bricks, baseplates, your color map and the tool.')], None, size=(1000, 1500), mos=im.resize((860, 597), Image.LANCZOS)).save(P + 'S-20261203-1-pin.png')
