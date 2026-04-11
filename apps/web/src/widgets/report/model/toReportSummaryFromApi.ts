import type { WeeklyReportResponse } from '@/entities/expenseReport';
import type { ReportSummaryVM } from './types';
import { toReportSummaryVM } from './toReportSummaryVM';

/** subtitleLine 첫 줄에 들어가는 관형형 표현 ("OO 상태에서") */
const EMOTION_DESCRIPTION_TO_PHRASE: Record<string, string> = {
  '홀린 듯이': '홀린 듯한',
  '살기 위해': '살기 위한',
  그냥저냥: '그냥저냥한',
  '기분 전환': '기분 전환을 위한',
  필수템: '필수템을 위한',
};

/**
 * GET /api/expense/summary_record 응답의 weeklyReports[i] → ReportSummaryVM
 *
 * - weekRange → 카드 타이틀 (예: "2026년 4월 1주차")
 * - weekPeriod → 기간 배지
 * - weeklyTotalAmount → 총 소비 금액
 * - emotionDetails → 막대/순위 리스트의 rankItems
 * - topEmotion.emotionDescription → 서브타이틀("{관형형} 상태에서")
 */
export function toReportSummaryFromApi(weekly: WeeklyReportResponse): ReportSummaryVM {
  const topDescription = weekly.topEmotion?.emotionDescription ?? '';
  const topPhrase = EMOTION_DESCRIPTION_TO_PHRASE[topDescription] ?? topDescription;

  const rankItems = (weekly.emotionDetails ?? []).map((e) => ({
    label: e.emotionDescription ?? '',
    amount: e.totalAmount ?? 0,
    count: e.count ?? 0,
  }));

  return toReportSummaryVM({
    title: weekly.weekRange ?? '',
    periodLabel: weekly.weekPeriod ?? '',
    totalAmount: weekly.weeklyTotalAmount ?? 0,
    rankItems,
    subtitleLines: topPhrase ? [`${topPhrase} 상태에서`, '가장 많은 소비를 했어요'] : ['', ''],
  });
}
