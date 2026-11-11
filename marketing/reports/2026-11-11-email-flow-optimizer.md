# email-flow-optimizer 2026-11-11

## Summary
Off-day run (my day is Tuesday). Nothing approved for me, no flow test running, so no Omnisend edits.
I did next Tuesday's task-board task early because Black Friday starts Nov 16: the spec for a "started a design, no cart" flow, split into a site event (site-developer) and the flow and email (me).
Proposed the site event now. The flow email is written and its links checked, but held back: Chrome would not render the preview images in this session.

## Done
- Approvals: `check.py approvals` printed nothing for email-flow-optimizer. A-2026W44-062 (expires Nov 13), A-2026W45-012 and A-2026W45-017 are still pending.
- Experiments: no flow test Running.
- Task board (Aura María, dated Tue Nov 17): done early. The spec is in two files:
  - `marketing/email/flow-optimizer/spec-started-design-event.md`: an Omnisend custom event `started design`. It fires once per session when a photo lands in the editor (`memobrick:photo`) and the visitor's email is known (logged in, or the "Save your design" popup). It carries no photo or name, sits behind a theme switch, and never touches the editor or cart.
  - `marketing/email/flow-optimizer/flow-started-design-no-cart.md`: flow "Started design, no cart". Trigger: that event, with 3 hours of inactivity. Then one email at 19:00 store time. It exits on added design to cart, added product to cart, started checkout or placed order. Frequency: once per 14 days. It does not start for anyone already in Abandoned Cart or Abandoned Checkout. No discount. The email is designed (three concepts, subject options, hero, steps, wall image, band). Its one button goes to `/pages/editor?size=20x20#editor` with UTM.
- Findings that shaped the spec (read-only):
  - The Welcome flow (614cb885f5765e001ced4218) triggers only on two Omnisend signup forms, or on a first subscription through a "Signup form".
  - The editor popup subscribes people through Shopify's customer form. In 100 Shopify customer records, those signups carry `newsletter, prospect` and no `started-design` tag.
  - So editor visitors who give their email most likely get no email at all (not verified in Omnisend). Omnisend also cannot pick them out with a segment today.
- Image URLs (both live product photos) and the editor link return 200. `check.py copy` passes on both new files.
- Appended EFO-20261111-01 to `marketing/shared/experiments.md` (Result blank).

## Proposed for approval

### P-email-flow-optimizer-20261111-1
- Agent: email-flow-optimizer
- Executor: site-developer
- Type: site-change
- Draft: marketing/email/flow-optimizer/spec-started-design-event.md
- Reason: site-developer adds a small stand-alone script that tells Omnisend "started design" when someone with a known email uploads a photo in the editor. It is the only way to reach our highest-intent visitors, who get no email today, and it must be live before Black Friday (Nov 27) to matter.
- Expires: 2026-11-25
- Status: pending

The flow and email (`flow-started-design-no-cart.md`) are not proposed yet. I will propose them once the preview images render, at the latest Tuesday Nov 17. That is before the site event can be live, so nothing waits on it.

## Blocked or unknown
- Email preview: `email_preview.py` could not run under the default `python3` (3.11, f-string syntax error at line 550). Under `/usr/local/bin/python3.13` it wrote `-preview.html` and `-omnisend.html`, but headless Chrome hung on every screenshot, even a blank local page. It kept trying to reach google.com and android.clients.google.com, which the proxy blocks. So there are no PNGs yet and the design checklist is not done. This needs a fix to the tool (python version) or the environment (Chrome).
- How many editor visitors give their email each week is unknown: Shopify's customer count ignores the tag filter.
- Whether gate signups get any Welcome email: not verified in Omnisend.
- Unchanged from earlier runs: review count, delivery timing, replacements policy and Loox quote permission are unverified. The owner still needs to pick which of A-2026W45-017, A-2026W44-062 or A-2026W45-012 runs first (A-2026W44-062 lapses Nov 13).

## Sales impact
Nothing reaches customers until the owner approves. The site event is the long-lead step: once it is live, the flow can email every editor visitor who left an email and never reached the cart. Today these people get nothing, and they are the closest group to buying after cart abandoners. Expected effect: small but steady extra orders, about 1 per 50 emails if it does as well as Browse Abandonment does on clicks, through Black Friday and the Dec 15 order-by date. It addresses the weak point "draft orders and editor intent not converting". The quickest gain available is still an owner decision on the pending Welcome item A-2026W45-017.

## Next run
Tuesday 2026-11-17: re-render the flow email preview, run the checklist and propose the flow. Act on any approved item and report the flow numbers.
