# email-flow-optimizer 2026-11-12

## Summary
Off-day run (my day is Tuesday). Nothing approved for me, no flow test running, no Omnisend edits, no new proposal.
Today's task-board task is done: I ranked the three open flow tests by expected orders before Dec 15, using fresh 30-day Omnisend numbers.
Recommendation: approve A-2026W44-062 (Abandoned Checkout email 1) today, since it lapses Nov 13. Reject A-2026W45-012 and A-2026W45-017 for now.

## Done
- Approvals: `check.py approvals` printed nothing for email-flow-optimizer. A-2026W44-062 (expires Nov 13), A-2026W45-012 and A-2026W45-017 (both expire Nov 24) are still pending. All three drafts are unchanged since their queue commits (3d79a39, 9bc141c, e5bbf1f), so any of them can be carried out as soon as it is approved.
- Experiments: no flow test is Running.
- Omnisend, read-only: one `post_analytics_reports` call (last 30 days, by flow and email, for Welcome, Abandoned Cart and Abandoned Checkout), after `tool_schema` and `tool_documentation`. No edits, enables, disables or sends.
- Task board (Aura María): done. The table and recommendation are below.

### Last 30 days, the three emails in question (attributed, by send date)

| Email | Sent | Unique clicks | Orders | Revenue | Unsubs / spam |
|---|---|---|---|---|---|
| Welcome email 1 | 95 | 5 | 10 | $996.04 | 0 / 0 |
| Abandoned Checkout email 1 | 72 | 6 | 1 | $281.67 | 0 / 0 |
| Abandoned Cart email 1 (highest-volume message, 64e86fedc0c2565cbe9d8ad0) | 53 | 4 | 0 | $0 | 0 / 0 |

For context: cart emails 2 and 3 brought 1 order each, and checkout emails 2 and 3 brought none.

### Ranking by expected extra orders before Dec 15 (about 4.5 weeks, Black Friday volume included)

| Rank | Item | Who gets it | Expected sends to Dec 15 | Expected extra orders | Downside | Ready |
|---|---|---|---|---|---|---|
| 1 | A-2026W44-062 Abandoned Checkout email 1 | People who reached checkout and left. These are the closest to buying, and today's phone-checkout weak point is this group | about 90 to 110 | +1 to +2 (from 1 in 72 now to about 1 in 35, the best our recovery emails reach) | Small: 1 order a month on the line today | Yes, desktop and phone previews done. Lapses Nov 13 |
| 2 | A-2026W45-012 Abandoned Cart email 1 | People who added to cart and left | about 60 to 75 | +1 to +2 (from 0 in 53 now) and the only one of the three that adds the true Dec 15 date | Small: no orders on the line today | Partly: only the HTML preview exists, no phone PNG |
| 3 | A-2026W45-017 Welcome email 1 | New sign-ups with the 20% code | about 110 to 130 | About 0. Its goal is to remove unbacked claims without losing orders, not to add any | Real: this email brings about 10 orders a month, the most of any flow email, right before Black Friday | Yes |

**Recommendation: approve A-2026W44-062 today (it lapses Nov 13), and reject A-2026W45-012 and A-2026W45-017.** Checkout email 1 reaches the people closest to buying, it is ready to go, and it risks the least. I will put the cart test (012) up again after the checkout test reads. The Welcome change (017) should wait until after Dec 15 so it does not touch our best email during the peak.

Rejecting 017 leaves the unverified claims (740+ reviews, Fox News/NBC/Yahoo, 2-4 days, lifetime replacements, the named quote) live in Welcome email 1 through the season. Eden can end that without any test by confirming those facts. If he cannot confirm them, approve 017 instead of rejecting it. That is an honesty call, not a sales one.

## Proposed for approval
None (task-board rule: no new proposals). The decision asked for is on the existing items A-2026W44-062, A-2026W45-012 and A-2026W45-017.

## Blocked or unknown
- Email preview: `email_preview.py` still hangs during the headless Chrome screenshot. I tried again under python3.13 with a 90-second limit on `flow-started-design-no-cart.md`, and it timed out with no PNGs. The started-design flow stays unproposed until the tool or the environment is fixed. Its site event (P-email-flow-optimizer-20261111-1) does not depend on this.
- Attributed orders count orders within Omnisend's attribution window. Some Welcome orders, made with the 20% code, would probably have come anyway, so its 10 orders are an upper bound on what the email causes.
- Unchanged from earlier runs: the review count, delivery timing, replacements policy and Loox quote permission are all unverified.

## Sales impact
This run puts nothing in front of customers. It cuts Eden's decision to one approval. If he approves A-2026W44-062 today, the new checkout email 1 goes live before Black Friday and should add about 1 to 2 orders by Dec 15. That speaks to today's phone-checkout weak point (5 of 24 phone checkouts completed). If nothing is approved, the item lapses tomorrow and no flow improvement runs through the season.

## Next run
If A-2026W44-062 is approved: carry it out on my next run (Nov 13, before it lapses), recording the before and after. Otherwise Tuesday 2026-11-17: weekly flow numbers, a preview retry for the started-design flow, and proposing it if the PNGs render.
