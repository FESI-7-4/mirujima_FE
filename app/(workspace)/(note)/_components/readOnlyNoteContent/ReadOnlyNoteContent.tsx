'use client';

import React from 'react';

import { Editor } from '../noteContent/editor/DynamicEditor';
import GoalAndTodoInfo from '../noteContent/goalAndTodoInfo/GoalAndTodoInfo';
import LinkArea from '../noteContent/linkArea/LinkArea';

import type { NoteType } from '@/types/note.type';

interface Props {
  note: NoteType;
}

export default function ReadOnlyNoteContent({ note }: Props) {
  return (
    <section className="bg-white">
      <GoalAndTodoInfo
        goalTitle={note.goalDto.title}
        todoTitle={note.todoDto.title}
        todoCompletaionDate={note.todoDto.completionDate}
      />

      <div className="mt-6 flex items-center gap-[10px] border-y border-gray200 px-4 py-4">
        <h3 className="w-full text-[22px] font-semibold leading-[28px]">{note.title}</h3>
      </div>

      <div className="space-y-2 px-4 py-[40px]">
        {note.linkUrl && <LinkArea linkUrl={note.linkUrl} />}

        <Editor defaultContent={note.content} isEditable={false} />
      </div>
    </section>
  );
}
