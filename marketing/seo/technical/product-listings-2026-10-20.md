# Product listing SEO and feed quality, 2026-10-20

Owner request (Eden, 2026-10-20): improve product descriptions and tags so listings reach more people. Search sessions are down 73% (681 vs 2,497, Sep 22 to Oct 19). Merchant Center approves 96% of 10,260 items, so the gap is findability and click appeal, not approval.

Everything here is a draft. Nothing has been changed in Shopify. The full field-by-field table, ready to apply, is `marketing/seo/technical/product-listings-2026-10-20.csv` (1521 rows: handle, field, current, proposed, image_description_basis, note).

## Method

1. **Sales first.** Top sellers of the last 90 days from Shopify analytics (`FROM sales SHOW net_sales, orders GROUP BY product_title SINCE -90d`): 20x20 (40 orders, $4,580), 20x30 (18), 30x30 (8), 16x16 (44), 30x20 (10), 40x30 (1), frame 20x30/30x20 (15), frame 20x20 (13), 60x60 (1), frame 30x30 (6), then 20x40, frame 16x16 and 10x10 (12 orders). Priority 1 is the 22 custom-photo sizes in the Custom Bricks Portrait collection plus the four best-selling frames and the four collections that get search visits.
2. **Read the live state** with read-only Shopify GraphQL: title, description, product type, vendor, tags, SEO title and meta, handle, options, every image's alt text, Shopify product category, and the feed metafields. The `mm-google-shopping` namespace is empty on every priority product and variant; the only feed metafields are `mc-facebook.google_product_category` and `mc-facebook.condition`. The live site (mymemobrick.com) was reachable and its title, meta, H1 and JSON-LD were checked on the 20x20 kit and the 20x20 frame.
3. **Looked at the images.** Every image of the six best-selling sizes and the main image of each top frame was downloaded through the store domain and viewed, so alt text describes what is in the picture. Per Eden's instruction (relayed by the coordinator), the main image of all 177 Artist Collection products was viewed too, and their titles, descriptions, alt text and tags are written from what each design shows. The basis for each is in the CSV column `image_description_basis`.
4. **Demand signals used:** the converting and blocked search terms in `marketing/analytics/ads-analyst/google-audit-2026-10-13.md` ("custom photo mosaic", "photo mosaic kit", "brick mosaic kit", "custom brick mosaic", "brick mosaic portrait", "personalized photo gift", "christmas gift from photo", "anniversary gift from photo", "gift for grandparents photo", "custom pet portrait"; LEGO terms spent $172 with 0 sales), the buyer profile (women 35 to 64 buying for family; 16x16 and 20x20 most bought; Christmas, Valentine's Day, Mother's Day), and the SEO strategist's keyword map. Search Console is not connected, so no query volumes; a data request was added.
5. **Brand and honesty rules:** facts only from `offers-calendar.md` and `product-facts.md`. Used: the Dec 15, 2026 Christmas order-by date, the optional free design proof, kit contents, sizes, pieces and Shopify build-time estimates, 40+ colors. Not used: delivery times, "free replacements", "nothing is made until you approve", review counts, "built in hundreds of homes", "unlimited revisions", the assembled option, frame materials. No em dashes, no LEGO.

## Findings: what is weak today

1. **Titles lead with a word nobody searches.** Every custom size is "Custom Bricked Mosaic Portrait 20×20\"". People search "custom photo mosaic", "brick mosaic kit", "photo gift". "Bricked" is not a search term, and the title never says it is a kit or a gift. Because the Google & YouTube app sends the Shopify title to Shopping, this is also the Shopping title, and PMax shows for only 14% of eligible searches mostly because of low ad rank (ads audit). Example: `2-2-boards` title "Custom Bricked Mosaic Portrait 20×20\"".
2. **Every size has the same 90-word description**, with run-together specs ("SIZE: 16x16 inchesBASE PLATES: 1 white clearPIECES: 2,500"), an em dash, no who-it's-for, no occasion, no Christmas date, no bullet list. Three sizes show wrong numbers: 60x20 repeats the 50x60 specs (30 baseplates, 30,720 pieces); 60x30 and 60x60 say 32 baseplates, which does not match their piece counts.
3. **Meta descriptions: five priority products and many art kits use a truncated "Lego-style pixel art DIY kit" text** (trademark risk, cut off mid-word: "...possibilities for design a"). Example: `custom-bricked-mosaic-10x10`, `custom-bricked-mosaic-portrait-50x60`, `-60x30`, `-60x20`, `-70x60`. Most other metas contain an em dash. Frame metas are "Size: 16x16 inch    - Memobrick". The best-sellers collection promises "unlimited revisions" and a proof "before anything is produced"; the bricks collection image alt is literally "LEGO bricks".
4. **Product type and category are inconsistent, so feeds and collections cannot group products.** The 22 custom sizes use 8 different product types ("Building Toys", "Decor", "Home & Garden", "Posters, Prints, & Visual Artwork", "puzzle", empty...). The Meta catalog category (`mc-facebook.google_product_category`) has 6 different values across them (2559, 3577, 16, 8, 6829, none). Frames sit in "Cameras & Optics > Photo Mounting Supplies" with five different Google IDs. Art kits are "puzzle", "Decor", "Jigsaw Puzzle Accessories", "Construction Set Toys".
5. **Tags are almost empty and partly junk.** Custom sizes carry only "Custom Bricks Portrait", "GIFT", "memobrick": nothing for occasion, recipient, size or orientation. Art kits carry junk like "with", "home", "brick", "pre-madedesign", "mondays release". Wrong tags put a $4 alphabet tile set and an art design in the custom-photo collection, and an animated-character design in Bricks and Accessories.
6. **Alt text is the title repeated on every image** ("Custom Bricked Mosaic Portrait 20×20\" - Memobrick" twelve times); frame alts contain raw `<br>` markup.
7. **The pre-made designs that brought search buyers last holiday are drafts.** The ads audit found that Mona Lisa and Starry Night product pages pulled search visits in Q4 2025. Today both Starry Night kits (20x20 and 20x30) and the Mona Lisa kit are in DRAFT, so they are not in the store or the feed. Of the 177 Artist Collection products, 57 are drafts.
8. **Three art titles name the wrong subject** (image checked): "Lion King of the Jungle" shows a tiger, "Rose" (`rose-home-decoration-bricked-mosaic-portrait-16x16-1`) shows a tulip, "Colorful Zebra" shows a horse. Several art descriptions promise "1-2 business days to be shipped" and "we also can build it for you", neither confirmed.
9. **Image rights risk inside the best sellers.** Gallery images on the 10x10, 16x16 and 20x20 kits appear to show recognizable actors next to their mosaics, and two 30x30 images show anime characters. These are not in any text, but they are in the images Google Shopping can use. Owner decision, listed below.

## LEGO searches: how to capture them safely

People do search "lego portrait", "custom lego portrait", "turn photo into lego". The ads audit shows these searches spent about $172 in 28 days with **0 purchases**: they are mostly toy, album-cover and free-template seekers, not our buyer. So the plan does not chase them. No title, description, tag or alt text uses "LEGO". We use the words those buyers also use: "brick mosaic", "brick portrait", "1×1 bricks", "building bricks". A claim such as "compatible with major brick brands" is **not** in the product facts, so it is left out; if Eden confirms compatibility in writing, one plain line can be added to the kit description and the FAQ. The planned blog article "Can you turn a photo into a LEGO-style mosaic?" (strategist) is the right place for the informational query, using the brand name only as a reference, never in product listings.

## Priority 1: custom photo kits (before and after)

All 22 sizes get the same structure; only the size, pieces, plates, build time and fit change, and every number comes from the product's own data. Proposed description (20x20 shown; the others are in the CSV):

```html
<p><strong>Turn a favorite photo into a 20x20 inch custom brick mosaic you build yourself.</strong> A personalized photo gift for mom, dad, grandparents, couples, pet lovers and the whole family. Use it for Christmas, birthdays, anniversaries, Mother's Day or a memory you want to keep on the wall.</p>
<ul><li>Size: 20 x 20 inches (square)</li><li>4,096 1×1 bricks on 4 white baseplates</li><li>Estimated build time: about 4 hours</li><li>Bricks in 40+ colors</li></ul>
<p><strong>How it works</strong></p>
<ol><li>Upload your photo in our web editor.</li><li>See it as a mosaic. Adjust colors and details and compare sizes before you order.</li><li>Order your kit and build it at home, brick by brick, with your printed color map.</li></ol>
<p>Prefer help with the design? Our designers can create it for you and send a free proof before production. Just ask; it is optional.</p>
<p><strong>What's in the kit</strong></p>
<ul><li>All the 1×1 bricks for your design, in small bags labeled by color</li><li>White baseplates</li><li>Personalized building instructions (a printed color map)</li><li>A building tool</li></ul>
<p>Want it ready to hang? A matching black frame is sold separately: <a href="/products/frame-2-2">see the 20x20 frame</a>.</p>
<p><strong>Giving it for Christmas?</strong> Order by December 15, 2026 to receive it before Christmas.</p>

```

Common to all 22: product type `Custom Photo Mosaic Kit`; category Arts & Crafts > Art & Craft Kits > Mosaic Kits; Meta catalog category unified to 16; keep tags `Custom Bricks Portrait` (collection rule) and `GIFT`; remove `memobrick`; add `custom-photo-mosaic, diy-kit, photo-gift, size-WxH, square|landscape|portrait, christmas-gift, birthday-gift, anniversary-gift, mothers-day-gift, valentines-gift, gift-for-mom, gift-for-dad, gift-for-grandparents, couple-gift, family-gift, pet-gift`. `condition: new` stays; age group is left as is. Handles do not change.

