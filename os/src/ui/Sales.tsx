import { useCallback, useEffect, useRef, useState } from 'react';
import type { SalesView } from '../../server/sales';
import type { DashboardState } from '../../server/state';
import { formatDay } from './context';

export type Party = { key: number; kind: 'sale' | 'goal' | 'recap'; title: string; sub: string; value?: number; goal?: number };

const money = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
const store = {
  get: (k: string) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set: (k: string, v: string) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode: celebrations just repeat */
    }
  },
};

/** A short happy chime, made in the browser (no sound files). */
function chime(big: boolean) {
  try {
    const ctx = new AudioContext();
    const notes = big ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.11;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.55);
    });
    setTimeout(() => ctx.close(), 2000);
  } catch {
    /* no audio */
  }
}

/** Polls sales and turns new sales and goals into celebrations. */
export function useSales() {
  const [sales, setSales] = useState<SalesView | null>(null);
  const [queue, setQueue] = useState<Party[]>([]);
  const [sound, setSound] = useState(() => store.get('memobrick.sound') !== 'off');
  const soundRef = useRef(sound);
  soundRef.current = sound;

  const load = useCallback(async () => {
    const r = await fetch('/api/sales').catch(() => null);
    if (!r?.ok) return;
    const s = (await r.json()) as SalesView;
    setSales(s);
    const parties: Party[] = [];
    const t = s.today;
    if (s.live) {
      const seenKey = `memobrick.seen.${t.date}`;
      const seenRaw = store.get(seenKey);
      const seen = new Set<string>(seenRaw ? JSON.parse(seenRaw) : []);
      const fresh = s.recent.filter((o) => !seen.has(o.id)).reverse();
      // The first load of the day only remembers what's already there.
      if (seenRaw !== null)
        fresh.forEach((o, i) => {
          const n = (t.orders ?? 0) - (fresh.length - 1 - i);
          parties.push({ key: Date.now() + i, kind: 'sale', title: `New sale! ${money(o.total)}`, sub: `${o.item || 'Order'} · ${o.name} · ${n} of ${t.goalOrders || '?'} today`, value: n, goal: t.goalOrders });
        });
      store.set(seenKey, JSON.stringify(s.recent.map((o) => o.id)));
      const goalKey = `memobrick.goal.${t.date}`;
      if (t.goalOrders && (t.orders ?? 0) >= t.goalOrders && !store.get(goalKey)) {
        store.set(goalKey, '1');
        parties.push({ key: Date.now() + 99, kind: 'goal', title: 'Daily goal reached!', sub: `${t.orders} orders today · ${money(t.netSales ?? 0)} · keep going`, value: t.orders ?? 0, goal: t.goalOrders });
      }
    } else if (s.updated && store.get('memobrick.recap') !== s.updated) {
      store.set('memobrick.recap', s.updated);
      const y = s.history.at(-1);
      if (y && y.orders > 0)
        parties.push({ key: Date.now(), kind: y.goalOrders && y.orders >= y.goalOrders ? 'goal' : 'recap', title: `${y.orders} ${y.orders === 1 ? 'sale' : 'sales'} yesterday!`, sub: `${money(y.netSales)} on ${formatDay(y.date)}${y.goalOrders ? ` · goal ${y.goalOrders}` : ''}`, value: y.orders, goal: y.goalOrders });
    }
    if (parties.length) {
      setQueue((q) => [...q, ...parties]);
      if (soundRef.current) chime(parties.some((p) => p.kind === 'goal'));
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, [load]);

  const toggleSound = () =>
    setSound((on) => {
      store.set('memobrick.sound', on ? 'off' : 'on');
      return !on;
    });

  return { sales, party: queue[0] ?? null, next: () => setQueue((q) => q.slice(1)), sound, toggleSound };
}

/** Starts one step lower, then fills up to the new level, so you see the sale land in the cup. */
function RisingTrophy({ value, goal }: { value: number; goal: number }) {
  const [shown, setShown] = useState(Math.max(0, value - 1));
  useEffect(() => {
    const t = setTimeout(() => setShown(value), 450);
    return () => clearTimeout(t);
  }, [value]);
  return <Trophy value={shown} goal={goal} size={110} />;
}

const COLORS = ['#ef4444', '#f59e0b', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#c6e03a', '#14b8a6'];

/** Falling 1x1 bricks and a card. Click or wait to close. */
export function Celebration({ party, onDone }: { party: Party; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, party.kind === 'goal' ? 8000 : 6000);
    return () => clearTimeout(t);
  }, [party, onDone]);
  const bricks = Array.from({ length: party.kind === 'goal' ? 90 : 55 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.2,
    dur: 2.2 + Math.random() * 2,
    size: 14 + Math.random() * 14,
    color: COLORS[i % COLORS.length],
    spin: Math.random() * 720 - 360,
  }));
  const confetti = Array.from({ length: party.kind === 'goal' ? 140 : 90 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    dur: 2.6 + Math.random() * 2.4,
    w: 6 + Math.random() * 5,
    h: 10 + Math.random() * 8,
    round: Math.random() < 0.3,
    color: COLORS[(i * 7) % COLORS.length],
    sway: `${(Math.random() * 2 - 1) * 120}px`,
  }));
  return (
    <div className="party" onClick={onDone} role="status" aria-live="polite">
      {confetti.map((c, i) => (
        <span
          key={`c${i}`}
          className="party-confetti"
          style={{ left: `${c.left}%`, width: c.w, height: c.round ? c.w : c.h, borderRadius: c.round ? '50%' : 2, background: c.color, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, ['--sway' as string]: c.sway }}
        />
      ))}
      {bricks.map((b, i) => (
        <span
          key={i}
          className="party-brick"
          style={{ left: `${b.left}%`, width: b.size, height: b.size, background: b.color, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, ['--spin' as string]: `${b.spin}deg` }}
        />
      ))}
      <div className={`party-card party-${party.kind}`}>
        {party.goal ? (
          <div className="party-trophy">
            <RisingTrophy value={party.value ?? 0} goal={party.goal} />
          </div>
        ) : (
          <div className="party-emoji">{party.kind === 'recap' ? '📦' : '🎉'}</div>
        )}
        <div className="party-title">{party.title}</div>
        <div className="party-sub">{party.sub}</div>
      </div>
    </div>
  );
}

