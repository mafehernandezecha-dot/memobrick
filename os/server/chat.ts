// Chat with Betty. Runs on the owner's computer with the official Anthropic SDK;
// credentials come from the environment (ANTHROPIC_API_KEY or an `ant auth login`
// profile), never from the browser. Conversations are saved under os/data/chats/.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { askClaudeCode, findClaude } from './claudeCli';
import { buildState } from './state';
import type { DashboardState } from './state';

export const CHAT_MODEL = 'claude-opus-5-5';
export const CHAT_MODEL_LABEL = 'Claude Opus';

export type ChatMessage = { role: 'user' | 'assistant'; content: string; at: string };
export type Chat = { id: string; title: string; created: string; updated: string; messages: ChatMessage[] };

const chatsDir = (osDir: string) => join(osDir, 'data', 'chats');
const safeId = (id: string) => /^[a-z0-9-]{6,40}$/.test(id);

export function listChats(osDir: string) {
  const dir = chatsDir(osDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Chat)
    .map(({ id, title, updated }) => ({ id, title, updated }))
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getChat(osDir: string, id: string): Chat | null {
  if (!safeId(id)) return null;
  const file = join(chatsDir(osDir), `${id}.json`);
  return existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as Chat) : null;
}

function saveChat(osDir: string, chat: Chat) {
  mkdirSync(chatsDir(osDir), { recursive: true });
  writeFileSync(join(chatsDir(osDir), `${chat.id}.json`), JSON.stringify(chat, null, 2));
}

/** Betty's instructions plus everything the dashboard knows, read fresh from the repo. */
export function systemPrompt(state: DashboardState) {
  const byName = new Map(state.agents.map((a) => [a.name, a]));
  const who = (name: string) => byName.get(name)?.displayName ?? name;
  const team = state.agents
    .map((a) => `- ${a.displayName} (${a.name}): ${a.role}. Department: ${a.department ?? 'none'}. ${a.status === 'active' ? 'Active' : a.status === 'planned' ? 'To create' : 'No role'}.${a.live ? ` Live status: ${a.live.state}${a.live.task ? `, "${a.live.task}"` : ''}.` : ''}`)
    .join('\n');
  const queue = state.approvals.items.length
    ? state.approvals.items
        .map((i) => `- ${i.id} · from ${who(i.agent)} · type ${i.type} · due ${i.expires || 'no date'} · ${i.reason}${i.flag ? ` · Check first: ${i.flag}` : ''}${i.note ? ` · Note: ${i.note}` : ''} · Draft: ${i.draft}`)
        .join('\n')
    : 'No pending proposals.';
  const reports = state.reports.items.length
    ? state.reports.items.map((r) => `- ${r.date} · ${who(r.agent)} · ${r.title}: ${r.summary} (${r.path})`).join('\n')
    : 'No reports yet.';
  const week = state.week ? `Week ${state.week.label}: ${state.week.orders ?? 'no data'} orders, ${state.week.netSales} in net sales.` : 'No sales numbers yet.';

  return `You are Betty, the person ${state.ownerName} talks to in ${state.appName}, the dashboard for ${state.company}'s marketing agents. ${state.company} sells personalized photo portraits built from LEGO-style bricks. You keep ${state.ownerName}'s priorities and approval queue, and you know the whole team.

How you talk:
- In English, warm and direct, like Betty: brief, clear, organized.
- Short answers. Use lists only when they help.
- Don't use em dashes.
- Never invent numbers, tasks, dates or agents. If something isn't below, say so and explain where to find it.

What you can and can't do:
- You can explain how each agent is doing, what is waiting on a decision, what the reports say, and how to use the app.
- You can't approve, send, publish or change anything. To decide, ${state.ownerName} opens "Your turn" in the left sidebar and picks Approve, Edit or Reject. Decisions are saved in marketing/approvals/queue.md.
- To design a new agent, propose in a few lines: what job it does, what it reads, what it delivers, what needs approval, and how often it runs. Then ask what to adjust.

How the app works:
- World: the LEGO office. Each department has its own room. Figures in color are working or need ${state.ownerName}; gray ones are free or not created yet. Red numbers are pending decisions.
- Dashboard: team overview. "For ${state.ownerName}": the agents' reports to read. "Your turn": ${state.ownerName}'s decisions.
- Departments and "Your agents": a card for each agent. "To create": planned agents; the "Build with Betty" button opens this chat.

The team:
${team}

Approval queue (${state.approvals.pending} pending):
${queue}

Agent reports:
${reports}

Sales: ${week}`;
}

