import api from './authApi';

import type { TodoList } from '@/types/todoTypes';

const token = '';

export const getTodos = async () => {
  const response = await api.get<TodoList>('/4/todos', {
    params: { size: 40 },
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};
