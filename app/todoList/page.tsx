'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import { readTodoList } from '@/api/todo';
import PlusIcon from '@/public/images/icons/plus-icon.svg';
import TodoListIcon from '@/public/images/icons/todo-list-icon.svg';

import EmptyMessage from './_components/EmptyMessage';
import TodoFilter from './_components/TodoFilter';
import TodoItem from './_components/TodoItem';

import type { FilterType } from './_components/TodoFilter';
import type { QueryClient } from '@tanstack/react-query';

// 쿠키에 저장된 유저 id 값 가져옴
// 인증 방식에 맞춰 수정 필요함
const userId = getCookie('userId');

export default function TodoListPage() {
  const queryClient: QueryClient = useQueryClient();

  const [filter, setFilter] = useState<FilterType>('All');

  const { ref, inView } = useInView();

  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ['todos', userId, filter],
    queryFn: ({ pageParam = null }) => readTodoList({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
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
      else return todo;
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="h2 flex items-center gap-2">
          <TodoListIcon />
          모든 할 일 ({totalCount})
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
    </>
  );
}
