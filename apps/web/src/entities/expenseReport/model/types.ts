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
