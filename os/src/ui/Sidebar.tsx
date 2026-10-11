import { APPROVALS_DESK } from '../../server/parse';
import type { AgentView, DashboardState } from '../../server/state';
import { useActions } from './context';
import { Logo } from './Logo';

export type View =
  | { kind: 'mundo' }
  | { kind: 'dashboard' }
  | { kind: 'para' }
  | { kind: 'tetoca' }
  | { kind: 'porcrear' }
  | { kind: 'department'; name: string };

type Props = { state: DashboardState; view: View; onNavigate: (v: View) => void };

const same = (a: View, b: View) => JSON.stringify(a) === JSON.stringify(b);

export function Sidebar({ state, view, onNavigate }: Props) {
  const { openChat, openAgent } = useActions();
  const active = state.agents.filter((a) => a.status === 'active');
  const toCreate = state.agents.filter((a) => a.status !== 'active');
  const deptColor = new Map(state.departments.map((d) => [d.name, d.color]));

  const nav = (v: View, label: string, icon: JSX.Element, badge?: { n: number; tone: 'red' | 'blue' }) => (
    <button className={`nav-item ${same(v, view) ? 'is-active' : ''}`} onClick={() => onNavigate(v)}>
      <span className="nav-icon" aria-hidden>
        {icon}
      </span>
      <span className="nav-label">{label}</span>
      {badge && badge.n > 0 && <span className={`badge badge-${badge.tone}`}>{badge.n}</span>}
    </button>
  );

  return (
    <aside className="sidebar">
      <div className="brand">
        <Logo />
        <span className="brand-name">{state.appName}</span>
      </div>

      <button className="btn-lime" onClick={() => openChat('I need a new task: ')}>
        + New task
      </button>

      <nav className="nav">
        {nav({ kind: 'mundo' }, 'World', <IconWorld />)}
        {nav({ kind: 'dashboard' }, 'Dashboard', <IconGrid />)}
        {nav({ kind: 'para' }, `For ${state.ownerName}`, <IconInbox />, { n: state.reports.latestCount, tone: 'blue' })}
        {nav({ kind: 'tetoca' }, 'Your turn', <IconHand />, { n: state.approvals.pending, tone: 'red' })}
      </nav>

      <h2 className="side-heading">Departments</h2>
      <div className="dept-list">
        {state.departments.map((d) => (
          <button
            key={d.name}
            className={`dept-item ${same({ kind: 'department', name: d.name }, view) ? 'is-active' : ''}`}
            onClick={() => onNavigate({ kind: 'department', name: d.name })}
          >
            <span className="dot" style={{ background: d.color }} />
            <span className="nav-label">{d.name}</span>
            {d.pending > 0 && <span className="badge badge-red">{d.pending}</span>}
          </button>
        ))}
      </div>

      <h2 className="side-heading">Your agents</h2>
      <div className="agent-list">
        {active.map((a) => (
          <AgentRow key={a.name} agent={a} color={deptColor.get(a.department ?? '')} onOpen={openAgent} />
        ))}
      </div>

      <button className={`side-heading side-link ${same({ kind: 'porcrear' }, view) ? 'is-active' : ''}`} onClick={() => onNavigate({ kind: 'porcrear' })}>
        To create <span className="count">{toCreate.length}</span>
      </button>
      <div className="agent-list">
        {toCreate.map((a) => (
          <AgentRow key={a.name} agent={a} ghost color={deptColor.get(a.department ?? '')} onOpen={openAgent} />
        ))}
      </div>

      <EngineFooter state={state} />
    </aside>
  );
}

function AgentRow({ agent, ghost, color, onOpen }: { agent: AgentView; ghost?: boolean; color?: string; onOpen: (name: string) => void }) {
  const live = agent.live?.state;
  const dotClass = live === 'working' ? 'live-working' : live === 'needs_me' || agent.pending > 0 ? 'live-needs' : live === 'idle' ? 'live-idle' : 'live-unknown';
  return (
    <button className={`agent-row ${ghost ? 'is-ghost' : ''}`} onClick={() => onOpen(agent.name)}>
      <img className="avatar" src={`/${agent.avatar}`} alt="" loading="lazy" />
      <span className="agent-text">
        <span className="agent-name">
          {agent.displayName}
          {agent.machine && <span className="machine"> ({agent.machine})</span>}
          {!ghost && <span className={`live-dot ${dotClass}`} title={liveTitle(agent)} />}
        </span>
        <span className="agent-role">
          {color && <span className="mini-dot" style={{ background: color }} />}
          {agent.role}
        </span>
        {agent.pending > 0 && (
          <span className="needs">
            needs you <span className="needs-n">{agent.pending}</span>
          </span>
        )}
      </span>
    </button>
  );
}

function liveTitle(a: AgentView) {
  if (a.live?.state === 'working') return `Working: ${a.live.task}`;
  if (a.live?.state === 'needs_me') return 'Needs you';
  if (a.live?.state === 'idle') return 'No tasks right now';
  return 'No live status yet';
}

function EngineFooter({ state }: { state: DashboardState }) {
  const desk = state.agents.find((a) => a.name === APPROVALS_DESK)?.displayName ?? 'Your queue';
  const turn = state.approvals.pending > 0 ? `${desk} is waiting · your turn` : `${desk} is all caught up`;
  return (
    <footer className="engine">
      <span className={`engine-dot ${state.liveConnected ? 'on' : ''}`} />
      <span className="engine-text">
        <strong>{state.liveConnected ? 'Engine connected' : 'Engine not connected'}</strong>
        <span>
          {state.ownerName} · {turn}
        </span>
      </span>
    </footer>
  );
}

const svg = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const IconWorld = () => (
  <svg {...svg}>
    <path d="M3 9l9-5 9 5-9 5-9-5z" />
    <path d="M3 9v6l9 5 9-5V9" />
  </svg>
);
const IconGrid = () => (
  <svg {...svg}>
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);
const IconInbox = () => (
  <svg {...svg}>
    <path d="M4 13l2-8h12l2 8" />
    <path d="M4 13v6h16v-6h-5a3 3 0 01-6 0H4z" />
  </svg>
);
const IconHand = () => (
  <svg {...svg}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);
