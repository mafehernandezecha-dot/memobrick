# Approval queue

Written by the marketing-coordinator only. To decide, edit each `Status:` line to `approved`, `rejected`, or `changes: <your note>`.

Updated 2026-10-26. No new proposals (growth-analyst, seo-strategist and site-developer reports proposed none; the Oct 25 reports proposed none). Archived 4: A-2026W43-004 and A-2026W41-010 (expired Oct 25), A-2026W43-009 and 010 (done, live theme "Memobrick holiday gift boxes"). Moved A-2026W42-037 to Time-sensitive (expires Oct 31). Weekly Sales Plan: `marketing/coordination/coordinator/sales-plan-2026-10-26.md`. Earlier on 2026-10-25: archived A-2026W42-033, 030, 031 and 032 (expired). Earlier, 2026-10-23. Added A-2026W43-006 (brick mosaic size guide article) and A-2026W43-007 (W45 social batch, Nov 2 to 8). Not queued: the one-offer-per-order cart line (you said "leave it" on Oct 21) and the Art Gift Kit flow (it adds a ship-to form for gift kit orders, which touches fulfillment). Archived 4: A-2026W43-001 (done, live Oct 23), A-2026W42-038, 014 and 023 (expired). Earlier: 2026-10-21: added A-2026W43-001 (kit page buttons fix, urgent), 002 (duplicate of 001, flagged) and 003 (Starry Night and Mona Lisa republish, waits on you). Archived 11 items: 040, 041, 042, 043, 044 and 039 (done), 045 (replaced by 046), 046 (live), 007 (renewed as 040), 018 and 019 (expired Oct 20). Before that, 2026-10-19: no new proposals (growth-analyst, seo-strategist and site-developer reports proposed none); archived A-2026W41-003 (expired Oct 18, never posted). Previously, 2026-10-18: no new proposals; moved items expiring by Oct 25 to Time-sensitive. Earlier, 2026-10-16: Added A-2026W42-038 (ads-analyst: paused photo-to-mosaic Meta ad from the 1:1 video, replaces 006) and A-2026W42-039 (seo-technical: gift-for-someone-who-has-everything article). Archived 8 items: 020, 026, 027 (done on Google by ads-analyst), W41-013, W41-015, W41-016 (done by seo-technical), 006 (replaced by 038) and W41-002 (expired Oct 15). Earlier: 2026-10-15 added A-2026W42-037 and 2026-10-14 added 024 to 035. Items with a `- Flag:` line need the check it names before you approve. Details in `marketing/coordination/coordinator/overlaps-2026-10-16.md`.

## Needs your attention

No Status line needs a fix.

Do first (as of 2026-10-26):

- Reject A-2026W43-002: the kit page fix (001) is live, so it is moot.
- Reconnect Buffer in claude.ai connector settings (third run in a row the publisher could not schedule). The Oct 24 and Oct 25 posts did not go out, and the W44 batch (A-2026W42-037, approved) starts today, Oct 26. Also check the Mac social-post job ran.
- A-2026W43-007 (W45 posts) is `changes: send preview picture`: the social planner has to answer it; nothing posts until it is re-proposed.
- Test the free-proof form (/pages/free-preview) on a phone before Oct 27: the Oct 27 post links to it and draft orders are the largest lost-order cause (62 of 114).
- Confirm the EARLYHOLIDAY20 end date: posts on Oct 26, 29 and Nov 1 and the W45 posts use it.
- Reconnect the Facebook connector (ads-analyst and social-planner cannot read Meta).
- Run the Mac data pull: `marketing/data/latest.md` still says never, so no agent has Search Console, GA4 or ads numbers.
- YouTube Shorts OK for the W43 and W44 reels is still open (see Missing owner inputs).

## Time-sensitive

(Items expiring within 7 days, highest expected sales impact first.)

## A-2026W42-037
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W44/week.md
- Commit: 2e08742
- Reason: Approving it approves all 7 W44 posts (Oct 26 to Nov 1, each on Instagram, Facebook, TikTok and Pinterest) for the social publisher to prepare and post; send single posts back with `changes: <post-id> <note>` and the rest stay approved. Needed by Monday's approval round so the Oct 26 reel can post.
- Expires: 2026-10-31
- Status: approved
- From: P-social-planner-20261015-1
- Note: Uses EARLYHOLIDAY20 (active, no end date set; if it ends before Oct 26 to Nov 1 send the Oct 26, 29 and Nov 1 posts back) and Order by December 15 (Facts table). The Oct 27 post links to /pages/free-preview, whose proof form could not be tested; please submit a test proof before Oct 27. The finished woman-and-cat portrait appears briefly in the Oct 28 reel (same consent question as A-2026W42-033). Thursday prices must be re-checked on Oct 29.

