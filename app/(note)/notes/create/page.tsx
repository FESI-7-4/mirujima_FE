import React from 'react';

import { redirect } from 'next/navigation';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { NoteSearchParams } from '@/types/note.type';

export default async function CreateNote({ searchParams }: { searchParams: NoteSearchParams }) {
  const { goal, todo } = await searchParams;

  if (!goal || !todo) redirect('/todoList');

  return (
    <main className="min-h-screen px-4">
      <NoteContent goal={goal} todo={todo} />
    </main>
  );
}
