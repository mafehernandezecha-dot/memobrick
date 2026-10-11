import type { DashboardState } from '../../server/state';

function greeting(d = new Date()) {
  const h = d.getHours();
  return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function Mundo({ state }: { state: DashboardState }) {
  const working = state.agents.filter((a) => a.live?.state === 'working').length;
  const needing = state.agents.filter((a) => a.character !== 'armando' && (a.pending > 0 || a.live?.state === 'needs_me')).length;

  const workingText = state.liveConnected ? plural(working, 'agente trabajando', 'agentes trabajando') : 'Estado en vivo sin conectar';

  return (
    <section className="mundo">
      <header className="main-header">
        <h1>El mundo</h1>
      </header>

      <div className="world-stage" aria-label="Oficina de Memobrick">
        <div className="baseplate" />
        <p className="stage-note">La oficina en LEGO se arma en la etapa 3.</p>
      </div>

      <div className="greet-card">
        <p className="greet-title">
          {greeting()}, {state.ownerName}
        </p>
        <p className="greet-sub">
          {workingText} · <span className={needing ? 'needs-text' : ''}>{plural(needing, 'te necesita', 'te necesitan')}</span>
        </p>
      </div>

      <div className="stat-pills">
        {state.approvals.available ? (
          <span className="pill">
            <strong>{state.approvals.pending}</strong> {state.approvals.pending === 1 ? 'propuesta por decidir' : 'propuestas por decidir'}
          </span>
        ) : (
          <span className="pill pill-empty">Sin fila de aprobaciones</span>
        )}
        {state.reports.latestDate ? (
          <span className="pill">
            <strong>{state.reports.latestCount}</strong> reportes del {formatDay(state.reports.latestDate)}
          </span>
        ) : (
          <span className="pill pill-empty">Sin reportes todavía</span>
        )}
        {state.week && state.week.orders !== null ? (
          <span className="pill" title={`Semana ${state.week.label}`}>
            <strong>{state.week.orders}</strong> pedidos · {state.week.netSales} esta semana
          </span>
        ) : (
          <span className="pill pill-empty">Sin números de ventas</span>
        )}
      </div>
    </section>
  );
}

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export function formatDay(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}
