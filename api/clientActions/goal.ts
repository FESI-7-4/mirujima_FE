import type { GaolListType } from '@/types/goal.type';

import { apiWithClientToken } from '.';

export const readGoalList = async ({
  pageParam,
  pageSize
}: {
  pageParam?: number;
  pageSize?: number;
}): Promise<GaolListType> => {
  const response = await apiWithClientToken.get<{
    result: GaolListType;
  }>('/goals', {
    params: { lastSeenId: pageParam, pageSize: pageSize }
  });

  return response.data.result;
};