### custom-bricked-mosaic-10x10

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic 10x10" (one face only) | Custom Photo Brick Mosaic 10x10 in, One Face - Personalized Mini DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic 10x10" (one face only) - Memobrick | Custom Photo Brick Mosaic 10x10 in, One Face \| Memobrick |
| seo_description | Unleash your creativity with our Lego-style pixel art DIY kit! Our easy-to-use kit includes everything you need to create your own custom pixel art designs using high-quality building blocks. Perfect for kids and adults who love to build and create, our Lego-style pixel art kit offers endless possibilities for design a | Turn your photo into a 10x10 inch brick mosaic kit with 1,024 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Hobbies & Creative Arts | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | (none) | 16 |
| image alt | title repeated on 13 image(s) | e.g. "Girl holding a 10x10 inch brick mosaic of her own face" |

### 1-big-board

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 16x16" | Custom Photo Brick Mosaic Portrait 16x16 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 16x16" - Memobrick | Custom Photo Brick Mosaic 16x16 in \| Memobrick |
| seo_description | Turn your favorite photo into a stunning 16x16" personalized brick portrait. Custom photo mosaic gift [em-dash] unique, handcrafted & unforgettable. | Turn your photo into a 16x16 inch brick mosaic kit with 2,500 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 2559 | 16 |
| image alt | title repeated on 11 image(s) | e.g. "16x16 inch brick mosaic of an orange kitten on a living room wall, with the kitten in front" |

### 2-2-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 20×20" | Custom Photo Brick Mosaic Portrait 20x20 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 20×20" - Memobrick | Custom Photo Brick Mosaic 20x20 in \| Memobrick |
| seo_description | Transform your photo into a 20x20" personalized brick portrait mosaic. The perfect custom gift [em-dash] made from your memories, built to last. | Turn your photo into a 20x20 inch brick mosaic kit with 4,096 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Building Toys | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 2559 | 16 |
| image alt | title repeated on 12 image(s) | e.g. "Girl holding her own 20x20 inch custom brick mosaic portrait at home" |

Note: Exact current HTML is saved to the backup file before any write. The size-guide image says 4,092 bricks and fits 1-2; the product text says 4,096. Kept 4,096 from the product data.

### 2-3-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 20x30" | Custom Photo Brick Mosaic Portrait 20x30 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 20x30" - Memobrick | Custom Photo Brick Mosaic 20x30 in \| Memobrick |
| seo_description | Create a stunning 20x30" custom photo brick portrait [em-dash] a personalized mosaic gift that turns cherished memories into wall-worthy photo to brick art. | Turn your photo into a 20x30 inch brick mosaic kit with 6,144 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 2559 | 16 |
| image alt | title repeated on 8 image(s) | e.g. "20x30 inch brick mosaic of a laughing baby in Christmas pajamas, with the baby sitting below it" |

### 3-2-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 30x20" | Custom Photo Brick Mosaic Portrait 30x20 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 30x20" - Memobrick | Custom Photo Brick Mosaic 30x20 in \| Memobrick |
| seo_description | Turn your photo into a wide 30x20" personalized brick portrait mosaic. A custom photo-to-brick art gift that makes memories last forever. | Turn your photo into a 30x20 inch brick mosaic kit with 6,144 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Decor | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on 5 image(s) | e.g. "30x20 inch brick mosaic of a mother and daughter hugging, with them sitting below it" |

### 3-3-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 30x30" | Custom Photo Brick Mosaic Portrait 30x30 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 30x30" - Memobrick | Custom Photo Brick Mosaic 30x30 in \| Memobrick |
| seo_description | Create a bold 30x30" square custom photo brick portrait. Personalized mosaic art made from your photo [em-dash] the perfect unique gift. | Turn your photo into a 30x30 inch brick mosaic kit with 9,216 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on 6 image(s) | e.g. "30x30 inch brick mosaic of two friends laughing, with them standing in front of it" |

### 4-3-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 40x30" | Custom Photo Brick Mosaic Portrait 40x30 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 40x30" - Memobrick | Custom Photo Brick Mosaic 40x30 in \| Memobrick |
| seo_description | Create a striking 40x30" custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a meaningful gift that lasts a lifetime. | Turn your photo into a 40x30 inch brick mosaic kit with 12,288 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 8 | 16 |
| image alt | title repeated on every image(s) | e.g. "40x30 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 60x60-fits-1-9-individuals

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 60x60 | Custom Photo Brick Mosaic Portrait 60x60 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 60x60 - Memobrick | Custom Photo Brick Mosaic 60x60 in \| Memobrick |
| seo_description | Make a massive statement with a 60x60" custom photo brick portrait. The largest personalized mosaic art [em-dash] an extraordinary gift. | Turn your photo into a 60x60 inch brick mosaic kit with 36,864 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | (empty) | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 6829 | 16 |
| image alt | title repeated on every image(s) | e.g. "60x60 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

Note: Exact current HTML is saved to the backup file before any write. Current text says 32 baseplates, which does not match the piece count (each 10x10 inch plate holds 1,024 bricks); the new text keeps the piece count and leaves the plate count out until Eden confirms it.

### 20x40fits-1-3-individuals

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 20x40" | Custom Photo Brick Mosaic Portrait 20x40 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 20x40" - Memobrick | Custom Photo Brick Mosaic 20x40 in \| Memobrick |
| seo_description | Order a tall 20x40" custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a slim, striking gift for any space. | Turn your photo into a 20x40 inch brick mosaic kit with 8,192 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | (empty) | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 2559 | 16 |
| image alt | title repeated on every image(s) | e.g. "20x40 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 3-4-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 30x40" | Custom Photo Brick Mosaic Portrait 30x40 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 30x40" - Memobrick | Custom Photo Brick Mosaic 30x40 in \| Memobrick |
| seo_description | Gift a stunning 30x40" personalized brick portrait [em-dash] custom photo mosaic art that transforms your favorite memory into a showstopping display. | Turn your photo into a 30x40 inch brick mosaic kit with 12,288 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "30x40 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 2-5-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 20x50" | Custom Photo Brick Mosaic Portrait 20x50 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 20x50" - Memobrick | Custom Photo Brick Mosaic 20x50 in \| Memobrick |
| seo_description | Order a custom 20x50" photo brick portrait [em-dash] a tall, striking personalized mosaic made from your photo. Unique gift for any occasion. | Turn your photo into a 20x50 inch brick mosaic kit with 10,240 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Home & Garden | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 16 | 16 |
| image alt | title repeated on every image(s) | e.g. "20x50 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 4-2-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 40x20" | Custom Photo Brick Mosaic Portrait 40x20 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 40x20" - Memobrick | Custom Photo Brick Mosaic 40x20 in \| Memobrick |
| seo_description | Turn your photo into a wide 40x20" personalized brick portrait. Custom photo mosaic art [em-dash] a one-of-a-kind gift built from your memories. | Turn your photo into a 40x20 inch brick mosaic kit with 8,192 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Mosaic Kits | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 16 | 16 |
| image alt | title repeated on every image(s) | e.g. "40x20 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 5-2-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 50x20" | Custom Photo Brick Mosaic Portrait 50x20 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 50x20" - Memobrick | Custom Photo Brick Mosaic 50x20 in \| Memobrick |
| seo_description | Order a panoramic 50x20" custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a bold, wide-format gift for any wall. | Turn your photo into a 50x20 inch brick mosaic kit with 10,240 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "50x20 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 3-5-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 30x50" | Custom Photo Brick Mosaic Portrait 30x50 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 30x50" - Memobrick | Custom Photo Brick Mosaic 30x50 in \| Memobrick |
| seo_description | Impress with a grand 30x50" custom photo brick portrait. Personalized mosaic art built from your photo [em-dash] a truly unforgettable gift. | Turn your photo into a 30x50 inch brick mosaic kit with 15,360 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 16 | 16 |
| image alt | title repeated on every image(s) | e.g. "30x50 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 5-3-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 50x30" | Custom Photo Brick Mosaic Portrait 50x30 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 50x30" - Memobrick | Custom Photo Brick Mosaic 50x30 in \| Memobrick |
| seo_description | Gift a stunning 50x30" custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a large-format keepsake built to impress. | Turn your photo into a 50x30 inch brick mosaic kit with 15,360 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "50x30 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 4-4-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 40x40" | Custom Photo Brick Mosaic Portrait 40x40 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 40x40" - Memobrick | Custom Photo Brick Mosaic 40x40 in \| Memobrick |
| seo_description | Make a statement with a 40x40" square custom photo brick portrait. Personalized mosaic art [em-dash] the ultimate gift for any occasion. | Turn your photo into a 40x40 inch brick mosaic kit with 16,384 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 2559 | 16 |
| image alt | title repeated on every image(s) | e.g. "40x40 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 4-5-boards

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 40x50" | Custom Photo Brick Mosaic Portrait 40x50 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 40x50" - Memobrick | Custom Photo Brick Mosaic 40x50 in \| Memobrick |
| seo_description | Wow them with a massive 40x50" custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a breathtaking, wall-filling gift. | Turn your photo into a 40x50 inch brick mosaic kit with 20,480 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "40x50 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### 5-5-board

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 50x50" | Custom Photo Brick Mosaic Portrait 50x50 in - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 50x50" - Memobrick | Custom Photo Brick Mosaic 50x50 in \| Memobrick |
| seo_description | Go big with a 50x50" square custom photo brick portrait. Personalized mosaic art from your photo [em-dash] a grand, gallery-worthy gift. | Turn your photo into a 50x50 inch brick mosaic kit with 25,600 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Mosaic Kits | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "50x50 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### custom-bricked-mosaic-portrait-50x60

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 50x60" | Custom Photo Brick Mosaic Portrait 50x60 in Vertical - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 50x60" - Memobrick | Custom Photo Brick Mosaic 50x60 in \| Memobrick |
| seo_description | Unleash your creativity with our Lego-style pixel art DIY kit! Our easy-to-use kit includes everything you need to create your own custom pixel art designs using high-quality building blocks. Perfect for kids and adults who love to build and create, our Lego-style pixel art kit offers endless possibilities for design a | Turn your photo into a 50x60 inch brick mosaic kit with 30,720 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "50x60 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

