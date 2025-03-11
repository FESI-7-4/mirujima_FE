import Image from 'next/image';
import React from 'react';

export default function HeroImages() {
  return (
    <div className="flex w-full max-w-[500px] animate-slideupfade justify-center">
      <Image
        priority
        src={'/images/landing/hero.webp'}
        width={451}
        height={492}
        alt="네비게이션 이미지"
        className="h-[295px] w-[271px] md:h-[399px] md:w-[370px] desktop:h-[492px] desktop:w-[451px]"
      />
    </div>
  );
}
