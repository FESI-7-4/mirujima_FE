import { createStore } from 'zustand/vanilla';

export type ModalState = {
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isNoteLinkModalOpen: boolean;
  isGoalDeleteModalOpen: boolean;
  goalDeleteModalProps?: DeleteModalProps;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;
  isPasswordModalOpen: boolean;
  passwordModalProps: File | null;
};
export type DeleteModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export type ModalActions = {
  setIsTodoCreateModalOpen: (now: boolean) => void;
  setIsTodoCreateCheckModalOpen: (now: boolean) => void;
  setNoteLinkModalOpen: (now: boolean) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setIsGoalCreateModalOpen: (now: boolean) => void;
  setIsLoading: (now: boolean) => void;
  setIsPasswordModalOpen: (now: boolean) => void;
  setPasswordModalProps: (now: File | null) => void;
};

export type ModalStore = ModalState & ModalActions;

const initModalState = {
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isNoteLinkModalOpen: false,
  isGoalDeleteModalOpen: false,
  goalDeleteModalProps: undefined,
  isGoalCreateModalOpen: false,
  isLoading: false,
  isPasswordModalOpen: false,
  passwordModalProps: null
};

export const defaultInitState: ModalState = {
  ...initModalState
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...initState,

    setIsTodoCreateModalOpen: (now) => set((state) => ({ ...state, isTodoCreateModalOpen: now })),

    setIsTodoCreateCheckModalOpen: (now) =>
      set((state) => ({ ...state, isTodoCreateCheckModalOpen: now })),
    setNoteLinkModalOpen: (now) => {
      set((state) => ({ ...state, isNoteLinkModalOpen: now }));
    },
    setGoalDeleteModalOpen: (isOpen, props) =>
      set((state) => ({ ...state, isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props })),
    setIsGoalCreateModalOpen: (now) => set((state) => ({ ...state, isGoalCreateModalOpen: now })),
    setIsLoading: (now) => set((state) => ({ ...state, isLoading: now })),
    setIsPasswordModalOpen: (now) => set((state) => ({ ...state, isPasswordModalOpen: now })),
    setPasswordModalProps: (now) => set((state) => ({ ...state, passwordModalProps: now }))
  }));
};
