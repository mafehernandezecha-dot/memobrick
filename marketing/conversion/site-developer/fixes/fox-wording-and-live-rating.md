# "As seen on FOX" wording and live Loox rating, home page and kit pages, 2026-10-28

Built and tested by: site-developer (Jenny), at Eden's request ("yes" to fixing "As seen on Fox News" in the theme copy). Owner rule: never write "Fox News"; use "As seen on FOX" (also the Press coverage row of `marketing/shared/offers-calendar.md`).
Status: built in theme copy "Memobrick fixes" (189310075100), waiting for approval. The connector refuses writes to the live theme, so Eden publishes the copy.

## Problem

1. The live home page says "As seen on Fox News" (hero trust bar) and "MemoBrick on Fox News." (press heading). The press logo has alt text "Fox News", the video link's label says "segment on Fox News", and the video player title set by `memobrick.js` says "MemoBrick featured on Fox News". Every kit page also has a "Fox News" logo alt.
2. The rating is hardcoded as "4.8 / 747" in 6 places on the home page and editor and 3 on kit pages. Loox's live summary today is 4.9 from 1,027 reviews.

## Preview

- https://mymemobrick.com/?preview_theme_id=189310075100 (home page, hero and "In the news")
- https://mymemobrick.com/products/2-2-boards?preview_theme_id=189310075100 (kit page)
- Publish: Shopify admin > Online Store > Themes > "Memobrick fixes" > ... > Publish. The same copy also holds the pending article template upgrade, the ready-made A/B link and approved A-2026W41-012 (see the run report).

## Files (only these 3 changed by this fix)

Full before and after files: `marketing/conversion/site-developer/theme-files/fox-wording-2026-10-28/before/` and `/after/`.

| File | Before md5 | After md5 |
|---|---|---|
| sections/memobrick-site.liquid | 5f3150ad0a55c0e3afe884178c296dd0 | f3cd4967b199889ec92a597f38be2450 |
| templates/product.liquid | 845d653ed4879952c714e0c4ae2e7220 | ace1fe688d24fb18e659b49d8683fc6b |
| assets/memobrick.js | 88f83c4a454dcf58bc1d9c1118777f77 | 0b2713d1c0e521ab1358950fae71d245 |

### sections/memobrick-site.liquid (line numbers are in the after file)

New block at lines 4 to 24, before `render 'memobrick-catalog'`: reads `shop.metafields.loox.global_stats` ("4.9,1027"), sets `mbl_rating` and `mbl_count` ("1,027"), and `mbl_ok`. If Loox's metafield is ever missing, no numbers show (no blank stars).

| Line | Before | After |
|---|---|---|
| 164 | `★★★★★ <b>4.8</b> · 747 Reviews` | `★★★★★ <b>{{ mbl_rating }}</b> · {{ mbl_count }} Reviews` (shows 4.9 · 1,027 Reviews) |
| 165 | `As seen on Fox News` | `As seen on FOX` |
| 175 | `747 reviews. These are their photos.` | `{{ mbl_count }} reviews. These are their photos.` |
| 183 | `Read all 747 reviews` | `Read all {{ mbl_count }} reviews` |
| 245 | `MemoBrick on Fox News.` | `As seen on FOX.` |
| 249 | `aria-label="Watch the MemoBrick segment on Fox News"` | `aria-label="Watch the MemoBrick segment on FOX"` |
| 250 | video image alt `...the Fox Holiday Gift Guide...` | `...the FOX Holiday Gift Guide...` |
| 252 | `Fox Holiday Gift Guide · watch the segment` | `FOX Holiday Gift Guide · watch the segment` |
| 258 | logo `alt="Fox News"` | `alt="FOX"` |
| 263 | `Alongside 747 reviews averaging 4.8 stars, and a design proof...` | `Alongside {{ mbl_count }} reviews averaging {{ mbl_rating }} stars, and a design proof...` |
| 653 | editor `★★★★★ <b>4.8</b> from 747 customers` | `★★★★★ <b>{{ mbl_rating }}</b> from {{ mbl_count }} reviews` ("customers" became "reviews": Loox counts reviews, not customers) |
| 1072 | editor `★★★★★ <b>4.8</b> from 747 reviews` | `★★★★★ <b>{{ mbl_rating }}</b> from {{ mbl_count }} reviews` |

### templates/product.liquid (line numbers are in the after file)

Same Loox block at lines 73 to 93, before `render 'site-header'`.

