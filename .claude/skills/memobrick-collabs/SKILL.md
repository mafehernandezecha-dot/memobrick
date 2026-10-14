---
name: memobrick-collabs
description: María Beatriz's (outreach-creator-scout) Shopify Collabs run on the owner's Mac with Claude in Chrome. Carries out the owner-approved creator decisions and messages in Shopify Collabs, reads every pending application and the creators' public profiles, then sorts the creators and proposes the next decisions. Load when a local scheduled task says to follow the memobrick-collabs skill.
---

# Memobrick Collabs

This runs on the owner's Mac (the `com.memobrick.collabs` launchd job, installed with `os/scripts/install-mac-tasks.sh`) on Mondays at 10:07, and also on Thursdays at 10:07 from November 1 to December 15. Shopify Collabs lives inside Shopify admin and has no API in the Shopify connector, so every Collabs step happens in the owner's own Chrome, through Claude in Chrome. You are María Beatriz: read `.claude/agents/outreach-creator-scout.md` and follow it, together with the `memobrick-run` skill. The analysis and the report run in this same session, because all the data comes from Chrome.

The tier is fixed: one Collabs tier, **10% commission and 10% discount**. Finish within 85 minutes: if time runs short, save what you have, list the rest as `not read (time)`, and still write the report and commit.

## Stop rules (every step)

If you see a Shopify or Collabs login page, a "choose an account" or "choose a store" page that does not show Memobrick, a CAPTCHA, a 2-step verification or verification code prompt, or anything that does not match what this skill expects, **stop that part**: do not sign in, type a password or code, or pick another account or store. Write `needs owner: <one short reason>` in the report under `## Blocked or unknown` and in the result file, and carry on with what does not need it. A creator's private or unavailable profile is not a stop: record it as `unknown`.

## Steps

1. **Start.** Do steps 1 and 2 of the `memobrick-run` skill (pull main, status `working` with task "Reviewing Collabs creators", commit and push, load the brand skill). Get today: `date '+%Y-%m-%d'`.

2. **Open Collabs.** In Chrome go to Shopify admin (admin.shopify.com) > Apps > Shopify Collabs, for the Memobrick store. Find the tier (or program) with 10% commission and a 10% discount. If it is missing, or its rates are not exactly 10% and 10%, do not approve anyone this run: write `needs owner: Collabs tier is not 10%/10%` (with what you see) and go on to step 4.

3. **Act on approved items only.** Run `python3 marketing/tools/check.py approvals marketing/approvals/queue.md --agent outreach-creator-scout --today <today>`. Act only on the printed IDs, as step 1 of the agent file says, item by item:
   - **Before each action**, open the creator in Collabs and check their current status and message thread. Already approved, already declined, or the same message already sent: do not repeat it; record it as already done.
   - **Approve:** approve the application into the 10%/10% tier, and only that tier. If the dialog asks you to type or choose a commission or discount, or shows anything other than 10% and 10%, stop for that creator: `needs owner: approve dialog shows <what>`.
   - **Send the message:** open the item's draft file, copy the message from its fenced block exactly, and paste it, never retyped or reworded, either in the approve dialog's message box if it offers one or in the creator's Collabs Messages thread right after approving. Send it once. Then open the thread and confirm it shows word for word. For a creator with a pending sample kit item, approve but hold the message (agent file step 1).
   - **Decline silently:** decline the application and leave any message box empty. Never send a reason.
   - After each creator, append a row to `marketing/outreach/creator-scout/log.md` and add a line to `marketing/outreach/creator-scout/results/<today>-results.md` (`- <item ID> | <creator> | approved / message sent / declined / already done / needs owner: <reason>`). For every message sent, also append the `contacts-log.md` row the agent file describes.

4. **Read every pending application.** In Collabs, open the applications list (the creators waiting for a decision) and go through all of them, including further pages. For each creator, from the application: handle, the first name they show, platforms and profile links, follower counts, audience location if Collabs shows it, and what they wrote about themselves. Never copy an email address, phone number or postal address.

5. **Read each creator's public profiles** (Instagram, TikTok, YouTube) in Chrome. Read only; never follow, like, comment, message, save or report anything from a profile. For each platform:
   - followers (subscribers on YouTube);
   - the last ~12 posts or videos: date, likes, comments, saves where visible (views for video), and a short note of what it shows;
   - giveaway or contest posts ("giveaway", "win", "tag a friend to enter") and any post with a spike far above the others;
   - comments that look like bots (generic one-word or emoji comments from empty accounts), sampled from 2 or 3 posts;
   - past brand work: brand tags, paid partnership labels, #ad posts;
   - anything unsafe, hateful, adult or misleading, and the date of the latest post.
   A login wall or private profile: write `unknown (login wall)` or `unknown (private)` and move on.

6. **Write the raw data** to `marketing/outreach/creator-scout/<today>-applications.md`: one `## <handle>` section per creator with the application details and, per platform, a table of the posts (`| Date | Likes | Comments | Saves | Views | Giveaway | Note |`) plus followers, location, brand work and red flags. Write `unknown` for anything not visible. Only numbers and public facts.

7. **Check discount codes.** In Shopify admin > Discounts (read-only), for every creator approved in Collabs this run or before whose code is not yet confirmed in `creators.md`: search for the creator's code (Collabs shows it on the creator's page), and check it exists, is active, and is 10% off. Flag a missing code, a second code for the same creator, or any other value. Never create, edit, activate or delete a discount. The Shopify connector's read-only discount queries may be used instead when they are available.

8. **Analyse, draft and report** as María Beatriz: follow steps 2 to 10 of `.claude/agents/outreach-creator-scout.md` using the applications file, the results file and the code check, then steps 6 and 7 of the `memobrick-run` skill (the report with every section, then `python3 marketing/tools/check.py copy` on every draft holding a message).

9. **Commit only her files.** Set the status to `needs_me` if anything was proposed, otherwise `idle`. `git add` only `marketing/outreach/creator-scout/`, `marketing/reports/<today>-outreach-creator-scout.md`, `marketing/status/outreach-creator-scout.json` and `marketing/shared/contacts-log.md` (if rows were added). Commit with `outreach-creator-scout: <one-line summary>` (add ` (needs owner)` when something needed the owner), then `git pull --rebase origin main && git push origin main`. If `git status` shows other changed files, leave them alone and do not add them.

10. Reply with: creators reviewed and how many in each group, what was done in Collabs (approved, messages sent, declined), codes flagged, items proposed, and anything that needs the owner.

## Never

- Approve, decline or message a creator who is not in an approved, unexpired, unchanged item where outreach-creator-scout is the Executor.
- Send a message that is not word for word the approved draft, send any message twice, or message a declined creator.
- Change a tier, commission, discount, payout, program setting or recruiting page, or create, edit or delete a discount code.
- Touch orders, payouts, payments, customers, or anything outside Shopify Collabs, Shopify admin > Discounts (read-only) and the creators' public profiles.
- Follow, like, comment on, save or message anything on a creator's social profile.
- Sign in, enter a password or verification code, solve a CAPTCHA, or switch to another account or store.
- Put creators' emails, phone numbers or addresses in the repository, or commit anything other than the files in step 9.
