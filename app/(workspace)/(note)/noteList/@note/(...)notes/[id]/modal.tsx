'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/navigation';

import BackIcon from '@/public/icon/arrow-left-black.svg';

export default function NoteLayoutModal({ children }: { children: React.ReactNode }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  React.useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-end bg-black/50">
      <div className="w-full bg-white px-6 md:w-2/3 lg:w-3/5">
        <div className="py-6">
          <button onClick={onDismiss} className="flex-center h-6 w-6" aria-label="뒤로가기">
            <BackIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-portal')!
  );
}
