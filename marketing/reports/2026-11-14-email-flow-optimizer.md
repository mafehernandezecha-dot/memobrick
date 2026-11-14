# email-flow-optimizer 2026-11-14

## Summary
Task board done: all seven live flow emails that issue a 20% code (Welcome 1 to 3, Cart 3, Checkout 3, Reactivation 1 and 2) keep sending during Eden's no-code window (Nov 23 to 26), and Welcome, Cart 3 and Checkout 3 keep offering 20% while BRICKFRIDAY25 is 25% (Nov 27 to 29). Table in my folder; one owner question below.
Read-only run: no Omnisend edits, no new proposal, no flow test running.

## Done
- Approvals: `check.py approvals --agent email-flow-optimizer --today 2026-11-14` printed nothing. A-2026W46-019 (Checkout email 1, the re-proposal) is `pending`, expires Nov 30. A-2026W45-012 (Cart email 1) and A-2026W45-017 (Welcome email 1) `pending`, expire Nov 24. A-2026W46-012 (started-design event spec) `pending`, expires Nov 25. Nothing carried out.
- Experiments: no flow test is Running. No row added.
- Task board (Aura María): **done**. Read today in Omnisend, after `tool_schema` and `tool_documentation` for each tool: `get_automations` (summary, enabled, limit 20), `get_automations_id` for all six in-scope flows, `get_email_content_id` for Cart email 3 (682df212144897d7fd85953a) and Checkout email 3 (68ecddffd763da9987e4a94a). Both are Omnisend-generated, unique, 20%, 3-day, once-per-customer codes, not combinable. Reactivation settings: 20%, 14 days, Tue to Thu sends only. Welcome code lengths (7, 4, 2 days) from the Oct 11 content review; no flow or email was edited after Sep 28. Table: `marketing/email/flow-optimizer/discount-codes-bf-window-2026-11-14.md`.
- Key findings:
  - Nov 23 to 26: every new signup gets a fresh 20% code (Welcome 1, about 2 a day), plus Welcome 2 and 3 for recent signups; lost carts and checkouts from about Nov 20 get Cart 3 and Checkout 3; about 10 past buyers (orders around Sep 21 to 26, aggregate count) get Reactivation 1 on Tue Nov 24 to Thu Nov 26, plus Reactivation 2 sends.
  - Nov 27 to 30: Welcome, Cart 3 and Checkout 3 still send 20%, lower than the public 25% on Nov 27 to 29; equal to CYBERBRICK20 on Nov 30. Reactivation sends nothing Fri to Mon, but its 14-day codes from Nov 13 to 26 stay valid all weekend.
  - Codes already sent stay valid for their full length even if a flow is paused, so a pause only stops new codes from the day it starts.

## Proposed for approval
None. The task board asked for no proposal. If Eden answers the question below, I will write the exact change as a `send` item the same day.

## Owner question (for the coordinator)
From Nov 23 to 30, the Welcome, last Abandoned Cart, last Abandoned Checkout and Reactivation emails each send a personal 20% code (7 are live; details in `marketing/email/flow-optimizer/discount-codes-bf-window-2026-11-14.md`), which breaks the no-code window on Nov 23 to 26 and offers less than BRICKFRIDAY25 on Nov 27 to 29: Eden, which do you want: (a) keep them all as they are, (b) keep the flows running but swap the code in those emails for no code on Nov 23 to 26 and for BRICKFRIDAY25 on Nov 27 to 29 and CYBERBRICK20 on Nov 30, then put the 20% back on Dec 1, or (c) pause only the Reactivation flow (its 14-day codes are the ones that undercut the plan most) and keep the others?

My recommendation is (b) for Welcome, Cart 3 and Checkout 3, because those emails reach the people closest to buying and a plain pause would lose those orders, and (c) for Reactivation. Changes must be in place before Sun Nov 22, so the answer is needed by Thu Nov 19.

## Blocked or unknown
- Not re-read today: bodies of Welcome 1 to 3, Reactivation 1 and 2, Browse Abandonment and Back in Stock (I used today's subjects, preheaders and settings plus the Oct 11 review; none were edited after Sep 28). Welcome email 2's 4-day code length comes from that review.
- Volumes per window are estimates from 90-day sends and aggregate Shopify order counts, not a forecast.
- How Omnisend treats contacts already waiting inside a flow when it is disabled was not checked today; I will read the `automations` reference before any approved pause.
- The signup form wording (it may promise 20%) is outside my scope; the site team should check it if Eden picks a Welcome change.
- Unchanged: `email_preview.py` PNG rendering issue from earlier runs; review count, delivery timing, replacements policy and named-quote permissions are unverified.

## Sales impact
This protects Black Friday orders rather than adding emails. A 20% code reaching cart and checkout abandoners on Nov 27 to 29 means some of the hottest buyers pay more than the public offer or wait to find the 25% code, and fresh 20% codes on Nov 23 to 26 weaken the "wait for Black Friday" message Eden chose. Swapping in the right code keeps these flows (the only steady email sellers) working with the calendar. Expected effect is small in orders (a few dozen sends across the eight days) but it removes a real mismatch in the season's biggest week. Nothing changes until Eden answers.

## Next run
Tuesday 2026-11-17: carry out any approved item (A-2026W46-019 first), turn Eden's answer into an exact `send` item if it has arrived, weekly flow numbers.
