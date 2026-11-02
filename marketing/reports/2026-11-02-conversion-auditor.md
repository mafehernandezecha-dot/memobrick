# Conversion auditor 2026-11-02

## Summary
- Dog page: 62 social sessions and 0 carts in 7 days; traffic is fading (26 a day on Oct 29, 3 on Nov 1). The page and the editor work in emulated Facebook and Instagram browsers; the only weak spot is the generic editor first screen.
- 7-day add to cart 3.4% vs 10.0% last year; social 4.0% vs search 10.5%. The loss is visitor type and volume, not the path.
- No new proposal: the one change (dog message and price on the editor screen) is still pending as P-conversion-auditor-20261031-1.

## Done
- Task board item: dog page and editor tested with Facebook Android, Instagram Android and Instagram iPhone user agents at 390x844 (emulated; the real apps cannot be opened here), first screens compared with /pages/editor. Result in `marketing/conversion/auditor/audit-2026-11-02.md`.
- Funnel by device, source and landing page from Shopify, plus the full dog page journey on phone and desktop with a generated test image, stopped at the checkout page.
- Follow-up on earlier fixes in the audit.

## Proposed for approval
None new. Still pending from Oct 31: P-conversion-auditor-20261031-1 (`marketing/conversion/auditor/site-changes/dog-page-editor-continuity.md`, expires 2026-11-18). Because dog traffic is fading, ask Jenny to decide it before the Nov 16 Black Friday traffic, or drop it if the dog ad is paused.

## Blocked or unknown
- Could not test the real Facebook or Instagram app (file picker, iPhone WebView, "open in browser"). Owner: open the dog page link from a Facebook ad on a real phone and try uploading a photo; tell Jenny if anything stops.
- No GA4, Meta or Search Console snapshots exist (`marketing/data/latest.md` says "never"); no new request added, the open ones stand.
- Owner: check on a real phone that the cart shows the design picture (the sandbox shows alt text).
- Draft orders are down 81% (12 vs 63): why proof requests are not arriving or not being invoiced is unknown. This is the biggest single order gap and is not a page test; owner and site-developer, please check the Hulk free-proof form and the invoice step.
- Real Dog v4 ad link still unknown; I used my own UTMs.

## Sales impact
- Weak point: referred traffic and add to cart. The audit finds the checkout path healthy (45% of checkouts buy), so orders come from better-matched traffic (search converts at 2.6x social) and the draft-order recovery, not from more page tests. The pending proposal is worth under 1 order a week at today's traffic; say so plainly if the owner wants to drop it.

## Next run
- Wednesday Nov 4: dog page carts Nov 2 to 3, escalate or close the dog page question, Black Friday readiness walk (codes in offers calendar, delivery date wording), snapshots if they exist.
