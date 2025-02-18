'use client';

import React from 'react';
import { createPortal } from 'react-dom';

import { useRouter } from 'next/navigation';

export default function NoteLayoutModal({ children }: { children: React.ReactNode }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };
  console.log('sss');
  React.useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <dialog ref={dialogRef} onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} />
      </dialog>
    </div>,
    document.getElementById('modal-portal')!
  );
}
