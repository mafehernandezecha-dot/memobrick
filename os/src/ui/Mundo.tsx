import { APPROVALS_DESK } from '../../server/parse';
import type { DashboardState } from '../../server/state';
import { formatDay } from './context';
import { WorldView } from './WorldView';

function greeting(d = new Date()) {
  const h = d.getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function Mundo({ state, onPick }: { state: DashboardState; onPick: (agent: string) => void }) {
  const working = state.agents.filter((a) => a.live?.state === 'working').length;
  const needing = state.agents.filter((a) => a.name !== APPROVALS_DESK && (a.pending > 0 || a.live?.state === 'needs_me')).length;

  const workingText = state.liveConnected ? plural(working, 'agent working', 'agents working') : 'Live status not connected';

  return (
    <section className="mundo">
      <header className="main-header">
        <h1>World</h1>
      </header>

      <div className="world-stage" aria-label="Memobrick office">
        <WorldView state={state} onPick={onPick} />
      </div>

      <div className="greet-card">
        <p className="greet-title">
          {greeting()}, {state.ownerName}
        </p>
        <p className="greet-sub">
          {workingText} · <span className={needing ? 'needs-text' : ''}>{plural(needing, 'needs you', 'need you')}</span>
        </p>
      </div>

      <div className="stat-pills">
        {state.approvals.available ? (
          <span className="pill">
            <strong>{state.approvals.pending}</strong> {state.approvals.pending === 1 ? 'proposal to decide' : 'proposals to decide'}
          </span>
        ) : (
          <span className="pill pill-empty">No approval queue</span>
        )}
        {state.reports.latestDate ? (
          <span className="pill">
            <strong>{state.reports.latestCount}</strong> reports from {formatDay(state.reports.latestDate)}
          </span>
        ) : (
          <span className="pill pill-empty">No reports yet</span>
        )}
        {state.week && state.week.orders !== null ? (
          <span className="pill" title={`Week ${state.week.label}`}>
            <strong>{state.week.orders}</strong> orders · {state.week.netSales} this week
          </span>
        ) : (
          <span className="pill pill-empty">No sales numbers</span>
        )}
      </div>
    </section>
  );
}