type Event = { t: 'delta'; text: string } | { t: 'done'; id: string; title: string } | { t: 'error'; message: string } | { t: 'start'; id: string };

/** Streams Betty's reply as newline-delimited JSON events and saves the chat. */
export async function streamChat(osDir: string, repoDir: string, body: { id?: string; message?: string }, res: ServerResponse) {
  const send = (e: Event) => res.write(`${JSON.stringify(e)}\n`);
  res.setHeader('content-type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('cache-control', 'no-cache');

  const text = (body.message ?? '').trim();
  if (!text) {
    send({ t: 'error', message: 'Write a message.' });
    return res.end();
  }
  const now = new Date().toISOString();
  const chat: Chat = (body.id && getChat(osDir, body.id)) || {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: text.length > 48 ? `${text.slice(0, 47)}…` : text,
    created: now,
    updated: now,
    messages: [],
  };
  chat.messages.push({ role: 'user', content: text, at: now });
  chat.updated = now;
  saveChat(osDir, chat);
  send({ t: 'start', id: chat.id });

  let reply = '';
  try {
    // Prefer Claude Code on this computer: it runs on the owner's Claude plan, no API credit needed.
    const claude = findClaude();
    if (claude) {
      reply = await askClaudeCode(claude, systemPrompt(buildState(osDir, repoDir)), chat.messages, (t) => send({ t: 'delta', text: t }), osDir);
      chat.messages.push({ role: 'assistant', content: reply, at: new Date().toISOString() });
      chat.updated = new Date().toISOString();
      saveChat(osDir, chat);
      send({ t: 'done', id: chat.id, title: chat.title });
      return res.end();
    }
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('NO_ENGINE');
    const client = new Anthropic();
    const stream = client.beta.messages.stream({
      model: CHAT_MODEL,
      max_tokens: 64000,
      // Conversational answers: low effort keeps Betty quick.
      output_config: { effort: 'low' },
      // If a reply is declined by a safety classifier, the API reroutes it to a fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      cache_control: { type: 'ephemeral' },
      system: systemPrompt(buildState(osDir, repoDir)),
      messages: chat.messages.map((m) => ({ role: m.role, content: m.content })),
    });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        reply += event.delta.text;
        send({ t: 'delta', text: event.delta.text });
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') {
      const note = "I can't answer that one. Try asking it another way.";
      reply = reply ? `${reply}\n\n${note}` : note;
      send({ t: 'delta', text: `\n\n${note}` });
    }
    chat.messages.push({ role: 'assistant', content: reply, at: new Date().toISOString() });
    chat.updated = new Date().toISOString();
    saveChat(osDir, chat);
    send({ t: 'done', id: chat.id, title: chat.title });
  } catch (err) {
    // Take back the unanswered message so a retry doesn't send it twice.
    chat.messages.pop();
    if (chat.messages.length) saveChat(osDir, chat);
    else rmSync(join(chatsDir(osDir), `${chat.id}.json`), { force: true });
    send({ t: 'error', message: chatError(err) });
  }
  res.end();
}

function chatError(err: unknown) {
  if (err instanceof Error && err.message === 'NO_ENGINE')
    return 'Betty needs Claude Code on this computer. In Terminal run: curl -fsSL https://claude.ai/install.sh | bash, then type claude and sign in, then reopen the app.';
  if (err instanceof Anthropic.AuthenticationError)
    return 'The Claude key is not valid. Check ANTHROPIC_API_KEY on your computer and reopen the app.';
  if (err instanceof Anthropic.RateLimitError) return 'Claude is busy right now. Try again in a minute.';
  if (err instanceof Anthropic.APIConnectionError) return "Couldn't reach Claude. Check your internet connection.";
  if (err instanceof Anthropic.APIError) return `Claude returned an error (${err.status}): ${err.message}`;
  const msg = err instanceof Error ? err.message : String(err);
  if (/api.?key|auth/i.test(msg))
    return 'Claude is not connected yet. On your computer, set ANTHROPIC_API_KEY (or run "ant auth login") and reopen the app with "npm run os".';
  return `Something went wrong: ${msg}`;
}
