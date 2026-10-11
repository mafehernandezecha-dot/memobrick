import { useEffect, useMemo, useRef, useState } from 'react';
import type { DashboardState } from '../../server/state';
import { ROOMS } from '../world/layout';
import type { FigureInfo, OfficeWorld } from '../world/scene';

type Props = { state: DashboardState; onPick: (agent: string) => void };

export function WorldView({ state, onPick }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const world = useRef<OfficeWorld | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const pickRef = useRef(onPick);
  pickRef.current = onPick;

  // Who is working, who needs Eden, who is a ghost (idle or not created yet).
  const figures: FigureInfo[] = useMemo(
    () =>
      state.agents.map((a) => ({
        agent: a.name,
        character: a.character,
        state:
          a.status === 'active' && a.live?.state === 'working'
            ? 'working'
            : a.status === 'active' && (a.pending > 0 || a.live?.state === 'needs_me')
              ? 'needs'
              : 'ghost',
      })),
    [state.agents],
  );

  useEffect(() => {
    let disposed = false;
    // Three.js loads on demand so the sidebar paints first.
    import('../world/scene')
      .then(({ OfficeWorld }) => {
        if (disposed || !host.current) return;
        world.current = new OfficeWorld(host.current, (agent) => pickRef.current(agent));
        world.current.setOverlay(overlay.current);
        setReady(true);
      })
      .catch((e) => setFailed(String(e?.message ?? e)));
    return () => {
      disposed = true;
      world.current?.dispose();
      world.current = null;
    };
  }, []);

  useEffect(() => {
    if (ready) world.current?.setFigures(figures);
  }, [ready, figures]);

  const byCharacter = new Map(state.agents.map((a) => [a.character, a]));
  const roomPending = (cast: string[], id: string) =>
    id === 'presidencia'
      ? byCharacter.get('armando')?.pending ?? 0
      : cast.reduce((n, c) => n + (c === 'armando' ? 0 : byCharacter.get(c)?.pending ?? 0), 0);

  return (
    <div className="world-view">
      <div className="world-canvas" ref={host} />
      {failed && <p className="world-error">No pude dibujar la oficina en este navegador: {failed}</p>}
      <div className="world-overlay" ref={overlay} aria-hidden={!ready}>
        {ready &&
          ROOMS.map((r) => {
            const n = roomPending(r.cast, r.id);
            return (
              <div key={r.id} className="room-label" data-anchor={`room:${r.id}`} data-align="left">
                <span className="room-icon">{r.icon}</span>
                <span className="room-name">{r.label}</span>
                {n > 0 && <span className="badge badge-red">{n}</span>}
              </div>
            );
          })}
        {ready &&
          state.agents
            .filter((a) => a.status === 'active' && (a.pending > 0 || a.live?.state === 'working'))
            .map((a) => (
              <button key={a.name} className="fig-tag" data-anchor={`agent:${a.name}`} onClick={() => onPick(a.name)} title={`${a.displayName}: ${a.role}`}>
                {a.live?.state === 'working' && a.live.task && <span className="bubble">{a.live.task}</span>}
                {a.pending > 0 && <span className="badge badge-red fig-badge">{a.pending}</span>}
              </button>
            ))}
      </div>
    </div>
  );
}
