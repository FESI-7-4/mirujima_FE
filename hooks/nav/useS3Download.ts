import toast from 'react-hot-toast';

import { apiWithClientToken } from '@/apis/clientActions';

export default function useS3Download() {
  const fileDownload = async (fileName: string) => {
    try {
      const { signedUrl } = await getFileDownloadUrl(fileName);
      return signedUrl;
    } catch (error) {
      toast.error('이미지 다운로드 실패');
    }
  };

  const getFileDownloadUrl = async (fileName: string) => {
    const { data } = await apiWithClientToken.post(`/files/download?fileName=${fileName}`);

    return data.result;
  };

  return { fileDownload };
}
