import { useState } from 'react';
import { APPROVALS_DESK } from '../../server/parse';
import type { AgentView } from '../../server/state';
import { designPrompt } from './AgentPanel';
import { api } from './api';
import type { AppState } from './context';
import { agentByName, formatDay, TYPE_LABEL, useActions } from './context';

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="page">
      <header className="page-head">
        <h1>{title}</h1>
      </header>
      <div className="page-body">{children}</div>
    </section>
  );
}

/** Your turn: every pending proposal, with Approve / Edit / Reject. */
export function TeToca({ state }: { state: AppState }) {
  const { refresh, openDoc, openAgent } = useActions();
  const [editing, setEditing] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const decide = async (id: string, decision: 'approved' | 'rejected' | 'changes') => {
    setBusy(id);
    setMessage(null);
    const res = await api(`/api/approvals/${id}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision, note }) });
    const body = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) return setMessage({ ok: false, text: body.error ?? "Couldn't save the decision." });
    const label = decision === 'approved' ? 'Approved' : decision === 'rejected' ? 'Rejected' : 'Changes requested';
    const sync: { ok: boolean; text: string } | undefined = body.sync;
    setMessage({
      ok: sync?.ok ?? true,
      text: sync?.ok ? `${label}: ${id}. Sent to the agents; they'll act on it on their next run.` : `${label}: ${id}. ${sync?.text ?? 'Saved to the approval queue.'}`,
    });
    setEditing(null);
    setNote('');
    await refresh();
  };

  const items = [...state.approvals.items].sort((a, b) => (a.expires || '9').localeCompare(b.expires || '9'));
  return (
    <Page title="Your turn">
      <p className="page-intro">
        {items.length ? `${items.length} proposals are waiting on your decision. The ones due soonest come first.` : 'Nothing is waiting on your decision. When an agent proposes something, it shows up here.'}
      </p>
      {message && <p className={`notice ${message.ok ? 'ok' : 'bad'}`}>{message.text}</p>}
      <div className="inbox">
        {items.map((i) => {
          const a = agentByName(state, i.agent);
          return (
            <article key={i.id} className="inbox-item">
              <button className="inbox-who" onClick={() => a && openAgent(a.name)}>
                {a && <img className="avatar" src={`/${a.avatar}`} alt="" />}
                <span>
                  <strong>{a?.displayName ?? i.agent}</strong>
                  <span className="muted small">{i.id}</span>
                </span>
              </button>
              <div className="inbox-text">
                <p className="inbox-reason">{i.reason}</p>
                <p className="inbox-meta">
                  <span className="chip">{TYPE_LABEL[i.type] ?? i.type}</span>
                  {i.expires && <span className={isSoon(i.expires) ? 'soon' : ''}>Due {formatDay(i.expires)}</span>}
                </p>
                {i.flag && <p className="inbox-flag">Check first: {i.flag}</p>}
                {i.note && <p className="inbox-note">{i.note}</p>}
                {editing === i.id && (
                  <div className="edit-box">
                    <textarea autoFocus rows={2} value={note} placeholder="What should change? The agent will see it on its next run." onChange={(e) => setNote(e.target.value)} />
                    <div className="edit-actions">
                      <button className="btn-quiet small" onClick={() => setEditing(null)}>
                        Cancel
                      </button>
                      <button className="btn-dark small" disabled={!note.trim() || busy === i.id} onClick={() => decide(i.id, 'changes')}>
                        Request changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="inbox-actions">
                {i.draft && (
                  <button className="btn-ghost" onClick={() => openDoc(i.draft)}>
                    View
                  </button>
                )}
                <button className="btn-approve" disabled={busy === i.id} onClick={() => decide(i.id, 'approved')}>
                  Approve
                </button>
                <button className="btn-quiet" disabled={busy === i.id} onClick={() => { setEditing(i.id); setNote(''); }}>
                  Edit
                </button>
                <button className="btn-reject" disabled={busy === i.id} onClick={() => decide(i.id, 'rejected')}>
                  Reject
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </Page>
  );
}

const isSoon = (iso: string) => new Date(`${iso}T23:59:59`).getTime() - Date.now() < 3 * 86400000;

/** For Eden: the agents' run reports, newest first. */
export function ParaTi({ state }: { state: AppState }) {
  const { openDoc } = useActions();
  const byDate = new Map<string, typeof state.reports.items>();
  for (const r of state.reports.items) byDate.set(r.date, [...(byDate.get(r.date) ?? []), r]);
  return (
    <Page title={`For ${state.ownerName}`}>
      <p className="page-intro">{state.reports.items.length ? 'What your agents reported on each run.' : 'No reports yet. They show up here when an agent finishes a run.'}</p>
      {[...byDate].map(([date, list]) => (
        <div key={date} className="report-group">
          <h2 className="group-title">{formatDay(date)}</h2>
          {list.map((r) => {
            const a = agentByName(state, r.agent);
            return (
              <button key={r.path} className="report-row" onClick={() => openDoc(r.path)}>
                {a && <img className="avatar" src={`/${a.avatar}`} alt="" />}
                <span className="report-text">
                  <strong>{a?.displayName ?? r.agent}</strong>
                  <span>{r.summary || r.title}</span>
                </span>
                <span className="btn-ghost">Read</span>
              </button>
            );
          })}
        </div>
      ))}
    </Page>
  );
}

/** Dashboard: a simple overview of the team. */
export function Dashboard({ state }: { state: AppState }) {
  const active = state.agents.filter((a) => a.status === 'active');
  const working = active.filter((a) => a.live?.state === 'working').length;
  const needing = active.filter((a) => a.name !== APPROVALS_DESK && (a.pending > 0 || a.live?.state === 'needs_me')).length;
  const latest = state.reports.latestDate;
  return (
    <Page title="Dashboard">
      <div className="tiles">
        <Tile n={state.liveConnected ? working : null} label="working now" empty="Live status not connected" />
        <Tile n={needing} label={needing === 1 ? 'agent needs you' : 'agents need you'} tone="red" />
        <Tile n={state.approvals.pending} label="proposals to decide" tone="red" />
        <Tile n={state.reports.latestCount} label={latest ? `reports from ${formatDay(latest)}` : 'reports'} />
      </div>
      {state.week && (
        <p className="week-line">
          Sales, week {state.week.label}: <strong>{state.week.orders ?? 'no data'} orders</strong> · <strong>{state.week.netSales}</strong>
        </p>
      )}
      <table className="dept-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Active</th>
            <th>To create</th>
            <th>Need you</th>
          </tr>
        </thead>
        <tbody>
          {state.departments.map((d) => {
            const list = state.agents.filter((a) => a.department === d.name);
            return (
              <tr key={d.name}>
                <td>
                  <span className="mini-dot" style={{ background: d.color }} /> {d.name}
                </td>
                <td>{list.filter((a) => a.status === 'active').length}</td>
                <td>{list.filter((a) => a.status === 'planned').length}</td>
                <td>{d.pending > 0 ? <span className="badge badge-red">{d.pending}</span> : list.some((a) => a.name === APPROVALS_DESK && a.pending) ? <span className="badge badge-red">{state.approvals.pending}</span> : '·'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Page>
  );
}

function Tile({ n, label, tone, empty }: { n: number | null; label: string; tone?: 'red'; empty?: string }) {
  return (
    <div className="tile">
      {n === null ? <span className="tile-empty">{empty}</span> : <span className={`tile-n ${tone === 'red' && n > 0 ? 'red' : ''}`}>{n}</span>}
      {n !== null && <span className="tile-label">{label}</span>}
    </div>
  );
}

/** Agent card for the departments view. */
export function AgentCard({ agent, state, withReport }: { agent: AgentView; state: AppState; withReport?: boolean }) {
  const { openAgent, openChat } = useActions();
  if (agent.status !== 'active') {
    return (
      <article className="card card-planned">
        <img className="card-avatar is-ghost-img" src={`/${agent.avatar}`} alt="" />
        <div className="card-body">
          <h3>{agent.displayName}</h3>
          <p className="role-caps">{agent.role}</p>
          <span className="chip">{agent.status === 'planned' ? 'Planned' : 'No role'}</span>
        </div>
        <button className="btn-dark small" onClick={() => openChat(designPrompt(agent.displayName, agent.role))}>
          Build with Betty
        </button>
      </article>
    );
  }
  const live = agent.live;
  const queueCount = agent.name === APPROVALS_DESK ? state.approvals.pending : agent.pending;
  const availability = live?.state === 'working' ? 'Working' : agent.pending > 0 || live?.state === 'needs_me' ? 'Needs you' : live ? 'Available' : 'No live status';
  const report = withReport ? state.reports.items.find((r) => r.agent === agent.name) : undefined;
  return (
    <button className="card" onClick={() => openAgent(agent.name)}>
      <img className="card-avatar" src={`/${agent.avatar}`} alt="" />
      <div className="card-body">
        <h3>
          {agent.displayName}
          {agent.machine && <span className="machine"> ({agent.machine})</span>}
        </h3>
        <p className="role-caps">{agent.role}</p>
        <p className="card-now">
          <span className="now-label">Now</span> {live?.state === 'working' ? live.task || 'Working' : 'No tasks right now'}
        </p>
        <p className={`card-avail ${availability === 'Needs you' ? 'needs-text' : ''}`}>{availability}</p>
        {report && (
          <p className="card-report">
            <span className="now-label">{formatDay(report.date)}</span> {report.summary || report.title}
          </p>
        )}
        <p className="muted small">
          {queueCount} in their queue{agent.machine ? ` · ${agent.machine}` : ''}
        </p>
      </div>
    </button>
  );
}

/** Team (phone): every active agent, what they are doing now and their latest report. */
export function Team({ state }: { state: AppState }) {
  const list = state.agents.filter((a) => a.status === 'active');
  const working = list.filter((a) => a.live?.state === 'working').length;
  return (
    <Page title="Team">
      <p className="page-intro">
        {state.liveConnected ? `${working} of ${list.length} agents working right now.` : 'Live status not connected yet.'} Tap an agent to see what they are doing.
      </p>
      <div className="cards team-cards">
        {list.map((a) => (
          <AgentCard key={a.name} agent={a} state={state} withReport />
        ))}
      </div>
    </Page>
  );
}

export function DepartmentView({ state, name }: { state: AppState; name: string }) {
  const list = state.agents.filter((a) => a.department === name).sort((a, b) => (a.status === 'active' ? 0 : 1) - (b.status === 'active' ? 0 : 1));
  return (
    <Page title={name}>
      {list.length === 0 && <p className="page-intro">This department has no agents yet.</p>}
      <div className="cards">
        {list.map((a) => (
          <AgentCard key={a.name} agent={a} state={state} />
        ))}
      </div>
    </Page>
  );
}

export function PorCrear({ state }: { state: AppState }) {
  const list = state.agents.filter((a) => a.status !== 'active');
  return (
    <Page title="Agents to create">
      <p className="page-intro">Characters saved for agents that don't exist yet. Build them with Betty whenever you like.</p>
      <div className="cards">
        {list.map((a) => (
          <AgentCard key={a.name} agent={a} state={state} />
        ))}
      </div>
    </Page>
  );
}
