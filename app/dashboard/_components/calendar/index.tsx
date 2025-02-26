import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { readTodoList } from '@/apis/todo';
import { WEEK_DAYS } from '@/constant/date';
import useCalendar from '@/hooks/dashboard/useCalendar';
import { getBgColorForGoal } from '@/utils/dashboard/getBgColorForGoal';
import { getGoalIdByTodo } from '@/utils/dashboard/getGoalIdByTodo';
import { calcGoalCompletionPercentage } from '@/utils/percentageUtils';

export default function Calendar() {
  const { currentDate, days, firstDayOfWeek, handleClickPrevMonth, handleClickNextMonth } =
    useCalendar();

  const { data } = useQuery({
    queryKey: ['todos', currentDate],
    queryFn: () => readTodoList({ pageSize: 9999 })
  });

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
              const bgColor = getBgColorForGoal(
                data?.todos || [],
                formattedDay,
                getGoalIdByTodo,
                calcGoalCompletionPercentage
              );

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
