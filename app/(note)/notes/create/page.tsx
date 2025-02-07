import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { NoteSearchParams } from '@/types/note.type';
import type { TodoResponseType } from '@/types/todo.type';

export default async function CreateNote({ searchParams }: { searchParams: NoteSearchParams }) {
  const todo: TodoResponseType = {
    noteId: 0,
    done: true,
    linkUrl: 'string',
    fileUrl: 'string',
    title: 'todo title',
    id: 3624,
    goal: {
      id: 0,
      title: 'goal title'
    },
    userId: 0,
    teamId: 'string',
    updatedAt: '2025-02-07T00:50:52.094Z',
    createdAt: '2025-02-07T00:50:52.094Z'
  };

  // if (!todo) redirect('/');/

  return (
    <main className="min-h-screen px-4">
      <NoteContent todo={todo} />
    </main>
  );
}
