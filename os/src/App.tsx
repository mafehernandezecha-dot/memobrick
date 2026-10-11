import { useEffect, useState } from 'react';
import type { DashboardState } from '../server/state';
import { Sidebar } from './ui/Sidebar';
import type { View } from './ui/Sidebar';
import { Mundo } from './ui/Mundo';
import { ComingSoon } from './ui/ComingSoon';

export function App() {
  const [state, setState] = useState<DashboardState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>({ kind: 'mundo' });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const load = () =>
      fetch('/api/state')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`El servidor respondió ${r.status}`))))
        .then((s) => {
          setState(s);
          setError(null);
        })
        .catch((e) => setError(String(e.message ?? e)));
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  if (!state) {
    return (
      <div className="boot">
        {error ? `No pude leer los datos del equipo: ${error}. Revisa que la app esté corriendo con "npm run os".` : 'Cargando el equipo…'}
      </div>
    );
  }

  const go = (v: View) => {
    setView(v);
    setMenuOpen(false);
  };

  return (
    <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
      <Sidebar state={state} view={view} onNavigate={go} />
      <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen((o) => !o)}>
        <span />
        <span />
        <span />
      </button>
      <div className="scrim" onClick={() => setMenuOpen(false)} />
      <main className="main">{view.kind === 'mundo' ? <Mundo state={state} onPick={(name) => go({ kind: 'agent', name })} /> : <ComingSoon state={state} view={view} />}</main>
    </div>
  );
}
