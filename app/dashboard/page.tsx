'use client';

import Calendar from './_components/Calendar';
import GoalList from './_components/GoalList';
import RightSidebar from './_components/RightSidebar';
import WeekendChart from './_components/WeekendChart';

export default function Dashboard() {
  return (
    <section className="pt-[94px]">
      <div className="relative flex justify-center gap-4">
        <div className="w-full max-w-[1248px]">
          <div className="flex justify-between gap-4">
            <WeekendChart />
            <Calendar />
          </div>
          <GoalList />
        </div>
        <RightSidebar />
      </div>
    </section>
  );
}
