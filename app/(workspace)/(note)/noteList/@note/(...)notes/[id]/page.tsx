import React from 'react';

// import NoteContent from '@/app/(note)/_components/noteContent/NoteContent';
import { redirect } from 'next/navigation';

import { readNoteFromServer } from '@/apis/serverActions/note';
import ReadOnlyNoteContent from '@/app/(workspace)/(note)/_components/readOnlyNoteContent/ReadOnlyNoteContent';

import NoteLayoutModal from './modal';

import type { TodoType } from '@/types/todo.type';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailModal({ params }: Props) {
  const id = (await params).id;
  const todo: TodoType = {
    goal: { id: 1, title: '', completionDate: '' },
    noteId: 5,
    done: false,
    linkUrl: '',
    filePath: '',
    title: 'string',
    id: 6,
    userId: 1,
    createdAt: '',
    updatedAt: '',
    priority: 1
  };
  const note = await readNoteFromServer(Number(id));
  console.log(note);
  if (!note) redirect('/');

  return (
    <NoteLayoutModal>
      <ReadOnlyNoteContent note={note} />
    </NoteLayoutModal>
  );
}
