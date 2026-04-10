import type { WeeklyExpenseDetailResponse } from '@/entities/expenseReport';
import type { CategoryIconType } from '@/shared/ui/categoryBtn';
import type { SatisfactionLevel } from './reportDetailTypes';
import type { CategoryDetailVM, CategoryDetailGroupVM } from './categoryDetailTypes';

/** API 원본 감정 표현 → 화면 표시용 관형형 */
const EMOTION_TO_DISPLAY: Record<string, string> = {
  '홀린 듯이': '홀린 듯한',
  '살기 위해': '살기 위한',
  그냥저냥: '그냥저냥한',
  '기분 전환': '기분 전환을 위한',
  필수템: '필수템을 위한',
};

/** "홀린 듯이 소비 상세 내역" → "홀린 듯한 소비 상세 내역" */
const convertEmotionTitle = (title: string): string => {
  for (const [from, to] of Object.entries(EMOTION_TO_DISPLAY)) {
    if (title.includes(from)) return title.replace(from, to);
  }
  return title;
};

const STEP_TO_LEVEL: Record<number, SatisfactionLevel> = {
  1: 5,
  2: 4,
  3: 3,
  4: 2,
  5: 1,
};

/**
 * @param data API 응답
 * @param categoryIconMap 카테고리 이름 → 아이콘 매핑 (카테고리 목록 API에서 조회)
 */
export function toCategoryDetailVM(
  data: WeeklyExpenseDetailResponse,
  categoryIconMap?: Map<string, string>
): CategoryDetailVM {
  const groups: CategoryDetailGroupVM[] = (data.evaluationGroups ?? []).map((g) => ({
    level: (STEP_TO_LEVEL[g.stepNumber ?? 1] ?? 3) as SatisfactionLevel,
    label: g.evaluationTitle ?? '',
    rank: g.stepNumber ?? 1,
    totalCount: g.groupCount ?? 0,
    totalAmount: g.groupTotalAmount ?? 0,
    transactions: (g.expenses ?? []).map((e, idx) => ({
      id: `${g.stepNumber}-${idx}`,
      merchantName: e.usageHistory ?? '',
      categoryIcon: (categoryIconMap?.get(e.categoryName ?? '') ?? 'shopping') as CategoryIconType,
      categoryName: e.categoryName ?? '',
      amount: e.amount ?? 0,
    })),
  }));

  return {
    periodLabel: data.weekRange ?? '',
    categoryName: convertEmotionTitle(data.emotionTitle ?? ''),
    totalCount: data.totalCount ?? 0,
    totalAmount: data.totalAmount ?? 0,
    groups,
  };
}
