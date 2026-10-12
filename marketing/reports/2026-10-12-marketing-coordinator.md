# Marketing coordinator 2026-10-12

This report covers both of today's runs: the Monday run (7:00 ET) and an extra run (about 9:30 ET) that added the ads-analyst proposals. Full plan: `marketing/coordination/coordinator/sales-plan-2026-10-12.md`.

## Sales plan

Last week: 20 orders and $2,269.56 net sales, against a goal of 35 orders and $3,850. This week's goal is the same, so the gap is about 15 orders.

1. **Stop the broken code and the wasted ad spend.** ads-analyst, by Tue Oct 13.
   - Remove EARLYHOLIDAY20 and "20% Off" from Google ads, pause NonBrand, add PMax brand negatives, and halve Meta PROMO -v1.
   - Approvals: A-2026W42-001 to 005.
   - Expected effect: about 0 net orders, about $280 a week saved, and fewer failed checkouts.
2. **Recover abandoned carts.** email-flow-optimizer, by Thu Oct 15.
   - Test a no-discount reassurance version of the last cart email, which got 0 clicks from 88 sends.
   - Approval: A-2026W41-010, after you decide on the "2–4 business days" blocks.
   - Expected effect: about +1 order a week.
3. **Send people into the editor, and decide the holiday offer.** social-publisher, ads-analyst, and you.
   - Reel tonight at 19:00 (A-2026W41-001 expires today) and another on Oct 15 (A-2026W41-002).
   - Paused Meta reel ad (A-2026W42-006).
   - You set the 20% holiday code, dates and exclusions, and decide the Oct 14 and Oct 20 Omnisend sends.
   - Expected effect: 0 to 1 order a week now. The offer is the largest lever but cannot be estimated yet.

Together these add about 2 to 3 orders. They do not close the gap. The main loss is add-to-cart (2.4% vs 7.1% last year), and no agent proposal works on the product page or editor.

## Summary

- Added 6 items, A-2026W42-001 to 006, from today's ads-analyst report. None was flagged or dropped. All 6 expire Oct 17 and sit under Time-sensitive.
- The queue now holds 22 items, 9 of them time-sensitive. A-2026W41-001 (the reel at 19:00 tonight) expires today, still pending.
- Five approved items (003, 011, 012, 013, 014) remain blocked by stale Commit lines. No conversion-auditor report exists.

## Done

- Read the reports since the 08:04 coordinator commit: ads-analyst (6 proposals) and social-publisher (none). Earlier today I read growth-analyst and seo-strategist, which also had no proposals.
- Checked the six proposals:
  - none touches the order workflow;
  - none uses an unlisted offer (they remove EARLYHOLIDAY20);
  - the only date is Dec 15, which is in the Facts table;
  - every draft exists, one per item, and none is shared;
  - the Executor is ads-analyst, which is correct for ad-change.
- A-2026W42-006 reuses the A-2026W41-001 reel as a paid Meta ad. That is a different channel, so I added a note to both items and no flag.
- Copied them into `queue.md` with Commit aee1580. Reordered both sections by expected sales impact.
- Refreshed the A-2026W41-001 note: the owner cleared the footage folders on 2026-10-12.
- Added the ads-analyst blockers to Missing owner inputs.
- No Status line changed. The owner made no status edits since the earlier run.
- Archive: nothing to move. Nothing was rejected, done, or past expiry. A-2026W41-001 expires at the end of today.
- Checker: `check.py approvals queue.md` exit 0.
- Wrote the sales plan and appended a second-run section to `overlaps-2026-10-12.md`.

**Items added:**

| ID | Title | Draft |
|---|---|---|
| A-2026W42-001 | Google PMax #2: remove EARLYHOLIDAY20, unlisted 20% sale, LEGO and unsupported claims | marketing/analytics/ads-analyst/changes/google-pmax-remove-invalid-code-and-claims.md |
| A-2026W42-002 | Google Holiday Gifts: replace ad text promising EARLYHOLIDAY20 | marketing/analytics/ads-analyst/changes/google-holiday-gifts-rsa-copy-fix.md |
| A-2026W42-003 | Google: pause NonBrand Photo-to-Brick | marketing/analytics/ads-analyst/changes/google-pause-nonbrand-photo-to-brick.md |
| A-2026W42-004 | Google PMax #2: add "memobrick" brand negatives | marketing/analytics/ads-analyst/changes/google-pmax-brand-negatives.md |
| A-2026W42-005 | Meta: cut ALWAYON PROMO -v1 from $40 to $20 a day | marketing/analytics/ads-analyst/changes/meta-cut-alwayon-promo-v1-budget.md |
| A-2026W42-006 | Meta: new photo-to-mosaic reel ad, created paused | marketing/analytics/ads-analyst/changes/meta-new-ad-photo-to-mosaic-reel.md |

**Flagged:** no new flags. Carried flags: A-2026W41-005 to 009 (sample kits, sender email) and A-2026W41-010 (delivery-time blocks).

**Approved, not yet acted on:** A-2026W41-003 (social-publisher), A-2026W41-011 (seo-blog-writer), A-2026W41-012 to 014 (seo-technical). All are blocked: the recorded commits are missing from history, so you need to confirm the drafts are unchanged.

**Expired:** none yet. A-2026W41-001 expires today.

**Weak points with no proposal working on them:**

- "Visitors stopped adding to cart" has no product-page or editor fix. Only indirect help: editor-linked reels and A-2026W42-006.
- "Holiday plan not ready" waits on your holiday offer inputs.
- "Most checkouts are abandoned" is covered by A-2026W41-010 and A-2026W42-001 and 002.

## Proposed for approval

None

## Blocked or unknown

- **Owner inputs:**
  - holiday ad budget
  - product margins
  - faces per size and build time
  - outreach sender email
  - holiday 20% code, dates and exclusions (decide whether EARLYHOLIDAY20 becomes the real code)
- **Unlisted scheduled Omnisend campaigns:** the first sends Oct 14.
- **Stale Commit lines:** the recorded commits for the five approved items are unreachable.
- **Google tracking:** Google Ads has no UTM template, so paid and organic Google orders are mixed in Shopify.
- **Adspirer quota:** nearly used up for the month.

## Sales impact

This run puts six ad fixes in front of you today, before their Oct 17 expiry. Item 001 removes a non-existent code from live ads, which addresses the checkout-abandonment weak point. Items 003 and 005 stop about $280 a week of spend that brought about 1 order. The sales plan makes clear that the add-to-cart drop is the largest gap and has no proposal yet.

## Next run

Mon 2026-10-19, 7:00 ET. Daily holiday check starts Nov 16.
