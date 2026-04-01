import type { MonthlyReportSummaryResponse } from '@/entities/expenseReport';

// TODO: API 연동 시 제거
export const MOCK_MONTHLY_REPORT_LIST: MonthlyReportSummaryResponse[] = [
  { year: 2026, month: 3, totalAmount: 114, isChecked: false },
  { year: 2026, month: 2, totalAmount: 240000, isChecked: true },
  { year: 2026, month: 1, totalAmount: 140000, isChecked: true },
  { year: 2025, month: 12, totalAmount: 340000, isChecked: true },
  { year: 2025, month: 11, totalAmount: 4540000, isChecked: true },
];
