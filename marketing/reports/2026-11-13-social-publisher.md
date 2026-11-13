# social-publisher 2026-11-13

## Summary
Buffer mode. Nothing approved (W46 A-2026W44-059 and W47 A-2026W45-015 both pending), so nothing was scheduled or posted.
Task board done: add-music.sh now writes 48 kHz stereo; the 3 W47 reels probe at 48 kHz and have kits ready, marked not approved.

## Done
- Approvals checker: no printed lines. No Buffer posts, calendar unchanged.
- Buffer read only: nothing scheduled or sending; the same four error posts (not retried).
- Task board (Freddy), done:
  - marketing/social/publisher/music/add-music.sh: `-ar 44100` to `-ar 48000 -ac 2`.
  - W47 reels S-20261117-1, S-20261119-1, S-20261120-1: AAC-LC 48 kHz stereo, H.264 High 1080x1920 30 fps, 1.7 to 3.2 MB. Two had keyframe gaps over 5 s, so I made upload copies with a keyframe every 2 s (audio unchanged) in marketing/social/publisher/media/ (2026-11-17-camera-roll-to-wall.mp4, 2026-11-19-brick-your-pet-3.mp4, 2026-11-20-guess-the-photo-4.mp4, 3.2 to 4.8 MB).
  - Kits marketing/social/publisher/to-post/2026-11-17-camera-roll-to-wall.md, 2026-11-19-brick-your-pet-3.md, 2026-11-20-guess-the-photo-4.md, first line `Status: not approved ...` so the Mac skips them. Copy check passes. Details in marketing/social/publisher/2026-11-13-log.md.
- Not Monday: no Results pass.

## Proposed for approval
None.

## Blocked or unknown
- No approved posts. W46 (A-2026W44-059) lapses Nov 14; the planner asks Eden to reject it and approve W47 (A-2026W45-015). Nothing posts on any channel until a week is approved. Today's Nov 13 W46 reel will not go out.
- Still open from earlier: 3 failed Facebook reels and the Nov 1 Instagram carousel (do not retry in Buffer); Mac kits Oct 18 to Nov 1 still `Status: ready` past their times (Mac job has not run); YouTube parts wait for the owner OK.
- The 48 kHz fix is the likely cause of the Facebook failures, not yet confirmed: the first 48 kHz Facebook reel (Nov 17 if W47 is approved) confirms it.

## Sales impact
None today: no approved post, so no added reach or clicks. The ready reel kits and the 48 kHz audio mean that, once W47 is approved, its Facebook reels can be scheduled the same day and should not fail like 3 of the last 5, keeping Facebook clicks to the editor and gift collection in the first week of the 12-orders-a-day goal.

## Next run
Run the checker. If W47 is approved: flip the reel kits to ready, write the 4 carousel kits, upload to Shopify Files and schedule IG, FB and TikTok in Buffer starting Nov 16 19:00, then read back the Nov 17 Facebook reel an hour after its time.
