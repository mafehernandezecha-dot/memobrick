# Approval queue

Written by the marketing-coordinator only. To decide, edit each `Status:` line to `approved`, `rejected`, or `changes: <your note>`.

Updated 2026-10-14. Added A-2026W42-021 (new cart page) and -022 (desktop sticky bar on theme v27) from site-developer; they replace -012, -008 and -011. Seven items expiring by Oct 21 moved to Time-sensitive. Items with a `- Flag:` line need the check it names before you approve. Details in `marketing/coordination/coordinator/overlaps-2026-10-14.md`.

## Needs your attention

Nothing needs a Status fix. The checker now lists A-2026W41-003 (social-publisher) and A-2026W41-012 to 016 (seo-technical) as actionable, so the earlier "draft changed" note is cleared. They are approved and waiting for their agents. A-2026W41-011 was published on 2026-10-14 and moved to the archive.

## Time-sensitive

(Items expiring within 7 days, highest expected sales impact first.)

## A-2026W42-018
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-search-terms-2026-10-13.md
- Commit: cc3b0de
- Reason: Google search terms cleanup: blocks non-converting LEGO and freebie searches, pauses 5 keywords with spend and no sales, adds gift and product keywords to Holiday Gifts and old brand names to the brand campaign. No budget or bid changes. Applied by the owner's Mac via chrome-tasks/2026-10-13-search-terms.md.
- Expires: 2026-10-20
- Status: approved
- From: Owner approval in chat 2026-10-13 ("delete the ones not working and add new ones based on your analysis")

## A-2026W42-019
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-gift-page-and-code.md
- Commit: cc3b0de
- Reason: Holiday Gifts ads point to the gift collection page (6.3% checkout last holiday) and add the live EARLYHOLIDAY20 headline. No budget change. Applied by the owner's Mac via chrome-tasks/2026-10-13-holiday-gifts-gift-page-and-code.md.
- Expires: 2026-10-20
- Status: approved
- From: P-ads-analyst-20261013-1 (owner approved in chat 2026-10-13)

## A-2026W42-020
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-conversion-call-actions-secondary.md
- Commit: cc3b0de
- Reason: Sets the 2 old Smart campaign call conversions to secondary so Purchase is the only primary conversion before the holidays. Applied by the owner's Mac via chrome-tasks/2026-10-13-conversion-call-actions-secondary.md.
- Expires: 2026-10-20
- Status: approved
- From: P-ads-analyst-20261013-2 (owner approved in chat 2026-10-13)

## A-2026W42-023
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Commit: 26c0214
- Reason: Commission-only pitch to Green Wedding Shoes (Collabs 10% commission and 10% code, no free kit). If approved, a Gmail draft is created in memobrickofficial@gmail.com for Eden to send, using the address on their contact page.
- Expires: 2026-10-22
- Status: approved
- From: Owner decision in chat 2026-10-14 ("commission only"), after the audience-fit score of 3

## A-2026W42-001
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pmax-remove-invalid-code-and-claims.md
- Commit: aee1580
- Reason: If approved, ads-analyst unlinks 19 assets from PMax #2 asset groups (EARLYHOLIDAY20, which does not exist in Shopify, the unlisted 20% sale, LEGO trademark and unsupported claims) so shoppers stop failing a code at checkout.
- Expires: 2026-10-17
- Status: approved
- From: P-ads-analyst-20261012-1
- Note: Removes an invalid code; it does not add one. If you would rather create EARLYHOLIDAY20 in Shopify and list it as active in offers-calendar.md first, the draft explains the `changes: keep code rows` option.

