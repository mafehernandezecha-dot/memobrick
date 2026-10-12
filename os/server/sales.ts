// Sales and goals for the dashboard. Daily history comes from
// marketing/sales/latest.json (written by the growth analyst from Shopify) and
// goals from marketing/shared/sales-goals.json. When the owner's computer has a
// read-only Shopify token (SHOPIFY_STORE + SHOPIFY_ADMIN_TOKEN), today's orders
// are read live so each new sale can be celebrated as it happens. Only order
// numbers, amounts and product titles are read, never customer details.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Day = { date: string; orders: number; netSales: number };
export type Goal = { from: string; to: string; label: string; dailyOrders: number; dailyNetSales: number };
export type LiveOrder = { id: string; name: string; at: string; total: number; item: string };
export type WeakPoint = { title: string; detail: string; owners: string[] };
type Funnel = { sessions: number; addedToCart: number; reachedCheckout: number; purchased: number };

export type SalesView = {
  timezone: string;
  live: boolean;
  liveError: string | null;
  updated: string | null;
  today: { date: string; orders: number | null; netSales: number | null; goalOrders: number; goalNetSales: number; label: string };
  week: { orders: number; netSales: number; goalOrders: number };
  month: { orders: number; netSales: number; goalOrders: number; label: string };
  lastYearToday: Day | null;
  streak: number;
  history: (Day & { goalOrders: number })[];
  recent: LiveOrder[];
  weakPoints: WeakPoint[];
  funnel: { period: string; now: Funnel; lastYear: Funnel } | null;
  goals: Goal[];
};

const readJson = <T>(p: string): T | null => {
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, 'utf8')) as T;
  } catch {
    return null;
  }
};

