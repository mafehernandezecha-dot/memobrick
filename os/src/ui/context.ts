import { createContext, useContext } from 'react';
import type { DashboardState } from '../../server/state';

export type AppState = DashboardState & { chatModel: string };

export type Actions = {
  openAgent: (name: string) => void;
  openChat: (prefill?: string) => void;
  openDoc: (path: string) => void;
  refresh: () => Promise<void>;
};

export const ActionsContext = createContext<Actions | null>(null);
export const useActions = () => useContext(ActionsContext)!;

export const agentByName = (state: DashboardState, name: string) => state.agents.find((a) => a.name === name);

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export function formatDay(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return m && d ? `${d} ${MONTHS[m - 1]}` : iso;
}

export const TYPE_LABEL: Record<string, string> = {
  publish: 'Publicar',
  send: 'Enviar',
  'site-change': 'Cambio en el sitio',
  ad: 'Anuncio',
  offer: 'Oferta',
};
