import { useEffect, useMemo, useRef, useState } from 'react';
import type { DashboardState } from '../../server/state';
import { ROOMS } from '../world/layout';
import type { FigureInfo, OfficeWorld } from '../world/scene';

type Props = { state: DashboardState; onPick: (agent: string) => void; partyKey?: number; partyKind?: 'sale' | 'goal' | 'recap'; maxPixelRatio?: number };

export function WorldView({ state, onPick, partyKey = 0, partyKind = 'sale', maxPixelRatio = 2 }: Props) {
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
        world.current = new OfficeWorld(host.current, (agent) => pickRef.current(agent), maxPixelRatio);
        world.current.setOverlay(overlay.current);
        setReady(true);
      })
      .catch((e) => setFailed(String(e?.message ?? e)));
    return () => {
      disposed = true;
      world.current?.dispose();
      world.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) world.current?.setFigures(figures);
  }, [ready, figures]);

  // A sale: everyone in the office dances (longer and bigger when the goal is reached).
  useEffect(() => {
    if (ready && partyKey) world.current?.celebrate(partyKind);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, partyKey]);

  // Only rooms where an active agent works get a name plate; empty rooms, the
  // entrance and the meeting room stay unlabeled to keep the office calm.
  const activeCast = new Set(state.agents.filter((a) => a.status === 'active').map((a) => a.character));
  const labeled = ROOMS.filter((r) => r.cast.some((c) => activeCast.has(c)));

  return (
    <div className="world-view">
      <div className="world-canvas" ref={host} />
      {failed && <p className="world-error">Couldn't draw the office in this browser: {failed}</p>}
      <div className="world-overlay" ref={overlay} aria-hidden={!ready}>
        {ready &&
          labeled.map((r) => (
            <div key={r.id} className="room-label" data-anchor={`room:${r.id}`} data-align="left">
              {r.label}
            </div>
          ))}
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
