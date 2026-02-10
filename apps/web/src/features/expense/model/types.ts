import { components } from '@/shared/api/schema';

export type ExpenseDetailsDTO = components['schemas']['ExpenseDetailsDTO'];
export type IdResponse = components['schemas']['IdResponse'];
export type EmotionType = ExpenseDetailsDTO['emotionType'];

// Category
export type CategoryListResponseDTO = components['schemas']['CategoryListResponseDTO'] & {
  id: number;
};
export type CategoryDetailsDTO = components['schemas']['CategoryDetailsDTO'];
export type CategoryIdResponseDTO = components['schemas']['CategoryIdResponseDTO'];