## A-2026W42-007
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/improve-oct20-early-bird.md
- Commit: d52dbf5
- Reason: Edits the scheduled Omnisend campaign "Q4 | Oct 20 | Early Bird 15%" (about 5,000 Warm contacts): restores it to draft, swaps in the 20% EARLYHOLIDAY20 version, and reschedules it for the same time (Tue Oct 20, 11:00 ET).
- Expires: 2026-10-19
- Status: approved
- From: P-email-campaign-writer-20261013-1
- Note: This improves one of your existing Omnisend campaigns. EARLYHOLIDAY20 is active in offers-calendar.md, but its end date is unconfirmed; the draft states no end date. If the code will end before Oct 20, do not approve and tell the coordinator the end date. The Oct 27 'LAST CALL 15%' campaign still needs the same decision.

## A-2026W42-009
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/home-phone-cta-above-fold.md
- Commit: d33ffe8
- Reason: If approved, site-developer saves a backup and puts the tested home page change on the live theme so phone visitors see "Create My MemoBrick" and "Kits from $35" without scrolling.
- Expires: 2026-10-19
- Status: approved
- From: P-site-developer-20261012-2
- Note: Site-developer rates this and the email pop-up fix above the desktop bar fix for orders (its estimate: 10 to 20 and 5 to 15 a month). Owner may need to paste 17 lines.

## A-2026W42-008
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar.md
- Commit: 15912ed
- Reason: If approved, site-developer saves a backup and puts the tested change on the live theme's memobrick.js so desktop visitors see the price and Finish Editing after upload (desktop add to cart 5.1% vs 8.0% last year).
- Expires: 2026-10-20
- Status: approved
- From: P-site-developer-20261013-1
- Note: This is the built and tested version of A-2026W42-011 (same fix). Approve this one, not both. Owner may need to paste two edits. Stale: built on the old theme and would overwrite v27 changes. Superseded by A-2026W42-022.

## A-2026W42-010
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/email-gate-ab-no-keyboard.md
- Commit: d33ffe8
- Reason: If approved, site-developer saves a backup and puts the tested email pop-up change on the live theme: phones stop opening the keyboard over the design, and A/B test CA-20261012-01 starts in time to finish before Black Friday.
- Expires: 2026-10-19
- Status: approved
- From: P-site-developer-20261012-1
- Note: The test writes an `ab_email_gate` attribute to the cart (carried onto the order for reporting only). It changes no order email, fulfillment or checkout step, so it was not dropped. Owner may need to paste one file.

