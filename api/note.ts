import axios, { AxiosError } from 'axios';

import { ERROR_CODE } from '@/constant/errorCode';

import type { ApiResponse } from '@/types/apiResponse.type';
import type { CreateNoteType, NoteType } from '@/types/note.type';

import { withToken } from '.';

const noteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

noteApi.interceptors.request.use(withToken);

export const createNote = async (data: CreateNoteType) => {
  try {
    const res = await noteApi.post<ApiResponse<NoteType>>('/notes', data);

    return res.data.result;
  } catch (error) {
    // 에러 처리 개선 필요
    if (error instanceof AxiosError && error.response) {
      const errorMessage =
        {
          [ERROR_CODE.NOTE.NO_CONTENT]: '노트 내용이 없습니다',
          [ERROR_CODE.NOTE.UNAUTHORIZED]: '로그인이 필요합니다',
          [ERROR_CODE.NOTE.NOT_MY_TODO]: '본인의 할 일이 아닙니다',
          [ERROR_CODE.NOTE.ALREADY_EXIST]: '이미 노트가 존재합니다',
          [ERROR_CODE.NOTE.SERVER_ERROR]: '서버 오류가 발생했습니다'
        }[error.response.status] || '알 수 없는 오류가 발생했습니다';

      throw new Error(errorMessage);
    }

    throw error;
  }
};
