import { EmotionType } from '@/features/expense/model/types';

// Step 1: 아무것도 입력 안됨
export type AmountDateStepType = {
  amount?: number;
  expendedAt?: string;
  categoryId?: number;
  usageHistory?: string;
  emotionType?: EmotionType;
};

// Step 2: 금액 + 날짜
export type UsageCategoryStepType = {
  amount: number;
  expendedAt: string;
  categoryId?: number;
  usageHistory?: string;
  emotionType?: EmotionType;
};
// Step 3: 사용처 + 카테고리
export type SatisfactionStepType = {
  amount: number;
  expendedAt: string;
  categoryId: number;
  usageHistory: string;
  emotionType?: EmotionType;
};

// Step 4: 제출하기
export type SubmitStepType = {
  amount: number;
  expendedAt: string;
  categoryId: number;
  usageHistory: string;
  emotionType: EmotionType;
};
