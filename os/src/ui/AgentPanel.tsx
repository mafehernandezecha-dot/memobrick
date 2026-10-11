import { APPROVALS_DESK } from '../../server/parse';
import type { AppState } from './context';
import { agentByName, formatDay, TYPE_LABEL, useActions } from './context';

/** "What your agents are doing": one agent's work and what waits on Eden. */
export function AgentPanel({ state, name, onClose }: { state: AppState; name: string; onClose: () => void }) {
  const { openChat, openDoc } = useActions();
  const agent = agentByName(state, name);
  if (!agent) return null;
  const items = state.approvals.items.filter((i) => agent.name === APPROVALS_DESK || i.agent === agent.name);
  const report = state.reports.items.find((r) => r.agent === agent.name);
  const color = state.departments.find((d) => d.name === agent.department)?.color;
  const planned = agent.status !== 'active';
  const now = agent.live?.state === 'working' ? agent.live.task || 'Working' : agent.live ? 'No tasks right now' : planned ? 'Not created yet' : 'No live status yet';
  const isDesk = agent.name === APPROVALS_DESK;

  return (
    <div className="panel-wrap" onClick={onClose}>
      <section className="panel agent-panel" role="dialog" aria-label={`What ${agent.displayName} is doing`} onClick={(e) => e.stopPropagation()}>
        <header className="panel-head">
          <img className={`panel-avatar ${planned ? 'is-ghost-img' : ''}`} src={`/${agent.avatar}`} alt="" />
          <div className="panel-title">
            <h2>
              {agent.displayName}
              {agent.machine && <span className="machine"> ({agent.machine})</span>}
            </h2>
            <p className="role-caps">{agent.role}</p>
            {agent.department && (
              <p className="dept-line">
                <span className="mini-dot" style={{ background: color }} />
                {agent.department}
              </p>
            )}
          </div>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="now">
          <span className="now-label">Now</span>
          <span>{now}</span>
        </div>

        <h3 className="panel-sub">{isDesk ? 'Everything waiting on your decision' : 'What they are doing'}</h3>
        {items.length === 0 && !report && <p className="empty">{planned ? 'This agent is planned. You can build it with Betty.' : 'Nothing pending right now.'}</p>}
        <ul className="task-list">
          {items.map((i) => (
            <li key={i.id} className="task-row">
              <div className="task-text">
                <span className="task-reason">{i.reason || i.id}</span>
                <span className="task-meta">
                  {TYPE_LABEL[i.type] ?? i.type}
                  {isDesk && ` · from ${agentByName(state, i.agent)?.displayName ?? i.agent}`}
                  {i.expires && ` · due ${formatDay(i.expires)}`}
                </span>
              </div>
              <span className="chip chip-red">Needs you</span>
              {i.draft && (
                <button className="btn-ghost" onClick={() => openDoc(i.draft)}>
                  View
                </button>
              )}
            </li>
          ))}
          {report && (
            <li className="task-row">
              <div className="task-text">
                <span className="task-reason">Latest report</span>
                <span className="task-meta">{formatDay(report.date)} · {report.summary.slice(0, 90)}{report.summary.length > 90 ? '…' : ''}</span>
              </div>
              <button className="btn-ghost" onClick={() => openDoc(report.path)}>
                View
              </button>
            </li>
          )}
        </ul>

        <footer className="panel-foot">
          <button className="btn-quiet" onClick={onClose}>
            Cancel
          </button>
          {planned ? (
            <button className="btn-dark" onClick={() => openChat(designPrompt(agent.displayName, agent.role))}>
              Build with Betty
            </button>
          ) : (
            <button className="btn-dark" onClick={() => openChat(isDesk ? undefined : `How is ${agent.displayName} doing?`)}>
              Chat here
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

export const designPrompt = (name: string, role: string) => `Help me build ${name}'s agent: ${role.replace(/\s*\(later\)/, '').toLowerCase()}.`;