## A-2026W43-002
- Agent: conversion-auditor
- Executor: site-developer
- Type: site-change
- Draft: marketing/conversion/auditor/site-changes/product-page-creator-check-title.md
- Commit: 04e6a7e
- Reason: Same kit page bug as A-2026W43-001, found by the conversion auditor (the creator check tests the product title "Custom Bricked Mosaic", which the Oct 20 rewrite removed). Its draft also offers a fallback: restore the old titles on the 22 kits with seo-technical's restore.py.
- Expires: 2026-10-28
- Status: pending
- From: P-conversion-auditor-20261021-1
- Flag: Duplicate of A-2026W43-001, which is the built and tested version (site-developer asks to approve that one and let this one close). 001 went live Oct 23, so this one is moot: reject it.

## A-2026W42-029
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: offer
- Draft: marketing/outreach/creator-scout/floor-2026-10-14.md
- Commit: 081512d
- Reason: Sets the engagement floor to 2% real engagement instead of 10%, so real creators like Niki Loheit (2.7%, LEGO Masters S5) can be proposed for approval with a message on the next run. Fakes stay out on the other checks.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-2
- Note: At 10% no applicant passes, so no creator can be proposed. Separate owner decision in her report: reactivate Evan Rubin (24 orders, $1,787, paused since 2023).

## A-2026W42-034
- Agent: social-planner
- Executor: social-planner
- Type: offer
- Draft: marketing/social/planner/follower-goals.md
- Commit: 44b5d76
- Reason: Weekly follower goals as growth rates (IG +1.5%, FB +0.5%, TikTok +3%, Pinterest +2%) because current counts are missing; nothing automatic happens, and the planner then reports against them weekly.
- Expires: 2026-10-29
- Status: approved
- From: P-social-planner-20261014-2

## A-2026W42-028
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/batches/2026-10-14-batch.md
- Commit: 081512d
- Reason: On the next Mac run, declines 42 fake, coupon or off-brand applicants silently in Collabs (no message, no reason); approves nobody and sends no messages. Clears the worst of the 452-application queue.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-1
- Note: Housekeeping; no direct orders expected. It shows whether her evidence standard is accepted before larger decline batches.

## A-2026W42-035
- Agent: outreach-creator-scout
- Executor: outreach-creator-scout
- Type: send
- Draft: marketing/outreach/creator-scout/batches/2026-10-14-batch-2.md
- Commit: 91545c8
- Reason: On the next Mac run, declines 47 more coupon, deal, review and empty-account applicants silently in Collabs (no message, no reason); approves nobody and sends no messages. With batch 1 this clears every applicant who has a Facebook, TikTok or YouTube account, leaving only the coupon-domain Instagram farm.
- Expires: 2026-10-28
- Status: approved
- From: P-outreach-creator-scout-20261014-3
- Note: Checked: no applicant is also in batch 1 (A-2026W42-028). Housekeeping, no orders expected.


## Open

(Highest expected sales impact first.)

## A-2026W43-007
- Agent: social-planner
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/planner/2026-W45/week.md
- Commit: 63e84af
- Reason: Approving this item approves all 7 W45 posts (Nov 2 to 8) on every channel in each post's Channels column, including YouTube Shorts for the 3 reels; the publisher then prepares and schedules each one. Single posts can be sent back with `changes: <post-id> <note>` (posts not named stay approved).
- Expires: 2026-11-07
- Status: changes: send preview picture
- From: P-social-planner-20261022-1
- Note: Mon and Thu posts use EARLYHOLIDAY20 (active, end date still unknown) and Dec 15. If you end the code first, send those two back with `changes:`. All 7 posts need the AI label on.

## A-2026W43-006
- Agent: seo-technical
- Executor: seo-blog-writer
- Type: publish
- Draft: marketing/seo/writer/drafts/brick-mosaic-sizes.md
- Commit: 788f1ec
- Reason: Publishes the brick mosaic size guide live on the Shopify blog (news) at /blogs/news/brick-mosaic-sizes, with FAQ schema. It answers the size question that stops buyers choosing a kit, ahead of the Christmas rush.
- Expires: 2026-11-06
- Status: approved
- From: P-seo-technical-20261023-1

