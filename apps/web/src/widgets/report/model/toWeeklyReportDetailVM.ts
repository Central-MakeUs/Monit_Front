import type { WeeklyDetailReportResponse } from '@/entities/expenseReport';
import type { components } from '@/shared/api/schema';
import {
  EVALUATION_TYPE_TO_LEVEL,
  EVALUATION_TYPE_LABEL,
  EVALUATION_TYPE_ORDER,
} from '@/shared/constants';
import type {
  ReportDetailVM,
  ReportCategoryVM,
  SatisfactionRow,
  SatisfactionLevel,
} from './reportDetailTypes';

type EmotionDetailSummary = components['schemas']['EmotionDetailSummary'];

/** API emotionDescription → 화면 표시용 카테고리명 */
const EMOTION_DESCRIPTION_TO_NAME: Record<string, string> = {
  '살기 위해': '살기 위한 소비',
  '홀린 듯이': '홀린 듯한 소비',
  필수템: '필수템 소비',
  '기분 전환': '기분 전환 소비',
  그냥저냥: '그냥저냥한 소비',
};

/** subtitleLine에 들어가는 관형형 표현 ("OO 소비에서 가장 많이 소비했고,") */
const EMOTION_DESCRIPTION_TO_PHRASE: Record<string, string> = {
  '홀린 듯이': '홀린 듯한',
  '살기 위해': '살기 위한',
  그냥저냥: '그냥저냥한',
  '기분 전환': '기분 전환을 위한',
  필수템: '필수템을 위한',
};

/** 응답에 누락된 감정 카드를 disabled로 채울 때 사용하는 전체 enum 순서 */
const ALL_EMOTION_DESCRIPTIONS = [
  '살기 위해',
  '홀린 듯이',
  '필수템',
  '기분 전환',
  '그냥저냥',
] as const;

const toCategoryName = (emotionDescription: string): string =>
  EMOTION_DESCRIPTION_TO_NAME[emotionDescription] ?? `${emotionDescription} 소비`;

const toSatisfactionRows = (
  summaries: WeeklyDetailReportResponse['evaluationSummaries']
): SatisfactionRow[] => {
  const summaryMap = new Map((summaries ?? []).map((s) => [s.evaluationType, s]));
  return EVALUATION_TYPE_ORDER.map((type) => {
    const s = summaryMap.get(type);
    return {
      level: (EVALUATION_TYPE_TO_LEVEL[type] ?? 3) as SatisfactionLevel,
      label: EVALUATION_TYPE_LABEL[type] ?? '',
      count: s?.count ?? 0,
      totalAmount: s?.totalAmount ?? 0,
    };
  });
};

/**
 * GET /api/expense/weekly_detail 응답 → ReportDetailVM
 *
 * - topEmotion → 1위 카드 (expanded, evaluationSummaries 만족도 행 포함)
 * - emotionDetails → 2위 이하 카드 (collapsed, count=0이면 disabled)
 * - weeklyTotalCount/Amount → totalBar
 * - evaluationFeedbackMessage → avgCard
 */
export function toWeeklyReportDetailVM(
  data: WeeklyDetailReportResponse,
  fallbackPeriodLabel?: string
): ReportDetailVM {
  const topDescription = data.topEmotion?.emotionDescription ?? '';

  const topCategory: ReportCategoryVM | null = topDescription
    ? {
        id: topDescription,
        rank: 1,
        name: toCategoryName(topDescription),
        state: 'expanded',
        description: data.topEmotion?.feedbackMessage ?? '',
        satisfactionRows: toSatisfactionRows(data.evaluationSummaries),
        totalCount: data.topEmotion?.count ?? 0,
        totalAmount: data.emotionTotalAmount ?? data.topEmotion?.totalAmount ?? 0,
      }
    : null;

  // emotionDetails엔 topEmotion이 중복으로 들어오므로 제외
  const restDetails = (data.emotionDetails ?? []).filter(
    (e: EmotionDetailSummary) => e.emotionDescription !== topDescription
  );

  // 응답에 없는 감정은 disabled 카드로 채워서 항상 5개가 보이도록
  const usedDescriptions = new Set<string>([
    topDescription,
    ...restDetails.map((e) => e.emotionDescription ?? ''),
  ]);
  const missingDetails: EmotionDetailSummary[] = ALL_EMOTION_DESCRIPTIONS.filter(
    (desc) => !usedDescriptions.has(desc)
  ).map((desc) => ({
    emotionDescription: desc,
    totalAmount: 0,
    count: 0,
    feedbackMessage: '',
  }));

  const restCategories: ReportCategoryVM[] = [...restDetails, ...missingDetails].map((e, idx) => {
    const desc = e.emotionDescription ?? '';
    const count = e.count ?? 0;
    return {
      id: desc || `rest-${idx}`,
      rank: idx + 2,
      name: toCategoryName(desc),
      state: count > 0 ? 'expanded' : 'disabled',
      description: e.feedbackMessage ?? '',
      satisfactionRows: toSatisfactionRows(e.evaluationSummaries),
      totalCount: count,
      totalAmount: e.totalAmount ?? 0,
    };
  });

  return {
    periodLabel: data.weekRange ?? fallbackPeriodLabel ?? '',
    subtitleLine: topDescription
      ? `${EMOTION_DESCRIPTION_TO_PHRASE[topDescription] ?? topDescription} 소비에서 가장 많이 소비했고,`
      : '',
    titleLine: data.emotionFeedbackMessage ?? '',
    categories: topCategory ? [topCategory, ...restCategories] : restCategories,
    totalCount: data.weeklyTotalCount ?? 0,
    totalAmount: data.weeklyTotalAmount ?? 0,
    avgSatisfactionComment: data.evaluationFeedbackMessage ?? '',
  };
}
