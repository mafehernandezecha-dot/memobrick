import { describe, expect, it } from 'vitest';
import { goalFor, summarize } from './sales';

const goals = [
  { from: '2026-10-01', to: '2026-11-15', label: 'Fall', dailyOrders: 5, dailyNetSales: 550 },
  { from: '2026-11-16', to: '2026-11-30', label: 'BF', dailyOrders: 12, dailyNetSales: 1300 },
];
const day = (date: string, orders: number, netSales = orders * 100) => ({ date, orders, netSales });

describe('sales summary', () => {
  it('finds the goal period for a date', () => {
    expect(goalFor(goals, '2026-11-15')?.label).toBe('Fall');
    expect(goalFor(goals, '2026-11-16')?.dailyOrders).toBe(12);
    expect(goalFor(goals, '2027-01-01')).toBeNull();
  });

  it('adds up the week (Monday to Sunday) and month, including live today', () => {
    // 2026-10-14 is a Wednesday.
    const s = summarize({ days: [day('2026-10-11', 9), day('2026-10-12', 2), day('2026-10-13', 3)], lastYear: [day('2025-10-14', 2)], goals, today: '2026-10-14', todayLive: day('2026-10-14', 4) });
    expect(s.week.orders).toBe(9);
    expect(s.week.goalOrders).toBe(35);
    expect(s.month.orders).toBe(18);
    expect(s.month.goalOrders).toBe(155);
    expect(s.today).toMatchObject({ orders: 4, goalOrders: 5, label: 'Fall' });
    expect(s.lastYearToday?.orders).toBe(2);
    expect(s.history).toHaveLength(14);
  });

  it('counts the streak of days that met the goal', () => {
    const days = [day('2026-10-10', 1), day('2026-10-11', 5), day('2026-10-12', 7)];
    expect(summarize({ days, lastYear: [], goals, today: '2026-10-13', todayLive: null }).streak).toBe(2);
    expect(summarize({ days, lastYear: [], goals, today: '2026-10-13', todayLive: day('2026-10-13', 6) }).streak).toBe(3);
    expect(summarize({ days, lastYear: [], goals, today: '2026-10-13', todayLive: day('2026-10-13', 2) }).streak).toBe(2);
  });

  it('shows today as unknown without live data', () => {
    expect(summarize({ days: [], lastYear: [], goals, today: '2026-10-13', todayLive: null }).today.orders).toBeNull();
  });
});
