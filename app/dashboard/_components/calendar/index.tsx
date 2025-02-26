import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { readTodoList } from '@/apis/todo';
import { WEEK_DAYS } from '@/constant/date';
import useCalendar from '@/hooks/dashboard/useCalendar';
import ArrowLeft from '@/public/icon/arrow-left-calendar.svg';
import ArrowRight from '@/public/icon/arrow-right-calendar.svg';
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
    <div className="rounded-container relative">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {currentDate.getMonth() + 1}월에는 100%에 <span className="text-main">{'n'}번</span>{' '}
        도달했어요!
      </h3>

      <div className="absolute top-1/2 w-full -translate-y-1/2 md:right-5 md:top-6 md:w-5">
        <div className="absolute -left-8 md:left-0 md:right-0">
          <button
            onClick={handleClickPrevMonth}
            className="rounded-lg border bg-white p-3 md:border-none md:p-0"
          >
            <ArrowLeft width="6" className="stroke-black md:stroke-main" />
          </button>
        </div>
        <div className="absolute right-4 md:right-0">
          <button
            onClick={handleClickNextMonth}
            className="rounded-lg border bg-white p-3 md:border-none md:p-0"
          >
            <ArrowRight width="6" className="stroke-black md:stroke-main" />
          </button>
        </div>
      </div>

      <div className="relative">
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
                  className={`${bgColor} flex-center after:content-[' '] relative z-10 mx-1 mb-2 rounded-full p-2 text-center text-body2 after:absolute after:-z-10 after:h-8 after:w-8 after:rounded-full desktop:text-body1 desktop:after:h-12 desktop:after:w-12`}
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
