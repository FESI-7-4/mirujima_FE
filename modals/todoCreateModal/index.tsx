import { useLayoutEffect, useRef, useState } from 'react';

import { useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import DoneChecker from './DoneChecker';
import GoalSelector from './GoalSelector';
import Overlay from '../Overlay';
import PrioritySelector from './PrioritySelector';
import SubmitButton from './SubmitButton';
import TitleInput from './TitleInput';
import Uploader from './Uploader';

export default function TodoCreateModal() {
  const { setIsTodoCreateModalOpen, setIsTodoCreateCheckModalOpen } = useModalStore(
    (state) => state
  );
  const createdTodo = useTodoCreateModalStore((state) => state);
  const { goal, resetTodoCreateModal } = createdTodo;
  const [isEdit, setIsEdit] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useLayoutEffect(() => {
    if (goal) setIsEdit({ ...createdTodo });
  }, []);

  const handleClose = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      let isChanged = false;

      if (isEdit) isChanged = compareArrayWithObject(Array.from(formData.entries()), isEdit);
      else
        isChanged = Array.from(formData.values()).some((value) =>
          value instanceof File ? value.size > 0 : value !== ''
        );

      if (isChanged) {
        setIsTodoCreateCheckModalOpen(true);
      } else {
        resetTodoCreateModal();
        setIsTodoCreateModalOpen(false);
      }
    }
  };

  const compareArrayWithObject = (arr: [string, any][], obj: { [key: string]: any }): boolean => {
    return arr.some(([key, value]) => {
      if (!(key in obj)) return false;
      if (key === 'goal') return String(obj[key].id) !== String(value);
      else return String(obj[key]) !== String(value);
    });
  };

  return (
    <Overlay>
      <div className="relative flex min-h-[45.8vw] min-w-[27vw] flex-col justify-between rounded-lg bg-white p-6 font-semibold">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-semibold">{isEdit ? '할 일 수정' : '할 일 생성'}</h2>
          {isEdit && <DoneChecker />}
          <CloseButton handleClose={handleClose} />
        </div>

        <form ref={formRef} className="relative flex h-auto flex-1 flex-col gap-6">
          <TitleInput />
          <Uploader />
          <PrioritySelector />
          <GoalSelector />
          <SubmitButton formRef={formRef} isEdit={isEdit} />
        </form>
      </div>
    </Overlay>
  );
}
