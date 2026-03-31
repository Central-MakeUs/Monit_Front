import type { MonthlyReportSummaryResponse } from '@/entities/expenseReport';

// TODO: API 연동 시 제거
export const MOCK_MONTHLY_REPORT_LIST: MonthlyReportSummaryResponse[] = [
  { month: '2026-02', totalAmount: 240000, isOpened: true },
  { month: '2026-01', totalAmount: 140000, isOpened: true },
  { month: '2025-12', totalAmount: 340000, isOpened: true },
  { month: '2025-11', totalAmount: 4540000, isOpened: true },
];
