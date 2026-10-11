import { useEffect, useState } from 'react';
import { Markdown } from './Markdown';

export function DocViewer({ path, onClose }: { path: string; onClose: () => void }) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setText(null);
    setError(null);
    fetch(`/api/file?path=${encodeURIComponent(path)}`)
      .then((r) => r.json())
      .then((d) => (d.error ? setError(d.error) : setText(d.text)))
      .catch((e) => setError(String(e)));
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal doc" role="dialog" aria-label={path} onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <span className="doc-path">{path}</span>
          <button className="icon-btn" aria-label="Cerrar" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="doc-body">
          {error ? <p className="muted">{error}</p> : text === null ? <p className="muted">Abriendo…</p> : <Markdown text={text} />}
        </div>
      </div>
    </div>
  );
}