let trophyId = 0;

/** A trophy cup that fills with gold toward the goal, and shines when it's full. */
export function Trophy({ value, goal, size = 64, label }: { value: number; goal: number; size?: number; label?: string }) {
  const [id] = useState(() => `t${++trophyId}`);
  const p = goal ? Math.min(1, value / goal) : 0;
  const done = goal > 0 && value >= goal;
  const top = 12, bottom = 74;
  const y = bottom - (bottom - top) * p;
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" className={`trophy ${done ? 'done' : ''}`} role="img" aria-label={label ?? `${value} of ${goal}`}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" x2="1">
          <stop offset="0" stopColor="#f5b301" />
          <stop offset="0.45" stopColor="#ffe066" />
          <stop offset="1" stopColor="#e09b00" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <path d="M22 12 H78 V38 C78 60 66 74 50 74 C34 74 22 60 22 38 Z" />
        </clipPath>
      </defs>
      <path className="trophy-handle" d="M23 20 H11 C7 20 6 44 25 50" />
      <path className="trophy-handle" d="M77 20 H89 C93 20 94 44 75 50" />
      <path className="trophy-cup" d="M22 12 H78 V38 C78 60 66 74 50 74 C34 74 22 60 22 38 Z" />
      <g clipPath={`url(#${id}c)`}>
        <rect className="trophy-fill" x="18" y={y} width="64" height={bottom - y + 2} fill={`url(#${id}g)`} />
        {p > 0 && p < 1 && <path className="trophy-wave" d={`M10 ${y} q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 v6 h-100 z`} fill="#ffe680" />}
        <rect x="30" y="16" width="7" height="44" rx="3.5" fill="#fff" opacity="0.35" />
      </g>
      <rect className="trophy-stem" x="44" y="74" width="12" height="14" />
      <rect className="trophy-base" x="30" y="88" width="40" height="8" rx="2" />
      <rect className="trophy-plinth" x="24" y="96" width="52" height="16" rx="3" />
      <text x="50" y="108" textAnchor="middle" className="trophy-text">{value}/{goal || '·'}</text>
      {done && (
        <g className="trophy-sparkles">
          <path d="M14 6 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" />
          <path d="M86 2 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
          <path d="M92 60 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
        </g>
      )}
    </svg>
  );
}

