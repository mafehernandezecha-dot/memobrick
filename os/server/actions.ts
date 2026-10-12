// Owner actions the dashboard can take on repo files: decide an approval item
// and read a marketing file or image for viewing. All stay inside marketing/.
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
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

/** Resolves a repo-relative path. Rejects anything outside marketing/. */
function marketingPath(repoDir: string, rel: string) {
  const base = resolve(repoDir, 'marketing');
  const full = resolve(repoDir, rel);
  const inside = relative(base, full);
  if (!inside || inside.startsWith('..') || inside.includes('\0')) throw new Error('Only files in the marketing folder can be shown.');
  return full;
}

/** Reads a text file under marketing/. Rejects anything outside it. */
export function readMarketingFile(repoDir: string, rel: string) {
  const full = marketingPath(repoDir, rel);
  if (!/\.(md|txt|json|csv)$/i.test(full)) throw new Error("That file type can't be shown.");
  if (!existsSync(full)) throw new Error(`${rel} doesn't exist.`);
  return readFileSync(full, 'utf8');
}

const MEDIA_TYPES: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
};

/** Reads an image under marketing/, such as an email preview shown inside a doc. */
export function readMarketingMedia(repoDir: string, rel: string) {
  const full = marketingPath(repoDir, rel);
  const type = MEDIA_TYPES[full.split('.').pop()?.toLowerCase() ?? ''];
  if (!type) throw new Error("That file type can't be shown.");
  if (!existsSync(full) || !statSync(full).isFile()) throw new Error(`${rel} doesn't exist.`);
  return { type, data: readFileSync(full) };
}
