import { useEffect, useLayoutEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import useGetGoalList from '@/hooks/useGetGoalList';
import { useTodoCreateModalStore } from '@/provider/store-provider';

import type { GoalType } from './type';

export default function GoalSelector() {
  const [goalList, setGoalList] = useState<GoalType[]>([]);
  const { getGoalList } = useGetGoalList();
  const { goal, setCreatedTodoState } = useTodoCreateModalStore((state) => state);
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(goal);

  //바뀔 때마다 todoCreateModal값 바꿔주면 모든 input에서 리렌더링.
  //submit시에는 formRef로 현재 input값 가져올 거니 todoCreatModal 값을 일일이 다시 바꿔줄 필요는 없음.
  //단, title, priority, goal의 경우는 없으면 submit버튼 비활성화해야하니 allValue로 체크.
  //단, priroiry, goal의 경우 모달수정시에는 결코 빈값이 될 수 없으므로 useEffect로 안 봐도 됨.

  //수정시 초기값 가져오기용 세팅
  useEffect(() => {
    if (goal.id !== selectedGoal.id) setSelectedGoal(goal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal]);

  useLayoutEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await getGoalList();
    console.log(data.result.goals);
    setGoalList(data.result.goals);
  };

  const handleSelecteGoalChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const title = goalList.find((item) => item.id === parseInt(event.target.value))?.title;
    if (typeof title === 'string') {
      setSelectedGoal({ id: parseInt(event.target.value), title: title });
      setCreatedTodoState({
        goal: { id: parseInt(event.target.value), title: title }
      });
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="goal-select">목표</label>
      <select
        id="goal-select"
        className="mt-4 rounded-lg border border-gray-200 px-4 py-[14px] text-gray350"
        name="goal"
        onChange={handleSelecteGoalChange}
        value={selectedGoal?.title}
      >
        <option value={''} className="hidden" disabled>
          목표를 선택해주세요
        </option>
        {goalList.map((goal, index) => (
          <option key={index} id={`${index}`} value={goal.id} className="text-gray500">
            {goal.title}
          </option>
        ))}
      </select>
    </div>
  );
}
