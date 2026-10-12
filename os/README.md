# Memobrick OS

Your marketing agents' office, in LEGO. It runs on your computer.

## Open it

1. Install Node.js 20 or newer.
2. Connect Claude for the chat with Betty (once): set `ANTHROPIC_API_KEY` in your terminal, or run `ant auth login`.
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
