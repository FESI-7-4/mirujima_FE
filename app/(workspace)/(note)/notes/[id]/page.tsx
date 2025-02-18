import React from 'react';

import NoteContent from '../../_components/noteContent/NoteContent';

import type { TodoType } from '@/types/todo.type';
// note detail content

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteDetail({ params }: Props) {
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

  return (
    <>
      <NoteContent todo={todo} note={null} />
    </>
  );
}
