'use client';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { apiWithClientToken } from '@/api/clientActions';

import AddIcon from '../../../public/icon/add.svg';
export default function NewGoalButton() {
  const [input, setInput] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input && inputRef.current) inputRef.current.focus();
  }, [input]);
  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const nowGoal = inputRef.current.value;

      if (nowGoal !== '') {
        const { data } = await apiWithClientToken.post('/goals', {
          title: nowGoal
        });

        if (data.code === 200) {
          toast('등록되었습니다.');
        }
        setInput(false);
        inputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <button
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[8px] border-[1px] border-main text-main transition-all duration-300 ease-in-out"
        onClick={() => setInput(true)}
      >
        <AddIcon />새 목표
      </button>
      {input && (
        <input
          ref={inputRef}
          type="text"
          placeholder="목표를 입력해 주세요"
          onKeyDown={handleInputEnter}
        />
      )}
    </>
  );
}
