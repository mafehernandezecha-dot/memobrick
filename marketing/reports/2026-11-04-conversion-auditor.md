# Conversion auditor 2026-11-04

## Summary
- Editor page converts well on phone (205 sessions, 23 carts, 11.2%) but gets almost no campaign traffic (7 of 300 sessions non-direct); desktop editor is 3.5% (3 of 86).
- Biggest funnel drop this week is desktop: add to cart 5.5% vs 11.5% last year, sessions -34%. Cart to purchase is fine.
- One change proposed: trust line and help link under the editor upload box.

## Done
- Task board item: /pages/editor phone audit and one proposal, in `marketing/conversion/auditor/audit-2026-11-04.md`. Done.
- Funnel by device 7 days vs last year, editor page by device and source, full 20x20 journey on phone and desktop to checkout (no payment, no order), screenshots in `marketing/conversion/auditor/2026-11-04/`. Both walks reached cart and checkout; three step failures were script selector timing, not site errors.
- Follow-up: none of my fixes are live, so nothing to measure; editor baseline recorded.

## Proposed for approval
- Executor: site-developer. `marketing/conversion/auditor/site-changes/editor-first-screen-proof-and-date.md`: under the editor upload box add "Free proof before we make it. Order by December 15 for Christmas." and move the "let us design it for you" help link up; hide the Cmd V tip on phones. Pre/post read (CA-20261104-01, in `marketing/shared/experiments.md`), because the page has about 10 sessions a day and cannot support a split test. Expect about 1 extra cart a week alone; value grows when links point to the editor. Hand to Jenny for the approval queue; it needs a free theme slot like the other items.

## Blocked or unknown
- Owner: point social, email and ad links for the Nov 16 to Dec 15 push at `/pages/editor?size=20x20#editor` (the home and gift pages convert at 6%, this entry converts at 11% on phones). In Meta and Klaviyo/Omnisend, change the button link on new posts and emails; I cannot change either.
- Desktop add to cart halved vs last year: cannot split by channel without GA4 and Ads data. `marketing/data/latest.md` still says "never pulled"; existing requests stay open.
- Direct sessions are bot-inflated (434 sessions with no device type, 0 carts in 7 days), so editor direct counts may include bots.
- Live theme text differs from the repo theme copy ("We never share your photo" live vs "Your photo stays private" in repo).

## Sales impact
Addresses the weak point "referred traffic down 44%, add to cart lower". The page fix is small (about 1 cart a week); the larger effect is the owner-side link change, estimated 3 to 4 orders a week per 100 extra phone sessions at the page's current rates. Desktop fall is the biggest unexplained loss and needs data I do not have.

## Next run
Thursday Nov 5 board; weekly Wednesday. Re-read editor phone add to cart, check desktop by channel if a GA4 snapshot arrives, and re-walk after theme 189322330332 is published.
