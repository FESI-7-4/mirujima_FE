'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@/components/icons';
import useModalPortal from '@/hooks/note/useModalPortal';
import { useModalStore } from '@/provider/store-provider';

interface Props {
  defaultValue: string | undefined;
  onSubmit: () => void;
  linkInputRef: React.RefObject<HTMLInputElement | null>;
}

function UploadLinkModal({ defaultValue, onSubmit, linkInputRef }: Props) {
  const { portal } = useModalPortal();
  const setNoteLinkModalOpen = useModalStore((store) => store.setNoteLinkModalOpen);

  return portal
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
        >
          <dialog open className="w-11/12 max-w-[450px] rounded-xl bg-white p-6">
            <div className="flex justify-between">
              <p className="text-lg font-bold leading-7 text-gray500">링크 업로드</p>
              <button
                type="button"
                name="modal-close-button"
                aria-label="모달 닫기"
                onClick={() => setNoteLinkModalOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mb-[26px] mt-6">
              <input
                ref={(node) => {
                  linkInputRef.current = node;
                  node?.focus();
                }}
                defaultValue={defaultValue}
                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                aria-label="링크 URL 입력"
                placeholder="링크를 첨부해주세요"
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
          </dialog>
        </div>,
        portal
      )
    : null;
}

export default UploadLinkModal;