/** YYYY-MM-DD for a moment in a time zone. */
export const dayIn = (tz: string, at = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(at);

const addDays = (date: string, n: number) => {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export const goalFor = (goals: Goal[], date: string) => goals.find((g) => g.from <= date && date <= g.to) ?? null;

/** Days of the Monday-to-Sunday week containing `date`. */
const weekOf = (date: string) => {
  const dow = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => addDays(date, i - dow));
};

const monthOf = (date: string) => {
  const out: string[] = [];
  for (let d = `${date.slice(0, 8)}01`; d.slice(0, 7) === date.slice(0, 7); d = addDays(d, 1)) out.push(d);
  return out;
};

export function summarize(opts: { days: Day[]; lastYear: Day[]; goals: Goal[]; today: string; todayLive: Day | null }): Pick<SalesView, 'today' | 'week' | 'month' | 'lastYearToday' | 'streak' | 'history'> {
  const { goals, today, todayLive } = opts;
  const byDate = new Map(opts.days.map((d) => [d.date, d]));
  if (todayLive) byDate.set(today, todayLive);
  const goalOrders = (d: string) => goalFor(goals, d)?.dailyOrders ?? 0;
  const sum = (dates: string[], key: 'orders' | 'netSales') => dates.reduce((n, d) => n + (byDate.get(d)?.[key] ?? 0), 0);

  const week = weekOf(today);
  const month = monthOf(today);
  const g = goalFor(goals, today);

  // Streak: consecutive finished days before today that met their goal (today counts once it's met).
  let streak = 0;
  if (todayLive && g && todayLive.orders >= g.dailyOrders) streak++;
  for (let d = addDays(today, -1); ; d = addDays(d, -1)) {
    const day = byDate.get(d);
    const goal = goalOrders(d);
    if (!day || !goal || day.orders < goal) break;
    streak++;
  }

  const lyDate = `${Number(today.slice(0, 4)) - 1}${today.slice(4)}`;
  return {
    today: { date: today, orders: todayLive?.orders ?? null, netSales: todayLive?.netSales ?? null, goalOrders: g?.dailyOrders ?? 0, goalNetSales: g?.dailyNetSales ?? 0, label: g?.label ?? '' },
    week: { orders: sum(week, 'orders'), netSales: round(sum(week, 'netSales')), goalOrders: week.reduce((n, d) => n + goalOrders(d), 0) },
    month: { orders: sum(month, 'orders'), netSales: round(sum(month, 'netSales')), goalOrders: month.reduce((n, d) => n + goalOrders(d), 0), label: new Date(`${today}T12:00:00Z`).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }) },
    lastYearToday: opts.lastYear.find((d) => d.date === lyDate) ?? null,
    streak,
    history: Array.from({ length: 14 }, (_, i) => addDays(today, i - 14)).map((d) => ({ date: d, orders: byDate.get(d)?.orders ?? 0, netSales: byDate.get(d)?.netSales ?? 0, goalOrders: goalOrders(d) })),
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

// Live orders, cached briefly so polling the dashboard doesn't hammer Shopify.
let cache: { at: number; key: string; orders: LiveOrder[] } | null = null;

async function fetchTodayOrders(store: string, token: string, tz: string, today: string): Promise<LiveOrder[]> {
  if (cache && cache.key === today && Date.now() - cache.at < 45_000) return cache.orders;
  // Start of today in the store's time zone, as an offset timestamp.
  const offset = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName')?.value.replace('GMT', '') || '+00:00';
  const since = `${today}T00:00:00${offset === '' ? '+00:00' : offset}`;
  const url = `https://${store}/admin/api/2025-07/orders.json?status=any&limit=250&created_at_min=${encodeURIComponent(since)}&fields=id,name,created_at,current_subtotal_price,cancelled_at,line_items`;
  const res = await fetch(url, { headers: { 'X-Shopify-Access-Token': token } });
  if (!res.ok) throw new Error(`Shopify answered ${res.status}`);
  const body = (await res.json()) as { orders: { id: number; name: string; created_at: string; current_subtotal_price: string; cancelled_at: string | null; line_items: { title: string }[] }[] };
  const orders = body.orders
    .filter((o) => !o.cancelled_at)
    .map((o) => ({ id: String(o.id), name: o.name, at: o.created_at, total: Number(o.current_subtotal_price), item: o.line_items[0]?.title ?? '' }))
    .sort((a, b) => b.at.localeCompare(a.at));
  cache = { at: Date.now(), key: today, orders };
  return orders;
}

export async function buildSales(repoDir: string, env = process.env): Promise<SalesView> {
  const goalsFile = readJson<{ timezone?: string; periods?: Goal[] }>(join(repoDir, 'marketing', 'shared', 'sales-goals.json'));
  const pulse = readJson<{ updated?: string; days?: Day[]; lastYear?: Day[]; weakPoints?: WeakPoint[]; funnel?: SalesView['funnel'] }>(join(repoDir, 'marketing', 'sales', 'latest.json'));
  const tz = goalsFile?.timezone ?? 'America/New_York';
  const today = dayIn(tz);

  let recent: LiveOrder[] = [];
  let liveError: string | null = null;
  const live = Boolean(env.SHOPIFY_STORE && env.SHOPIFY_ADMIN_TOKEN);
  if (live) {
    try {
      recent = await fetchTodayOrders(String(env.SHOPIFY_STORE), String(env.SHOPIFY_ADMIN_TOKEN), tz, today);
    } catch (err) {
      liveError = err instanceof Error ? err.message : String(err);
    }
  }
  const todayLive = live && !liveError ? { date: today, orders: recent.length, netSales: round(recent.reduce((n, o) => n + o.total, 0)) } : null;

  return {
    timezone: tz,
    live: live && !liveError,
    liveError,
    updated: pulse?.updated ?? null,
    ...summarize({ days: (pulse?.days ?? []).filter((d) => d.date !== today), lastYear: pulse?.lastYear ?? [], goals: goalsFile?.periods ?? [], today, todayLive }),
    recent,
    weakPoints: pulse?.weakPoints ?? [],
    funnel: pulse?.funnel ?? null,
    goals: goalsFile?.periods ?? [],
  };
}
