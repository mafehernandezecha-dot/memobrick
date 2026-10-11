import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { buildState } from './server/state';

const osDir = __dirname;
const repoDir = resolve(osDir, '..');

// Serves /api/state from the repo files on every request, so edits to
// agents.json, the approval queue or status files show up on reload.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'memobrick-state',
      configureServer(server) {
        server.middlewares.use('/api/state', (_req, res) => {
          try {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(buildState(osDir, repoDir)));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      },
    },
  ],
});
