import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import Image from 'next/image';

import { fileDownload } from '@/apis/clientActions/s3';
import { FILE_SIZE_5MB } from '@/constant/numbers';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

import PhotoAddIcon from '../../../public/icon/photo-add.svg';

export default function ProfileImage() {
  const { setIsPasswordModalOpen, setPasswordModalProps } = useModalStore((state) => state);
  const { profileImage } = useInfoStore((state) => state);

  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage) getProfileImage(profileImage);
  }, [profileImage]);

  const getProfileImage = useMemo(
    () => async (profileImage: string) => {
      const signedUrl = await fileDownload(profileImage);

      const response = await fetch(signedUrl);
      console.log('아마존 이미지 다운 링크', signedUrl, response);
      //여기서 signedUrl로 다운받은 이미지 깨짐. 제대로 저장되지 않았나?
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // 기존 Blob URL 정리 (메모리 누수 방지)
      setImageUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
    },
    [profileImage]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (selectedFile.size > FILE_SIZE_5MB) {
        toast.error('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      setPasswordModalProps(selectedFile);
      setIsPasswordModalOpen(true);
    }
  };

  const handleProfileChange = () => {
    if (fileRef.current) fileRef.current.click();
  };

  return (
    <div className="relative flex aspect-[1/1] w-[64px] items-center justify-center overflow-hidden rounded-lg">
      <input
        ref={fileRef}
        onChange={handleFileChange}
        type="file"
        accept="image/*"
        className="hidden"
      />

      <Image
        src={imageUrl || '/images/logo/mirujima-logo-tomato.png'}
        width={imageUrl ? 64 : 32}
        height={imageUrl ? 64 : 32}
        alt="profile image"
        priority={true}
      />
      <div
        onClick={handleProfileChange}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-200 hover:opacity-100"
      >
        <PhotoAddIcon />
      </div>
    </div>
  );
}
