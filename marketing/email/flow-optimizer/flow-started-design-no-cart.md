# New flow: started a design, no cart (one email)

Executor once approved: email-flow-optimizer. Needs the site event in `marketing/email/flow-optimizer/spec-started-design-event.md` (separate item, executor site-developer) to be live first; until the event shows in Omnisend I create nothing.

## Creative concepts

1. **The face appearing.** Big idea: you already saw your photo turn into bricks; now picture building it. Hook: the moment a face you love starts to show, brick by brick. Visual: live product photo of a couple next to their brick mosaic (photo and mosaic in one image) as the hero, the same mosaic on a living room wall as the supporting image.
2. **The table.** Big idea: the evening you build it together. Hook: the kit open on the table, bags sorted by color, someone reading the next row. Visual: needs a real build photo we do not have (owner still or AI illustration).
3. **The gift deadline.** Big idea: the photo you tried is the gift you were looking for, and December 15 is the order-by date. Hook: a wrapped kit under the tree. Visual: no real gift-wrapped photo exists; would need an illustration.

Chosen: 1, with a line of 2 in the story and 3 as one quiet line. It speaks straight to what this reader just did (tried a photo in the editor), and both images are real product photos on the live site.

## Subject

Your photo looks lovely in bricks

## Subject options

- Your photo looks lovely in bricks
- [[contact.first_name|default:"Hey"]], you started something special
- The mosaic you started is one step away

## Preview text

Here is what happens when you build it together.

## Body

<!-- hero: https://mymemobrick.com/cdn/shop/products/Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick-59275059.png?width=1200 | From a photo you love to bricks you build. | You started a mosaic. Here is the best part. | A smiling couple standing next to a brick mosaic portrait of the same photo, 20 by 40 inches -->

Hi [[contact.first_name|default:"there"]], you tried a photo in our editor. That moment when a picture you love turns into little squares of color? It gets even better in your hands.

[Finish my mosaic](https://mymemobrick.com/pages/editor?size=20x20&utm_source=omnisend&utm_medium=email&utm_campaign=started-design-no-cart#editor)

<!-- divider -->

### The evening you build it

## One small brick at a time.

Picture the kit open on the table. Bricks waiting in small bags, sorted by color. Someone reads the next row from the color map, someone else finds the right shade of pink. Then, slowly, a face you love starts to appear.

<!-- steps: Add your photo: see it in 40+ colors | Choose your size: preview it before you order | Build it together: 1×1 bricks, baseplates, color map and tool, all in the kit -->

<!-- image: https://mymemobrick.com/cdn/shop/products/Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick-59275130.png?width=1200 | A brick mosaic portrait of a smiling couple on a living room wall above a small table | Up close it is bricks. From across the room, it is them. -->

<!-- band: A picture that matters, built by the people who matter. -->

Giving it as a gift? Order by December 15 to have it before Christmas.

Not sure which photo works best? Just reply to this email and a real person will help. If you would rather we make the design, our designers can create it and send you a free proof first. It is optional.

[Finish my mosaic](https://mymemobrick.com/pages/editor?size=20x20&utm_source=omnisend&utm_medium=email&utm_campaign=started-design-no-cart#editor)

P.S. Trying a photo in the editor is free, so try a few and keep the one that makes you smile.

## Design notes

- Image 1 (hero): live product photo `Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick-59275059.png` from the 20×40 product (store domain, 200 on 2026-11-11). It is a product image with models, not a customer; nothing in the email says otherwise. Alt text in the hero line.
- Image 2: live product photo `Custom-Bricked-Mosaic-Portrait-20x40_-Memobrick-59275130.png` (200 on 2026-11-11), the same mosaic shown on a wall with a brick close-up. No frame shown. Alt text in the block.
- I did not use the 20×40 product's fifth image (a framed piece on a real wall): it looks like a customer's piece and shows a frame.
- One button, one destination (the editor at 20×20, per today's task-board link rule), shown twice. The free proof is mentioned as text with no second link; replying needs no link.
- No discount: the flow runs past Nov 22, when EARLYHOLIDAY20 ends, and the owner wants no code Nov 23 to 26. No review count, no press, no shipping time, no named quote.
- Claims: kit contents and 40+ colors from `product-facts.md`; size preview in the editor from `product-facts.md`; free proof confirmed by the owner 2026-10-12; December 15 from the Facts table (verified 2026-10-11).
- The editor does not keep a design across days, so the copy never says the design is saved.

## Omnisend flow setup

Created disabled, enabled only after the owner approves and the site event is seen in Omnisend.

| Setting | Value |
|---|---|
| Name | Started design, no cart |
| Trigger | custom event `started design`, origin `api` |
| Inactivity | 3 hours with no new `started design` event (resets if they come back to the editor) |
| Blocks | 1. delay, specific time 19:00 store time (an evening read, and it lands after the Browse Abandonment email that may fire 2 hours after a product view) 2. send email (this draft, sender Memobrick, hello@memobrick.app, reply-to hello@memobrick.app) |
| Exit conditions | `added design to cart` (api), `added product to cart` (shopify), `started checkout` (shopify), `placed order` (shopify) |
| Frequency limiter | interval, 14 days |
| Overlap limiter | currentlyIn: Abandoned Cart 64e86fedc0c2565cbe9d8ac8, Abandoned Checkout 68ecddff00915ec475c65e01 |
| Sending threshold | email: subscribed |
| UTM | source omnisend, medium email, campaign started-design-no-cart |

- On 2026-12-16 the December 15 line comes out (I will propose that edit by Dec 15).
- Measured weekly: delivered, clicks, orders, revenue, unsubscribes, spam. Primary metric: orders per delivered email. Guardrails: unsubscribes under 1% and spam complaints under 0.1% of delivered; if either is crossed, I propose switching the flow off.
- No holdout group: volume is unknown until the event runs (Shopify cannot count popup signups by tag) and likely small and every email held back in Black Friday season is a lost chance at an order. Compare with Browse Abandonment (1 order in 79 sent since Sep 28).
