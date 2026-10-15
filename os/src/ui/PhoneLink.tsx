// "Open on your phone" (desktop): a QR code with this Mac's address and the
// pairing key, made in the browser with no network calls, plus "Forget paired phones".
import qrcode from 'qrcode-generator';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from './api';

type Links = { name: string; ips: string[] };

/** A QR code drawn as one SVG path. */
export function QrCode({ text, size = 220 }: { text: string; size?: number }) {
  const { n, d } = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    let path = '';
    for (let r = 0; r < count; r++) for (let c = 0; c < count; c++) if (qr.isDark(r, c)) path += `M${c + 4},${r + 4}h1v1h-1z`;
    return { n: count + 8, d: path };
  }, [text]);
  return (
    <svg className="qr" width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" role="img" aria-label="QR code with the phone link">
      <rect width={n} height={n} fill="#fff" />
      <path d={d} fill="#1f2420" />
    </svg>
  );
}

/** The address without the key, for showing on screen. */
const plain = (url: string) => url.replace(/\/?\?pair=.*$/, '');

export function PhoneButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="phone-link-btn" onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <rect x="7" y="3" width="10" height="18" rx="2.5" />
          <path d="M11 18h2" />
        </svg>
        Open on your phone
      </button>
      {/* The sidebar's blur would trap a fixed overlay inside it, so the modal goes on the page itself. */}
      {open && createPortal(<PhoneModal onClose={() => setOpen(false)} />, document.body)}
    </>
  );
}

function PhoneModal({ onClose }: { onClose: () => void }) {
  const [links, setLinks] = useState<Links | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    api('/api/phone')
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body.error ?? `The server answered ${r.status}`);
        setLinks(body);
      })
      .catch((e) => setError(String(e.message ?? e)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const forget = async () => {
    const r = await api('/api/phone/forget', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) return setError(body.error ?? "Couldn't forget the phones.");
    setLinks(body);
    setConfirming(false);
    setForgot(true);
  };

  const all = links ? [links.name, ...links.ips] : [];
  const url = pick && all.includes(pick) ? pick : all[0] ?? '';

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal phone-modal" role="dialog" aria-label="Open on your phone" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <strong className="phone-modal-title">Open on your phone</strong>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="phone-modal-body">
          {error && <p className="notice bad">{error}</p>}
          {!links && !error && <p className="muted">Getting the address…</p>}
          {links && (
            <>
              <div className="phone-qr">
                <QrCode text={url} />
              </div>
              <div className="phone-steps">
                <ol>
                  <li>Make sure your iPhone is on the same Wi-Fi as this Mac.</li>
                  <li>Open the iPhone camera, point it at the code, and tap the link.</li>
                  <li>
                    In Safari, tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.
                  </li>
                </ol>
                <p className="phone-addr">
                  <span className="muted small">Address</span>
                  <code>{plain(url)}</code>
                </p>
                {all.length > 1 && (
                  <div className="phone-alts">
                    <span className="muted small">Doesn't open? Show the code for</span>
                    {all
                      .filter((u) => u !== url)
                      .map((u) => (
                        <button key={u} className="link" onClick={() => setPick(u)}>
                          {plain(u)}
                        </button>
                      ))}
                  </div>
                )}
                <p className="muted small">The code includes a private key, so only phones that scan it can see your queue and chat with Betty. Keep this Mac on with the dashboard running.</p>
                {forgot && <p className="notice ok">Done. Phones paired before can't open the dashboard any more. Scan this new code to pair a phone again.</p>}
                <div className="phone-forget">
                  {confirming ? (
                    <>
                      <span className="small">Every paired phone will need this new code.</span>
                      <button className="btn-quiet small" onClick={() => setConfirming(false)}>
                        Cancel
                      </button>
                      <button className="btn-reject small" onClick={forget}>
                        Forget them
                      </button>
                    </>
                  ) : (
                    <button className="btn-quiet small" onClick={() => setConfirming(true)}>
                      Forget paired phones
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
