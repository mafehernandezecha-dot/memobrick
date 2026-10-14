Status: done 2026-10-14 (owner, via Claude in Chrome extension: ad B "Christmas Photo Gifts" saved and Eligible; ad A was already live)

# Claude in Chrome task: Holiday Gifts occasion ads (approval item: A-2026W42-026, approved 2026-10-14, expires 2026-10-21; from P-ads-analyst-20261014-3)

Change file: `marketing/analytics/ads-analyst/changes/google-holiday-gifts-occasion-ads.md`. Owner approved in chat 2026-10-14 ("make them work on the ads as well, the traffic needs to improve today").

## Run it now (Eden, by hand)

Open Chrome, signed in to Google Ads, open the Claude in Chrome extension, and paste the box below. It is the whole task. If the scheduled Mac run stopped on a blocked "Save" click, this is the way to finish it.

```
In my Google Ads account 672-499-4049 (Memobrick), I approved this. Do exactly this and nothing else. If the account shown is not 672-499-4049, switch Google accounts with the account chooser (never sign in or out) or stop and tell me.

Campaign "MB | Search | Holiday Gifts | Purchases | Q4 2026" (ID 24325020428). In EACH of its two ad groups, "Gifts For Family & Couples" and "Christmas Photo Gifts", click + New ad > Responsive search ad and create ONE new ad:
- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / family (in "Gifts For Family & Couples") or gifts / christmas (in "Christmas Photo Gifts")
- 15 headlines, one per field: Christmas Gift for Mom | Photo Gift for Grandparents | A Gift for Your Partner | Gifts for Mom, Dad and Grandma | Your Family Photo in Bricks | A Gift They Build Together | Build It as a Family | Turn Your Dog Into Brick Art | Your Pet in Bricks | Order by Dec 15 for Christmas | 20% Off With EARLYHOLIDAY20 | As Seen On FOX | Free Design Proof on Request | Custom Brick Mosaic Kit | Personalized Photo Gift
- Pin only "Order by Dec 15 for Christmas" to Headline position 2.
- 4 descriptions: A gift for mom, grandparents or your partner, made from a photo that matters to you. | Turn a family photo into a DIY brick mosaic kit. Build it together, then hang it up. | Upload a photo, see it in bricks, and pick your size. 20% off with EARLYHOLIDAY20. | Order by Dec 15 for Christmas. Free design proof on request if you want our help.
- Click "Save ad" (the ad stays enabled).
Do not edit, pause or remove the existing ads, and do not touch budgets, bids, keywords, audiences or settings. If Google shows a policy warning or an ad group name differs, stop and tell me. At the end, tell me for each new ad: ad group, final URL, number of headlines and descriptions saved, and status.
```

## Scheduled Mac run (21:07, or `bash "$HOME/Library/Application Support/Memobrick/run-task.sh" chrome-tasks`)

Same change as above, in more detail. If Claude Code's permission check blocks the "Save ad" click, do not retry: set the first line to `Status: needs owner (save click blocked; paste the "Run it now" box into Claude in Chrome)`, write what was typed but not saved in the Result section, and move on. On 2026-10-13 the Google account that lists 672-499-4049 was the second signed-in account (authuser=1).

Google login: Chrome has several Google accounts signed in. If Google Ads shows an account chooser or the wrong account, open the chooser and try each signed-in Google account until one lists 672-499-4049 (it is not memobrickofficial@gmail.com and not mafehernandezecha2@gmail.com). Never sign in or out, never enter a password.

