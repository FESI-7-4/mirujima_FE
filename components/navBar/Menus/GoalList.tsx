import Link from 'next/link';

import useGetGoalList from '@/hooks/useGetGoalList';

import FlagIcon from '../../../public/icon/flag-black.svg';

export default function GoalList() {
  const { data: goals, isLoading } = useGetGoalList();

  return (
    <>
      <div className="mt-6 box-border flex h-12 items-center gap-2 rounded-[8px] bg-Cgray px-[21px] py-[17px] text-gray500">
        <div className="flex gap-2">
          <FlagIcon />
          목표
        </div>
      </div>
      <ul className="scrollbar-thin relative mb-10 mt-4 max-h-[200px] min-h-[100px] list-inside gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar]:w-1">
        {isLoading
          ? 'loading..'
          : goals.map((goal: any) => {
              return (
                <li key={goal.id} className="p-2">
                  <Link href={`/goals/${goal.id}`}>• {goal.title}</Link>
                </li>
              );
            })}
      </ul>
    </>
  );
}
