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
