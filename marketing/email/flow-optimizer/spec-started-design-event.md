# Site event spec: "started design" to Omnisend

Owner of this spec: email-flow-optimizer. Executor once approved: site-developer.
Pairs with the flow draft `marketing/email/flow-optimizer/flow-started-design-no-cart.md` (a separate approval item, executor email-flow-optimizer). The flow stays off until this event is live and seen in Omnisend.

## Why

People who upload a photo in the editor are the highest-intent visitors we have, and today they get no email unless they reach the cart. The editor's "Save your design" popup (`assets/memobrick-email-gate.js`) already collects their email, but it only creates a Shopify customer with the generic tags `newsletter, prospect` (checked in Shopify on 2026-11-11: in 100 customer records, signups carry `newsletter, prospect` and none carries the `started-design` tag the popup's settings name), so Omnisend cannot tell an editor visitor from a footer signup. The Welcome flow only triggers on two Omnisend signup forms, so these contacts most likely get no email at all (not verified in Omnisend).

## What to build

A small stand-alone script, for example `assets/memobrick-omnisend-started.js`, built like the existing `assets/memobrick-omnisend-design.js` (same `omnisend.push(["track", ...])` call, same `uid()`, same "never affect the editor" try/catch).

1. **When it fires.** Send the Omnisend custom event `started design` once per browser session (sessionStorage key `mb_started_sent`) when both are true:
   - a photo has landed in the editor (the editor's existing `memobrick:photo` browser event, dispatched in `memobrick.src.js`), and
   - the visitor's email is known: `CFG.customerEmail` (logged in) or `localStorage.mb_email`.
   Because the popup asks for the email right after the photo, also listen for the moment the email gate saves an email (after `store.set("mb_email", ...)` succeeds in `memobrick-email-gate.js`; the cleanest way is for the gate to dispatch a new browser event `memobrick:email` with no personal data in `detail`) and fire then if a photo already landed this session.
2. **Payload.**
   ```js
   window.omnisend.push(["track", "started design", {
     origin: "api",
     eventID: uid(),
     eventTime: new Date().toISOString(),
     contact: { email: knownEmail() },
     properties: {
       editorURL: "https://mymemobrick.com/pages/editor?size=20x20#editor",
       size: currentSizeOrEmpty,      // the editor's selected size label if easy to read, else ""
       source: "editor"
     }
   }]);
   ```
   No photo, no design image, no name. The customer's photo never leaves the editor through this event.
3. **Switch.** A theme setting "Omnisend started-design event" (`window.MB_OMNISEND_STARTED.enabled`), default off. Turn it on when publishing.
4. **Never.** Block or slow the editor, the upload, the popup, or add to cart. If `window.omnisend` is missing or the email is unknown, do nothing.

## How to check it worked

- In a private window: open `/pages/editor?size=20x20#editor`, upload a test photo, give a test email in the popup. Within a few minutes the event `started design` shows on that test contact in Omnisend (Audience, contact profile, activity).
- Reload and upload again in the same session: no second event.
- Editor upload, popup, and add to cart work exactly as before on phone and desktop.
- Report the theme ID, the backup path, and the time the first real event appeared.

## Out of scope

No change to the cart, checkout, order emails, or the existing "added design to cart" event.
