# social-planner 2026-10-28 (special run: Instagram follower sprint)

## Summary

Eden asked for someone to work on Instagram now and gain followers. Buffer shows 1,112 people reached by 8 posts since Oct 21, with 0 shares and 0 follows. The follower count itself is missing.
Planned a 7-day sprint (Oct 29 to Nov 4) around the scheduled W44 posts and made 2 extra reels with Studio mosaics. Also wrote daily Stories, a profile tune-up, a Collab idea with Niki and a daily engagement list.
The 2 reels go to Eden as one publish item. The profile text is in `sprint-2026-10-29/profile.md` for her to paste. Nothing was posted or scheduled.

## Done

- **Measured Instagram** (Buffer, org 6ad8a176fa2ac3e803d3a401, IG channel 6ad8a1da778b240e2f798f35, Oct 19 to 28). Totals: 8 posts, reach 1,112, views 1,621, 33 likes, 4 comments, 2 saves, 0 shares, 0 follows, 3.6% engagement, 3.05 s average reel watch. Reels average 168 reach and carousels 90. Carousels average 8.6% engagement and reels 2.3%. The best reel opened on hands pressing bricks (321 reach, 4.09 s watch). The best carousel was "What's in the kit" (10.47%, 2 comments). Evening reels did better than noon. Per-post table and findings are in `marketing/social/planner/followers.md`, with one row per platform for 2026-10-28 (follower counts `missing`), and a short update is in `audience-insights.md`.
- **Sprint plan:** `marketing/social/planner/sprint-2026-10-29/sprint.md`.
- **2 extra reels, complete packages.** Each has a Studio mosaic, captions per channel, hashtags, an audio note, alt text, Pinterest and YouTube Shorts sections, and UTMs.
  - S-20261029-2 "We brick your pet", Episode 1, Thu Oct 29 12:00 ET, 16.5 s, 2.3 MB.
  - S-20261030-2 "Same photo, 3 sizes", Fri Oct 30 12:00 ET, 19 s, 2.9 MB.
  - Every mosaic comes from MemoBrick Studio, run headless from branch `claude/memobrick-editor-standalone-0dyk45` at fb67f84. The settings are on each file's `Studio:` line.
  - AI made only the photos (a dachshund and a couple), so the AI label note is included.
  - Footage: F91A7101.MP4 (Drive `1fc_u-MGLPZh52IgbyH29DRAojIodc1Ge`, 1.5 to 3.0 s), cleared `ok`.
  - Previews were read before proposing. The copy check passes on every file.
- **Daily Stories, Oct 29 to Nov 4:** `sprint-2026-10-29/stories.md`. Every day has a sticker: polls, a size quiz, a build-time quiz, a question sticker, behind the scenes, and a Dec 15 countdown re-shared on Nov 1 and Nov 4.
- **Weekly "We brick your pet" series** from the Send us your photo campaign. Episode 1 is our own AI example. From Episode 2 on, it uses only followers' photos with written permission recorded in `footage-rights.md`, and each sender is tagged. The permission message is in `sprint.md`.
- **Collab idea with Niki Loheit:** `sprint-2026-10-29/collab-niki.md`. Items A-2026W44-034 and 035 are now approved. The Collab post still needs her written yes, her own photo and the delivered kit, so it is not in the publish item.
- **Profile tune-up:** `sprint-2026-10-29/profile.md`. It has the name field, the bio (140 characters), 5 links with UTMs (all return 200 live), 4 highlight covers (`profile/highlight-*.png`) and 3 posts to pin.
- **Engagement list:** `marketing/social/planner/engagement/2026-10-28.md`, Oct 28 to Nov 4, about 15 minutes a day. It covers pet owners, couples, pet costumes, gift and decor accounts, grandparents, LEGO adult builders, then dogs again. Each kind of post has its own comment ideas, and there are reply ideas for our own comments.
- **Shared files:**
  - 10 calendar rows (S-20261029-2 and S-20261030-2 on ig, fb, tt, pin and yt), all Ready.
  - Experiments EXP-SP-20261029-01 and EXP-SP-20261030-01.
  - A data request for the Instagram follower count and daily follows.
