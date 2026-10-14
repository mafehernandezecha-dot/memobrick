# outreach-gift-guide-pr 2026-10-14

## Summary
At Eden's request I reviewed every pending pitch and target for kit vs commission. Result: 1 kit now (Green Wedding Shoes), 2 kits on hold until we have a contact route (CNN Underscored, Shop TODAY), 9 commission only through Shopify Collabs (10%/10%), and 6 skipped.
Rewrote 10 pitches (.md and .html), proposed 5 send items plus 1 separate kit offer item, and added the default-commission rule to the agent file and talking points.

## Done
- Analysis: `marketing/outreach/gift-guide-pr/kit-vs-commission-2026-10-14.md` (name, type, evidence, decision, reason for 18 outlets and guides).
- Found the public Collabs application page: https://mymemobrick.com/pages/collabs (live today; "Apply now" opens the Shopify Collabs community application for Memobrick). Commission pitches link to it.
- Rewrote as COMMISSION ONLY (no free kit; 10% commission plus a 10% off code for their audience; family-experience story kept; "As seen on FOX" in the sign-off): `pitches/shescribes-2026`, `love-tabitha-2026`, `emily-reviews-2026` (also applies Eden's A-2026W41-005 note: more sentimental, families building a picture together), `frugal-ginger`, `dogster-dog-lovers`, `the-mom-edit-gifts`, `ncoa-grandparents`, `catster-cat-lovers`, `iheartdogs-holiday`. Each has .md and .html. Bodies 162 to 168 words.
- KIT pitch kept with its kit offer: `pitches/green-wedding-shoes` (.md and .html, 172 words), plus the kit offer draft `kit-offers/green-wedding-shoes-kit.md` (one 20×20 kit from Jen's own photo, sent only if she replies yes; no payment, no promised coverage).
- 16×16 price ($69.88) checked in Shopify today (read-only). The 20×20 price ($99.88) was last checked on 2026-10-12 and appears only in the kit offer file, flagged to re-check.
- Updated `talking-points.md` (creator program row, "As seen on FOX" row, ask defaults to commission, lines to avoid).
- Updated `.claude/agents/outreach-gift-guide-pr.md` with the rule: commission only via Collabs 10%/10% by default; a kit only with evidence of reach and fit, with its own offer item. `python3 marketing/tools/check.py agents` passes.
- `python3 marketing/tools/check.py copy` passes on all 20 pitch files, the kit offer, the analysis, and talking-points.md.
- Approvals: A-2026W41-009 (The Frugal Ginger, approved with a free kit) was printed as actionable. I did not create a Gmail draft: Eden asked today to re-decide kits, the approved draft offered a free kit, and its email address was never captured. The rewrite changes the draft, so the old approval no longer applies; it is replaced below.
- Gmail sent mail: contacts-log.md has no drafted pitches, so there was nothing to follow up.

## Proposed for approval
These replace earlier queue items. The coordinator can retire the old ones, since their drafts changed after their Commit. I did not edit any Status line in queue.md.

- P-...-1 replaces A-2026W42-015 (SheScribes).
- P-...-2 replaces A-2026W42-016 (Love, Tabitha).
- P-...-3 replaces A-2026W41-005 (Emily Reviews).
- P-...-4 replaces A-2026W41-009 (The Frugal Ginger).
- P-...-5 and P-...-6 replace A-2026W42-017 (Green Wedding Shoes). The pitch and the kit are now separate items.

### P-outreach-gift-guide-pr-20261014-1
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/shescribes-2026.md
- Reason: Replaces A-2026W42-015. Commission only, no free kit. If approved, a Gmail draft to Kimberly@SheScribes.com (HTML version) is created for the owner to send, asking for inclusion in her 2026 guide and inviting her to Collabs at 10%/10%.
- Expires: 2026-10-24
- Status: pending

### P-outreach-gift-guide-pr-20261014-2
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/love-tabitha-2026.md
- Reason: Replaces A-2026W42-016. Commission only, no free kit. If approved, a Gmail draft to contact@lovetabitha.com (unverified, from search text) is created for the owner to send; if the page uses a form, the report gives the text to paste.
- Expires: 2026-10-24
- Status: pending

### P-outreach-gift-guide-pr-20261014-3
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/emily-reviews-2026.md
- Reason: Replaces A-2026W41-005 and applies Eden's note (more sentimental). Commission only, no free kit. If approved, a Gmail draft to EmilyReviewsCom@gmail.com is created for the owner to send; pitches are wanted by Nov 15.
- Expires: 2026-10-24
- Status: pending

### P-outreach-gift-guide-pr-20261014-4
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/frugal-ginger.md
- Reason: Replaces A-2026W41-009 (approved with a kit, not acted on). Commission only, no free kit. If approved, a Gmail draft is created for the owner to send, to the address on their submissions page once it is copied from the page.
- Expires: 2026-10-24
- Status: pending

### P-outreach-gift-guide-pr-20261014-5
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: send
- Draft: marketing/outreach/gift-guide-pr/pitches/green-wedding-shoes.md
- Reason: Replaces A-2026W42-017. A Gmail draft to Jen at Green Wedding Shoes (HTML version) is created for the owner to send, but only if kit item P-outreach-gift-guide-pr-20261014-6 is also approved. Approving this item does not approve the kit.
- Expires: 2026-10-24
- Status: pending

### P-outreach-gift-guide-pr-20261014-6
- Agent: outreach-gift-guide-pr
- Executor: outreach-gift-guide-pr
- Type: offer
- Draft: marketing/outreach/gift-guide-pr/kit-offers/green-wedding-shoes-kit.md
- Reason: Approves one free 20×20 sample kit for Green Wedding Shoes (2M+ readers self-reported, wedding gift roundup). Nothing automatic: the owner ships it by hand, only if Jen replies yes. If rejected, the pitch is rewritten as commission only.
- Expires: 2026-10-24
- Status: pending

## Blocked or unknown
- Outlet pages still cannot be opened from this environment, and Similarweb and Ahrefs failed to connect. All reach evidence is search text or self-reported, marked unverified in the analysis.
- No contact route for CNN Underscored, Shop TODAY (the two kits on hold), Dogster, Catster, The Mom Edit, iHeartDogs, or NCOA. If Eden knows an editor address, I will propose them.
- The Collabs page copy is outdated (reads like a job ad and names a toy brand). Suggest the site-developer refresh it to describe the 10%/10% program before pitches go out.
- The 10%/10% creator offer is not in offers-calendar.md yet. Eden, please add it there.
- The homepage says "As seen on Fox News", which the Facts table does not allow yet (site-developer).
- Sender email is still to confirm. Green Wedding Shoes and Frugal Ginger addresses must be copied from their pages.

## Sales impact
Commission only means placements cost Memobrick nothing up front and pay only when they sell, at 10% plus a 10% code (about 20% of a $69.88 order). The one kit goes to the only target with evidence that one placement can repay it. Gift guides publish in November, into the Black Friday (12 orders a day goal) and Dec 1 to 15 (20 a day) peaks. Expected effect: a few orders per placement that goes live, none before November. This does not address the add-to-cart weak point.

## Next run
Create Gmail drafts for whichever of P-20261014-1 to -5 are approved (GWS only with the kit approved too), log them in contacts-log.md, check sent mail, and look for contact routes for the held KIT targets.

---

# outreach-gift-guide-pr 2026-10-14, run 2: buyer profile and audience-fit check

## Summary
At Eden's request ("make sure Mario re-analyzes that each website he wants to approach is our audience") I built a buyer profile from Shopify and Meta data and scored all 18 outlets against it.
Our buyer: a US woman aged 35 to 64 buying a $70 to $150 personalized photo gift for family, partner or pet, mostly for Christmas. 11 rows (8 outlets) fit at 4 or 5, 6 are "maybe, needs Eden", 1 dropped.
Pitches P-1, P-2, P-3 stay as proposed. P-4 (Frugal Ginger) is withdrawn; P-5 and P-6 (Green Wedding Shoes pitch and kit) are withdrawn pending Eden.

## Done
- `marketing/outreach/gift-guide-pr/buyer-profile.md`: who buys, for whom, why, when, price comfort, where they find us, plus the audience-fit test. Sources: ShopifyQL (aggregated only, no names, emails or addresses), Meta age and gender purchases for Nov to Dec 2025, the ads-analyst audit, and the growth-analyst diagnosis.
- `marketing/outreach/gift-guide-pr/audience-fit-2026-10-14.md`: table of outlet, readers, country, price fit, content fit, score and decision for all 18 outlets and guides.
- Green Wedding Shoes pitch (.md and .html) rewritten as commission only (Collabs 10%/10%, 169 words). It is ready but not proposed. The kit offer file is marked withdrawn.
- Frugal Ginger pitch marked dropped. `kit-vs-commission-2026-10-14.md` notes the two changes at the top.
- Agent file: new step 2a. Every future target must pass the audience-fit check against `buyer-profile.md` before a pitch is written (4 or 5 pitch, 3 needs Eden, 1 or 2 drop; a kit needs 5, or 4 with evidence of reach). `buyer-profile.md` is added to Inputs and Outputs. `python3 marketing/tools/check.py agents` passes.
- `talking-points.md`: new "Who we are talking to" section.
- `check.py copy` passes on every changed file.
- Approvals: `check.py approvals` shows only A-2026W41-009 (Frugal Ginger), whose draft has changed. Nothing to act on. That target is now dropped.

## Proposed for approval

No new items. Changes to this morning's proposals (I did not edit queue.md):

- **P-outreach-gift-guide-pr-20261014-1 (SheScribes): stays.** Score 4.
- **P-outreach-gift-guide-pr-20261014-2 (Love, Tabitha): stays.** Score 4.
- **P-outreach-gift-guide-pr-20261014-3 (Emily Reviews): stays.** Score 4.
- **P-outreach-gift-guide-pr-20261014-4 (The Frugal Ginger): WITHDRAWN.** Score 2: frugal, deal-seeking readers do not match a $70 to $150 gift buyer. Coordinator, please do not queue it, or retire it if it was queued. A-2026W41-009, which it replaced, stays retired.
- **P-outreach-gift-guide-pr-20261014-5 (Green Wedding Shoes pitch): WITHDRAWN, maybe, needs Eden.** Score 3. Readers skew to engaged couples aged 25 to 34, our smallest and costliest Meta buyer group (8% of holiday purchases). Wedding season is also not our Nov to Dec peak. A commission-only version is ready at `pitches/green-wedding-shoes.md`; I will propose it if Eden says yes.
- **P-outreach-gift-guide-pr-20261014-6 (Green Wedding Shoes kit): WITHDRAWN.** A score 3 outlet does not justify a free kit.

## Blocked or unknown
- `marketing/data/` has no GA4 or Meta audience snapshots (never pulled), so I have no landing-page or interest data beyond the ads audit.
- Orders have no gift note or occasion field. "For whom" is inferred from codes (BEMYVALENTINE 122, MOMINBRICKS 32) and ad themes.
- Meta age and gender data follows our targeting (82% of spend on women).
- Outlet pages still cannot be opened (DNS failure), and Similarweb and Ahrefs are not connected. Outlet reader evidence is search text and self-description, marked unverified.
- Contact routes are still missing for the two best fits (Shop TODAY, CNN Underscored), and for NCOA and Dogster.

## Sales impact
In 12 months no editorial site or gift guide appears among our top 25 order referrers. Gift-guide PR is unproven for Memobrick, so it has to reach our exact buyer. Dropping the weak fits keeps Eden's time and kits for outlets that can sell. The three remaining pitches are commission only, so they cost nothing unless they sell. The biggest upside is a score 5 national desk (Shop TODAY or CNN Underscored) placed before Nov 10, when demand doubles. Expected effect before November: none. This does not address the referred-traffic weak point directly; a national placement would.

## Next run
- Create Gmail drafts for whichever of P-1 to P-3 are approved.
- Look for editor routes at Shop TODAY and CNN Underscored.
- Apply step 2a to every new target.
- Propose Green Wedding Shoes again only if Eden says yes.
