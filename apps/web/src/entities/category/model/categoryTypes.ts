import { components } from '@/shared/api/schema';

//TODO: 서버 id를 required로 변경 요청
export type CategoryListResponseDTO = components['schemas']['CategoryListResponseDTO'] & {
  id: number;
};
