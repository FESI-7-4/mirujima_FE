'use client';

import usePWA from '@/hooks/pwa/usePWA';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
}

export default function PWAButton({ className }: Props) {
  const { isInstallable, isIOS, handleInstall } = usePWA();
  const [showIOSModal, setShowIOSModal] = React.useState(false);
  console.log(showIOSModal);

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
    } else {
      await handleInstall();
    }
  };

  return (
    <div className={`w-full ${className ? className : ''}`}>
      {isInstallable ? (
        <button
          type="button"
          onClick={handleClick}
          className="h-[40px] w-full rounded-lg bg-main text-button2 text-white md:h-[50px] md:text-button2"
        >
          앱 다운로드
        </button>
      ) : (
        <Link
          href={'/login'}
          className="flex-center inline-block h-[40px] w-full rounded-lg bg-main text-button2 text-white md:h-[50px] md:text-button2"
        >
          그냥 사용하기
        </Link>
      )}
    </div>
  );
}