### custom-bricked-mosaic-portrait-60x30

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 60x30" | Custom Photo Brick Mosaic Portrait 60x30 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 60x30" - Memobrick | Custom Photo Brick Mosaic 60x30 in \| Memobrick |
| seo_description | Unleash your creativity with our Lego-style pixel art DIY kit! Our easy-to-use kit includes everything you need to create your own custom pixel art designs using high-quality building blocks. Perfect for kids and adults who love to build and create, our Lego-style pixel art kit offers endless possibilities for design a | Turn your photo into a 60x30 inch brick mosaic kit with 18,432 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Mosaic Kits | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "60x30 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

Note: Exact current HTML is saved to the backup file before any write. Current text says 32 baseplates, which does not match the piece count (each 10x10 inch plate holds 1,024 bricks); the new text keeps the piece count and leaves the plate count out until Eden confirms it.

### custom-bricked-mosaic-portrait-60x20

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 60x20" | Custom Photo Brick Mosaic Portrait 60x20 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 60x20" - Memobrick | Custom Photo Brick Mosaic 60x20 in \| Memobrick |
| seo_description | Unleash your creativity with our Lego-style pixel art DIY kit! Our easy-to-use kit includes everything you need to create your own custom pixel art designs using high-quality building blocks. Perfect for kids and adults who love to build and create, our Lego-style pixel art kit offers endless possibilities for design a | Turn your photo into a 60x20 inch custom brick mosaic kit. A personalized DIY photo gift for family, couples and pet lovers. Free design proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "60x20 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

Note: Exact current HTML is saved to the backup file before any write. Current text lists 30 baseplates and 30,720 pieces copied from the 50x60 product, which cannot be right for 60x20; the new text leaves plate and piece counts out until Eden confirms them.

### custom-bricked-mosaic-portrait-70x60

| Field | Current | Proposed |
|---|---|---|
| title | Custom Bricked Mosaic Portrait 70x60" | Custom Photo Brick Mosaic Portrait 70x60 in Horizontal - Personalized DIY Photo Gift Kit |
| seo_title | Custom Bricked Mosaic Portrait 70x60" - Memobrick | Custom Photo Brick Mosaic 70x60 in \| Memobrick |
| seo_description | Unleash your creativity with our Lego-style pixel art DIY kit! Our easy-to-use kit includes everything you need to create your own custom pixel art designs using high-quality building blocks. Perfect for kids and adults who love to build and create, our Lego-style pixel art kit offers endless possibilities for design a | Turn your photo into a 70x60 inch brick mosaic kit with 43,008 bricks. A personalized DIY gift for family, couples and pet lovers. Free proof on request. |
| product_type | Posters, Prints, & Visual Artwork | Custom Photo Mosaic Kit |
| mc-facebook.google_product_category | 3577 | 16 |
| image alt | title repeated on every image(s) | e.g. "70x60 inch custom photo brick mosaic made from 1×1 bricks, Memobrick DIY kit" |

## Priority 1: best-selling frames

Frame descriptions today are one line ("Frame for 2x2 Size: 20x20 inch"). Proposed: what it fits, black (visible in the photos), sold separately, a link to the matching kit, the Christmas date. Material, glass and hanging hardware are unknown, so they are not claimed.

### frame-2-3-3-2

