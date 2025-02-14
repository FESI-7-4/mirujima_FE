import LatestTodoList from './LatestTodoList';
import UpcomingGoals from './UpcomingGoals';

export default function RightSidebar() {
  return (
    <div className="flex flex-col gap-y-4">
      <LatestTodoList />
      <UpcomingGoals />
    </div>
  );
}