| Line | Before | After |
|---|---|---|
| 103 | `★★★★★ <b>4.8</b> from 747 customers` | `★★★★★ <b>{{ mbl_rating }}</b> from {{ mbl_count }} reviews` |
| 112 | logo `alt="Fox News"` | `alt="FOX"` |
| (old 319) | `"aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "747" },` | removed. This is approved item A-2026W41-012, exactly as its draft (`marketing/seo/technical/site-changes/remove-hardcoded-product-rating.md`), not part of this proposal |
| 369 | `<b>★★★★★ 4.8</b> from 747 customers who followed these same three tips [em dash] see their photos ↓` | `<b>★★★★★ {{ mbl_rating }}</b> from {{ mbl_count }} reviews. Customers who followed these same three tips: see their photos ↓` |
| 393 to 394 | `<b>4.8</b>` / `★★★★★<br>747 reviews` | `<b>{{ mbl_rating }}</b>` / `★★★★★<br>{{ mbl_count }} reviews` |

### assets/memobrick.js

One string: `t.title="MemoBrick featured on Fox News"` became `t.title="MemoBrick featured on FOX"` (the title of the video player that opens when the press video is clicked; screen readers read it). Uploaded from the repo file at commit adbc23a.

## Tests (preview, 390x844 and 1440x900)

| Check | Phone | Desktop |
|---|---|---|
| Home hero trust bar | "★★★★★ 4.9 · 1,027 Reviews, As seen on FOX" | same |
| Reviews heading and link | "1,027 reviews. These are their photos." / "Read all 1,027 reviews" | same |
| In the news | "As seen on FOX.", "Alongside 1,027 reviews averaging 4.9 stars" | same |
| Editor after upload (generated test image) | trust row present in page (hidden on phone by design) | "4.9 from 1,027 reviews" in trust row and tips panel |
| Kit page 20x20 | trust row, tips line and review header show 4.9 / 1,027 | same |
| "Fox News" anywhere in the page HTML (home, editor, kit page) | 0 (before: 4 on home and editor, 1 on kit page) | 0 |
| Product JSON-LD | parses; no hardcoded 4.8/747 left; the per-product rating an app already adds (20x20: 4.9 from 202) stays | same |
| Home to editor to upload to cart | reached cart with the 20x20 kit (the "design it myself" click was blocked in the sandbox, as in earlier phone runs) | full path to cart |
| Page errors | same 2 sandbox errors as before (Shop cart sync module, TikTok pixel); none new | same |
| Horizontal scroll | none (390) | none (1440) |

Screenshots (before and after, about 1000 px wide): `marketing/conversion/site-developer/2026-10-28-fox-wording/`
- `before-/after-phone-home-hero-trustbar.jpg`, `before-/after-desktop-home-hero-trustbar.jpg`
- `before-/after-{phone,desktop}-home-reviews-sec-head.jpg`, `...-home-reviews-revmore.jpg`, `...-home-press-wrap.jpg`
- `before-/after-{phone,desktop}-product-trustrow.jpg`, `...-product-pdp-press.jpg`, `...-product-pdp-social.jpg`, `...-product-pdp-rev-head.jpg`
- `after-desktop-editor-trustrow.jpg`, `after-{phone,desktop}-cart.jpg`

## Not fixed here (needs Eden)

- **The press logo image itself reads "FOX NEWS".** The file is `https://cdn.shopify.com/s/files/1/0375/0107/5595/files/Fox-News.png` (190x150, "FOX NEWS" in white on grey). It shows on the home page ("As featured in") and every kit page. Only the alt text could be changed in the theme. Choose one: (a) upload a FOX logo you are allowed to use and send me its Files link, and I swap it; or (b) tell me to remove that one logo from both rows.
- NBC, Yahoo and Disrupt logos sit in the same rows; offers-calendar says they are not confirmed and must not be claimed.
- The home page video is https://www.youtube.com/watch?v=_WrESPAjNjI; the FOX clips you confirmed are UMUFrTixfc4 and bDRIuQtPEGI. Please confirm _WrESPAjNjI is a FOX segment.
- "Made & Shipped from Miami" was not touched.

## Expected effect

Small but real: removes a press claim you have not confirmed ("Fox News") from the first screen and shows the higher, current rating (4.9 from 1,027 instead of 4.8 from 747) in 9 places, which stays in sync with Loox from now on. No change to the purchase path, prices, cart or checkout.

## Undo

Publish "Memobrick holiday gift boxes" (189177626844) again, or re-upload the three `before/` files to the theme.