```
You are helping me in my Google Ads account 672-499-4049 (Memobrick). I approved this change; do exactly this and nothing else.

First confirm the account at the top of Google Ads is 672-499-4049. If it is not, stop and tell me.

Campaign: "MB | Search | Holiday Gifts | Purchases | Q4 2026". Add ONE new responsive search ad to each of its two ad groups. Do not edit, pause or remove the existing ads.

A) Ad group "Gifts For Family & Couples": click + New ad > Responsive search ad.
- Final URL: https://mymemobrick.com/collections/the-gift-for-everyone
- Display path: gifts / family
- Headlines, one per field, exactly as written:
  Christmas Gift for Mom
  Photo Gift for Grandparents
  A Gift for Your Partner
  Gifts for Mom, Dad and Grandma
  Your Family Photo in Bricks
  A Gift They Build Together
  Build It as a Family
  Turn Your Dog Into Brick Art
  Your Pet in Bricks
  Order by Dec 15 for Christmas
  20% Off With EARLYHOLIDAY20
  As Seen On FOX
  Free Design Proof on Request
  Custom Brick Mosaic Kit
  Personalized Photo Gift
- Pin "Order by Dec 15 for Christmas" to Headline position 2. Pin nothing else.
- Descriptions:
  A gift for mom, grandparents or your partner, made from a photo that matters to you.
  Turn a family photo into a DIY brick mosaic kit. Build it together, then hang it up.
  Upload a photo, see it in bricks, and pick your size. 20% off with EARLYHOLIDAY20.
  Order by Dec 15 for Christmas. Free design proof on request if you want our help.
- Save the ad (enabled).

B) Ad group "Christmas Photo Gifts": same steps, with display path gifts / christmas and these headlines:
  Your Family Photo in Bricks
  Order by Dec 15 for Christmas
  20% Off With EARLYHOLIDAY20
  Christmas Gift for Mom
  Photo Gift for Grandparents
  A Gift for Your Partner
  Your Pet in Bricks
  A Gift They Build Together
  Custom Brick Mosaic Kit
  Personalized Photo Gift
  As Seen On FOX
  Free Design Proof on Request
  Build It as a Family
  Gifts for Mom, Dad and Grandma
  Turn Your Dog Into Brick Art
  Pin "Order by Dec 15 for Christmas" to Headline position 2. Same 4 descriptions. Save (enabled).

Do not change any budget, bid, keyword, existing ad, audience or setting. If Google shows a policy warning or rejects a text, stop and tell me which. If an ad group name is different, stop and tell me.

When done, tell me for each new ad: the ad group, the final URL, the number of headlines and descriptions saved, and its status.
```

## Result

Scheduled Mac run 2026-10-14, account 672-499-4049 confirmed (authuser=1). Both ad group names matched.

- A) "Gifts For Family & Couples" (ad group 199189087365): new responsive search ad SAVED. Google reported "no policy issues". Checked in the Ads table after saving: status Eligible, enabled, ad strength Pending, final URL https://mymemobrick.com/collections/the-gift-for-everyone, display path gifts / family, 15 headlines and 4 descriptions exactly as written, only "Order by Dec 15 for Christmas" pinned (position 2). Google had prefilled the form with its own suggestions; every field was overwritten with the approved text. The existing ad was not touched.
- B) "Christmas Photo Gifts" (ad group 197804230541): NOT saved. The form was filled exactly (final URL, gifts / christmas, the 15 headlines in the listed order, 4 descriptions, "Order by Dec 15 for Christmas" pinned to position 2), but Claude Code's permission check blocked the "Save ad" click. Per this file, it was not retried. The draft was discarded, and the ad group still has only its one existing ad.
- Owner: paste the "Run it now" box into Claude in Chrome but do only the "Christmas Photo Gifts" ad, because the Family ad already exists. Running both would duplicate it.
- No budgets, bids, keywords, audiences, settings or existing ads were changed.

Owner run 2026-10-14 (Eden, Claude in Chrome extension), account 672-499-4049:
- Ad B saved: one new responsive search ad in "Christmas Photo Gifts" (campaign "MB | Search | Holiday Gifts | Purchases | Q4 2026"): 15 headlines, 4 descriptions, path gifts/christmas, "Order by Dec 15 for Christmas" pinned to position 2. Status Eligible, no policy issues.
- "Gifts For Family & Couples" already had its matching ad, so no duplicate was added.
- Nothing else changed.
