import { queryOptions, mutationOptions, type QueryClient } from '@tanstack/react-query';
import { getCategoryList } from '../api/getCategoryList';
import { postCategoryCreate } from '../api/postCategoryCreate';
import type { CategoryDetailsDTO } from './types';

export const categoryQueries = {
  all: ['category'] as const,
  listQuery: () =>
    queryOptions({
      queryKey: [...categoryQueries.all, 'list'],
      queryFn: () => getCategoryList(),
    }),
  createMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (data: CategoryDetailsDTO) => postCategoryCreate(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: categoryQueries.all });
      },
    }),
};
