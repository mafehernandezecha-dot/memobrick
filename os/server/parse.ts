// Pure parsers for the repo files the dashboard reads. No file access here, so
// they are easy to test; server/state.ts does the reading.

/** agents.json name of the approval desk: the character who holds every pending item. */
export const APPROVALS_DESK = 'aprobaciones';

export type ApprovalItem = {
  id: string;
  agent: string;
  executor: string;
  type: string;
  draft: string;
  status: string;
  expires: string;
  reason: string;
  note: string;
  flag: string;
};

/** Items in marketing/approvals/queue.md. Headings like "## Time-sensitive" are skipped. */
export function parseQueue(md: string): ApprovalItem[] {
  const items: ApprovalItem[] = [];
  let cur: Record<string, string> | null = null;
  const flush = () => {
    if (cur) {
      items.push({
        id: cur.id,
        agent: cur.agent ?? '',
        executor: cur.executor ?? '',
        type: cur.type ?? '',
        draft: cur.draft ?? '',
        status: (cur.status ?? '').trim(),
        expires: cur.expires ?? '',
        reason: cur.reason ?? '',
        note: cur.note ?? '',
        flag: cur.flag ?? '',
      });
    }
  };
  for (const line of md.split('\n')) {
    const head = line.match(/^##\s+(\S+)\s*$/);
    if (head) {
      flush();
      cur = /^[A-Z]-\S+$/.test(head[1]) ? { id: head[1] } : null;
      continue;
    }
    const field = line.match(/^-\s+([A-Za-z]+):\s*(.*)$/);
    if (cur && field) cur[field[1].toLowerCase()] = field[2].trim();
  }
  flush();
  return items;
}

export const isPending = (item: ApprovalItem) => item.status === 'pending';

export type Decision = { decision: 'approved' | 'rejected' } | { decision: 'changes'; note: string };

/** The Status value written to the queue for a decision. */
export function statusFor(d: Decision): string {
  if (d.decision !== 'changes') return d.decision;
  const note = d.note.replace(/\s+/g, ' ').trim();
  if (!note) throw new Error('Escribe qué cambiar.');
  return `changes: ${note}`;
}

/**
 * Rewrites only the Status line of one item in queue.md. Throws when the item
 * is missing, has no Status line, or is no longer pending.
 */
export function setQueueStatus(md: string, id: string, status: string): string {
  const lines = md.split('\n');
  const start = lines.findIndex((l) => l.trim() === `## ${id}`);
  if (start < 0) throw new Error(`No encontré la propuesta ${id}.`);
  for (let i = start + 1; i < lines.length && !lines[i].startsWith('## '); i++) {
    const m = lines[i].match(/^(-\s+Status:\s*)(.*)$/);
    if (m) {
      if (m[2].trim() !== 'pending') throw new Error(`La propuesta ${id} ya tiene decisión: ${m[2].trim()}.`);
      lines[i] = `${m[1]}${status}`;
      return lines.join('\n');
    }
  }
  throw new Error(`La propuesta ${id} no tiene línea Status.`);
}

export type WeekRow = { week: string; netSales: string; orders: number | null };

/** Last row of the "## Weekly" table in marketing/shared/scorecard.md. */
export function parseScorecardLatestWeek(md: string): WeekRow | null {
  const start = md.indexOf('## Weekly');
  if (start < 0) return null;
  const rows = md
    .slice(start)
    .split('\n')
    .filter((l) => l.trim().startsWith('|'))
    .map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
  if (rows.length < 3) return null;
  const header = rows[0].map((h) => h.toLowerCase());
  const last = rows[rows.length - 1];
  const col = (name: string) => last[header.indexOf(name)] ?? '';
  const orders = parseInt(col('orders'), 10);
  return { week: col('week'), netSales: col('net sales'), orders: Number.isFinite(orders) ? orders : null };
}

export type ReportFile = { date: string; agent: string; file: string };

/** First "# " heading and the lines under "## Summary" of a run report. */
export function parseReportSummary(md: string): { title: string; summary: string } {
  const lines = md.split('\n');
  const title = (lines.find((l) => l.startsWith('# ')) ?? '').replace(/^#\s+/, '').trim();
  const at = lines.findIndex((l) => /^##\s+Summary/i.test(l));
  const out: string[] = [];
  if (at >= 0)
    for (let i = at + 1; i < lines.length && !lines[i].startsWith('## '); i++) if (lines[i].trim()) out.push(lines[i].replace(/^[-*]\s+/, '').trim());
  return { title, summary: out.join(' ') };
}

/** Run reports are named YYYY-MM-DD-<agent>.md. */
export function parseReportName(file: string): ReportFile | null {
  const m = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  return m ? { date: m[1], agent: m[2], file } : null;
}

export type AgentState = 'working' | 'idle' | 'needs_me';
export type AgentStatus = { state: AgentState; task: string; updated: string };

/** marketing/status/<agent>.json, written by each agent. Returns null when unreadable. */
export function parseStatus(json: string): AgentStatus | null {
  try {
    const o = JSON.parse(json);
    if (!['working', 'idle', 'needs_me'].includes(o.state)) return null;
    return { state: o.state, task: String(o.task ?? ''), updated: String(o.updated ?? '') };
  } catch {
    return null;
  }
}
