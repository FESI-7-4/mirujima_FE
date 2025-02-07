import axios, { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

import type { NoteDataType, NoteResponseType } from '@/types/note.type';

// goal:1788, todo:3624, note:445, user:270

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
    // 에러처리 추가 예정
    if (error instanceof AxiosError) {
      return null;
    }
  }
};
