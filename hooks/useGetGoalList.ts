import { useQuery } from '@tanstack/react-query';

import { apiWithClientToken } from '@/apis/clientActions';
import { useInfoStore } from '@/provider/store-provider';

export default function useGetGoalList() {
  const { id } = useInfoStore((state) => state);

  const fetchGoalList = async () => {
    const { data } = await apiWithClientToken.get('/goals', {
      params: { pageSize: 9999 }
    });

    return data.result.goals.reverse();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['goalList', id],
    queryFn: fetchGoalList
  });

  return { data, isLoading };
}
