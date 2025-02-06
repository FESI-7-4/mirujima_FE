import { getCookie } from 'cookies-next';

import api from './authApi';

import type { TodoList } from '@/types/todoTypes';

const accessToken = getCookie('accessToken');

export const getTodos = async () => {
  const response = await api.get<TodoList>('/4/todos', {
    params: { size: 40 },
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  return response.data;
};
