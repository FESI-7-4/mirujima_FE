import { TodoType } from './todo.type';

export type cacheType = {
  pageParams: number[];
  pages: { lastSeeId: number; remainigCount: number; todos: TodoType[] }[];
};
