# Holiday brick gift boxes (proposal, 2026-10-25)

Eden asked (chat): "do not redesign all the website, only add few things to the current design, make a gift box made of bricks and put it on the background scrolling".

- make_gift_box.py draws a gift box made of 1x1 bricks (each brick with its stud) as SVG; box-red/green/blue/purple.svg use the site's rainbow colors.
- holiday-gift-boxes.js floats 6 boxes (4 on phones) behind the page content, peeking in from the screen edges, drifting at different speeds as the page scrolls. Still for people who turn on reduced motion. No layout or content changes.
- Small text touch in the mock: the promo bar reads "Order by December 15 to have it before Christmas · Save 20% with code EARLYHOLIDAY20".
- Previews: preview-desktop-top.png, preview-phone-top.png, preview-scroll-desktop.mp4 (made on the live page in a test browser; nothing live changed).
- To go live: upload the 4 SVGs as theme assets, add the script to layout/theme.liquid (home page only, or all pages) in an unpublished theme copy, Eden previews and publishes. Not approved yet.
