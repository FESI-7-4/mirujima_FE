import { useState } from 'react';

import { eachDayOfInterval, startOfMonth } from 'date-fns';

import { WEEK_DAYS } from '@/constant/date';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startDayOfMonth = startOfMonth(currentDate);

  const endDayOfMonth = startOfMonth(currentDate);

  const days = eachDayOfInterval({ start: startDayOfMonth, end: endDayOfMonth });

  return (
    <div className="rounded-container">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {'n'}월에는 100%에 <span className="text-main">{`n`}번</span>
        도달했어요!
      </h3>

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
      </div>
    </div>
  );
}
