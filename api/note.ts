import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

import { ERROR_CODE } from '@/constant/errorCode';

import type { NoteDataType, NoteResponseType } from '@/types/note.type';

const cookie = getCookie('accessToken');

const noteApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { Authorization: `Bearer ${cookie}` }
});

export const createNote = async (data: NoteDataType) => {
  try {
    const res = await noteApi.post<NoteResponseType>('/4/notes', data);

    return res.data;
  } catch (error) {
    // 수정 예정
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case ERROR_CODE.NOTE.NO_CONTENT:
          console.error('노트 내용이 없습니다');
          break;

        case ERROR_CODE.NOTE.UNAUTHORIZED:
          console.error('로그인이 필요합니다');
          break;

        case ERROR_CODE.NOTE.NOT_MY_TODO:
          console.error('본인의 할 일이 아닙니다');
          break;

        case ERROR_CODE.NOTE.ALREADY_EXIST:
          console.error('이미 노트가 존재합니다');
          break;

        case ERROR_CODE.NOTE.SERVER_ERROR:
          console.error('서버 오류 발생');
          break;

        default:
          console.error('알 수 없는 오류 발생');
          break;
      }
    }
  }

  return null;
};
