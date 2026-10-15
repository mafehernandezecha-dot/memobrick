// Talks to the dashboard's server. A paired phone keeps its key (from the
// pairing QR's ?pair=) in this browser and sends it with every request; the
// computer running the app needs no key.

export const PAIR_HEADER = 'x-memobrick-pair';
const STORE = 'memobrick.pair';

function readStored() {
  try {
    return localStorage.getItem(STORE);
  } catch {
    return null;
  }
}

let memoryKey: string | null = null;

/** Saves the key from a pairing link (?pair=...). The link stays in the address bar so Add to Home Screen keeps it. */
export function savePairFromUrl(search = location.search) {
  const key = new URLSearchParams(search).get('pair');
  if (!key) return;
  memoryKey = key;
  try {
    localStorage.setItem(STORE, key);
  } catch {
    /* private mode: the key lives for this visit only */
  }
}

export const pairKey = () => memoryKey ?? readStored();

/** fetch() for /api/ routes, with the phone's pairing key when there is one. */
export function api(path: string, init: RequestInit = {}) {
  const key = pairKey();
  const headers = new Headers(init.headers);
  if (key) headers.set(PAIR_HEADER, key);
  return fetch(path, { ...init, headers });
}

/** For URLs the browser loads itself (images in docs), which can't carry a header. */
export function withPair(url: string) {
  const key = pairKey();
  return key && url.startsWith('/api/') ? `${url}${url.includes('?') ? '&' : '?'}pair=${encodeURIComponent(key)}` : url;
}
