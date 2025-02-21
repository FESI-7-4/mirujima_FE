import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

export default function useInfoEdit() {
  const { email, name } = useInfoStore((state) => state);

  const putNewInfo = async ({
    password,
    profileImagePath
  }: {
    password: string;
    profileImagePath: string;
  }) => {
    const response = await apiWithClientToken.put('/user', {
      email: email,
      username: name,
      password: password, //여기에 송아님 암호화 추가 필요
      profileImagePath: profileImagePath
    });

    return response.data;
  };

  const { mutateAsync } = useMutation({
    mutationFn: putNewInfo,
    onSuccess: () => {
      console.log('onsuccess');
      toast('등록되었습니다.');
    },
    onError: (error) => {
      toast.error('변경에 실패하였습니다.');
      console.error('Error:', error);
    }
  });

  return { mutateAsync };
}
