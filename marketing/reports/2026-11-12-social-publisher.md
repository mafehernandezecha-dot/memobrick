# social-publisher 2026-11-12

## Summary
Buffer mode. Nothing approved (W46 batch A-2026W44-059 still pending, lapses Nov 14), so nothing was scheduled or posted.
Task board done: the 3 failed Facebook reels all used the add-music.sh files (44.1 kHz audio); the failed Instagram carousel has no provable cause. Rules for the next kits are in the log.

## Done
- Approvals checker: no printed lines for social-publisher. No kits, no Buffer posts, calendar unchanged.
- Buffer read only: no scheduled or sending posts; error posts are the same four. Nothing to live-check.
- Task board (Freddy): read the 4 failed Buffer posts and compared them with the ones that worked. Cause list and kit rules in marketing/social/publisher/2026-11-12-log.md:
  - S-20261026-1-fb, S-20261028-1-fb, S-20261030-1-fb: every failed Facebook reel used the add-music.sh remux (AAC 44.1 kHz added, video copied); every Facebook reel that worked had no audio track. The same files posted on Instagram and TikTok. Meta's Reels spec lists 48 kHz audio. Rule: 48 kHz AAC stereo on every reel (change `-ar 44100` to `-ar 48000` in add-music.sh before the next reel).
  - S-20261101-1-ig: "issue with the media"; JPEG, size, alt text and AI label match the Oct 31 carousel that worked. Likely the cover slide was replaced in place on Shopify (?v= URL). Rule: never swap media in a scheduled post or replace a Shopify file in place; use a new file name.
- Not Monday: no Results pass.

## Proposed for approval
None.

## Blocked or unknown
- No approved posts: W46 batch A-2026W44-059 lapses Nov 14. Nothing will post on any channel until Eden approves it (one decision in the queue, no re-ask).
- The cause of the Facebook failures is the most likely one, not confirmed: the Shopify CDN copies could not be downloaded in this session (proxy refused cdn.shopify.com), so the local files were probed. A 48 kHz reel going through will confirm it.
- The three failed Facebook reels and the Nov 1 Instagram carousel were never published. The owner can post them by hand from the kits if still wanted (Mac kits in marketing/social/publisher/to-post/). Do not retry them in Buffer.
- Mac kits Oct 18 to Nov 1 are still `Status: ready` long past their times (Pinterest, TikTok carousels, YouTube): the Mac job has not run. YouTube parts still wait for the owner OK under Missing owner inputs.
- add-music.sh is unchanged today (task was read only); I make the one-line 48 kHz change on the first run that schedules a reel.

## Sales impact
None today: no approved post, so no reach or clicks were added. The failure rules stop the next approved week from losing its Facebook reels (3 of the last 5 Facebook videos failed), which keeps Facebook link clicks to the gift collection possible once W46 is approved.

## Next run
Run the checker; if W46 is approved, change add-music.sh to 48 kHz, write kits and schedule IG, FB and TikTok in Buffer at once (Nov 13 to 16 posts), then read the first Facebook reel back after its time.
