import { useQuery } from '@tanstack/react-query';

import { readTodoProgress } from '@/api/todo';
import { useCountUp } from '@/hooks/dashboard/useCountUp';

export default function WeekendChart() {
  const { data } = useQuery({ queryKey: ['progress'], queryFn: readTodoProgress });

  const completionRate = data?.todoCount
    ? ((data.completionTodoCount / data.todoCount) * 100).toFixed()
    : 0;

  const count = useCountUp(Number(completionRate), 2000);

  return (
    <div className="rounded-container w-1/2">
      <h3 className="h3 mb-4">이번주 평균 달성률</h3>
      <h2 className="mb-6">
        오늘까지 <span className="text-main">{count}%</span> 달성했어요
      </h2>
    </div>
  );
}
