import os
P='/home/user/memobrick/marketing/social/planner/2026-W48/'
BASE='https://mymemobrick.com/'
STUDIO=lambda size,extra: f"{size} (64 × 96 studs), 16 colors, crop reset to the full photo ({extra}), saturation -35, temperature -15, other settings automatic."
BF_LINE="Code BRICKFRIDAY25 takes 25% off from Friday, November 27 to Sunday, November 29, 11:59 pm ET. Or free shipping on US orders of $125 or more. Offers can't be combined."
posts=[
dict(id='S-20261123-1',date='2026-11-23',time='19:00',kind='carousel',camp='2026-11-dog-gift',page='pages/dog-brick-mosaic',
 angle='Pets (cheapest purchases in ads, dog video $25.45) as a saveable carousel gift idea, no code (owner decision: no code Nov 23 to 26)',series='none',
 fmt='Carousel, 3 slides 4:5 (AI living room with the Studio mosaic of a corgi in a frame, "Why a pet mosaic works" card, "Order by December 15" card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3 (`-pin.png`).',
 ai='an AI living room and an AI corgi photo; the mosaic is a Studio export of the photo',
 studio=STUDIO('20 × 30"','an AI photo of a corgi, 2:3'),
 test='Part of the 70% proven themes (pets). No separate experiment.',
 hook='Your dog, in 1×1 bricks',why='Pets are the cheapest purchases in the ads (dog video, $25.45, 2 purchases) and the theme the audience insights rank second. A save-friendly carousel with the build time and the Dec 15 date, with no code, fits the owner decision that Nov 23 to 26 stays code-free.',
 slides=['1. AI living room, Studio mosaic of the corgi in a frame. "Your dog, in 1×1 bricks", "A gift for the dog lover."','2. "Why a pet mosaic works": face up close, built from 1×1 bricks (about 6 hours for a 20×30), see it before you order (frames sold separately).','3. "Order by December 15": get it before Christmas, free shipping on US orders of $125 or more, optional free proof. Button "Start your design".'],
 cover='Your dog, in 1×1 bricks',
 cap_ig="Your dog, in 1×1 bricks. A gift for the dog lover who has everything.\n\nPick a photo where their face fills the frame. The kit has the bricks, baseplates, a color map and the tool. A 20×30 takes about 6 hours to build.\n\nSee your mosaic before you order at the link in our bio. Order by December 15 to get it before Christmas. Free shipping on US orders of $125 or more.",
 cap_tt="Your dog, in 1×1 bricks. A gift for the dog lover. Order by Dec 15 for Christmas.",
 pin_title="Custom dog portrait gift: turn your dog's photo into a brick mosaic you build at home",
 pin_desc="A custom brick mosaic of your dog, built from tiny 1×1 bricks. A personalized pet gift and DIY brick mosaic kit for dog lovers. Upload your dog's photo to preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Pet gift ideas',cta='Start your design.',tags='#brickmosaic #doggift #petgift #diygift #christmasgift',tt_tags='#brickmosaic #doggift #petgift #christmasgift',
 sound=None,trend=None,
 prompts='Corgi photo: "A happy corgi sitting, head and chest, looking at the camera with tongue out, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, subjects\' faces fill most of the frame, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). Room: "Realistic lifestyle interior photo, warm natural light, no people, a bright cozy living room with a sofa, cushions and a plant, a console table below, a large plain smooth empty wall in the center with nothing hanging on it. No text, letters, logos, frames or artwork anywhere." (4:5, no reference).'),
dict(id='S-20261124-1',date='2026-11-24',time='19:00',kind='reel',camp='2026-11-watch-it-fill',page='pages/editor',
 angle='Building experience: the mosaic filling stud by stud (the audience loves the bricks and the building), grandparents theme',series='none',
 fmt='Reel, real hands filling a baseplate, the Studio mosaic of a grandparents photo built stud by stud, photo to mosaic wipe, real fingers pressing 1×1 bricks, mosaic on a wall, call to action, about 17 seconds, no audio (owner adds a sound)',
 ai='an AI photo of grandparents with their grandson; the mosaic is a Studio export of it, the building shots are real footage',
 studio=STUDIO('20 × 30"','an AI photo of grandparents and a grandson, 2:3'),
 test='Test EXP-SP-20261124-01: a "watch it fill" reel where the Studio mosaic is built stud by stud for 5 seconds (a new format). Learns whether a long, calm fill holds watch time better than the quick row-by-row wipe.',
 hook='Watch it fill',why='The owner brief says the audience loves the 1×1 bricks and the build. The best-watched reel opened on real hands pressing bricks (4.0 s, `2026-W46/results.md`). This one opens on real hands, then shows the whole 64 × 96 board filling, and answers "how long does it take" with the 20×30 build time from `product-facts.md` (6 h). Grandparents are a gift group the community manager and the gift-guide article already target.',
 shots=['0.0 to 2.0 s: real hands filling a baseplate at 2× (F7089, Drive `1knhLwYr_JO62ef-tt1VwOg6wIMLZ1593`, 2 to 6 s). Text: "Watch it fill".','2.0 to 7.0 s: the Studio mosaic built stud by stud on a baseplate. Text: "One 1×1 brick at a time".','7.0 to 8.2 s: the AI grandparents photo. Text: "The photo behind it".','8.2 to 10.0 s: the photo turns into the mosaic row by row. Text: "Grandma, grandpa and the grandson".','10.0 to 12.5 s: real fingers pressing 1×1 bricks (F7093, `1E3DFJDbupvxkfxYdj9p13kUw8IdCzpea`, 18 to 20.5 s). Text: "About 6 hours for a 20×30".','12.5 to 15.5 s: the mosaic in a frame on a wall, slow push-in. Text: "Then it goes on the wall".','15.5 to 19.5 s: end card "Their photo, in bricks", "Black Friday deal starts Friday", "Order by December 15 for Christmas.", pill "Start your design", mymemobrick.com.'],
 cover='Watch it fill',
 cap_ig="Watch it fill. A grandparents photo, built from 1×1 bricks.\n\nA 20×30 mosaic takes about 6 hours to build. The kit has the bricks, baseplates, a color map and the tool.\n\nSee your mosaic before you order at the link in our bio. Order by December 15 to get it before Christmas. Black Friday deal starts Friday.",
 cap_tt="Watch it fill. A grandparents photo in 1×1 bricks. Black Friday deal starts Friday.",
 pin_title="Custom grandparents photo gift: a family photo turned into a brick mosaic",
 pin_desc="Watch a custom brick mosaic fill up, one 1×1 brick at a time. A personalized photo gift for grandparents and a DIY brick mosaic kit built at home. Preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Family photo gifts',cta='Start your design.',tags='#brickmosaic #grandparentsgift #photogift #diygift #christmasgift',tt_tags='#brickmosaic #grandparentsgift #photogift #christmasgift',
 sound='Option 1: a calm, steady instrumental from the Reels Trending tab with a clear beat; land the first beat on the first brick press at 0.4 s and the second on the start of the fill at 2.0 s. Option 2: a soft acoustic loop from TikTok trending.',trend="TikTok trend adapted: 'watch it load' progress-fill satisfying videos.",
 yt_title='Watch it fill: a grandparents photo in 1×1 bricks #Shorts',yt_desc='See your own photo as a custom brick mosaic before you order at the link below.',
 prompts='Photo: "A smiling grandmother and grandfather in their 70s with their grandson age 6 between them, cheek to cheek, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, looking at the camera, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). No image tool drew a mosaic.'),
dict(id='S-20261125-1',date='2026-11-25',time='19:00',kind='carousel',camp='2026-11-thanksgiving-photo',page='pages/editor',
 angle='Family photo as the gift (best-selling ad theme, 8 purchases), timed to Thanksgiving: take the photo at the table. Saveable how-to',series='none',
 fmt='Carousel, 3 slides 4:5 (cream card with the Studio mosaic of three generations, "How to get a photo that works" card, "Then make it a gift" card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3.',
 ai='an AI photo of three generations; the mosaic is a Studio export of it',
 studio=STUDIO('20 × 30"','an AI photo of a grandmother, mother and daughter, 2:3'),
 test='Test EXP-SP-20261125-01: a timely how-to carousel tied to Thanksgiving (take the photo at the table). Learns whether seasonal, saveable how-to content brings more saves and clicks than a gift card post.',
 hook='Take the photo at the table',why='Family photo is the top theme (8 purchases, $66.37 each, the most of any ad). Thanksgiving puts families together the day before our best gifting weeks start, and a how-to with a real photo tip is saveable. It also answers the objection "which photo do I use" (`customer-questions.md`).',
 slides=['1. Cream card with the Studio mosaic of three generations. "Take the photo at the table", "Thanksgiving is the photo. Everyone is together. Ask for one close photo before dessert."','2. "How to get a photo that works": get close, use daylight, take a few.','3. "Then make it a gift": preview your mosaic, order by December 15, optional free proof. Button "Start your design".'],
 cover='Take the photo at the table',
 cap_ig="Take the photo at the table. Thanksgiving is when everyone is together.\n\nGet close so the faces fill the frame, use daylight, and take a few. Then upload the best one and see it as a mosaic before you order.\n\nStart at the link in our bio. Order by December 15 to get it before Christmas. Black Friday deal starts Friday.",
 cap_tt="Take the photo at the table this Thanksgiving. Save this for later. Order by Dec 15 for Christmas.",
 pin_title="How to take a family photo for a custom brick mosaic gift: Thanksgiving photo tips",
 pin_desc="Tips for taking a family photo that makes a great custom brick mosaic: get close, use daylight, take a few. A personalized family photo gift and DIY brick mosaic kit. Preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Family photo gifts',cta='Start your design.',tags='#brickmosaic #familyphoto #thanksgiving #photogift #christmasgift',tt_tags='#brickmosaic #familyphoto #thanksgiving #photogift',
 sound=None,trend=None,
 prompts='Photo: "Three generations at Thanksgiving: a grandmother, a mother and a young daughter cheek to cheek smiling, warm sweaters, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, looking at the camera, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). No image tool drew a mosaic.'),
dict(id='S-20261126-1',date='2026-11-26',time='19:00',kind='reel',camp='2026-11-pet-episode-4',page='pages/dog-brick-mosaic',
 angle='Pets, running series "We brick your pet" Episode 4 (dog), with a Thanksgiving end card and a follow invite plus Send us your photo',series='We brick your pet, Episode 4',
 fmt='Reel, real fingers pressing 1×1 bricks, a French bulldog photo turning into its Studio mosaic, slow zoom into the face, real building at 3×, mosaic on a wall, call to action, about 16 seconds, no audio (owner adds a sound)',
 ai='an AI photo of a French bulldog; the mosaic is a Studio export of it, the building shots are real footage',
 studio=STUDIO('20 × 30"','an AI photo of a French bulldog, 2:3'),
 test='Part of the 70% proven themes: the pet series. EXP-SP-20261029-01 (pet series) continues, decision point was Episode 3.',
 hook='We brick your pet, Episode 4',why='Pets are the cheapest purchases in ads ($25.45) and a series gives people a reason to follow for the next one. The reel opens on real hands pressing bricks (best watch time 4.0 s). The end card keeps the weekly Send us your photo call to action.',
 shots=['0.0 to 1.6 s: real fingers pressing 1×1 bricks (F7093, Drive `1E3DFJDbupvxkfxYdj9p13kUw8IdCzpea`, 20 to 21.6 s). Text: "We brick your pet" / "Episode 4".','1.6 to 2.4 s: the AI French bulldog photo. Text: "Their photo".','2.4 to 4.4 s: the photo turns into the Studio mosaic. Text: "Becomes bricks".','4.4 to 7.0 s: slow zoom into the face on the Studio mosaic. Text: "Every wrinkle is 1×1 bricks".','7.0 to 13.0 s: real building, hands filling the baseplate at 3× (F7089, `1knhLwYr_JO62ef-tt1VwOg6wIMLZ1593`, 6 to 12 s). Text: "Brick by brick".','13.0 to 16.0 s: the mosaic on a wall, push-in. Text: "Now on the wall".','16.0 to 20.0 s: end card "Happy Thanksgiving", "DM us your pet\'s photo", pill "Follow for Episode 5", "We always ask before we post a photo.", mymemobrick.com.'],
 cover='We brick your pet, Episode 4',
 cap_ig="We brick your pet, Episode 4. Meet a French bulldog, built from 1×1 bricks.\n\nHappy Thanksgiving. Want your pet next? DM us their photo. We always ask before we post a photo, and we tag you. Follow for Episode 5.\n\nYou can also see your own pet as a mosaic before you order at the link in our bio. Order by December 15 to get it before Christmas. Black Friday deal starts tomorrow.",
 cap_tt="We brick your pet, Episode 4. DM us your pet's photo and follow for Episode 5. Happy Thanksgiving!",
 pin_title="Custom French bulldog portrait gift: a dog photo turned into a brick mosaic you build at home",
 pin_desc="Watch a French bulldog photo become a custom brick mosaic made of tiny 1×1 bricks. A personalized pet gift for dog lovers and a DIY brick mosaic kit built at home. Upload your pet's photo to preview your mosaic before you order.",
 board='Pet gift ideas',cta='Follow for Episode 5.',tags='#brickmosaic #frenchie #petgift #diygift #thanksgiving',tt_tags='#brickmosaic #frenchie #petgift #thanksgiving',
 sound='Option 1: a light playful instrumental from the Reels Trending tab; land the first beat on the first press and the second on the cut to the photo at 1.6 s. Option 2: a soft acoustic loop from TikTok trending.',trend="TikTok trend adapted: 'photo of my pet, then the finished version' reveal.",
 yt_title='We brick your pet, Episode 4: a French bulldog in 1×1 bricks #Shorts',yt_desc='See your own pet as a custom brick mosaic before you order at the link below.',
 prompts='Photo: "A French bulldog with big ears sitting, head and chest, looking at the camera, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). No image tool drew a mosaic.'),
dict(id='S-20261127-1',date='2026-11-27',time='09:00',kind='reel',camp='2026-11-black-friday',page='pages/editor',
 angle='Black Friday launch: couples (best CTR ads, anniversary and for him) with the owner-scheduled 25% code',series='none',
 fmt='Reel, real hands pressing 1×1 bricks, a couple photo turning into its Studio mosaic, the real kit opening, real building at 4×, call to action with the code, about 18 seconds, no audio (owner adds a sound)',
 ai='an AI photo of a couple; the mosaic is a Studio export of it, the building shots are real footage',
 studio=STUDIO('20 × 30"','an AI photo of a couple, 2:3'),
 test='Test EXP-SP-20261127-01: post time 09:00 on Black Friday instead of the usual 19:00. Learns whether deal-day posts do better in the morning.',
 hook='Black Friday, 25% off',why='Couples and "for him / anniversary" ads have the best CTR (2.08 to 2.25%) and "anniversary" bought at $36.24. Black Friday is the highest-intent day; the code starts at 00:00 ET today per `offers-calendar.md` (owner, 2026-10-26: "lets do black friday 25%"). Real hands pressing bricks open the reel (best watch time 4.0 s).',
 shots=['0.0 to 1.2 s: real fingers pressing 1×1 bricks (F7093, Drive `1E3DFJDbupvxkfxYdj9p13kUw8IdCzpea`, 22 to 23.2 s). Text: "Black Friday" / "25% off".','1.2 to 2.2 s: the AI couple photo. Text: "Your favorite photo of you two".','2.2 to 4.2 s: the photo turns into the Studio mosaic. Text: "Becomes bricks".','4.2 to 6.7 s: opening the kit box (F7071, `1BWqgv3ZlebkHeMFD1EK4I_KHboK0tJe9`, 4 to 6.5 s). Text: "The kit arrives".','6.7 to 11.7 s: hands filling a baseplate at 4× (F7089, `1knhLwYr_JO62ef-tt1VwOg6wIMLZ1593`, 4 to 13 s). Text: "You build it at home".','11.7 to 16.2 s: end card "25% off, 3 days only", "Code BRICKFRIDAY25", "Ends Sunday, November 29, 11:59 pm ET.", pill "Start your design", mymemobrick.com.'],
 cover='Black Friday, 25% off',
 cap_ig="Black Friday: 25% off, 3 days only. Give them their favorite photo of you two, built from 1×1 bricks.\n\n"+BF_LINE+" Order by December 15 to get it before Christmas.\n\nSee your mosaic before you order at the link in our bio.",
 cap_tt="Black Friday: 25% off with code BRICKFRIDAY25 until Nov 29. Your photo, in bricks.",
 pin_title="Black Friday custom photo gift: turn your favorite couple photo into a brick mosaic",
 pin_desc="A custom brick mosaic of your favorite couple photo, built from tiny 1×1 bricks. A personalized photo gift and DIY brick mosaic kit for anniversaries and Christmas. Preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Couple gift ideas',cta='Start your design.',tags='#blackfriday #brickmosaic #couplegift #photogift #christmasgift',tt_tags='#blackfriday #brickmosaic #couplegift #photogift',
 sound='Option 1: an upbeat but warm instrumental from the Reels Trending tab; land the first beat on the first press and the second on the cut to the photo at 1.2 s. Option 2: a light track from TikTok trending.',trend="TikTok trend adapted: 'photo of the two of us, then the finished version' reveal.",
 yt_title='Black Friday weekend: a couple photo in 1×1 bricks #Shorts',yt_desc='See your own photo as a custom brick mosaic before you order at the link below.',
 yt_nocode=True,
 prompts='Photo: "A smiling couple in their 30s cheek to cheek, looking at the camera, warm and affectionate, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). No image tool drew a mosaic.'),
dict(id='S-20261128-1',date='2026-11-28',time='11:00',kind='carousel',camp='2026-11-gift-for-dad',page='pages/editor',
 angle='Gift for him (best-CTR ad theme) in the Black Friday weekend, saveable gift idea',series='none',
 fmt='Carousel, 3 slides 4:5 (AI entryway with the Studio mosaic of father and son in a frame, "Why it works for dad" card, "Black Friday weekend" code card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3.',
 ai='an AI entryway and an AI photo of a father and son; the mosaic is a Studio export of the photo',
 studio=STUDIO('20 × 30"','an AI photo of a father and his teenage son, 2:3'),
 test='Part of the 70% proven themes (gifts for him). No separate experiment.',
 hook='A gift for dad',why='"MEN" ads have the best CTR (2.08 to 2.25%) and 5 purchases. A Saturday gift-guide carousel is saveable and carries the code with its end date (`offers-calendar.md`: BRICKFRIDAY25 ends Nov 29 11:59 pm ET).',
 slides=['1. AI entryway, Studio mosaic of father and son in a frame. "A gift for dad", "Father and son, in bricks."','2. "Why it works for dad": a photo he already loves, build it together (about 6 hours for a 20×30), see it before you order (frames sold separately).','3. "Black Friday weekend": code BRICKFRIDAY25 25% off until Sunday night, order by December 15. Button "Start your design".'],
 cover='A gift for dad',
 cap_ig="A gift for dad. Father and son, built from 1×1 bricks.\n\nUse a photo of the two of you, or the whole family. The kit has the bricks, baseplates, a color map and the tool. A 20×30 takes about 6 hours to build.\n\n"+BF_LINE+" Order by December 15 to get it before Christmas.\n\nSee your mosaic before you order at the link in our bio.",
 cap_tt="A gift for dad, in 1×1 bricks. Code BRICKFRIDAY25 takes 25% off until Nov 29.",
 pin_title="Custom photo gift for dad: turn a father and son photo into a brick mosaic",
 pin_desc="A custom brick mosaic of dad and you, built from tiny 1×1 bricks. A personalized photo gift for dad and a DIY brick mosaic kit built together at home. Preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Christmas gift ideas',cta='Start your design.',tags='#blackfriday #giftfordad #brickmosaic #photogift #christmasgift',tt_tags='#blackfriday #giftfordad #brickmosaic #photogift',
 sound=None,trend=None,
 prompts='Photo: "A smiling father in his 40s with his teenage son side by side, shoulders touching, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, looking at the camera, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). Room: "Realistic lifestyle interior photo, warm natural light, no people, a warm entryway hallway with a wooden bench, a lamp and a small plant, a large plain smooth empty wall in the center with nothing hanging on it. No text, letters, logos, frames or artwork anywhere." (4:5, no reference).'),
dict(id='S-20261129-1',date='2026-11-29',time='11:00',kind='carousel',camp='2026-11-bf-last-day',page='pages/editor',
 angle='Deadline: last day of BRICKFRIDAY25, with the Dec 15 timeline (conversion post for the weekend close)',series='none',
 fmt='Carousel, 3 slides 4:5 (cream card with the Studio couple mosaic and "Last day for 25% off", "Your Christmas timeline" card, "Not sure where to start?" card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3.',
 ai='an AI photo of a couple; the mosaic is a Studio export of it',
 studio=STUDIO('20 × 30"','an AI photo of a couple, 2:3 (same export as S-20261127-1)'),
 test='Part of the 70% proven formats (deadline card). No separate experiment.',
 hook='Last day for 25% off',why='A true deadline is the reason to click and buy now; the code ends tonight (`offers-calendar.md`). The timeline card shows the Dec 15 order-by date, and the last card answers "where do I start" with the optional free proof.',
 slides=['1. Cream card with the Studio couple mosaic. "Last day for 25% off", "Ends tonight, November 29", code line.','2. "Your Christmas timeline": tonight (code ends 11:59 pm ET), December 15 (last day to order for Christmas), any time (preview your mosaic).','3. "Not sure where to start?": pick a photo you love, preview it, want help (free proof, optional). Button "Start your design".'],
 cover='Last day for 25% off',
 cap_ig="Last day for 25% off. Code BRICKFRIDAY25 ends tonight, November 29, at 11:59 pm ET.\n\nOr free shipping on US orders of $125 or more. Offers can't be combined. Order by December 15 to get it before Christmas.\n\nSee your mosaic before you order at the link in our bio. Not sure which photo? Our designers can send a free proof. It's optional.",
 cap_tt="Last day for 25% off. Code BRICKFRIDAY25 ends tonight at 11:59 pm ET.",
 pin_title="Black Friday weekend custom photo gift: last day for 25% off a brick mosaic kit",
 pin_desc="Last day for 25% off a custom brick mosaic kit with code BRICKFRIDAY25. A personalized photo gift and DIY brick mosaic kit made from your photo. Preview your mosaic before you order, and order by December 15 for Christmas.",
 board='Christmas gift ideas',cta='Start your design.',tags='#blackfriday #brickmosaic #photogift #diygift #christmasgift',tt_tags='#blackfriday #brickmosaic #photogift #christmasgift',
 sound=None,trend=None,
 prompts='Same couple photo as S-20261127-1 (see that file). No image tool drew a mosaic.'),
]
for p in posts:
    pid=p['id']; reel=p['kind']=='reel'
    urls={c:f"{BASE}{p['page']}?utm_source={c}&utm_medium=organic&utm_campaign={p['camp']}" for c in ['instagram','facebook','tiktok','pinterest','youtube']}
    ch='Instagram (Reel), Facebook (Reel), TikTok (video), Pinterest (video pin), YouTube (Short)' if reel else 'Instagram (carousel), Facebook (carousel), TikTok (photo carousel), Pinterest (pin)'
    s=f"# {pid}\n\n- Post ID: {pid}\n- Campaign: {p['camp']}\n- Angle: {p['angle']}\n- Series: {p['series']}\n- Channel(s): {ch}\n- Format: {p['fmt']}\n"
    if reel: s+=f"- Asset (9:16): marketing/social/planner/2026-W48/{pid}.mp4\n- Preview: marketing/social/planner/2026-W48/{pid}-preview.jpg\n"
    else: s+=f"- Asset (4:5 slides): marketing/social/planner/2026-W48/{pid}.png, {pid}-2.png, {pid}-3.png; Pinterest 2:3: {pid}-pin.png\n"
    s+=f"- Scheduled time (ET): {p['date']} {p['time']}\n- AI image: turn on the AI label ({p['ai']}).\n- Studio: {p['studio']} Export: `{pid}-studio-mosaic.png`.\n- New content check: new post, not on Instagram yet.\n- Test: {p['test']}\n\n"
    s+=f"## Hook and why it should work\n\nHook: \"{p['hook']}\". {p['why']}\n\n"
    if reel:
        s+="## Shots (clips used)\n\n"+"\n".join(f"{i+1}. {x}" for i,x in enumerate(p['shots']))+"\n\nRights: all footage is from \"footage memobrick 5\", marked `ok` in `marketing/social/footage-rights.md` (owner cleared all folders 2026-10-12). Only hands and the kit appear. No customer photos or submitted photos are used.\n\n"
        s+=f"## Trending sound (owner adds when posting)\n\n{p['sound']} I cannot see the apps from here, so check the trending arrow before posting. The reel carries no audio (the music tool needs the FluidR3 soundfont, which is not installable in this environment).\n\n## TikTok trend used\n\n{p['trend']}\n\n"
    else:
        s+="## Slides\n\n"+"\n".join(p['slides'])+"\n\n"
    s+=f"## Cover text\n\n{p['cover']}\n\n## Caption (Instagram and Facebook)\n\n{p['cap_ig']}\n\n## Caption (TikTok)\n\n{p['cap_tt']}\n\n## Pinterest\n\n- Pin title: {p['pin_title']}\n- Pin description: {p['pin_desc']}\n- Board: {p['board']}\n- Format: {'video pin (the 9:16 file)' if reel else 'image pin 2:3 (`'+pid+'-pin.png`)'}\n\n## Call to action\n\n{p['cta']}\n\n## Destination URL\n\n"
    for c in ['instagram','facebook','tiktok','pinterest']: s+=f"- {c.capitalize() if c!='tiktok' else 'TikTok'}: {urls[c]}\n"
    s+=f"\n## Hashtags\n\n- Instagram, Facebook: {p['tags']}\n- TikTok: {p['tt_tags']}\n- Pinterest: none\n\n"
    if reel:
        s+=f"## YouTube Shorts\n\nTitle: {p['yt_title']}\nDescription:\n{p['yt_desc']}\n{urls['youtube']}\n{p['tags'].replace(' #christmasgift','').replace(' #thanksgiving','')}\n\nAltered or synthetic content: Yes\nAudience: No, it's not made for kids\n\n"
    s+=f"## Offer check\n\n"
    if pid>='S-20261127': s+="Uses BRICKFRIDAY25 (25% off, Nov 27 00:00 to Nov 29 23:59:59 ET, same collections as EARLYHOLIDAY20, does not combine). In `offers-calendar.md` its status is \"scheduled\" (owner in chat 2026-10-26: \"lets do black friday 25%\"), not yet \"active\". The post goes out on or after the start date. If the owner changes or cancels it, send this post back with `changes:`.\n"+("Not in the YouTube Short text: Shorts stay up for good, so the code is left out of it.\n" if reel else "")+"\n"
    else: s+="No code (owner decision 2026-10-26: no code Nov 23 to Nov 26). Only the verified Dec 15 order-by date, free shipping on US orders of $125 or more, and the optional free proof. No prices quoted.\n\n"
    s+=f"## AI image prompts and references\n\n{p['prompts']} Every bricked image is a MemoBrick Studio export (team editor, branch claude/memobrick-editor-standalone-0dyk45, headless through `window.MB_TEAM`, script `marketing/social/planner/2026-W48/tools/studio_export.js`), composited by `tools/kit.py`, `stills48.py` and `reels48.py`. The people are not presented as real customers.\n"
    open(P+pid+'.md','w').write(s)
print('ok')
