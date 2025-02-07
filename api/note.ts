import { AxiosError } from 'axios';

import api from './authApi';

import type { NoteDataType, NoteReacponseType } from '@/types/note.type';

export const createNote = async (data: NoteDataType) => {
  try {
    const res = await api.post<NoteReacponseType>('/4/notes', data);

    return res.data;
  } catch (error) {
    // 에러처리 추가 예정
    if (error instanceof AxiosError) {
      return null;
    }
  }
};
