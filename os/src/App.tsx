import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgentPanel } from './ui/AgentPanel';
import { api } from './ui/api';
import { ChatPanel } from './ui/ChatPanel';
import { ActionsContext } from './ui/context';
import type { Actions, AppState } from './ui/context';
import { DocViewer } from './ui/DocViewer';
import { Mundo } from './ui/Mundo';
import { Celebration, SalesPage, useSales } from './ui/Sales';
import { PairScreen, PhoneShell, useIsPhone } from './ui/Phone';
import type { PhoneTab } from './ui/Phone';
import { Dashboard, DepartmentView, ParaTi, PorCrear, Team, TeToca } from './ui/Screens';
import { Sidebar } from './ui/Sidebar';
import type { View } from './ui/Sidebar';
import { WorldView } from './ui/WorldView';

export function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>({ kind: 'mundo' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [agent, setAgent] = useState<string | null>(null);
  const [chat, setChat] = useState<{ prefill?: string; key: number } | null>(null);
  const [doc, setDoc] = useState<string | null>(null);
  const [needsPair, setNeedsPair] = useState(false);
  const isPhone = useIsPhone();
  const [tab, setTab] = useState<PhoneTab>('turn');
  const salesFeed = useSales();
  const [partyKey, setPartyKey] = useState(0);
  const [partyKind, setPartyKind] = useState<'sale' | 'goal' | 'recap'>('sale');
  const party = salesFeed.party;
  useEffect(() => {
    if (party) {
      setPartyKind(party.kind);
      setPartyKey(party.key);
    }
  }, [party]);

  const refresh = useCallback(
    () =>
      api('/api/state')
        .then((r) => {
          // Another device on the network without the pairing key.
          setNeedsPair(r.status === 401);
          return r.ok ? r.json() : Promise.reject(new Error(`The server answered ${r.status}`));
        })
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
        setTab('betty');
      },
      openDoc: setDoc,
      refresh,
    }),
    [refresh],
  );

  if (needsPair) return <PairScreen onRetry={refresh} />;

  if (!state) {
    return (
      <div className="boot">
        {error ? `Couldn't read the team data: ${error}. Check that the app is running with "npm run os".` : 'Loading the team…'}
      </div>
    );
  }

  const go = (v: View) => {
    setView(v);
    setMenuOpen(false);
  };

  // Phone: the same screens under a bottom tab bar. The 3D office only loads
  // when its tab is open, at a lower resolution, so the phone stays fast.
  if (isPhone) {
    const pickTab = (t: PhoneTab) => {
      setAgent(null);
      setTab(t);
      if (t === 'betty' && !chat) setChat({ key: Date.now() });
    };
    return (
      <ActionsContext.Provider value={actions}>
        <PhoneShell
          tab={tab}
          onTab={pickTab}
          pending={state.approvals.pending}
          overlays={
            <>
              {doc && <DocViewer path={doc} onClose={() => setDoc(null)} />}
              {party && <Celebration key={party.key} party={party} onDone={salesFeed.next} />}
            </>
          }
        >
          {tab === 'turn' && <TeToca state={state} />}
          {tab === 'team' && <Team state={state} />}
          {tab === 'sales' && <SalesPage sales={salesFeed.sales} state={state} sound={salesFeed.sound} onToggleSound={salesFeed.toggleSound} />}
          {tab === 'office' && (
            <div className="phone-office">
              <WorldView state={state} onPick={actions.openAgent} partyKey={partyKey} partyKind={partyKind} maxPixelRatio={1} />
              <p className="phone-office-hint">Drag to look around · pinch to zoom · tap someone</p>
            </div>
          )}
          {/* Betty stays open in the background so the conversation survives switching tabs. */}
          {chat && (
            <div className="phone-chat" hidden={tab !== 'betty'}>
              <ChatPanel key={chat.key} state={state} prefill={chat.prefill} embedded onClose={() => pickTab('turn')} />
            </div>
          )}
          {agent && <AgentPanel state={state} name={agent} onClose={() => setAgent(null)} />}
        </PhoneShell>
      </ActionsContext.Provider>
    );
  }

  return (
    <ActionsContext.Provider value={actions}>
      <div className={`app ${menuOpen ? 'menu-open' : ''}`}>
        <Sidebar state={state} view={view} onNavigate={go} />
        <button className="menu-toggle" aria-label="Open menu" onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
        <div className="scrim" onClick={() => setMenuOpen(false)} />
        <main className="main">
          {view.kind === 'mundo' && <Mundo state={state} onPick={actions.openAgent} sales={salesFeed.sales} partyKey={partyKey} partyKind={partyKind} onOpenSales={() => go({ kind: 'sales' })} />}
          {view.kind === 'sales' && <SalesPage sales={salesFeed.sales} state={state} sound={salesFeed.sound} onToggleSound={salesFeed.toggleSound} />}
          {view.kind === 'dashboard' && <Dashboard state={state} />}
          {view.kind === 'para' && <ParaTi state={state} />}
          {view.kind === 'tetoca' && <TeToca state={state} />}
          {view.kind === 'department' && <DepartmentView state={state} name={view.name} />}
          {view.kind === 'porcrear' && <PorCrear state={state} />}
          {agent && <AgentPanel state={state} name={agent} onClose={() => setAgent(null)} />}
        </main>
        {chat && <ChatPanel key={chat.key} state={state} prefill={chat.prefill} onClose={() => setChat(null)} />}
        {doc && <DocViewer path={doc} onClose={() => setDoc(null)} />}
        {party && <Celebration key={party.key} party={party} onDone={salesFeed.next} />}
      </div>
    </ActionsContext.Provider>
  );
}
