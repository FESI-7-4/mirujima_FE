'use client';

import React from 'react';

import { CloseCircleIcon } from '@/components/icons';

interface Props {
  onRemove: () => void;
  onLoad: () => void;
}

export default function TempNote({ onRemove, onLoad }: Props) {
  return (
    <div className="flex h-[64px] w-full items-center justify-between rounded-[20px] border border-main p-4">
      <div className="flex w-[calc(100%-73px)] items-center gap-[10px]">
        <button
          type="button"
          onClick={onRemove}
          aria-label="임시 저장 노트 알림 삭제"
          className="flex-center h-4 w-4"
        >
          <CloseCircleIcon size={16} fill="#F86969" />
        </button>
        <p className="flex flex-wrap text-button2 text-main md:text-button1">
          <span>임시 저장된 노트가 있어요.</span>
          <span>저장된 노트를 불러오시겠어요?</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onLoad}
        aria-label="임시 저장 노트 불러오기"
        className="h-[32px] w-[73px] rounded-[7px] bg-main text-button2 text-white"
      >
        불러오기
      </button>
    </div>
  );
}
