// Keeps the owner's copy of the repo in step with GitHub, where the agents work.
// Decisions are committed and pushed right after they're saved, and the latest
// agent work is pulled every few minutes, so nobody has to open GitHub Desktop.
// Only the main branch is synced; on any other branch nothing happens.
import { execFile } from 'node:child_process';

const QUEUE = 'marketing/approvals/queue.md';

export type SyncResult = { ok: boolean; text: string };

function git(repoDir: string, args: string[]) {
  return new Promise<string>((ok, fail) => {
    execFile(
      'git',
      args,
      // Never wait on a password prompt: fail fast and tell the owner instead.
      { cwd: repoDir, timeout: 60_000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } },
      (err, stdout, stderr) => (err ? fail(new Error(String(stderr || err.message).trim())) : ok(stdout.trim())),
    );
  });
}

async function onMain(repoDir: string) {
  try {
    return (await git(repoDir, ['rev-parse', '--abbrev-ref', 'HEAD'])) === 'main';
  } catch {
    return false;
  }
}

function npmInstall(osDir: string) {
  return new Promise<void>((ok) => {
    execFile(
      'npm',
      ['install', '--no-audit', '--no-fund'],
      { cwd: osDir, timeout: 300_000, env: process.env },
      () => ok(),
    );
  });
}

async function pullRebase(repoDir: string) {
  try {
    await git(repoDir, ['pull', '--rebase', '--autostash', 'origin', 'main']);
  } catch (err) {
    await git(repoDir, ['rebase', '--abort']).catch(() => {});
    throw err;
  }
}

let busy: Promise<unknown> = Promise.resolve();
/** Runs git work one job at a time so a pull and a decision never overlap. */
function queued<T>(job: () => Promise<T>) {
  const run = busy.then(job, job);
  busy = run.catch(() => {});
  return run;
}

/**
 * Gets the agents' latest work and sends any decision that couldn't go out
 * earlier. Quietly does nothing when offline or off main.
 */
export function pullLatest(repoDir: string) {
  return queued(async () => {
    if (!(await onMain(repoDir))) return;
    const lockBefore = await git(repoDir, ['rev-parse', 'HEAD:os/package-lock.json']).catch(() => '');
    await pullRebase(repoDir).catch(() => {});
    // A pull that adds a package would break the page until it's installed, so
    // install it right away (Vite picks it up on the next reload).
    const lockAfter = await git(repoDir, ['rev-parse', 'HEAD:os/package-lock.json']).catch(() => '');
    if (lockAfter && lockAfter !== lockBefore) await npmInstall(`${repoDir}/os`);
    const ahead = await git(repoDir, ['rev-list', '--count', 'origin/main..HEAD']).catch(() => '0');
    if (Number(ahead) > 0) await git(repoDir, ['push', 'origin', 'main']).catch(() => {});
  });
}

/**
 * Saves a decision and sends it to GitHub: pulls first so the queue is current,
 * runs `write`, commits only the queue file, then pushes (pulling once more if
 * an agent pushed in between). The decision is always kept on this computer,
 * even when sending fails.
 */
export function decideAndSync<T>(repoDir: string, label: string, write: () => T): Promise<{ result: T; sync: SyncResult }> {
  return queued(async () => {
    if (!(await onMain(repoDir))) {
      return { result: write(), sync: { ok: false, text: 'Saved on this computer only (this copy is not on the main branch), so the agents won\'t see it yet.' } };
    }
    await pullRebase(repoDir).catch(() => {});
    const result = write();
    try {
      await git(repoDir, ['commit', '-m', `Owner decision: ${label}`, '--', QUEUE]);
    } catch (err) {
      return { result, sync: { ok: false, text: `Saved on this computer, but it couldn't be committed: ${firstLine(err)}` } };
    }
    try {
      await git(repoDir, ['push', 'origin', 'main']).catch(async () => {
        await pullRebase(repoDir);
        await git(repoDir, ['push', 'origin', 'main']);
      });
      return { result, sync: { ok: true, text: 'Sent to the agents.' } };
    } catch (err) {
      return {
        result,
        sync: { ok: false, text: `Saved on this computer, but it couldn't be sent to GitHub (${firstLine(err)}). Open GitHub Desktop and click Push origin; the commit is already made.` },
      };
    }
  });
}

const firstLine = (err: unknown) => (err instanceof Error ? err.message : String(err)).split('\n')[0];
