import { createStore } from 'zustand';

export type EmbedState = {};

export type EmbedActions = {};

export type EmbedStore = EmbedState & EmbedActions;

export const defaultInitState = {};

export const createEmbedStore = (initState: EmbedStore = defaultInitState) => {
  return createStore<EmbedStore>()((set) => ({
    ...initState
  }));
};
