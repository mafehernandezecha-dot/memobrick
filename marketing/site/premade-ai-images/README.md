# Pre-made kit photos (pilot: Balloon Dog 16x16)

Eden's rules (2026-11-02): "do not change original colors"; the close-up style looked good; "make the flat design also to look realistic".

Method (colors stay exactly the design's colors):
1. Source = the Shopify design image without overlays (for Balloon Dog the shelf photo, cropped to the mosaic).
2. `grid.py` finds the stud grid; `cells2.py` reads each brick's color (51x51 here; the dark first row and light last column are cut off: 50x50).
3. `render2.py` draws every brick with flat round studs, seams, soft shadows and light, from those exact colors.
4. `photo.py framed` = main photo (black frame, light background). `photo.py closeup x0,y0,x1,y1` = angled macro with depth of field.
5. Room / person: Gemini (`gem_txt.py`, gemini-3-pro-image) makes only the scene with a flat green square inside the frame; `comp.py` pastes the rendered design into it. Gemini never draws the mosaic.

Files: 16x16-woof-bubble-dog-1-main.jpg, -2-closeup.jpg, -3-room.jpg, -4-person.jpg. Not uploaded to Shopify.

## Main photo, more real (2026-11-02)
Eden: "make the flat design more real even if the color will change little bit". `gem.py` (gemini-3-pro-image, 1:1) turns the exact-color framed render into a real-looking photo (square frame, wall, natural light); a gentle global color match back toward the render (60/40) keeps colors close. File: 16x16-woof-bubble-dog-1-main-photo.jpg (replaces -1-main.jpg as the main photo if Eden prefers it).

## Batch for all pre-made kits (A-2026W45-052, 2026-11-02/03)
Finals per kit in `kits/<handle>/`, log in `batch-log.md`, check sheet `batch-check-1.jpg`.
`tools/` holds the generalized scripts: `gridx.py` (any size, square stud pitch, cell centres found by colour uniformity), `render.py` (render2 without the Balloon-Dog row cut), `photox.py` (framed for any aspect, 2048px close-up), `gemx.py` (aspect ratio + 2K), `prompt_main.txt` (main photo prompt), `cmatch.py` (60/40 colour match), `mcheck2.py` (per-brick colour check of the main photo), `compx.py` (comp.py, but the fringe clean-up never touches the pasted design).
Only 4 kits had a clean, uncovered design image; the rest have the zoom circle over the design and were skipped (see log).
