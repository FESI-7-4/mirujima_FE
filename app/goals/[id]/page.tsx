'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useGetTodoList } from '@/hooks/goalsDetail/useGetTodoList';
import { useInfoStore } from '@/stores/infoStore';
import Button from '../_components/Button';
import TaskList from '../_components/TaskList';
import { QueryClient } from '@tanstack/react-query';

export default function GoalDetailPage() {
  const queryClient = useRef(new QueryClient()).current;
  const router = useRouter();
  const { restoreUser } = useInfoStore();

  const params = useParams();
  const goalId = Array.isArray(params.id) ? params.id[0] : params.id;
  console.log('🔥 goalId:', goalId);

  const {
    data: goalData,
    isLoading: isGoalDetailLoading,
    isError: isGoalDetailError,
    error: goalDetailError
  } = useGetGoalDetail(goalId);

  const {
    data: todoList,
    isLoading: isTodoListLoading,
    isError: isTodoListError
  } = useGetTodoList(goalId, false);

  const {
    data: doneList,
    isLoading: isDoneListLoading,
    isError: isDoneListError
  } = useGetTodoList(goalId, true);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  if (isGoalDetailLoading || isTodoListLoading || isDoneListLoading) {
    return <div>로딩 중...</div>;
  }

  if (isGoalDetailError || isTodoListError || isDoneListError) {
    console.error(goalDetailError);
    return <div>데이터 로딩 에러가 발생했습니다.</div>;
  }

  const goalTitle: string = goalData?.result?.title ?? '목표 제목이 없어요';

  // 날짜 문자열을 Date 객체로 변환
  const toDoTasks = (todoList ?? []).map((todo) => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt)
  }));
  const doneTasks = (doneList ?? []).map((todo) => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt)
  }));
  return (
    <main className="flex h-screen justify-center overflow-y-scroll bg-gray100 px-4 py-[48px] md:pl-[104px] md:pt-0 lg:pl-[296px]">
      <section className="flex w-full min-w-[262px] max-w-[1284px] flex-col gap-6 md:pt-4">
        <h2 className="flex h-[28px] w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src="/icon/todo-list-black.svg"
              alt="목표 아이콘"
              height={24}
              width={24}
              className="h-[24px] w-[24px]"
            />
            {goalTitle}
          </div>
        </h2>

        <Button onClick={() => router.push('/noteList')}>노트 모아보기</Button>

        <div className="flex rounded-[16px] border border-gray200 bg-white p-6 shadow-sm">
          <TaskList title="To do" tasks={toDoTasks} queryClient={queryClient} />

          <div className="mx-6 flex translate-y-5 items-center justify-center">
            <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
          </div>

          <TaskList title="Done" tasks={doneTasks} queryClient={queryClient} />
        </div>
      </section>
    </main>
  );
}
