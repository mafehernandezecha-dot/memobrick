import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { OFFICE, ROOMS, placeAgents } from './layout';

const agents = JSON.parse(readFileSync(resolve(__dirname, '../../agents.json'), 'utf8')).agents as { character: string }[];

describe('office layout', () => {
  it('gives every agent in agents.json its own desk', () => {
    const chars = agents.map((a) => a.character);
    const placed = placeAgents(chars);
    expect([...placed.keys()].sort()).toEqual([...chars].sort());
    const spots = [...placed.values()].map((p) => `${p.x},${p.z}`);
    expect(new Set(spots).size).toBe(spots.length);
  });

  it('sends unknown characters to the Sala de juntas', () => {
    expect(placeAgents(['newcomer']).get('newcomer')?.roomId).toBe('boardroom');
  });

  it('keeps rooms inside the office and seats inside their rooms', () => {
    for (const r of ROOMS) {
      expect(r.x + r.w).toBeLessThanOrEqual(OFFICE.w);
      expect(r.z + r.d).toBeLessThanOrEqual(OFFICE.d);
      expect(r.seats.length).toBeGreaterThanOrEqual(r.cast.length);
      for (const s of r.seats) {
        expect(s.x).toBeGreaterThan(0);
        expect(s.x).toBeLessThan(r.w);
        expect(s.z).toBeGreaterThan(0);
        expect(s.z).toBeLessThan(r.d);
      }
    }
  });

  it('does not overlap rooms', () => {
    for (const a of ROOMS)
      for (const b of ROOMS) {
        if (a === b) continue;
        const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.z < b.z + b.d && b.z < a.z + a.d;
        expect(overlap, `${a.id} overlaps ${b.id}`).toBe(false);
      }
  });
});
