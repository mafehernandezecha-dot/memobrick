import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useMemo } from 'react';
import { resolveMediaSrc } from './mediaPath';

marked.setOptions({ gfm: true, breaks: true });

/** Points relative image srcs at /api/media, resolved against the doc's repo path. */
function rewriteImages(html: string, base: string) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  tpl.content.querySelectorAll('img[src]').forEach((img) => {
    const src = resolveMediaSrc(img.getAttribute('src') ?? '', base);
    if (src === null) img.removeAttribute('src');
    else img.setAttribute('src', src);
    img.setAttribute('loading', 'lazy');
  });
  return tpl.innerHTML;
}

/**
 * Renders markdown from repo files or Betty's replies, sanitized. Pass `base`
 * (the doc's repo path) so images stored next to the doc can be shown.
 */
export function Markdown({ text, className, base }: { text: string; className?: string; base?: string }) {
  const html = useMemo(() => {
    const clean = DOMPurify.sanitize(marked.parse(text, { async: false }) as string);
    return base ? rewriteImages(clean, base) : clean;
  }, [text, base]);
  return <div className={`md ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
