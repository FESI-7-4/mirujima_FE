import { createStore } from 'zustand/vanilla';

export type NoteModalActions = {
  setModalOpen: () => void;
  setModalClose: () => void;
};

export type NoteModalStore = {
  state: boolean;
  actions: NoteModalActions;
};

export const noteModalStore = () => {
  return createStore<NoteModalStore>()((set) => ({
    state: false,
    actions: {
      setModalOpen: () => {
        set({ state: true });
      },
      setModalClose: () => {
        set({ state: false });
      }
    }
  }));
};