- **Prices checked in Shopify today:** the 16×16 kit is $69.88.

## Proposed for approval

### P-social-planner-20261028-1
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/sprint-2026-10-29/week.md
- Reason: Approving it approves both sprint reels on every channel in their Channels column (Instagram, Facebook, TikTok, Pinterest and YouTube Shorts): S-20261029-2 "We brick your pet" Thu Oct 29 12:00 ET and S-20261030-2 "Same photo, 3 sizes" Fri Oct 30 12:00 ET. The publisher prepares and schedules them. Send one back with `changes: <post-id> <note>`; posts not named stay approved. Urgent because the first one posts tomorrow.
- Expires: 2026-10-29
- Status: pending

### P-social-planner-20261028-2
- Agent: social-planner
- Executor: social-planner
- Type: offer
- Draft: marketing/social/planner/follower-goals.md
- Reason: Re-approval of the weekly follower goals Eden already approved as A-2026W42-034 (Instagram +1.5%, Facebook +0.5%, TikTok +3%, Pinterest +2% a week). One Pinterest note in the draft changed after approval, so the checker will not use it. Nothing automatic happens; the planner copies the goals into followers.md and reports against them.
- Expires: 2026-11-11
- Status: pending

## Blocked or unknown

- **Instagram follower count is missing.** Buffer has no follower field. The Meta connector shows no Instagram account linked to any ad account (`ads_get_ig_accounts` on PhotoBrick returned none). `marketing/data/latest.md` says nothing has been pulled yet. I added a request in `marketing/data/requests.md`.
- **Follows per post:** Buffer reports 0 on every carousel and does not report follows for reels.
- **Trending Instagram audio:** Buffer says "Connect this Instagram channel through Facebook Login to search and attach music". Each reel has original music and a note on which kind of trending sound fits and where its beat should land.
- **Comment text:** I can read comment counts but not the comments, so the 4 existing comments get reply ideas by kind, not word-for-word replies.
- **Small accounts for engagement:** I cannot open Instagram from here, so they are found by hashtag each day, not listed by name. The LEGO account handles (The Brothers Brick, Brickfambuilds) are marked "check the handle first".
- **W45 (Nov 2 to 8) needs a Studio redo before Eden can approve it** (A-2026W43-007 is at "changes: send preview picture"). S-20261102-1, S-20261104-1 and S-20261106-1 use `photo_to_bricks` mosaics, and none of the 7 W45 post files has a `Studio:` line. The next weekly run (Thu Oct 29) should rebuild those mosaics in the Studio. The sprint's Stories for Nov 2 to 4 already avoid W45 images that are not from the Studio.
- **Submitted photos folder:** not created yet. Eden needs to create it and write its ID under `## Submitted photos` in `footage-rights.md` before Episode 2.

## Sales impact

The weak point is qualified traffic: referred sessions are down 51% and October is at about half of goal. Reels are how Instagram reaches people who don't follow us yet, and so far nothing turned that reach into follows, shares or site visits.

- The pet reel uses the theme with our cheapest Meta purchase (the dog video at $25.45). It also asks people to send their own pet's photo, and every sender who is tagged brings their followers to us.
- The size reel answers "which size?" and sends people to compare sizes in the editor before the Dec 15 order-by date.
- The profile links now start with the editor and the gift guide.

Expected effect: a first measurable flow of shares and follows (targets are in `sprint.md`), and editor visits tracked by `utm_campaign=2026-10-brick-your-pet` and `2026-10-size-check`. Orders from these posts are likely small this week. The aim is a bigger, warmer audience before the Nov 27 Black Friday code and the December rush.

## Next run

- Thursday Oct 29, weekly run:
  - Rebuild the W45 mosaics in the Studio and propose W45 again.
  - Plan W46, including Episode 2 of "We brick your pet" if a follower photo with permission exists, otherwise "Guess the pet".
  - Write the next engagement list.
- Thursday Nov 5: measure the sprint against the targets in `sprint.md`, with the first follower count if the data pull has run.