function Bar({ value, goal, label }: { value: number; goal: number; label: string }) {
  const p = goal ? Math.min(100, (value / goal) * 100) : 0;
  return (
    <div className="goal-bar">
      <div className="goal-bar-top">
        <span>{label}</span>
        <span>
          <strong>{value}</strong> / {goal || '·'}
        </span>
      </div>
      <div className="goal-bar-track">
        <div className={`goal-bar-fill ${p >= 100 ? 'done' : ''}`} style={{ width: `${p}%` }} />
      </div>
    </div>
  );
}

/** Small card on the World view. */
export function SalesCard({ sales, onOpen }: { sales: SalesView | null; onOpen: () => void }) {
  if (!sales) return null;
  const t = sales.today;
  const y = sales.history.at(-1);
  return (
    <button className="sales-card" onClick={onOpen}>
      <div className="sales-card-today">
        <Trophy value={t.orders ?? y?.orders ?? 0} goal={t.orders === null ? y?.goalOrders ?? 0 : t.goalOrders} size={58} />
        <div>
          <div className="sales-card-title">{t.orders === null ? 'Yesterday' : 'Today'}</div>
          <div className="sales-card-sub">
            {t.orders === null ? `${y?.orders ?? 0} of ${y?.goalOrders ?? 0} orders` : `${t.orders} of ${t.goalOrders} orders · ${money(t.netSales ?? 0)}`}
          </div>
          {sales.streak > 0 && <div className="streak">🔥 {sales.streak}-day streak</div>}
        </div>
      </div>
      <Bar value={sales.week.orders} goal={sales.week.goalOrders} label="This week" />
      <Bar value={sales.month.orders} goal={sales.month.goalOrders} label={sales.month.label} />
    </button>
  );
}

