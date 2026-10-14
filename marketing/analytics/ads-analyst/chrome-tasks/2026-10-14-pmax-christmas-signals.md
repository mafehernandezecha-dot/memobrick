Status: ready

# Claude in Chrome task: PMax #2 buyer signal and Christmas asset group (approval item: A-2026W42-027, approved 2026-10-14, expires 2026-10-21; from P-ads-analyst-20261014-4)

Change file: `marketing/analytics/ads-analyst/changes/google-pmax-christmas-signals.md`. Owner approved in chat 2026-10-14 ("make them work on the ads as well, the traffic needs to improve today"). No budget change.

## Run it now (Eden, by hand)

Open Chrome, signed in to Google Ads, open the Claude in Chrome extension, and paste the box below. It is the whole task. If the scheduled Mac run stopped on a blocked "Save" click, this is the way to finish it.

```
In my Google Ads account 672-499-4049 (Memobrick), I approved this. Do exactly this and nothing else. If the account shown is not 672-499-4049, switch Google accounts with the account chooser (never sign in or out) or stop and tell me.

1) Tools > Shared library > Audience manager > Custom segments > +. Name "MB buyers: gift and photo searches", type "People who searched for any of these terms on Google". Terms: memobrick, photobrick, memobrick frame, custom photo mosaic, photo mosaic kit, brick mosaic kit, custom brick mosaic, personalized photo gift, personalized photo gifts, christmas gift from photo, photo gift for christmas, personalized christmas gift for family, family photo gift, gift for grandparents photo, gift for mom from photo, anniversary gift from photo, couple photo gift, custom pet portrait, pet memorial gift, dog portrait gift, diy photo mosaic, photo art kit. Save. If that name already exists, use the existing one and tell me.

2) Campaign "USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv" (ID 23775628961) > Asset groups > + New asset group, name "Christmas Gifts - Family":
- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Images, logos, video: reuse the ones "Products - Full Audience" uses (from the asset library; upload nothing new).
- Headlines: Your Family Photo in Bricks | Christmas Gift for Mom | Photo Gift for Grandparents | A Gift for Your Partner | Your Pet in Bricks | Order by Dec 15 for Christmas | 20% Off With EARLYHOLIDAY20 | As Seen On FOX | Free Design Proof on Request | A Gift They Build Together | Custom Brick Mosaic Kit | Personalized Photo Gift
- Long headlines: Turn your favorite family photo into a brick mosaic you build together this Christmas | A personalized photo gift for mom, grandparents or your partner. Order by Dec 15
- Descriptions: Upload a photo, see it in bricks, and pick your size. | A gift for mom, grandparents or your partner, made from a photo that matters to you. | Order by Dec 15 for Christmas. Free design proof on request if you want our help. | Upload a photo, see it in bricks, and pick your size. 20% off with EARLYHOLIDAY20.
- Business name Memobrick. Call to action Shop now if offered, otherwise Automated.
- Audience signal: the custom segment from step 1; if listed, in-market "Gifts & Occasions" and detailed demographic "Parents"; existing website visitors and all converters lists if they exist (create none); ages 35-64 if offered.
- Save the asset group (enabled).

3) In asset groups "Products - Full Audience" and "Full Asset - Full Audience", edit the audience signal and ADD the custom segment from step 1. Remove nothing. Save.

Do not change budgets, bid strategy, targets, URL expansion, brand exclusions, other asset groups' texts or images, and do not resume any paused asset group. If Google rejects a text or shows a policy warning, stop and tell me which. At the end tell me: the new asset group's status and ad strength, and which signals you added where.
```

## Scheduled Mac run (21:07, or `bash "$HOME/Library/Application Support/Memobrick/run-task.sh" chrome-tasks`)

Same change as above, in more detail (adds a read-only Step 0). If Claude Code's permission check blocks a "Save" or "Create" click, do not retry: set the first line to `Status: needs owner (save click blocked; paste the "Run it now" box into Claude in Chrome)`, write what was done and what was not in the Result section, and move on. On 2026-10-13 the Google account that lists 672-499-4049 was the second signed-in account (authuser=1).

