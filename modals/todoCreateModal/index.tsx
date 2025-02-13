import { useRef } from 'react';

import { debounce } from 'lodash';

import { useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import DoneChecker from './DoneChecker';
import GoalSelector from './GoalSelector';
import Uploader from './Uploader';
import Overlay from '../Overlay';
import PrioritySelector from './PrioritySelector';
import useSetTodoEditValue from './useSetTodoEditValue';

export default function TodoCreateModal({ todoId }: { todoId: string | null }) {
  const { setIsTodoCreateModalOpen, setIsTodoCreateCheckModalOpen } = useModalStore(
    (state) => state
  );
  const [allValid, setAllValid] = useState<boolean>(false);
  useSetTodoEditValue(todoId);
  const formRef = useRef<HTMLFormElement>(null);

  const handleTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      console.log(Object.fromEntries(formData.entries()));

      //여기에 제출 로직 추가
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    if (event) event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const isFormFilled = Array.from(formData.values()).some((value) => value !== '');

      if (isFormFilled) setIsTodoCreateCheckModalOpen(true);
      else setIsTodoCreateModalOpen(false);
    }
  };

  const handleChangeIsValid = debounce(() => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const datas = Object.fromEntries(formData.entries());
      const isFormAllFilled = datas.title && datas.goal && datas.priority ? true : false;

      setAllValid(isFormAllFilled);
    }
  }, 50);

  const SubmitButton = () => {
    return (
      <button
        disabled={!allValid}
        className={`${
          allValid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
        } rounded px-4 py-2 font-bold text-white transition-colors duration-300`}
      >
        생성하기
      </button>
    );
  };

  return (
    <Overlay>
      <div className="relative flex min-h-[800px] min-w-[520px] flex-col justify-between rounded-lg bg-white p-6 font-semibold">
        <div className="flex justify-between">
          <h2 className="mb-4 text-2xl font-semibold">{todoId ? '할 일 수정' : '할 일 생성'}</h2>
          <CloseButton handleClose={handleClose} />
        </div>

        <form
          onSubmit={handleTodoSubmit}
          ref={formRef}
          className="flex h-auto flex-1 flex-col gap-6"
        >
          <div className="flex flex-col">
            <label className="mb-4 font-semibold">제목</label>
            <input
              name="title"
              placeholder="할 일의 제목을 적어주세요"
              maxLength={30}
              required
              className="rounded-lg border border-gray-200 px-4 py-[14px] placeholder-gray350"
              onChange={handleChangeIsValid}
            />
          </div>
          <Uploader />
          {todoId && <DoneChecker />}

          <GoalSelector handleChangeIsValid={handleChangeIsValid} />
          <PrioritySelector handleChangeIsValid={handleChangeIsValid} />
        </form>

        <SubmitButton formRef={formRef} />
      </div>
    </Overlay>
  );
}
