import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgentPanel } from './ui/AgentPanel';
import { ChatPanel } from './ui/ChatPanel';
import { ActionsContext } from './ui/context';
import type { Actions, AppState } from './ui/context';
import { DocViewer } from './ui/DocViewer';
import { Mundo } from './ui/Mundo';
import { Dashboard, DepartmentView, ParaTi, PorCrear, TeToca } from './ui/Screens';
import { Sidebar } from './ui/Sidebar';
import type { View } from './ui/Sidebar';

export function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>({ kind: 'mundo' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [agent, setAgent] = useState<string | null>(null);
  const [chat, setChat] = useState<{ prefill?: string; key: number } | null>(null);
  const [doc, setDoc] = useState<string | null>(null);

  const refresh = useCallback(
    () =>
      fetch('/api/state')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`El servidor respondió ${r.status}`))))
        .then((s) => {
          setState(s);
          setError(null);
        })
        .catch((e) => setError(String(e.message ?? e))),
    [],
  );

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [refresh]);

  const actions: Actions = useMemo(
    () => ({
      openAgent: (name) => {
        setAgent(name);
        setMenuOpen(false);
      },
      openChat: (prefill) => {
        setAgent(null);
        setMenuOpen(false);
        setChat({ prefill, key: Date.now() });
      },
      openDoc: setDoc,
      refresh,
    }),
    [refresh],
  );

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
    <ActionsContext.Provider value={actions}>
      <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
        <Sidebar state={state} view={view} onNavigate={go} />
        <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
        <div className="scrim" onClick={() => setMenuOpen(false)} />
        <main className="main">
          {view.kind === 'mundo' && <Mundo state={state} onPick={actions.openAgent} />}
          {view.kind === 'dashboard' && <Dashboard state={state} />}
          {view.kind === 'para' && <ParaTi state={state} />}
          {view.kind === 'tetoca' && <TeToca state={state} />}
          {view.kind === 'department' && <DepartmentView state={state} name={view.name} />}
          {view.kind === 'porcrear' && <PorCrear state={state} />}
          {agent && <AgentPanel state={state} name={agent} onClose={() => setAgent(null)} />}
        </main>
        {chat && <ChatPanel key={chat.key} state={state} prefill={chat.prefill} onClose={() => setChat(null)} />}
        {doc && <DocViewer path={doc} onClose={() => setDoc(null)} />}
      </div>
    </ActionsContext.Provider>
  );
}
