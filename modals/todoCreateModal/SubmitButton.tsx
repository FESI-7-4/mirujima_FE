import type { MouseEventHandler, RefObject } from 'react';

import useS3Upload from './useS3Upload';
import useTodoCreate from './useSetTodoCreate';
import useTodoCreateValidCheck from '../../hooks/useTodoCreatValidCheck';

export default function SubmitButton({ formRef }: { formRef: RefObject<HTMLFormElement | null> }) {
  const { fileUpload } = useS3Upload();
  const { setTodoCreate } = useTodoCreate();
  const { allValid } = useTodoCreateValidCheck();

  //제출 로직 컴포넌트에 분리하고 싶으므로 onSubmit이 아닌 button에서 해결
  const handleTodoSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());

      if (data.file instanceof File) {
        const savedPath = await fileUpload(data.file);
        await setTodoCreate(data, savedPath);
      } else await setTodoCreate(data);
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
