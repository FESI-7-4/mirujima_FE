'use client';

import React from 'react';

import Link from 'next/link';

import { useModalStore } from '@/provider/store-provider';
import CloseCircleIcon from '@/public/icon/X-circle.svg';

const mockYoutube = 'https://www.youtube.com/embed/j2LZmDCCpKY';
const mockBlog =
  'https://velog.io/@bbbjihan/Next.js-%EC%BA%90%EC%8B%B1-%EB%95%8C%EB%AC%B8%EC%97%90-Axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0%EB%A5%BC-%ED%8F%AC%EA%B8%B0%ED%95%98%EB%9D%BC%EA%B3%A0-Axios-adapter-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-Next.js-caching-%EC%A7%80%EC%9B%90-%EB%B0%9B%EA%B8%B0';

interface Props {
  linkUrl: string | undefined;
  isReadOnlyPage?: boolean;
}

export default function EmbedContent({ linkUrl, isReadOnlyPage }: Props) {
  const isOpen = useModalStore((state) => state.isEmbedContentOpen);
  const setEmbedContentOpen = useModalStore((state) => state.setEmbedContentOpen);

  const position = isReadOnlyPage
    ? 'absolute left-0 top-0 h-full'
    : 'h-[385px] bg-white desktop:bg-gray100 mb-6 desktop:h-[700px]';

  React.useEffect(() => {
    return () => setEmbedContentOpen(false);
  }, []);

  if (isOpen) {
    return (
      <div
        className={`${position} z-[1] flex w-full min-w-[320px] flex-col bg-solid lg:w-5/12 desktop:static`}
      >
        <div
          className={`flex w-full items-center justify-end px-3 lg:justify-start ${isReadOnlyPage ? 'py-6' : 'pb-6 desktop:py-6'}`}
        >
          <button
            type="button"
            onClick={() => setEmbedContentOpen(false)}
            aria-label="임베드 콘텐츠 닫기"
            name="임베드 콘텐츠 닫기 버튼"
          >
            <CloseCircleIcon width="24" height="24" className="hover-animate fill-main" />
          </button>
        </div>
        <iframe src={mockBlog} className="h-3/4 w-full" />
        <div className="flex w-full justify-center pt-3">
          <Link
            href={linkUrl || ''}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="임베드 링크 열기"
            className="hover:underline"
          >
            링크 열기
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
