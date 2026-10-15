import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { isAllowed, isLocalAddress, keyMatches, pairingKey, rotatePairingKey } from './pairing';

const KEY = 'k3y-for-tests-0123456789abcdef';

describe('phone pairing check', () => {
  it('allows this computer without a key', () => {
    for (const remote of ['127.0.0.1', '::1', '::ffff:127.0.0.1']) expect(isAllowed({ remote, givenKey: null, key: KEY })).toBe(true);
  });

  it("allows the computer's own network address", () => {
    expect(isLocalAddress('::ffff:192.168.1.20', ['192.168.1.20'])).toBe(true);
    expect(isAllowed({ remote: '192.168.1.20', givenKey: undefined, key: KEY, own: ['192.168.1.20'] })).toBe(true);
    expect(isLocalAddress('fe80::1c2b%en0', ['fe80::1c2b'])).toBe(true);
  });

  it('allows a phone with the right key', () => {
    expect(isAllowed({ remote: '::ffff:192.168.1.44', givenKey: KEY, key: KEY, own: ['192.168.1.20'] })).toBe(true);
  });

  it('rejects a phone with a wrong or missing key', () => {
    const remote = '192.168.1.44';
    expect(isAllowed({ remote, givenKey: 'wrong', key: KEY })).toBe(false);
    expect(isAllowed({ remote, givenKey: `${KEY}x`, key: KEY })).toBe(false);
    expect(isAllowed({ remote, givenKey: '', key: KEY })).toBe(false);
    expect(isAllowed({ remote, givenKey: null, key: KEY })).toBe(false);
    expect(isAllowed({ remote, givenKey: undefined, key: KEY })).toBe(false);
    expect(isAllowed({ remote: undefined, givenKey: null, key: KEY })).toBe(false);
  });

  it('never matches an empty key', () => {
    expect(keyMatches('', '')).toBe(false);
  });
});

describe('pairing key file', () => {
  let dir = '';
  afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

  it('creates the key once, keeps it, and makes a new one on forget', () => {
    dir = mkdtempSync(join(tmpdir(), 'pair-'));
    const first = pairingKey(dir);
    expect(first.length).toBeGreaterThanOrEqual(16);
    expect(pairingKey(dir)).toBe(first);
    expect(JSON.parse(readFileSync(join(dir, 'data', 'phone-pairing.json'), 'utf8')).key).toBe(first);
    const second = rotatePairingKey(dir);
    expect(second).not.toBe(first);
    expect(pairingKey(dir)).toBe(second);
  });
});
