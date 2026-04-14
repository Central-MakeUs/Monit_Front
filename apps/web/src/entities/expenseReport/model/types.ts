import { components } from '@/shared/api/schema';

export type SummaryRecordResponse = components['schemas']['SummaryRecordResponse'];
export type MonthlyReportSummaryResponse = components['schemas']['MonthlyReportSummaryResponse'];
export type WeeklyReportResponse = components['schemas']['WeeklyReportResponse'];
export type EmotionSummary = components['schemas']['EmotionSummary'];

export type MonthlyReportArrivalResponse = components['schemas']['MonthlyReportArrivalResponse'];

export type TotalOpenStatusResponse = components['schemas']['TotalOpenStatusResponse'];
export type WeeklyOpenStatus = components['schemas']['WeeklyOpenStatus'];

export type WeeklyDetailReportResponse = components['schemas']['WeeklyDetailReportResponse'];

export type WeeklyExpenseDetailResponse = components['schemas']['WeeklyExpenseDetailResponse'];
export type WeeklyExpenseEmotionType = NonNullable<
  import('@/shared/api/schema').operations['getWeeklyExpenseDetails']['parameters']['query']
>['emotionType'];

export type MonthlyDetailReportResponse = components['schemas']['MonthlyDetailReportResponse'];
export type MonthlyExpenseDetailResponse = components['schemas']['MonthlyExpenseDetailResponse'];
export type MonthlyExpenseEmotionType = NonNullable<
  import('@/shared/api/schema').operations['getMonthlyExpenseDetails']['parameters']['query']
>['emotionType'];

// 주간/월간 소비 상세 API가 허용하는 감정 타입 화이트리스트.
// 쿼리스트링 등 외부 입력을 검증할 때 사용한다.
export const EMOTION_TYPES = [
  '기분 전환',
  '그냥저냥',
  '필수템',
  '홀린 듯이',
  '살기 위해',
] as const satisfies readonly WeeklyExpenseEmotionType[];

export type ExpenseEmotionType = (typeof EMOTION_TYPES)[number];

export const isExpenseEmotionType = (value: unknown): value is ExpenseEmotionType =>
  typeof value === 'string' && (EMOTION_TYPES as readonly string[]).includes(value);
