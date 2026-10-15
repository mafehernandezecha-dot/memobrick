import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { decide, readMarketingFile, readMarketingMedia } from './server/actions';
import { isAllowed, isLocalAddress, ownAddresses, PAIR_HEADER, PAIR_MESSAGE, pairingKey, phoneLinks, rotatePairingKey } from './server/pairing';
import { CHAT_MODEL_LABEL, getChat, listChats, streamChat } from './server/chat';
import { buildSales } from './server/sales';
import { buildState } from './server/state';
import { decideAndSync, pullLatest } from './server/sync';

const osDir = __dirname;
const repoDir = resolve(osDir, '..');

const json = (res: ServerResponse, code: number, body: unknown) => {
  res.statusCode = code;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
};

const readBody = (req: IncomingMessage) =>
  new Promise<Record<string, unknown>>((ok, fail) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
      if (raw.length > 200_000) fail(new Error('Message too long.'));
    });
    req.on('end', () => {
      try {
        ok(raw ? JSON.parse(raw) : {});
      } catch {
        fail(new Error('Invalid JSON.'));
      }
    });
  });

// The local API. Everything is read from (and decisions written to) the repo
// on each request, so edits to agents.json, the queue or status files show up
// on reload. The app listens on the home network for Eden's phone, but only
// this computer and phones paired with the QR code may read or change anything.
export default defineConfig({
  server: {
    // Phones open the dashboard by the Mac's Bonjour name (name.local) or, away
    // from home, by its Tailscale name; IP addresses and localhost always work.
    allowedHosts: ['.local', '.ts.net'],
  },
  plugins: [
    react(),
    {
      name: 'memobrick-api',
      configureServer(server) {
        // Bring in the agents' latest work now and every few minutes (not in tests).
        if (!process.env.VITEST) {
          pullLatest(repoDir);
          setInterval(() => pullLatest(repoDir), 3 * 60_000).unref();
        }
        // Never serve os/data/ (chats, the pairing key) as plain files.
        server.middlewares.use((req, res, next) => {
          let path = (req.url ?? '/').split('?')[0];
          try {
            path = decodeURIComponent(path);
          } catch {
            /* keep it as is */
          }
          path = path.toLowerCase().replace(/\\/g, '/').replace(/\/+/g, '/');
          if (path === '/data' || path.startsWith('/data/') || path.includes('/os/data/')) return json(res, 404, { error: 'Not found.' });
          next();
        });
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://local');
          if (!url.pathname.startsWith('/api/')) return next();
          // Writes must come from the app's own page, never from another website open in the browser.
          const sameOrigin = !req.headers.origin || URL.canParse(req.headers.origin) && new URL(req.headers.origin).host === req.headers.host;
          const isJson = (req.headers['content-type'] ?? '').startsWith('application/json');
          const own = ownAddresses();
          const remote = req.socket.remoteAddress;
          const here = isLocalAddress(remote, own);
          // A paired phone sends its key as a header; images in docs carry it as ?pair=.
          const givenKey = String(req.headers[PAIR_HEADER] ?? '') || (req.method === 'GET' ? url.searchParams.get('pair') : null);
          const allowed = isAllowed({ remote, givenKey, key: pairingKey(osDir), own });
          const trusted = allowed && sameOrigin && (req.method === 'GET' || isJson);
          // The phone asks whether its key still works; this is the only open route.
          if (url.pathname === '/api/pair' && req.method === 'GET') return json(res, 200, { paired: allowed, here });
          if (!allowed) return json(res, 401, { error: PAIR_MESSAGE, pair: true });
          if (!trusted) return json(res, 403, { error: 'This request has to come from the dashboard page itself.' });
          try {
            if (url.pathname === '/api/state' && req.method === 'GET') {
              return json(res, 200, { ...buildState(osDir, repoDir), chatModel: CHAT_MODEL_LABEL });
            }
            if (url.pathname === '/api/sales' && req.method === 'GET') {
              return json(res, 200, await buildSales(repoDir));
            }
            if (url.pathname === '/api/file' && req.method === 'GET') {
              return json(res, 200, { path: url.searchParams.get('path'), text: readMarketingFile(repoDir, url.searchParams.get('path') ?? '') });
            }
            if (url.pathname === '/api/media' && req.method === 'GET') {
              const media = readMarketingMedia(repoDir, url.searchParams.get('path') ?? '');
              res.statusCode = 200;
              res.setHeader('content-type', media.type);
              res.setHeader('cache-control', 'no-cache');
              res.setHeader('x-content-type-options', 'nosniff');
              return res.end(media.data);
            }
            const decideMatch = url.pathname.match(/^\/api\/approvals\/([A-Za-z0-9-]+)$/);
            if (decideMatch && req.method === 'POST') {
              const body = await readBody(req);
              const decision = body.decision === 'changes' ? { decision: 'changes' as const, note: String(body.note ?? '') } : body.decision === 'approved' || body.decision === 'rejected' ? { decision: body.decision } : null;
              if (!decision) return json(res, 400, { error: 'Invalid decision.' });
              const label = `${decideMatch[1]} ${decision.decision === 'changes' ? 'changes requested' : decision.decision}`;
              const { result, sync } = await decideAndSync(repoDir, label, () => decide(repoDir, decideMatch[1], decision));
              return json(res, 200, { ...result, sync });
            }
            if (url.pathname === '/api/chats' && req.method === 'GET') return json(res, 200, listChats(osDir));
            const chatMatch = url.pathname.match(/^\/api\/chats\/([a-z0-9-]+)$/);
            if (chatMatch && req.method === 'GET') {
              const chat = getChat(osDir, chatMatch[1]);
              return chat ? json(res, 200, chat) : json(res, 404, { error: "Couldn't find that conversation." });
            }
            if (url.pathname === '/api/chat' && req.method === 'POST') {
              const body = await readBody(req);
              return streamChat(osDir, repoDir, { id: body.id ? String(body.id) : undefined, message: String(body.message ?? '') }, res);
            }
            // "Open on your phone" and "Forget paired phones": only on this computer.
            if (url.pathname === '/api/phone' && req.method === 'GET') {
              if (!here) return json(res, 403, { error: 'Open this on your Mac to see the pairing QR.' });
              return json(res, 200, phoneLinks(osDir, req.socket.localPort ?? 5173));
            }
            if (url.pathname === '/api/phone/forget' && req.method === 'POST') {
              if (!here || !trusted) return json(res, 403, { error: 'Only your Mac can forget paired phones.' });
              rotatePairingKey(osDir);
              return json(res, 200, phoneLinks(osDir, req.socket.localPort ?? 5173));
            }
            return json(res, 404, { error: 'Unknown route.' });
          } catch (err) {
            return json(res, 400, { error: err instanceof Error ? err.message : String(err) });
          }
        });
      },
    },
  ],
});
