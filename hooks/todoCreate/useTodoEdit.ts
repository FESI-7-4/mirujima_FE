import toast from 'react-hot-toast';

import { usePathname } from 'next/navigation';

import { apiWithClientToken } from '@/apis/clientActions';
import { useModalStore } from '@/provider/store-provider';

export default function useTodoEdit(todoId?: number) {
  const { setIsTodoCreateModalOpen } = useModalStore((state) => state);
  const pathname = usePathname();
  //쿼리 적용 추가 및 새로고침 로직 삭제 필요

  const setTodoEdit = async (formData: { [k: string]: FormDataEntryValue }, savedPath?: string) => {
    const { data } = await apiWithClientToken.patch(`/todos/${todoId}`, {
      goalId: formData.goal,
      title: formData.title,
      filePath: savedPath || '',
      linkUrl: formData?.linkUrl,
      priority: formData.priority,
      done: formData?.done ? true : false
    });

    console.log('setTodoEdit', data);

    if (data.code === 200) todoEditSueccess();
    else todoEditFail();
  };

  const todoEditSueccess = () => {
    toast('할일을 수정했습니다.');

    if (pathname === '/todoList') window.location.reload();
    setIsTodoCreateModalOpen(false);
  };

  const todoEditFail = () => {
    toast.error('문제가 발생했습니다.');
  };
  return { setTodoEdit };
}
