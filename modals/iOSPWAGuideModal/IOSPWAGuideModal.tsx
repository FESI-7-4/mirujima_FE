import React from 'react';
import Overlay from '../Overlay';
import ShareIOS from '@/public/icon/share-ios.svg';
import { useModalStore } from '@/provider/store-provider';

export default function IOSPWAGuideModal() {
  const setIOSPWAGuideModalOpen = useModalStore((store) => store.setIOSPWAGuideModalOpen);

  return (
    <Overlay onClick={() => setIOSPWAGuideModalOpen(false)}>
      <div className="w-11/12 max-w-[450px] rounded-xl bg-white p-6">
        공유 아이콘 클릭, 홈화면에 추가 클릭
        <ShareIOS />
      </div>
    </Overlay>
  );
}
