import { useQuery } from '@tanstack/react-query';

import { readTodoProgress } from '@/apis/todo';
import { useCountUp } from '@/hooks/dashboard/useCountUp';
import { calculateCompletionRate } from '@/utils/rateUtils';

export default function WeeklyChart() {
  const { data } = useQuery({ queryKey: ['progress'], queryFn: readTodoProgress });

  const completionRate = calculateCompletionRate({
    todoCount: data?.todoCount,
    completionTodoCount: data?.completionTodoCount
  });

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
