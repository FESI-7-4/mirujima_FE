import { useCallback, useRef, useState } from 'react';

import { debounce } from 'lodash';

import { fileUpload } from '@/apis/clientActions/s3';
import useInfoEdit from '@/hooks/nav/useInfoEdit';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

import CloseButton from '../CloseButton';
import Overlay from '../Overlay';

export default function PasswordModal() {
  const { setIsPasswordModalOpen, passwordModalProps, setPasswordModalProps } = useModalStore(
    (state) => state
  );
  const { setInfo } = useInfoStore((state) => state);

  const { mutateAsync } = useInfoEdit();
  const [valid, setValid] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleValidCheck = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setValid(e.target.value.trim() !== '');
    }, 50),
    []
  );

  const handlePasswordSubmit = async () => {
    if (inputRef.current && passwordModalProps) {
      const password = inputRef.current.value;
      const file = passwordModalProps;

      const profileImagePath = await fileUpload(file, file.name); //1.이미지 업로드
      await mutateAsync({ password, profileImagePath }); // 2.기존 정보 수정

      setInfo({ profileImage: profileImagePath });
      setPasswordModalProps(null);
      setIsPasswordModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsPasswordModalOpen(false);
  };

  return (
    <Overlay>
      <div className="box-border flex w-[520px] flex-col rounded-xl bg-white p-6">
        <div className="flex items-center justify-between text-gray500">
          <h1 className="text-[20px]">비밀번호 입력</h1> <CloseButton handleClose={handleClose} />
        </div>
        <input
          ref={inputRef}
          onChange={handleValidCheck}
          type="password"
          className="mb-[28px] mt-[25px] box-border h-[50px] w-full rounded-lg border border-gray200 px-[16px] py-[14px]"
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          className={`${
            valid ? 'bg-main' : 'cursor-not-allowed bg-gray-400'
          } rounded px-4 py-2 font-bold text-white active:bg-pressed`}
          onClick={handlePasswordSubmit}
        >
          이미지 바꾸기
        </button>
      </div>
    </Overlay>
  );
}
