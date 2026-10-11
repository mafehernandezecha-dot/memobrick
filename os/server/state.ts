// Builds the dashboard state from files in the repo. Everything shown in the app
// comes from here; nothing is invented. Missing files give empty values.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isPending, parseQueue, parseReportName, parseScorecardLatestWeek, parseStatus } from './parse';
import type { AgentStatus } from './parse';

type AgentConfig = {
  name: string;
  character: string;
  role: string;
  department: string | null;
  status: 'active' | 'planned' | 'extra';
  displayName: string;
  machine: string;
  avatar: string;
  sprite: string;
};

export type AgentView = AgentConfig & {
  pending: number;
  live: AgentStatus | null;
  lastReport: string | null;
};

export type DashboardState = {
  appName: string;
  company: string;
  ownerName: string;
  departments: { name: string; color: string; pending: number }[];
  agents: AgentView[];
  approvals: { pending: number; total: number; available: boolean };
  reports: { latestDate: string | null; latestCount: number };
  week: { label: string; netSales: string; orders: number | null } | null;
  liveConnected: boolean;
};

const read = (p: string) => (existsSync(p) ? readFileSync(p, 'utf8') : null);
const APPROVALS_DESK = 'aprobaciones';

export function buildState(osDir: string, repoDir: string): DashboardState {
  const cfg = JSON.parse(readFileSync(join(osDir, 'agents.json'), 'utf8'));
  const marketing = join(repoDir, 'marketing');

  const queueMd = read(join(marketing, 'approvals', 'queue.md'));
  const items = queueMd ? parseQueue(queueMd) : [];
  const pendingItems = items.filter(isPending);
  const pendingBy = new Map<string, number>();
  for (const it of pendingItems) pendingBy.set(it.agent, (pendingBy.get(it.agent) ?? 0) + 1);

  const reportsDir = join(marketing, 'reports');
  const reports = existsSync(reportsDir)
    ? readdirSync(reportsDir).map(parseReportName).filter((r) => r !== null)
    : [];
  const latestDate = reports.map((r) => r.date).sort().at(-1) ?? null;
  const lastReportBy = new Map<string, string>();
  for (const r of reports) if ((lastReportBy.get(r.agent) ?? '') < r.date) lastReportBy.set(r.agent, r.date);

  const statusDir = join(marketing, 'status');
  const liveConnected = existsSync(statusDir) && readdirSync(statusDir).some((f) => f.endsWith('.json'));

  const agents: AgentView[] = cfg.agents.map((a: AgentConfig) => {
    const statusJson = read(join(statusDir, `${a.name}.json`));
    return {
      ...a,
      // The approvals desk (Armando) holds every pending item.
      pending: a.name === APPROVALS_DESK ? pendingItems.length : pendingBy.get(a.name) ?? 0,
      live: statusJson ? parseStatus(statusJson) : null,
      lastReport: lastReportBy.get(a.name) ?? null,
    };
  });

  const departments = cfg.departments.map((d: { name: string; color: string }) => ({
    ...d,
    pending: agents
      .filter((a) => a.department === d.name && a.name !== APPROVALS_DESK)
      .reduce((n, a) => n + a.pending, 0),
  }));

  const scoreMd = read(join(marketing, 'shared', 'scorecard.md'));
  const week = scoreMd ? parseScorecardLatestWeek(scoreMd) : null;

  return {
    appName: cfg.appName,
    company: cfg.company,
    ownerName: cfg.ownerName,
    departments,
    agents,
    approvals: { pending: pendingItems.length, total: items.length, available: queueMd !== null },
    reports: { latestDate, latestCount: reports.filter((r) => r.date === latestDate).length },
    week: week ? { label: week.week, netSales: week.netSales, orders: week.orders } : null,
    liveConnected,
  };
}
