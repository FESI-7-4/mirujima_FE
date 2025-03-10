'use client';

import React from 'react';

interface Props {
  className?: string;
}

export default function PWAButton({ className }: Props) {
  return (
    <div className={`w-full ${className ? className : ''}`}>
      <button
        type="button"
        className="h-[40px] w-full rounded-lg bg-main text-button2 text-white md:h-[50px] md:text-button2"
      >
        앱 다운로드
      </button>
    </div>
  );
}
