'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { readTodoList } from '@/api/todo';
import PlusIcon from '@/public/icon/plus-border-none.svg';
import TodoListIcon from '@/public/icon/todo-list-black.svg';
import { useInfoStore } from '@/stores/infoStore';

import EmptyMessage from './_components/EmptyMessage';
import TodoFilter from './_components/TodoFilter';
import TodoItem from './_components/TodoItem';

import type { FilterType } from './_components/TodoFilter';
import type { QueryClient } from '@tanstack/react-query';

export default function TodoListPage() {
  const queryClient: QueryClient = useQueryClient();
  const { id: userId } = useInfoStore();
  const [filter, setFilter] = useState<FilterType>('All');

  const { ref, inView } = useInView();

  const { data, isLoading, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['todos', userId, filter],
    queryFn: ({ pageParam = 9999 }) => readTodoList({ pageParam, filter }),
    initialPageParam: 9999,
    getNextPageParam: (lastPage) => (lastPage.todos.length > 0 ? lastPage.lastSeenId : null),
    enabled: !!userId,
    retry: 0,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false
  });

  const filteredTodos = data?.pages
    .flatMap((page) => page.todos)
    .filter((todo) => {
      if (filter === 'To do') return !todo.done;
      else if (filter === 'Done') return todo.done;
      else return true;
    });

  useEffect(() => {
    if (filter) {
      queryClient.invalidateQueries({ queryKey: ['todos', filter] });
      refetch();
    }
  }, [filter, queryClient, refetch]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <section className="pt-[94px]">
      <div className="flex justify-between">
        <h2 className="h2 flex items-center gap-2">
          <TodoListIcon />
          모든 할 일
        </h2>
        {/* TODO: 할 일 추가 모달 생성 */}
        <button
          onClick={() => alert('할 일 추가 모달')}
          className="flex items-center text-[#F86969]"
        >
          <PlusIcon /> 할일 추가
        </button>
      </div>
      <div className="border=[#F2EFEF] mt-6 rounded-xl border bg-white p-6 text-black">
        <TodoFilter filter={filter} setFilter={setFilter} />
        {!isLoading && <EmptyMessage filter={filter} filteredTodos={filteredTodos || []} />}
        <div>
          {!isLoading || !isFetching ? (
            <ul>
              {filteredTodos?.map((todo) => {
                return <TodoItem key={todo.id} todo={todo} queryClient={queryClient} />;
              })}
            </ul>
          ) : (
            <p>로딩중</p>
          )}

          <div ref={ref} />
        </div>
      </div>
    </section>
  );
}
