# Site change: trust line and free-proof link on the editor first screen

Proposed by: conversion-auditor, 2026-11-04
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-11-04.md (problem 2)

## Problem (seen on the live site, 390x844 and 1440x900)

`/pages/editor` is the page where an order starts: Oct 5 to Nov 3 it had 300 landing sessions, 26 add to cart (8.7%), 19 reached checkout, 6 purchased. On phones 205 sessions, 23 carts (11.2%), 5 purchased: the best phone entry on the site. On desktop 86 sessions, 3 carts (3.5%). Almost all of it is direct traffic (280 of 300). Only 7 sessions came from social or search, which is why "referred" counts show 2 a week: nothing sends people here.

The first screen (`marketing/conversion/auditor/2026-11-04/phone-editor-bare-first.jpg`, `desktop-editor-bare-first.jpg`) is upload only: headline, one sentence, three small chips, the upload box. A visitor who arrives cold (from a link, a story, a bookmark) sees no price, no delivery date, no proof offer, no reviews. The one help route ("Not sure your photo will work? let us design it for you") is the last line of the page, about 2,300 px below the box on a phone, after three photo-tip cards. The line under the search box tells phone visitors to "press Cmd V (or Ctrl V)", a keyboard tip that does nothing on a phone.

## Change (only the `view-upload` block of the editor page)

**Before:** headline, "Upload a photo and see your MemoBrick in seconds.", chips, upload box, "No photo to hand?" search, keyboard note, three tip cards, help link at the bottom.

**After:**
1. Directly under the upload box add one line: "Free proof before we make it. Order by December 15 for Christmas." and under it the existing help link moved up, with its wording kept: "Not sure your photo will work? Let us design it for you." (same `data-go="freeproof"` button; the bottom copy can stay).
2. On screens narrower than 700 px hide the sentence about copying an image and pressing Cmd V / Ctrl V. Keep it on desktop.

Nothing else moves. No price is added (the size is chosen later in the creator), no new claims: free proof is owner confirmed (2026-10-12), December 15 is in `marketing/shared/offers-calendar.md` (verified 2026-10-11). If the site-wide "Order by December 15" bar goes live, drop the date half of line 1 so it is not shown twice. Copy has no em dashes.

Test: site-developer builds it in a theme copy, checks the upload still opens from the box and from the search results, the help link opens the free-proof view, and the other views are unchanged (phone and desktop, generated test image only).

## Measure (not an A/B test)

The page gets about 10 landing sessions a day, so a 50/50 split cannot reach a reading (it would need about 150 per arm, 30 days). Apply it to everyone and read before and after: phone add to cart per landing session, baseline 11.2% on 205 sessions (Oct 5 to Nov 3). Read Dec 1 with at least 150 phone sessions after the change; a result under 8% means revert the date line. Logged as CA-20261104-01 (pre/post).

## Expected effect

Small on its own: at 10 sessions a day, a lift of 2 points on phone is about 1 extra cart a week. The page's real limit is traffic. It matters more once the Nov 16 to Dec 15 social and email links point here, which is the owner-side action in the audit (send the Black Friday and holiday links to `/pages/editor?size=20x20#editor`, not the home page).
