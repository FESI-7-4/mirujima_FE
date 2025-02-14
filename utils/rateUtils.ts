import type { TodoProgressType } from '@/types/todo.type';

export const calculateCompletionRate = ({
  todoCount,
  completionTodoCount = 0
}: TodoProgressType) => {
  return todoCount ? ((completionTodoCount / todoCount) * 100).toFixed() : 0;
};
