import React from 'react';
import Overlay from '../Overlay';
import ShareIOS from '@/public/icon/share-ios.svg';
import AddIOS from '@/public/icon/add-ios.svg';
import { useModalStore } from '@/provider/store-provider';
import CloseIcon from '@/public/icon/X.svg';

export default function IOSPWAGuideModal() {
  const setIOSPWAGuideModalOpen = useModalStore((store) => store.setIOSPWAGuideModalOpen);

  return (
    <Overlay onClick={() => setIOSPWAGuideModalOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[280px] space-y-3 rounded-xl bg-white p-6"
      >
        <header className="flex items-center justify-between">
          <h3>IOS 기기 앱 설치 안내</h3>
          <button
            type="button"
            name="modal-close-button"
            aria-label="모달 닫기"
            onClick={() => setIOSPWAGuideModalOpen(false)}
          >
            <CloseIcon width="24" height="24" />
          </button>
        </header>
        <section className="space-y-2 text-gray400">
          <p className="flex items-center">
            1.&nbsp;&nbsp;
            <span>
              <ShareIOS width="18" height="18" className="stroke-gray400" />
            </span>
            &nbsp; 공유 아이콘을 클릭하세요!
          </p>
          <p className="flex items-center">
            2.&nbsp;&nbsp;
            <span>
              <AddIOS width="14" height="14" className="stroke-gray400" />
            </span>
            &nbsp; 홈 화면에 추가하세요!
          </p>
        </section>
        <footer>
          <button
            type="button"
            onClick={() => setIOSPWAGuideModalOpen(false)}
            className="h-[40px] w-full rounded-lg bg-main text-button2 text-white"
          >
            확인
          </button>
        </footer>
      </div>
    </Overlay>
  );
}
