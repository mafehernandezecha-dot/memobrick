# Test: Abandoned Cart email 1, clean and designed version vs live version

Experiment ID: EFO-20261103-01. Status: proposed, not started. Sequenced after EFO-20261027-01 (Checkout email 1): only one flow test runs at a time.

## Where

- Flow: Abandoned Cart (3 emails, 20% in last), Omnisend ID 64e86fedc0c2565cbe9d8ac8
- Email: first email, 2 h after the last cart add, content ID 64e86fed3e80b6e748f5b7cd (send block 64e86fedc0c2565cbe9d8ad0)
- Why this email: it is the first thing every cart abandoner sees (47 sent and 4 unique clicks in 2026-09-28 to 2026-11-02, 0 orders) and the warmest lost buyer pool. Cart email 3 (35 sent, 1 order, $699.15) is left alone because it is the only one that has converted.

## Hypothesis

Shoppers who add a kit to the cart leave because of doubt about what arrives and whether it looks right, and the live email answers with claims we cannot back up. Showing the finished keepsake, listing what is in the kit, giving the true Dec 15 gift deadline and offering real help brings more of them back.

## The one variable

The content below the headline: live trust blocks (4.8 from 740+ reviews, "As seen on Fox News, NBC and Yahoo", three promise tiles, named quote) and the older layout, against the clean designed version. Same in both: send timing, sender, the personalized saved-design block, the cart link, the footer. The Dec 15 line is part of the clean version.

Honest note: before/after read, not a split. About 45 sends a month cannot support a 50/50 split in any useful time.

## Audit of the three live cart emails (2026-11-03)

| Email | Subject | First screen | Dec 15 | Problems |
|---|---|---|---|---|
| 1 | `your mosaic is saved` | Headline "Your photo is one step from the wall." and saved-design image | No | 740+ reviews, Fox/NBC/Yahoo, "Ships in 2-4 days from Miami", "Free replacements for life", "Free proof first, nothing is made until you approve", named quote Michael R. All CTAs go to plain /cart (works only in the browser that holds the cart). Three CTAs. |
| 2 | `here's how it looks finished` | Family photo, "They started exactly where you are." | No | Gallery captioned "Real Memobrick customers" (are these the planner or AI images? if AI, this presents them as real customers), three named quotes, 740+ reviews twice, "a real Memobrick designer will build your mosaic". |
| 3 | `20% off your Memobrick (3 days)` | Family image, "Here's 20% off to finish it.", code | No | 740+ reviews, "made and shipped from Miami within 2-4 business days", replacements "for as long as you own the kit", named quote Tiffany S., designer-proof block. The 20% offer itself is active in the offers calendar. |

## Original copy (control, live today)

Subject: `[[contact.first_name|default:"Hey"]], your mosaic is saved 🧱`

Preheader: `It's exactly as you left it. Finish your order in one click.`

Headline: `Your photo is one step from the wall.`

Body: `Hi [[contact.first_name|default:"there"]], we saved your design exactly as you left it. Finish your order and every brick, baseplate and your personal guide arrives in one box.`

Then: saved-design block, button `Finish my order`, ratings line, Fox/NBC/Yahoo line, three promise tiles, cart product block, quote, kit list, editor block, reply line, footer.

## New copy (variant)

Subject: `[[contact.first_name|default:"Hey"]], your mosaic is still saved`

Preheader: `It's exactly as you left it. Finish whenever you're ready.`

Headline: `Your photo is one step from the wall.`

Full designed layout and copy: `test-cart-first-email-clean-base-draft.md` with its previews. Button: `Finish my mosaic`, same cart link as today.

## Audience split

None. Before/after: the new version replaces email 1 for everyone who enters the flow, read against the 2026-09-28 to 2026-11-02 baseline above (47 sent, 4 clicks, 0 orders).

## Primary metric

Attributed purchases per sent email, email 1.

## Guardrails

Unsubscribes above 1% (50+ sent), complaints at 2, any rise in cart-flow revenue loss (email 2 and 3 orders must not fall).

## Minimum run time and decision rule

4 weeks and 100 sent. Adopted if at least 2 purchases and no guardrail breached; otherwise inconclusive but kept as a compliance fix. Starts after EFO-20261027-01 has read, or earlier if the owner says both may run (different flows, different emails).