Google login: Chrome has several Google accounts signed in. If Google Ads shows an account chooser or the wrong account, open the chooser and try each signed-in Google account until one lists 672-499-4049 (it is not memobrickofficial@gmail.com and not mafehernandezecha2@gmail.com). Never sign in or out, never enter a password.

```
You are helping me in my Google Ads account 672-499-4049 (Memobrick). I approved this change; do exactly this and nothing else.

First confirm the account at the top of Google Ads is 672-499-4049. If it is not, stop and tell me.

Campaign: "USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv".

Step 0 (read only): open Asset groups. For each asset group write down its status and its audience signal (the names of the segments in it). Do not change anything in this step.

Step 1: create a custom segment. Go to Tools > Shared library > Audience manager > Custom segments > +. Name: "MB buyers: gift and photo searches". Choose "People who searched for any of these terms on Google". Add these terms, one per line:
memobrick
photobrick
memobrick frame
custom photo mosaic
photo mosaic kit
brick mosaic kit
custom brick mosaic
personalized photo gift
personalized photo gifts
christmas gift from photo
photo gift for christmas
personalized christmas gift for family
family photo gift
gift for grandparents photo
gift for mom from photo
anniversary gift from photo
couple photo gift
custom pet portrait
pet memorial gift
dog portrait gift
diy photo mosaic
photo art kit
Save. If a segment with this name already exists, use the existing one and tell me.

Step 2: in the PMax campaign, Asset groups > + New asset group. Name: "Christmas Gifts - Family".
- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Images, logos and video: if Google offers to use assets from another asset group, choose "Products - Full Audience". Otherwise pick from the asset library the same images, logos and the YouTube video 7_kR3ntRvkI that "Products - Full Audience" uses. Do not upload anything new.
- Headlines (one per field): Your Family Photo in Bricks / Christmas Gift for Mom / Photo Gift for Grandparents / A Gift for Your Partner / Your Pet in Bricks / Order by Dec 15 for Christmas / 20% Off With EARLYHOLIDAY20 / As Seen On FOX / Free Design Proof on Request / A Gift They Build Together / Custom Brick Mosaic Kit / Personalized Photo Gift
- Long headlines: "Turn your favorite family photo into a brick mosaic you build together this Christmas" and "A personalized photo gift for mom, grandparents or your partner. Order by Dec 15"
- Descriptions: "Upload a photo, see it in bricks, and pick your size." / "A gift for mom, grandparents or your partner, made from a photo that matters to you." / "Order by Dec 15 for Christmas. Free design proof on request if you want our help." / "Upload a photo, see it in bricks, and pick your size. 20% off with EARLYHOLIDAY20."
- Business name: Memobrick. Call to action: Shop now if offered, otherwise Automated.
- Audience signal: add the custom segment "MB buyers: gift and photo searches". Under Interests and detailed demographics add, only if they are listed: in-market "Gifts & Occasions" (holiday or personalized gifts) and detailed demographics "Parents". Under Your data add the existing website visitors and all converters segments, if they exist; do not create any list. Under Demographics, if offered, age 35-44, 45-54, 55-64 (this is a signal, not a limit).
- Save the asset group as enabled.

Step 3: open "Products - Full Audience" and "Full Asset - Full Audience". In each one, edit the audience signal and ADD the custom segment "MB buyers: gift and photo searches". Remove nothing. Save.

Do not change any budget, bid strategy, target, other asset group's texts or images, URL expansion, brand exclusions or campaign settings. Do not resume any paused asset group. If Google rejects a text or shows a policy warning, stop and tell me which text. If anything looks different from what I describe, stop and ask me.

When done, tell me: the Step 0 list, the new asset group's status and ad strength, and which signals you added where.
```

## Result

(filled in by the owner's Chrome routine)
