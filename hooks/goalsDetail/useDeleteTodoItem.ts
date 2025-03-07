import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions/index';
import { TODO_DELETE_ERROR, TODO_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

const deleteTodoItem = async (todoId: number): Promise<void> => {
  await apiWithClientToken.delete(`/todos/${todoId}`);
};

export function useDeleteTodoItem(goalId?: number) {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: (todoId: number) => deleteTodoItem(todoId),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (_, todoId) => {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ['allTodos', userId], refetchType: 'all' });
      queryClient.refetchQueries({ queryKey: ['allTodos', userId] });
      queryClient.invalidateQueries({
        queryKey: ['todos', goalId ?? 0, userId],
        refetchType: 'all'
      });
      queryClient.invalidateQueries({
        queryKey: ['notes', goalId ?? 0, userId],
        refetchType: 'all'
      });

      toast.success(TODO_DELETE_SUCCESS);
    },
    onError: () => {
      setIsLoading(false);
      toast.error(TODO_DELETE_ERROR);
    }
  });
}
