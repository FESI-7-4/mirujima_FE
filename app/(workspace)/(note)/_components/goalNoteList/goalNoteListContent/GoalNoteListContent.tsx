'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import useDeleteNote from '@/hooks/note/useDeleteNote';
import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';
import LoadingSpinner from '@/public/icon/spin.svg';

import NoteCard from '../../noteCardList/noteCard/NoteCard';

import type { GoalType } from '@/types/goal.type';

interface Props {
  goal: GoalType;
}

export default function GoalNoteListContent({ goal }: Props) {
  const router = useRouter();

  const { data, isFetching, inViewRef } = useInfiniteNoteList(goal.id, 10);
  const { mutate } = useDeleteNote(goal.id);

  const onClickNote = (noteId: number) => {
    return () => router.push(`/notes/${noteId}`, { scroll: false });
  };

  const onClickEdit = (todoId: number) => {
    return () => router.push(`/notes/create/${todoId}`);
  };

  const onClickDelete = (noteId: number) => {
    return () => mutate(noteId);
  };

  if (!data || data.length === 0) {
    return <div className="text-center">노트가 없음</div>;
  }

  return (
    <div className="max-h-[400px] space-y-2 overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
      {data.map((note) => (
        <NoteCard
          key={note.createdAt}
          note={note}
          onClickNote={onClickNote(note.id)}
          onClickEdit={onClickEdit(note.todoDto.id)}
          onClickDelete={onClickDelete(note.id)}
        />
      ))}
      {isFetching && <LoadingSpinner />}
      <div ref={inViewRef} />
    </div>
  );
}
