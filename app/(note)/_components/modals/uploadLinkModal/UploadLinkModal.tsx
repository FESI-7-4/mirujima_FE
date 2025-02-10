'use client';

import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import ModalLayout from '@/modals/modalLayout/ModalLayout';

import type { NoteInputData } from '@/schema/noteSchema';

interface Props {
  register: UseFormRegister<NoteInputData>;
  onSubmit: () => void;
  onClose: () => void;
}

function UploadLinkModal({ register, onSubmit, onClose }: Props) {
  return (
    <ModalLayout title="링크 업로드" onClose={onClose}>
      <div className="mb-[40px] mt-6 space-y-[12px]">
        <p className="font-semibold text-slate-800">링크</p>
        <input
          {...register('linkUrl')}
          placeholder="링크를 입력해주세요"
          className="w-full rounded-lg border border-[#F2EFEF] px-4 py-[10px] outline-none"
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="h-[50px] w-full rounded-lg bg-main px-4 py-3 font-semibold text-white"
      >
        확인
      </button>
    </ModalLayout>
  );
}

export default UploadLinkModal;
