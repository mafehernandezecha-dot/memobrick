// Runs Betty's replies through the Claude Code CLI on the owner's computer, so
// they're covered by the owner's Claude plan (Pro or Max) instead of paid API
// credit. Needs Claude Code installed and signed in once with `claude`.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter, join } from 'node:path';

/** Path to the `claude` command, or null when Claude Code isn't installed. */
export function findClaude(env = process.env): string | null {
  const dirs = [...(env.PATH ?? '').split(delimiter), join(homedir(), '.local', 'bin'), join(homedir(), '.claude', 'local'), '/opt/homebrew/bin', '/usr/local/bin'];
  for (const dir of dirs) {
    const file = join(dir, 'claude');
    if (dir && existsSync(file)) return file;
  }
  return null;
}

type Turn = { role: 'user' | 'assistant'; content: string };

/** Earlier turns plus the new message, as one prompt (each CLI call starts fresh). */
export function transcript(messages: Turn[]) {
  const last = messages[messages.length - 1];
  const earlier = messages.slice(0, -1);
  if (!earlier.length) return last.content;
  const history = earlier.map((m) => `${m.role === 'user' ? 'Eden' : 'Betty'}: ${m.content}`).join('\n\n');
  return `Our conversation so far:\n\n${history}\n\nEden's new message:\n\n${last.content}`;
}

/** Pulls reply text out of one line of `--output-format stream-json`. */
export function parseLine(line: string): { delta?: string; result?: string; error?: string } {
  let ev: { type?: string; event?: { type?: string; delta?: { type?: string; text?: string } }; result?: string; is_error?: boolean; subtype?: string };
  try {
    ev = JSON.parse(line);
  } catch {
    return {};
  }
  if (ev.type === 'stream_event' && ev.event?.type === 'content_block_delta' && ev.event.delta?.type === 'text_delta') return { delta: ev.event.delta.text ?? '' };
  if (ev.type === 'result') return ev.is_error ? { error: ev.result || ev.subtype || 'Claude Code returned an error.' } : { result: ev.result ?? '' };
  return {};
}

/** Streams a reply from Claude Code. Calls onDelta with text as it arrives and resolves with the full reply. */
export function askClaudeCode(claude: string, system: string, messages: Turn[], onDelta: (text: string) => void, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Leave out any API key so Claude Code uses the owner's plan login.
    const env = { ...process.env };
    delete env.ANTHROPIC_API_KEY;
    const child = spawn(
      claude,
      ['-p', '--model', 'opus', '--output-format', 'stream-json', '--verbose', '--include-partial-messages', '--tools', '', '--strict-mcp-config', '--setting-sources', '', '--no-session-persistence', '--system-prompt', system],
      { cwd, env, stdio: ['pipe', 'pipe', 'pipe'] },
    );
    let streamed = '';
    let result: string | null = null;
    let error: string | null = null;
    let buf = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill(), 180_000);
    child.stdout.on('data', (chunk: Buffer) => {
      buf += chunk.toString('utf8');
      let nl: number;
      while ((nl = buf.indexOf('\n')) >= 0) {
        const out = parseLine(buf.slice(0, nl));
        buf = buf.slice(nl + 1);
        if (out.delta) {
          streamed += out.delta;
          onDelta(out.delta);
        }
        if (out.result !== undefined) result = out.result;
        if (out.error) error = out.error;
      }
    });
    child.stderr.on('data', (chunk: Buffer) => (stderr += chunk.toString('utf8')));
    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (error || (code !== 0 && result === null)) {
        const why = error || stderr.trim().split('\n').pop() || `Claude Code stopped (code ${code}).`;
        return reject(new Error(/log ?in|auth|credential/i.test(why) ? 'Claude Code is not signed in. Open Terminal, type claude, and sign in with your Claude account.' : why));
      }
      // If nothing streamed (older Claude Code), send the whole reply at once.
      if (!streamed && result) onDelta(result);
      resolve(streamed || result || '');
    });
    child.stdin.end(transcript(messages));
  });
}
