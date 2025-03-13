import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions/index';
import { TODO_DELETE_ERROR, TODO_DELETE_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { TodoType } from '@/types/todo.type';
import { cacheType } from '@/types/query.type';

export function useDeleteTodoItem() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  const cacheUpdate = async (queryKey: any[], todo: TodoType) => {
    await queryClient.setQueryData(queryKey, (cache: cacheType | []) => {
      if (!cache || Array.isArray(cache)) return [];
      const oldTodos = cache.pages[0].todos;
      const newTodos = oldTodos.filter((item: TodoType) => item.id !== todo.id);

      return { ...cache, pages: [{ ...cache.pages[0], todos: newTodos }] };
    });
  };

  return useMutation({
    mutationFn: async (todo: TodoType) => {
      await apiWithClientToken.delete(`/todos/${todo.id}`);
      return { todo };
    },
    onMutate: (todo) => {
      return { todo };
    },
    onSuccess: ({ todo }: { todo: TodoType }) => {
      setIsLoading(false);
      if (todo.goal) cacheUpdate(['todos', todo.goal.id, userId], todo);

      cacheUpdate(['allTodos', userId], todo);
      toast.success(TODO_DELETE_SUCCESS);
    },
    onError: (_, _todoId) => {
      setIsLoading(false);
      toast.error(TODO_DELETE_ERROR);
    }
  });
}
