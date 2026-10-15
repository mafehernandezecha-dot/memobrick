// The phone layout: the same screens as on the computer, arranged under a
// bottom tab bar, plus the "Pair this phone" screen for phones without a key.
import { useEffect, useState } from 'react';
import { pairKey } from './api';
import { Logo } from './Logo';

export type PhoneTab = 'turn' | 'team' | 'sales' | 'betty' | 'office';

/** Phone layout for narrow screens and for phones turned sideways. */
const PHONE_QUERY = '(max-width: 760px), (pointer: coarse) and (max-height: 500px)';

export function useIsPhone() {
  const get = () => typeof matchMedia === 'function' && matchMedia(PHONE_QUERY).matches;
  const [phone, setPhone] = useState(get);
  useEffect(() => {
    const mq = matchMedia(PHONE_QUERY);
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
}

/**
 * Keeps the app the size of the visible screen, so Betty's message box stays
 * above the keyboard on iPhone (Safari doesn't shrink the page for it).
 */
function useVisibleViewport() {
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const root = document.documentElement;
    const update = () => {
      if (vv.scale > 1.05) return; // pinch-zoomed: leave the layout alone
      root.style.setProperty('--app-h', `${Math.round(vv.height)}px`);
      root.style.setProperty('--app-top', `${Math.round(vv.offsetTop)}px`);
      root.classList.toggle('kb-open', window.innerHeight - vv.height > 140);
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      root.style.removeProperty('--app-h');
      root.style.removeProperty('--app-top');
      root.classList.remove('kb-open');
    };
  }, []);
}

const TABS: { id: PhoneTab; label: string; icon: JSX.Element }[] = [
  { id: 'turn', label: 'Your turn', icon: <IconHand /> },
  { id: 'team', label: 'Team', icon: <IconTeam /> },
  { id: 'sales', label: 'Sales', icon: <IconSales /> },
  { id: 'betty', label: 'Betty', icon: <IconChat /> },
  { id: 'office', label: 'Office', icon: <IconWorld /> },
];

export function PhoneShell({ tab, onTab, pending, children, overlays }: { tab: PhoneTab; onTab: (t: PhoneTab) => void; pending: number; children: React.ReactNode; overlays?: React.ReactNode }) {
  useVisibleViewport();
  return (
    <div className="phone">
      <main className="phone-main">{children}</main>
      <nav className="tabbar" aria-label="Sections">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'is-active' : ''}`} aria-current={tab === t.id ? 'page' : undefined} onClick={() => onTab(t.id)}>
            <span className="tab-icon" aria-hidden>
              {t.icon}
            </span>
            <span className="tab-label">{t.label}</span>
            {t.id === 'turn' && pending > 0 && (
              <span className="badge badge-red tab-badge" aria-label={`${pending} waiting`}>
                {pending}
              </span>
            )}
          </button>
        ))}
      </nav>
      {overlays}
    </div>
  );
}

/** Shown to a phone (or any other device on the network) that isn't paired yet. */
export function PairScreen({ onRetry }: { onRetry: () => void }) {
  const hadKey = Boolean(pairKey());
  return (
    <div className="pair-screen">
      <div className="pair-card">
        <Logo />
        <h1>Pair this phone</h1>
        <p className="pair-lead">{hadKey ? 'This phone was forgotten or its link is out of date. Scan the new QR code to use it again.' : 'Open the pairing QR on your Mac to use this phone.'}</p>
        <ol className="pair-steps">
          <li>On your Mac, open Memobrick OS.</li>
          <li>
            Click <strong>Open on your phone</strong> at the bottom of the left menu.
          </li>
          <li>Point this phone's camera at the QR code and tap the link that appears.</li>
        </ol>
        <p className="muted small">Your phone and your Mac need to be on the same Wi-Fi, with the dashboard running.</p>
        <button className="btn-dark pair-retry" onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}

const svg = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IconHand() {
  return (
    <svg {...svg}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}
function IconTeam() {
  return (
    <svg {...svg}>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" />
      <circle cx="17" cy="8" r="2.4" />
      <path d="M16 13.2c2.3 0 4 1.3 4.5 3.8" />
    </svg>
  );
}
function IconSales() {
  return (
    <svg {...svg}>
      <path d="M4 19V10" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M21 19H3" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg {...svg}>
      <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H10l-4 3.5V16h0a2 2 0 01-2-2V6.5z" />
    </svg>
  );
}
function IconWorld() {
  return (
    <svg {...svg}>
      <path d="M3 9l9-5 9 5-9 5-9-5z" />
      <path d="M3 9v6l9 5 9-5V9" />
    </svg>
  );
}
