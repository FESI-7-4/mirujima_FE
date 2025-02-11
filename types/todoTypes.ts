export type TodoListType = {
  lastSeenId: number;
  totalCount: number;
  todos: TodoType[];
};

export type TodoType = {
  goal: GoalType;
  noteId: number;
  done: boolean;
  linkUrl: string;
  filePath: string;
  title: string;
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  priority: number;
};

export type GoalType = {
  id: number;
  title: string;
};
