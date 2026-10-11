import type { IncomingMessage, ServerResponse } from 'node:http';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { decide, readMarketingFile } from './server/actions';
import { CHAT_MODEL_LABEL, getChat, listChats, streamChat } from './server/chat';
import { buildState } from './server/state';

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
      if (raw.length > 200_000) fail(new Error('Mensaje demasiado largo.'));
    });
    req.on('end', () => {
      try {
        ok(raw ? JSON.parse(raw) : {});
      } catch {
        fail(new Error('JSON inválido.'));
      }
    });
  });

// The local API. Everything is read from (and decisions written to) the repo
// on each request, so edits to agents.json, the queue or status files show up
// on reload. Only requests from this computer are accepted for writes.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'memobrick-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://local');
          if (!url.pathname.startsWith('/api/')) return next();
          // Writes must come from this computer and from the app's own page, never
          // from another website open in the browser.
          const sameOrigin = !req.headers.origin || URL.canParse(req.headers.origin) && new URL(req.headers.origin).host === req.headers.host;
          const isJson = (req.headers['content-type'] ?? '').startsWith('application/json');
          const local = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress ?? '') && sameOrigin && (req.method === 'GET' || isJson);
          try {
            if (url.pathname === '/api/state' && req.method === 'GET') {
              return json(res, 200, { ...buildState(osDir, repoDir), chatModel: CHAT_MODEL_LABEL });
            }
            if (url.pathname === '/api/file' && req.method === 'GET') {
              return json(res, 200, { path: url.searchParams.get('path'), text: readMarketingFile(repoDir, url.searchParams.get('path') ?? '') });
            }
            const decideMatch = url.pathname.match(/^\/api\/approvals\/([A-Za-z0-9-]+)$/);
            if (decideMatch && req.method === 'POST') {
              if (!local) return json(res, 403, { error: 'Las decisiones solo se toman desde esta computadora.' });
              const body = await readBody(req);
              const decision = body.decision === 'changes' ? { decision: 'changes' as const, note: String(body.note ?? '') } : body.decision === 'approved' || body.decision === 'rejected' ? { decision: body.decision } : null;
              if (!decision) return json(res, 400, { error: 'Decisión no válida.' });
              return json(res, 200, decide(repoDir, decideMatch[1], decision));
            }
            if (url.pathname === '/api/chats' && req.method === 'GET') return json(res, 200, listChats(osDir));
            const chatMatch = url.pathname.match(/^\/api\/chats\/([a-z0-9-]+)$/);
            if (chatMatch && req.method === 'GET') {
              const chat = getChat(osDir, chatMatch[1]);
              return chat ? json(res, 200, chat) : json(res, 404, { error: 'No encontré esa conversación.' });
            }
            if (url.pathname === '/api/chat' && req.method === 'POST') {
              if (!local) return json(res, 403, { error: 'El chat solo funciona desde esta computadora.' });
              const body = await readBody(req);
              return streamChat(osDir, repoDir, { id: body.id ? String(body.id) : undefined, message: String(body.message ?? '') }, res);
            }
            return json(res, 404, { error: 'Ruta desconocida.' });
          } catch (err) {
            return json(res, 400, { error: err instanceof Error ? err.message : String(err) });
          }
        });
      },
    },
  ],
});
