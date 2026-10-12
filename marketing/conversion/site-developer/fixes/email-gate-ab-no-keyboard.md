# Site fix: one pop-up at a time after upload, and no keyboard popping open on phones

Built and tested by: site-developer (Jenny), 2026-10-12
Executor: site-developer
Audit: marketing/conversion/auditor/audit-2026-10-12.md (problem 2)
Experiment: CA-20261012-01 in `marketing/shared/experiments.md` (Wilson's test, built exactly to its decision rule)
Replaces Wilson's draft `marketing/conversion/auditor/site-changes/email-gate-defer-ab-test.md` (same test, now built and tested, plus the keyboard fix). Queue only this one.

## Problem

Right after a photo upload, a visitor meets two pop-ups in a row: "How would you like to design it?" and then the "Great photo! Let's save your design" email box. On a phone the email box takes focus by itself, so the keyboard opens over the design before the visitor has touched it. Phone add to cart is 4.8% of sessions in the last 7 days against 7.9% a year ago.

Both pop-ups are theme code, not an app: the choice sheet is `#designChoice` in `assets/memobrick.js` and the email box is `assets/memobrick-email-gate.js`, switched on from Theme settings ("Save-your-design email", `settings.email_gate_enabled` in `layout/theme.liquid`). So the theme can fix it.

## What changes (one file: `assets/memobrick-email-gate.js`)

1. **Keyboard fix, for everyone:** on phones and tablets (no mouse) the email box is no longer focused automatically, so the keyboard stays closed until the visitor taps the box. Desktop keeps the auto-focus.
2. **A/B test CA-20261012-01:** each browser is put in arm A or B at random (50/50) and kept there.
   - Arm A: today's email pop-up after "Design it myself" (now without the keyboard on phones).
   - Arm B: no email pop-up after upload. Only the small "Looking great! Save your progress?" card, after about 75 seconds of designing and a 4 second pause. No dark backdrop, no auto-focus, and the editor stays usable.
   - On upload, the arm is written to the cart as the attribute `ab_email_gate` (A or B), once per visit. It goes onto the order, so orders can be split by arm with read-only queries. Nothing is shown to the customer.
3. **Small layout fix in the slide-in card:** on a 390 px phone the "Save my design" button ran past the right edge of the card. It now fits. Arm B depends on this card, so it had to look right.

The choice sheet ("Design it myself / Let our artist design it") is unchanged: it routes people to the artist path, and changing it means editing the 500 KB editor script.

### Exact diff against the live theme (memobrick-theme-v25, file checksum 5a95f0f5d9c9c7f848a9c313210c36e9)

```diff
--- live assets/memobrick-email-gate.js
+++ fix assets/memobrick-email-gate.js
@@ -46,11 +46,34 @@
   const skippedBefore = Number(store.get(KEY_SKIP) || 0);
   if (skippedBefore && Date.now() - skippedBefore < SKIP_DAYS * 864e5) return;
 
-  let asks = 0;            // how many times we've asked on this visit
+  // A/B test CA-20261012-01. Arm A: today's popup right after upload.
+  // Arm B: no popup after upload, only the calm slide-in card later.
+  // The arm is kept per browser and written to the cart as the attribute
+  // "ab_email_gate" when a photo is uploaded, so orders can be split by arm.
+  let arm = store.get("mb_ab_gate");
+  if (arm !== "A" && arm !== "B"){ arm = Math.random() < 0.5 ? "A" : "B"; store.set("mb_ab_gate", arm); }
+  // Phones and tablets: never focus the email box by itself, so the keyboard
+  // does not open over the design. Desktop (mouse) keeps the auto-focus.
+  const FINE_POINTER = !!(window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
+
+  let asks = arm === "B" ? 1 : 0;   // arm B: the 1st-ask listener sees asks > 0 and stays quiet
   let open = false;        // something of ours is on screen
   let skippedAt = 0;       // when they skipped the 1st ask (this visit)
   let lastActive = Date.now(), activeSinceSkip = 0;
   const known = () => !!store.get(KEY_EMAIL);
+  document.addEventListener("memobrick:photo", () => {
+    // arm B: start the calm-ask clock at upload, as if the 1st ask had been skipped
+    if (arm === "B" && !skippedAt){ skippedAt = Date.now(); activeSinceSkip = 0; }
+    try {
+      if (sessionStorage.getItem("mb_ab_gate_sent") === arm) return;
+      sessionStorage.setItem("mb_ab_gate_sent", arm);
+    } catch (e){}
+    try {
+      fetch((CFG.root || "/") + "cart/update.js", { method: "POST", credentials: "same-origin",
+        headers: { "Content-Type": "application/json" },
+        body: JSON.stringify({ attributes: { ab_email_gate: arm } }) }).catch(() => {});
+    } catch (e){}
+  });
   // skipped the 1st ask earlier in this visit, then reloaded? carry on from there
   try {
     const s1 = Number(sessionStorage.getItem("mb_email_skip1") || 0);
@@ -162,8 +185,8 @@
     font-weight:600;margin:0 30px 4px 0;line-height:1.2}
   .mbeg-slide p{margin:0 0 10px;font-size:14px;color:var(--ink-2,#5E636C);line-height:1.4}
   .mbeg-slide form{display:flex;gap:8px}
-  .mbeg-slide input[type=email]{padding:11px 12px;font-size:16px}
-  .mbeg-slide .mbeg-go{padding:11px 14px;font-size:15px}
+  .mbeg-slide input[type=email]{padding:11px 12px;font-size:16px;flex:1 1 auto;width:auto}
+  .mbeg-slide .mbeg-go{padding:11px 14px;font-size:15px;flex:0 0 auto}
   .mbeg-slide .mbeg-x{top:6px;right:6px}
   .mbeg-slide .mbeg-err{margin-top:6px}
   @media (max-width:600px){
@@ -229,7 +252,7 @@
     const input = back.querySelector("input"), err = back.querySelector(".mbeg-err"),
           go = back.querySelector(".mbeg-go"), form = back.querySelector("form");
     const lastFocus = document.activeElement;
-    setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e){} }, 250);
+    if (FINE_POINTER) setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e){} }, 250);
 
     function close(dismissed){
       open = false;
```

Full new file: `marketing/conversion/site-developer/theme-files/email-gate-ab-no-keyboard/assets/memobrick-email-gate.js` (md5 851b9041af3a1e33c16102520c3b92e9). It is the file now in the "Memobrick fixes" theme.

## Preview

https://mymemobrick.com/?preview_theme_id=188594847964

To see a given arm in the preview: open the browser console and run `localStorage.setItem("mb_ab_gate","B")` (or `"A"`), also `localStorage.removeItem("mb_email")`, then reload `/pages/editor`. Anyone who already gave an email, or dismissed the second ask in the last 3 days, sees no ask in either arm (unchanged).

## What was tested (Playwright, Chromium, preview of theme 188594847964, generated flower image, never a real photo)

| Check | Phone 390×844 | Desktop 1440×900 |
|---|---|---|
| Before (live code): email pop-up opens with the email box focused | yes, box focused (keyboard would open) | yes, focused |
| Arm A: email pop-up after "Design it myself" | shown, box **not** focused | shown, box focused (unchanged) |
| Arm B: no pop-up after "Design it myself" | none | none |
| Arm B: calm slide-in after ~80 s of activity and a pause | shown, not focused, button fits | not run (same code path) |
| Finish Editing adds to cart, drawer opens | A 2.5 s, B 2.5 s | A 3.1 s, B 3.0 s |
| `/cart.js` attributes | `ab_email_gate: A` / `B` | `ab_email_gate: A` / `B` |
| Page errors from the theme | none (only blocked third-party hosts in this sandbox) | none |

No email was entered, no checkout was opened, nothing was paid or ordered. The headless browser cannot draw a real phone keyboard, so the keyboard check is "is the email box focused when the sheet opens" (the browser opens the keyboard on focus).

Screenshots (`marketing/conversion/site-developer/2026-10-12-email-gate-ab-no-keyboard/`):

- `phone-before-email-gate-focused.jpg`: today, focused email box.
- `phone-after-armA-email-gate-not-focused.jpg`: arm A, same sheet, box not focused.
- `phone-after-armB-no-popup.jpg`: arm B, straight into the editor.
- `phone-after-armB-calm-slide-in.jpg`: arm B, the calm card later.
- `phone-after-armB-cart-drawer.jpg`: Finish Editing still adds to cart.
- `desktop-before-email-gate.jpg`, `desktop-after-armA-email-gate.jpg`, `desktop-after-armB-no-popup.jpg`, `desktop-after-armB-cart-drawer.jpg`.

## Expected effect

Every phone editor user stops getting the keyboard over their design, and half of editor users get one pop-up instead of two. Wilson's estimate: about 10 to 20 more orders per 30 days if the pop-ups explain half of the phone add-to-cart gap. The test tells us which version brings more orders before Black Friday.

## Decision rule (from CA-20261012-01)

- End: 2026-11-15, or earlier once 60 orders carry `ab_email_gate`. Before 2026-11-16, keep one version (a one-line change: `let arm = "A"` or `"B"`), proposed as a new item.
- Adopt B if B has at least 25% more orders than A with at least 50 orders in total. Keep A if A has as many or more. Anything else is inconclusive: keep A.
- Guardrail: if arm B cuts new `started-design` customers by more than half and is not ahead on orders after 3 weeks, stop the test.

## How it will be applied, once approved

1. Save the live `assets/memobrick-email-gate.js` to `marketing/conversion/site-developer/backups/<date>-email-gate-ab-no-keyboard/`.
2. Check the live file still has checksum 5a95f0f5d9c9c7f848a9c313210c36e9. If not, rebuild on the new live file and propose again.
3. Write the new file to the live theme. The Shopify connector refuses writes to the live (MAIN) theme, so this step may need the owner: Shopify admin, Online Store, Themes, live theme "..." menu, Edit code, `assets/memobrick-email-gate.js`, select all, paste the full new file above, Save.
4. Check the live store on phone and desktop (arm A and arm B) as in the table above.

## How to undo

Paste back the backup file (or the live version in git history: checksum 5a95f0f5d9c9c7f848a9c313210c36e9) into `assets/memobrick-email-gate.js` and save. Or, to switch off the email pop-up fully in an emergency: Theme settings, "Save-your-design email", turn it off. The cart attribute does nothing on its own, so leftover values on carts are harmless.
