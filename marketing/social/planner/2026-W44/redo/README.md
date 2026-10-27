# W44 redo: bricked images rebuilt in MemoBrick Studio (2026-10-27)

Eden deleted the Oct 26 couple-gift reel because its mosaic was not made in MemoBrick Studio
(rule: "Bricked images: Memobrick Studio only" in the social-planner agent file). The six posts
below used AI-drawn or `photo_to_bricks` mosaics and were moved to Buffer drafts. Only the bricked
images were rebuilt here. Captions, text overlays, links, hashtags and every other slide are
unchanged, and the approved post files and `week.md` were not edited (their hashes still match).
The publisher should swap in the files below in place of the asset each row names.

How: MemoBrick Studio, team editor from branch `claude/memobrick-editor-standalone-0dyk45`
(commit fb67f84), served locally and driven headless through `window.MB_TEAM` with Playwright,
the same way as `2026-W43/redo/`. Script: `studio_export.js` (New project, the photo, the size,
Reset crop until zoom is 1 (the full photo), then saturation -35 and temperature -15, then export the
Studio mosaic canvas `MB_TEAM.mosaic` as PNG). The Warmth slider stays on its automatic default
(35%); "warmth -15" is the Studio's temperature value `S.temp = -15`, which cools the picture.
Source photo: the same AI photo each post already used, cut from the post's own image without its mosaic.
`compose.py` puts the exports into the slides; `reel30.py` rebuilds the reel's first 9 seconds.

| Post | Was | Now (in this folder) |
|---|---|---|
| S-20261027-1 free-proof | slide 3 bottom half: `photo_to_bricks` mosaic | `S-20261027-1-3-studio.png` (top photo and both labels unchanged) |
| S-20261028-1 build-time | end card mosaic (16.7 to 20.2 s) | `S-20261028-1-studio.mp4`, `-studio-preview.jpg`, still `-studio-endcard.png`. Real building footage and text unchanged; same slow push-in |
| S-20261029-1 size-guide | slide 1 and pin: AI-drawn mosaic on the wall | `S-20261029-1-studio.png`, `S-20261029-1-pin-studio.png` (Studio export composited into the white frame) |
| S-20261030-1 guess-the-photo | 0 to 9 s: `photo_to_bricks` cat mosaic, zoom out | `S-20261030-1-studio.mp4`, `-studio-preview.jpg`. 9 to 18 s unchanged; same three text lines at the same times |
| S-20261031-1 pet-halloween | slide 2: `photo_to_bricks` dog mosaic | `S-20261031-1-2-studio.png` (text band unchanged) |
| S-20261101-1 order-by-dec-15 | slide 1 and pin: AI-drawn mosaic on the wall | `S-20261101-1-studio.png`, `S-20261101-1-pin-studio.png` (Studio export composited on the wall) |

Raw Studio exports: `<post-id>-studio-mosaic.png`.

## Studio: lines

- S-20261027-1 Studio: 30 × 20" (96 × 64 studs), 13 colors, crop reset to the full photo (grandmother and granddaughter, 1009 × 673 cut from slide 3, "Your photo" label painted out), saturation -35, temperature -15, other settings automatic. Size not named in the post; 30 × 20 chosen to fit the landscape half of the slide.
- S-20261028-1 Studio: 20 × 20" (64 × 64 studs), 13 colors, crop reset to the full photo (same grandmother photo, 673 × 673 square), saturation -35, temperature -15, other settings automatic. Shown square on the end card's white mat.
- S-20261029-1 Studio: 20 × 20" (64 × 64 studs), 14 colors, crop reset to the full photo (the couple on the sofa, cut from slide 1), saturation -35, temperature -15, other settings automatic.
- S-20261030-1 Studio: 20 × 30" (64 × 96 studs), 12 colors, crop reset to the full photo (the cat photo from the reel's end card, cut to 2:3), saturation -35, temperature -15, other settings automatic. Size not named in the post; 20 × 30 chosen for the vertical reel. Shown fit to width on cream.
- S-20261031-1 Studio: 16 × 16" (50 × 50 studs), 17 colors, crop reset to the full photo (the golden retriever photo from the pin, square), saturation -35, temperature -15, other settings automatic. Size not named in the post; shown square on cream above the unchanged text.
- S-20261101-1 Studio: 20 × 20" (64 × 64 studs), 15 colors, crop reset to the full photo (the couple by the tree, cut from slide 1), saturation -35, temperature -15, other settings automatic.

## Proposed new dates (nothing scheduled)

| Post | Was | Proposed |
|---|---|---|
| S-20261028-1 build-time | Wed Oct 28 19:00 ET | Wed Oct 28 19:00 ET (unchanged, if Eden OKs the end card in time; otherwise drop it and move nothing) |
| S-20261029-1 size-guide | Thu Oct 29 19:00 ET | unchanged |
| S-20261030-1 guess-the-photo | Fri Oct 30 19:00 ET | unchanged |
| S-20261031-1 pet-halloween | Sat Oct 31 11:00 ET | unchanged (Halloween day) |
| S-20261101-1 order-by-dec-15 | Sun Nov 1 11:00 ET | unchanged |
| S-20261027-1 free-proof | Tue Oct 27 19:00 ET (passed) | Mon Nov 9 19:00 ET, the first open day after W45 (Nov 2 to 8 has one post every day); the W46 plan should take it as its Monday post |

All six keep their AI label note. They wait on Eden's OK of the new images before the publisher
moves them from Buffer drafts back to the queue.
