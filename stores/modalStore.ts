'use client';

import { createStore } from 'zustand/vanilla';

export type EditModalProps = {
  onConfirm: (value: string) => void;
  onCancel: () => void;
  initialValue: string;
};

export type DeleteModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export type ConfirmTempNoteModalProps = {
  tempNoteTitle: string | undefined;
  onCancel: () => void;
  onConfirm: () => void;
};

export type NoteLinkModalProps = {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
};

export type NoteDetailPageModalProps = {
  params: Promise<{ id: string }>;
  onClose: () => void;
};

export interface ModalStore {
  isNoteDetailPageModalOpen: boolean;
  noteDetailPageModalProps: NoteDetailPageModalProps | null;
  isNoteConfirmModalOpen: boolean;
  noteConfirmModalProps: ConfirmTempNoteModalProps | null;
  isTodoCreateModalOpen: boolean;
  isTodoCreateCheckModalOpen: boolean;
  isTodoDeleteConfirmModalOpen: boolean;
  todoDeleteConfirmModalProps: DeleteModalProps | null;
  isNoteLinkModalOpen: boolean;
  noteLinkModalProps: NoteLinkModalProps | null;
  isGoalDeleteModalOpen: boolean;
  goalDeleteModalProps: DeleteModalProps | null;
  isGoalEditModalOpen: boolean;
  goalEditModalProps: EditModalProps | null;
  isGoalCreateModalOpen: boolean;
  isLoading: boolean;

  setNoteDetailPageOpen: (isOpen: boolean, props?: NoteDetailPageModalProps) => void;
  setIsNoteConfirmModalOpen: (isOpen: boolean, props?: ConfirmTempNoteModalProps) => void;
  setIsTodoCreateModalOpen: (isOpen: boolean) => void;
  setIsTodoCreateCheckModalOpen: (isOpen: boolean) => void;
  setIsTodoDeleteConfirmModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setNoteLinkModalOpen: (isOpen: boolean, props?: NoteLinkModalProps) => void;
  setGoalDeleteModalOpen: (isOpen: boolean, props?: DeleteModalProps) => void;
  setGoalEditModalOpen: (isOpen: boolean, props?: EditModalProps) => void;
  setIsGoalCreateModalOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const defaultInitState: ModalStore = {
  isNoteDetailPageModalOpen: false,
  noteDetailPageModalProps: null,
  isNoteConfirmModalOpen: false,
  noteConfirmModalProps: null,
  isTodoCreateModalOpen: false,
  isTodoCreateCheckModalOpen: false,
  isTodoDeleteConfirmModalOpen: false,
  todoDeleteConfirmModalProps: null,
  isNoteLinkModalOpen: false,
  noteLinkModalProps: null,
  isGoalDeleteModalOpen: false,
  goalDeleteModalProps: null,
  isGoalEditModalOpen: false,
  goalEditModalProps: null,
  isGoalCreateModalOpen: false,
  isLoading: false,

  setNoteDetailPageOpen: () => {},
  setIsNoteConfirmModalOpen: () => {},
  setIsTodoCreateModalOpen: () => {},
  setIsTodoCreateCheckModalOpen: () => {},
  setIsTodoDeleteConfirmModalOpen: () => {},
  setNoteLinkModalOpen: () => {},
  setGoalDeleteModalOpen: () => {},
  setGoalEditModalOpen: () => {},
  setIsGoalCreateModalOpen: () => {},
  setIsLoading: () => {}
};

export const createModalStore = (initState: Partial<ModalStore> = defaultInitState) => {
  return createStore<ModalStore>()((set) => ({
    ...defaultInitState,
    ...initState,
    setNoteDetailPageOpen: (isOpen, props) =>
      set({ isNoteDetailPageModalOpen: isOpen, noteDetailPageModalProps: props || null }),
    setIsNoteConfirmModalOpen: (isOpen, props) =>
      set({ isNoteConfirmModalOpen: isOpen, noteConfirmModalProps: props || null }),
    setIsTodoCreateModalOpen: (isOpen) => set({ isTodoCreateModalOpen: isOpen }),
    setIsTodoCreateCheckModalOpen: (isOpen) => set({ isTodoCreateCheckModalOpen: isOpen }),
    setIsTodoDeleteConfirmModalOpen: (isOpen, props) =>
      set({ isTodoDeleteConfirmModalOpen: isOpen, todoDeleteConfirmModalProps: props || null }),
    setNoteLinkModalOpen: (isOpen, props) =>
      set({ isNoteLinkModalOpen: isOpen, noteLinkModalProps: props || null }),
    setGoalDeleteModalOpen: (isOpen, props) =>
      set({ isGoalDeleteModalOpen: isOpen, goalDeleteModalProps: props || null }),
    setGoalEditModalOpen: (isOpen, props) =>
      set({ isGoalEditModalOpen: isOpen, goalEditModalProps: props || null }),
    setIsGoalCreateModalOpen: (isOpen) => set({ isGoalCreateModalOpen: isOpen }),
    setIsLoading: (isLoading) => set({ isLoading })
  }));
};
