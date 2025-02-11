import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';

import type { DebouncedFunc } from 'lodash';

const PRIORITY = [1, 2, 3, 4];

export default function PrioritySelector({
  handleChangeIsValid
}: {
  handleChangeIsValid: DebouncedFunc<() => void>;
}) {
  const [selectedPriority, setSelectedPriority] = useState<number | string>(0);

  useEffect(() => {
    handleChangeIsValid();
  }, [selectedPriority, handleChangeIsValid]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="Priority-select">우선순위</label>
      <select
        id="Priority-select"
        className={`mt-4 rounded-lg border border-gray-200 px-4 py-[14px] ${selectedPriority === 0 ? 'text-gray350' : 'text-gray500'} `}
        name="priority"
        onChange={handleChange}
        value={selectedPriority}
      >
        <option value={0} className="hidden" disabled>
          우선순위를 선택해주세요
        </option>
        {PRIORITY.map((priority, index) => (
          <option key={index} value={priority} className="text-gray500">
            {priority}
          </option>
        ))}
      </select>
    </div>
  );
}