## A-2026W42-021
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/cart-design-delivery-shipping.md
- Commit: a2138ea
- Reason: If approved, site-developer backs up and applies the new cart page (customer's mosaic, hidden internal fields, Dec 15 line, shipping estimator with real carrier rates, $125 free-shipping message) and the cart drawer image edit to the live theme; cart to checkout should improve.
- Expires: 2026-10-21
- Status: approved
- From: P-site-developer-20261014-1
- Note: Replaces A-2026W42-012 (auditor's cart draft). Approve this one only. Shipping wording matches the Facts table (checked 2026-10-12). Display only; it changes no checkout step, order email or fulfillment.

## A-2026W42-022
- Agent: site-developer
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/site-developer/fixes/desktop-editor-sticky-topbar-v27.md
- Commit: a2138ea
- Reason: If approved, site-developer backs up and applies the sticky price and Finish Editing bar on desktop to the live memobrick.js (rebuilt on theme v27); desktop add to cart is 5.1% vs 8.0% last year.
- Expires: 2026-10-21
- Status: approved
- From: P-site-developer-20261014-2
- Flag: Replaces A-2026W42-008 and A-2026W42-011, whose files would overwrite v27 changes. Approve this one only and reject the other two.

## A-2026W42-002
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-holiday-gifts-rsa-copy-fix.md
- Commit: aee1580
- Reason: If approved, ads-analyst replaces the text of the 2 Holiday Gifts search ads so they stop promising code EARLYHOLIDAY20, keeping the verified Dec 15 order-by date.
- Expires: 2026-10-17
- Status: approved
- From: P-ads-analyst-20261012-2

## A-2026W42-003
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pause-nonbrand-photo-to-brick.md
- Commit: aee1580
- Reason: If approved, ads-analyst pauses Google NonBrand Photo-to-Brick (24319578231): $139.89 in 7 days, 0 conversions, LEGO-brand queries; saves about $20 a day.
- Expires: 2026-10-17
- Status: approved
- From: P-ads-analyst-20261012-3

## A-2026W42-005
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-cut-alwayon-promo-v1-budget.md
- Commit: aee1580
- Reason: If approved, ads-analyst lowers Meta ALWAYON PROMO -v1 (120252425110090597) from $40 to $20 a day; Shopify ROAS 1.09 over 28 days and 0.69 last week.
- Expires: 2026-10-17
- Status: approved
- From: P-ads-analyst-20261012-5

## A-2026W42-004
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/google-pmax-brand-negatives.md
- Commit: aee1580
- Reason: If approved, ads-analyst adds 5 "memobrick" negatives to PMax #2 so it stops paying for our own brand searches (45% of its search spend) and its real non-brand result shows.
- Expires: 2026-10-17
- Status: rejected
- From: P-ads-analyst-20261012-4

## A-2026W42-006
- Agent: ads-analyst
- Executor: ads-analyst
- Type: ad-change
- Draft: marketing/analytics/ads-analyst/changes/meta-new-ad-photo-to-mosaic-reel.md
- Commit: aee1580
- Reason: If approved, ads-analyst creates one new Meta ad, PAUSED, from the planner's photo-to-mosaic reel in the Proven Videos ad set, linking to the editor; launching it is a separate approval.
- Expires: 2026-10-17
- Status: approved
- From: P-ads-analyst-20261012-6
- Note: Same clip as the organic post in A-2026W41-001 (a different channel, so not a duplicate). On 2026-10-12 you asked for a different video on A-2026W41-001 ("change the video"); if that applies here too, reply `changes:` on this item. It lands on /pages/editor; the SEO audit notes two creator pages (/pages/create and /pages/editor), so check the editor works well on mobile before the later launch approval.

## A-2026W41-002
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W42/S-20261015-1.md
- Commit: e91580d
- Reason: Building experience video shows the hands-on value ahead of holiday gift planning.
- Expires: 2026-10-15
- Status: changes: generate a video or publish a video that is not in the instagram account yet
- From: P-social-planner-20261011-2
- Note: Confirm the Drive clip content and usage rights (the planner could not play it).

## A-2026W41-003
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W42/S-20261018-1.md
- Commit: f6147d2
- Reason: Family transformation video for the family gift audience.
- Expires: 2026-10-18
- Status: approved
- From: P-social-planner-20261011-3
- Note: Clip appears to be Billo creator content. Confirm the license covers organic posting on Instagram, Facebook, and TikTok.

## A-2026W42-014
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-10-22-photo-tips.md
- Commit: 0e70384
- Reason: Redesigned no-offer photo tips email (real product photos, new subject) to the Warm segment; creates the Omnisend campaign and schedules it for Thu Oct 22, 11:00 ET.
- Expires: 2026-10-21
- Status: changes: change the first image since was already used on the last email
- From: P-email-campaign-writer-20261012-1
- Note: Replaces A-2026W41-004, whose draft changed after it was queued. Decide this one; A-2026W41-004 cannot be acted on.

## A-2026W41-005
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/emily-reviews-2026.md
- Commit: e91580d
- Reason: Open 2026 holiday guide on product exchange, wants pitches by Nov 15; email EmilyReviewsCom@gmail.com listed on the call page
- Expires: 2026-10-21
- Status: changes: improve the email memobrick is more about creating experiences with families building a special picture together make the email more sentimental
- From: P-outreach-gift-guide-pr-20261011-1
- Flag: Offers a sample kit. The Facts table says kits go out case by case and each kit offer needs your approval here, so approving this item is that approval. Sender is Eden Biri; the sender email is still to confirm. Address and byline come from search summaries, not the live page.

## A-2026W41-009
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/frugal-ginger.md
- Commit: e91580d
- Reason: Free sample-based family guides; email on the 2025 submissions page, 2026 call not yet posted
- Expires: 2026-10-21
- Status: approved
- From: P-outreach-gift-guide-pr-20261011-5
- Flag: Offers a sample kit. The Facts table says kits go out case by case and each kit offer needs your approval here, so approving this item is that approval. Sender is Eden Biri; the sender email is still to confirm. Address not captured, and the 2026 call is not posted yet.

## A-2026W41-004
- Agent: email-campaign-writer
- Executor: email-campaign-writer
- Type: send
- Draft: marketing/email/campaign-writer/2026-10-22-photo-tips.md
- Commit: e91580d
- Reason: Helpful no-offer email to the Warm segment between the scheduled Oct 20 and Oct 27 sends; creates an Omnisend draft only
- Expires: 2026-10-21
- Status: changes: change first picture
- From: P-email-campaign-writer-20261011-1
- Note: Superseded by A-2026W42-014 (the draft changed after this item was queued). Ignore this item.

## A-2026W41-006
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/shescribes-2026.md
- Commit: e91580d
- Reason: Open 2026 guide; pitch asks only for the free review option (no $25 listing fee); Kimberly@SheScribes.com listed on page
- Expires: 2026-10-21
- Status: changes: edit the email to make it feel more real and emotional, memobrick talk more about an experience qieth the family
- From: P-outreach-gift-guide-pr-20261011-2
- Flag: Offers a sample kit. The Facts table says kits go out case by case and each kit offer needs your approval here, so approving this item is that approval. Sender is Eden Biri; the sender email is still to confirm. The site sells paid placements; do not pay.
- Note: Superseded by A-2026W42-015 (your requested changes were applied).

## A-2026W41-007
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/love-tabitha-2026.md
- Commit: e91580d
- Reason: Submissions open; kids and families guide already features a brick set; route is the submission page (method to confirm)
- Expires: 2026-10-21
- Status: pending
- From: P-outreach-gift-guide-pr-20261011-3
- Flag: Offers a sample kit. The Facts table says kits go out case by case and each kit offer needs your approval here, so approving this item is that approval. Sender is Eden Biri; the sender email is still to confirm. Contact route and address not captured.
- Note: Superseded by A-2026W42-016.

## A-2026W41-008
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Commit: e91580d
- Reason: Couples gift roundup; contact page lists general inquiries to Jen (address must be copied from the page)
- Expires: 2026-10-21
- Status: pending
- From: P-outreach-gift-guide-pr-20261011-4
- Flag: Offers a sample kit. The Facts table says kits go out case by case and each kit offer needs your approval here, so approving this item is that approval. Sender is Eden Biri; the sender email is still to confirm. Address not captured.
- Note: Superseded by A-2026W42-017.

## Open

(Highest expected sales impact first.)

## A-2026W41-010
- Agent: email-flow-optimizer
- Executor: email-flow-optimizer
- Type: send
- Draft: marketing/email/flow-optimizer/test-cart-last-email-reassurance.md
- Commit: e91580d
- Reason: The 20% last email in Abandoned Cart got 0 clicks and 0 purchases from 88 delivered. Test a no-discount reassurance version before holiday traffic.
- Expires: 2026-10-25
- Status: approved
- From: P-email-flow-optimizer-20261011-1
- Flag: Both arms keep the live shared blocks, which state a delivery time ("2–4 business days") not in the Facts table (the Miami claim is now verified). The draft itself makes this a precondition: decide on those blocks first. The Omnisend split block is also unconfirmed.

## A-2026W42-012
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/cart-show-design-and-delivery.md
- Commit: 768c71e
- Reason: site-developer makes the cart show the customer's own mosaic instead of a stock photo, hides raw internal fields, and adds the verified "Order by December 15" line.
- Expires: 2026-12-10
- Status: approved
- From: P-conversion-auditor-20261012-4
- Note: Cart page display only; it does not touch checkout, order emails or fulfillment. Remove the Dec 15 line after Dec 15. Superseded by A-2026W42-021 (site-developer built and tested the cart fix).

## A-2026W41-012
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/remove-hardcoded-product-rating.md
- Commit: 22411dc
- Reason: A hardcoded 4.8/747 AggregateRating sits on every product. That risks a Google manual action removing star snippets sitewide just before Q4.
- Expires: 2026-11-15
- Status: approved
- From: P-seo-technical-20261011-4

## A-2026W41-013
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/retire-duplicate-holiday-article.md
- Commit: 22411dc
- Reason: The duplicate "[Ikram GemPages] Perfect Holiday Gift" article went live 2026-09-10 and splits ranking with `theperfect-holiday` before the holiday peak. The fix is to unpublish it and 301 it to `theperfect-holiday`.
- Expires: 2026-11-30
- Status: approved
- From: P-seo-technical-20261011-1
- Note: Checked only in Shopify store records, not on the live site. Open both URLs before approving.

## A-2026W41-014
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/add-article-breadcrumb-schema.md
- Commit: 22411dc
- Reason: 47 GemPages articles, including 8 of the 10 Christmas and holiday posts, have no BlogPosting or Breadcrumb schema.
- Expires: 2026-11-30
- Status: approved
- From: P-seo-technical-20261011-5

## A-2026W42-013
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/pro-design-keep-size.md
- Commit: 768c71e
- Reason: site-developer makes the Pro Design page keep the size chosen on the product page instead of asking again.
- Expires: 2026-12-15
- Status: pending
- From: P-conversion-auditor-20261012-5

## A-2026W42-011
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/desktop-editor-sticky-topbar.md
- Commit: 768c71e
- Reason: site-developer makes the desktop editor's price and Finish Editing bar sticky; after upload it scrolls off screen, so desktop visitors see no way to order.
- Expires: 2026-11-15
- Status: pending
- From: P-conversion-auditor-20261012-2
- Flag: Same fix as A-2026W42-008 (site-developer's built and tested version). Approve only one; A-2026W42-008 is the one ready to apply.
- Note: Also superseded by A-2026W42-022 (built on v27).

## A-2026W42-015
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/shescribes-2026.md
- Commit: 5e4cad8
- Reason: Replaces A-2026W41-006 with your requested changes (family experience, photos, HTML version). If approved, a Gmail draft to Kimberly@SheScribes.com is created for you to send; free review option only.
- Expires: 2026-10-22
- Status: pending
- From: P-outreach-gift-guide-pr-20261012-1
- Flag: Offers a sample kit; approving this item is the kit approval (case by case per the Facts table). Sender email still to confirm. The site sells paid placements; do not pay.

## A-2026W42-016
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/love-tabitha-2026.md
- Commit: 5e4cad8
- Reason: Replaces A-2026W41-007 with the rewritten family-night pitch. If approved, a Gmail draft is created if the submission page lists an email; if it is a form, the report gives the text to paste.
- Expires: 2026-10-22
- Status: pending
- From: P-outreach-gift-guide-pr-20261012-2
- Flag: Offers a sample kit; approving this item is the kit approval. Sender email still to confirm. Contact route not captured.

## A-2026W42-017
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Commit: 5e4cad8
- Reason: Replaces A-2026W41-008 with the rewritten couples pitch. If approved, a Gmail draft to Jen at Green Wedding Shoes is created for you to send, using the address on their contact page.
- Expires: 2026-10-22
- Status: pending
- From: P-outreach-gift-guide-pr-20261012-3
- Flag: Offers a sample kit; approving this item is the kit approval. Sender email still to confirm. Address not captured.

## A-2026W41-015
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/retire-duplicate-summer-souvenirs-page.md
- Commit: e91580d
- Reason: `/pages/blog-post` is a 100% copy of the summer souvenirs article. The fix is to hide the page and 301 it to the article.
- Expires: 2026-12-31
- Status: approved
- From: P-seo-technical-20261011-2
- Note: Checked only in Shopify store records, not on the live site. Open both URLs before approving.

## A-2026W41-016
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/fix-redirect-and-broken-link.md
- Commit: e91580d
- Reason: One redirect sends "emotional connections" traffic to the graduation article, which is the wrong page. The graduation article also links to a 404.
- Expires: 2026-12-31
- Status: approved
- From: P-seo-technical-20261011-3

## Flagged

No proposal was dropped: none touches the order workflow, and every draft file exists and is used by one proposal. Items copied with a flag or note:

- A-2026W42-022 (v27 sticky bar) replaces both A-2026W42-008 (stale, built on old theme) and A-2026W42-011 (auditor). Approve only 022.
- A-2026W42-021 (cart) replaces A-2026W42-012.
- (older) A-2026W42-011 (auditor sticky bar) duplicates A-2026W42-008 (site-developer's built version). Approve only one.
- A-2026W42-015 to 017 and A-2026W41-005, 009 (outreach pitches): each offers a sample kit, so approving is the kit approval. Sender email is still to confirm.
- A-2026W41-010 (cart flow test): the shared blocks state "2-4 business days", which is not in the Facts table. It is approved but on hold.
- A-2026W42-007 (Early Bird fix): uses EARLYHOLIDAY20, which is active, but its end date is unconfirmed.
- A-2026W42-010 writes a cart attribute for the A/B test; it changes no order email, fulfillment or checkout step, so it was kept.
- Superseded, still listed: A-2026W41-004 (by 014), A-2026W41-006 (by 015), A-2026W41-007 (by 016), A-2026W41-008 (by 017). Their drafts changed after queueing, so they cannot be acted on. I did not change their Status lines.
- Approved items A-2026W41-003, 011, 012, 013, 014 cannot be acted on yet (see Needs your attention).

The six ad changes A-2026W42-001 to 006 passed every check earlier. No contacts-log matches (the log is empty). No two proposals post the same content to the same channel, and none give conflicting dates.

## Missing owner inputs

**Facts marked unknown or incomplete:**

- Holiday ad budget
- Product margins (also "Margin checked: unknown" for all three offers)
- Faces per size and build time
- Outreach sender email (name is Eden Biri; email still to confirm)
- EARLYHOLIDAY20 (active since 2026-10-12): end date and exclusions to confirm. The Oct 20 and Oct 27 Early Bird emails, and any "ends" wording, depend on it

**Blockers reported by agents:**

- **New today:**
  - Outreach: no public contact route for Dogster, The Mom Edit and GMA Shop; check their contact or editor pages and tell outreach-gift-guide-pr.
  - Site-developer (Oct 14): owner to confirm the free-shipping discount covers Alaska, Hawaii and Puerto Rico, and to compare cart-quoted rates to checkout rates with a real address (2 minutes, no payment).
  - Conversion-auditor: marketing/data/latest.md shows nothing pulled (Updated: never), so GA4 and Meta cross-checks are missing; owner-side data pull needed.
  - Site-developer: EARLYBIRD20 is still advertised on the home page but is not in offers-calendar.md. Live theme writes may be refused by the connector.
  - Draft orders fell to 4 in 30 days from 71 last year (growth-analyst weak point, owner action: why proof requests are not coming in or not being invoiced).

- **Urgent (email-campaign-writer):** Omnisend has campaigns scheduled with no approval item, using offers that are not in offers-calendar:
  - Re-engagement 10% (Oct 14)
  - Early Bird 15% (Oct 20 and Oct 27)
  - VIP 20% (Nov 19)
  - Black Friday 20% (Nov 27)
  - Cyber Monday 20% (Nov 30)
  - a countdown series (Dec 3 to Dec 14) that implies a Dec 15 order-by date
  - "Real Customer Builds" (Oct 13), which may use customer content with no recorded permission

  Add these to offers-calendar or pause them in Omnisend.
- **Offers and codes:**
  - EARLYHOLIDAY20 is promised in live Google ads (PMax #2, Holiday Gifts, NonBrand) but does not exist in Shopify. Either create it and list it as active, or approve A-2026W42-001 and 002 to remove it (ads-analyst).
  - EXTRA10 is active in Shopify (515 uses) but not in offers-calendar; it sits only in paused PMax asset groups, which must not be resumed with it (ads-analyst).
  - Black Friday and Cyber Monday offers are unknown (email-campaign-writer).
  - The Welcome 20% code is live but not listed as active (email-flow-optimizer).
  - "Additional 10% off when buying from 2 pcs" appears in the Baby's First Year article (seo-technical).
- **Brand conflicts live on the site and in emails** (seo-technical, email-flow-optimizer):
  - Miami shipping and "2–4 business days"
  - "free proof" from "a real Memobrick designer"
  - "nothing is made until you approve"
  - "As seen on Fox News, NBC and Yahoo"
  - review and customer counts that disagree (4.8, 740+, 747, +700, 1,015, 1000+, 22,500+)
  - lifetime free replacements
  - named customer quotes with no permission file
  - "your photo stays on your device"
  - the `/pages/free-preview` page titled "Free Proof"
  - em dashes in the theme's meta fallbacks
- **Missing permissions and assets:**
  - `marketing/conversion/reviews-ugc/approved-stories.md` does not exist, so no customer stories or quotes can be used (seo-blog-writer, social-planner, email-flow-optimizer).
  - The social clips have not been verified, and some Drive clips have unclear rights (social-planner).
  - There are no product photos or kit flat lays for the two carousels (social-planner).
  - The Christmas article needs a hero image (seo-blog-writer).
- **Connections and access:**
  - The live site is unreachable from the agents' environment (all web agents).
  - Search Console and PageSpeed are not connected (seo-strategist, seo-technical).
  - Postiz is not connected: no API URL, no CLI (social-publisher).
  - The Drive download step is untested (social-publisher).
  - The Omnisend API split block is unconfirmed, and the automations reference tool is not allowed (email-flow-optimizer).
  - The Omnisend connection was unstable (email-flow-optimizer).
  - The search tool refuses major glossy publishers (outreach-gift-guide-pr).
  - Google Ads has no UTM tracking template, so paid and organic Google orders cannot be separated in Shopify (ads-analyst).
  - Adspirer quota: about 140 of 150 monthly calls used; daily pacing from Nov 16 may need a higher plan (ads-analyst).
  - Meta performance-trend tool returns no data, so creative fatigue cannot be measured (ads-analyst).
  - Two Smart campaign call conversion actions (532070521, 830348821) are set as primary in Google Ads; no change proposed (ads-analyst).
- **Unknown facts and data:**
  - The upload page URL is not recorded; the email CTA uses the homepage (email-campaign-writer).
  - No 14-day recent-purchaser segment exists (email-campaign-writer).
  - The cart-restore merge tag is unconfirmed (email-flow-optimizer).
  - Checkout email 1 bounce reasons were not pulled (email-flow-optimizer).
  - The Back in Stock template is the unedited default (email-flow-optimizer).
  - Email orders and organic versus paid Google traffic are not separable. The Meta ad account name was assumed ("PhotoBrick"). The `mymemobrick` referrer jump may be a tracking artifact (growth-analyst).
  - The redirect count is at least 10,000, and a full export is needed (seo-technical).
  - Sizes, prices, faces per size and build time are not in the brand skill (seo-strategist, seo-blog-writer).
  - `page.custom-brick-mosaic-vs-alternatives` has no published page (seo-strategist).
  - Contact addresses were not captured for Love, Tabitha, The Frugal Ginger and Green Wedding Shoes. Ten targets have no contact route. Kit price, US shipping coverage and sample capacity are unknown (outreach-gift-guide-pr).
