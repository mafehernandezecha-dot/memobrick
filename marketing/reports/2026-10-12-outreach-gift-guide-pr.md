# outreach-gift-guide-pr 2026-10-12

## Summary
Rewrote the three gift-guide pitches Eden sent back (A-2026W41-006, -007, -008) around the family building experience, each with real product photos and an HTML version in the Memobrick look.
Built `talking-points.md` as the source for every future pitch and updated the agent instructions to use it.
Proposed the three rewritten pitches again (new P- IDs), since the drafts changed after they were queued.

## Done
- Approvals check: no approved, unexpired items for outreach-gift-guide-pr. Nothing was drafted in Gmail, and contacts-log.md has no drafted pitches to follow up in sent mail.
- Wrote `marketing/outreach/gift-guide-pr/talking-points.md`: the story as an experience (choosing the photo, the evening around the table, the face appearing brick by brick, the keepsake on the wall), a table of verified facts with sources, angles for family and kids, couples and weddings, and mom and lifestyle guides, approved product photos, and lines to avoid.
- Rewrote the pitches (all bodies under 170 words), each with 3 product photo links:
  - `pitches/shescribes-2026.md` and `.html`. Subject: "Holiday Gift Guide: the evening a family photo comes to life in bricks" (166 words). Addresses Eden's note on A-2026W41-006 ("more real and emotional, an experience with the family").
  - `pitches/love-tabitha-2026.md` and `.html`. Subject: "For your kids and families guide: a family photo the kids build in bricks" (166 words).
  - `pitches/green-wedding-shoes.md` and `.html`. Subject: "A wedding gift they build together: their favorite photo, brick by brick" (160 words).
- Photos: Memobrick product listing images from the live site (`https://mymemobrick.com/cdn/shop/files/...`), all checked to load (HTTP 200). They are captioned as product photos, never as customers. Listing images that use celebrity photos were left out.
- HTML versions: email-safe tables with inline styles, navy #1B264F header and footer, pink #D66A7E accents, white card, hero photo, two smaller photos, signature with Eden Biri and mymemobrick.com. Each .md says which version to send: the HTML goes in the Gmail draft as htmlBody with the .md text as the plain-text body; contact forms get the plain text with photo links.
- `python3 marketing/tools/check.py copy` passes on all 6 pitch files and on talking-points.md.
- Updated `.claude/agents/outreach-gift-guide-pr.md`: read talking-points.md before writing, lead with the family experience, body under about 170 words, 2 to 3 real product photos, an .html version for every pitch, send HTML plus plain text in the Gmail draft, and check that the .html has not changed since approval. `python3 marketing/tools/check.py agents` passes.
- The live site was reachable (no Shopify fallback needed). Prices quoted in talking-points.md (16×16 $69.88, 20×20 $99.88) were checked on the live store today. No price appears in the pitches.

## Proposed for approval
These replace A-2026W41-006, -007 and -008: their drafts changed after the queued Commit, so the old items can no longer be acted on. I did not change any Status line in queue.md.

### P-outreach-gift-guide-pr-20261012-1
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/shescribes-2026.md
- Reason: Replaces A-2026W41-006 with Eden's requested changes (family experience, photos, HTML version). If approved, a Gmail draft to Kimberly@SheScribes.com (HTML version) is created for the owner to send. Asks for the free review option only and offers a sample kit, so approving also approves the kit
- Expires: 2026-10-22
- Status: pending

### P-outreach-gift-guide-pr-20261012-2
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/love-tabitha-2026.md
- Reason: Replaces A-2026W41-007 with the rewritten family-night pitch. If approved, a Gmail draft (HTML version) is created for the owner to send if the submission page lists an email; if it is a form, the report gives the exact text to paste. Offers a sample kit, so approving also approves the kit
- Expires: 2026-10-22
- Status: pending

### P-outreach-gift-guide-pr-20261012-3
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Reason: Replaces A-2026W41-008 with the rewritten couples pitch. If approved, a Gmail draft to Jen at Green Wedding Shoes (HTML version) is created for the owner to send, using the address on their contact page. Offers a sample kit, so approving also approves the kit
- Expires: 2026-10-22
- Status: pending

## Blocked or unknown
- The outlet pages (shescribes.com, lovetabitha.com, greenweddingshoes.com) are blocked by this environment's network policy, so contact details and guide titles still come from search-result text and are unverified. Confirm Kimberly's address, the Love, Tabitha submission method, and Jen's address on the live pages before sending.
- Sender email is still unknown in the Facts table. The drafts are signed Eden Biri.
- The homepage shows Fox News, NBC, Yahoo, and Disrupt logos. Coverage is not in the Facts table, so pitches do not mention it. If Eden confirms it (outlet, date, link), it would be a strong talking point.
- The product photos are the store's listing images. They look like styled lifestyle images, not customer photos, and the pitches call them product photos. Real photos of a build in progress (owner footage in Drive, cleared in footage-rights.md) would make the "face appearing" moment even stronger. That needs a still exported from the footage.
- No HTML renderer in this environment, so the HTML layout was checked by reading the code, not by looking at a screenshot. Open the .html files in a browser before approving.

## Sales impact
Gift guides published in November feed the Black Friday and December 1 to 15 peaks (last year about 12 and 32 orders a day). An inclusion in one open 2026 guide puts Memobrick in front of gift shoppers just as they decide. The more emotional, photo-led pitch should raise reply rates over the spec-style version. This does not address the main weak point (add-to-cart rate down to 2.4%), which belongs to seo-technical and the owner. Expect only a few orders from this work, and not until a guide goes live.

## Next run
- Create Gmail drafts (HTML plus plain text) for whichever of the three new items are approved, and log them in contacts-log.md.
- Rewrite the 12 other pitches from 2026-10-11 with talking-points.md before proposing any of them, starting with Emily Reviews (open call, product exchange, wants pitches by Nov 15).
- Search Gmail sent mail for sent pitches and log sent or replied rows.
