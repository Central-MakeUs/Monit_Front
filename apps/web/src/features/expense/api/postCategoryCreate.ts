import { authApi, ENDPOINT } from '@/shared/api';
import type { CategoryDetailsDTO, CategoryIdResponseDTO } from '../model/types';

export const postCategoryCreate = async (body: CategoryDetailsDTO) => {
  return await authApi.post<CategoryIdResponseDTO>(ENDPOINT.CATEGORY.CATEGORY_CREATE, body);
};
