import type { SearchParams } from 'next/dist/server/request/search-params';

export type NoteData = {
  todoId: string;
  title: string;
  content: string;
  linkUrl: string;
};

export interface NoteSearchParams extends SearchParams {
  todoId: string;
}
