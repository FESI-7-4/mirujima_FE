'use client';

import React from 'react';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { NoteListType } from '@/types/note.type';

interface Props {
  noteList: string | ApiResponse<NoteListType>;
}

export default function NoteCardList({ noteList }: Props) {
  console.log(noteList);

  return (
    <>
      <div>NoteCardList</div>
    </>
  );
}
