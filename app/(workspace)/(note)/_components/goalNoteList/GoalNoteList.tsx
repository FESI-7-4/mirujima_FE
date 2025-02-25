'use client';

import React from 'react';

import useToggle from '@/hooks/useToggle';
import ArrowDown from '@/public/icon/arrow-down.svg';
import ArrowUp from '@/public/icon/arrow-up.svg';
import TodoIcon from '@/public/icon/work.svg';

import type { GoalType } from '@/types/goal.type';

interface Props {
  goal: GoalType;
}

export default function GoalNoteList({ goal }: Props) {
  const { isToggleOpen, handleToggle } = useToggle();

  return (
    <section>
      <div onClick={handleToggle} className="flex w-full items-center gap-1 pl-8 pr-4">
        <TodoIcon width="18" height="18" className="shrink-0" />
        <h3 className="truncate">{goal.title}</h3>
        <button type="button" className="">
          {isToggleOpen ? (
            <ArrowUp width="24" height="24" />
          ) : (
            <ArrowDown width="24" height="24" className="stroke-gray500" />
          )}
        </button>
      </div>
    </section>
  );
}
