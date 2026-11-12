P = '/home/user/memobrick/marketing/social/planner/2026-W49/'
W = 'marketing/social/planner/2026-W49/'
ED = 'https://mymemobrick.com/pages/editor?size=20x20&utm_source={c}&utm_medium=organic&utm_campaign={k}#editor'
GC = 'https://mymemobrick.com/collections/the-gift-for-everyone?utm_source={c}&utm_medium=organic&utm_campaign={k}'
STU = lambda size, studs, src, adj='saturation -10, temperature -5': f'{size} ({studs} studs), crop reset to the full photo ({src}), {adj}, other settings automatic (MemoBrick Studio, team editor, branch claude/memobrick-editor-standalone-0dyk45, headless through `window.MB_TEAM`).'
ORDER = 'Order by December 15 to get it before Christmas.'
SHIP = 'Free shipping on US orders of $125 or more.'
PROOF = "Not sure which photo? Our designers can create it and send a free proof before production. It's optional."
FOOT = ('Rights: all footage is from "footage memobrick 5" (F7071 kit `1BWqgv3ZlebkHeMFD1EK4I_KHboK0tJe9`, F7093 fingers pressing 1×1 bricks `1E3DFJDbupvxkfxYdj9p13kUw8IdCzpea`, F7089 hands filling a baseplate `1knhLwYr_JO62ef-tt1VwOg6wIMLZ1593`), '
        'marked `ok` in `marketing/social/footage-rights.md` (owner cleared all folders 2026-10-12). Only hands and the kit appear. No customer photos or submitted photos are used.')
TAIL = ', realistic portrait photo, plain soft light-gray wall background, even soft front lighting, faces fill most of the frame, looking at the camera, no text, letters, logos, frames or artwork anywhere" (1:1, no reference)'

