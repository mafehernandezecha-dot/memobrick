# Test: Welcome email 1, claims-fix version vs live version

Experiment ID: EFO-20261105-01. Status: proposed, not started. One flow test at a time: it runs after the owner chooses its order against EFO-20261027-01 (Checkout) and EFO-20261103-01 (Cart). My recommendation is to run this one first (see "Why first").

## Where

- Flow: Welcome for memobrick, Omnisend ID 614cb885f5765e001ced4218 (enabled, once per contact, exits on order)
- Email: first email, sent immediately, content ID 63d8b9065841937e196a9da8 (send block 614cb885f5765e001ced421c)
- Why this email: it is the only recovery or welcome email that sells. 90 days: 181 sent, 49 unique opens, 10 unique clicks, 14 attributed orders, $1,262.01, 1 unsubscribe, 0 complaints. Since the 2026-09-28 edit: 82 sent, 4 unique clicks, 12 attributed orders, $1,110.83. Attributed orders exceed clicks, so some are view-through or code use without a tracked click; read the trend, not the exact rate.

## Why first

It holds the biggest dollar exposure to claims we cannot back up, and it is also the email most worth protecting. So the change is the smallest one possible: the layout, subject, code, images and size cards stay; only the unverified lines come out.

## Hypothesis

Removing the unverifiable trust lines and adding two true ones (the Dec 15 gift deadline, the code terms) does not lower welcome purchases, and the Dec 15 line lifts them for gift buyers in the November and December rush.

## The one variable

Trust and promise content below the code: live claims against true replacements. Same in both: subject, preheader, headline, personalised code block (20%, valid 7 days), buttons and links, camera-roll image, gift-ideas image, price cards (prices re-checked 2026-11-05), photo tips, footer.

## Live claims found (list for the owner)

| Where | Live text | Status in the brand skill |
|---|---|---|
| Email 1, trust row | "4.8 from 740+ verified reviews" | Count unverified |
| Email 1, trust row | "As seen on Fox News, NBC and Yahoo" | Only FOX 4 gift guide 2022 is confirmed; "Fox News", NBC, Yahoo not allowed |
| Email 1, tiles | "Ships in 2-4 days, from Miami, tracked, after approval" | Miami verified; 2-4 days timing not |
| Email 1, tiles | "Free replacements, any missing brick, for life" | Not verified |
| Email 1, tiles | "Free proof first, nothing is made until you approve" | Proof is optional; "nothing is made" wording not verified |
| Email 1, quote | "Out with traditional family photos..." Hope E., verified buyer | No recorded permission (approved-stories.md missing) |
| Email 1, size cards | "Our most-loved size" and similar labels | Unsupported superlative |
| Email 2 (not touched by this test) | Hope-style named quote Stephanie T., "740+", gallery labelled "Real Memobrick customers", Sean P. quote | Same problems; image gallery may be planner or AI images |
| Email 3 (not touched) | 740+ reviews, "2-4 business days", replacements "for as long as you own the kit", Tiffany S. and Sean P. quotes | Same problems |
| All 3 | 20% welcome code | Not listed in offers-calendar.md. The owner should list it as active (ongoing, Omnisend-generated, 7 days, 4 days, 2 days) |

## Original copy (control, live today)

Subject: `[[contact.first_name|default:"Welcome"]], your 20% off is inside 🎁`

Preheader: `Turn any photo into brick art you build at home. Code inside, valid 7 days.`

Headline: `Welcome, [[contact.first_name|default:"friend"]]. Here's 20% off.`

Body: `Turn your favorite photo into a brick mosaic you build at home. Design it online in minutes and see it instantly.`

Then: code block with `Use my 20% off`, "4.8 from 740+ verified reviews", "As seen on Fox News, NBC and Yahoo", camera-roll image, `Start designing`, free proof link, "Who will you make one for?" image, price cards ("The perfect first build", "Our most-loved size", "A family statement piece", "Go big for the whole crew"), 3 photo tips, Hope E. quote, three promise tiles, `Use my 20% off`, reply line, footer.

## New copy (variant)

Subject: `[[contact.first_name|default:"Welcome"]], your 20% off is inside 🎁`

Preheader: `Turn any photo into brick art you build at home. Code inside, valid 7 days.`

Headline: `Welcome. Here's 20% off.`

Body: `Turn your favorite photo into a brick mosaic you build at home. Design it online in minutes and see it instantly.`

Button: `Use my 20% off`

Closing line: `Every kit has 1×1 bricks in 40+ colors, the baseplates for your size, a printed color map and the tool. Giving it as a gift? Order by December 15 to have it before Christmas.`

Full layout and copy: `test-welcome-first-email-claims-fix-draft.md`. Price cards say pieces and building time (2,500 / 4,096 / 9,216 / 12,288 pieces; about 2.5 / 4 / 9 / 12 hours) in place of the superlative labels. P.S. adds: "One code per order. It can't be combined with other offers or free shipping."

## Audience split

None. Before/after: the new version replaces email 1 for everyone entering the flow, read against 2026-09-28 to 2026-11-05 (82 sent, 4 clicks, 12 attributed orders, $1,110.83, 0 unsubscribes).

## Primary metric

Attributed purchases per sent email, email 1.

## Guardrails

Unsubscribes above 1% (50+ sent), complaints at 2, welcome flow revenue (email 2 and 3 orders must not fall), discount cost (code stays 20%, unchanged).

## Minimum run time and decision rule

About 82 sent per 5 weeks at current volume, so 100 sent takes about 6 weeks. Adopted if purchases per sent are at least 50% of baseline and no guardrail is breached; this is a compliance fix, so a flat result also stays. Revert to the old layout only if purchases per sent fall under half of the baseline after 100 sent. Under 100 sent is inconclusive. No winner is named before the rule is met.

## Not in this test

Subject, the code, the first screen (a wall hero image is a later test), emails 2 and 3 (their claims are listed above for the owner).
