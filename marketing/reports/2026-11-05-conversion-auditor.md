## Summary
Desktop is the biggest funnel drop (add to cart 5.0% vs 9.5% last year, sessions -49%), but the desktop editor gets only about 11 sessions a week; the larger desktop leak is the home page (300 sessions, 4.0% vs 8.1% on phone).
One desktop editor change is proposed (hide the competing header links and red pill, keep the upload box above the fold), measured pre/post.

## Done
- Funnel by device, Oct 29 to Nov 4 2026 vs Oct 30 to Nov 5 2025 (Shopify). Phone 6.5% vs 8.7% add to cart; desktop 5.0% vs 9.5%.
- Landing-page split by device for the same 7 days, and `/pages/editor` by device and day (Oct 6 to Nov 4): phone 216 sessions, 23 carts (10.6%); desktop 81, 3 (3.7%).
- Compared the editor first screen on desktop and phone, and the home first screen (screenshots in `marketing/conversion/auditor/2026-11-05/`). No upload or checkout walk today; the 2026-11-04 walk covers it and the path is unchanged.
- Audit: `marketing/conversion/auditor/audit-2026-11-05.md`.
- Task board item done: one audit and one proposal in the audit file. Note the task's premise (the 3.5% figure from 3 of 86) is confirmed in spirit (3 of 81); the difference between desktop and phone first screens is the header, not the words.
- Follow-up: none of my proposals is live, so no step moved.

## Proposed for approval
- `marketing/conversion/auditor/site-changes/desktop-editor-focus-header.md`
  - Executor: site-developer
  - Type: site-change
  - Change: on desktop only, while the editor upload view shows, hide the seven header links and the red "Create My MemoBrick" pill (it links to the page the visitor is on), and keep the headline on one line so the upload box and search row sit above the fold.
  - Measure: CA-20261105-01 in `marketing/shared/experiments.md`; desktop add to cart per editor landing session, baseline 3 of 81; keep at 7% or more after 100 sessions, revert under 4%.
  - Not yet in the approval queue (the coordinator writes it); Jenny, please queue it with the earlier pending editor items.

## Blocked or unknown
- GA4, Search Console and Meta snapshots have still never been pulled (`marketing/data/latest.md`: "never"). Requests from 2026-10-14 remain open in `marketing/data/requests.md`; nothing new added.
- Unknown: how many of the 300 desktop home sessions are bots. Needs the GA4 pull (desktop home by channel).
- Owner steps (unchanged): point Black Friday and holiday social, email and ad links to `/pages/editor?size=20x20#editor` with each agent's UTM. The editor has the best phone cart rate (10.6%) and almost no campaign traffic.

## Sales impact
Weak points addressed: desktop add to cart and referred traffic. The proposed change is small (about 3 more desktop carts per 100 editor sessions at best, with about 3 desktop sessions a day), so it will not move daily orders by itself. It matters once holiday links point at the editor. The real lead for orders is the desktop home page (about 12 carts a week missing if it matched phone); that is the next audit.

## Next run
Compare the desktop and phone home first screens and separate bots from people in desktop home sessions (GA4 if pulled); read any applied fixes; weekly Wednesday run on 2026-11-12.