posts = [
dict(id='S-20261130-1', date='2026-11-30', time='09:00', kind='reel', camp='2026-11-cyber-monday', url=ED, music=('warm', 4930),
 angle='Transformation for couples (best ad CTR: "MEN" 2.08% to 2.25%, 5 purchases) on the one day CYBERBRICK20 runs', series='none',
 fmt='Reel, real fingers pressing 1×1 bricks, a couple photo turning into its Studio mosaic row by row, the real kit opening, real building at 4×, the mosaic framed on a wall, end card with the code, about 16 seconds, original music (warm)',
 ai='an AI photo of a couple; the mosaic is a Studio export of it, the building and kit shots are real footage',
 studio=STU('20 × 20"', '64 × 64', 'an AI photo of a couple, 1:1') + ' 16 colors used.',
 exports='`S-20261130-1-studio-mosaic.png`',
 test='Part of the 70% proven formats (photo to bricks reel opening on real hands; couples). The 09:00 deal-day time repeats EXP-SP-20261127-01 so the two deal days can be read together; no new experiment.',
 hook='Cyber Monday. 20% off today',
 why='Couples and "for him" have the best ad click-through (`audience-insights.md`), and the reel opens on real fingers pressing bricks, the opening that held people longest (4.1 s, S-20261021-1). The code runs one day only (`offers-calendar.md`), so the post goes out at 09:00 to give the whole day; 20×20 is the most ordered size in the last 90 days (50 orders, Shopify).',
 shots=['0.0 to 1.3 s: real fingers pressing 1×1 bricks (F7093, 22 to 23.3 s). Text: "Cyber Monday", "20% off today".', '1.3 to 2.3 s: the AI couple photo. Text: "Your favorite photo of you two".', '2.3 to 4.3 s: the photo turns into the Studio mosaic row by row. Text: "Becomes 1×1 bricks".', '4.3 to 6.7 s: the real kit being opened (F7071, 3 to 5.4 s). Text: "The kit arrives".', '6.7 to 8.7 s: real hands filling a baseplate at 4× (F7089, 4 to 12 s). Text: "You build it together".', '8.7 to 11.2 s: the mosaic in a frame on a wall, slow push-in. Text: "About 4 hours for a 20×20".', '11.2 to 15.7 s: end card "20% off, today only", "Code CYBERBRICK20", pill "Start your design", "Ends 11:59 pm ET. Order by Dec 15.", mymemobrick.com.'],
 sound='Option 1: a warm, upbeat acoustic track from the Reels Trending tab; land the first beat on the first brick press at 0.3 s and a change on the wipe at 2.3 s. Option 2: a soft pop loop from TikTok trending.',
 trend="TikTok trend adapted: 'photo to finished piece' transformation edits (before, during, after on the beat).",
 cover='Cyber Monday: 20% off today',
 cap_ig="Cyber Monday: 20% off, today only. Your favorite photo of you two, built from 1×1 bricks.\n\nCode CYBERBRICK20 takes 20% off until 11:59 pm ET tonight, November 30. Or free shipping on US orders of $125 or more. Offers can't be combined.\n\nA 20×20 takes about 4 hours to build. See your mosaic before you order at the link in our bio. " + ORDER,
 cap_tt='Cyber Monday: 20% off today only with code CYBERBRICK20. Your photo of you two in 1×1 bricks. Order by Dec 15 for Christmas.',
 pin_title='Couple photo gift idea: your favorite photo of you two as a custom brick mosaic',
 pin_desc='Turn your favorite couple photo into a custom brick mosaic you build together from tiny 1×1 bricks. A personalized Christmas gift for your wife or husband and a DIY brick mosaic kit. Preview your mosaic before you order, and order by December 15 for Christmas.',
 board='Couple gift ideas', cta='Start your design.',
 tags='#cybermonday #couplegift #brickmosaic #photogift #christmasgift', tt_tags='#cybermonday #couplegift #brickmosaic #photogift',
 yt_title='Your favorite photo of you two, in 1×1 bricks #Shorts', yt_desc='See your own photo as a custom brick mosaic before you order at the link below.', yt_tags='#brickmosaic #couplegift #photogift #diygift',
 offer='Uses CYBERBRICK20 (20% off, Nov 30 00:00 to 23:59:59 ET, same collections as EARLYHOLIDAY20, does not combine with other offers or free shipping). In `offers-calendar.md` its status is "scheduled" (owner in chat 2026-10-26: "cybermonday 20%"), not yet "active". The post goes out on the code\'s only day. If the owner changes or cancels it, send this post back with `changes:`. Not in the YouTube Short text: Shorts stay up for good, so the code is left out of it (the end card in the video says "today only" and "Ends 11:59 pm ET").',
 prompts='Photo: "A happy couple in their 30s, a woman with long dark hair and a man with a short beard, cheek to cheek and smiling, cozy knit sweaters' + TAIL + '.'),

dict(id='S-20261201-1', date='2026-12-01', time='19:00', kind='carousel', camp='2026-12-gift-guide', url=GC, nslides=4,
 angle='Saveable Christmas gift guide by person (mom, partner, grandparents, dog lover, dad), landing on the gift collection', series='none',
 fmt='Carousel, 4 slides 4:5 (cream card with four Studio mosaics, "Who is on your list?" card, "And the rest of the list" card, "Order by December 15" card). TikTok photo carousel from the same 4 slides; Pinterest pin 2:3 (`-pin.png`).',
 ai='AI photos of a mother and daughter, a couple, two siblings and a golden retriever; every mosaic is a Studio export of them',
 studio=STU('20 × 20"', '64 × 64', 'AI photos, 1:1') + ' The dog is 20 × 30" (64 × 96 studs, 2:3 photo), same adjustments, shown square-cropped in the grid.',
 exports='`S-20261201-1-studio-momdaughter.png`, `-studio-couple.png`, `-studio-siblings.png`, `-studio-golden.png`',
 test='Test EXP-SP-20261201-01: a gift guide carousel that links to the gift collection (11.7% cart rate) instead of the editor. Learns whether a collection landing turns social clicks into carts better than the editor.',
 hook='One gift for everyone on your list',
 why='Carousels get about 4× the engagement of reels (8.6% vs 2.3%) and gift guides are what people save in December. Family, couples and pets are the top three themes (`audience-insights.md`). The gift collection converts best of our landing pages (task board, 11.7% cart rate).',
 slides=['1. Cream card, four Studio mosaics (mom and daughter, couple, siblings, golden retriever). "One gift for everyone on your list", "Their favorite photo, in 1×1 bricks".', '2. "Who is on your list?": for mom, for your partner, for the grandparents.', '3. "And the rest of the list": for the dog lover, for dad, for the whole family.', '4. "Order by December 15": get it before Christmas, free shipping on US orders of $125 or more, optional free proof. Button "Find their gift".'],
 cover='One gift for everyone on your list',
 cap_ig="One gift for everyone on your list. Save this for your Christmas shopping.\n\nFor mom, the photo of you two. For your partner, your favorite photo together. For the grandparents, the grandkids. For the dog lover, their dog. Each one is a custom brick mosaic built from 1×1 bricks.\n\nFind their gift at the link in our bio. " + ORDER + ' ' + SHIP,
 cap_tt='One gift for everyone on your list, in 1×1 bricks. Save this for later. Order by Dec 15 for Christmas.',
 pin_title='Personalized Christmas photo gifts for everyone on your list: custom brick mosaics',
 pin_desc='Christmas gift ideas for mom, your partner, the grandparents and the dog lover: a custom brick mosaic made from their favorite photo. A personalized photo gift and DIY brick mosaic kit built from 1×1 bricks. Order by December 15 for Christmas.',
 board='Christmas gift ideas', cta='Find their gift.',
 tags='#giftguide #christmasgift #photogift #brickmosaic #personalizedgift', tt_tags='#giftguide #christmasgift #photogift #brickmosaic',
 offer='No code. Only the verified Dec 15 order-by date, free shipping on US orders of $125 or more, and the optional free proof. No prices quoted.',
 prompts='Mother and daughter: "A smiling mother in her 60s with short silver hair and her adult daughter in her 30s, cheek to cheek, warm sweaters' + TAIL + '. Couple: same photo as S-20261130-1. Siblings: "Two young siblings, a girl age 7 and a boy age 5, hugging and laughing, cheek to cheek, red holiday sweaters' + TAIL + '. Dog: same photo as S-20261202-1.'),

dict(id='S-20261202-1', date='2026-12-02', time='19:00', kind='reel', camp='2026-12-pet-episode-5', url=ED, music=('playful', 4932),
 angle='Pets, running series "We brick your pet" Episode 5 (a golden retriever in a holiday scarf), with a follow invite for Episode 6', series='We brick your pet, Episode 5 (weekly series; Episode 4 is S-20261126-1)',
 fmt='Reel, real fingers pressing 1×1 bricks, a golden retriever photo turning into its Studio mosaic, slow zoom into the face, real building at 3×, mosaic on a wall, call to action, about 15 seconds, original music (playful)',
 ai='an AI photo of a golden retriever; the mosaic is a Studio export of it, the building shots are real footage',
 studio=STU('20 × 30"', '64 × 96', 'an AI photo of a golden retriever, 2:3', 'saturation 0, temperature 0 (the default -35/-15 turned the golden coat brown and grey)') + ' 18 colors used.',
 exports='`S-20261202-1-studio-mosaic.png`',
 test='Part of the 70% proven themes (pets, the cheapest ad purchases at $25.45; the running series). No separate experiment.',
 hook='We brick your pet, Episode 5',
 why='Pets are the second theme and the cheapest purchases in the ads (dog video, $25.45). A numbered series gives people a reason to follow, and the reel opens on real fingers pressing bricks in the first second, the opening that held people longest.',
 shots=['0.0 to 1.5 s: real fingers pressing 1×1 bricks (F7093, 20 to 21.5 s). Text: "We brick your pet", "Episode 5".', '1.5 to 2.3 s: the AI golden retriever photo. Text: "Their photo".', '2.3 to 4.3 s: the photo turns into the Studio mosaic row by row. Text: "Becomes bricks".', '4.3 to 6.9 s: slow zoom into the face of the mosaic. Text: "Every whisker is a 1×1 brick".', '6.9 to 8.9 s: real hands filling a baseplate at 3× (F7089, 6 to 12 s). Text: "Brick by brick".', '8.9 to 11.4 s: the mosaic in a frame on a wall, slow push-in. Text: "Ready for Christmas".', '11.4 to 15.4 s: end card "Your pet, in bricks", "Follow for Episode 6", pill "Start your design", "Order by December 15 for Christmas.", mymemobrick.com.'],
 sound='Option 1: a bouncy, playful trending sound from the Reels Trending tab; land the beat on the wipe at 2.3 s and the zoom start at 4.3 s. Option 2: a cheerful holiday-feel loop from TikTok trending (no lyrics about other brands).',
 trend="TikTok trend adapted: 'POV: your dog becomes art' pet transformation edits.",
 cover='We brick your pet, Ep. 5',
 cap_ig="We brick your pet, Episode 5. A golden retriever in a holiday scarf, built from 1×1 bricks.\n\nZoom in and every whisker is a brick. A 20×30 takes about 6 hours to build, and the kit has the bricks, baseplates, a color map and the tool.\n\nFollow for Episode 6 next week. See your pet as a mosaic at the link in our bio. " + ORDER,
 cap_tt='We brick your pet, Episode 5: a golden retriever in 1×1 bricks. Follow for Episode 6. Order by Dec 15 for Christmas.',
 pin_title='Custom dog portrait gift: a golden retriever photo turned into a brick mosaic',
 pin_desc='Turn your dog\'s photo into a custom brick mosaic built from tiny 1×1 bricks. A custom pet portrait gift and one of the best Christmas gifts for dog lovers, built at home from a DIY brick mosaic kit. Order by December 15 for Christmas.',
 board='Pet gift ideas', cta='Start your design.',
 tags='#webrickyourpet #doggift #petgift #brickmosaic #christmasgift', tt_tags='#webrickyourpet #doggift #petgift #brickmosaic',
 yt_title='We brick your pet, Episode 5: a golden retriever in 1×1 bricks #Shorts', yt_desc='See your own pet as a custom brick mosaic before you order at the link below.', yt_tags='#brickmosaic #doggift #petgift #diygift',
 offer='No code (CYBERBRICK20 ended Nov 30). Only the verified Dec 15 order-by date. No prices quoted.',
 prompts='Photo: "A happy golden retriever wearing a red knit holiday scarf, head and chest, looking at the camera, realistic portrait photo, plain soft light-gray wall background, even soft front lighting, face fills most of the frame, no text, letters, logos, frames or artwork anywhere" (2:3, no reference). Checked: the scarf pattern is knit snowflakes and a reindeer, no letters or logos.'),

dict(id='S-20261203-1', date='2026-12-03', time='19:00', kind='carousel', camp='2026-12-whats-in-the-box', url=ED, nslides=4,
 angle='Objection answered: what is in the kit, which size, how long, how much (real kit footage, no mosaic image)', series='none',
 fmt='Carousel, 4 slides 4:5 (a real frame of the open kit on a cream card, "In every kit" card, "Pick your size" card with pieces, build time and price, "See yours before you order" card). TikTok photo carousel from the same 4 slides; Pinterest pin 2:3.',
 ai='none: slide 1 is a still from real owner footage of the kit; slides 2 to 4 are text cards',
 studio='none: no bricked image in this post (the kit photo shows the box, the manual and the color bags only).',
 exports='none',
 test='Part of the 70% proven formats: the Oct 23 kit carousel ("What actually comes in a Memobrick kit?") had the best engagement of any post (8.74%, 2 comments). No separate experiment.',
 hook="What's in the box?",
 why='The kit carousel is our best engaging post so far (8.74%, Buffer). Sizes, build time and kit contents are the most asked questions (`customer-questions.md`), and a real photo of the kit answers them honestly. 20×20 is the most ordered size in the last 90 days (50 orders, Shopify).',
 slides=["1. Cream card with a real still of the open kit (F7071 at 8.2 s: the box, the user manual and the labeled color bags). \"What's in the box?\", \"A real Memobrick kit\".", '2. "In every kit": 1×1 bricks in labeled color bags, baseplates, your color map, the building tool (frames sold separately).', '3. "Pick your size": 16×16 (2,500 pieces, about 2.5 hours, $69.88), 20×20 (4,096 pieces, about 4 hours, $99.88, our most ordered size), 20×30 (6,144 pieces, about 6 hours, $149.00).', '4. "See yours before you order": upload a photo, order by December 15, free shipping on US orders of $125 or more. Button "Start your design".'],
 cover="What's in the box?",
 cap_ig="What's in the box? Everything you need to build your photo.\n\nEvery kit has 1×1 bricks sorted in labeled color bags, white baseplates, a color map printed from your photo, and the building tool. Frames are sold separately.\n\n16×16: 2,500 pieces, about 2.5 hours, $69.88. 20×20: 4,096 pieces, about 4 hours, $99.88. 20×30: 6,144 pieces, about 6 hours, $149.00.\n\nSee your mosaic before you order at the link in our bio. " + ORDER,
 cap_tt="What's in a Memobrick kit? Bricks, baseplates, your color map and the tool. Save this. Order by Dec 15 for Christmas.",
 pin_title='What comes in a custom photo brick mosaic kit: sizes, pieces and build time',
 pin_desc='Inside a custom brick mosaic kit: 1×1 bricks in labeled color bags, baseplates, a color map made from your photo and the building tool. How long does a brick mosaic take to build? About 4 hours for a 20×20. Order by December 15 for Christmas.',
 board='Christmas gift ideas', cta='Start your design.',
 tags='#brickmosaic #diygift #photogift #christmasgift #giftideas', tt_tags='#brickmosaic #diygift #photogift #christmasgift',
 offer='No code. Prices are the "No (Build at home)" kit prices in Shopify, checked 2026-11-12 (16×16 $69.88, 20×20 $99.88, 20×30 $149.00, same as `product-facts.md`); pieces and build times from `product-facts.md`. If a price changes before Dec 3, send this post back with `changes: S-20261203-1 new price`. "Our most ordered size": 20×20 had the most orders of any product in Shopify over the last 90 days (50, Nov 12).',
 prompts='No AI image. Slide 1 is a frame of F7071 (Drive `1BWqgv3ZlebkHeMFD1EK4I_KHboK0tJe9`, 8.2 s), cropped, no faces; the hand at the left edge is the owner footage\'s.'),

dict(id='S-20261204-1', date='2026-12-04', time='19:00', kind='reel', camp='2026-12-guess-the-photo-5', url=ED, music=('playful', 4934),
 angle='Running series "Guess the photo Friday" with a new multiple-choice prompt (A, B or C), revealing a dad and daughter photo (gifts for him)', series='Guess the photo Friday, Episode 5 (Episode 4 is S-20261120-1)',
 fmt='Reel, real fingers pressing 1×1 bricks, a slow zoom out from the studs of a Studio mosaic with three answer choices on screen, the reveal, the mosaic turning back into the photo, real fingers pressing bricks, end card on a wall, about 16 seconds, original music (playful)',
 ai='an AI photo of a dad and his daughter; the mosaic is a Studio export of it, the building shots are real footage',
 studio=STU('20 × 20"', '64 × 64', 'an AI photo of a dad and daughter, 1:1') + ' 16 colors used.',
 exports='`S-20261204-1-studio-mosaic.png`',
 test='Test EXP-SP-20261204-01 (new format): guess the photo with three answer choices on screen ("A, B or C? Comment your guess") instead of an open question. Learns whether a one-letter answer gets more comments per 1,000 plays than the open zoom-out (Oct 30 episode: 0 comments, 166 reach).',
 hook='Guess the photo Friday. A, B or C?',
 why='Guess the photo is the series with the only reel saves (`audience-insights.md`) and its Oct 30 episode held people 4.45 s, our second best, but it got 0 comments. A one-letter answer is easier to type. The answer is a dad and daughter: "MEN" ads have the best click-through (2.08% to 2.25%).',
 shots=['0.0 to 1.4 s: real fingers pressing 1×1 bricks (F7093, 18 to 19.4 s). Text: "Guess the photo Friday", "Episode 5".', '1.4 to 3.9 s: zoom out from the studs of the Studio mosaic (10× to about 4×). Text: "A, B or C?", "A: a grandma", "B: dad and daughter", "C: a puppy".', '3.9 to 6.4 s: zoom out to the whole mosaic. Text: "Comment your guess".', '6.4 to 7.6 s: the full mosaic. Text: "It is B: dad and daughter".', '7.6 to 9.2 s: the mosaic turns into the photo row by row. Text: "The photo behind it".', '9.2 to 11.6 s: real fingers pressing 1×1 bricks (F7093, 2 to 4.4 s). Text: "Built from 1×1 bricks".', '11.6 to 15.6 s: end card "A gift for dad", "New guess every Friday", pill "Start your design", "Order by December 15 for Christmas.", mymemobrick.com.'],
 sound='Option 1: a quiz or ticking countdown sound from the Reels Trending tab; land the reveal hit at 6.4 s. Option 2: a playful "guess" trend audio from TikTok trending.',
 trend="TikTok trend adapted: 'A, B or C? comment your answer' quiz videos.",
 cover='Guess the photo: A, B or C?',
 cap_ig="Guess the photo Friday, Episode 5. A, B or C? Comment your guess, then watch to the end.\n\nEvery picture here is built from small 1×1 bricks. A 20×20 takes about 4 hours to build, and the kit has everything you need.\n\nFollow for next Friday's guess. See your own photo as a mosaic at the link in our bio. " + ORDER,
 cap_tt='Guess the photo Friday: A, B or C? Comment before the reveal. Order by Dec 15 for Christmas.',
 pin_title='Custom photo gift for dad: a dad and daughter photo turned into a brick mosaic',
 pin_desc='Watch a custom brick mosaic zoom out from the 1×1 bricks to a dad and daughter photo. A personalized photo gift for dad and a DIY brick mosaic kit to build together. Order by December 15 for Christmas.',
 board='Family photo gifts', cta='Start your design.',
 tags='#guessthephoto #giftfordad #brickmosaic #photogift #christmasgift', tt_tags='#guessthephoto #giftfordad #brickmosaic #photogift',
 yt_title='Guess the photo: A, B or C? A photo built from 1×1 bricks #Shorts', yt_desc='Guess before the reveal, then see your own photo as a custom brick mosaic at the link below.', yt_tags='#guessthephoto #brickmosaic #giftfordad #photogift',
 offer='No code. Only the verified Dec 15 order-by date. No prices quoted.',
 prompts='Photo: "A smiling dad in his 40s with dark short hair and his daughter age 8 with braids, cheek to cheek, plaid flannel shirt' + TAIL + '.'),

dict(id='S-20261205-1', date='2026-12-05', time='11:00', kind='carousel', camp='2026-12-gift-for-mom', url=GC, nslides=3,
 angle='Family photo as the gift (best-selling ad theme, 8 purchases), for mom, landing on the gift collection', series='none',
 fmt='Carousel, 3 slides 4:5 (AI Christmas living room with the Studio mosaic of a mother and daughter in a frame, "Why it works for mom" card, "Order by December 15" card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3.',
 ai='an AI living room and an AI photo of a mother and daughter; the mosaic is a Studio export of the photo, composited onto the wall',
 studio=STU('20 × 20"', '64 × 64', 'an AI photo of a mother and her adult daughter, 1:1') + ' 16 colors used. Same export as the S-20261201-1 grid.',
 exports='`S-20261205-1-studio-mosaic.png`',
 test='Part of the 70% proven themes (family photo; the Nov 18 "for mom" post moved to the gift collection on 2026-11-11). Counts toward EXP-SP-20261201-01 (gift collection landing).',
 hook='A gift for mom',
 why='Family photo is the best-selling ad theme (8 purchases) and moms are the largest gift group in the buyer profile. A weekend morning carousel is when a woman 35 to 64 browses (`audience-insights.md`), and the gift collection is our best converting landing page.',
 slides=['1. AI Christmas living room, Studio mosaic of a mother and daughter framed on the wall. "A gift for mom", "Your favorite photo of you two."', '2. "Why it works for mom": a photo she already loves, built from 1×1 bricks (about 4 hours for a 20×20), see it before you order (frames sold separately).', '3. "Order by December 15": get it before Christmas, free shipping on US orders of $125 or more, optional free proof. Button "Find her gift".'],
 cover='A gift for mom',
 cap_ig="A gift for mom. Your favorite photo of you two, built from 1×1 bricks.\n\nPick a photo where your faces fill the frame. The kit has the bricks, baseplates, a color map and the tool. A 20×20 takes about 4 hours to build. Frames are sold separately.\n\nFind her gift at the link in our bio. " + ORDER,
 cap_tt='A gift for mom: your favorite photo of you two, in 1×1 bricks. Order by Dec 15 for Christmas.',
 pin_title='Personalized Christmas gift for mom: your favorite photo together as a brick mosaic',
 pin_desc='A custom brick mosaic of you and mom, made from your favorite photo and built from tiny 1×1 bricks. A personalized photo gift for mom or your mother in law, and a DIY brick mosaic kit. Order by December 15 for Christmas.',
 board='Family photo gifts', cta='Find her gift.',
 tags='#giftformom #christmasgift #photogift #brickmosaic #familyphoto', tt_tags='#giftformom #christmasgift #photogift #brickmosaic',
 offer='No code. Only the verified Dec 15 order-by date, free shipping on US orders of $125 or more, and the optional free proof. No prices quoted. The frame on slide 1 is allowed: slide 2 and the caption say frames are sold separately.',
 prompts='Photo: same mother and daughter photo as S-20261201-1. Room 4:5: "Realistic lifestyle interior photo, warm natural morning light, no people, a bright cozy living room decorated for Christmas with a small decorated tree on the right, a beige sofa with cushions and a knit throw, a wooden console table with a candle, and a large plain smooth empty cream wall in the center and upper left with nothing hanging on it. No text, letters, logos, frames, pictures or artwork anywhere" (4:5, no reference). Room 2:3 for the pin: the same prompt with the wall filling the upper two thirds (2:3, no reference).'),

dict(id='S-20261206-1', date='2026-12-06', time='11:00', kind='carousel', camp='2026-12-order-by-dec-15', url=ED, nslides=3,
 angle='Deadline: order by December 15, how it works and the optional free proof (grandkids photo)', series='none',
 fmt='Carousel, 3 slides 4:5 (cream card with the Studio mosaic of two siblings and "Order by December 15", "How it works" card, "Not sure which photo?" card). TikTok photo carousel from the same 3 slides; Pinterest pin 2:3.',
 ai='an AI photo of two siblings; the mosaic is a Studio export of it',
 studio=STU('20 × 20"', '64 × 64', 'an AI photo of two young siblings, 1:1') + ' 15 colors used. Same export as the S-20261201-1 grid.',
 exports='`S-20261206-1-studio-mosaic.png`',
 test='Part of the 70% proven formats (deadline card; the Nov 1 order-by post got the first share on Facebook). No separate experiment.',
 hook='Order by December 15',
 why='A true deadline is the strongest reason to order now, and Dec 1 to 15 is the 20-orders-a-day period (`sales-goals.json`). The Nov 1 "Order by December 15" post got our first Facebook share. The last slide offers the free proof for people stuck on which photo (draft orders, the designer proof route, are down 77%).',
 slides=['1. Cream card with the Studio mosaic of two siblings. "Order by December 15", "To get it before Christmas".', '2. "How it works": upload a photo, see your mosaic, build it at home.', '3. "Not sure which photo?": optional free proof, free shipping on US orders of $125 or more, order by December 15. Button "Start your design".'],
 cover='Order by December 15',
 cap_ig=ORDER + "\n\nUpload a photo, see your custom brick mosaic before you order, and build it at home from 1×1 bricks. " + PROOF + "\n\nStart your design at the link in our bio. " + SHIP,
 cap_tt='Order by December 15 to get it before Christmas. Your photo in 1×1 bricks.',
 pin_title='Last minute personalized Christmas gift: order a custom photo brick mosaic by December 15',
 pin_desc='Order a custom brick mosaic by December 15 to get it before Christmas. Upload a photo of the grandkids or the whole family and see it as a mosaic before you order. A personalized Christmas photo gift and DIY brick mosaic kit.',
 board='Christmas gift ideas', cta='Start your design.',
 tags='#christmasgift #photogift #brickmosaic #giftsforgrandparents #diygift', tt_tags='#christmasgift #photogift #brickmosaic #diygift',
 offer='No code. Only the verified Dec 15 order-by date, free shipping on US orders of $125 or more, and the optional free proof. No prices quoted.',
 prompts='Photo: same siblings photo as S-20261201-1.'),
]

