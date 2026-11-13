# social-planner 2026-11-13

## Summary

Task board row is done. All 7 W47 posts (Nov 16 to 22) pass the three checks: links go only to the gift collection or the editor at 20×20, EARLYHOLIDAY20 never runs past Nov 22, and every reel has 48 kHz audio.
The 3 W47 reels had no audio at all. They now carry original music at AAC 48 kHz, and the 3 new hashes are in `week.md`. The 3 W49 reels went from 44.1 to 48 kHz too.

## Done

- **Line for the coordinator:** "withdraw A-2026W44-059; approve A-2026W45-015 (W47, Nov 16 to 22) first".
- **Approvals:** the checker printed nothing for social-planner or social-publisher today.
- **Check 1, links: passed, no change needed.** W47 has 31 calendar rows. 8 go to `/collections/the-gift-for-everyone` (Wed, Sat), and 23 go to `/pages/editor?size=20x20&<UTM>#editor`. Every link has its own UTM.
  - The 3 YouTube Short descriptions and both Story link stickers use the same two pages.
  - Both pages returned 200 today.
- **Check 2, EARLYHOLIDAY20: passed, no change needed.** `offers-calendar.md` lists it as active until 2026-11-22 23:59:59 ET.
  - The code appears only in W47 posts and Stories, which run Nov 16 to 22.
  - The Sunday post says "ends tonight, November 22, at 11:59 pm ET".
  - None of the YouTube text mentions the code, because Shorts stay up after the code ends.
- **Check 3, 48 kHz audio: fixed in place.** S-20261117-1, S-20261119-1 and S-20261120-1 had no audio track at all.
  - Each now has original music from `marketing/social/publisher/music/add-music.sh`: warm 4740, playful 4742 and playful 4744.
  - The audio was then remuxed to AAC 48 kHz stereo, and the video stream was copied unchanged. The 3 files are 3.1, 3.0 and 1.7 MB and 16.9, 16.0 and 13.5 s long.
  - `add-music.sh` itself still writes 44.1 kHz. It is the publisher's file and Freddy's task, so I did not edit it.
- **Post files and hashes:** in the 3 reel files, the Format line and the sound note now describe the music. The new hashes are in `2026-W47/week.md`:
  - S-20261117-1: d0f494e1 to 3194f8dc
  - S-20261119-1: b63e09a8 to 952c79cb
  - S-20261120-1: aea2723a to 41591b41
  - The "No audio on the reels" line in `week.md` now says what the reels carry.
  - The other 4 W47 hashes are unchanged.
- **W49 audio:** the reels S-20261130-1, S-20261202-1 and S-20261204-1 were remuxed from 44.1 to 48 kHz (same music, same video). Only the mp4 files changed, so the W49 post files, hashes and `week.md` did not.
- **Checks:** `check.py copy` passes on all 7 W47 post files and `week.md`.

## Followers

No new rows this run, because this is a task-board run and not the weekly Thursday run. No snapshot exists in `marketing/data/` (see the Nov 12 report), so every platform is still `missing`. Next growth plan: as in W49.

## Proposed for approval

None. `2026-W47/week.md` changed, so A-2026W45-015 needs its Commit updated to this run's commit. That item is still pending, and approving it approves this version. This is the same item, not a new one.

## Blocked or unknown

- **W48 reels (Nov 24, 26, 27; A-2026W45-019) also have no audio.** That is outside today's task, so I made no change. Fixing them means changing their post files and the W48 hashes, which the next run can do in the same way.
- Python: `mido` had to be installed for the `/usr/local/bin/python3` interpreter (3.11), and fluidsynth and FluidR3 had to be installed again in this environment.
- Approvals: no social post has been approved since Nov 2. W46 (A-2026W44-059) lapses Nov 14.

## Sales impact

W47 is the first week of the 12-orders-a-day goal and the last week of EARLYHOLIDAY20. Before this fix, Facebook would have rejected all 3 of its reels: they had no audio at all, and the planned 44.1 kHz fix would still have been rejected. Facebook sends the most social orders (8 of 11 in 30 days). With the fix, W47 can go live the day A-2026W45-015 is approved. The effect stays zero until that approval.

## Next run

Thursday Nov 19: plan W50 (Dec 7 to 13), add 48 kHz music to the W48 reels and update their hashes, write the next engagement list, update followers and insights.
