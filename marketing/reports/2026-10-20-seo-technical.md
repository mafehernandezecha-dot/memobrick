# seo-technical 2026-10-20

## Summary

Eden asked for better product descriptions and tags to win back search (search sessions down 73%). I read every priority listing in Shopify, viewed the images, and drafted new titles, descriptions, SEO fields, alt text, tags, product types and categories for the 22 custom photo kits, the 4 best-selling frames, 4 collections and 110 live Artist Collection designs (each written from its image). Nothing is live; three site-change items are proposed below.

## Done

- Read the live state (read-only Shopify GraphQL, plus the live site, which was reachable) of the Custom Bricks Portrait collection (25 products), the top sellers of the last 90 days (Shopify analytics), the four frames in the top 10, the collections the-gift-for-everyone, best-sellers, photo-frames, bricks and catalogue-picture, all 177 Artist Collection products and the 40 brick bags.
- Viewed every image of the six best-selling custom sizes, the main image of each top frame, and the main image of all 177 Artist Collection products (Eden's instruction via the coordinator).
- Wrote `marketing/seo/technical/product-listings-2026-10-20.md`: method, findings with examples, before/after tables per priority product and collection, the Artist Collection table with what each image shows, the IP-risk list, the long-tail rules, and the LEGO approach.
- Wrote `marketing/seo/technical/product-listings-2026-10-20.csv`: 1,521 rows ready to apply (priority, handle, product_id, status, field, current, proposed, image_description_basis, note). All SEO titles are 60 characters or less, metas 155 or less, product titles under 150; no em dashes and no "LEGO" in any proposed text. Em dashes in current Shopify values are shown as `[em-dash]` so the file passes the copy check.
- Wrote three site-change drafts in `marketing/seo/technical/site-changes/`: `product-listings-priority.md`, `product-listings-long-tail.md`, `republish-public-domain-designs.md`.
- Added a Search Console request (product and collection queries, merchant listings report) to `marketing/data/requests.md`.
- Copy check passed on all five new files.

### Top 3 products in plain words (before and after)

1. **20x20 kit** (`2-2-boards`, 40 orders in 90 days).
   - Before: title "Custom Bricked Mosaic Portrait 20×20"". The description is the same paragraph every size uses, with run-together specs ("SIZE: 20x20 inchesBASE PLATES: 4 white clear..."). Type "Building Toys". Tags: only "Custom Bricks Portrait, GIFT, memobrick". Every one of the 12 images has the alt text "Custom Bricked Mosaic Portrait 20×20" - Memobrick".
   - After: title "Custom Photo Brick Mosaic Portrait 20x20 in - Personalized DIY Photo Gift Kit". The description opens with who it is for (mom, dad, grandparents, couples, pet lovers, family; Christmas, birthdays, anniversaries, Mother's Day), then specs as bullets (4,096 1×1 bricks on 4 white baseplates, about 4 hours, 40+ colors), the three steps (upload, preview and adjust, build), the optional free proof, what is in the kit, a link to the 20x20 frame, and "Order by December 15, 2026 to receive it before Christmas". Meta: "Turn your photo into a 20x20 inch brick mosaic kit with 4,096 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request." Type "Custom Photo Mosaic Kit", category Mosaic Kits, 16 useful tags (occasion, recipient, size, square). Each image gets its own alt text, for example "Girl holding her own 20x20 inch custom brick mosaic portrait at home".
2. **16x16 kit** (`1-big-board`, 44 orders).
   - Before: "Custom Bricked Mosaic Portrait 16x16"". Same template description. The meta has an em dash and says "handcrafted".
   - After: "Custom Photo Brick Mosaic Portrait 16x16 in - Personalized DIY Photo Gift Kit". The same structure with 2,500 bricks on 1 baseplate and about 2.5 hours. Meta: "Turn your photo into a 16x16 inch brick mosaic kit with 2,500 bricks...". Alt text says what each picture shows, for example "16x16 inch brick mosaic of a Bernese mountain dog next to the original photo".
3. **20x30 kit** (`2-3-boards`, 18 orders, second by revenue).
   - Before: "Custom Bricked Mosaic Portrait 20x30"". Type "Posters, Prints, & Visual Artwork".
   - After: "Custom Photo Brick Mosaic Portrait 20x30 in Vertical - Personalized DIY Photo Gift Kit". 6,144 bricks on 6 baseplates, about 6 hours, a link to the 20x30/30x20 frame. The first image's alt text: "20x30 inch brick mosaic of a laughing baby in Christmas pajamas, with the baby sitting below it".

### Three pre-made designs in plain words (written from the image)

1. **Balloon Dog** (`16x16-woof-bubble-dog`, live). The image shows a multicolor balloon dog on white.
   - Before: "Woof Bubble Dog  Home Decor Bricked Mosaic Portrait 16x16"", with the generic "Our artists have created a special collection" text. Its only tag is "art collection".
   - After: "Balloon Dog Brick Mosaic Art Kit - 16x16 in DIY Wall Decor". Description: "Multicolor balloon dog on white background. A pop art design in pink, orange, green and purple on white, with a playful feel that suits a kids' room or living room", then 2,500 bricks, about 2.5 hours, kit contents, "a great gift for dog lovers", and the Christmas date. Tags: pop-art, color-pink, color-orange, kids-room, living-room, playroom, dog-lover-gift, size-16x16, christmas-gift and others.
2. **Burger** (`20x20-burger-art`, live). The image shows a cheeseburger on a green and yellow sunburst.
   - After: "Burger Pop Art Brick Mosaic Art Kit - 20x20 in DIY Wall Decor". It suits a kitchen or diner and makes a gift for foodies. Tags: kitchen, kitchen-art, foodie-gift, food-pop-art, color-orange, color-green.
3. **Starry Night** (`bricked-mosaic-20x20-the-starry-night`, currently a draft). The image shows a swirling blue night sky with a yellow moon and a dark cypress.
   - Before: "The starry Night Home Decor Bricked Mosaic Portrait 20x20".
   - After: "Van Gogh Starry Night Brick Mosaic Art Kit - 20x20 in DIY Wall Decor", with tags famous-painting, starry-night and art-lover-gift. The painting is public domain, so the name is safe to use and people search for it.

## Proposed for approval

### P-seo-technical-20261020-1
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/product-listings-priority.md
- Reason: If approved, seo-technical backs up the current values and then rewrites titles, descriptions, SEO fields, alt text, tags, types and categories on the 22 custom photo kits, the 4 best-selling frames and 4 collections in Shopify (no URL or price changes). This is to win back Shopping and organic search before the Nov 10 holiday ramp.
- Expires: 2026-11-10
- Status: pending

### P-seo-technical-20261020-2
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/product-listings-long-tail.md
- Reason: If approved, seo-technical backs up the current values and then applies the image-based listings to the 110 live Artist Collection designs and the rule-based fixes to the brick bags, the other frames and the Artist Collection page. It removes the unconfirmed "ships in 1-2 days" and "we can build it for you" claims. Products on the IP list are not touched.
- Expires: 2026-11-15
- Status: pending

### P-seo-technical-20261020-3
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/republish-public-domain-designs.md
- Reason: If approved, and once Eden confirms these designs can still be made, seo-technical republishes the Starry Night (20x20, 20x30) and Mona Lisa kits with new listings on the Online Store and Google channels. These pages drew search buyers last holiday and are drafts today.
- Expires: 2026-11-10
- Status: pending

## Blocked or unknown

- **Search Console and Merchant Center:** no snapshot. `marketing/data/` has never been filled, so there are no query volumes or item-level Shopping issues. I added a request to `requests.md`. The Merchant Center "Needs attention" export has to come from Eden.
- **Google taxonomy list:** I could not download it (the proxy blocked google.com). The Meta catalog category IDs (16 for kits, 597 for frames) must be confirmed by the executor before writing, or skipped.
- **Product data errors that need Eden:**
  - 60x20 shows the 50x60 specs (30 baseplates, 30,720 pieces).
  - 60x30 and 60x60 list 32 baseplates, which does not match their piece counts.
  - The 20x20 size-guide image says 4,092 bricks; the product data says 4,096.
  - Three art titles name the wrong subject: "Lion" shows a tiger, "Rose" shows a tulip, "Colorful Zebra" shows a horse. The new titles follow the image.
- **IP risk, owner decision:** 52 Artist Collection designs show real celebrities, brand logos or studio characters. No copy was written for them, and none of the names appear in the drafts. Only two of them are live: `lady-bricked-mosaic-home-decor-20x30` and `heatblast-ben-10-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30`. The full list is in the markdown file. Separately, gallery images on the 10x10, 16x16 and 20x20 custom kits appear to show recognizable actors, and two 30x30 images show anime characters. I suggest replacing those images.
- **Too unclear to describe (5):** cat-selfie, candle-light, hope-art, red-kiss and cute-curios-cat. The last one looks like a hamster, not a cat.
- **Facts not available, so left out of the copy:** compatibility with other brick brands (so there is no LEGO-related claim), frame material, glass and hanging hardware, whether the brick bags hold 1x1 bricks, faces per size for 16x16 to 30x20, and build times for 50x60, 60x30, 60x20 and 70x60.
- **For site-developer:** most custom kits and some art kits still have an assembled ("Yes") variant, which the owner says is not offered.

## Sales impact

This addresses the weak point "Referred traffic is down almost two thirds, search worst" (search sessions 703 vs 2,660, -74%). Search also converts best: 21 purchases from 703 sessions. The Shopify title is the Google Shopping title, and PMax shows for only 14% of the searches it could, mostly because of low ad rank. So leading with "Custom Photo Brick Mosaic... Personalized DIY Photo Gift Kit" and using one correct category should raise Shopping relevance and click rate at the same spend. The four sizes that carried 112 of the last 90 days' orders go first.

Republishing Starry Night and Mona Lisa brings back product pages that drew search buyers last holiday. The expected effect shows up within 1 to 2 weeks of the feed refresh. I will measure Shopify search sessions and the Search Console snapshot two weeks after applying. These are ranking inputs, not guaranteed orders.

## Next run

- After approval: apply the approved items with backups, then report product IDs and any skipped fields.
- Write per-image alt text for the 16 lower-selling custom sizes and the second image of each art kit.
- Remove the Christmas order-by paragraph on 2026-12-16.
- Friday 2026-10-23: weekly audit. Compare search sessions with the pre-change baseline.
