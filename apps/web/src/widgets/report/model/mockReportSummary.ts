import type { ReportSummaryVM } from './types';
import { toReportSummaryVM } from './toReportSummaryVM';

// TODO: API 연동 시 제거
export const MOCK_REPORT_SUMMARY: ReportSummaryVM = toReportSummaryVM({
  title: '이번 달 소비 리포트',
  periodLabel: '26.01.05 ~ 01.11',
  totalAmount: 487000,
  rankItems: [
    { label: '홀린 듯이', amount: 10000, count: 10 },
    { label: '살기위해', amount: 142000, count: 8 },
    { label: '그냥저냥', amount: 98000, count: 30 },
    { label: '필수템', amount: 62000, count: 12 },
  ],
  subtitleLines: ['홀린 듯한 상태에서', '가장 많은 소비를 했어요'],
});
