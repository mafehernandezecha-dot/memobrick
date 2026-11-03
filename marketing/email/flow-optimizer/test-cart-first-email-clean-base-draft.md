# Cart email 1, designed clean version

## Creative concepts

1. **The wall.** Big idea: your photo is one step from hanging at home. Hook: the finished piece on a living room wall. Visual: live product photo of a mosaic portrait on a wall (hero), the mosaic crop as the supporting image.
2. **The table.** Big idea: the evening you build it together. Hook: bricks sorted in small bags, someone reading the next row. Visual: needs a build photo we do not have; would need an owner still or an AI illustration.
3. **The saved design.** Big idea: it is waiting, exactly as you left it. Hook: your own design, saved. Visual: the personalized saved-design block already live in the email.

Chosen: 1 as the opening with 3 right under it (live personalized block) and a line of 2 in the copy. It makes the keepsake real with an image we really have, and it keeps the same look as Checkout email 1 so the two recovery flows feel like one brand.

## Subject

[[contact.first_name|default:"Hey"]], your mosaic is still saved

## Subject alternatives

- Your photo, one step from the wall
- Your design is waiting in bricks

## Preview text

It's exactly as you left it. Finish whenever you're ready.

## Body

<!-- hero: https://mymemobrick.com/cdn/shop/files/Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick.png?width=1200 | Your photo is one step from the wall. | Your design is saved and waiting. | A custom brick mosaic portrait of a smiling couple hanging on a living room wall -->

Hi there, we saved your design exactly as you left it. Finishing takes about a minute.

[Finish my mosaic](https://mymemobrick.com/cart)

<!-- divider -->

### What is in your kit

## Everything you need to build it at home.

Your 1×1 bricks in 40+ colors, sorted into small bags. The baseplates for your size. A printed color map that tells you what goes where. And the tool that comes with your kit.

<!-- steps: Open the bags: sorted by color, ready to go | Follow the color map: one row at a time | Watch the faces appear: brick by brick, together -->

<!-- image: https://mymemobrick.com/cdn/shop/files/Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick.png?crop=region&crop_left=108&crop_top=80&crop_width=507&crop_height=755&width=700 | A mosaic portrait of a couple made of small 1×1 bricks | Up close it is bricks. From across the room it is the two of them. -->

<!-- band: A picture that matters, built by the people who matter. -->

Giving it as a gift? Order by December 15 to have it before Christmas. Not sure about your photo or the size? Reply to this email. A real person reads every one. If you would like help, our designers can make your design and send you a free proof first. It is optional.

[Finish my mosaic](https://mymemobrick.com/cart)

P.S. Your design stays saved, so you can come back whenever you are ready.

## Design notes

- The live personalized block (last_design_image with its fallback to the cart item, "Saved and waiting to be built") stays directly under the first paragraph in Omnisend; the preview cannot render it, so the hero stands in.
- Image 1: live product photo Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick.png (200), a product image, not a customer. Alt text in the hero line.
- Image 2: same file cropped to the mosaic. Alt text in the block.
- No discount, no review count, no press, no shipping timing, no named quote. Dec 15 is from the Facts table (verified 2026-10-11).
- Button link in Omnisend stays the same https://mymemobrick.com/cart link the live email uses.
