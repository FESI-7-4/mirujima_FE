'use client';

import React from 'react';

import ModalLayout from '@/modals/modalLayout/ModalLayout';

interface Props {
  tempNoteTitle: string | undefined;
  onCancle: () => void;
  onConfirm: () => void;
}

export default function LoadTempNoteConfirmModal({ tempNoteTitle, onCancle, onConfirm }: Props) {
  return (
    <ModalLayout>
      <div className="space-y-4 text-center">
        <p className="text-head3 text-gray900">작성중인 글이 있습니다.</p>
        <div>
          <p className="text-body1 text-[#636267]">`{tempNoteTitle}`</p>
          <p className="text-body1 text-[#636267]">제목의 노트를 불러오시겠어요?</p>
        </div>
      </div>
      <div className="mt-6 flex w-full gap-2">
        <button
          type="button"
          onClick={onCancle}
          aria-label="임시 저장 노트 불러오기 취소"
          className="h-[40px] w-full rounded-lg border border-main text-button2 text-main md:h-[43px] md:text-button1"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          aria-label="임시 저장 노트 불러오기"
          className="h-[40px] w-full rounded-lg bg-main text-button2 text-white md:h-[43px] md:text-button1"
        >
          확인
        </button>
      </div>
    </ModalLayout>
  );
}
