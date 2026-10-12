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

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function formatDay(iso: string) {
  const [, m, d] = iso.split('-').map(Number);
  return m && d ? `${MONTHS[m - 1]} ${d}` : iso;
}

export const TYPE_LABEL: Record<string, string> = {
  publish: 'Publish',
  send: 'Send',
  'site-change': 'Site change',
  ad: 'Ad',
  'ad-change': 'Ad change',
  offer: 'Offer',
};
