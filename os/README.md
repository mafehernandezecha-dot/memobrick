# Memobrick OS

Your marketing agents' office, in LEGO. It runs on your computer.

## Open it

1. Install Node.js 20 or newer.
2. Connect Claude for the chat with Betty (once): install Claude Code (`curl -fsSL https://claude.ai/install.sh | bash`), then run `claude` and sign in with your Claude account. Betty then runs on your Claude plan, with no API credit needed. Without Claude Code, she falls back to `ANTHROPIC_API_KEY` if one is set.
3. In the repository folder:

```bash
cd os
npm install
npm run os
```

4. Open the address it prints (for example http://localhost:5173).

## Where the data comes from

Everything is read from this repository each time the app refreshes (every 15 seconds):

- `os/agents.json`: the team. Edit it to add or rename an agent.
- `marketing/approvals/queue.md`: what is waiting on your decision. Approve, Edit and Reject write that proposal's `Status:` line here.
- `marketing/reports/`: each run's report (For Eden).
- `marketing/shared/scorecard.md`: the week's sales.
- `marketing/status/<agent>.json`: the live status each agent writes when it starts and finishes.

The agents work on the `main` branch, and the app keeps your copy in step with it on its own: it pulls the agents' latest work when it starts and every 3 minutes, and each Approve, Edit or Reject is committed and pushed right away (only `marketing/approvals/queue.md` is committed). If a push can't go through, for example when you're offline, the decision stays saved and committed on your computer, the app says so, and it is sent on the next sync; you can also click Push origin in GitHub Desktop. Syncing only happens when your copy is on `main`.

Decisions and chat only work in a browser on the computer running the app. Conversations with Betty are saved in `os/data/chats/` (never pushed to the repository).

## Sales, goals, and celebrations

The **Sales** page and the card on the World view show today, this week, and this month against the goals in `marketing/shared/sales-goals.json`, as trophies that fill with gold. History, the funnel, and the weak points the team is fixing come from `marketing/sales/latest.json`, which the growth analyst rewrites every day from Shopify.

Every new sale is celebrated with falling bricks, confetti, a rising trophy, and the whole office dancing for 5 seconds (three dance styles: disco, arms-up waving, running man); reaching the daily goal gets a 10-second dance party with jumps and spins. Without a live connection the dashboard celebrates yesterday's sales once each morning. For live, sale-by-sale celebrations, connect a read-only Shopify app on this computer:

1. At dev.shopify.com (Shopify's Dev Dashboard), create an app, give its version the Admin API scope `read_orders` only, release it, and install it on the Memobrick store. Copy its Client ID and Client secret from the app's settings.
2. In Terminal (stop the app first with Control+C), run this and paste each value when asked:
   ```
   read "i?Client ID: " && read -s "k?Client secret: " && printf 'export SHOPIFY_STORE="photobrickusa.myshopify.com"\nexport SHOPIFY_CLIENT_ID="%s"\nexport SHOPIFY_CLIENT_SECRET="%s"\n' "$i" "$k" >> ~/.zshrc && source ~/.zshrc && echo "Saved"
   ```
3. Start the app again with `npm run os`. If Shopify refuses, the Sales page says why.

(An older Admin API token that starts with `shpat_` also works, as `SHOPIFY_ADMIN_TOKEN`.)

The app reads only order numbers, amounts, and product titles for today, never customer details, and checks every 30 seconds.

## A Mac app for one-click access

Run once, from the `os` folder in Terminal:

```
bash scripts/install-mac-app.sh
```

It creates **Memobrick OS** in Applications with the brick icon. Double-click it (or keep it in the Dock) and it starts the dashboard in the background if needed and opens it in its own window. **Stop Memobrick OS** turns the dashboard off. The dashboard's log is in `~/Library/Logs/memobrick-os.log`. Run the script again if you move the memobrick folder.

### Automatic posting, Google Ads tasks and data pull (free, no extra apps)

Your Mac can post the approved social kits itself, run the approved Google Ads Chrome tasks, and pull the numbers the agents need, using Claude Code (signed in with your plan) and Claude in Chrome. Install once, in Terminal:

```
bash ~/Documents/GitHub/memobrick/os/scripts/install-mac-tasks.sh
```

- **Social posts:** every hour at :07 from 8:07 am to 9:07 pm, it posts any approved kit in `marketing/social/publisher/to-post/` whose time has arrived, on Instagram and Facebook (Meta Business Suite), TikTok and Pinterest, and writes the live links back to the kit and the content calendar.
- **Google Ads tasks:** every day at 9:07 pm, it runs approved Chrome tasks (the Claude in Chrome extension shortcut is the fallback).
- **Data pull:** every day at 7:07 am, it reads Google Ads (account 672-499-4049), Google Analytics, Search Console, Meta Business Suite insights, and TikTok and Pinterest analytics, and saves small snapshots in `marketing/data/` with an index in `marketing/data/latest.md` (the `memobrick-data-pull` skill). It only reads and changes nothing; it skips the day once `latest.md` is updated. Downloads are moved out of Downloads and kept 14 days in `~/Library/Application Support/Memobrick/data-pull-raw/`; only cleaned files, without customer emails, names or phone numbers, go into the repository. The agents use these instead of the Adspirer connector's 150 free calls a month, and ask for anything extra in `marketing/data/requests.md`.
- **What it needs:** the Mac awake and on power from 7 am to 9 pm, Google Chrome open with the Claude in Chrome extension signed in, and you logged in, in that Chrome, to Google Ads, Google Analytics and Search Console (with the Google account that owns them), Meta Business Suite, TikTok and Pinterest. If a login page, CAPTCHA, 2-step verification or anything unexpected appears, it stops and marks the kit `Status: needs owner: <reason>` (the publisher lists those in its report), or for the data pull, lists it under Needs owner in `marketing/data/latest.md`.
- **Logs:** `~/Library/Logs/memobrick-social-post.log`, `~/Library/Logs/memobrick-chrome-tasks.log` and `~/Library/Logs/memobrick-data-pull.log`.
- **Update:** after a change to these jobs, run the install command again; it replaces the jobs in place.
- **Stop it:** `bash ~/Documents/GitHub/memobrick/os/scripts/install-mac-tasks.sh --uninstall`. Run the install command again to turn it back on, or after moving the memobrick folder.
