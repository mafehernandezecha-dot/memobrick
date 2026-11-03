# Site change: a start block at the top of the gift collection page (A/B test)

Proposed by: conversion-auditor, 2026-11-03
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-11-03.md (problem 1)

## Problem (seen on the live site, 390x844 and 1440x900)

`/collections/the-gift-for-everyone` is the second best landing page: 192 sessions in Oct 27 to Nov 2, 12 carts (6.3%), 8 reached checkout, 4 purchased. On phones it is 157 sessions and 9 carts (5.7%).

On a phone the first screen is the title, the star line and one product photo (`marketing/conversion/auditor/2026-11-03/phone-gift-first.jpg`). There is no button (the "Create My MemoBrick" button exists only in the desktop header), no sentence that says what to do, and no date. The page is 25 product tiles and about 10,900 px tall. A gift shopper has to scroll and read 25 long titles to find a size, then tap through to a product page, then to the creator. The product page has the date, the reviews and the proof offer, but the collection page, where this traffic lands, has none of them.

This is a guess about why 94% leave, so it is proposed as an A/B test.

## Change

Only on the collection with handle `the-gift-for-everyone`. Every other collection stays as it is. Insert one block between the star line and the product grid, in `templates/collection.liquid`.

**Before:** title, star line, product grid.

**After (shown to half of the visitors):**

- Line: "Pick a size, upload your photo, and see your mosaic before you pay."
- Line: "Order by December 15 to get it before Christmas."
- Button (red, same style as the header button, full width on phone): "Create My MemoBrick", linking to `/pages/editor?size=20x20#editor` (the same default the home page uses).
- Text link under it: "Not ready yet? Get a free proof", linking to `/pages/free-preview`.

The grid and the star line do not change. No price is claimed in the block (the tiles show them). The date is the Facts-table claim (order by December 15, 2026 to receive before Christmas, verified 2026-10-11). Copy check: no em dashes.

If the "Order by December 15" bar (A-2026W44-050) is live site-wide by then, drop the second line so the date is not shown twice.

Site-developer builds it in a theme copy, tests phone and desktop with a generated test image (never a customer photo), checks the button opens the editor on 20x20, and checks the other collections are unchanged. The split is a 50/50 attribute `ab_giftcol` = A or B stored in the visitor's browser, recorded as a cart attribute or event so add to cart can be read per arm.

## Test

Entry is in `marketing/shared/experiments.md` as CA-20261103-01. Decision rule: judge on sessions that land on the collection, after 120 sessions per arm or on 2026-11-30, whichever is first. Adopt B if its add to cart rate is at least 1.3x arm A and at least 7%, keep A otherwise. Under 60 sessions per arm, inconclusive. At about 190 sessions a week this needs about 3 weeks, so Black Friday traffic will decide it.

## Expected effect

If the missing first-screen action is the cause, phone add to cart on this page could go from 5.7% toward the site's search level (10.5%). On 190 sessions a week that is about 5 to 9 more carts, and at the page's cart to order rate (4 of 12) about 1 to 3 more orders a week now, more in the Black Friday weeks. It is a guess; the test says whether it is real.
