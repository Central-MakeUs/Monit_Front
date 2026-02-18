import { authApi, ENDPOINT } from '@/shared/api';
import type { CategoryListResponseDTO } from '../model/types';

/**
 * 카테고리 조회
 * @description 지출을 쓰기 전에 사용자가 선택할 카테고리 리스트(기본 7종 + 커스텀)를 서버에서 내려줍니다.
 */
export const getCategoryList = async () => {
  return await authApi.get<CategoryListResponseDTO[]>(ENDPOINT.CATEGORY.CATEGORY_LIST);
};
