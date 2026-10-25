# Holiday brick gift boxes (proposal, 2026-10-25)

Eden asked (chat): "do not redesign all the website, only add few things to the current design, make a gift box made of bricks and put it on the background scrolling".

- make_gift_box.py draws a gift box made of 1x1 bricks (each brick with its stud) as SVG; box-red/green/blue/purple.svg use the site's rainbow colors.
- holiday-gift-boxes.js floats 6 boxes (4 on phones) behind the page content, peeking in from the screen edges, drifting at different speeds as the page scrolls. Still for people who turn on reduced motion. No layout or content changes.
- Small text touch in the mock: the promo bar reads "Order by December 15 to have it before Christmas · Save 20% with code EARLYHOLIDAY20".
- Previews: preview-desktop-top.png, preview-phone-top.png, preview-scroll-desktop.mp4 (made on the live page in a test browser; nothing live changed).
- To go live: upload the 4 SVGs as theme assets, add the script to layout/theme.liquid (home page only, or all pages) in an unpublished theme copy, Eden previews and publishes. Not approved yet.

## Version 2 (2026-10-25, Eden: "improve it")
- 3D boxes: each box is drawn with its front, top (studs up) and right side, in three shapes (cube, tall, wide) and five rainbow colors, with a brick bow (svg/box-<shape>-<color>.svg). Plus loose single 1x1 bricks (svg/brick-<color>.svg).
- Desktop: 6 boxes + 4 loose bricks; phone: 4 boxes + 1 brick. They sway and drift sideways a little as they scroll.
- Text touches in the mock: promo bar keeps its own style ("Order by December 15 to have it before Christmas · Save 20% with code EARLYHOLIDAY20"), and a second link under "Not sure yet?": "Giving it as a gift? Give a Gift Kit, they pick the photo" to /products/unlimited-memobrick.
