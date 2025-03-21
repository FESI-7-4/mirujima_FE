import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { SIGNUP_ERROR, SIGNUP_SUCCESS } from '@/constant/toastText';
import { useModalStore } from '@/provider/store-provider';
import { encrypt } from '@/utils/cryptoUtils';

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface EmailCheckResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    exists: boolean;
  };
}

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await authApi.get<EmailCheckResponse>(`/user/exists?email=${email}`);
    return response.data.result.exists;
  } catch (error) {
    throw new Error('이미 존재하는 이메일입니다.');
  }
};

const signUpUser = async (formData: SignUpFormData): Promise<void> => {
  try {
    // 비밀번호 암호화 적용
    const encryptedPassword = encrypt(formData.password);
    const encryptedFormData = { ...formData, password: encryptedPassword };

    await authApi.post('/user', encryptedFormData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Axios 외 다른 에러 발생');
    }
  }
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || SIGNUP_ERROR;
    toast.error(errorMessage);
  } else {
    toast.error(error instanceof Error ? error.message : '예기치 못한 오류가 발생했습니다.');
  }
};

export const useSignUpMutation = () => {
  const router = useRouter();
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      await signUpUser(formData);
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success(SIGNUP_SUCCESS, { duration: 2000 });
      setTimeout(() => {
        router.push('/login');
      }, 500);
    },
    onError: (error: unknown) => {
      setIsLoading(false);
      handleError(error);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });
};
