# email-flow-optimizer 2026-10-13

## Summary

Approved item A-2026W41-010 (cart last-email reassurance test) was NOT applied: its own precondition (compliant shared blocks) is undecided, and the live flow would have to be disabled to add a split.
Since the 2026-09-28 re-enable the flows have 5 attributed orders ($417.62), all from Welcome email 1; cart and checkout recovery emails have 0.
Owner decision needed on the shared blocks (below), then the test can go live in one step.

## Done

- Status set to working, then read the approved item with `check.py approvals`: A-2026W41-010 is approved, unexpired, draft unchanged (commit e91580d).
- Omnisend read-only: `get_automations_id` (Abandoned Cart), `get_email_content_id` (last email 682df212144897d7fd85953a), `get_reference_documentation` (automations), `post_analytics_reports` (all six flows, 2026-09-28 to 2026-10-13). No edits, enables, disables, or sends were made.
- No test was running, so there was nothing to report on.
- Numbers since 2026-09-28 (sent, clicks, attributed orders):
  - Welcome: email 1 (19 sent, 5 orders, $417.62), email 2 (10 sent, 0), other (8 sent, 0).
  - Browse Abandonment: 20 sent, 4 clicks, 0 orders.
  - Abandoned Cart: email 1 14 sent, 1 click; email 2 15 sent, 1 click; email 3 (20%) 11 sent, 0 clicks, 0 orders.
  - Abandoned Checkout: 32, 36, 38 sent, 0 clicks, 0 orders.
  - Reactivation: 40 sent, 0 orders, unsubscribe rate 0.05 (about 2 people), no complaints anywhere.
  - Volumes are too small to judge any email.

## Proposed for approval

None new. A-2026W41-010 stays approved but on hold (see Blocked). I did not edit its draft, since a changed draft needs re-approval.

## Blocked or unknown

Why A-2026W41-010 was not executed:
1. Precondition in the draft: the shared blocks of the live last email still contain claims the brand rules do not allow. Verified in the live content today:
   - "made and shipped from Miami within 2-4 business days after you approve your design" (Miami is verified; the 2-4 days timing is not in the Facts table).
   - "4.8 from 740+ verified reviews" (count unverified).
   - Named quotes "Tiffany S." and "Sean P., verified buyer" (no permission file exists; Loox public reviews are allowed only if confirmed as such).
   - "replacements free, for as long as you own the kit" (lifetime claim, unverified).
   - "a real Memobrick designer" / "Your 20% code still works" (free proof is owner-confirmed as optional; the 20% line is only valid in the control).
   Running the test on top of these would make both arms carry unverified claims, and the variant would still be compared on a different base than intended.
2. Mechanism: Omnisend does support an `abTesting` block (random split by percentage), so the split is possible. But enabled automations cannot be edited (409). Doing it means disabling the live Abandoned Cart flow, replacing its blocks (PUT), creating a new template for the variant, and re-enabling. Disabling a live flow is a bigger step than the approval text spells out, so I want an explicit yes. Using `contactsInWorkflow: keep` avoids dropping people mid-flow.
3. Volume: the last email gets about 0.7 sends a day. 100 per arm takes about 28 weeks, far above the 12-week limit. A split test cannot reach a result before the season ends.

Faster alternative I recommend: skip the split. Replace the last email for everyone with the cleaned reassurance version (no discount code, no unverified claims) for 6 weeks and compare with the 88-delivered, 0-order baseline and the Nov-Dec cart orders. It is a before/after read, not a clean test, but at this volume it is the only read available, and it saves the discount cost.

Owner decisions needed:
- A) Approve removing the unverified claims from the last cart email's shared blocks (or give verified delivery timing, review count, and quote permission).
- B) Choose: split test (long) or replace-for-all (recommended). Either needs me to disable and re-enable the Abandoned Cart flow.
- Cart-restore link merge tag still unconfirmed; the button keeps the plain /cart link.
- The same unverified blocks appear in cart email 2 and the Welcome and checkout flows (see review-2026-10-11.md); they were not touched.

## Sales impact

Nothing changed today, so no direct effect. The expected effect of the held test is small (about +1 order a week at best, from roughly 50 weekly checkout leavers). The clearest current money is Welcome email 1 (5 orders from 19 sent); protecting its performance matters more than the cart tests. Honest note: the cart test will not move October sales, and the owner may prefer to spend attention on traffic and draft-order issues named in sales/latest.json.

## Next run

Tuesday 2026-10-20, 8:00 ET. If the owner answers A and B, rewrite the draft as the chosen version (with design concepts and preview), re-propose it, and apply it after approval. Otherwise re-report numbers.
