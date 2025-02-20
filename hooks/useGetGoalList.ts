import { useQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';

export default function useGetGoalList() {
  const fetchGoalList = async () => {
    const { data } = await apiWithClientToken.get('/goals', {
      params: { pageSize: 9999 }
    });

    return data.result.goals.reverse();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['goalList'],
    queryFn: fetchGoalList
  });

  return { data, isLoading };
}
