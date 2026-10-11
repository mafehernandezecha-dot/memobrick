import type { DashboardState } from '../../server/state';
import type { View } from './Sidebar';

// Stage 2 shell: every screen has its header and a clear empty state. The
// screens themselves arrive in stage 4.
export function ComingSoon({ state, view }: { state: DashboardState; view: View }) {
  const agent = view.kind === 'agent' ? state.agents.find((a) => a.name === view.name) : undefined;
  const title =
    view.kind === 'dashboard'
      ? 'Dashboard'
      : view.kind === 'para'
        ? `Para ${state.ownerName}`
        : view.kind === 'tetoca'
          ? 'Te toca'
          : view.kind === 'nuevo'
            ? 'Nuevo trabajo'
            : view.kind === 'department'
              ? view.name
              : agent?.displayName ?? '';
  const note =
    view.kind === 'tetoca'
      ? `${state.approvals.pending} propuestas esperan tu decisión en la fila de aprobaciones. Aquí podrás aprobar, editar o rechazar cada una.`
      : view.kind === 'para'
        ? `${state.reports.latestCount} reportes de tus agentes, listos para leer.`
        : view.kind === 'nuevo'
          ? 'Aquí le pedirás a Betty un trabajo nuevo y ella lo repartirá.'
          : agent
            ? agent.role
            : 'Esta pantalla muestra el resumen del equipo.';

  return (
    <section className="placeholder">
      <header className="main-header">
        <h1>{title}</h1>
      </header>
      <div className="placeholder-card">
        {agent && <img className="placeholder-avatar" src={`/${agent.avatar}`} alt="" />}
        <p>{note}</p>
        <p className="muted">Esta pantalla se conecta en la etapa 4.</p>
      </div>
    </section>
  );
}
