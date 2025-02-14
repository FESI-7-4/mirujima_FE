'use client';

import Calendar from './_components/Calendar';
import GoalList from './_components/GoalList';
import RightSidebar from './_components/RightSidebar';
import WeekendChart from './_components/WeekendChart';

export default function Dashboard() {
  return (
    <section className="h-screen bg-gray100 px-4 pt-[94px] md:px-6 md:pl-[104px] lg:pl-[296px]">
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
