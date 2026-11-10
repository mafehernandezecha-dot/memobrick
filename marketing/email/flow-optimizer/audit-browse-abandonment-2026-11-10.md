# Browse Abandonment audit, 2026-11-10 (read-only)

Flow 6849ac10fc8fa3391d8f7b94, enabled. Trigger: viewed product (Shopify, in-stock only). Delay 2 hours, one email. Exits on placed order or added product to cart. Once per day per contact.

| Window | Sent | Opens (unique) | Clicks (unique) | Orders | Revenue | Unsubs | Spam |
|---|---|---|---|---|---|---|---|
| Last 90 days | 120 | 54 | 20 | 1 | $149.00 | 0 | 0 |
| Since 2026-09-28 | 79 | 40 | 19 | 1 | $149.00 | 0 | n/a |

Click rate is 24% of sent since Sep 28, the best of any recovery email. Purchases per sent email: 1 in 79 (1.3%). Revenue per sent: $1.89.

## The email (content 6849ac102dd209c95c25824b)
- Subject: "[first name], see your photo in bricks (free)". Button goes to /pages/editor (good: not the cart). Dynamic product block is a placeholder block (title and price fill in at send).
- Preheader claims "Rated 4.8 by 740+ customers" (unverified).
- Body claims not backed by the Facts table: "4.8 from 740+ verified reviews", "As seen on Fox News, NBC and Yahoo", "Ships in 2-4 days", "Free replacements ... for life", "Nothing is made until you approve", three named quotes (Emily T., Michael R., Hope E.) with star ratings, a fourth named quote (Sean P.) in the dark panel, "Read all 740+ reviews".
- Good: free-proof offer with its own button (free-preview#proofForm) is an owner-confirmed offer; but this is a second destination, so two actions.
- No Dec 15 gift date.

## Editor-visitor flow (task board question)
- None exists. No Omnisend flow triggers on "started the editor" or a photo upload.
- The only site event sent to Omnisend is "added design to cart" (assets/memobrick-omnisend-design.js); the old flow on it is disabled. The email gate identifies a contact only if the visitor types an email.
- The browse flow is the closest proxy: it fires on product page views and sends people to the editor. Its 24% click rate shows the editor link works.
- To email editor visitors who never reached the cart, the site would first need to send an event (for example on the existing "memobrick:photo" browser event) for contacts who gave an email. That is a site change for site-developer, then a flow I would propose. Anonymous visitors cannot be emailed.

## Suggested next step (not proposed today)
A clean, designed version of this email (same trigger and button, claims removed, kit contents, Dec 15, free proof as text link to the same editor-first path) would be a fourth compliance fix. Three are already pending (A-2026W44-062, A-2026W45-012, A-2026W45-017) and only one runs at a time, so I did not add it to the queue.
