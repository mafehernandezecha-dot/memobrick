# Social planner report 2026-10-29

## Summary

- Planned W46 (Mon Nov 9 to Sun Nov 15): 7 feed posts (3 reels, 4 carousels, all Ready) and 3 Stories, as one weekly batch; Monday is the already approved free-proof carousel moved from Oct 27.
- Rebuilt every bricked image of the W45 batch (3 reels, 3 carousels and their pins) as MemoBrick Studio exports, added a one-picture preview, and proposed W45 again (the owner had sent it back with "send preview picture").
- Followers are still `missing` on every platform (no snapshots, no Instagram on the Meta connector); no post has brought a follow or a share yet.

## Done

- **Approvals:** the checker printed A-2026W43-005 (Facebook groups test). Prepared the two group post kits it allows in `marketing/social/planner/research/group-posts-2026-11.md` (Dog Moms Club on Wed Nov 4 only; Craft and Creative Ideas DIY, no link); the others are not postable per the rules file. A-2026W42-034 (follower goals) is still waiting for re-approval (P-social-planner-20261028-2); nothing to act on.
- **Task board:** no row for the social planner today; the board's weak point (referred traffic down 50%, orders 51% of goal) shaped the plan below.
- **Step 0 (insights):** `audience-insights.md` updated with a Buffer pull (Instagram only; Facebook shows impressions only). Reels reach (310, 190, 162), carousels engage (8.6% against 2.3%), reveal reels got the only saves, watch time is 2.2 to 4.1 s, 0 follows, 0 shares. Sales: 72 orders and $8,179 in October against 140 and $15,400 (`sales/latest.json`).
- **Step 0a (followers):** four rows added to `followers.md`, all `missing`; requested again in `marketing/data/requests.md` (Meta, TikTok, Pinterest, and GA4 organic sessions by campaign).
- **W45 redo (Studio rule):** all 7 W45 post files now have a `Studio:` line; the AI-drawn mosaics were replaced.
  - Reels S-20261102-1 (family), S-20261104-1 (dog), S-20261106-1 (grandmother): rebuilt with a real brick macro first, the photo turning into the Studio mosaic, the cleared kit and build footage, and the Studio mosaic framed on a wall.
  - Carousels S-20261105-1 and S-20261107-1 (slide 1 and pin): AI room with the Studio mosaic hung in it; S-20261107-1 shows a mosaic of the same dog that sits in the scene. S-20261108-1 slide 1 and pin: a real footage frame instead of an AI picture of bricks.
  - New previews: `marketing/social/planner/2026-W45/week-preview.jpg` (all 7 posts in one picture) and the reel strips.
- **W46 posts** (`marketing/social/planner/2026-W46/`):
  - Mon Nov 9 19:00 S-20261027-1 free-proof carousel (approved in A-2026W42-037, file unchanged).
  - Tue Nov 10 19:00 reel S-20261110-1 "How long does a 20×30 take?" (a mosaic that builds itself, hour counter; test EXP-SP-20261110-01).
  - Wed Nov 11 19:00 carousel S-20261111-1 "Hard to shop for him?".
  - Thu Nov 12 19:00 reel S-20261112-1 "We brick your pet, Episode 2" (series, follow and DM ask).
  - Fri Nov 13 19:00 reel S-20261113-1 "Guess the photo Friday" (couple, comment prompt, sales end card).
  - Sat Nov 14 11:00 carousel S-20261114-1 "Grandparents who have everything?" (links the grandparent guide).
  - Sun Nov 15 11:00 carousel S-20261115-1 "One week left for 20% off" (deadline Nov 22; test EXP-SP-20261115-01).
  - Each post has post file, 2:3 pin, Pinterest title and description, UTM links per channel, hashtags (5 at most), trending-sound note, and a `Studio:` line. Reels have a YouTube Shorts section.
  - 27 rows added to `marketing/shared/content-calendar.md` (Ready). Stories in `2026-W46/stories.md`, results in `2026-W46/results.md`, tools in `2026-W46/tools/`.
- **Engagement:** `marketing/social/planner/engagement/2026-10-29.md` (Oct 29 to Nov 5): rules, daily hashtags and bigger accounts, reply ideas. It does not name small accounts, because I cannot open the apps to check they are real (see Blocked).
- **Copy check:** `check.py copy` passed on every post file, both `week.md` files, the stories, results, engagement list and group kits. Product details checked against `product-facts.md` (20×20 about 4 hours, 20×30 about 6 hours, 1×1 bricks, baseplates, color map, tool, frames separate); no prices quoted; offer and dates only from `offers-calendar.md` (EARLYHOLIDAY20 ends Nov 22; order by Dec 15). The site was reachable; the dog page, editor, free-preview page, gift collection and the grandparent guide all returned 200 with the expected titles.
- Experiments logged: EXP-SP-20261110-01 and EXP-SP-20261115-01.

## Proposed for approval

