# email-flow-optimizer 2026-11-13

## Summary
A-2026W44-062 (Abandoned Checkout email 1) was not approved and lapses today, so per the task board I re-propose the same, unchanged draft once as an honesty fix with Expires 2026-11-30.
I re-read the live email 1 in Omnisend: it still makes all five unbacked claims, unchanged since Sep 28. No Omnisend edits, no flow test running.

## Done
- Approvals: `check.py approvals --agent email-flow-optimizer --today 2026-11-13` printed nothing. A-2026W44-062 is still `pending` (expires today); A-2026W45-012 and A-2026W45-017 are still `pending` (expire Nov 24). Nothing carried out.
- Experiments: no flow test is Running. EFO-20261027-01 is still "not started (proposed)"; its row already exists, so no new row was added.
- Task board (Aura María): done. 062 lapses unapproved today, so it is re-proposed once below as P-email-flow-optimizer-20261113-1, with the claims listed.
- Omnisend, read-only: `get_email_content_id` for content 68ecddff3b316d7f2dde6793 (Abandoned Checkout email 1), after `tool_schema` and `tool_documentation`. Last updated 2026-09-28. It still shows, word for word:
  1. "★★★★★ 4.8 from 740+ verified reviews" (count unverified, varies across the site)
  2. "As seen on Fox News, NBC and Yahoo" (only "As seen on FOX" is approved)
  3. "Ships in 2–4 days, From Miami, tracked, after approval" (Miami is verified; 2 to 4 days is not in the Facts table)
  4. "Free replacements, Any missing brick, for life" (lifetime promise unverified)
  5. The named quote "Erica H., verified buyer, 16×16" (no permission recorded)
  It also says "Nothing is made until you approve", which makes the optional free proof sound required.
- Draft check: `test-checkout-first-email-clean-base-draft.md` is unchanged since 3d79a39. `check.py copy` passes. Both image URLs (live product photo and its crop) return 200. I looked at the committed phone preview again: it passes the design checklist (hero, serif headline, one button destination, stacked steps, no offer, no unbacked claim). Desktop and phone PNGs, preview HTML and Omnisend HTML are committed with it.

## Proposed for approval

### P-email-flow-optimizer-20261113-1
- Agent: email-flow-optimizer
- Executor: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-checkout-first-email-clean-base-draft.md
- Reason: Honesty fix plus test (re-proposal of lapsed A-2026W44-062, same draft): I switch off Abandoned Checkout (68ecddff00915ec475c65e01) for about 30 seconds, replace email 1 (block 59841a953e40551380000002) with this designed version that removes the five claims the live email still makes today (740+ reviews, Fox News/NBC/Yahoo, ships in 2-4 days, free replacements for life, Erica H. quote), keep the saved-design block and checkout link, and re-enable; emails 2 and 3 untouched. Before Black Friday so every lost phone checkout gets a truthful email. Test plan: test-checkout-first-email-clean-base.md (EFO-20261027-01).
- Expires: 2026-11-30
- Status: pending

Note for the coordinator: this replaces A-2026W44-062, which points to the same draft and lapses today. If Eden approves 062 before it lapses, I carry out 062 and this proposal is void.

## Blocked or unknown
- `email_preview.py` still could not render new PNGs in earlier sessions (headless Chrome hangs). Not needed today: the draft is unchanged and its PNGs from 3d79a39 still match it. The started-design flow email stays unproposed until the tool renders.
- Unchanged: review count, delivery timing, the replacements policy and permission for the Erica H. quote are unverified. If Eden confirms any of them, they can go back into the email.
- A-2026W45-012 (cart) and A-2026W45-017 (Welcome) still wait on a decision; my recommendation from Nov 12 stands (checkout first).

## Sales impact
Addresses the phone-checkout weak point: Abandoned Checkout email 1 reaches people who already built a design and reached checkout, the group closest to buying. Live it brings about 1 order in 72 sends. If approved before Black Friday, the new version should add about 1 to 2 orders by Dec 15 (about 90 to 110 sends), and it stops promises we cannot back up from reaching buyers at the moment they decide. Nothing changes for customers until Eden approves.

## Next run
Tuesday 2026-11-17: carry out this item if approved (before and after recorded), weekly flow numbers, a preview retry for the started-design flow.