for p in posts:
    pid = p['id']; reel = p['kind'] == 'reel'
    urls = {c: p['url'].format(c=c, k=p['camp']) for c in ['instagram', 'facebook', 'tiktok', 'pinterest', 'youtube']}
    ch = 'Instagram (Reel), Facebook (Reel), TikTok (video), Pinterest (video pin), YouTube (Short)' if reel else 'Instagram (carousel), Facebook (carousel), TikTok (photo carousel), Pinterest (pin)'
    s = f"# {pid}\n\n- Post ID: {pid}\n- Campaign: {p['camp']}\n- Angle: {p['angle']}\n- Series: {p['series']}\n- Channel(s): {ch}\n- Format: {p['fmt']}\n"
    if reel:
        s += f"- Asset (9:16, with original music): {W}{pid}.mp4\n- Preview: {W}{pid}-preview.jpg\n"
    else:
        sl = ', '.join([f'{pid}.png'] + [f'{pid}-{i}.png' for i in range(2, p['nslides'] + 1)])
        s += f"- Asset (4:5 slides, in order): {W}{sl}; Pinterest 2:3: {W}{pid}-pin.png\n"
    s += f"- Scheduled time (ET): {p['date']} {p['time']}\n"
    s += (f"- AI image: turn on the AI label ({p['ai']}).\n" if p['ai'] != 'none' and not p['ai'].startswith('none') else f"- AI image: no ({p['ai'][6:]}).\n")
    s += f"- Studio: {p['studio']}" + (f" Export: {p['exports']}.\n" if p['exports'] != 'none' else "\n")
    s += f"- New content check: new post, not on Instagram yet.\n- Test: {p['test']}\n\n"
    s += f"## Hook and why it should work\n\nHook: \"{p['hook']}\". {p['why']}\n\n"
    if reel:
        s += "## Shots (clips used)\n\n" + "\n".join(f"{i+1}. {x}" for i, x in enumerate(p['shots'])) + "\n\n" + FOOT + "\n\n"
        m, seed = p['music']
        s += f"## Music\n\nOriginal background music from `marketing/social/publisher/music/add-music.sh {m} <in> <out> {seed}` (composed by the script, FluidR3 soundfont, MIT license), already in the mp4.\n\n"
        s += f"## Trending sound (owner may add when posting)\n\n{p['sound']} I cannot see the apps from here, so check the trending arrow before posting; the reel already has its own music.\n\n## TikTok trend used\n\n{p['trend']}\n\n"
    else:
        s += "## Slides\n\n" + "\n".join(p['slides']) + "\n\n"
    s += f"## Cover text\n\n{p['cover']}\n\n## Caption (Instagram and Facebook)\n\n{p['cap_ig']}\n\n## Caption (TikTok)\n\n{p['cap_tt']}\n\n## Pinterest\n\n- Pin title: {p['pin_title']}\n- Pin description: {p['pin_desc']}\n- Board: {p['board']}\n- Format: {'video pin (the 9:16 file)' if reel else 'image pin 2:3 (`' + pid + '-pin.png`)'}\n\n## Call to action\n\n{p['cta']}\n\n## Destination URL\n\n"
    for c, n in [('instagram', 'Instagram'), ('facebook', 'Facebook'), ('tiktok', 'TikTok'), ('pinterest', 'Pinterest')]:
        s += f"- {n}: {urls[c]}\n"
    if reel: s += f"- YouTube: {urls['youtube']}\n"
    s += f"\n## Hashtags\n\n- Instagram, Facebook: {p['tags']}\n- TikTok: {p['tt_tags']}\n- Pinterest: none\n\n"
    if reel:
        s += f"## YouTube Shorts\n\nTitle: {p['yt_title']}\nDescription:\n{p['yt_desc']}\n{urls['youtube']}\n{p['yt_tags']}\n\nAltered or synthetic content: Yes\nAudience: No, it's not made for kids\n\n"
    s += f"## Offer check\n\n{p['offer']}\n\n"
    s += f"## AI image prompts and references\n\n{p['prompts']} No image tool drew a mosaic. Every bricked image is a MemoBrick Studio export (script `{W}tools/studio_export.js`), composited by `{W}tools/kit.py` and `build49.py`. The people and pets shown are AI images and are not presented as real customers.\n"
    open(P + pid + '.md', 'w').write(s)
print('ok')
