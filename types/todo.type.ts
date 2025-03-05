import type { GoalType } from './goal.type';
import type { ISODateString } from './goal.type';

export type TodoListType = {
  lastSeenId: number;
  remainingCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: Pick<GoalType, 'id' | 'title' | 'completionDate'>;
  noteId: number | null;
  done: boolean;
  linkUrl: string | null;
  filePath: string | null;
  title: string;
  id: number;
  userId: number;
  completionDate: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  priority: number;
};

export type TodoProgressType = Partial<{
  todoCount: number;
  completionTodoCount: number;
}>;

export type EditableTodo = TodoType & {
  fileName?: string | null;
  isEdit: boolean;
};
