import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths
} from 'date-fns';

import { readTodoList } from '@/apis/todo';
import { WEEK_DAYS } from '@/constant/date';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDayOfMonth = startOfMonth(currentDate);

  const endDayOfMonth = endOfMonth(currentDate);

  const days = eachDayOfInterval({ start: startDayOfMonth, end: endDayOfMonth });

  const firstDayOfWeek = getDay(startDayOfMonth);

  const handleClickPrevMonth = () => {
    return setCurrentDate(subMonths(currentDate, 1));
  };
  const handleClickNextMonth = () => {
    return setCurrentDate(addMonths(currentDate, 1));
  };

  const { data } = useQuery({
    queryKey: ['todos', currentDate],
    queryFn: () => readTodoList({ pageSize: 9999 })
  });

  const getGoalIdByTodo = data?.todos
    .map((todo) => {
      if (todo.goal && todo.goal.completionDate) {
        const completionDate = format(new Date(todo.goal.completionDate), 'yyyy-MM-dd');
        return { goalId: todo.goal.id, completionDate };
      }
      return null;
    })
    .filter(Boolean);

  const calculateCompletionRate = (goalId: number) => {
    const goal = data?.todos.filter((todo) => todo.goal?.id === goalId);
    const total = goal?.length || 0;
    const completed = goal?.filter((todo) => todo.done).length || 0;

    if (total === 0) return 0;
    return (completed / total) * 100;
  };

  const getBgColorForGoal = (formattedDay: string) => {
    // 해당 날짜에 목표가 있는지 확인
    const goalId = getGoalIdByTodo?.find((goal) => goal?.completionDate === formattedDay)?.goalId;

    if (!goalId) return '';

    const completionRate = calculateCompletionRate(goalId);

    if (completionRate === 100) return 'after:bg-main text-white';
    else if (completionRate >= 70) return 'after:bg-[#FBA5A5] text-white';
    else if (completionRate >= 30) return 'after:bg-[#FFF0F0]';
    else return '';
  };

  return (
    <div className="rounded-container">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {currentDate.getMonth() + 1}월에는 100%에 <span className="text-main">{'n'}번</span>{' '}
        도달했어요!
      </h3>

      <div className="relative">
        <div className="absolute top-1/2 w-full -translate-y-1/2">
          <div className="absolute -left-8">
            <button
              onClick={handleClickPrevMonth}
              className="rounded-lg border bg-white px-1 py-1.5"
            >
              ←
            </button>
          </div>
          <div className="absolute -right-8">
            <button
              onClick={handleClickNextMonth}
              className="rounded-lg border bg-white px-1 py-1.5"
            >
              →
            </button>
          </div>
        </div>
        <div className="grid">
          <div className="grid grid-cols-7">
            {WEEK_DAYS.map((day) => {
              return (
                <div key={day} className="mb-3 text-center">
                  {day}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              const bgColor = getBgColorForGoal(formattedDay);

              return (
                <div
                  key={i}
                  className={`flex-center after:content-[' '] relative z-10 mx-1 mb-2 rounded-full p-2 text-center text-body2 after:absolute after:-z-10 after:h-8 after:w-8 after:rounded-full desktop:text-body1 desktop:after:h-12 desktop:after:w-12 ${bgColor}`}
                  style={i === 0 ? { gridColumnStart: firstDayOfWeek } : {}}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
