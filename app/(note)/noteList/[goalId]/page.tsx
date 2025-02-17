import React from 'react';

import { redirect } from 'next/navigation';

import { readGoalFromServer } from '@/apis/serverActions/goal';
import { readNoteListFromServer } from '@/apis/serverActions/note';
import TodoIcon from '@/public/icon/work.svg';

import EditGoal from '../../_components/editGoal/EditGoal';
import NoteCardList from '../../_components/noteCardList/NoteCardList';

export const dynamicParams = true;

interface Props {
  params: Promise<{ goalId: string }>;
}

export default async function NoteList({ params }: Props) {
  const { goalId } = await params;

  const goal = await readGoalFromServer(goalId);
  if (!goal) redirect('/'); // goalId가 잘못됐을 때 처리

  const defaultNoteListArgs = { goalId: Number(goalId), lastSeenId: 9999, pageSize: 10 };
  const noteList = await readNoteListFromServer(defaultNoteListArgs);

  return (
    <main className="h-screen overflow-y-scroll bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="max-w-[1248px] space-y-[24px] md:pt-4">
        <div className="flex h-[52px] w-full items-center gap-2 rounded-xl pt-[14px]">
          <div className="h-6 w-6">
            <TodoIcon />
          </div>
          <h2 className="w-full items-center truncate text-gray500">{goal.title}</h2>
          <EditGoal goalId={goal.id} />
        </div>
        {noteList.result ? <NoteCardList noteList={noteList.result} /> : <div>데이터 없음</div>}
      </section>
    </main>
  );
}