## A-2026W43-003
- Agent: seo-technical
- Executor: seo-technical
- Type: site-change
- Draft: marketing/seo/technical/site-changes/republish-public-domain-designs.md
- Commit: db7271f
- Reason: Republishes the Starry Night (20x20, 20x30) and Mona Lisa kits with new listings on the Online Store and Google channels. These pages drew search buyers last holiday and are drafts today.
- Expires: 2026-11-10
- Status: approved
- From: P-seo-technical-20261020-3
- Flag: Not approved on Oct 20: waits for Eden to confirm these designs can still be made. Do not approve until then.

## A-2026W43-005
- Agent: social-planner
- Executor: social-planner
- Type: publish
- Draft: marketing/social/planner/research/2026-10-21-facebook-groups-test.md
- Commit: 1c92140
- Reason: 2-week Facebook groups test in 5 groups (Dog Mom Club, Golden Doodle Owners, Cat Lovers Group Official, Craft & Creative Ideas DIY, Scrapbooking, Cards, & Crafts), done by hand by Eden from her own profile: read-only rules check Oct 23 to 27, join and comment only Oct 28 to Nov 3, one post per group Nov 4 to 8, result Nov 11. Starts nothing automatic; the Mac does nothing in groups without a separate item. Real photos only, "I run Memobrick" in every post, tracked links (utm_medium=group) only when asked.
- Expires: 2026-11-11
- Status: approved
- From: chat
- Note: Eden approved in chat on 2026-10-21 ("approve groups test"), recorded by the coordinator session. Proposal P-social-planner-20261021-1. Who does the read-only rules check (Eden or the Mac) is still open.

## A-2026W43-008
- Agent: social-publisher
- Executor: social-publisher
- Type: publish
- Draft: marketing/social/publisher/music/compose.py
- Commit: 525b435
- Reason: Add original background music to every video post. The 4 scheduled videos (guess-the-photo Oct 23 and Oct 30, couple-gift Oct 26, build-time Oct 28) had no sound; music versions replace them in Buffer on Instagram, Facebook and TikTok. Captions unchanged. Music is composed by marketing/social/publisher/music/compose.py and rendered with the MIT-licensed FluidR3 soundfont, so no license or cost. Future reels get music when they are cut.
- Expires: 2026-12-31
- Status: approved
- From: chat
- Note: Eden chose option 1 in chat on 2026-10-23 ("1": Hugo adds free music to the videos before scheduling; she may add trending sounds by hand when she has time).

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


## Flagged

Run 8 (2026-10-26). No new proposals, so nothing flagged or dropped. A-2026W42-037 (W44 batch): the checker prints all 7 posts as approved and unchanged. Details in `marketing/coordination/coordinator/overlaps-2026-10-26.md`.

Run 7 (2026-10-23). Details in `marketing/coordination/coordinator/overlaps-2026-10-23.md`.

- Not queued, order workflow: P-site-developer-20261023-1 (Art Gift Kit flow). It adds a gift mode and a ship-to form that emails the store and must be checked against the order before production, so it touches fulfillment. The tested theme copy "Memobrick gift kit flow" (188683092188) exists; tell me if you want it queued anyway.
- Not queued, owner already decided: P-site-developer-20261021-2 (cart line "One offer per order"). You said "leave it" on Oct 21 and the draft says not to propose it again.
- Not queued, already copied: P-social-planner-20261021-1 (A-2026W43-005, approved in chat).
- A-2026W43-006 and 007: drafts exist and are unshared, hashes current, only the Dec 15 date (Facts table) and EARLYHOLIDAY20 (active) are used, contacts log empty, no conflict with other items. Executors checked against the approvals table.

Run 6 (2026-10-21). Details in `marketing/coordination/coordinator/overlaps-2026-10-21.md`.

- A-2026W43-002 (conversion-auditor): same kit page fix as A-2026W43-001 (site-developer, built and tested). Copied with a flag so you can pick; approve 001 and reject 002.
- A-2026W43-003 (seo-technical): copied as `pending` with a flag; you did not approve it on Oct 20 because the designs must be confirmed makeable first.
- Not queued, already copied: P-email-campaign-writer-20261020-1 (A-2026W42-042), P-seo-technical-20261020-1 and -2 (A-2026W42-043, 044).
- No proposal touches the order workflow; both new drafts exist and are unshared; no offer or date outside offers-calendar; contacts log empty.
- Stale approvals archived with Status lines untouched: 018 and 019 expired unapplied.

