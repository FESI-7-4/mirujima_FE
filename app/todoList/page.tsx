'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getTodos } from '@/api/getTodos';

import EmptyMessage from './_components/EmptyMessage';
import TodoFilter from './_components/TodoFilter';

import type { FilterType } from './_components/TodoFilter';

// 임시 유저 id 값
const userId = 260;

export default function TodoListPage() {
  const [filter, setFilter] = useState<FilterType>('All');

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['todos', userId, filter],
    queryFn: getTodos,
    enabled: !!userId,
    retry: 0,
    placeholderData: (previousData) => previousData
  });

  const filteredTodos = data?.todos.filter((todo) => {
    if (filter === 'To do') return !todo.done;
    if (filter === 'Done') return todo.done;
    return true;
  });

  return (
    <>
      <div className="flex justify-between">
        <h2>모든 할 일 ({data?.totalCount || 0})</h2>
        <button>+ 할일 추가</button>
      </div>
      <div className="mt-4 rounded-xl bg-white p-6 text-black">
        <TodoFilter filter={filter} setFilter={setFilter} />
        {!isLoading && <EmptyMessage filter={filter} filteredTodos={filteredTodos || []} />}
        <div>
          {!isLoading || !isFetching ? (
            <ul>
              {filteredTodos?.map((todo) => {
                return <li key={todo.id}>{todo.title}</li>;
              })}
            </ul>
          ) : (
            <p>로딩중</p>
          )}
        </div>
      </div>
    </>
  );
}
