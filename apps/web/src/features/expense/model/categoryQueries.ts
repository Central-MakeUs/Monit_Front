import { queryOptions, mutationOptions, type QueryClient } from '@tanstack/react-query';
import { getCategoryList } from '../api/getCategoryList';
import { postCategoryCreate } from '../api/postCategoryCreate';
import { patchCategoryUpdate } from '../api/patchCategoryUpdate';
import type { CategoryDetailsDTO } from './types';
import { expenseQueries } from '@/entities/expense/model/queries';

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
  updateMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: ({ categoryId, data }: { categoryId: number; data: CategoryDetailsDTO }) =>
        patchCategoryUpdate(categoryId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: categoryQueries.all });
        queryClient.invalidateQueries({ queryKey: expenseQueries.all });
      },
    }),
};
