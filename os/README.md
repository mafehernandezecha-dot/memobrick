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

The agents work on the `main` branch. To see their latest work, run `git pull` in your copy; for them to see your decisions, commit and push `marketing/approvals/queue.md`.

Decisions and chat only work in a browser on the computer running the app. Conversations with Betty are saved in `os/data/chats/` (never pushed to the repository).
