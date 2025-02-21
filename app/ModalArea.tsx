'use client';

import GoalDeleteConfirmModal from '@/components/modal/GoalDeleteConfirmModal';
import GoalCreateModal from '@/modals/goalCreateModal';
import Loading from '@/modals/loadingOverlay/Loading';
import PasswordModal from '@/modals/passwordModal';
import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const {
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isGoalDeleteModalOpen,
    goalDeleteModalProps,
    isGoalCreateModalOpen,
    isLoading,
    isPasswordModalOpen
  } = useModalStore((state) => state);

  return (
    <>
      {isTodoCreateModalOpen && <TodoCreateModal />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
      {isGoalDeleteModalOpen && goalDeleteModalProps && (
        <GoalDeleteConfirmModal
          onConfirm={goalDeleteModalProps.onConfirm}
          onCancel={goalDeleteModalProps.onCancel}
        />
      )}
      {isGoalCreateModalOpen && <GoalCreateModal />}
      {isPasswordModalOpen && <PasswordModal />}
      {isLoading && <Loading />}
    </>
  );
}
