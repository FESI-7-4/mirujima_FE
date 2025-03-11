'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { z } from 'zod';

import { EMAIL_ERROR, SIGHNUP_ERROR } from '@/constant/toastText';
import { checkEmailExists, useSignUpMutation } from '@/hooks/auth/useSignUpMutation';

import Button from '../_components/Button';
import InputField from '../_components/InputField';
import { encrypt } from '@/utils/cryptoUtils';

const registerSchema = z
  .object({
    username: z.string().min(1, '이름을 입력해주세요.').max(10, '이름이 너무 깁니다.'),
    email: z.string().email('올바른 이메일을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.'
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const { mutate: signUpMutate } = useSignUpMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const emailExists = await checkEmailExists(data.email);
      if (emailExists) {
        setError('email', { message: '이미 존재하는 이메일입니다.' });
        return;
      }

      // 비밀번호 암호화 적용
      const encryptedPassword = encrypt(data.password);

      if (!encryptedPassword) {
        console.error('비밀번호 암호화에 실패했습니다.');
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...dataWithoutConfirmPassword } = data;

      signUpMutate(
        { ...dataWithoutConfirmPassword, password: encryptedPassword },
        {
          onError: () => {
            toast.error(SIGHNUP_ERROR);
          }
        }
      );
    } catch (error) {
      console.error('회원가입 에러:', error);
      toast.error(EMAIL_ERROR);
    }
  };

  return (
    <>
      <h1 className="mb-[60px] text-[26px] font-semibold leading-[28px] text-gray500 md:text-[34px] md:leading-[41px]">
        회원가입
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputField
          label="이름"
          placeholder="이름"
          register={register('username')}
          type="text"
          errorMessage={errors.username?.message}
          className="bg-white autofill:bg-white"
          triggerValidation={() => trigger('username')}
        />
        <InputField
          label="이메일"
          placeholder="이메일"
          register={register('email')}
          type="email"
          errorMessage={errors.email?.message}
          className="!bg-white autofill:!bg-white"
          triggerValidation={() => trigger('email')}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호"
          register={register('password')}
          type="password"
          errorMessage={errors.password?.message}
          className="!bg-white autofill:!bg-white"
          triggerValidation={() => trigger('password')}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해주세요"
          register={register('confirmPassword')}
          type="password"
          errorMessage={errors.confirmPassword?.message}
          className="!bg-white autofill:!bg-white"
          triggerValidation={() => trigger('confirmPassword')}
        />

        <Button type="submit" className="mt-[60px] bg-main text-white">
          회원가입
        </Button>
      </form>
      <div className="mt-[60px] flex items-center justify-between px-2">
        <p className="text-[12px] font-medium leading-[16px] text-gray350 md:text-[14px] md:leading-[20px]">
          이미 계정이 있으신가요?{' '}
        </p>
        <Link
          href="/login"
          className="text-[12px] font-medium leading-[16px] text-main md:text-[14px] md:leading-[20px]"
        >
          로그인하기
        </Link>
      </div>
    </>
  );
}
