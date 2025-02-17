'use client';
import React from 'react';
import { NoteIcon } from '@/components/icons/NoteIcon';
import { RightArrowIcon } from '@/components/icons/RightArrowIcon';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex h-[60px] w-full items-center justify-between rounded-xl bg-solid px-6 font-semibold text-main ${className} `}
    >
      {/* 왼쪽 아이콘 + 텍스트 (8px 간격) */}
      <div className="flex items-center gap-2">
        <NoteIcon />
        <span className="text-[16px] leading-[22px]">{children}</span>
      </div>

      {/* 오른쪽 화살표 아이콘 */}
      <RightArrowIcon />
    </button>
  );
}
