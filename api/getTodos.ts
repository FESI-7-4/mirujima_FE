import { getCookie } from 'cookies-next';

import api from './authApi';

import type { TodoList } from '@/types/todoTypes';

const accessToken = getCookie('accessToken');

export const getTodos = async ({ pageParam = null }) => {
  const response = await api.get<TodoList>('/4/todos', {
    params: { cursor: pageParam, size: 40 },
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  console.log('resposne', response.data);
  return response.data;
};
