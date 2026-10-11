import { useState } from 'react';
import { APPROVALS_DESK } from '../../server/parse';
import type { AgentView } from '../../server/state';
import { designPrompt } from './AgentPanel';
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

/** Te toca: every pending proposal, with Approve / Edit / Reject. */
export function TeToca({ state }: { state: AppState }) {
  const { refresh, openDoc, openAgent } = useActions();
  const [editing, setEditing] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const decide = async (id: string, decision: 'approved' | 'rejected' | 'changes') => {
    setBusy(id);
    setMessage(null);
    const res = await fetch(`/api/approvals/${id}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ decision, note }) });
    const body = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) return setMessage({ ok: false, text: body.error ?? 'No pude guardar la decisión.' });
    const label = decision === 'approved' ? 'Aprobada' : decision === 'rejected' ? 'Rechazada' : 'Cambios pedidos';
    setMessage({ ok: true, text: `${label}: ${id}. Se guardó en la fila de aprobaciones; el agente la verá en su próxima corrida.` });
    setEditing(null);
    setNote('');
    await refresh();
  };

  const items = [...state.approvals.items].sort((a, b) => (a.expires || '9').localeCompare(b.expires || '9'));
  return (
    <Page title="Te toca">
      <p className="page-intro">
        {items.length ? `${items.length} propuestas esperan tu decisión. Las que vencen antes van primero.` : 'No hay nada esperando tu decisión. Cuando un agente proponga algo, aparece aquí.'}
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
                  {i.expires && <span className={isSoon(i.expires) ? 'soon' : ''}>Vence {formatDay(i.expires)}</span>}
                </p>
                {i.flag && <p className="inbox-flag">Revisa antes: {i.flag}</p>}
                {i.note && <p className="inbox-note">{i.note}</p>}
                {editing === i.id && (
                  <div className="edit-box">
                    <textarea autoFocus rows={2} value={note} placeholder="¿Qué cambio quieres? El agente lo verá en su próxima corrida." onChange={(e) => setNote(e.target.value)} />
                    <div className="edit-actions">
                      <button className="btn-quiet small" onClick={() => setEditing(null)}>
                        Cancelar
                      </button>
                      <button className="btn-dark small" disabled={!note.trim() || busy === i.id} onClick={() => decide(i.id, 'changes')}>
                        Pedir cambios
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="inbox-actions">
                {i.draft && (
                  <button className="btn-ghost" onClick={() => openDoc(i.draft)}>
                    Ver
                  </button>
                )}
                <button className="btn-approve" disabled={busy === i.id} onClick={() => decide(i.id, 'approved')}>
                  Aprobar
                </button>
                <button className="btn-quiet" disabled={busy === i.id} onClick={() => { setEditing(i.id); setNote(''); }}>
                  Editar
                </button>
                <button className="btn-reject" disabled={busy === i.id} onClick={() => decide(i.id, 'rejected')}>
                  Rechazar
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

/** Para Eden: the agents' run reports, newest first. */
export function ParaTi({ state }: { state: AppState }) {
  const { openDoc } = useActions();
  const byDate = new Map<string, typeof state.reports.items>();
  for (const r of state.reports.items) byDate.set(r.date, [...(byDate.get(r.date) ?? []), r]);
  return (
    <Page title={`Para ${state.ownerName}`}>
      <p className="page-intro">{state.reports.items.length ? 'Lo que reportaron tus agentes en cada corrida.' : 'Todavía no hay reportes. Aparecen aquí cuando un agente termina una corrida.'}</p>
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
                <span className="btn-ghost">Leer</span>
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
        <Tile n={state.liveConnected ? working : null} label="trabajando ahora" empty="Estado en vivo sin conectar" />
        <Tile n={needing} label={needing === 1 ? 'agente te necesita' : 'agentes te necesitan'} tone="red" />
        <Tile n={state.approvals.pending} label="propuestas por decidir" tone="red" />
        <Tile n={state.reports.latestCount} label={latest ? `reportes del ${formatDay(latest)}` : 'reportes'} />
      </div>
      {state.week && (
        <p className="week-line">
          Ventas, semana {state.week.label}: <strong>{state.week.orders ?? 'sin dato'} pedidos</strong> · <strong>{state.week.netSales}</strong>
        </p>
      )}
      <table className="dept-table">
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Activos</th>
            <th>Por crear</th>
            <th>Te necesitan</th>
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
export function AgentCard({ agent, state }: { agent: AgentView; state: AppState }) {
  const { openAgent, openChat } = useActions();
  if (agent.status !== 'active') {
    return (
      <article className="card card-planned">
        <img className="card-avatar is-ghost-img" src={`/${agent.avatar}`} alt="" />
        <div className="card-body">
          <h3>{agent.displayName}</h3>
          <p className="role-caps">{agent.role}</p>
          <span className="chip">{agent.status === 'planned' ? 'Planeado' : 'Sin rol'}</span>
        </div>
        <button className="btn-dark small" onClick={() => openChat(designPrompt(agent.displayName, agent.role))}>
          Armarlo con Betty
        </button>
      </article>
    );
  }
  const live = agent.live;
  const queueCount = agent.name === APPROVALS_DESK ? state.approvals.pending : agent.pending;
  const availability = live?.state === 'working' ? 'Trabajando' : agent.pending > 0 || live?.state === 'needs_me' ? 'Te necesita' : live ? 'Disponible' : 'Sin estado en vivo';
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
          <span className="now-label">Ahora</span> {live?.state === 'working' ? live.task || 'Trabajando' : 'Sin tareas por ahora'}
        </p>
        <p className={`card-avail ${availability === 'Te necesita' ? 'needs-text' : ''}`}>{availability}</p>
        <p className="muted small">
          {queueCount} en su fila{agent.machine ? ` · ${agent.machine}` : ''}
        </p>
      </div>
    </button>
  );
}

export function DepartmentView({ state, name }: { state: AppState; name: string }) {
  const list = state.agents.filter((a) => a.department === name).sort((a, b) => (a.status === 'active' ? 0 : 1) - (b.status === 'active' ? 0 : 1));
  return (
    <Page title={name}>
      {list.length === 0 && <p className="page-intro">Este departamento todavía no tiene agentes.</p>}
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
    <Page title="Agentes por crear">
      <p className="page-intro">Personajes reservados para agentes que todavía no existen. Ármalos con Betty cuando quieras.</p>
      <div className="cards">
        {list.map((a) => (
          <AgentCard key={a.name} agent={a} state={state} />
        ))}
      </div>
    </Page>
  );
}
