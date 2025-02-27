'use client';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import TaskList from '@/components/TaskList/TaskList';
import { useGetGoalDetail } from '@/hooks/goalsDetail/useGetGoalDetail';
import { useModalStore, useTodoCreateModalStore } from '@/provider/store-provider';
import PlusIcon from '@/public/icon/plus-border-none.svg';

import GoalProgressBar from './GoalProgressBar';

import type { TodoType } from '@/types/todo.type';

interface GoalItemProps {
  goalId: number;
  title: string;
  todos?: TodoType[];
}

export default function GoalItem({ goalId, title, todos }: GoalItemProps) {
  const setIsTodoCreateModalOpen = useModalStore((state) => state.setIsTodoCreateModalOpen);
  const setCreatedTodoState = useTodoCreateModalStore((state) => state.setCreatedTodoState);

  const { data, isLoading, isError } = useGetGoalDetail(goalId.toString());
  const router = useRouter();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const handleContainerClick = () => {
    router.push(`/goals/${goalId}`);
  };
  if (isLoading) {
    return (
      <div className="rounded-container w-full p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div>Loading todos...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-container w-full p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div>Failed to fetch detail...</div>
      </div>
    );
  }

  const handleAddTodo = () => {
    if (goalId) setCreatedTodoState({ goal: { id: goalId } });
    setIsTodoCreateModalOpen(true);
  };

  return (
    <div className="relative">
      <Link href={`/goals/${goalId}`}>
        <div
          className="rounded-container mb-4 w-full cursor-pointer p-6"
          onClick={handleContainerClick}
          ref={ref}
        >
          <div className="flex justify-between">
            <h3 className="truncate pr-16 text-lg font-semibold">{title}</h3>
          </div>

          <GoalProgressBar todos={todos || []} goalId={goalId} startAnimation={inView} />

          <div className="mt-3 flex flex-col border-none desktop:flex-row">
            <div className="flex-1 overflow-y-auto">
              <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
                To do
              </h2>
              <div onClick={(e) => e.stopPropagation()}>
                <TaskList goalId={goalId} done={false} />
              </div>
            </div>

            <hr className="my-4 border-t border-dashed border-gray200 desktop:hidden" />

            <div className="mx-6 my-4 hidden translate-y-5 items-center justify-center desktop:flex">
              <span className="min-h-[160px] w-px border-l border-dashed border-gray200"></span>
            </div>

            <div className="flex-1 overflow-y-auto">
              <h2 className="z-5 sticky top-0 bg-white py-2 text-[15px] font-medium leading-[20px] text-gray500">
                Done
              </h2>
              <div onClick={(e) => e.stopPropagation()}>
                <TaskList goalId={goalId} done={true} />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="absolute right-6 top-6 z-10 text-xs">
        <button onClick={handleAddTodo} className="flex-center text-main">
          <PlusIcon /> 할일 추가
        </button>
      </div>
    </div>
  );
}