/** The Sales page: goals, progress, history, live sales, and the weak points the agents work on. */
export function SalesPage({ sales, state, sound, onToggleSound }: { sales: SalesView | null; state: DashboardState; sound: boolean; onToggleSound: () => void }) {
  if (!sales) return <section className="page"><div className="page-body">Loading sales…</div></section>;
  const t = sales.today;
  const who = (n: string) => (n === 'owner' ? state.ownerName : state.agents.find((a) => a.name === n)?.displayName ?? n);
  const max = Math.max(1, ...sales.history.map((d) => Math.max(d.orders, d.goalOrders)));
  const f = sales.funnel;
  const pct = (a: number, b: number) => (b ? `${((a / b) * 100).toFixed(1)}%` : '·');
  return (
    <section className="page">
      <header className="page-head">
        <h1>Sales</h1>
      </header>
      <div className="page-body">
        <p className="page-intro">
          Every agent works toward one goal: more Memobrick sales every day.{' '}
          {sales.live ? 'Sales update live; each new order is celebrated as it comes in.' : `Live sales are not connected, so these numbers update each morning when Nicolás runs${sales.updated ? ` (last update ${formatDay(sales.updated.slice(0, 10))})` : ''}.`}{' '}
          <button className="link" onClick={onToggleSound}>
            {sound ? '🔔 Sound on' : '🔕 Sound off'}
          </button>
        </p>
        {sales.liveError && <p className="warn">Couldn't read live sales from Shopify: {sales.liveError}</p>}

        <div className="sales-big">
          <div className="sales-big-card">
            <Trophy value={t.orders ?? 0} goal={t.goalOrders} size={120} label="Today's goal" />
            <div className="sales-big-label">Today</div>
            <div className="sales-big-sub">{t.orders === null ? 'Live sales not connected' : `${t.orders} of ${t.goalOrders} orders · ${money(t.netSales ?? 0)} of ${money(t.goalNetSales)}`}</div>
            {sales.lastYearToday && <div className="sales-big-ly">Same day last year: {sales.lastYearToday.orders} orders</div>}
          </div>
          <div className="sales-big-card">
            <Trophy value={sales.week.orders} goal={sales.week.goalOrders} size={120} label="This week's goal" />
            <div className="sales-big-label">This week</div>
            <div className="sales-big-sub">
              {sales.week.orders} of {sales.week.goalOrders} orders · {money(sales.week.netSales)}
            </div>
          </div>
          <div className="sales-big-card">
            <Trophy value={sales.month.orders} goal={sales.month.goalOrders} size={120} label="This month's goal" />
            <div className="sales-big-label">{sales.month.label}</div>
            <div className="sales-big-sub">
              {sales.month.orders} of {sales.month.goalOrders} orders · {money(sales.month.netSales)}
            </div>
          </div>
          <div className="sales-big-card">
            <div className="streak-big">🔥 {sales.streak}</div>
            <div className="sales-big-label">Day streak</div>
            <div className="sales-big-sub">Days in a row the goal was met</div>
          </div>
        </div>

        <h2 className="section-title">Last 14 days</h2>
        <div className="history">
          {sales.history.map((d) => (
            <div key={d.date} className="history-col" title={`${formatDay(d.date)}: ${d.orders} orders, ${money(d.netSales)} (goal ${d.goalOrders})`}>
              <div className="history-bar-area">
                {d.goalOrders > 0 && <div className="history-goal" style={{ bottom: `${(d.goalOrders / max) * 100}%` }} />}
                <div className={`history-bar ${d.goalOrders && d.orders >= d.goalOrders ? 'done' : ''}`} style={{ height: `${(d.orders / max) * 100}%` }} />
              </div>
              <div className="history-n">{d.orders}</div>
              <div className="history-day">{formatDay(d.date).split(' ')[1]}</div>
            </div>
          ))}
        </div>

        {sales.recent.length > 0 && (
          <>
            <h2 className="section-title">Today's sales</h2>
            <ul className="recent">
              {sales.recent.map((o) => (
                <li key={o.id}>
                  <span className="recent-time">{new Date(o.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: sales.timezone })}</span>
                  <span>{o.item || o.name}</span>
                  <strong>{money(o.total)}</strong>
                </li>
              ))}
            </ul>
          </>
        )}

        {sales.weakPoints.length > 0 && (
          <>
            <h2 className="section-title">Weak points the team is fixing</h2>
            <div className="weak-list">
              {sales.weakPoints.map((w) => (
                <div key={w.title} className="weak">
                  <div className="weak-title">{w.title}</div>
                  <div className="weak-detail">{w.detail}</div>
                  <div className="weak-owners">On it: {w.owners.map(who).join(', ')}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {f && (
          <>
            <h2 className="section-title">Where visitors drop off ({f.period.toLowerCase()})</h2>
            <table className="dept-table funnel">
              <thead>
                <tr>
                  <th />
                  <th>Now</th>
                  <th>Last year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Visits</td>
                  <td>{f.now.sessions.toLocaleString()}</td>
                  <td>{f.lastYear.sessions.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Added to cart</td>
                  <td>{pct(f.now.addedToCart, f.now.sessions)}</td>
                  <td>{pct(f.lastYear.addedToCart, f.lastYear.sessions)}</td>
                </tr>
                <tr>
                  <td>Reached checkout</td>
                  <td>{pct(f.now.reachedCheckout, f.now.sessions)}</td>
                  <td>{pct(f.lastYear.reachedCheckout, f.lastYear.sessions)}</td>
                </tr>
                <tr>
                  <td>Bought</td>
                  <td>{pct(f.now.purchased, f.now.sessions)}</td>
                  <td>{pct(f.lastYear.purchased, f.lastYear.sessions)}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <h2 className="section-title">Goals</h2>
        <table className="dept-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Orders a day</th>
              <th>Sales a day</th>
            </tr>
          </thead>
          <tbody>
            {sales.goals.map((g) => (
              <tr key={g.from} className={g.from <= t.date && t.date <= g.to ? 'is-current' : ''}>
                <td>
                  {g.label} <span className="muted">({formatDay(g.from)} to {formatDay(g.to)})</span>
                </td>
                <td>{g.dailyOrders}</td>
                <td>{money(g.dailyNetSales)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="muted small">Goals live in marketing/shared/sales-goals.json. Ask Betty or Claude to change them.</p>
      </div>
    </section>
  );
}
