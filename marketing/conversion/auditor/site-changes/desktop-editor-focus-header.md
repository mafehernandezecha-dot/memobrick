# Site change: quiet the desktop header on the editor upload screen

Proposed by: conversion-auditor, 2026-11-05
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-11-05.md (problem 1)

## Problem (seen on the live site, 1440x900, screenshots in marketing/conversion/auditor/2026-11-05/)

`/pages/editor`, Oct 6 to Nov 4: desktop 81 sessions, 3 add to cart (3.7%); phone 216 sessions, 23 add to cart (10.6%). At the same traffic the phone rate would give about 9 desktop carts, so 3 is unlikely to be chance alone (about 2 chances in 100). The first screens carry the same words (headline, sentence, three chips, upload box), so the difference is what surrounds them:

- Desktop shows a full header: seven links (Create, Let us design it, Ready-made designs, Frames, Corporate & bulk, Reviews, How it works) and a red "Create My MemoBrick" pill. That pill is the loudest button above the fold and it links to `/pages/editor`, the page the visitor is already on. The real next step, the upload box, is a dashed white box under it. On a phone the header is a logo, a menu icon and a cart, so the red upload icon is the one thing that pulls the eye.
- The desktop headline wraps to two lines ("...brick / art."), so the upload box starts at y=581 and the "No photo to hand? Search" row is cut off at y=885 of 900. On the phone the same row peeks at the bottom, and the whole flow fits.
- Both show a "Back" link (to the home page).

## Change (desktop only, 1021px and wider, only while the editor's upload view is showing)

**Before:** header shows logo, seven links, red "Create My MemoBrick" pill, cart.

**After:** header shows the logo and the cart only. The seven links and the red pill are hidden while `view-upload` is visible, and come back as soon as the visitor uploads a photo or leaves the page. Phones and tablets are unchanged. Also allow the headline to stay on one line at 1440 px (for example `max-width:none` on the upload-view `h1`, or a font size about 10 percent smaller) so the upload box and the search row both sit above the fold at 1440x900.

Nothing is removed from the page for anyone who needs a way out: the logo still goes home, "Back" stays, the free-proof link stays where it is.

Test (site-developer, theme copy, generated test image only): at 1440x900 and 1024x768 the upload box and search row are visible without scrolling; upload still opens from the box and from the search results; the header returns after the photo loads; phone at 390x844 unchanged.

## Measure (pre/post, not an A/B test)

About 3 desktop sessions a day land here, so a 50/50 split cannot read (it would need about 150 per arm). Apply to all and read before and after: desktop add to cart per `/pages/editor` landing session, baseline 3 of 81 (Oct 6 to Nov 4). Logged as CA-20261105-01. Read after 100 desktop sessions on the page. Keep if 7% or more (7 of 100); revert if under 4%; between is inconclusive. Until Nov 16 to Dec 15 links point people here, this will take weeks.

## Expected effect

Small today, 3 extra desktop carts per 100 sessions at best, because the page gets about 3 desktop sessions a day. It becomes useful once Black Friday and Christmas links point at `/pages/editor`.
