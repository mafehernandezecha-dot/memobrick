# conversion-auditor 2026-10-14

## Summary

- Nothing on the site has changed since last week and none of the five proposed fixes is applied, so the funnel has no new signal from the site. Referred traffic is still down about 65% (1,922 against 5,452 sessions in 30 days).
- Add to cart on referred sessions is 5.1% against 7.3%. Google visitors are on par (7.8%); Facebook (3.8%) and Instagram (3.8%, no purchases) are the weak sources. After the cart, checkout completion is better than last year.
- Phone and desktop walks to the checkout page all worked. Fixes already proposed still cover the findings, so no new site-change files this week.

## Done

- Approvals: this agent is never an Executor; nothing to act on. All conversion site-changes in `marketing/approvals/queue.md` are still `pending`.
- Funnel from Shopify analytics (read-only): last 7 days by device against last year, last 30 days referred by device, referrers, landing pages. Full tables in `marketing/conversion/auditor/audit-2026-10-14.md`.
- Walked phone 20x20, desktop 20x20 and phone from home: product, editor, upload test image (generated, no real photo), design, Finish, cart, checkout page. Stopped at checkout, no data entered. 35 screenshots in `marketing/conversion/auditor/2026-10-14/`.
- The saved script imports a path that does not exist in this sandbox (`os/node_modules`); I ran a copy pointing to `/opt/node-tools/node_modules/playwright-core`. The desktop "Next" click timed out on the script's selector; Finish still worked, treated as a script issue.
- Follow-up: no fix applied yet, so nothing to measure.

## Proposed for approval

None. The 2026-10-12 proposals are still pending (cart, desktop sticky bar, Pro Design size; home phone button and email gate test are queued from site-developer's drafts). Note for the coordinator: the desktop sticky bar appears twice (A-2026W42-011 from my draft and the site-developer item); approve only one.

## Blocked or unknown

- `marketing/data/latest.md` says nothing has been pulled ("Updated: never"), so GA4 and Meta cross-checks are missing. I added a request line to `marketing/data/requests.md`.
- Owner steps from the 2026-10-12 report remain open and are still the biggest levers: test the free-proof form and follow-up (draft orders 4 against 71 last year), decide a flat shipping rate or lower the $125 free-shipping threshold, confirm production and delivery time for the Facts table, resolve EARLYBIRD20 against the offers calendar, test checkout on a real iPhone (shop.app is blocked here), and filter bot traffic from reports.
- Not verifiable here: the Hulk proof form, Loox widget and Shop Pay checkout (blocked hosts).
- Test traffic: three cart sessions and three checkout page views were added to today's analytics, no email entered.

## Sales impact

No new fix this week, so no direct effect. The expected gain is in approving the pending fixes (estimated 10 to 20 orders a month for the phone home button, 5 to 15 for the editor bar, small for the cart) and the owner's proof-form check (up to about 30 orders a month). The weak point named is add to cart falling short; Facebook and Instagram arrivals look like the largest conversion gap to hand to ads-analyst and social-publisher.

## Next run

- Wednesday 2026-10-21. Re-measure; if any fix is applied, check its step (home phone: home-page add to cart; desktop bar: desktop add to cart).
- Compare Facebook and Instagram landing pages with their ads once the Meta snapshot exists.
- Fix the module path in `tools/journey.mjs`.
