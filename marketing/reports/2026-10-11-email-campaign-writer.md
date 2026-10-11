# DRY RUN: email-campaign-writer 2026-10-11

## Summary

Wrote the 2026 holiday plan and a no-offer campaign for Thu Oct 22 ("Which photo makes the best mosaic?") to the Warm segment.
Found 12 Q4 campaigns already scheduled in Omnisend with offers and an implied Dec 15 deadline that are not in offers-calendar.md.
All offer- and deadline-dependent holiday emails are waiting on owner.

## Done

- Dry run: skipped git pull/commit/push and approvals (memobrick-run steps 1, 3, 8). No Omnisend writes.
- Read memobrick-brand, offers-calendar, customer-questions (empty), content-calendar (empty). `marketing/conversion/reviews-ugc/approved-stories.md` does not exist.
- Omnisend reads (after tool_schema + tool_documentation for each): `get_campaigns` (20 most recent), `get_segments` (7 segments), `post_analytics_reports` (campaigns, last 12 months).
- Wrote `marketing/email/campaign-writer/holiday-plan-2026.md`.
- Wrote `marketing/email/campaign-writer/2026-10-22-photo-tips.md`. Subject 34 characters. One CTA with UTM `2026-10-photo-tips`. No offer.
- `python3 marketing/tools/check.py copy` passes on both files.

What past campaigns showed: deadline emails win ("Final Hours", 14 orders, about $0.064 per sent); "Before the Rush" about $0.047; 20% Black Week and Early bird bundle about $0.038. Boosters are weak (under 3% opens). The new Warm segment (about 5,000) gets 50 to 55% opens and about 1% clicks but few orders (Website Launch 0, Gift Guide Launch 1 order, $80.22).

## Proposed for approval

### P-email-campaign-writer-20261011-1
- Agent: email-campaign-writer
- Type: publish
- Draft: marketing/email/campaign-writer/2026-10-22-photo-tips.md
- Reason: Helpful no-offer email to the Warm segment between the scheduled Oct 20 and Oct 27 sends; creates an Omnisend draft only
- Expires: 2026-10-21
- Status: pending

## Blocked or unknown

- **Unapproved scheduled campaigns (urgent).** Omnisend has scheduled campaigns that will send without approval items, using offers not in offers-calendar.md: Re-engagement 10% (Oct 14), Early Bird 15% (Oct 20, Oct 27), VIP 20% (Nov 19), Black Friday 20% (Nov 27), Cyber Monday 20% (Nov 30), plus a countdown series (Dec 3 "12 Days Left" to Dec 14 "Last Call") implying a Dec 15 order-by date. "Real Customer Builds" (Oct 13) may use customer content without a recorded permission file. Owner: either add these offers and the order-by date to offers-calendar.md or pause them in Omnisend. Full list with IDs in the holiday plan.
- Christmas order-by date: unknown. Order-by reminders and last-chance email waiting on owner.
- Black Friday and Cyber Monday offers: unknown. Waiting on owner.
- Gift cards offered: unknown. Gift card email waiting on owner.
- No 14-day recent purchaser segment exists. Draft uses the existing 21-day segment; owner may want a 14-day one (this agent cannot create segments).
- Upload page URL is not recorded in the repo; CTA points to the homepage.
- No published blog posts or social posts in content-calendar.md to link.

## Next run

- Tue 2026-10-13 6:00 ET: act on approval if granted (create Omnisend draft), and draft the week of Oct 26 campaign.
- Update the holiday plan as soon as the owner fills the Facts table or decides on the scheduled campaigns.
