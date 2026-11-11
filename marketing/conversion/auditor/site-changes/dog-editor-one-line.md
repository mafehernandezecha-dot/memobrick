# Site change: one dog line on the editor's first phone screen (smaller version of A-2026W44-067)

Proposed by: conversion-auditor, 2026-11-11
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-11-11.md (problem 4)
Replaces: A-2026W44-067 (the A/B version, `dog-page-editor-continuity.md`). If you approve this one, reject 067.

## Problem (live site, checked 2026-11-11 at 390x844)

The dog page's first phone screen is good: "Upload your dog's photo" at y=587, price $99.88, a reviews line, loads in 1.8 s (`2026-11-11/phone-dog-first.jpg`). Its hero button goes to `/pages/editor?size=20x20#editor`. The editor's first screen then says "Turn your favourite photo into brick art." with no dog and no price. Dog page Oct 28 to Nov 8: 145 referred sessions, 3 carts (2.1%), against 7.0% for all referred sessions.

## Change (two small edits, no A/B split)

1. **Where the editor button goes.** On `/pages/dog-brick-mosaic`, the two "Upload your dog's photo" buttons (`data-dlp-cta="hero"` and `data-dlp-cta="end"`):
   - Before: `href="/pages/editor?size=20x20#editor"`
   - After: `href="/pages/editor?size=20x20&from=dog#editor"`
   The three "Start a 16×16 / 20×20 / 30×30" buttons get `&from=dog` the same way, keeping their own size.
2. **One line on the editor's first screen.** Only when the URL has `from=dog`, on phone and desktop, show one line directly above the upload box. Nothing else on the editor changes, and visits without `from=dog` see no difference.
   - Before: (no line)
   - After: `Upload your dog's photo. Your kit is $99.88, and you can change the size next.`
   The price is the selected size's live price from the editor (16×16 shows $69.88, 30×30 shows $209.99), never typed into the text.

Copy check: no em dashes, no new claims, no offer or date.

## Test before applying (theme copy)

- Phone 390x844 and desktop 1440x900: open the dog page, tap each button, confirm the line shows with the right price and that the upload box is still on the first phone screen.
- Open `/pages/editor?size=20x20#editor` without `from=dog`: no line.
- Upload a generated test image (never a real dog or person photo), add to cart, confirm the cart still works.

## Measure (pre/post, no split)

Experiment CA-20261111-01 in `marketing/shared/experiments.md`. Baseline: dog page referred sessions Oct 28 to Nov 8, 145 sessions and 3 carts (2.1%). After release, keep the line if the dog page cart rate is at least 4% after 100 referred sessions; remove it if under 2%; in between, keep it (it costs nothing). Under 100 sessions by Dec 15: inconclusive, keep.

## Expected effect

Small. Dog page traffic has nearly stopped (0 referred sessions on Nov 8); the dog ad visits have dropped off. This matters only if the Nov 12 dog email (if approved) or a dog ad sends people again. At 100 sessions a week, going from 2% to 4% is about 2 more carts and under 1 more order a week.

## Undo

Remove `&from=dog` from the five links and delete the one line, or republish the previous theme.
