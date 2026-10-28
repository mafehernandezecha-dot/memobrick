# Publish the dog landing page "Your Dog in Bricks" (site-change)

Asked by Eden on 2026-10-28 (Meta Christmas boost, approved in chat "ok approve", item 1 of `marketing/analytics/ads-analyst/changes/meta-christmas-boost-2026-10-28.md`, A-2026W44-031). Why: the Meta ad "XMAS26 Dog v2" got 51 landing page views and 0 purchases in the last 7 days on a general page (2.12% CTR, $82.26 spent). Dog people who clicked a dog ad land on a page that is not about their dog.

## What approval does

site-developer runs one Shopify Admin mutation on one page and nothing else:

```graphql
mutation { pageUpdate(id: "gid://shopify/Page/167410106588", page: { isPublished: true }) { page { id handle isPublished } userErrors { field message } } }
```

The page goes live at https://mymemobrick.com/pages/dog-brick-mosaic. Theme, products, prices, discounts, checkout, apps and navigation stay as they are. The page is not added to any menu.

**After it is live, Daniel (ads-analyst) points the Dog v2 ad's link to `https://mymemobrick.com/pages/dog-brick-mosaic`** (change 1 of the Meta Christmas boost, already approved as A-2026W44-031). Nothing changes on Meta before the page is live. site-developer tells Daniel in the run report the moment the page returns 200.

## The page as it is now (unpublished)

| Field | Value |
|---|---|
| Page | "Your Dog in Bricks", id gid://shopify/Page/167410106588, handle `dog-brick-mosaic`, isPublished false, template: the theme's default `templates/page.liquid` (live theme 189177626844) |
| Admin preview | https://admin.shopify.com/store/photobrickusa/pages/167410106588 (click "Preview"). An unpublished page has no public URL (`/pages/dog-brick-mosaic` returns 404 until published) |
| SEO | title tag "Custom Dog Brick Mosaic Kit \| Your Dog in 1×1 Bricks \| Memobrick", meta description set (global metafields) |
| Body | `marketing/conversion/site-developer/dog-landing-page/page-body.html` (md5 c865f56912ce504a7825d67d985fa932, what was sent). Read back from Shopify: identical except line breaks Shopify added inside some list items; the `<style>` and the small `<script>` were kept |
| New file in Shopify Files | `dog-brick-mosaic-studio.jpg`, gid://shopify/MediaImage/46715505049820, READY, 1000×1000. The Studio mosaic from `marketing/social/planner/2026-W43/redo/S-20261024-1-studio-mosaic.png` (made in the MemoBrick Studio, 20×20, 64×64 studs) |

## What is on the page (phone first)

