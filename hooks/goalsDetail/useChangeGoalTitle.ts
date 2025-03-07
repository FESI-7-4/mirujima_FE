import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

import type { GoalType, ISODateString } from '@/types/goal.type';
import type { ApiResponse } from '@/types/apiResponse.type';

interface UpdateGoalVariables {
  goalId: GoalType['id'];
  title: GoalType['title'];
  completionDate?: ISODateString;
}

type UpdateGoalResponse = ApiResponse<GoalType>;

const changeGoalTitle = async ({
  goalId,
  title,
  completionDate
}: UpdateGoalVariables): Promise<UpdateGoalResponse> => {
  const { data } = await apiWithClientToken.patch<UpdateGoalResponse>(`/goals/${goalId}`, {
    title,
    completionDate
  });
  return data;
};

export function useUpdateGoalTitle() {
  const userId = useInfoStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateGoalVariables) => changeGoalTitle(variables),
    onMutate: async ({ goalId, title }) => {
      const queryKey = ['goal', goalId, userId];
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        result: {
          ...old?.result,
          title: title
        }
      }));

      return { previousData };
    },
    onError: (error, { goalId }, context) => {
      queryClient.setQueryData(['goal', goalId, userId], context?.previousData);
      console.error('목표 수정 실패', error);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['goals', userId] });
      queryClient.invalidateQueries({
        queryKey: ['goals', userId]
      });
    },
    onSettled: (_, __, { goalId }) => {
      queryClient.invalidateQueries({
        queryKey: ['goal', goalId, userId],
        refetchType: 'all'
      });
    }
  });
}
