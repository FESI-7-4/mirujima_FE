import { useQuery } from '@tanstack/react-query';

import { readTodoProgress } from '@/api/todo';

export default function WeekendChart() {
  const { data } = useQuery({ queryKey: ['progress'], queryFn: readTodoProgress });

  const completionRate = data?.todoCount
    ? ((data.completionTodoCount / data.todoCount) * 100).toFixed()
    : 0;

  return (
    <div className="rounded-container w-1/2">
      <h3 className="h3 mb-4">이번주 평균 달성률</h3>
      <h2 className="mb-6">
        오늘까지 <span className="text-main">{completionRate}%</span> 달성했어요
      </h2>
    </div>
  );
}