1. **Hero**: real product photo (16×16 Bernese mountain dog mosaic next to its photo, the 16×16 kit's own Shopify image), label "A real Memobrick kit: 16×16, next to the original photo". Headline (the page's only H1) "Your dog, in 1×1 bricks", one line, main button **"Upload your dog's photo"** to `/pages/editor?size=20x20#editor`, under it "Opens on the 20×20 kit ($99.88). You can switch sizes in the editor." and "4.9 out of 5 from 1,027 reviews on Loox" (Loox `global_stats` today: 4.9,1027). On a 390×844 phone the button sits at 587 to 640 px, inside the first screen.
2. **Trust strip**: "As seen on FOX" (FOX 4 holiday gift guide; never "Fox News"), "Free design proof" (link to /pages/free-preview, "optional"), "Order by December 15, to receive it before Christmas", "20% off: EARLYHOLIDAY20, until November 22".
3. **How it works, 3 steps**: Upload, Preview (the Studio dog mosaic, labeled "Example design made in the Memobrick Studio"), Build (the framed Doberman, a 20×30 product photo, "Frames are sold separately").
4. **Size and price cards**, prices re-checked in Shopify on 2026-10-28 (variant "No (Build at home)"): 16×16 **$69.88** (1 baseplate, 2,500 bricks, about 2.5 h), 20×20 **$99.88** marked "Our pick for dogs" (4 baseplates, 4,096 bricks, about 4 h), 30×30 **$209.99** (9 baseplates, 9,216 bricks, about 9 h). Each button opens the editor with that size (`?size=16x16`, `20x20`, `30x30`, the same link pattern as the theme's size buttons). Note under the cards: free US shipping at $125 and up; EARLYHOLIDAY20 20% off until Nov 22; codes can't be combined with free shipping (owner decision 2026-10-20).
5. **Real Loox reviews, dog ones only**: Loox's widget cannot filter by keyword, so I searched the Loox review metafields Shopify holds (`loox.review_feed` and `loox.reviews` on the 16×16, 20×20, 20×30 and 30×30 kits) for "dog" and picked four 5-star verified reviews, quoted word for word with name, size and month: Tim A. (20×20, May 2023), Cortney E. (16×16, Jan 2025), Rudy G. (16×16, Apr 2024, shortened with "…" after the third sentence), Adam L. (20×20, Mar 2025). Source data saved: `marketing/conversion/site-developer/dog-landing-page/loox-dog-reviews-2026-10-28.json`. Left out: April S. (4 stars, a complaint about the dog's eyes and joining the plates; honest but not a fit for an ad landing page), Linda V. (mostly about a graduation portrait), Tammy C. (names a toy brand). No review photos: I could not see them (images.loox.io is blocked here), and a check of one (Adam L.'s photo, kept in Shopify Files) shows a couple, not a dog, so photos could mislead on a dog page. "Read all reviews" links to /pages/happy-customers.
6. **Help**: "Not sure which photo to use?" free design proof button (/pages/free-preview); "No photo ready?" Gift Kit button (/products/unlimited-memobrick, from $35, the 10×10 variant price today).
7. **FAQ**: which dog photos work best, which size, building time, when it arrives (order by Dec 15, made and shipped from Miami, Florida), shipping cost, what's in the kit, can you make the design for me.
8. **End button** "Upload your dog's photo" (20×20) and the small-parts note.

The date lines switch themselves off: the EARLYHOLIDAY20 chip and note hide after 2026-11-22 23:59 ET, the December 15 chip and FAQ sentence after 2026-12-15 23:59 ET (tested with a fixed clock at Oct 28, Nov 23 and Dec 16). After Nov 22 the page still works with no code shown.

Facts used, all from `product-facts.md` and the Facts table of `offers-calendar.md`: prices (Shopify, today), baseplates, pieces and build times, kit contents, 40+ colors, free proof (optional), FOX 4, Dec 15, Miami, free US shipping at $125, live rates below that, EARLYHOLIDAY20 dates, codes don't combine with free shipping. No invented reviews, numbers or delivery promises. No AI-drawn mosaics: one product photo pair, one product photo, one Studio mosaic. `check.py copy` passes.

## Tests (2026-10-28)

An unpublished page cannot be opened on the storefront, so the test loaded the live published page /pages/about-us (same default page template) and swapped in this page's body, at phone 390×844 and desktop 1440×900. Script: `marketing/conversion/site-developer/dog-landing-page/test-page.mjs` (date check: `datecheck.mjs`).

- No horizontal scroll (scroll width 390 on phone, 1440 on desktop). All 4 images load. The template's breadcrumb and title are hidden on this page only, so there is one H1.
- Main button tapped for real on phone and desktop: the editor opened at `?size=20x20#editor`; a generated test image (`test-image.jpg`, shapes only, no person, no real dog) uploaded; the editor bar showed **20 × 20" $99.88**. The 16×16 and 30×30 buttons on phone: **16 × 16" $69.88** and **30 × 30" $209.99**. The site's existing "save your design" email pop-up appears after upload, as on every editor visit.
- Links: editor, /pages/free-preview, /pages/happy-customers, /products/unlimited-memobrick and the new Studio image all return 200 on mymemobrick.com.
- Not seen in the sandbox: the Loox and chat scripts (blocked hosts). The page does not depend on them.

Screenshots in `marketing/conversion/site-developer/2026-10-28-dog-landing-page/`:
- Phone: `phone-first-screen.jpg`, `phone-full.jpg`, `phone-sizes.jpg`, `phone-reviews.jpg`, `phone-faq-open.jpg`, `phone-editor-hero-after-upload.jpg`, `phone-editor-size-16-after-upload.jpg`, `phone-editor-size-30-after-upload.jpg`
- Desktop: `desktop-first-screen.jpg`, `desktop-full.jpg`, `desktop-sizes.jpg`, `desktop-reviews.jpg`, `desktop-faq-open.jpg`, `desktop-editor-hero-after-upload.jpg`
- Raw results: `results.json`

## Expected effect

Dog v2 already gets clicks (2.12% CTR) but 0 purchases from 51 landing page views. A page that continues the ad's promise (their dog, in bricks), shows the price on the first screen and sends them straight into the editor with a size set should lift editor starts from this ad. A realistic target: 1 to 3 orders a week from Dog v2 at today's spend; judge it on the Nov 2 Meta review and 7 days after the link change. Watch (referred sessions only): page sessions from Meta, clicks to the editor (`data-dlp-cta` buttons), add to cart and orders.

## Undo

```graphql
mutation { pageUpdate(id: "gid://shopify/Page/167410106588", page: { isPublished: false }) { page { id isPublished } userErrors { field message } } }
```

Daniel first points Dog v2 back to its previous link, then the page is unpublished. The Studio image in Shopify Files can stay. Nothing else changed.
