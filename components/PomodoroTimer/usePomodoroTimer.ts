import { BREAK_TIME, FOCUS_TIME } from '@/constant/numbers';
import { TimerStateType } from '@/types/pomodoro.type';
import { useState } from 'react';

export default function usePomodoroTimer() {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<TimerStateType>('focus');

  const getColor = () => {
    const colors = ['#22C55E', '#74B45C', '#BEA353', '#F28D61', '#F86969'];
    const progress = time / (state === 'focus' ? FOCUS_TIME : BREAK_TIME);

    const colorArray = state === 'focus' ? colors.slice().reverse() : colors;

    const index = Math.min(Math.floor(progress * colorArray.length), colorArray.length - 1);

    return colorArray[index];
  };

  const handleStartPause = (e: React.MouseEvent) => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = (e: React.MouseEvent) => {
    setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  return {
    isRunning,
    setIsRunning,
    time,
    setTime,
    state,
    setState,
    getColor,
    handleStartPause,
    handleReset
  };
}
