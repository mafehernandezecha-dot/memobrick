Status: done 2026-10-14 (steps 1 and 2 done; step 3 skipped by owner decision, see Result)

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

Scheduled Mac run 2026-10-14, account 672-499-4049 confirmed (authuser=1).

- Step 0 (read only): asset groups in "USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv" (filter "All but removed"). All are Eligible, ad strength Excellent. Products - Retargeting (signal: Your data + Interests and detailed demographics), Products - Keyword (Your data + Interests), Products - Full Audience (Your data + Interests), Products - Demographics (Interests only), Full Asset - Retargeting (Your data + Interests), Full Asset - Keyword (Interests only), Full Asset - Full Audience (Your data + Interests), plus an eighth row "Full Asset - Demographic" further down the table (its status was not read). The table shows signal types only; segment names were not opened.
- Step 1: DONE. The custom segment "MB buyers: gift and photo searches" was created as "People who searched for any of these terms on Google" with all 22 terms. Audience manager shows it under Custom segments, type Search terms, approval status "Under review", created Oct 14, 2026, not yet used anywhere. No segment with that name existed before.
- Step 2: NOT done. The "Christmas Gifts - Family" form was filled in (name, final URL, 12 headlines, 2 long headlines, 4 descriptions, with Google's auto-suggestions stopped) but never saved. The image picker has no "reuse another asset group's images" option, so matching the 19 images used by "Products - Full Audience" needs a hand pick from the asset library. Saving was also expected to be blocked: Claude Code's permission check blocked the "Save ad" click in the other task tonight. The draft was discarded, and no asset group was created.
- Step 3: NOT done. Clicking the Audience signal cell for "Products - Full Audience" in the asset groups table did not open an editor (tried twice). Nothing changed in either asset group.
- Note: the new-asset-group form showed Brand guidelines "Memobrick inc, 3 logos" (campaign level). It was not changed.
- Owner: paste the "Run it now" box into Claude in Chrome but skip step 1, because the segment already exists. Choose "Copy existing asset group" only if you are fine with it also copying that group's search themes; otherwise pick the images by hand.
- No budget, bid strategy, target, URL expansion, brand exclusion or other asset group was changed.

Owner run 2026-10-14 (Eden, Claude in Chrome extension), account 672-499-4049:
- Step 2: DONE. New asset group "Christmas Gifts - Family" in "USA - PMAX #2- Custom Photo Bricks - Sales - Maximize Conv", enabled: 12 headlines, 2 long headlines, 4 descriptions, call to action Shop now, the new final URL; same 20 images and 5 videos as "Products - Full Audience". Last check: Pending (under review), ad strength Excellent.
- Signal change: PMax audience signals do not offer search-term custom segments, so "MB buyers: gift and photo searches" (step 1) could not be used. A new interest-type custom segment "MB buyers: gift and photo interests" (12 terms) was created instead.
- Audience signal on "Christmas Gifts - Family": All visitors, All converters, in-market Gifts & Occasions, "MB buyers: gift and photo interests", ages 35-64. "Parents" was not selectable (only age-of-child subgroups), so it was skipped.
- Step 3: SKIPPED (owner decision on the coordinator's advice). "Products - Full Audience" and "Full Asset - Full Audience" share the saved audience "Full Audience", which is used in 4 asset groups including the paused PMax #1 campaign; editing it would change all 4. Both groups are Excellent and converting, and a signal is only a hint, so they were left unchanged.
- No budget, bid, target or other asset group was changed.
- Follow-up for ads-analyst: check "Christmas Gifts - Family" approval and first results on the next pacing check. The unused search-term segment "MB buyers: gift and photo searches" can stay (it costs nothing) or be reused in Search campaigns as an observation audience.
