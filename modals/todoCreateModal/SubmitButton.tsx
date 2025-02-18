import type { MouseEventHandler, RefObject } from 'react';
import toast from 'react-hot-toast';

import { apiWithClientToken } from '@/apis/clientActions';
import { useModalStore } from '@/provider/store-provider';

import useTodoCreateValidCheck from '../../hooks/useTodoCreatValidCheck';

export default function SubmitButton({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  const { allValid } = useTodoCreateValidCheck();

  //제출 로직 컴포넌트에 분리하고 싶으므로 onSubmit이 아닌 button에서 해결
  const handleTodoSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      console.log(data);

      return;

      const response = await apiWithClientToken.post('/todos', {
        goalId: data.goal,
        title: data.title,
        filePath: data?.filePath,
        linkUrl: data?.linkUrl,
        priority: data.priority
      });

      if (response.data.code === 200) {
        toast('할일을 등록했습니다.');
        setIsTodoCreateModalOpen(false);
      }
    }
  };

  return (
    <button
      onClick={handleTodoSubmit}
      disabled={!allValid}
      className={`${
        allValid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
      } rounded px-4 py-2 font-bold text-white active:bg-pressed`}
    >
      생성하기
    </button>
  );
}
