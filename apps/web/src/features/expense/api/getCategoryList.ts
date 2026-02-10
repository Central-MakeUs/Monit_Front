import { authApi, ENDPOINT } from '@/shared/api';
import type { CategoryListResponseDTO } from '../model/types';

export const getCategoryList = async () => {
  return await authApi.get<CategoryListResponseDTO[]>(ENDPOINT.CATEGORY.CATEGORY_LIST);
};
