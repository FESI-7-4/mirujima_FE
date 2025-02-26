import { createStore } from 'zustand';

export type EmbedState = {
  isEmbedContentOpen: boolean;
  embedUrl: string;
};

export type EmbedActions = {
  setEmbedContentOpen: (now: boolean) => void;
  setEmbedUrl: (url: string) => void;
};

export type EmbedStore = EmbedState & { actions: EmbedActions };

export const defaultInitState: EmbedState = {
  isEmbedContentOpen: false,
  embedUrl: ''
};

export const createEmbedStore = (initState: EmbedState = defaultInitState) => {
  return createStore<EmbedStore>()((set) => ({
    ...initState,
    actions: {
      setEmbedContentOpen: (now) => set((state) => ({ ...state, isEmbedContentOpen: now })),
      setEmbedUrl: (url) => set((state) => ({ ...state, embedUrl: url }))
    }
  }));
};
