# Site change (A/B test): Ask for the email later, not right after upload

Proposed by: conversion-auditor, 2026-10-12
Executor: seo-technical
Experiment: CA-20261012-01 in `marketing/shared/experiments.md`
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 2)

## Problem (seen on the live site, phone and desktop)

Right after a visitor uploads a photo, they meet two pop-ups in a row before they can touch their design:

1. "Your photo is ready. How would you like to design it?" (Design it myself / Let our artist design it).
2. Straight after "Design it myself": "Great photo! Let's save your design 🎨" with an email box, a "Start designing" button and a small "Skip for now" link.

On a phone, the email box is focused when the sheet opens, so the keyboard would cover half the screen. Screenshots: `marketing/conversion/auditor/2026-10-12/phone-20x20-04-upload-photo.jpg`, `phone-20x20-05-choose-design-myself.jpg`, `desktop-check-email-gate.jpg`.

Phone add-to-cart is down: 4.8% of phone sessions in the last 7 days, against 7.9% a year ago, and 5.5% of referred phone sessions in 30 days, against 6.9%. The gate is a likely cause, but it also collects emails for design-recovery messages. That is why this is a test and not a straight removal.

## What changes

`assets/memobrick-email-gate.js` already has a calm second ask: a small slide-in card shown after about 75 seconds of designing, when the visitor pauses, or on desktop exit intent. The test splits visitors 50/50:

- **A (control):** today's behaviour, with the popup right after upload.
- **B (variant):** no popup after upload. Only the calm second ask, which then counts as the visitor's first and only ask.

### `assets/memobrick-email-gate.js`

**Before:**

```js
  let asks = 0;            // how many times we've asked on this visit
  let open = false;        // something of ours is on screen
  let skippedAt = 0;       // when they skipped the 1st ask (this visit)
```

**After:**

```js
  // A/B test CA-20261012-01: arm B skips the popup after upload and only uses the calm slide-in ask.
  let arm = store.get("mb_ab_gate");
  if (arm !== "A" && arm !== "B"){ arm = Math.random() < 0.5 ? "A" : "B"; store.set("mb_ab_gate", arm); }
  try {
    fetch((CFG.root || "/") + "cart/update.js", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attributes: { ab_email_gate: arm } }) });
  } catch (e){}
  let asks = arm === "B" ? 1 : 0;   // arm B: the "1st ask" listener sees asks > 0 and stays quiet
  let open = false;                 // something of ours is on screen
  let skippedAt = 0;                // when they skipped the 1st ask (this visit)
  // arm B: start the calm-ask clock when the photo is uploaded, as if the 1st ask had been skipped
  if (arm === "B") document.addEventListener("memobrick:photo", () => { if (!skippedAt) skippedAt = Date.now(); });
```

The cart attribute `ab_email_gate` (A or B) ends up on every order, so orders can be split by arm with read-only Admin queries (`customAttributes` on the order). Nothing is shown to the customer.

The "1st ask" listener (`memobrick:photo`) already returns early when `asks > 0`, so arm B never sees the popup. The calm-ask timer (`secondAskAllowed()`) needs `skippedAt` set and `asks === 1`, which arm B meets once a photo is uploaded. Also check that the `sessionStorage "mb_email_skip1"` carry-over and the 3-day quiet period after a dismissal still work. Arm B asks at most once per visit.

## Decision rule

- **Start:** the day it is released. **End:** 2026-11-15, or earlier once 60 orders in total carry the attribute. Turn the test off before the Black Friday period starts on 2026-11-16 so that period runs on one known version.
- **Primary metric:** orders per arm (orders with `ab_email_gate` = A or B). The 50/50 random split gives both arms the same traffic.
- **Adopt B** if B has at least 25% more orders than A and there are at least 50 orders in total.
- **Keep A** if A has as many orders as B, or more.
- Anything in between is **inconclusive**. Keep A, because it collects more emails for recovery.
- **Guardrails:** new emails captured per week (Shopify customers tagged `started-design`) and abandoned-cart flow revenue in Omnisend. If arm B cuts captured emails by more than half and is not ahead on orders after 3 weeks, stop the test.

## Before you apply

Pull the live `memobrick-email-gate.js` first. On a duplicate theme, use a private window to confirm each of these:

- Arm A shows the popup after upload.
- Arm B shows no popup and shows the slide-in after about 75 seconds of activity followed by a 4 second pause.
- `/cart.js` shows `attributes.ab_email_gate`.

Clear `mb_ab_gate` from localStorage to switch arms. Stop at the checkout page.