### P-social-planner-20261029-1
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W45/week.md
- Reason: Re-proposes the W45 batch (Nov 2 to 8) that was sent back with "send preview picture": approving it approves all 7 posts on every channel in each Channels column, including YouTube Shorts for the 3 reels, and the picture of all 7 is `marketing/social/planner/2026-W45/week-preview.jpg`; every bricked image is now a Studio export. Single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved). Replaces A-2026W43-007.
- Expires: 2026-11-07
- Status: pending

### P-social-planner-20261029-2
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W46/week.md
- Reason: Approving it approves all 7 W46 posts (Nov 9 to 15) on every channel in each Channels column, including YouTube Shorts for the 3 reels; the publisher then prepares and schedules each one. Single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved). Monday's post is already approved in A-2026W42-037 and is scheduled once.
- Expires: 2026-11-14
- Status: pending

## Blocked or unknown

- **Followers:** missing on every platform. `marketing/data/latest.md` says "never" (the Mac pull has not run); Buffer has no follower field; the Meta connector has no Instagram account. Requests are in `marketing/data/requests.md`. The goals item (A-2026W42-034) still needs re-approval, so there are no numeric goals; progress against last week cannot be given.
- **Organic orders:** cannot be counted (no GA4 pull; Shopify's referrer report does not split by UTM). No order is tied to a post yet.
- **Facebook and TikTok metrics:** Buffer shows Facebook impressions only (0 link clicks on every post) and TikTok reach for 4 posts; nothing for Pinterest.
- **Music:** reels carry no audio. `fluidsynth` and the soundfont cannot be installed here (`apt` finds no package), so `add-music.sh` cannot run; the owner adds a sound when posting.
- **Studio details:** the Studio ran headless without the face and background models (the MediaPipe files are not available here), so each export uses the full-photo crop, saturation -35 and temperature -15 only; the mosaics are recognisable (previews checked).
- **Engagement list:** I cannot open the apps, so small accounts are found by the owner from daily hashtags, not named.
- **Submitted photos:** the "submitted photos" Drive folder is still not set in `footage-rights.md`, and no photo has recorded permission, so Thursday's Episode 2 uses an AI border collie (labeled). If a follower photo gets recorded permission by Tue Nov 10, swap it in.
- **No new footage clips** were added to `footage-rights.md`: only `ok` clips already listed were used (F7071, F7093, F7089, and the pet-videos macro).
- **Grandparent guide:** the draft is marked "ready for publish (pending approval)" but the page answers on the live site with its title; if it is not live on Nov 14, send S-20261114-1 back.
- **Message tension to know:** the Nov 22 deadline carousel (Sun Nov 15) comes before the Black Friday 25% (Nov 27). The owner set both; some people may wait. The post never mentions Black Friday.

## Sales impact

- Targets the weak point "referred traffic down 51%, orders at 51% of goal": 4 of 7 posts send people to the editor or a gift page with a true deadline (Dec 15 order-by, code ends Nov 22), and the Christmas weeks carry 44% of the year's orders. The free-proof Monday post and the "Want help?" lines address the drop in draft orders (11 against 74).
- The W45 redo is what lets the 7 posts go out at all: without it the batch could not be approved under the Studio rule. W45 and W46 together are 14 posts in the 14 days before the code ends.
- Expected effect: small and not yet measurable. About 1,100 people were reached in 10 days, 0 follows, 0 link clicks on Facebook. Reels with hands in the first second and 19:00 slots are the best evidence so far. I cannot tie any order to a post until the GA4 and Meta pulls exist.

## Followers

| Platform | Followers | Change | Best post (follows, saves, shares) |
|---|---|---|---|
| Instagram | missing | missing | S-20261023-1 guess-the-photo reel (reach 197, 1 save) and S-20261025-1 family reel (reach 162, 1 save); 0 follows, 0 shares anywhere |
| Facebook | missing | missing | missing (impressions only) |
| TikTok | missing | missing | S-20261021-1 build reel (reach 182, average watch 4.0 s) |
| Pinterest | missing | missing | missing |

- Goals: no numeric goals yet (A-2026W42-034 waits for re-approval and counts do not exist). Against last week there is nothing to compare.
- What grew followers: nothing yet. The best signals are reels that open on real hands (reach 310), and reveal formats (the only saves).
- Next week's growth plan: the Thursday numbered series with a follow and DM ask, Guess the photo Friday with a comment prompt, two saveable carousels (the gift guide and the deadline timeline), Pinterest titles and descriptions with search phrases on all 7 pins, a Story sticker on every Story, and Eden's 15 minutes a day of hand engagement (`engagement/2026-10-29.md`). The sprint check due Nov 5 (follows per extra reel) will say whether the series works.

## Next run

Thursday 2026-11-05 (plans W47, Mon Nov 16 to Sun Nov 22, the Black Friday season starts Nov 16 on the sales goals): read the sprint results (EXP-SP-20261029-01 and -20261030-01), the first Meta, TikTok and Pinterest snapshots if the Mac pull has run, turn the follower goals into numbers once approved, check the Oct 28 to Nov 4 posts' metrics, and answer any `changes:` on P-social-planner-20261029-1 or -2.
