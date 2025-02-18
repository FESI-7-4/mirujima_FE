'use client';

import TodoCreateCheckModal from '@/modals/todoCreateCheckModal';
import TodoCreateModal from '@/modals/todoCreateModal';
import GoalDeleteConfirmModal from '@/components/modal/GoalDeleteConfirmModal';
import { useModalStore } from '@/provider/store-provider';

export default function ModalArea() {
  const {
    isTodoCreateModalOpen,
    isTodoCreateCheckModalOpen,
    isGoalDeleteModalOpen,
    goalDeleteModalProps
  } = useModalStore((state) => state);

  return (
    <>
      {isTodoCreateModalOpen && <TodoCreateModal todoId={null} />}
      {isTodoCreateCheckModalOpen && <TodoCreateCheckModal />}
      {isGoalDeleteModalOpen && goalDeleteModalProps && (
        <GoalDeleteConfirmModal
          onConfirm={goalDeleteModalProps.onConfirm}
          onCancel={goalDeleteModalProps.onCancel}
        />
      )}
    </>
  );
}
