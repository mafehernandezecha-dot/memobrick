# email-flow-optimizer 2026-11-10

## Summary
No flow test is running and nothing is approved for me (A-2026W44-062, A-2026W45-012, A-2026W45-017 all still pending), so no Omnisend edits.
Task board done: no "started the editor" flow exists. Browse Abandonment is the closest; it gets a 24% click rate but 1 order in 79 sends.

## Done
- Approvals check: nothing approved for email-flow-optimizer.
- Experiments check: no row Running. Rows EFO-20261027-01, -20261103-01, -20261105-01 are all "not started".
- Read-only Omnisend audit of Browse Abandonment (6849ac10fc8fa3391d8f7b94): trigger viewed product, 2h delay, one email, exits on cart or order. 90 days: 120 sent, 54 opens, 20 clicks, 1 order ($149), 0 unsubs, 0 spam. Since Sep 28: 79 sent, 19 clicks, 1 order. Full audit: `marketing/email/flow-optimizer/audit-browse-abandonment-2026-11-10.md`.
- The browse email carries the same unverified claims as the other flows (740+ reviews in the preheader and body, Fox/NBC/Yahoo, 2-4 days, lifetime replacements, four named quotes) and has two actions (editor and free proof).
- Editor visitors: no flow, and no site event exists for them (only "added design to cart" is sent to Omnisend). Emailing them needs a site event first (the editor already fires a browser event "memobrick:photo"), then a flow.

## Proposed for approval
None. A fourth claims-fix test would only add to a queue where three are already waiting and one test runs at a time.

## Blocked or unknown
- Owner decision needed: pick which of A-2026W45-017 (Welcome, my recommendation), A-2026W44-062 or A-2026W45-012 runs first. Without one, no flow improvement reaches customers.
- Review count, delivery timing, replacements policy and Loox quote permission remain unverified.
- Editor-visit email flow needs a site-developer event; not scoped by me.
- The Omnisend documentation call failed once on its first attempt (connection error) and succeeded on retry.

## Sales impact
Little this run: read-only. The finding that matters is that the browse email already gets people to click to the editor (19 clicks from 79 sends) but converts almost none, and the approvals that would clean up the recovery emails are all waiting. Approving the Welcome item (about $1.1k attributed since Sep 28) is the quickest movement available. Addresses the draft-order drop only indirectly.

## Next run
Tuesday 2026-11-17. Apply any approved item; otherwise report numbers and, if still nothing is approved, propose the browse email clean version.
