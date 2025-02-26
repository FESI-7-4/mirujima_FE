import { useEffect, useState } from 'react';

import { getGoalTodos } from '@/utils/dashboard/goalUtil';
import { calcGoalCompletionPercentage } from '@/utils/percentageUtils';

import type { TodoType } from '@/types/todo.type';

export default function GoalProgressBar({
  todos = [],
  goalId
}: {
  todos: TodoType[];
  goalId: number;
}) {
  const [progress, setProgress] = useState(0);
  const goalTodos = getGoalTodos(todos, goalId);

  useEffect(() => {
    const percentage = calcGoalCompletionPercentage(goalTodos, goalId);
    setProgress(percentage);
  }, [goalTodos, goalId]);

  return (
    <div className="my-6">
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-main" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 text-right font-bold">{progress}%</div>
    </div>
  );
}
