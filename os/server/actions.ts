// Owner actions the dashboard can take on repo files: decide an approval item
// and read a marketing file for viewing. Both stay inside marketing/.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { setQueueStatus, statusFor } from './parse';
import type { Decision } from './parse';

export function decide(repoDir: string, id: string, decision: Decision) {
  const file = join(repoDir, 'marketing', 'approvals', 'queue.md');
  const md = readFileSync(file, 'utf8');
  const status = statusFor(decision);
  writeFileSync(file, setQueueStatus(md, id, status));
  return { id, status };
}

/** Reads a text file under marketing/. Rejects anything outside it. */
export function readMarketingFile(repoDir: string, rel: string) {
  const base = resolve(repoDir, 'marketing');
  const full = resolve(repoDir, rel);
  const inside = relative(base, full);
  if (!inside || inside.startsWith('..') || inside.includes('\0')) throw new Error('Only files in the marketing folder can be shown.');
  if (!/\.(md|txt|json|csv)$/i.test(full)) throw new Error("That file type can't be shown.");
  if (!existsSync(full)) throw new Error(`${rel} doesn't exist.`);
  return readFileSync(full, 'utf8');
}
