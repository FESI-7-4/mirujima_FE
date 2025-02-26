import { createStore } from 'zustand';

export type EmbedState = {
  isEmbedContentOpen: boolean;
  embedUrl: string | undefined;
};

export type EmbedActions = {
  setEmbedContentOpen: (now: boolean) => void;
  setEmbedUrl: (url: string) => void;
};

export type EmbedStore = EmbedState & EmbedActions;

export const defaultInitState: EmbedState = {
  isEmbedContentOpen: false,
  embedUrl: undefined
};

export const createEmbedStore = (initState: EmbedState = defaultInitState) => {
  return createStore<EmbedStore>()((set) => ({
    ...initState,
    setEmbedContentOpen: (now) => set((state) => ({ ...state, isEmbedContentOpen: now })),
    setEmbedUrl: (url) => set((state) => ({ ...state, embedUrl: url }))
  }));
};
