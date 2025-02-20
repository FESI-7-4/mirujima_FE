'use client';

import React from 'react';

import { CloseCircleIcon } from '@/components/icons';
import useTempNoteModal from '@/hooks/note/useTempNoteModal';

import LoadTempNoteConfirmModal from '../../modals/lodaTempNoteConfirmModal/LoadTempNoteConfirmModal';

import type { TempNoteType } from '@/types/note.type';

interface Props {
  tempedNote: TempNoteType | undefined;
  onRemove: () => void;
  onLoad: () => void;
}

export default function TempNote({ tempedNote, onRemove, onLoad }: Props) {
  const { isConfirmTempModalOpen, handleConfirmModal } = useTempNoteModal();

  return (
    <>
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
          onClick={() => handleConfirmModal(true)}
          aria-label="임시 저장 노트 불러오기"
          className="h-[32px] w-[73px] rounded-[7px] bg-main text-button2 text-white"
        >
          불러오기
        </button>
      </div>
      {isConfirmTempModalOpen && (
        <LoadTempNoteConfirmModal
          tempNoteTitle={tempedNote?.noteTitle}
          onCancle={() => handleConfirmModal(false)}
          onConfirm={() => {
            handleConfirmModal(false);
            onLoad();
          }}
        />
      )}
    </>
  );
}
