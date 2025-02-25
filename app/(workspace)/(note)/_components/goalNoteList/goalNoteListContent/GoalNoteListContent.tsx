'use client';

import React from 'react';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';

import NoteCard from '../../noteCardList/noteCard/NoteCard';

import type { GoalType } from '@/types/goal.type';

interface Props {
  goal: GoalType;
}

export default function GoalNoteListContent({ goal }: Props) {
  const { data, isFetching } = useInfiniteNoteList(goal.id, 100);

  const onClickNote = () => {};
  const onClickEdit = () => {};
  const onClickDelete = () => {};

  if (!data || data.length === 0) {
    return <div className="text-center">노트가 없음</div>;
  }

  return (
    <div className="space-y-2">
      {data.map((note) => (
        <NoteCard
          key={note.createdAt}
          note={note}
          onClickNote={onClickNote}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      ))}
    </div>
  );
}
