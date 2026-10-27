# Test: Abandoned Checkout email 1, clean and designed base vs live version

Experiment ID: EFO-20261027-01. Status: proposed, not started. Replaces the expired cart test EFO-20261011-01 (see reason below).

## Where

- Flow: Abandoned Checkout (3 emails, 20% in last), Omnisend ID 68ecddff00915ec475c65e01
- Email: block 59841a953e40551380000002 (first email, 1 hour after checkout starts), content ID 68ecddff3b316d7f2dde6793
- Why this email: it has the most volume of any recovery email (64 sent in the last 29 days, 3 unique clicks, 0 orders), it carries five claims the brand rules do not allow, and it is the first thing a person who already created a design sees. The cart last email now has 28 sends per 4 weeks and one attributed order ($699.15), so replacing it would remove the one recovery email that has converted.

## Hypothesis

People who start checkout with their own design already want it. They leave because of doubts (is this safe, what arrives, will I get help), not price. An email that shows the finished keepsake, lists what is in the kit, and offers real help gets more of them back than the live email, whose trust blocks contain claims we cannot back up.

Baseline (2026-09-28 to 2026-10-27, Omnisend): 64 sent, 3 unique clicks (about 5%), 0 attributed orders, 0 unsubscribes, 0 complaints.

## The one variable

The content of the email below the headline: the live trust blocks (ratings line, "As seen on Fox News, NBC and Yahoo", three promise tiles, named quote) against the clean, designed version. Kept the same in both: send timing, sender, the personalized saved-design image block, the checkout link, the footer.

Honest note: this is a before/after read, not a split. At about 2 sends a day a 50/50 split needs about 100 days for 100 per arm, and Omnisend does not let an enabled flow be edited, so a split also means switching the flow off. The recommended read is 4 weeks of the new version against the 29-day baseline above.

## Live claims removed from the control (owner list)

All of these are in the live email today and are not allowed by `memobrick-brand`:

1. "4.8 from 740+ verified reviews" (count unverified, and the number varies across the site).
2. "As seen on Fox News, NBC and Yahoo" (only "As seen on FOX" is allowed; NBC and Yahoo are not confirmed).
3. "Ships in 2-4 days, from Miami, tracked, after approval" (Miami is verified, the 2-4 day timing is not in the Facts table).
4. "Free replacements, any missing brick, for life" (lifetime promise unverified).
5. "Nothing is made until you approve" and the free proof phrased as a standard step (the proof is optional, never required).
6. The quote "Erica H., verified buyer, 16x16" (no permission file; allowed only if it is a public Loox review, which the owner must confirm).

## Original copy (control, live today)

Subject: `[[contact.first_name|default:"Hey"]], finish your Memobrick in 1 minute`

Preheader: `Your design and checkout are saved. Pick up right where you stopped.`

Headline: `One step left.`

Body: `Hi [[contact.first_name|default:"there"]], you were at checkout with your design ready to go. It's all saved, so finishing takes about a minute.`

Then: saved-design image block, button `Finish checkout`, ratings line, Fox/NBC/Yahoo line, three promise tiles, "In your checkout" product block, customer quote, "Everything arrives in one box" list, reply line, footer.

## New copy (variant)

Subject: `[[contact.first_name|default:"Hey"]], your design is still saved`

Preheader: `Pick up right where you stopped. It takes about a minute.`

Headline: `Your photo is one step from the wall.`

Body: `Hi [[contact.first_name|default:"there"]], you were at checkout with your design ready to go. It's all saved, so finishing takes about a minute.`

Full designed layout, copy and images are in `test-checkout-first-email-clean-base-draft.md` (with its previews).

Button: `Finish my mosaic` (link: the existing checkout link `[[event.raw.abandoned_checkout_url]]`)

Closing line: `Questions about your photo or size? Just reply. A real person reads every email.`

No offer, no code, no review count, no press line, no timing promise.

## Audience

Everyone entering the Abandoned Checkout flow. No split. Email 2 and email 3 are untouched (email 2 also has unverified claims, listed in review-2026-10-11.md; it is not changed in this test so the read stays clean).

## Primary metric

Attributed purchases per delivered email, email 1 (post_analytics_reports by messageID), new version vs the 64-sent baseline.

## Guardrails

- Unsubscribes: stop if above 1% with at least 50 sent.
- Complaints: stop at 2.
- Flow revenue per entrant (emails 1 to 3 together) so a gain in email 1 is not just stolen from emails 2 and 3.

## Minimum run time

4 weeks and at least 100 sent. At about 2 sends a day that is 50 days; holiday traffic may shorten it. Say plainly that 0 orders versus 1 or 2 orders is within noise.

## Decision rule

After 100 sent:
- Adopted: purchases per sent are at least the baseline (0) and at least 2 purchases, with no guardrail breached.
- Reverted: unsubscribes or complaints guardrail breached.
- Otherwise: inconclusive; keep the new version anyway because it removes the unverifiable claims (a compliance fix, not a win).

No winner is named before 100 sent.

## How it is applied after approval

The flow is enabled and cannot be edited in place. After approval: disable the flow, replace the content of email 1 (new template with the custom HTML block from `-omnisend.html`, keeping the personalized saved-design block), re-enable with contacts in the flow kept. About 30 seconds off.
