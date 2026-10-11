import { useCallback, useEffect, useRef, useState } from 'react';
import { APPROVALS_DESK } from '../../server/parse';
import type { AppState } from './context';
import { Markdown } from './Markdown';

type Msg = { role: 'user' | 'assistant'; content: string };
type ChatSummary = { id: string; title: string; updated: string };

/** Chat with Betty, the one Eden talks to. */
export function ChatPanel({ state, prefill, onClose }: { state: AppState; prefill?: string; onClose: () => void }) {
  const betty = state.agents.find((a) => a.name === APPROVALS_DESK);
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState(prefill ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loadChats = useCallback(() => fetch('/api/chats').then((r) => r.json()).then(setChats).catch(() => {}), []);
  useEffect(() => {
    loadChats();
  }, [loadChats]);
  useEffect(() => {
    if (prefill) {
      setInput(prefill);
      setChatId(null);
      setMessages([]);
    }
    inputRef.current?.focus();
  }, [prefill]);
  useEffect(() => {
    scroller.current?.scrollTo(0, scroller.current.scrollHeight);
  }, [messages]);

  const open = async (id: string) => {
    const chat = await fetch(`/api/chats/${id}`).then((r) => r.json());
    if (chat.messages) {
      setChatId(id);
      setMessages(chat.messages.map((m: Msg) => ({ role: m.role, content: m.content })));
      setError(null);
    }
  };

  const fresh = () => {
    setChatId(null);
    setMessages([]);
    setInput('');
    setError(null);
    inputRef.current?.focus();
  };

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;
    setBusy(true);
    setError(null);
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: message }, { role: 'assistant', content: '' }]);
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: chatId, message }) });
      if (!res.body) throw new Error('Sin respuesta del servidor.');
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          const e = JSON.parse(line);
          if (e.t === 'start') setChatId(e.id);
          if (e.t === 'delta') setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: m[m.length - 1].content + e.text }]);
          if (e.t === 'error') {
            setError(e.message);
            setMessages((m) => (m[m.length - 1]?.content ? m : m.slice(0, -1)));
          }
        }
      }
      loadChats();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setMessages((m) => (m[m.length - 1]?.content ? m : m.slice(0, -1)));
    } finally {
      setBusy(false);
    }
  };

  const topAgent = state.agents.find((a) => a.status === 'active' && a.name !== APPROVALS_DESK && a.pending > 0);
  const chips = [
    '¿Qué me toca hoy?',
    topAgent ? `¿En qué va ${topAgent.displayName}?` : '¿En qué va el equipo?',
    '¿Qué dicen los reportes de esta semana?',
    '¿Cómo apruebo una propuesta?',
    '¿Qué agente conviene armar primero?',
  ];

  return (
    <div className="chat-wrap">
      <section className="chat" role="dialog" aria-label="Chat con Betty">
        <aside className="chat-history">
          <p className="history-heading">Conversaciones</p>
          {chats.length === 0 && <p className="muted small">Aún no hay conversaciones.</p>}
          {chats.map((c) => (
            <button key={c.id} className={`history-item ${c.id === chatId ? 'is-active' : ''}`} onClick={() => open(c.id)}>
              {c.title}
            </button>
          ))}
        </aside>
        <div className="chat-main">
          <header className="chat-head">
            {betty && <img className="avatar" src={`/${betty.avatar}`} alt="" />}
            <div className="chat-title">
              <strong>{betty?.displayName ?? 'Betty'} · {betty?.department?.toLowerCase() ?? 'dirección'}</strong>
              <span>Conoce todo {state.appName} · {state.chatModel}</span>
            </div>
            <button className="btn-quiet small" onClick={fresh}>
              + Nueva
            </button>
            <button className="icon-btn" aria-label="Cerrar chat" onClick={onClose}>
              ✕
            </button>
          </header>

          <div className="chat-scroll" ref={scroller}>
            {messages.length === 0 ? (
              <div className="chat-empty">
                <p className="chat-hello">Hola, {state.ownerName} 👋</p>
                <p>Pregúntame lo que necesites sobre {state.appName}: cómo hacer algo en la app, en qué va un proyecto, dónde está un material o qué te toca.</p>
                <div className="chips">
                  {chips.map((c) => (
                    <button key={c} className="chip-btn" onClick={() => send(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`bubble-row ${m.role}`}>
                  {m.role === 'assistant' ? <Markdown className="msg msg-betty" text={m.content || '…'} /> : <div className="msg msg-me">{m.content}</div>}
                </div>
              ))
            )}
            {error && <p className="chat-error">{error}</p>}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              placeholder="Escríbele a Betty…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            <button className="btn-dark" disabled={busy || !input.trim()}>
              {busy ? '…' : 'Enviar'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
