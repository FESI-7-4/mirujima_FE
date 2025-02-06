'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getTodos } from '@/api/getTodos';

type FilterType = 'All' | 'To do' | 'Done';

// 임시 유저 id 값
const userId = 260;

const filterOptions: FilterType[] = ['All', 'To do', 'Done'];

export default function TodoListPage() {
  const [filter, setFilter] = useState<FilterType>('All');

  const { data } = useQuery({
    queryKey: ['todos', userId, filter],
    queryFn: getTodos,
    enabled: !!userId,
    retry: 0
  });

  const filteredTodos = data?.todos.filter((todo) => {
    if (filter === 'To do') return !todo.done;
    if (filter === 'Done') return todo.done;
    return true;
  });

  return (
    <>
      <div className="flex justify-between">
        <h2>모든 할 일 ({data?.totalCount})</h2>
        <button>+ 할일 추가</button>
      </div>
      <div className="mt-4 rounded-xl bg-white p-6 text-black">
        <ul className="flex gap-2">
          {filterOptions.map((option) => {
            return (
              <li key={option}>
                <button onClick={() => setFilter(option)}>{option}</button>
              </li>
            );
          })}
        </ul>
        <div>
          <ul>
            {filteredTodos?.map((todo) => {
              return <li key={todo.id}>{todo.title}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