Run 5 (2026-10-16). Added A-2026W42-038 and 039; no flags (neither touches the order workflow, both drafts exist and are unshared, no offer or code used, Dec 15 is in the Facts table, contacts log is empty, no other item overlaps). A-2026W42-006 was archived as replaced; 012 and 014 (theme-file SEO changes) remain approved but could not be applied because Shopify blocks live-theme writes.

Run 4 (2026-10-15). Added A-2026W42-037; no flags (not order workflow, draft exists and is unshared, hashes current, EARLYHOLIDAY20 and Dec 15 in offers-calendar, contacts log not involved, no other item posts on Oct 26 to Nov 1). Not queued: P-site-developer-20261014-3 (the calm home is already live, so there is nothing left to approve). A-2026W41-002 (changes requested) expires today and its Oct 15 12:00 post will be missed.

Run 3 (2026-10-14). Added A-2026W42-033 to 035. No flags: none touches the order workflow, all drafts exist and are unshared, EARLYHOLIDAY20 and Dec 15 are in offers-calendar, contacts log is empty, batch 2 does not overlap batch 1, and no other open item posts to W43 dates. Not queued: P-outreach-gift-guide-pr-20261014-4, -5 and -6 (withdrawn, see run 2 below).

Run 2 (2026-10-14). No proposal touches the order workflow, every new draft file exists, and no two open items share a draft file. Contacts log is still empty, so no 30-day matches.

- A-2026W42-030, 031, 032 (outreach pitches): each names the Collabs creator tier (10% commission, 10% code), which is not listed as active in offers-calendar.md. The fixed-tier exception covers only creator-scout items. Outreach asked you to add it there.
- Not queued, withdrawn by outreach-gift-guide-pr in run 2: P-outreach-gift-guide-pr-20261014-4 (The Frugal Ginger, fit score 2), -5 (Green Wedding Shoes pitch, already covered by approved A-2026W42-023 on the same draft) and -6 (Green Wedding Shoes free kit).
- Not queued again: P-site-developer-20261014-1 and -2 were already copied as A-2026W42-021 and -022.
- A-2026W42-025 and A-2026W42-007 use EARLYHOLIDAY20, which is active but has no end date. Not a flag; confirm the end date before Oct 20.
- A-2026W42-024, 025 and 006 all add ads to the Meta Proven Videos ad set with different videos, so they are not duplicates. A-2026W42-026 and approved -019 both edit Google Holiday Gifts and work together.
- A-2026W42-008 (approved, stale old-theme sticky bar) was moved to the archive as replaced by -022, so it can no longer be applied by mistake. Its Status line was not changed.
- A-2026W41-009 (Frugal Ginger, approved with a free kit) was moved to the archive as withdrawn; outreach will not act on it.
- Still open from earlier: A-2026W41-010 (cart flow test) is approved but on hold; the shared blocks state "2-4 business days", which is not in the Facts table. A-2026W42-010 writes a cart attribute for its A/B test; it changes no order email, fulfillment or checkout step, so it was kept.

## Missing owner inputs

**New 2026-10-26:**

- Reconnect Buffer (publisher, third run in a row) and check the Mac social-post job: kit 2026-10-20-holiday-build-together (Oct 24 19:00) and the Oct 25 kits are still `ready`.
- Kit orders of Oct 20 and 21 with no design attached (site-developer): check them.
- Cart funnel follow-up (phone cart to checkout, target 65% or more) is due Oct 27 (site-developer).
- Black Friday and Cyber Monday offers are not in the offers calendar; the Nov 16 season goal is 12 orders a day. Decide the offers by early November so email, social and ads can prepare.
- Email orders are unknown: no omnisend referrer shows in Shopify (growth-analyst).

**New 2026-10-23:**

- Publish "Memobrick gift kit flow" is not queued (see Flagged); confirm the gift kit is 20x20 with credit 99 and who reads the gift ship-to emails if you want it.
- Reconnect the Buffer connector (publisher) and authorize the Facebook connector (ads-analyst, social-planner).
- Confirm the EARLYHOLIDAY20 end date; W45 posts on Nov 2 and Nov 5 use it.
- The Mac data pull has never run (`marketing/data/latest.md` says never), so Google, GA4, Search Console and Meta numbers are missing for every agent. Adspirer is at 150/150 calls until Nov 6.
- Paste the one-line rating removal (A-2026W41-012) by hand in Shopify admin; the hardcoded 4.8/747 rating is still live.

**New 2026-10-21:**

