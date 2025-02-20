import { useLayoutEffect } from 'react';

import Link from 'next/link';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import NewGoalButton from './NewGoalButton';
import DashboardIcon from '../../../public/icon/dashboard-gray.svg';

import NoteListIcon from '../../../public/icon/nav-note-list.svg';
import TodoListIcon from '../../../public/icon/nav-todo-list.svg';
import GoalList from './GoalList';

import useInfinityGoalList from '@/hooks/nav/useInfinityGoalList';

export default function Menus() {
  const { id, setInfo } = useInfoStore((state) => state);

  useLayoutEffect(() => {
    if (!id) getInfo();
  }, [id]);

  const getInfo = async () => {
    const { data } = await apiWithClientToken.get('/user');

    setInfo({ id: data.id, email: data.email, name: data.userName });
  };

  return (
    <div className="mt-8">
      <div className="box-border flex h-12 items-center gap-2 rounded-[8px] bg-white px-[21px] py-[17px] text-gray350">
        <Link href="/dashboard" className="flex gap-2">
          <DashboardIcon />
          대시보드
        </Link>
      </div>

      <div className="flex flex-col gap-[17px] px-[21px] py-[17px] text-gray400">
        <Link href="/todoList" className="flex items-center gap-[6px]">
          <TodoListIcon /> <p>할 일 모아보기</p>
        </Link>
        <Link href="/noteList" className="flex items-center gap-[6px]">
          <NoteListIcon /> <p>노트 모아보기</p>
        </Link>
      </div>

      <GoalList />
      <NewGoalButton />
    </div>
  );
}
