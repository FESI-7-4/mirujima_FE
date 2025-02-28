'use client';

import React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import useInfiniteNoteList from '@/hooks/note/useInfiniteNoteList';
import useNoteActions from '@/hooks/note/useNoteActions';

import NoteCard from './noteCard/NoteCard';

import type { NoteListType } from '@/types/note.type';

interface Props {
  noteList: NoteListType;
}

export default function NoteCardList({ noteList }: Props) {
  const { goalId } = useParams<{ goalId: string }>();

  const { data, inViewRef } = useInfiniteNoteList(Number(goalId), noteList);
  const { onClickNote, onClickEdit, onClickDelete } = useNoteActions(Number(goalId));

  return (
    <div className="space-y-2">
      {data.length === 0 && (
        <div className="flex-center h-[300px] w-full gap-2">
          <p>노트가 없어요..!</p>
          <Link
            href={`/goals/${goalId}`}
            className="rounded bg-solid p-2 text-main hover:underline"
          >
            👉 노트 추가하러 가기
          </Link>
        </div>
      )}
      {data.map((note) => {
        return (
          <NoteCard
            key={note.createdAt}
            note={note}
            onClickNote={onClickNote(note.id)}
            onClickEdit={onClickEdit(note.todoDto.id)}
            onClickDelete={onClickDelete(note.id, note.title)}
          />
        );
      })}
      <div ref={inViewRef} />
    </div>
  );
}
