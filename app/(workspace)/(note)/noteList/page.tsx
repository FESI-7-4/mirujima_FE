import React from 'react';

import { readGoalListFromServer } from '@/apis/serverActions/goal';
import NoteIcon from '@/public/icon/note.svg';

import GoalNoteList from '../_components/goalNoteList/GoalNoteList';
import NoGoalNoteList from '../_components/noGoalNoteList/NoGoalNoteList';

export default async function AllNoteList() {
  const goalList = await readGoalListFromServer();

  const showErrorMessage = !goalList || !goalList.goals || goalList.goals.length === 0;

  return (
    <section className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <NoteIcon width="24" height="24" />
        <h2>모든 노트 모아보기</h2>
      </div>
      <NoGoalNoteList />
      {showErrorMessage ? (
        <section className="flex h-[50px] w-full flex-col gap-2 pl-8 desktop:flex-row">
          <p className="text-main">생성한 목표가 없습니다!</p>
          <p>사이드바에서 목표를 추가해보세요!</p>
        </section>
      ) : (
        goalList.goals.map((goal) => <GoalNoteList key={goal.createdAt} goal={goal} />)
      )}
    </section>
  );
}
