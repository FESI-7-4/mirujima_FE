import { useEffect, useState } from 'react';

import useGetGoalList from '@/hooks/useGetGoalList';
import FlagBlackIcon from '@/public/icon/flag-black.svg';

import GoalItem from './GoalItem';

import type { GoalListType, GoalType } from '@/types/goal.type';

type GoalListResponse = {
  success: boolean;
  code: number;
  message: string;
  result: GoalListType;
};

export default function GoalList() {
  const { data } = useGetGoalList();
  const [goals, setGoals] = useState<GoalType[]>([]);

  useEffect(() => {
    async function fetchGoals() {
      try {
        if (Array.isArray(data)) setGoals(data);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    }

    fetchGoals();
  }, [data]);

  return (
    <div className="mt-4 md:mt-8">
      <h2 className="h2 mb-6 flex items-center gap-2">
        <FlagBlackIcon width={18} height={18} />
        목표 별 할 일
      </h2>
      <section className="flex flex-col gap-4">
        {goals?.length > 0 ? (
          goals.map((goal) => <GoalItem key={goal.id} goalId={goal.id} title={goal.title} />)
        ) : goals?.length === 0 ? (
          <div className="text-center text-[14px] font-medium leading-[16px] text-gray350">
            목표를 설정해주세요
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </div>
  );
}
