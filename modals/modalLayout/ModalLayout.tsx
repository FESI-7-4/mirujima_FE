'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

export default function ModalLayout({ children }: PropsWithChildren) {
  const [portal, setPortal] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPortal(document.getElementById('first-modal-portal'));
  }, []);

  return portal
    ? createPortal(
        <div
          role="modal-backgound"
          className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/50"
        >
          <dialog open className="bg-white p-6">
            {children}
          </dialog>
        </div>,
        portal
      )
    : null;
}
