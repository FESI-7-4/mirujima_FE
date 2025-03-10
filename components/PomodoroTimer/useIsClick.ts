import { Dispatch, SetStateAction, useState } from 'react';

export default function useIsClick(setIsExpanded: Dispatch<SetStateAction<boolean>>) {
  const [clickStartTime, setClickStartTime] = useState(0);
  const handleMouseDown = () => {
    setClickStartTime(Date.now());
  };

  const handleMouseUp = () => {
    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration <= 200) setIsExpanded((prev) => !prev);
  };

  return { handleMouseDown, handleMouseUp };
}
