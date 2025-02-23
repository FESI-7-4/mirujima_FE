import { useState } from 'react';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths
} from 'date-fns';

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

  return (
    <div className="rounded-container">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {currentDate.getMonth() + 1}월에는 100%에 <span className="text-main">{`n`}번</span>
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
              return (
                <div
                  key={i}
                  className="mx-1 mb-2 rounded-full p-2 text-center"
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
