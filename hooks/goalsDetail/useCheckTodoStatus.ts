import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import type { TodoType } from '@/types/todo.type';
import { cacheType } from '@/types/query.type';

interface CheckTodoParams {
  todo: TodoType;
}

export const useCheckTodo = () => {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  const cacheUpdate = async (queryKey: any[], todo: TodoType) => {
    await queryClient.setQueryData(queryKey, (cache: cacheType | []) => {
      if (!cache || Array.isArray(cache)) return [];
      const oldTodos = cache.pages[0].todos;
      const newTodos = oldTodos.map((item: TodoType) => {
        if (item?.id === todo?.id) return todo;
        else return item;
      });

      return { ...cache, pages: [{ ...cache.pages[0], todos: newTodos }] };
    });
  };

  return useMutation({
    mutationFn: async ({ todo }: CheckTodoParams) => {
      if (!todo.id) throw new Error('ToDo id가 없습니다.');

      await apiWithClientToken.patch(`/todos/completion/${todo.id}`, {
        done: todo.done,
        completionDate: todo.completionDate ?? null
      });
      return { todo };
    },
    onMutate: ({ todo }) => {
      return { todo };
    },
    onSuccess: async ({ todo }: { todo: TodoType }) => {
      if (todo.goal) cacheUpdate(['todos', todo.goal.id, userId], todo);

      cacheUpdate(['allTodos', userId], todo);
    },
    onError: (error, _) => {
      console.error(error);
    }
  });
};
