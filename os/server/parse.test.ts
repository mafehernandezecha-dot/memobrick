import { describe, expect, it } from 'vitest';
import { parseQueue, parseReportName, parseReportSummary, parseScorecardLatestWeek, parseStatus, setQueueStatus, statusFor } from './parse';

describe('parseQueue', () => {
  const md = `# Approval queue

## Time-sensitive

(Items expiring within 7 days.)

## A-2026W41-001
- Agent: social-planner
- Type: publish
- Expires: 2026-10-12
- Status: pending

## A-2026W41-002
- Agent: seo-technical
- Type: site-change
- Status: approved
`;
  it('reads items and skips section headings', () => {
    const items = parseQueue(md);
    expect(items.map((i) => i.id)).toEqual(['A-2026W41-001', 'A-2026W41-002']);
    expect(items[0]).toMatchObject({ agent: 'social-planner', type: 'publish', status: 'pending', expires: '2026-10-12' });
    expect(items[1].status).toBe('approved');
  });
});

describe('parseScorecardLatestWeek', () => {
  it('returns the last weekly row', () => {
    const md = `## Baseline
| Source | Orders |
|---|---|
| Google | 75 |

## Weekly

| Week | Net sales | Orders | Conversion |
|---|---|---|---|
| 2026-09-28 to 2026-10-04 | $1,601.53 | 13 | 0.7% |
| 2026-10-05 to 2026-10-11 | $2,068.56 | 18 | 1.87% |
`;
    expect(parseScorecardLatestWeek(md)).toEqual({ week: '2026-10-05 to 2026-10-11', netSales: '$2,068.56', orders: 18 });
  });
  it('returns null without weekly rows', () => {
    expect(parseScorecardLatestWeek('## Weekly\n\n| Week | Orders |\n|---|---|\n')).toBeNull();
  });
});

describe('parseReportName', () => {
  it('splits date and agent', () => {
    expect(parseReportName('2026-10-11-seo-technical.md')).toEqual({ date: '2026-10-11', agent: 'seo-technical', file: '2026-10-11-seo-technical.md' });
    expect(parseReportName('.gitkeep')).toBeNull();
  });
});

describe('parseStatus', () => {
  it('accepts known states only', () => {
    expect(parseStatus('{"state":"working","task":"Brief","updated":"2026-10-11T10:00"}')?.state).toBe('working');
    expect(parseStatus('{"state":"busy"}')).toBeNull();
    expect(parseStatus('not json')).toBeNull();
  });
});

describe('setQueueStatus', () => {
  const md = `## A-1
- Agent: a
- Status: pending
- Note: keep me

## A-2
- Agent: b
- Status: pending
`;
  it('changes only the Status line of the chosen item', () => {
    const out = setQueueStatus(md, 'A-2', 'approved');
    expect(out).toBe(md.replace('- Agent: b\n- Status: pending', '- Agent: b\n- Status: approved'));
    expect(parseQueue(out).map((i) => i.status)).toEqual(['pending', 'approved']);
  });
  it('refuses unknown or already decided items', () => {
    expect(() => setQueueStatus(md, 'A-9', 'approved')).toThrow(/Couldn't find/);
    expect(() => setQueueStatus(setQueueStatus(md, 'A-1', 'rejected'), 'A-1', 'approved')).toThrow(/already has a decision/);
  });
});

describe('statusFor', () => {
  it('writes changes notes on one line and requires text', () => {
    expect(statusFor({ decision: 'changes', note: ' shorter\n please ' })).toBe('changes: shorter please');
    expect(statusFor({ decision: 'approved' })).toBe('approved');
    expect(() => statusFor({ decision: 'changes', note: '  ' })).toThrow();
  });
});

describe('parseReportSummary', () => {
  it('reads title and summary bullets', () => {
    expect(parseReportSummary('# DRY RUN: x 2026-10-11\n\n## Summary\n\n- One.\n- Two.\n\n## Done\n- z')).toEqual({ title: 'DRY RUN: x 2026-10-11', summary: 'One. Two.' });
  });
});
