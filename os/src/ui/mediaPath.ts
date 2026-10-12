/**
 * Turns an image src found in a repo doc into a URL the dashboard can load.
 * Relative srcs are resolved against the doc's repo path (e.g. an email draft
 * in marketing/email/...) and served by /api/media. Absolute URLs, data URIs
 * and site paths are left alone. Returns null when the path climbs above the
 * repo root.
 */
export function resolveMediaSrc(src: string, base: string): string | null {
  const trimmed = src.trim();
  if (!trimmed || /^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed;
  const repoPath = resolveRepoPath(trimmed.split(/[?#]/)[0], base);
  return repoPath === null ? null : `/api/media?path=${encodeURIComponent(repoPath)}`;
}

/** Joins a relative path onto the folder of `base` (a repo file path), normalizing . and .. */
export function resolveRepoPath(rel: string, base: string): string | null {
  const parts = base.split('/').filter(Boolean);
  parts.pop(); // the doc's own file name
  for (const seg of safeDecode(rel).split('/')) {
    if (!seg || seg === '.') continue;
    if (seg === '..') {
      if (!parts.length) return null;
      parts.pop();
    } else parts.push(seg);
  }
  return parts.length ? parts.join('/') : null;
}

function safeDecode(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}
