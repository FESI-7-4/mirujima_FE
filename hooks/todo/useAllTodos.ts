import { useQuery } from '@tanstack/react-query';

import { readTodoList } from '@/apis/clientActions/todo';

import type { TodoListType } from '@/types/todo.type';

export const useAllTodos = (pageSize?: number, currentDate?: Date) => {
  const { data, isLoading } = useQuery<TodoListType>({
    queryKey: ['allTodos', pageSize, currentDate],
    queryFn: () => readTodoList({ pageSize }),
    retry: 0
  });

  const todoData = data?.todos || [];

  return { todoData, isLoading };
};
