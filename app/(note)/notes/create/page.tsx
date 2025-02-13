import React from 'react';

import { readTodoFromServer } from '@/api/serverActions/todo';

import NoteContent from '../../_components/noteContent/NoteContent';

interface Props {
  searchParams: Promise<{ todoId: string }>;
}

export default async function CreateNote({ searchParams }: Props) {
  const { todoId } = await searchParams;

  const todo = await readTodoFromServer(Number(todoId));

  // if (!todo) redirect('/');
  // if (todo.noteId === null) note가 있을 때

  return (
    <main className="h-screen overflow-y-scroll bg-gray100 px-4 pt-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <NoteContent todo={todo} note={null} />
    </main>
  );
}
