import toast from 'react-hot-toast';

import axios from 'axios';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore, useTodoCreateModalStore } from '@/provider/store-provider';
import { getFormattedTime } from '@/utils/dateUtils';

export default function useS3Upload() {
  const { fileName } = useTodoCreateModalStore((state) => state);
  const { goal } = useTodoCreateModalStore((state) => state);
  const { id } = useInfoStore((state) => state);

  const fileUpload = async (file: File) => {
    try {
      const [getUrlResponse, savedPath] = await getFileUploadUrl();
      const uploadUrl = getUrlResponse.signedUrl;
      const uploadRes = await setFileUpload(uploadUrl, file);

      if (uploadRes?.code === 200) {
        toast('이미지 업로드 완료');
        return savedPath;
      }
    } catch (error) {
      toast.error('이미지 업로드 실패');
    }
  };

  const getFileUploadUrl = async () => {
    const time = getFormattedTime();
    const savedPath = `${id}/${goal?.id}/${time}/${fileName}`;

    const { data } = await apiWithClientToken.post('/files/upload', { fileName: savedPath });

    console.log('getFileUploadUrl', data);

    return [data.result, savedPath];
  };

  const setFileUpload = async (uploadUrl: string, file: File) => {
    const fileFormData = new FormData();
    fileFormData.append('file', new Blob([JSON.stringify(file)], { type: 'application/json' }));

    const { data } = await axios.post(uploadUrl, fileFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('setFileUpload', data);

    return data.result;
  };

  return { fileUpload };
}
