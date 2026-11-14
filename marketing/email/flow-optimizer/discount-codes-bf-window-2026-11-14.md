# Flow discount codes in the Black Friday window (read 2026-11-14)

Read-only check for the task board. No flow was changed. Source: Omnisend `get_automations` and `get_automations_id` for all six in-scope flows (read today), `get_email_content_id` for Cart email 3 and Checkout email 3 (read today), and the earlier full content review (`review-2026-10-11.md`) for the code lengths of the Welcome emails. All six flows and every email in them were last edited on or before 2026-09-28, so that review still matches the live content. Post-Purchase and order emails are out of scope and were not read.

Calendar (`offers-calendar.md`): EARLYHOLIDAY20 (20%) runs until Nov 22. **No code Nov 23 to 26** (owner decision). BRICKFRIDAY25 (25%) Nov 27 to 29. CYBERBRICK20 (20%) Nov 30. None of these combine with other codes.

Days: Mon Nov 23, Tue 24, Wed 25, Thu 26 (Thanksgiving), Fri 27, Sat 28, Sun 29, Mon 30.

## Every live flow email that issues or prints a code

| Flow | Email (subject) | When it sends | Code | Sends Nov 23 to 26? | Sends Nov 27 to 30? |
|---|---|---|---|---|---|
| Welcome for memobrick (614cb885...4218) | 1 "your 20% off is inside" | right after a new signup | new 20% code, 7 days | **Yes**, to every new signup (about 2 a day). Codes from signups on Nov 16 to 22 also stay usable into Nov 23 to 29 | **Yes**. 20% on Nov 27 to 29 is less than the public 25%; on Nov 30 it equals CYBERBRICK20 |
| Welcome | 2 "the gift that made her cry" | 3 days after signup | second new 20% code, 4 days (preheader: "Your 20% welcome gift is still waiting") | **Yes**, for signups from Nov 20 on | **Yes**, same as above |
| Welcome | 3 "your 20% ends in 48 hours" | 6 days after signup | third new 20% code, 2 days | **Yes**, for signups from Nov 17 on | **Yes**, same as above |
| Abandoned Cart (64e86fed...8ac8) | 3 "20% off your Memobrick (3 days)" | about 3 days after the cart (1 h idle, then 2 h, 24 h, 48 h) | new 20% code, 3 days, once per customer | **Yes**, for carts left from about Nov 20 on. Codes from Nov 18 to 22 carts are still valid into Nov 23 to 25 | **Yes**. Lower than 25% on Nov 27 to 29 |
| Abandoned Checkout (68ecddff...5e01) | 3 "20% off to finish checkout (3 days)" | about 3 days after a checkout is left (1 h idle, then 23 h, 2 days) | new 20% code, 3 days, once per customer | **Yes**, for checkouts left from about Nov 20 on, same carry-over as the cart code | **Yes**. Lower than 25% on Nov 27 to 29 |
| Customer Reactivation (6851c60f...1122) | 1 "20% off your next Memobrick" | 2 months after an order, only Tue, Wed or Thu | new 20% code, 14 days | **Yes**, Tue Nov 24 to Thu Nov 26: past buyers whose orders were around Sep 21 to 26 (about 10 orders that week, aggregate count). Codes sent Nov 10 to 19 are also valid through the window | **No new sends** (Fri to Mon are not allowed days; they wait until Tue Dec 1). But every code sent Nov 13 to 26 is still valid on Nov 27 to 30, at 20% |
| Customer Reactivation | 2 "your 20% ends in 4 days" | 10 days after email 1, only Tue to Thu | new 20% code (preheader: "Here's a fresh code") | **Yes**, Nov 24 to 26 | **No new sends**, same carry-over as email 1 |

No code: Abandoned Cart emails 1 and 2, Abandoned Checkout emails 1 and 2, Browse Abandonment (1 email) and Back in Stock (1 email) issue no code. Note: Cart email 3 and Checkout email 3 also contain the line "Your 20% code still works" in the free-proof block (refers to their own code).

## What this means

- **Nov 23 to 26 (no-code window):** all seven code emails keep sending. Every new subscriber, every lost cart or checkout, and about 10 past buyers get a fresh 20% code during the days Eden chose to have no code, so the Black Friday offer stands out less for exactly the people closest to buying.
- **Nov 27 to 30:** Welcome, Cart 3 and Checkout 3 keep offering 20% while the public code is 25% (Nov 27 to 29). Codes do not combine, so a shopper who uses the flow code instead of BRICKFRIDAY25 pays more, and the email undersells the best offer of the year. On Nov 30 the flow 20% equals CYBERBRICK20.
- **Carry-over:** a flow can be paused, but codes already sent stay valid for their full length (Welcome 7 days, Cart and Checkout 3 days, Reactivation 14 days). Pausing on Nov 23 does not take away codes already in inboxes.
- **Pausing has a cost:** these are the only emails that sell steadily (Welcome email 1: 12 attributed orders from 82 sends between Sep 28 and Nov 5). A plain pause of the Welcome flow would also stop welcome emails for new signups, and the signup form itself may still promise 20% (the form is outside my scope; the site team should check its wording).

## Owner question (for the coordinator to ask Eden)

See the run report `marketing/reports/2026-11-14-email-flow-optimizer.md`.
