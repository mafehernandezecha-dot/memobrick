# social-planner 2026-11-11

## Summary

Board task done a day early: no social post is approved for any day Nov 14 to 22 (all 9 days), and the W47 and W48 links now land on the gift collection or the editor itself instead of blog articles and the dog page (0 purchases). W47 and W48 are proposed again because their post files changed. The Facebook groups test (A-2026W43-005) closes with no data: nothing was posted.

## Done

- **Task board (social-planner row, CARRIED, smaller version): done.** Gap list and link table: `marketing/social/planner/2026-11-11-gaps-and-links.md`.
  - Days with no approved post, Nov 14 to 22: all 9. Nov 14 and 15 wait on A-2026W44-059 (expires Nov 14), Nov 16 to 22 on W47 (now P-social-planner-20261111-1).
  - Links changed (post files, stories, calendar rows): S-20261118-1 (mom) and S-20261121-1 (partner) from blog articles to `/collections/the-gift-for-everyone`, with caption endings "Find her gift" / "Find their gift at the link in our bio."; S-20261123-1 and S-20261126-1 from `/pages/dog-brick-mosaic` (121 referred sessions, 1 cart, 0 purchases) to the editor; every editor link in W47 and W48 to `/pages/editor?size=20x20&<UTM>#editor` (board rule 1). UTMs kept per channel. All pages return 200; the 3 articles are live in Shopify.
  - Left unchanged: W46 (A-2026W44-059 expires Nov 14). Nov 14 still links the grandparents article; Eden can add `changes: S-20261114-1 link the gift collection` if she approves W46.
  - `week.md` for W47 and W48 rewritten with new hashes (`git hash-object`) and a Links line; `check.py copy` passes on all changed post files, stories and both `week.md`.
- **Approvals:** the checker printed A-2026W43-005 (Facebook groups test, result due today). Result written: `marketing/social/planner/research/2026-11-11-facebook-groups-result.md`. No post was reported and no log exists; 0 of 37 Shopify orders Oct 28 to Nov 10 carry `utm_medium=group`. Keep The Dog Moms Club (Wednesdays) and Craft and Creative Ideas DIY for the community manager's sheets, drop Golden Doodle Owners and Forever Golden Retriever. Test closed, can be archived.
- Not a weekly run day (Thursday is). Followers, insights and the W49 plan come in tomorrow's run.

## Proposed for approval

### P-social-planner-20261111-1
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W47/week.md
- Reason: Replaces A-2026W45-015 (archive it): the same 7 W47 posts (Nov 16 to 22) with better links (gift collection on Wed and Sat, the editor itself on the rest); approving it approves every post on every channel its post file lists, YouTube Shorts too for the 3 reels, and the publisher prepares the kits for the Mac to post at each time; single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved). Posts before EARLYHOLIDAY20 ends Nov 22, in the first week of the 12-orders-a-day goal.
- Expires: 2026-11-21
- Status: pending

### P-social-planner-20261111-2
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W48/week.md
- Reason: Replaces A-2026W45-019 (archive it): the same 7 W48 posts (Nov 23 to 29) with the two pet posts moved from the dog page (0 purchases) to the editor and every editor link opening the editor at 20×20; approving it approves every post on every channel its post file lists, YouTube Shorts too for the reels, and the publisher prepares the kits; single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved). Covers Thanksgiving week and BRICKFRIDAY25 (Nov 27 to 29).
- Expires: 2026-11-22
- Status: pending

## Blocked or unknown

- No social post has been approved since Nov 2; the last post published on Nov 1. Nothing the planner makes reaches buyers until Eden decides A-2026W44-059 (W46, expires Nov 14) and the W47 item above.
- Whether the editor reads `?size=20x20` to preselect the size is not visible in the served HTML (it is the same link the blog articles and the conversion audit use; harmless if ignored).
- Facebook groups: no log or report from Eden, so nothing is known about admin approval to post in The Dog Moms Club or the craft group.
- Live site reachable; Shopify read-only queries used for orders and articles.

## Sales impact

Addresses the weak point "Social cart rate halved (4.7% vs 8.7%)": where posts land matters more than how many there are. Moving 2 posts from blog articles to the gift collection (11.7% cart rate) and 2 from the dog page (0 purchases from 121 sessions) to the editor removes an extra page between the post and the cart. Effect is zero until a social week is approved; once posting, expect social visits from these 4 posts to convert like the gift collection and editor instead of near zero.

## Next run

Thursday Nov 12 (weekly run): plan W49 (Nov 30 to Dec 6, CYBERBRICK20 Nov 30, Christmas rush), update audience insights and followers, write the engagement list, and use the gift collection or `/pages/editor?size=20x20#editor` for every link.
