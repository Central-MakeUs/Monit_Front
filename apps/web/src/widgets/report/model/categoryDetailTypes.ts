import type { CategoryIconType } from '@/shared/ui/categoryBtn';
import type { SatisfactionLevel } from './reportDetailTypes';

export type CategoryDetailTransactionVM = {
  id: string;
  merchantName: string;
  categoryIcon: CategoryIconType;
  /** 카테고리 표시명 (예: 교육, 카페) */
  categoryName: string;
  amount: number;
};

export type CategoryDetailGroupVM = {
  level: SatisfactionLevel;
  /** 만족도 레이블 (예: 정말 만족했어요) */
  label: string;
  /** 섹션 표시 순위 (1부터 시작) */
  rank: number;
  transactions: CategoryDetailTransactionVM[];
  totalCount: number;
  totalAmount: number;
};

export type CategoryDetailVM = {
  /** 기간 레이블 (예: 2026년 1월 2주차) */
  periodLabel: string;
  /** 소비 성향 카테고리명 (예: 홀린 듯한 소비 상세 내역) */
  categoryName: string;
  totalCount: number;
  totalAmount: number;
  /** 만족도별 그룹 (totalAmount 내림차순 정렬) */
  groups: CategoryDetailGroupVM[];
};
