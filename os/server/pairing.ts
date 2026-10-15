// Phone pairing. The dashboard listens on the home network so Eden's phone can
// open it, but only this computer and phones that scanned the pairing QR may
// see or change anything. The key is made once, kept in os/data/ (never pushed),
// and replaced by "Forget paired phones".
import { execFileSync } from 'node:child_process';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { hostname, networkInterfaces } from 'node:os';
import { join } from 'node:path';

export const PAIR_HEADER = 'x-memobrick-pair';
export const PAIR_MESSAGE = 'Open the pairing QR on your Mac to use this phone.';

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

const keyFile = (osDir: string) => join(osDir, 'data', 'phone-pairing.json');
const newKey = () => randomBytes(24).toString('base64url');

function saveKey(osDir: string, key: string) {
  mkdirSync(join(osDir, 'data'), { recursive: true });
  writeFileSync(keyFile(osDir), JSON.stringify({ key, created: new Date().toISOString() }, null, 2), { mode: 0o600 });
  return key;
}

/** The pairing key, created the first time it is needed. */
export function pairingKey(osDir: string): string {
  try {
    const key = JSON.parse(readFileSync(keyFile(osDir), 'utf8')).key;
    if (typeof key === 'string' && key.length >= 16) return key;
  } catch {
    /* missing or unreadable: make a new one */
  }
  return saveKey(osDir, newKey());
}

/** "Forget paired phones": a new key, so every phone has to scan the QR again. */
export function rotatePairingKey(osDir: string): string {
  return saveKey(osDir, newKey());
}

/** This computer's own network addresses (IPv4 and IPv6), e.g. when it opens its own name.local. */
export function ownAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((n) => n && !n.internal)
    .map((n) => n!.address.replace(/%.*$/, '').toLowerCase());
}

/** The IPv4 addresses a phone on the same Wi-Fi can open. */
export function lanAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((n) => n && n.family === 'IPv4' && !n.internal)
    .map((n) => n!.address);
}

/** True when the request comes from this computer (loopback or one of its own addresses). */
export function isLocalAddress(remote: string | undefined, own: string[] = []) {
  if (!remote) return false;
  if (LOOPBACK.has(remote)) return true;
  const addr = remote.replace(/^::ffff:/i, '').replace(/%.*$/, '').toLowerCase();
  return own.includes(addr);
}

/** Compares keys in constant time. */
export function keyMatches(given: string | null | undefined, key: string) {
  if (!given || !key) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** May this request see and use the dashboard? This computer always may; a phone needs the right key. */
export function isAllowed(opts: { remote: string | undefined; givenKey: string | null | undefined; key: string; own?: string[] }) {
  return isLocalAddress(opts.remote, opts.own) || keyMatches(opts.givenKey, opts.key);
}

/** The computer's Bonjour name, e.g. "Edens-MacBook-Air.local", which phones on the same Wi-Fi can open. */
export function localHostName(): string {
  let name = '';
  if (process.platform === 'darwin') {
    try {
      name = execFileSync('scutil', ['--get', 'LocalHostName'], { encoding: 'utf8', timeout: 2000 }).trim();
    } catch {
      /* fall back to the hostname */
    }
  }
  name ||= hostname();
  return `${name.replace(/\.local$/i, '').split('.')[0]}.local`;
}

/** The addresses to show in "Open on your phone", each with the pairing key. */
export function phoneLinks(osDir: string, port: number) {
  const key = pairingKey(osDir);
  const host = localHostName();
  const link = (h: string) => `http://${h}:${port}/?pair=${encodeURIComponent(key)}`;
  return { name: link(host), ips: lanAddresses().map(link) };
}
