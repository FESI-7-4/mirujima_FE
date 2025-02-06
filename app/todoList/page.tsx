'use client';

import { useQuery } from '@tanstack/react-query';

import { getTodos } from '@/api/getTodos';

// 임시 유저 id 값
const userId = 260;

export default function TodoListPage() {
  const { data } = useQuery({
    queryKey: ['todos', userId],
    queryFn: getTodos,
    enabled: !!userId,
    retry: 0
  });

  return (
    <>
      <div className="flex justify-between">
        <h2>모든 할 일 ({data?.totalCount})</h2>
        <button>+ 할일 추가</button>
      </div>
    </>
  );
}
