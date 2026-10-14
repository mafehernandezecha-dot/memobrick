---
name: memobrick-social-post
description: Posts the owner-approved social kits that the social publisher wrote, on Instagram, Facebook, TikTok and Pinterest, using Claude in Chrome on the owner's Mac. Load when a local scheduled task says to follow the memobrick-social-post skill.
---

# Memobrick social post

This runs on the owner's Mac (the `com.memobrick.social-post` launchd job, installed with `os/scripts/install-mac-tasks.sh`), every hour from 8:07 to 21:07. It posts in the owner's own Chrome, through Claude in Chrome, so there is no paid scheduling app. Each run posts only what is due now.

## Kit format

The social publisher writes each kit as `marketing/social/publisher/to-post/<YYYY-MM-DD>-<slug>.md`. It starts with these lines:

```
Status: ready
Post time (ET): <YYYY-MM-DD HH:MM>
Approval: <A-YYYYWww-nnn>, or <A-YYYYWww-nnn> <post ID> for a post of a weekly batch
Post file: <repo path to the approved post file>
```

followed by one section per platform with the caption (or pin title, description, board and link) and `Media:` with the local repo path of each file to upload.

## Steps

1. `git pull origin main` in the memobrick folder. Get the time now in ET: `TZ=America/New_York date '+%Y-%m-%d %H:%M'`.
2. List `marketing/social/publisher/to-post/*.md` whose first line is exactly `Status: ready`, and read each one's `Post time (ET)`.
   - Post time later than now: not due, leave it alone. Never post early.
   - Post time more than 2 days before now: set the first line to `Status: needs owner: late` and do not post it.
   - Otherwise it is due. Handle due kits oldest post time first.
   If nothing is due, reply "No social posts due" and stop.
3. **Approval check** for each due kit:
   - Run `python3 marketing/tools/check.py approvals marketing/approvals/queue.md --agent social-publisher --today <today ET>`. If the kit's `Approval:` value is not printed, run the same command on the newest files in `marketing/approvals/archive/`. The kit's whole `Approval:` value must be printed as one line (approved, not expired, post file unchanged since approval). Most posts come from a weekly batch: one item approving the week's posts listed in its `week.md`. For those the checker prints one line per approved post, `<A- item ID> <post ID>`, so the batch ID alone is not enough: that exact line must be printed. A post the owner sent back with `changes: <post-id> ...`, or whose post file changed after approval, is not printed and is never posted.
   - For a batch post, also check that the kit's `Post file:` is the file `week.md` lists for that post ID.
   - Open the `Post file:` and check that every caption, title, description, hashtag and link in the kit is word for word the same as in the post file.
   - If either check fails, set the first line to `Status: skipped (not approved)`, add one line under it saying which check failed, and move on.
4. **Media check:** every `Media:` path must exist in the repo and be 10 MB or smaller (`ls -l`). If not, set `Status: needs owner: media missing` or `Status: needs owner: video over 10 MB` and move on.
5. **Duplicate check:** before posting on a platform, look at that account's latest posts. If a post with this caption is already there from today, do not post again; record its URL as that platform's result.
6. **Post with Claude in Chrome**, one platform at a time, choosing "post now" (this job runs at post time). Upload the media from its local path in the repo (Claude in Chrome can attach a local file to an upload field, up to 10 MB). Paste text exactly as in the kit; never retype or reword it.
   - **Instagram and Facebook:** business.facebook.com (Meta Business Suite) → Create post (Create reel for a Reel). Select both the Facebook Page and the Instagram account as placements (only those the kit lists). Add the media and paste the caption, with its hashtags, exactly as approved. When the kit says to turn on the AI label, turn it on (Advanced settings → AI label). Publish now.
   - **TikTok:** tiktok.com/upload. Upload the video, paste the caption, keep visibility Everyone, turn on "AI-generated content" when the kit says so, then Post.
   - **Pinterest:** pinterest.com/pin-creation-tool. Upload the image or video, paste the title, description and destination link from the kit, choose the board the kit names, then Publish.
   - On any login page, CAPTCHA, verification code, error, missing board or account, or anything that does not match the kit, stop that kit and set `Status: needs owner: <reason>` (one short reason, for example `login page on TikTok`). Under `## Result`, list which platforms already posted, with their URLs.
   - Never retry a post that seemed to fail without first checking the account's latest posts to confirm it did not publish.
7. **Live check:** open each live post, copy its public URL (Instagram `instagram.com/p/...` or `/reel/...`, the Facebook post or reel URL, TikTok `tiktok.com/@.../video/...`, Pinterest `pinterest.com/pin/...`), and confirm the caption shows as approved.
8. **Record:**
   - Set the kit's first line to `Status: posted <YYYY-MM-DD HH:MM ET>` and add at the end:
     ```
     ## Result
     - Instagram: <live URL>
     - Facebook: <live URL>
     - TikTok: <live URL>
     - Pinterest: <live URL>
     ```
     Only the platforms in the kit; write `not posted: <reason>` for any that did not post.
   - In `marketing/shared/content-calendar.md`, on the row for the kit's post ID, set Status to `Published`, fill Live URL (`IG <url>; FB <url>; TT <url>; PIN <url>`), and clear the `kit:<path>` from the Error column, the same way the publisher's live check does. If only some platforms posted, leave Status `To post` and put the URLs you have in Live URL.
9. Commit only the kit files and the content calendar you changed, with the message `social-post: <slugs> posted` (or `needs owner` / `skipped` instead of `posted` when nothing posted), then `git pull --rebase origin main && git push origin main`.
10. Reply with one line per kit: posted (with URLs), skipped, or needs owner, and why.

## Never

- Post anything that is not in a `Status: ready` kit with an approved, unexpired item.
- Change, shorten, translate or add to approved wording, hashtags or links.
- Post before the kit's post time.
- Reply to comments or DMs, follow, like, share, or message anyone.
- Change account, page, profile or privacy settings, or boost a post.
- Touch ads, Ads Manager, or any site other than Meta Business Suite, TikTok, Pinterest and the posts' own pages.
- Commit anything other than the kits and the content calendar.
