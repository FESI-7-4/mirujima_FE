'use client';

import { useState } from 'react';
import Confetti from '../confettis/Confetti';
import Test from '@/public/images/logo/stem.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Rnd } from 'react-rnd';
import useConfetti from './useConfetti';
import useIsDrag from './useIsDrag';
import usePomodoroTimer from './usePomodoroTimer';
import usePosition from './usePosition';

export default function PomodoroTimer() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const { isRunning, time, setTime, state, setState, getColor, handleStartPause, handleReset } =
    usePomodoroTimer();
  const { showConfetti, setShowConfetti } = useConfetti(isRunning, setTime, setState, state);
  const { position, setPosition } = usePosition();
  const { handleDragStart, handleDragStop } = useIsDrag(setIsExpanded, setPosition);

  if (pathname.includes('login') || pathname.includes('signup') || pathname === '/') return null;

  return (
    <>
      <Rnd
        bounds="window"
        default={{
          x: position.x,
          y: position.y,
          width: isExpanded ? 320 : 80,
          height: isExpanded ? 320 : 80
        }}
        className="z-50"
      >
        <div
          className={`fixed right-6 top-6 flex cursor-pointer items-center justify-center transition-all duration-500 ease-in-out ${
            isExpanded ? '-translate-x-[2vw] translate-y-[2vw]' : ''
          }`}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragStop}
        >
          <div className="relative h-full w-full">
            <Image
              src={Test}
              width={30}
              height={30}
              alt="stem"
              className={'absolute top-[-15px] z-20 transition-all duration-500 ease-in-out'}
            />

            <div
              className={`cursor-pointer items-center justify-center overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${
                isExpanded ? 'h-80 w-80 rounded-3xl' : 'h-20 w-20 rounded-full'
              }`}
              style={{ backgroundColor: getColor() }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <h1 className="mb-5 text-3xl text-white">
                  {state === 'focus' ? 'Focus' : 'Break'}
                </h1>

                <h2 className="py-5 text-2xl font-bold text-white">
                  {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}
                </h2>

                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleStartPause}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="rounded bg-gray-500 px-4 py-2 text-white"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rnd>
      {showConfetti && <Confetti setShowConfetti={setShowConfetti} />}
    </>
  );
}
