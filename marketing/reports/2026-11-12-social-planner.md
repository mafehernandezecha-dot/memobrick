# social-planner 2026-11-12

## Summary

W49 (Mon Nov 30 to Sun Dec 6, first week of the 20-orders-a-day period) is planned and built: 7 posts (3 reels with original music, 4 carousels), 3 Stories, 31 calendar rows, proposed as one item. CYBERBRICK20 only on Nov 30, "Order by December 15" on every post, links only to the gift collection or the editor at 20×20.
Followers stay `missing` on every platform (no snapshot); audience insights updated from Buffer (Oct 28 to Nov 1 posts) and Shopify. Nothing has been posted since Nov 1, because W45 to W48 still wait for approval.

## Done

- **Task board (social-planner row): done.** W49 week files and `week.md` proposed as one item (below), followers updated, insights updated, W46 to W48 not proposed again.
- **Approvals:** the checker printed nothing for social-planner today. Follower goals are still waiting for re-approval (A-2026W42-034, see `followers.md`).
- **Posts** in `marketing/social/planner/2026-W49/`:
  - Mon Nov 30 09:00, S-20261130-1, reel: "Cyber Monday: 20% off, today only", couple photo to Studio mosaic, real kit and building, code CYBERBRICK20. Editor link.
  - Tue Dec 1 19:00, S-20261201-1, 4-slide gift guide by person (mom, partner, grandparents, dog lover, dad). Gift collection link. Test EXP-SP-20261201-01.
  - Wed Dec 2 19:00, S-20261202-1, reel: "We brick your pet, Episode 5" (golden retriever), follow for Episode 6. Editor link.
  - Thu Dec 3 19:00, S-20261203-1, 4-slide "What's in the box?" from real kit footage, with sizes, pieces, build times and Shopify prices (checked today). No AI image. Editor link.
  - Fri Dec 4 19:00, S-20261204-1, reel: "Guess the photo Friday, Episode 5" with A, B or C choices (dad and daughter). Editor link. Test EXP-SP-20261204-01.
  - Sat Dec 5 11:00, S-20261205-1, 3-slide "A gift for mom" (Studio mosaic composited in an AI Christmas living room). Gift collection link.
  - Sun Dec 6 11:00, S-20261206-1, 3-slide "Order by December 15" with how it works and the optional free proof. Editor link.
- **Bricked images:** all 5 Studio mosaics are exports from MemoBrick Studio (branch `claude/memobrick-editor-standalone-0dyk45`, driven headless through `window.MB_TEAM`). Settings: 20×20 for the people and 20×30 for the dog, with saturation -10 and temperature -5 for the people and 0/0 for the golden retriever. The default -35/-15 made the golden's coat brown and grey. Each post file has its `Studio:` line. AI images (Gemini) show people, the dog and rooms only.
- **Music:** fluidsynth and the FluidR3 soundfont could be installed this run, so for the first time all 3 reels carry original music from `add-music.sh` (warm 4930, playful 4932, playful 4934). The reels are 15.4 to 15.7 s and 2.8 to 3.1 MB.
- **Footage:** F7071 (kit), F7093 (fingers pressing bricks) and F7089 (hands filling a baseplate) from "footage memobrick 5", all `ok` in `footage-rights.md`. No new clips were used, so nothing was added as `to confirm`.
- **Other files:**
  - Calendar: 31 rows added to `marketing/shared/content-calendar.md`, all `Ready`.
  - Stories: `2026-W49/stories.md`, with a countdown, question and poll sticker.
  - Results: `2026-W49/results.md`.
  - Engagement list: `engagement/2026-11-12.md`, Nov 12 to 18.
  - Experiments: EXP-SP-20261201-01 and EXP-SP-20261204-01 appended to `marketing/shared/experiments.md`.
  - Build scripts: `2026-W49/tools/`.
- **Checks:** `check.py copy` passes on every post file, `stories.md`, `week.md` and the engagement list. Product details match `product-facts.md` and today's Shopify prices.

