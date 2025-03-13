import type { TodoType } from '@/types/todo.type';
import { useEffect, useState } from 'react';

export const useFilteredTodos = (todos: TodoType[], filter: string, priority: string | number) => {
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    const nextFilteredTodos = todos.filter((todo) => {
      if (filter === 'To do') return !todo.done;
      else if (filter === 'Done') return todo.done;
      return true;
    });
    console.log(nextFilteredTodos);
    setFilteredTodos(nextFilteredTodos);
  }, [filter]);

  useEffect(() => {
    if (priority !== 'all')
      setFilteredTodos(filteredTodos?.filter((todo) => todo.priority === priority));
    else setFilteredTodos(todos);
  }, [priority]);

  return filteredTodos;
};
