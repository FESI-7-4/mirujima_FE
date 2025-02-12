import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { readNoteListFromClient } from '@/api/clientActions/note';

import type { NoteListType } from '@/types/note.type';

const noteKey = {
  detail: ['note', 'detail'],
  list: ['note', 'list']
};

const useInfiniteNoteList = (goalId: number, initialData: NoteListType) => {
  const queryClient = useQueryClient();

  const { data, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [...noteKey.list, goalId],
    queryFn: ({ pageParam = 9999 }) => readNoteListFromClient({ goalId, lastSeenId: pageParam }),
    initialPageParam: 9999,
    initialData: { pages: [initialData], pageParams: [initialData.lastSeenId] },
    getNextPageParam: (lastPage) =>
      lastPage.lastSeenId < lastPage.totalCount ? lastPage.lastSeenId : null,
    placeholderData: (previousData) => previousData,
    select: (qData) => qData.pages.flatMap((page) => page.notes)
  });

  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return { data, isFetching, inViewRef: ref };
};

export default useInfiniteNoteList;