| Field | Current | Proposed |
|---|---|---|
| title | Frame 2×3 / 3×2 [em-dash] Size: 20x30 inch / 30x20 inch | Black Frame for 20x30 / 30x20 in Brick Mosaic - Display Frame for Memobrick Photo Mosaic Kits |
| seo_title | Frame 2x3 / 3x2 – 20x30 & 30x20 inch - Memobrick | Black Frame for 20x30 in Brick Mosaic \| Memobrick |
| seo_description | (empty) | Black display frame sized for 20x30 or 30x20 inch Memobrick brick mosaics. Finish your photo mosaic as wall art. Sold separately from the kit. |
| product_type | (empty) | Mosaic Frame |
| category | Cameras & Optics > Photography > Photo Mounting Supplies | Home & Garden > Decor > Picture Frames (gid://shopify/TaxonomyCategory/hg-3-52) |
| mc-facebook.google_product_category | 536 | 597 |

### frame-2-2

| Field | Current | Proposed |
|---|---|---|
| title | Frame 20x20 inch | Black Frame for 20x20 in Brick Mosaic - Display Frame for Memobrick Photo Mosaic Kits |
| seo_title | Memobrick Frame 20x20 Inch For Photo Display | Black Frame for 20x20 in Brick Mosaic \| Memobrick |
| seo_description | Frame for 2x2 Size: 20x20 inch    - Memobrick | Black display frame sized for 20x20 inch Memobrick brick mosaics. Finish your photo mosaic as wall art. Sold separately from the kit. |
| product_type | (empty) | Mosaic Frame |
| category | Cameras & Optics > Photography > Photo Mounting Supplies | Home & Garden > Decor > Picture Frames (gid://shopify/TaxonomyCategory/hg-3-52) |
| mc-facebook.google_product_category | 1246 | 597 |

### frame-3-3

| Field | Current | Proposed |
|---|---|---|
| title | Frame 3×3 [em-dash] Size: 30x30 inch | Black Frame for 30x30 in Brick Mosaic - Display Frame for Memobrick Photo Mosaic Kits |
| seo_title | Frame 3x3 – 30x30 inch - Memobrick | Black Frame for 30x30 in Brick Mosaic \| Memobrick |
| seo_description | (empty) | Black display frame sized for 30x30 inch Memobrick brick mosaics. Finish your photo mosaic as wall art. Sold separately from the kit. |
| product_type | (empty) | Mosaic Frame |
| category | Cameras & Optics > Photography > Photo Mounting Supplies | Home & Garden > Decor > Picture Frames (gid://shopify/TaxonomyCategory/hg-3-52) |
| mc-facebook.google_product_category | 1255 | 597 |

### frame-big-board

| Field | Current | Proposed |
|---|---|---|
| title | Frame 16x16" | Black Frame for 16x16 in Brick Mosaic - Display Frame for Memobrick Photo Mosaic Kits |
| seo_title | Frame 16x16" - Memobrick | Black Frame for 16x16 in Brick Mosaic \| Memobrick |
| seo_description | Size: 16x16 inch    - Memobrick | Black display frame sized for 16x16 inch Memobrick brick mosaics. Finish your photo mosaic as wall art. Sold separately from the kit. |
| product_type | (empty) | Mosaic Frame |
| category | Cameras & Optics > Photography > Photo Mounting Supplies | Home & Garden > Decor > Picture Frames (gid://shopify/TaxonomyCategory/hg-3-52) |
| mc-facebook.google_product_category | 270 | 597 |

## Priority 1: collections

### /collections/the-gift-for-everyone

| Field | Current | Proposed | Why |
|---|---|---|---|
| title | Custom Bricks Portrait | Custom Photo Brick Mosaic Kits | Collection title becomes the H1. Handle stays the same. |
| body_html | Transform your cherished photos into stunning brick art masterpieces. Our custom portraits capture every detail with precision and artistry. Available in multiple sizes from intimate 10x10" to grand 70x60" displays, these unique keepsakes make unforgettable gifts that preserve memories in a tangible, creative way. | Turn a favorite photo into a custom brick mosaic you build yourself. Upload your photo, see it as a mosaic, pick a size from 10x10 to 70x60 inches, and we send a DIY kit with the 1×1 bricks, baseplates, a printed color map and a building tool. A personalized photo gift for mom, grandparents, couples, pet lovers and the whole family. Our most popular sizes are 16x16 and 20x20 inches. Prefer help with the design? Ask for a free proof from our designers. Giving it for Christmas? Order by December 15, 2026 to receive it before Christmas. |  |
| seo_title | (empty, falls back to title) | Custom Photo Brick Mosaic Kits \| Memobrick |  |
| seo_description | Turn your favourite photos into custom brick portraits, from 10x10" to 70x60". A hand-built keepsake gift that captures the detail of the original. | Turn your photo into a custom brick mosaic kit, 10x10 to 70x60 inches. A personalized DIY gift for family, couples and pet lovers. Free proof on request. | 'Hand-built' is misleading for a kit the customer builds. |
| image_alt | Custom-Bricks-Portrait Memobrick | Custom photo brick mosaic portraits made from 1×1 bricks |  |
| membership | Includes Alphabet And Numbers, Abstract Lion (an Artist Collection design) and the gift card because they carry the tag 'Custom Bricks Portrait' | Remove the tag 'Custom Bricks Portrait' from alphabet-and-number and abstract-lion-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30; keep the gift card (sold by size) | A shopper searching for a photo mosaic should not see a $4 letter tile set. |

### /collections/best-sellers

| Field | Current | Proposed | Why |
|---|---|---|---|
| body_html | These are the Memobricks our customers order most. Every piece here has been built in hundreds of homes [em-dash] start with a size that suits your photo, and add a frame to finish it as wall art. Not sure which size to pick? Upload your photo and we'll send you a free digital proof before anything is produced, with unlimited revisions until you're happy. | These are the custom brick mosaic kits and frames our customers order most. Start with a size that suits your photo (16x16 and 20x20 inches are the favorites), then add a matching frame to finish it as wall art. Not sure which size to pick? Upload your photo in our editor and compare sizes, or ask our designers for a free proof. Giving it for Christmas? Order by December 15, 2026 to receive it before Christmas. | Removes three unconfirmed claims: 'built in hundreds of homes', 'unlimited revisions', 'before anything is produced'. Also removes an em dash. |
| seo_title | Best Sellers – Custom Brick Mosaics - Memobrick | Best Selling Custom Photo Brick Mosaics \| Memobrick |  |
| seo_description | Our most-ordered custom brick mosaics and frames. Turn a favourite photo into wall art, with a free digital proof before anything is made. | Our most-ordered custom photo brick mosaic kits and frames. Turn a favorite photo into wall art you build yourself. Free design proof on request. | 'Before anything is made' is not a confirmed claim. |

### /collections/photo-frames

| Field | Current | Proposed | Why |
|---|---|---|---|
| title | Memobrick Frame | Frames for Brick Mosaics |  |
| body_html | Elevate your memories with premium display frames designed specifically for brick portraits. Our collection ranges from compact 16x16" to expansive 50x50" sizes, perfect for showcasing your cherished moments. Each frame is crafted for durability and elegant presentation, transforming your brick art into stunning wall decor. | Black display frames sized for Memobrick brick mosaics, from 16x16 to 50x50 inches. Pick the frame that matches your mosaic size to finish it as wall art. Frames are sold separately from the kits. Building a 20x30 or 30x20? One frame fits both. Giving it for Christmas? Order by December 15, 2026 to receive it before Christmas. | 'Premium' and 'crafted for durability' are not in the product facts. |
| seo_title | (empty) | Frames for Brick Mosaics, 16x16 to 50x50 in \| Memobrick |  |
| seo_description | Premium display frames made for brick portraits, in sizes from 16x16" to 50x50". Built to last and finish your mosaic as proper wall art. | Black display frames sized for Memobrick brick mosaics, 16x16 to 50x50 inches. Finish your photo mosaic as wall art. Sold separately from the kits. |  |
| image_alt | Memobrick Frame Memobrick | Black display frames for brick mosaics |  |

### /collections/bricks

| Field | Current | Proposed | Why |
|---|---|---|---|
| title | Bricks and Accessories | 1x1 Bricks and Mosaic Accessories |  |
| body_html | Discover our vibrant collection of building bricks in every color imaginable! From classic black and white to vibrant reds and blues, our high-quality construction blocks are perfect for custom creations. Each bag contains precisely what you need for your next project. Don't miss our special board connectors and storage solutions too! | Spare 1×1 bricks in 40+ colors for your Memobrick mosaic, plus storage cases. Each bag is one color, named and numbered to match the color map in your kit, so you can top up a shade or swap colors in your design. | 'Every color imaginable' overstates the 40+ color palette. |
| seo_title | Bricks and Accessories Get it now - Memobrick | 1x1 Bricks in 40+ Colors and Accessories \| Memobrick |  |
| seo_description | Collection of building blocks 40 different of vibrant colors with an amazing quality | Spare 1×1 bricks in 40+ colors for your Memobrick brick mosaic, named and numbered to match your color map, plus storage cases. |  |
| image_alt | LEGO bricks | Bags of 1×1 bricks in many colors for brick mosaics | Removes the LEGO trademark. |
| membership | Includes 'Anger Bricked Mosaic Home Decor 20x30' (an animated movie character design) because it is tagged 'accesories' | Remove the tag 'accesories' from inside-out-anger-women-bricked-mosaic-home-decor-20x30 | Wrong collection, and the design is on the IP list for Eden's decision. |

## Priority 2: Artist Collection, written from each image

Every main image was viewed. Each design gets: a title that leads with the subject and style plus "Brick Mosaic Art Kit - WxH in DIY Wall Decor"; a description built from what the image shows (subject, style, main colors, mood, best rooms, who it suits), the size, pieces, baseplates and build time from the product data, the kit contents from the product's own description, and the Christmas date; an SEO title and meta; alt text for the main image; and tags for subject, style, color, room and recipient. Product type `Brick Mosaic Art Kit`, category Mosaic Kits. The unconfirmed lines "1-2 business days to be shipped" and "we also can build it for you" are removed.

Counts: 117 designs drafted (110 live, 7 draft), 52 flagged for IP risk (no copy written), 5 too unclear to describe, 3 non-design products skipped (gift card, alphabet tiles, Art Gift Kit).

| Handle | Status | Current title | Proposed title | What the image shows |
|---|---|---|---|---|
| bricked-mosaic-20x20-the-starry-night | draft | The starry Night Home Decor Bricked Mosaic Portrait 20x20 | Van Gogh Starry Night Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | swirling blue night sky with yellow moon and dark cypress, framed |
| 16x16-woof-bubble-dog | active | Woof Bubble Dog  Home Decor Bricked Mosaic Portrait 16x16" | Balloon Dog Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | multicolor balloon dog on white background |
| flower-bricked-mosaic-portrait-20x20 | active | FLOWER BRICKED MOSAIC PORTRAIT 20X20 | Rainbow Sunflowers Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | tightly packed sunflowers in saturated rainbow colors |
| donuts-20x20 | active | DONUTS!  Home Decor Bricked Mosaic Portrait 20x20 | Donuts Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | close-up of pink frosted donuts with sprinkles |
| bricked-mosaic-20x20-boat-blue-ocean | active | Boat Blue Ocean  Home Decor Bricked Mosaic Portrait 20x20 | Boat on Blue Ocean Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | small orange boat on swirling blue water seen from above |
| bee | active | Bee Happy  Home decoration Bricked Mosaic Portrait 10x10" | Happy Bee Brick Mosaic Art Kit - 10x10 in DIY Wall Decor | smiling cartoon bee on white background |
| jesus-christ-bricked-mosaic-home-decor-20x30 | draft | Jesus Christ Bricked Mosaic Home Decor 20x30" | Jesus Portrait Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | realistic face of Jesus looking upward, dark tones |
| pop-art-statue-of-liberty-bricked-mosaic-frame-portrait-20x30 | draft | POP ART STATUE OF LIBERTY BRICKED MOSAIC PORTRAIT 20X30 | Statue of Liberty Pop Art Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | Statue of Liberty face in bold pop-art color blocks |
| vectored-horse-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | active | Vectored Horse Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | Brown Horse Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | brown horse head in profile on lavender background |
| 20x20-deco-art | active | DECO ART  Home Decor Bricked Mosaic Portrait 20x20 | Geometric Blue Tiles Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | blue and white geometric tile pattern |
| 16x16-palms-sunset | active | PALMS SUNSET  Home Decor Bricked Mosaic Portrait 16x16" | Palm Sunset Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | black palm silhouettes against pink and purple sunset sky |
| pink-lily-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Pink Lily Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink Lily Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | large pink lily flower on green leaves |
| sunflowers-home-decoration-bricked-mosaic-portrait-16x16 | active | Sunflowers Home decoration Bricked Mosaic Portrait 16x16" | Golden Sunflowers Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | close-up of golden sunflowers with soft pastel background |
| blue-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Blue Flower Home decoration Bricked Mosaic Portrait 16x16" | Blue Flower Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single large blue flower with yellow center on navy background |
| sunflower-with-bee-home-decoration-bricked-mosaic-portrait-16x16 | active | Sunflower with Bee Home decoration Bricked Mosaic Portrait 16x16" | Sunflowers and Bees Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | two sunflowers with small bees flying on cream background |
| sunflower-bricked-mosaic-home-decor-20x30 | active | Sunflower Bricked Mosaic Home Decor 20x30" | Sunflower Stem Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | tall sunflowers with green leaves on cream background, vertical |
| purple-sky-bricked-mosaic-home-decor-20x30 | active | Purple Sky  Bricked Mosaic Home Decor 20x30" | Purple Sky Sunset Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | vivid purple and pink sunset clouds over a horizon |
| abstract-tree-bricked-mosaic-home-decor-20x30 | active | Abstract Tree Bricked Mosaic Home Decor 20x30" | Swirling Tree Abstract Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | colorful swirling sky and tree in bold red, yellow and blue, Van Gogh-like brushwork |
| cat-abstract-bricked-mosaic-home-decor-20x30 | active | Cat Abstract Bricked Mosaic Home Decor 20x30" | Neon Cat Face Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | close-up of a cat face in neon blue and purple with green eye |
| blue-cat-home-decor-bricked-mosaic-portrait-16x16 | active | BLUE CAT HOME DECOR BRICKED MOSAIC PORTRAIT 16X16 | Cool Cat in Sunglasses Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | white cartoon cat with orange sunglasses sipping a drink on turquoise background |
| abstract-cat-bricked-mosaic-home-decor-20x30 | active | Abstract Cat Bricked Mosaic Home Decor 20x30" | Rainbow Pop Art Cat Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | cat face made of colorful geometric pop-art shapes |
| starry-night-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | draft | Starry Night Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | Van Gogh Starry Night Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | swirling blue night sky with stars, wide landscape format |
| bricked-mosaic-40x30-lion | active | Lion King of the Jungle Art Piece Home Wall Decor Bricked Mosaic Portrait 40x30" | Rainbow Pop Art Tiger Brick Mosaic Art Kit - 40x30 in DIY Wall Decor | colorful pop-art tiger face (current title says lion, image shows a tiger), wide format |
| bricked-mosaic-30x30-colorful-skull | active | Colorful Skull Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | Neon Skeleton Brick Mosaic Art Kit - 30x30 in DIY Wall Decor | skeleton drawn in neon rainbow lines on black |
| bricked-mosaic-16x16-lips | active | Love Kiss Art -  Home Decor Art Piece Bricked Mosaic 16x16" | Cherry Lips Pop Art Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | red lips biting a cherry on white background |
| bricked-mosaic-20x20-mona-l | draft | MONA-L  Home Decor Bricked Mosaic Portrait 20x20 | Mona Lisa Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | Mona Lisa portrait in warm browns, framed |
| eye-on-you | active | Eye on you Home decoration Bricked Mosaic Portrait 10x10" | Evil Eye Brick Mosaic Art Kit - 10x10 in DIY Wall Decor | blue concentric evil eye on white background |
| smiling-rooster-home-decoration-bricked-mosaic-portrait-16x16 | active | Smiling Rooster  Home decoration Bricked Mosaic Portrait 16x16" | Grinning Rooster Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon rooster with big toothy grin on red background |
| shocked-rabbit-home-decoration-bricked-mosaic-portrait-16x16 | active | Shocked Rabbit Home decoration Bricked Mosaic Portrait 16x16" | Shocked Rabbit Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon rabbit with wide eyes and open mouth on red background |
| shocked-frog-home-decoration-bricked-mosaic-portrait-16x16 | active | Shocked Frog Home decoration Bricked Mosaic Portrait 16x16" | Shocked Frog Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon green frog with bulging eyes and open mouth on red background |
| shocked-crocodile-home-decoration-bricked-mosaic-portrait-16x16 | active | Shocked Crocodile Home decoration Bricked Mosaic Portrait 16x16" | Shocked Crocodile Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon green crocodile with big eyes on yellow background |
| angry-black-cat-home-decoration-bricked-mosaic-portrait-16x16 | active | Angry Black Cat Home decoration Bricked Mosaic Portrait 16x16" | Angry Black Cat Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon black cat with a sly grin on red background |
| woman-with-yellow-glasses-home-decoration-bricked-mosaic-portrait-16x16 | active | Woman with Yellow Glasses Home decoration Bricked Mosaic Portrait 16x16" | Woman with Yellow Glasses Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | woman in a black hat and round yellow glasses on golden background |
| wizard-frog-home-decoration-bricked-mosaic-portrait-16x16 | active | Wizard Frog Home decoration Bricked Mosaic Portrait 16x16" | Wizard Frog Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | black outline drawing of a frog in a wizard hat with a staff |
| cool-cat-home-decoration-bricked-mosaic-portrait-16x16 | active | Cool Cat Home decoration Bricked Mosaic Portrait 16x16" | Cool Cat Line Art Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | black outline cat wearing sunglasses on white |
| parrot-abstract-selfie-home-decoration-bricked-mosaic-portrait-16x16 | active | Parrot Abstract Selfie Home decoration Bricked Mosaic Portrait 16x16" | Red Parrot Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | red parrot head with yellow beak on green and navy |
| funny-cat-selfie-home-decoration-bricked-mosaic-portrait-16x16 | active | Funny Cat Selfie Home decoration Bricked Mosaic Portrait 16x16" | Ginger Cat Close-Up Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | close-up of a ginger and white cat face |
| cat-selfie-home-decoration-bricked-mosaic-portrait-16x16-1 | active | Cat Selfie Home decoration Bricked Mosaic Portrait 16x16" | Ginger Cat in Glasses Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | close-up of a ginger tabby cat wearing thin round glasses |
| pink-lotus-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Pink Lotus Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink Lotus Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | open pink and white lotus flower on dark background |
| freesia-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Freesia Flower Home decoration Bricked Mosaic Portrait 16x16" | Freesia Blossoms Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | delicate freesia buds and blossoms in pastels on grey |
| blue-flax-flower-home-decoration-bricked-mosaic-portrait-16x16-1 | active | Blue Flax Flower Home decoration Bricked Mosaic Portrait 16x16" | Blue Flax Flowers Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | several blue flax blossoms on grey background |
| blue-rose-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Blue Rose Flower Home decoration Bricked Mosaic Portrait 16x16" | Blue Roses Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cluster of blue roses with white flowers |
| blue-pink-radiant-blossom-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Blue Pink Radiant Blossom Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink and Blue Blossom Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | large pink and lilac blossom with orange center on black |
| blue-peony-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Blue Peony Flower Home decoration Bricked Mosaic Portrait 16x16" | Blue Peony Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | full blue peony with yellow center on black |
| blue-flax-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Blue Flax Flower Home decoration Bricked Mosaic Portrait 16x16" | Blue Flax Flowers on Grey Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | blue flax flowers and buds on grey, different arrangement from the other flax design |
| rose-home-decoration-bricked-mosaic-portrait-16x16-1 | active | Rose Home decoration Bricked Mosaic Portrait 16x16" | Red Tulip Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single red and orange tulip on black (current title says Rose, image shows a tulip) |
| tulips-home-decoration-bricked-mosaic-portrait-16x16 | active | Tulips Home decoration Bricked Mosaic Portrait 16x16" | Orange Tulips Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | group of orange and red tulips on black |
| rose-mallow-home-decoration-bricked-mosaic-portrait-16x16-1 | active | Tiger Lily Home decoration Bricked Mosaic Portrait 16x16" | Tiger Lilies Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | two orange tiger lilies on black with white side panels |
| rose-mallow-home-decoration-bricked-mosaic-portrait-16x16 | active | Rose Mallow Home decoration Bricked Mosaic Portrait 16x16" | Rose Mallow Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | large magenta and white hibiscus-like rose mallow on black |
| colorado-flowers-home-decoration-bricked-mosaic-portrait-16x16 | active | Colorado Flowers Home decoration Bricked Mosaic Portrait 16x16" | Columbine Wildflower Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | white and magenta columbine flower among green leaves |
| rose-home-decoration-bricked-mosaic-portrait-16x16 | active | Rose Home decoration Bricked Mosaic Portrait 16x16" | Red Rose Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single red rose on white background |
| red-tulips-home-decoration-bricked-mosaic-portrait-16x16 | active | Red Tulips Home decoration Bricked Mosaic Portrait 16x16" | Red Tulip on Sage Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single red tulip on sage green background |
| peonies-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Peonies Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink Peony Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | full pink peony bloom with green leaves |
| asiatic-lily-home-decoration-bricked-mosaic-portrait-16x16 | active | Asiatic Lily Home decoration Bricked Mosaic Portrait 16x16" | Yellow Lily Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | yellow Asiatic lily and bud on black |
| tulips-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Tulips Flower Home decoration Bricked Mosaic Portrait 16x16" | Purple Tulip Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single purple tulip with green leaves on white |
| sunflower-home-decoration-bricked-mosaic-portrait-16x16 | active | Sunflower Home decoration Bricked Mosaic Portrait 16x16" | Sunflower on Black Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single sunflower with orange center on black |
| rose-mallow-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Rose Mallow Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink Hibiscus Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | bright pink hibiscus-like rose mallow on black |
| red-daisy-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Red Daisy Flower Home decoration Bricked Mosaic Portrait 16x16" | Red Gerbera Daisy Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | single red gerbera daisy on light blue background |
| pink-frangipani-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Pink Frangipani Flower Home decoration Bricked Mosaic Portrait 16x16" | Pink Frangipani Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cluster of pink and white frangipani flowers on dark leaves |
| frangipani-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Frangipani Flower Home decoration Bricked Mosaic Portrait 16x16" | White Frangipani Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | white and yellow frangipani flowers among green leaves |
| lavender-flower-home-decoration-bricked-mosaic-portrait-16x16 | active | Lavender Flower Home decoration Bricked Mosaic Portrait 16x16" | Lavender Blossoms Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | lilac purple blossoms on white background |
| doggy-eyes-home-decoration-bricked-mosaic-portrait-16x16 | active | Doggy Eyes Home decoration Bricked Mosaic Portrait 16x16" | Puppy Eyes Close-Up Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | close-up of a black and white dog's nose and eyes |
| sleeping-cat-home-decor-bricked-mosaic-portrait-20x20-1 | active | Cat and Butterfly Home Decor Bricked Mosaic Portrait 20x20 | Cat and Butterfly Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | black and white cat looking at a butterfly on its nose, grey background |
| fire-skull-bricked-mosaic-home-decor-20x30 | active | Fire Skull Bricked Mosaic Home Decor 20x30" | Fire Skull Figure Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | dark figure with a glowing red cracked skull face |
| chess-pieces-bricked-mosaic-home-decor-20x30 | active | Chess Pieces Bricked Mosaic Home Decor 20x30" | Chess Pieces Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | colorful chess king and queen on a black and white board |
| flower-on-skull-bricked-mosaic-home-decor-20x30 | active | Flower on Skull Bricked Mosaic Home Decor 20x30" | Skull with Blue Flower Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | grey skull with a blue flower growing from it on yellow |
| butterfly-on-skull-bricked-mosaic-home-decor-20x30 | active | Butterfly on Skull Bricked Mosaic Home Decor 20x30" | Butterfly on Skull Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | white butterfly resting on a small skull, black background |
| lollipop-kiss-bricked-mosaic-home-decor-20x30 | active | Lollipop Kiss Bricked Mosaic Home Decor 20x30" | Lollipop Kiss Pop Art Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | lips with a pink lollipop and orange sunglasses in pop colors |
| jesus-christ-bricked-mosaic-home-decor-20x30-2 | active | Lion and Lamb Bricked Mosaic Home Decor 20x30" | Lion and Lamb Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | lion with a white lamb resting beside it, dark background |
| jesus-christ-bricked-mosaic-home-decor-20x30-1 | draft | Jesus Christ Bricked Mosaic Home Decor 20x30" | Jesus on Red Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | Jesus looking upward against a red background |
| eye-abstract-bricked-mosaic-home-decor-20x30 | active | Eye Abstract Bricked Mosaic Home Decor 20x30" | Rainbow Eye Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | close-up of a human eye with a rainbow iris and patterned surround |
| cool-smoking-dog-bricked-mosaic-home-decor-20x30 | active | Cool Smoking Dog Bricked Mosaic Home Decor 20x30" | Cool Dog in Sunglasses Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | dog in red sunglasses with a cigar and smoke, red and navy background (shows a cigar) |
| shocked-penguin-home-decoration-bricked-mosaic-portrait-16x16 | active | Shocked Penguin Home decoration Bricked Mosaic Portrait 16x16" | Shocked Penguin Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon penguin with wide eyes and open beak on red background |
| abstract-woman-bricked-mosaic-home-decor-20x30-1 | active | Abstract Woman Bricked Mosaic Home Decor 20x30" | Abstract Pop Art Woman Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | woman's face in bold orange and blue pop-art color blocks (not a recognizable person) |
| swag-statue-bricked-mosaic-home-decor-20x30 | active | Swag Statue Bricked Mosaic Home Decor 20x30" | Classical Bust with Pink Sunglasses Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | grey classical statue head with pink sunglasses blowing a bubblegum bubble on black |
| swag-cat-bricked-mosaic-home-decor-20x30 | active | Swag Cat Bricked Mosaic Home Decor 20x30" | Black Cat on Yellow Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | black cat with yellow eyes on bright yellow background |
| swag-capybara-home-decor-bricked-mosaic-portrait-20x20 | active | Swag Capybara  Home Decor Bricked Mosaic Portrait 20x20 | Capybara in Sunglasses Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | capybara wearing red sunglasses on a blue burst background |
| cat-abstract-bricked-mosaic-home-decor-20x30-1 | active | Cat Abstract Bricked Mosaic Home Decor 20x30" | White Cat with Blue Swirl Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | white cat with blue eyes and a flowing black and blue tail on cream |
| beasties-furever-bricked-mosaic-home-decor-20x30 | active | Beasties Furever Bricked Mosaic Home Decor 20x30" | Cartoon Zoo Friends Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | cartoon giraffe, teddy bear, frog and mouse on cream |
| abstract-woman-with-bird-bricked-mosaic-home-decor-20x30 | active | Abstract Woman with Bird Bricked Mosaic Home Decor 20x30" | Woman and Dove Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | woman's profile in black and white with a blue dove on blue background |
| abstract-woman-bricked-mosaic-home-decor-20x30 | active | Abstract Woman Bricked Mosaic Home Decor 20x30" | Colorful Abstract Woman Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | abstract woman made of bright cubist color blocks |
| abstract-man-home-decoration-bricked-mosaic-portrait-16x16 | active | Abstract Man Home decoration Bricked Mosaic Portrait 16x16" | Blue Abstract Profile Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | abstract face profile in navy and white on turquoise |
| abstract-face-bricked-mosaic-home-decor-20x30-1 | active | Abstract Face Bricked Mosaic Home Decor 20x30" | Pop Art Face in Red and Gold Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | stylized face in red and gold color blocks on white |
| abstract-face-bricked-mosaic-home-decor-20x30 | active | Abstract Face Bricked Mosaic Home Decor 20x30" | Cubist Face Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | cubist-style face with one large eye in blue, red and yellow |
| cute-turtle-home-decoration-bricked-mosaic-portrait-16x16-1 | active | Cute Turtle Home decoration Bricked Mosaic Portrait 16x16" | Cute Turtle Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cute big-eyed cartoon turtle on cream |
| cute-turtle-home-decoration-bricked-mosaic-portrait-16x16 | active | Cute Turtle Home decoration Bricked Mosaic Portrait 16x16" | Swimming Sea Turtle Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | cartoon sea turtle swimming with bubbles on light aqua |
| cute-piglet-home-decoration-bricked-mosaic-portrait-16x16 | active | Cute Piglet Home decoration Bricked Mosaic Portrait 16x16" | Cute Piglet in Bath Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | smiling cartoon piglet in a tub with bubbles |
| cute-grumpy-cat-home-decoration-bricked-mosaic-portrait-16x16 | active | Cute Grumpy Cat Home decoration Bricked Mosaic Portrait 16x16" | Cute Tabby Kitten Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | big-eyed orange tabby cartoon kitten on cream |
| cute-caterpillar-home-decoration-bricked-mosaic-portrait-16x16 | active | Cute Caterpillar Home decoration Bricked Mosaic Portrait 16x16" | Happy Caterpillar Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | smiling green caterpillar in a red cap walking through a sunny field |
| cute-bee-home-decoration-bricked-mosaic-portrait-16x16 | active | Cute Bee Home decoration Bricked Mosaic Portrait 16x16" | Cute Bee on Flower Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | smiling cartoon bee above red and orange flowers on cream |
| abstract-phoenix-bricked-mosaic-home-decor-20x30 | active | Abstract Phoenix  Bricked Mosaic Home Decor 20x30" | Rainbow Phoenix Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | phoenix bird in swirling fiery orange and rainbow colors on dark blue |
| abstract-parrot-bricked-mosaic-home-decor-20x30 | active | Abstract Parrot Bricked Mosaic Home Decor 20x30" | Rainbow Macaw Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | macaw parrot in vivid red, orange and blue brush-style colors |
| mandala-abstract-bricked-mosaic-home-decor-20x30 | active | Mandala Abstract Bricked Mosaic Home Decor 20x30" | Lotus Mandala Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | symmetrical lotus mandala in turquoise and orange |
| sunflower-girl-bricked-mosaic-home-decor-20x30 | active | Sunflower Girl Bricked Mosaic Home Decor 20x30" | Sunflower Girl Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | woman with a sunflower covering one eye, grey and yellow street-art style (not a recognizable person) |
| kid-abstract-bricked-mosaic-home-decor-20x30 | active | Kid Abstract Bricked Mosaic Home Decor 20x30" | Kid in Glasses Street Art Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | child in big glasses looking up, painted street-art style on cream (not a recognizable person) |
| evil-eye-mandala-bricked-mosaic-home-decor-20x30 | active | Evil Eye Mandala Bricked Mosaic Home Decor 20x30" | Evil Eye Mandala Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | blue evil eye at the center of an ornate blue mandala |
| elysians-bricked-mosaic-home-decor-20x30 | active | Elysians Bricked Mosaic Home Decor 20x30" | Pop Art Alien Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | blue alien head with pink eyes in neon pop-art colors |
| cute-ghost-decor-art-piece-bricked-mosaic-16x16 | active | Cute Ghost Decor Art Piece Bricked Mosaic 16x16" | Cute Ghost Line Art Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | black outline cartoon ghost with a monocle on white |
| abstract-women-bricked-mosaic-home-decor-20x30 | active | Abstract Women Bricked Mosaic Home Decor 20x30" | Psychedelic Woman Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | woman's face made of swirling psychedelic color lines (not a recognizable person) |
| abstract-men-bricked-mosaic-home-decor-20x30 | active | Abstract Men Bricked Mosaic Home Decor 20x30" | Blue Pop Art Man Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | man's face in shades of blue on yellow, pop-art blocks (not a recognizable person) |
| tiger-bricked-mosaic-portrait-20x30 | active | TIGER BRICKED MOSAIC PORTRAIT 20X30 | Bengal Tiger Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | realistic tiger face on golden yellow background |
| mozart-pop-art-bricked-mosaic-portrait-20x20 | draft | MOZART POP ART BRICKED MOSAIC PORTRAIT 20X20 | Mozart Pop Art Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | Mozart portrait with turquoise hair in pop-art colors |
| yelow-cat-home-decor-bricked-mosaic-portrait-20x30 | active | Yelow Cat HOME DECOR BRICKED MOSAIC PORTRAIT 20X30 | Yellow Cat in Sunglasses Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | white cartoon cat with yellow round sunglasses and blue bandana on yellow |
| cat-art-bricked-mosaic-home-decor-20x30 | active | Cat Art Bricked Mosaic Home Decor 20x30" | Watercolor Kitten Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | kitten looking up in soft watercolor splashes on white |
| cute-cartoon-cat-home-decor-bricked-mosaic-portrait-20x20 | active | Cute Cartoon Cat  Home Decor Bricked Mosaic Portrait 20x20 | Cute Calico Kitten Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | cartoon calico kitten sitting on a peach background |
| woman-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | active | Woman Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | Black and White Woman Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | woman looking up with hand at chin in high-contrast black and white (not a recognizable person) |
| abstract-lion-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | active | Abstract Lion Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | Rainbow Pop Art Lion Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | lion face in bright rainbow pop-art color strokes |
| silhouette-horse-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | active | Silhouette Horse Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | Wild Horse at Sunset Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | black silhouette of a rearing horse against an orange and red sunset |
| bricked-mosaic-20x40-face | active | Beauty Femele Face Home Decor Bricked Mosaic Portrait 20x40'' | Painted Woman's Face Brick Mosaic Art Kit - 20x40 in DIY Wall Decor | tall close-up of a woman's face in loose painterly color (not a recognizable person), narrow vertical format |
| bricked-mosaic-portrait-10x10-yin-yan | active | Yin and Yang Balance Tao Energy Home decoration Bricked Mosaic Portrait 10x10" | Yin and Yang Brick Mosaic Art Kit - 10x10 in DIY Wall Decor | black and white yin yang symbol |
| bricked-mosaic-16x16-beauty | active | Beauty Cherry Lips Home Decor Art Piece Bricked Mosaic 16x16" | Pink Lips and Nails Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | close-up of pink lips with fingers and pink nails on magenta |
| 30x30-colorful-zebra-art | active | Colorful Zebra Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | Rainbow Horse on Black Brick Mosaic Art Kit - 30x30 in DIY Wall Decor | horse head with rainbow-striped mane on black (current title says zebra; image shows a horse) |
| 30x30-roller-skate-art | active | Roller skate Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | Retro Roller Skates Brick Mosaic Art Kit - 30x30 in DIY Wall Decor | pair of grey roller skates with striped socks on pink background |
| 20x30-colorful-eye-art | active | Colorful eye Art  Piece Home Wall Decor Bricked Mosaic Portrait 20x30 | Watercolor Eye Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | blue eye with colorful lashes and paint drips on cream |
| 20x20-burger-art | active | Burger Art  Home Decor Bricked Mosaic Portrait 20x20 | Burger Pop Art Brick Mosaic Art Kit - 20x20 in DIY Wall Decor | cheeseburger on a green and yellow sunburst background |
| sunset-20x20 | active | Sunset Sunrise Paradise Home Decor Art Piece Bricked Mosaic 16x16" | Palm Sunset Paradise Brick Mosaic Art Kit - 16x16 in DIY Wall Decor | black palm tree silhouettes on a pink and blue sunset sky |
| 20x30-budha | active | Buddha Wall Art - Symbolic Beauty and Inspiration Bricked Mosaic Home Decor 20x30" | Buddha Pop Art Brick Mosaic Art Kit - 20x30 in DIY Wall Decor | Buddha face in colorful pop-art color blocks |

### IP risk, owner decision (no name used anywhere in the drafts)

These designs show a real celebrity, a brand logo or a copyrighted character. Naming them could get listings disapproved or cause legal trouble, and even generic titles would still sell the same image. Options for each: keep unpublished (most already are), unpublish, or keep live but exclude from the Google feed. Only two are live today.

| Handle | Status | Current title | Why flagged |
|---|---|---|---|
| heatblast-ben-10-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | active | Heatblast Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | animated TV superhero character (cartoon series) |
| lady-bricked-mosaic-home-decor-20x30 | active | Lady Bricked Mosaic Home Decor 20x30" | blonde pin-up in red sunglasses styled after a famous actress (possible celebrity likeness) |
| 20x30-charles-chaplin | draft | CHAPLIN Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | pop-art portrait of a famous silent film actor (real person) |
| 20x30-marilyn | draft | Pop Art Hollywood Icon Marilyn Monroe Home Decor Bricked Mosaic Portrait 20x30" | pop-art portrait of a famous actress (real celebrity) |
| 20x30-michael-jackson | draft | King Of Pop Michael Jackson Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | pop-art portrait of a famous singer (real celebrity) |
| archie-bricked-mosaic-portrait-20x20 | draft | ARCHIE BRICKED MOSAIC PORTRAIT 20X20 | comic book character (comics publisher) |
| bricked-mosaic-20x20-felix-the-cat | draft | Felix The Cat  Home Decor Bricked Mosaic Portrait 20x20 | classic cartoon cat character |
| bricked-mosaic-20x30-casper-the-friendly-ghost | draft | Casper The Friendly Ghost Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | classic cartoon ghost character |
| bricked-mosaic-20x30-koko-the-clown | draft | Koko the Clown Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | classic cartoon clown character (black and white) |
| bricked-mosaic-30x30-courage-the-cowardly-dog | draft | Courage the cowardly Dog Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | animated TV character (cartoon series) |
| bricked-mosaic-30x30-frankenstein | draft | Frankenstein Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | classic movie monster in studio-specific makeup (trademarked look) |
| bricked-mosaic-30x30-minion | draft | Minion Art Piece Home Wall Decor Bricked Mosaic Portrait 30x30" | animated movie character (major studio) in a famous painting pose |
| cat-dog-bricked-mosaic-portrait-20x20 | draft | CAT DOG BRICKED MOSAIC PORTRAIT 20X20 | animated TV characters (cartoon series) |
| chaplin-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | draft | Chaplin Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | pop-art portrait of a famous silent film actor (real person) |
| homer-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | draft | Homer Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | animated TV character (major studio) |
| hulk-bricked-mosaic-home-decor-20x30 | draft | Hulk Bricked Mosaic Home Decor 20x30" | comic book superhero (major comics publisher) |
| inside-out-anger-women-bricked-mosaic-home-decor-20x30 | draft | Anger Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-anxiety-bricked-mosaic-home-decor-20x30 | draft | Anxiety Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-anxiety-decor-art-piece-bricked-mosaic-16x16 | draft | Anxiety Decor Art Piece Bricked Mosaic 16x16" | animated movie character (major studio) |
| inside-out-disgust-women-bricked-mosaic-home-decor-20x30 | draft | Disgust Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-disgust-women-bricked-mosaic-home-decor-20x30-1 | draft | Embarrassment Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-ennui-decor-art-piece-bricked-mosaic-16x16 | draft | Ennui Decor Art Piece Bricked Mosaic 16x16" | animated movie character (major studio) |
| inside-out-ennui-women-bricked-mosaic-home-decor-20x30 | draft | Ennui Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-envy-bricked-mosaic-home-decor-20x30 | draft | Envy Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-fear-bricked-mosaic-home-decor-20x30 | draft | Fear Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-joy-bricked-mosaic-home-decor-20x30 | draft | Joy Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| inside-out-joy-decor-art-piece-bricked-mosaic-16x16 | draft | Joy Decor Art Piece Bricked Mosaic 16x16" | animated movie character (major studio) |
| inside-out-sadness-bricked-mosaic-home-decor-20x30 | draft | Sadness Bricked Mosaic Home Decor 20x30" | animated movie character (major studio) |
| jake-the-dog-home-decor-bricked-mosaic-portrait-20x20 | draft | Jake the Dog  Home Decor Bricked Mosaic Portrait 20x20 | animated TV character (cartoon series) |
| john-wick-bricked-mosaic-home-decor-20x30 | draft | John Wick Bricked Mosaic Home Decor 20x30" | portrait of a famous actor in a well-known movie role (real celebrity) |
| johnny-bravo-bricked-mosaic-portrait-20x30 | draft | JOHNNY BRAVO BRICKED MOSAIC PORTRAIT 20X30 | classic cartoon network character |
| lucky-cat-labubu-home-decoration-bricked-mosaic-portrait-10x10 | draft | Lucky Cat Labubu Home decoration Bricked Mosaic Portrait 10x10" | branded collectible toy character in a lucky cat costume |
| michael-jackson-mosaic-portrait-20x20 | draft | MICHAEL JACKSON MOSAIC PORTRAIT 20X30 | pop-art portrait of a famous singer (real celebrity) |
| mosaic-16x16-rock-n-roll-rolling | draft | Rock n' roll rolling Home Decor Bricked Mosaic Portrait 16x16" | lips and tongue logo of a famous rock band |
| mr-krabs-mosaic-portrait-20x20 | draft | MR. KRABS MOSAIC PORTRAIT 20X20 | animated TV character (major studio) |
| mr-monapobrick-mondays-release | draft | Mr Monopobrick Board game Home Decor Art Piece Bricked Mosaic 16x16" | board game mascot (toy company trademark) |
| peaking-labubu-home-decoration-bricked-mosaic-portrait-16x16 | draft | Peaking Labubu Home decoration Bricked Mosaic Portrait 16x16" | branded collectible toy character (peeking, black and white) |
| pepe-pop-art-bricked-mosaic-portrait-20x20 | draft | PEPE POP ART BRICKED MOSAIC PORTRAIT 20X20 | copyrighted internet meme frog character |
| peter-griffin-home-art-decor-art-piece-bricked-portrait-16x16 | draft | Peter Griffin Home Art Decor Art Piece Bricked Portrait 16x16" | animated TV character (major studio) |
| pop-art-freddie-mercury-bricked-mosaic-portrait-20x30 | draft | POP ART FREDDIE MERCURY BRICKED MOSAIC PORTRAIT 20X30 | pop-art portrait of a famous rock singer (real celebrity) |
| silhouette-madonna-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30 | draft | Silhouette Madonna Art Piece Home Wall Decor Bricked Mosaic Portrait 20x30" | black and white silhouette styled after a famous actress (possible celebrity likeness) |
| snow-white-bricked-mosaic-home-decor-20x30 | draft | Snow White Bricked Mosaic Home Decor 20x30" | animated movie princess (major studio) in street-art style with a famous mouse bow |
| spongebob-home-decor-bricked-mosaic-portrait-20x20 | draft | Spongebob  Home Decor Bricked Mosaic Portrait 20x20 | animated TV character (major studio) |
| stewie-griffin-home-art-decor-art-piece-bricked-mosaic-portrait-16x16 | draft | Stewie Griffin Home Art Decor Art Piece Bricked Mosaic Portrait 16x16" | animated TV character (major studio) |
| stitch-labubu-home-decoration-bricked-mosaic-portrait-10x10 | draft | Stitch Labubu Home decoration Bricked Mosaic Portrait 10x10" | branded collectible toy character in an animated movie character costume |
| stitch-labubu-home-decoration-bricked-mosaic-portrait-16x16 | draft | Stitch Labubu Home decoration Bricked Mosaic Portrait 16x16" | branded collectible toy character in an animated movie character costume |
| supra-art-bricked-mosaic-home-decor-20x30 | draft | Supra Art Bricked Mosaic Home Decor 20x30" | car model name and badge lettering (car brand trademark) |
| swag-einsteinn-bricked-mosaic-home-decor-20x30 | draft | Swag Einsteinn Bricked Mosaic Home Decor 20x30" | portrait of a famous real scientist (estate-licensed likeness) with brand lettering |
| taylor-swift-abstract-art-home-decor-bricked-mosaic-portrait-20x20 | draft | Taylor Swift Abstract Art Home Decor Bricked Mosaic Portrait 20x20 | pop-art portrait of a famous singer (real celebrity) |
| the-grim-reaper-the-grim-reaper | draft | THE GRIM REAPER  DECOR BRICKED MOSAIC PORTRAIT 20X20 | animated TV character (grim reaper from a cartoon series) |
| toothless-labubu-home-decoration-bricked-mosaic-portrait-10x10 | draft | Toothless Labubu Home decoration Bricked Mosaic Portrait 10x10" | branded collectible toy character combined with an animated dragon character |
| wolverine-bricked-mosaic-home-decor-20x30 | draft | Wolverine Bricked Mosaic Home Decor 20x30" | comic book superhero mask (major comics publisher) |

Also in this group (custom kits, not art): gallery images on `custom-bricked-mosaic-10x10`, `1-big-board` and `2-2-boards` appear to show recognizable actors, and two `3-3-boards` images show anime characters. Suggest replacing them with customer or AI lifestyle images of non-famous people.

### Too unclear to describe (Eden to confirm the subject or upload a clearer main image)

| Handle | Current title | What I could see |
|---|---|---|
| cat-selfie-home-decoration-bricked-mosaic-portrait-16x16 | Cat Selfie Home decoration Bricked Mosaic Portrait 16x16" | blurry close-up, seems to be a cat wearing round orange sunglasses; too unclear to describe with confidence |
| candle-light-selfie-home-decoration-bricked-mosaic-portrait-16x16 | Candle Light Home decoration Bricked Mosaic Portrait 16x16" | warm flame-like shapes on black; too dark to confirm the subject with confidence |
| hope-art-home-decor-bricked-mosaic-portrait-20x20 | Hope Art Home Decor Bricked Mosaic Portrait 20x20 | fire-like yellow and red shapes on black; subject is unclear (possibly a figure in flames) |
| red-kiss-home-decor-bricked-mosaic-portrait-20x20 | Red Kiss  Home Decor Bricked Mosaic Portrait 20x20 | red shapes on black; too abstract to confirm a kiss or figures with confidence |
| cute-curios-cat-home-decoration-bricked-mosaic-portrait-16x16 | Cute Curios Cat Home decoration Bricked Mosaic Portrait 16x16" | round brown and white cartoon animal; it looks more like a hamster than a cat, confirm the subject |

### Public-domain designs that are drafts today

`bricked-mosaic-20x20-the-starry-night`, `starry-night-art-piece-home-wall-decor-bricked-mosaic-portrait-20x30` and `bricked-mosaic-20x20-mona-l` are in DRAFT. These paintings are public domain, the names are real search terms, and last holiday these pages drew search buyers. Their drafts are in the CSV; republishing them is proposed separately so Eden can say yes or no on its own.

## Rules for the long tail (everything not hand-checked above)

Applied by the executor only after approval, product by product, with a backup first.

1. **Title pattern.** Custom photo kits: `Custom Photo Brick Mosaic Portrait {W}x{H} in [Landscape|Portrait] - Personalized DIY Photo Gift Kit`. Pre-made designs: `{Subject and style} Brick Mosaic Art Kit - {W}x{H} in DIY Wall Decor` (subject from the image, never a celebrity, brand or character name). Frames: `Black Frame for {W}x{H} in Brick Mosaic - Display Frame for Memobrick Photo Mosaic Kits`. Brick bags: `Bag of 1x1 Bricks - {Color} {Number}` (fix spacing and case only). Most important words in the first 70 characters, total under 150.
2. **SEO title** `{short product name} | Memobrick`, 60 characters or less. **Meta description** 155 or less: what it is, size, pieces, who it is for, one true hook (free proof on request, or the Dec 15 Christmas date). Never "LEGO", never an em dash.
3. **Description** in short paragraphs plus a bullet list of specs. Numbers only from the product's own Shopify data; leave a number out when it conflicts or is missing and list it for Eden. Remove: "1-2 business days to be shipped", "we also can build it for you", "LEGO"/"Lego-style", "hand-built", "premium", "unlimited revisions", "before anything is made". Add the Christmas line until Dec 15; the executor removes it on Dec 16 (one bulk edit).
4. **Product type** from one list: `Custom Photo Mosaic Kit`, `Brick Mosaic Art Kit`, `Mosaic Frame`, `Brick Bag`, `Brick Accessories`, `Gift Card`. **Category:** kits = Mosaic Kits (ae-2-1-1-6), frames = Picture Frames (hg-3-52), brick bags = Arts & Crafts > Art & Crafting Materials (executor looks up the ID), gift card unchanged. **Meta catalog category:** one value per type (kits 16, frames 597), confirmed in Google's taxonomy list before writing.
5. **Tags**, lowercase with hyphens, from fixed groups: type (`custom-photo-mosaic`, `premade-design-kit`, `frame`, `brick-bag`), size (`size-20x20`), orientation (`square`, `landscape`, `portrait`), occasion (`christmas-gift`, `birthday-gift`, `anniversary-gift`, `mothers-day-gift`, `valentines-gift`, `housewarming-gift`), recipient (`gift-for-mom`, `gift-for-dad`, `gift-for-grandparents`, `couple-gift`, `family-gift`, `pet-gift`, `kids-gift`, `cat-lover-gift`, `dog-lover-gift`), room (`living-room`, `kids-room`, `nursery`, `office`, `bedroom`, `kitchen`), style and color for designs. **Never remove a tag a smart collection uses:** `Custom Bricks Portrait`, `FRAME`, `art collection`, `pre-made design`, `Accesories` (bricks collection rule, capital A; products carry `accesories`, Shopify tag matching is case-insensitive). Remove junk: `with`, `home`, `brick`, `bricks`, `build`, `mosaic`, `memobrick`, `decor`, `inside`, `bricked`, `pre-madedesign`, single-word name fragments.
6. **Alt text** says what the image shows, with size: `{W}x{H} inch brick mosaic of {subject} next to the original photo`, `... on a living room wall`, `Size guide for the {W}x{H} inch brick mosaic kit`. No `<br>`, no em dash, no names of real people.
7. **Feed fields:** keep `condition: new`; leave age group as is unless a product is clearly for kids; do not change handles (URLs and ad history stay).
The CSV already holds these rules applied to the 40 brick bags, the storage case, the other 7 frames, the Artist Collection page and the alphabet tiles (priority P2-rule).

8. **IP check before any copy:** if the image shows a real celebrity, a logo or a copyrighted character, write nothing and add it to the owner-decision list.

## What this should do for sales

Search is the channel that converts best (21 purchases from 703 search sessions in 30 days) and the one that fell most (-74%). Better titles and categories raise Shopping ad rank and organic relevance for the exact phrases buyers use, without new spend. The 20x20, 20x30, 16x16 and 30x20 kits carried 112 of the last 90 days' orders, so they go first. Expected: more Shopping impressions within one to two weeks of the feed refresh, and a better click rate on product results. This is a ranking input, not a guarantee; we will compare Search Console and Shopify search sessions two weeks after the change.

## Needs from Eden

- Approve or reject the proposals in the seo-technical report for 2026-10-20.
- Baseplate and piece counts for 60x20, and baseplate counts for 60x30 and 60x60.
- Whether the spare brick bags hold 1x1 bricks (the new bag titles say so).
- Whether the kits are compatible with other brick brands (only then can a compatibility line be added).
- Frame material and whether frames include glass or hanging hardware.
- Decisions on the IP list and the custom-kit gallery images, and the subject of the 5 unclear designs.
- Why Starry Night and Mona Lisa are drafts, and whether they can be sold again.
- Merchant Center: an export of Products > Needs attention (item issues), so the feed fixes can target what Google limits today.
