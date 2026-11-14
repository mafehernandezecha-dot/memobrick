# social-planner 2026-11-14

## Summary

Task board row done. The 3 W48 reels (Nov 24, 26, 27) had no audio. They now carry original music at AAC 48 kHz stereo, and the 3 new hashes are in `2026-W48/week.md`.
The code check passes: Nov 23 to 26 carry no code, and Nov 27 to 29 carry only BRICKFRIDAY25.

## Done

- **Approvals:** the checker printed nothing for social-planner today.
- **Task board, social-planner row: done.**
  - **Audio.** Each reel now has original music from `marketing/social/publisher/music/add-music.sh`, which writes 48 kHz now. The video stream was copied unchanged (same video MD5 before and after).

    | Reel | Mood, seed | Audio | Loudness (mean / max) | Length | Size |
    |---|---|---|---|---|---|
    | S-20261124-1 | warm 4810 | AAC 48 kHz stereo | -18.9 / -2.9 dB | 18.5 s | 2.4 MB |
    | S-20261126-1 | playful 4812 | AAC 48 kHz stereo | -19.0 / -3.3 dB | 16.0 s | 3.1 MB |
    | S-20261127-1 | warm 4814 | AAC 48 kHz stereo | -18.9 / -2.6 dB | 13.3 s | 2.6 MB |

  - **Post files.** In the 3 reel files, the Format line and the sound note now describe the music.
  - **Hashes.** The new hashes are in `marketing/social/planner/2026-W48/week.md`. The "No audio on the reels" line now says what the reels carry. The other 4 hashes are unchanged, and all 7 match their files.
    - S-20261124-1: fe1b4489 to 8f3f1569
    - S-20261126-1: b0aa2020 to a8bf9dc6
    - S-20261127-1: e1393eaa to 2dce1ad6
  - **Code check.**
    - Nov 23 to 26: no code in any post file, Story, calendar row or build-script text.
    - Nov 27 to 29: only BRICKFRIDAY25, which `offers-calendar.md` lists for Nov 27 00:00 to Nov 29 23:59:59 ET.
    - EARLYHOLIDAY20 is named only in internal notes ("same collections as"), never in customer-facing text.
    - The Friday YouTube Short text has no code.
- **Checks:** `check.py copy` passes on the 3 reel files and `week.md`.

## Proposed for approval

None. `2026-W48/week.md` changed, so A-2026W45-019 needs its Commit updated to this run's commit. That item is still pending, and approving it approves this version. This is the same item, not a new one.

## Blocked or unknown

- fluidsynth, the FluidR3 soundfont and `mido` had to be installed in this environment again.
- BRICKFRIDAY25 is still "scheduled", not "active", in `offers-calendar.md`. The Nov 27 to 29 posts depend on it going live (this is already flagged on A-2026W45-019).
- No social post has been approved since Nov 2. W46 (A-2026W44-059) lapses today.

## Sales impact

W48 is Black Friday week, the biggest sales window of the year. Before this fix its 3 reels were silent: they would get little reach, and Facebook may have rejected them. Facebook brings the most social orders (8 of 11 in 30 days). With the fix, W48 can go live as soon as A-2026W45-019 is approved. Until then the effect is zero.

## Next run

Thursday Nov 19: plan W50 (Dec 7 to 13), write the next engagement list, and update followers and insights.
