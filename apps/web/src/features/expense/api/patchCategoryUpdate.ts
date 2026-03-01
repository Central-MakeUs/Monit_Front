import { authApi, ENDPOINT } from '@/shared/api';
import type { CategoryDetailsDTO, CategoryIdResponseDTO } from '../model/types';

export const patchCategoryUpdate = async (categoryId: number, body: CategoryDetailsDTO) => {
  const endpoint = ENDPOINT.CATEGORY.CATEGORY_UPDATE.replace('{categoryId}', String(categoryId));
  return await authApi.patch<CategoryIdResponseDTO>(endpoint, body);
};
