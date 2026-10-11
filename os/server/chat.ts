// Chat with Betty. Runs on the owner's computer with the official Anthropic SDK;
// credentials come from the environment (ANTHROPIC_API_KEY or an `ant auth login`
// profile), never from the browser. Conversations are saved under os/data/chats/.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import type { ServerResponse } from 'node:http';
import { join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { buildState } from './state';
import type { DashboardState } from './state';

export const CHAT_MODEL = 'claude-opus-5-5';
export const CHAT_MODEL_LABEL = 'Claude Opus 5.5';

export type ChatMessage = { role: 'user' | 'assistant'; content: string; at: string };
export type Chat = { id: string; title: string; created: string; updated: string; messages: ChatMessage[] };

const chatsDir = (osDir: string) => join(osDir, 'data', 'chats');
const safeId = (id: string) => /^[a-z0-9-]{6,40}$/.test(id);

export function listChats(osDir: string) {
  const dir = chatsDir(osDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')) as Chat)
    .map(({ id, title, updated }) => ({ id, title, updated }))
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getChat(osDir: string, id: string): Chat | null {
  if (!safeId(id)) return null;
  const file = join(chatsDir(osDir), `${id}.json`);
  return existsSync(file) ? (JSON.parse(readFileSync(file, 'utf8')) as Chat) : null;
}

function saveChat(osDir: string, chat: Chat) {
  mkdirSync(chatsDir(osDir), { recursive: true });
  writeFileSync(join(chatsDir(osDir), `${chat.id}.json`), JSON.stringify(chat, null, 2));
}

/** Betty's instructions plus everything the dashboard knows, read fresh from the repo. */
export function systemPrompt(state: DashboardState) {
  const byName = new Map(state.agents.map((a) => [a.name, a]));
  const who = (name: string) => byName.get(name)?.displayName ?? name;
  const team = state.agents
    .map((a) => `- ${a.displayName} (${a.name}): ${a.role}. Departamento: ${a.department ?? 'sin departamento'}. ${a.status === 'active' ? 'Activo' : a.status === 'planned' ? 'Por crear' : 'Sin rol'}.${a.live ? ` Estado en vivo: ${a.live.state}${a.live.task ? `, "${a.live.task}"` : ''}.` : ''}`)
    .join('\n');
  const queue = state.approvals.items.length
    ? state.approvals.items
        .map((i) => `- ${i.id} · de ${who(i.agent)} · tipo ${i.type} · vence ${i.expires || 'sin fecha'} · ${i.reason}${i.flag ? ` · Revisar antes: ${i.flag}` : ''}${i.note ? ` · Nota: ${i.note}` : ''} · Borrador: ${i.draft}`)
        .join('\n')
    : 'No hay propuestas pendientes.';
  const reports = state.reports.items.length
    ? state.reports.items.map((r) => `- ${r.date} · ${who(r.agent)} · ${r.title}: ${r.summary} (${r.path})`).join('\n')
    : 'Todavía no hay reportes.';
  const week = state.week ? `Semana ${state.week.label}: ${state.week.orders ?? 'sin dato'} pedidos, ${state.week.netSales} en ventas netas.` : 'Sin números de ventas todavía.';

  return `Eres Betty, la persona con quien ${state.ownerName} habla en ${state.appName}, el tablero de los agentes de marketing de ${state.company}. ${state.company} vende retratos de fotos personalizados hechos con piezas tipo LEGO. Tú llevas las prioridades y la fila de aprobaciones de ${state.ownerName}, y conoces a todo el equipo.

Cómo hablas:
- En español, cálida y directa, como Betty: breve, clara, con orden. Tutea a ${state.ownerName}.
- Respuestas cortas. Usa listas solo cuando ayudan.
- No uses rayas largas (em dash).
- Nunca inventes números, tareas, fechas ni agentes. Si un dato no está abajo, dilo y explica dónde se consigue.

Lo que puedes y no puedes hacer:
- Puedes explicar en qué va cada agente, qué espera decisión, qué dicen los reportes y cómo usar la app.
- No puedes aprobar, enviar, publicar ni cambiar nada. Para decidir, ${state.ownerName} abre "Te toca" en la barra izquierda y elige Aprobar, Editar o Rechazar. Las aprobaciones se guardan en marketing/approvals/queue.md.
- Para diseñar un agente nuevo, propón en pocas líneas: qué trabajo hace, qué lee, qué entrega, qué necesita aprobación y con qué frecuencia corre. Luego pregunta qué ajustar.

Cómo funciona la app:
- El mundo: la oficina en LEGO. Cada departamento tiene su sala. Las figuras de color trabajan o te necesitan; las grises están libres o por crear. Los números rojos son decisiones pendientes.
- Dashboard: resumen del equipo. "Para ${state.ownerName}": reportes de los agentes para leer. "Te toca": tus decisiones.
- Departamentos y "Tus agentes": tarjetas de cada agente. "Por crear": agentes planeados; el botón "Armarlo con Betty" abre este chat.

El equipo:
${team}

Fila de aprobaciones (${state.approvals.pending} pendientes):
${queue}

Reportes de los agentes:
${reports}

Ventas: ${week}`;
}

type Event = { t: 'delta'; text: string } | { t: 'done'; id: string; title: string } | { t: 'error'; message: string } | { t: 'start'; id: string };

/** Streams Betty's reply as newline-delimited JSON events and saves the chat. */
export async function streamChat(osDir: string, repoDir: string, body: { id?: string; message?: string }, res: ServerResponse) {
  const send = (e: Event) => res.write(`${JSON.stringify(e)}\n`);
  res.setHeader('content-type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('cache-control', 'no-cache');

  const text = (body.message ?? '').trim();
  if (!text) {
    send({ t: 'error', message: 'Escribe un mensaje.' });
    return res.end();
  }
  const now = new Date().toISOString();
  const chat: Chat = (body.id && getChat(osDir, body.id)) || {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: text.length > 48 ? `${text.slice(0, 47)}…` : text,
    created: now,
    updated: now,
    messages: [],
  };
  chat.messages.push({ role: 'user', content: text, at: now });
  chat.updated = now;
  saveChat(osDir, chat);
  send({ t: 'start', id: chat.id });

  let reply = '';
  try {
    const client = new Anthropic();
    const stream = client.beta.messages.stream({
      model: CHAT_MODEL,
      max_tokens: 64000,
      // Conversational answers: low effort keeps Betty quick.
      output_config: { effort: 'low' },
      // If a reply is declined by a safety classifier, the API reroutes it to a fallback model.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      cache_control: { type: 'ephemeral' },
      system: systemPrompt(buildState(osDir, repoDir)),
      messages: chat.messages.map((m) => ({ role: m.role, content: m.content })),
    });
    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        reply += event.delta.text;
        send({ t: 'delta', text: event.delta.text });
      }
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === 'refusal') {
      const note = 'No puedo responder eso. Prueba a preguntarlo de otra forma.';
      reply = reply ? `${reply}\n\n${note}` : note;
      send({ t: 'delta', text: `\n\n${note}` });
    }
    chat.messages.push({ role: 'assistant', content: reply, at: new Date().toISOString() });
    chat.updated = new Date().toISOString();
    saveChat(osDir, chat);
    send({ t: 'done', id: chat.id, title: chat.title });
  } catch (err) {
    // Take back the unanswered message so a retry doesn't send it twice.
    chat.messages.pop();
    if (chat.messages.length) saveChat(osDir, chat);
    else rmSync(join(chatsDir(osDir), `${chat.id}.json`), { force: true });
    send({ t: 'error', message: chatError(err) });
  }
  res.end();
}

function chatError(err: unknown) {
  if (err instanceof Anthropic.AuthenticationError)
    return 'La clave de Claude no es válida. Revisa ANTHROPIC_API_KEY en tu computadora y vuelve a abrir la app.';
  if (err instanceof Anthropic.RateLimitError) return 'Claude está ocupado ahora mismo. Intenta de nuevo en un minuto.';
  if (err instanceof Anthropic.APIConnectionError) return 'No pude conectarme con Claude. Revisa tu conexión a internet.';
  if (err instanceof Anthropic.APIError) return `Claude respondió con un error (${err.status}): ${err.message}`;
  const msg = err instanceof Error ? err.message : String(err);
  if (/api.?key|auth/i.test(msg))
    return 'Falta conectar Claude. En tu computadora define ANTHROPIC_API_KEY (o usa "ant auth login") y vuelve a abrir la app con "npm run os".';
  return `Algo falló: ${msg}`;
}
