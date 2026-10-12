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

Every new sale is celebrated with falling bricks, confetti, a rising trophy, and the whole office dancing for 5 seconds (three dance styles: disco, arms-up waving, running man); reaching the daily goal gets a 10-second dance party with jumps and spins. Without a live connection the dashboard celebrates yesterday's sales once each morning. For live, sale-by-sale celebrations, give the app a read-only Shopify token on this computer:

1. In Shopify admin: Settings → Apps and sales channels → Develop apps → Create an app. Under Admin API scopes choose only `read_orders`, install the app, and copy the Admin API access token (it starts with `shpat_`).
2. In Terminal (stop the app first with Control+C), run this and paste the token when asked:
   ```
   read -s "k?Paste your Shopify token and press Enter: " && printf 'export SHOPIFY_STORE="photobrickusa.myshopify.com"\nexport SHOPIFY_ADMIN_TOKEN="%s"\n' "$k" >> ~/.zshrc && source ~/.zshrc && echo "Saved"
   ```
3. Start the app again with `npm run os`.

The app reads only order numbers, amounts, and product titles for today, never customer details, and checks every 30 seconds.
