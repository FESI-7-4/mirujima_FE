'use client';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/navigation';

import { useAllTodos } from '@/hooks/todo/useAllTodos';
import { useInfoStore, useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';
import ArrowDownIcon from '@/public/icon/arrow-down.svg';
import PlusIcon from '@/public/icon/plus-border-none.svg';

import GoalProgressBar from './GoalProgressBar';

import type { TodoType } from '@/types/todo.type';
import TaskSection from './TaskSection';

interface GoalItemProps {
  goalId: number;
  title: string;
  todos?: TodoType[];
}

export default function GoalItem({ goalId, title, todos }: GoalItemProps) {
  const router = useRouter();
  const userId = useInfoStore((state) => state.userId);
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);

  const { todoData } = useAllTodos(Number(userId));
  const todoForGoal = todoData.filter((todo) => todo?.goal?.id === goalId);

  const [isMoreToggle, setIsMoreToggle] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleAddTodo = () => {
    if (goalId) setCreatedTodoState({ goal: { id: goalId } });
    setIsTodoCreateModalOpen(true);
  };

  const handleMoreTodo = () => {
    setIsMoreToggle((prev) => !prev);
  };

  const handleGoalClick = () => {
    router.push(`/goals/${goalId}`);
  };

  return (
    <div className="relative">
      <article onClick={handleGoalClick}>
        <div className="rounded-container mb-4 w-full cursor-pointer p-6" ref={ref}>
          <div className="flex justify-between">
            <h3 className="truncate pr-16 text-lg font-semibold">{title}</h3>
          </div>

          <GoalProgressBar todos={todos || []} goalId={goalId} startAnimation={inView} />

          <div className="mt-3 flex flex-col border-none pb-12 desktop:flex-row">
            <TaskSection title="To do" goalId={goalId} done={false} isMoreToggle={isMoreToggle} />

            <hr className="my-4 border-t border-dashed border-gray200 desktop:hidden" />

            <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
              <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
            </div>

            <TaskSection title="Done" goalId={goalId} done={true} isMoreToggle={isMoreToggle} />
          </div>
        </div>
      </article>

      <div className="absolute right-6 top-6 z-10 text-xs">
        <button onClick={handleAddTodo} className="flex-center text-main">
          <PlusIcon /> 할일 추가
        </button>
      </div>

      {todoForGoal.length > 4 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-gray200 text-sm shadow-sm transition-all hover:bg-solid">
          <button className="flex-center gap-1 px-6 py-1" onClick={handleMoreTodo}>
            더보기
            <ArrowDownIcon className={`${isMoreToggle ? 'rotate-180' : ''} transition-all`} />
          </button>
        </div>
      )}
    </div>
  );
}
