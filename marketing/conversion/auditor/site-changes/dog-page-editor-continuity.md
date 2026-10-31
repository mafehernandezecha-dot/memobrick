# Site change: keep the dog promise and the price on the editor's first screen (A/B test)

Proposed by: conversion-auditor, 2026-10-31
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-31.md (problem 1)

## Problem (seen on the live site, 390x844 and 1440x900)

The dog page `/pages/dog-brick-mosaic` passes the first-screen test: the button "Upload your dog's photo" is at y=587 on a 390x844 phone (visible without scrolling), the price ($99.88) is on the page, the page loads in 1.9 s to 3.1 s, no horizontal scroll, and the button opens the editor. But 44 Facebook and Instagram visitors in 3 days (Oct 28 to 30, mostly phones) added nothing to cart; the site's social phone rate is 12 of 263 (4.6%), so about 2 carts were expected. That is 0 against about 2, which is too few to prove a page fault (see audit).

What the visitor sees after the tap: the editor's first screen says "Turn your favourite photo into brick art. Upload a photo and see your MemoBrick in seconds." with no mention of the dog and no price (`marketing/conversion/auditor/2026-10-31/phone-dog-03-landing-cta-to-editor.jpg`). The ad promised "your dog, in bricks". This is the one step where the message changes, and it is where a cold Facebook visitor has to pick a photo from the phone.

This is a guess, so it is proposed as an A/B test.

## Change

Only when the editor is opened from the dog page (the dog page buttons add `&from=dog` to their existing editor links, for example `/pages/editor?size=20x20&from=dog#editor`). Every other visit to the editor stays as it is.

**Before** (editor step 1, all visits):

- Headline: "Turn your favourite photo into brick art."
- Sub line: "Upload a photo and see your MemoBrick in seconds."

**After** (only when `from=dog`, half of those visitors, attribute `ab_dogeditor` = A or B):

- Headline: "Upload your dog's photo."
- Sub line: "See your dog as a brick mosaic in seconds. The 20×20 kit is $99.88, and you can change the size next." (the size and price text reads the selected size and price from the editor, so 16×16 shows $69.88 and 30×30 shows $209.99)

No claim is added. Copy check: no em dashes. The free-proof link and the "we never share your photo" line stay.

Site-developer builds it in a theme copy, tests it at phone and desktop size with a generated test image (never a real dog photo), and tests that the editor without `from=dog` is unchanged.

## Test

Entry is in `marketing/shared/experiments.md` as CA-20261031-01. Decision rule: judge on referred sessions that land on the dog page, after 120 sessions per arm or on 2026-11-24, whichever is first. Adopt B if its add to cart rate is at least 1.3x arm A and at least 4%, keep A otherwise. Under 60 sessions per arm, inconclusive.

## Expected effect

If the editor first screen is a drop point, the dog page's social phone visitors could reach the site's 4.6% (about 2 carts per 44 sessions, 1 order per 100 to 150 sessions). Small in orders (under 1 a week at today's traffic); the value is knowing whether dog traffic is worth the spend before Nov 2.
