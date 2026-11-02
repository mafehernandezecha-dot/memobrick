# Pre-made kit photos (pilot: Balloon Dog 16x16)

Eden's rules (2026-11-02): "do not change original colors"; the close-up style looked good; "make the flat design also to look realistic".

Method (colors stay exactly the design's colors):
1. Source = the Shopify design image without overlays (for Balloon Dog the shelf photo, cropped to the mosaic).
2. `grid.py` finds the stud grid; `cells2.py` reads each brick's color (51x51 here; the dark first row and light last column are cut off: 50x50).
3. `render2.py` draws every brick with flat round studs, seams, soft shadows and light, from those exact colors.
4. `photo.py framed` = main photo (black frame, light background). `photo.py closeup x0,y0,x1,y1` = angled macro with depth of field.
5. Room / person: Gemini (`gem_txt.py`, gemini-3-pro-image) makes only the scene with a flat green square inside the frame; `comp.py` pastes the rendered design into it. Gemini never draws the mosaic.

Files: 16x16-woof-bubble-dog-1-main.jpg, -2-closeup.jpg, -3-room.jpg, -4-person.jpg. Not uploaded to Shopify.
