'use client';

import { useState, useEffect } from 'react';

const FOCUS_TIME = 10; // 25 * 60;
const BREAK_TIME = 5; // 5 * 60;

type TimerState = 'focus' | 'break';

export default function PomodoroTimer() {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState<TimerState>('focus');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          setState((now) => (now === 'focus' ? 'break' : 'focus'));
          return 0;
        }

        return prev - 1;
      });

      return () => clearTimeout(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, state]);

  useEffect(() => {
    setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
  }, [state]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleStartPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRunning((prev) => !prev);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTime(state === 'focus' ? FOCUS_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  const getColor = () => {
    const colors = ['#22C55E', '#74B45C', '#BEA353', '#F28D61', '#F86969'];
    const progress = time / (state === 'focus' ? FOCUS_TIME : BREAK_TIME);

    // 상태에 따라 색상을 순서대로 또는 역순으로 설정
    const colorArray = state === 'focus' ? colors.slice().reverse() : colors;

    const index = Math.min(Math.floor(progress * colorArray.length), colorArray.length - 1);

    return colorArray[index];
  };

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 flex cursor-pointer items-center justify-center overflow-hidden shadow-lg transition-all duration-300 ease-in-out ${
          isExpanded
            ? 'h-20 w-20 scale-100 rounded-full'
            : 'h-80 w-80 -translate-x-[40vw] -translate-y-1/2 scale-100 transform rounded-3xl'
        }`}
        style={{ backgroundColor: getColor() }}
        onClick={handleToggle}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-5 text-3xl text-white">{state === 'focus' ? 'Focus' : 'Break'}</h1>

          <h2 className="py-5 text-2xl font-bold text-white">
            {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}
          </h2>

          <div className="mt-4 flex gap-4">
            <button onClick={handleStartPause} className="rounded bg-blue-500 px-4 py-2 text-white">
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset} className="rounded bg-gray-500 px-4 py-2 text-white">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