- Publish "Memobrick kit page fix" (A-2026W43-001) once approved; check Oct 20 and 21 kit orders for missing designs.
- Real iPhone check in Instagram: add a kit, tap Checkout, stop before paying. Also look at the cart mosaic picture on a phone (it showed broken in the auditor's sandbox).
- Delete the unused theme copy "Memobrick cart rollback" (188955361500); the store is at 20 of 20 themes. Say whether the drawer's older "Add $X more for free shipping" bar should go too.
- Product data errors (seo-technical): 60x20 shows 50x60 specs; 60x30 and 60x60 list 32 baseplates; the 20x20 guide says 4,092 bricks vs 4,096; art titles Lion, Rose and Colorful Zebra show the wrong subject; one product (`yelow-cat...20x30`) has conflicting size data.
- IP risk: 52 Artist Collection designs show celebrities, logos or studio characters (2 live: `lady-bricked-mosaic-home-decor-20x30`, `heatblast-ben-10-art-piece...-20x30`); gallery images on 10x10, 16x16, 20x20 and two 30x30 kits look like recognizable actors or anime characters. Decide whether to unpublish or replace.
- Meta Oct 27 "Early Bird LAST CALL" is now 20% (A-2026W42-041 done); confirm EARLYHOLIDAY20 end date before "ends" wording.
- Merchant Center "Needs attention" export (Eden) and Search Console/GA4/Meta data pull: `marketing/data/` is still empty.
- Cookie banner covers the main button on phones (app setting); no featured image on the two new articles.
- Page load is 4.3 to 4.6 s on phone, cause not diagnosed.
- Draft orders: 8 in 30 days vs 77 last year (largest lost-order cause); test the free-proof form.

**YouTube Shorts for the already-approved W43 and W44 reels (Eden, OK needed):**

- YouTube: pending. Reels now also post to YouTube Shorts. The W43 and W44 batches (A-2026W42-033, A-2026W42-037) were approved before that, and their post files cannot change without breaking the approval, so the YouTube title and description were added only to the kits, as an "added channel" section: S-20261019-1, S-20261021-1, S-20261023-1, S-20261026-1, S-20261028-1, S-20261030-1 (marketing/social/publisher/to-post/). Read them there, then write `OK` at the end of this line (or say so in chat) to let them post on YouTube too. Until then the Mac posts these reels on the other four channels only. OK by Wed Oct 21 before 19:00 ET so Wednesday's reel goes to YouTube on time.

**Facts marked unknown or incomplete:**

- Holiday ad budget
- Product margins (also "Margin checked: unknown" for all three offers)
- Faces per size and build time
- EARLYHOLIDAY20 (active since 2026-10-12): end date and exclusions to confirm. The Oct 20 and Oct 27 Early Bird emails, the Meta Christmas ads (A-2026W42-025) and any "ends" wording depend on it

**Blockers reported by agents:**

- **New 2026-10-16:**
  - Seo-technical: Shopify blocks writes to the live theme, so approved A-2026W41-012 (remove hardcoded 4.8/747 rating) and A-2026W41-014 (article schema) are not applied. Paste the before/after in Shopify admin or give a route that allows it. The rating one is the higher risk before Q4.
  - Ads-analyst: Google not read this week (no data snapshots; Adspirer has 0 calls until Nov 6); A-2026W42-018 and 019 need Eden to run the prompts by hand. Meta reports 6 purchases in 7 days but Shopify shows 1 tagged facebook/paid order (tracking gap to check).
  - Data pull: `marketing/data/` still has no snapshots, so Google, GA4, Search Console and Meta cross-checks are missing across agents.

- **New today (run 2):**
  - Ads: A-2026W42-019 blocked by the Claude Code permission check on the Google Ads save click (needs Eden). Meta landing page views are 76% of link clicks vs 93% last year (possible slow mobile load; worth a site-developer check). BEMYVALENTINE is not in offers-calendar, so the Valentine's plan waits. Adspirer has 0 free calls until Nov 6.
  - Creator-scout: Evan Rubin reactivation: owner said no (2026-10-14). Do not reactivate or contact him. Discount groups BF15 (15%) and freelifemiami (20%) are active at rates other than 10%, and other Collabs programs exist (Family 15% commission, a legacy 0% program with warnings). 407 applications not read yet.
  - Outreach: the 10%/10% creator offer is now in offers-calendar.md (owner confirmed 2026-10-14), so the flag on A-2026W42-030 to 032 is cleared. The Collabs page copy (https://mymemobrick.com/pages/collabs) is outdated (reads like a job ad, names a toy brand). No contact route for the two best fits, Shop TODAY and CNN Underscored, or for NCOA, Dogster, Catster, iHeartDogs and The Mom Edit. Green Wedding Shoes is approved commission only (A-2026W42-023).
  - Social-publisher: S-20261015-1 (A-2026W41-002, changes requested) posts Oct 15 12:00 and will be missed unless the planner revises it today.
- **Earlier today:**
  - Site-developer: owner to confirm the free-shipping discount covers Alaska, Hawaii and Puerto Rico, and to compare cart-quoted rates to checkout rates with a real address (2 minutes, no payment).
  - Conversion-auditor and others: marketing/data/latest.md shows nothing pulled (Updated: never), so GA4 and Meta cross-checks are missing; owner-side data pull needed.
  - Site-developer: EARLYBIRD20 is still advertised on the home page but is not in offers-calendar.md. Live theme writes may be refused by the connector.
  - Draft orders fell to 4 in 30 days from 71 last year (growth-analyst weak point, owner action: test the free-proof form and why proof requests are not invoiced).

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
  - EXTRA10 is active in Shopify (515 uses) but not in offers-calendar; it sits only in paused PMax asset groups, which must not be resumed with it (ads-analyst).
  - Old EARLYBIRD20 creatives remain in the Meta account; the paused retargeting campaign must not be resumed with them (ads-analyst).
  - Black Friday and Cyber Monday offers are unknown (email-campaign-writer).
  - The Welcome 20% code is live but not listed as active (email-flow-optimizer).
  - "Additional 10% off when buying from 2 pcs" appears in the Baby's First Year article (seo-technical).
- **Brand conflicts live on the site and in emails** (seo-technical, email-flow-optimizer, outreach):
  - "2–4 business days" delivery claim
  - "free proof" from "a real Memobrick designer"
  - "nothing is made until you approve"
  - "As seen on Fox News, NBC and Yahoo" (only "As seen on FOX" is allowed)
  - review and customer counts that disagree (4.8, 740+, 747, +700, 1,015, 1000+, 22,500+)
  - lifetime free replacements
  - named customer quotes with no permission file
  - "your photo stays on your device"
  - the `/pages/free-preview` page titled "Free Proof"
  - em dashes in the theme's meta fallbacks
- **Missing permissions and assets:**
  - `marketing/conversion/reviews-ugc/approved-stories.md` does not exist, so no customer stories or quotes can be used (seo-blog-writer, social-planner, email-flow-optimizer).
  - Some Drive clips have unclear rights; confirm the Billo license for A-2026W41-003 (social-planner, social-publisher).
  - There are no product photos or kit flat lays for the two carousels (social-planner).
  - No featured image for the published Christmas hub article or the new "person who has everything" draft (seo-blog-writer).
- **Connections and access:**
  - The live site is unreachable from the agents' environment (all web agents).
  - Search Console and PageSpeed are not connected (seo-strategist, seo-technical).
  - Postiz is not connected: no API URL, no CLI (social-publisher).
  - The Omnisend API split block is unconfirmed, and the automations reference tool is not allowed (email-flow-optimizer).
  - The search tool refuses major glossy publishers; Similarweb and Ahrefs failed to connect (outreach-gift-guide-pr).
  - Google Ads has no UTM tracking template, so paid and organic Google orders cannot be separated in Shopify (ads-analyst).
  - Meta performance-trend tool returns no data, and Meta ad landing URLs are not returned (ads-analyst).
  - The Shopify connector's read-only GraphQL needs a permission this session lacks (creator-scout).
- **Unknown facts and data:**
  - The upload page URL is not recorded; the email CTA uses the homepage (email-campaign-writer).
  - No 14-day recent-purchaser segment exists (email-campaign-writer).
  - The cart-restore merge tag is unconfirmed (email-flow-optimizer).
  - Checkout email 1 bounce reasons were not pulled (email-flow-optimizer).
  - The Back in Stock template is the unedited default (email-flow-optimizer).
  - Email orders and organic versus paid Google traffic are not separable (growth-analyst).
  - Orders have no gift note or occasion field (outreach-gift-guide-pr).
  - The redirect count is at least 10,000, and a full export is needed (seo-technical).
  - Sizes, prices, faces per size and build time are not in the brand skill (seo-strategist, seo-blog-writer).
  - `page.custom-brick-mosaic-vs-alternatives` has no published page (seo-strategist).