## Followers

| Platform | Followers | Change | Best post (Oct 28 to Nov 1, Buffer) |
|---|---|---|---|
| Instagram | missing | missing | Guess the photo Oct 30: reach 166, average watch 4.45 s. Size guide carousel: 1 save, 1 comment |
| Facebook | missing | missing | "Order by December 15" carousel: the first share. Size guide: the first link click. 3 of 4 Facebook reels failed in Buffer |
| TikTok | missing | missing | Build time reel: average watch 5.98 s, the best of any video |
| Pinterest | missing | missing | nothing posted |

- **Progress against the goal:** cannot be measured. The goals wait for re-approval (A-2026W42-034), no follower count exists on any platform, and nothing has been posted since Nov 1. The data requests from Oct 14, 28 and 29 are still open in `marketing/data/requests.md`, because the Mac pull has never run.
- **What grew attention:** a real number over real hands ("How long does a 20×20 take?") and reveals. No post has a follow recorded yet.
- **Growth plan for W49:** a running series twice (pet Episode 5 with "Follow for Episode 6", Guess the photo Episode 5), two saveable carousels (the gift guide and the kit), a Story sticker every day a Story runs, keyword pins on 5 boards, and the weekly "DM us the photo" Story.

## Proposed for approval

### P-social-planner-20261112-1
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W49/week.md
- Reason: Approving this item approves all 7 W49 posts (Nov 30 to Dec 6) on every channel in each Channels column, YouTube Shorts too for the 3 reels, and the publisher prepares the kits for the Mac to post at each time. Single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved). This is the first week of the 20-orders-a-day period. Monday uses CYBERBRICK20 (listed "scheduled" in offers-calendar) and every post says order by December 15.
- Expires: 2026-12-05
- Status: pending

## Blocked or unknown

- **Approvals:** no social post has been approved since Nov 2. W46 (A-2026W44-059, lapses Nov 14), W47 (A-2026W45-015) and W48 (A-2026W45-019) are in the queue. Nothing I plan reaches buyers until one is approved.
- **Data:**
  - `marketing/data/` has never been filled (no Meta, TikTok, Pinterest or GA4 snapshot), so follower counts and UTM orders stay unknown. The requests are already open, and I did not add duplicates.
  - The Meta connector was not used this run. Earlier runs found no Instagram account on the ad account.
- **Buffer:** 3 of 4 Facebook reels and 1 Instagram carousel failed. The publisher is on it (task board). Until it is fixed, the W49 Facebook reels may need posting by hand.
- **Offers:** CYBERBRICK20 is "scheduled" in `offers-calendar.md`, not "active". S-20261130-1 relies on it going live on Nov 30.
- **Thursday prices:** they are today's Shopify prices. If they change before Dec 3, send the post back.
- **Send us your photo:** the submitted photos folder and permissions are still not set in `footage-rights.md`, so there are no submitted photos to use and no permission messages to send this week.
- The live site was reachable: the gift collection and the editor both returned 200.

## Sales impact

The week sets up the Dec 1 to 15 goal of 20 orders a day.

- Every post carries the verified December 15 order-by date. Monday carries the one-day CYBERBRICK20 code at 09:00.
- Every link goes to one of the two pages with real cart rates: the gift collection (11.7%) or the editor at 20×20. That addresses the weak point "social cart rate 4.7% vs 8.7%".
- The Thursday kit carousel and the Sunday free-proof card answer the questions that stop orders (what is in the box, which size, which photo). The free proof is also the designer route behind the collapsed draft orders.
- The effect is zero until the item is approved. Once posting, social has brought 11 orders in 30 days (Facebook 8, Instagram 3). W49 aims to lift that by landing those clicks on the converting pages.

## Next run

Thursday Nov 19 (weekly run): plan W50 (Dec 7 to 13, last full week before the Dec 15 order-by date), update followers and insights from any snapshot, write the next engagement list, and re-check prices and offers.
