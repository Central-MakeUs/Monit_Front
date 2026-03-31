import { authApi, ENDPOINT } from '@/shared/api';
import type { MonthlyReportSummaryResponse } from '../model/types';

/**
 * 월별 리포트 목록 조회
 * @description 사용자의 전체 월별 소비 리포트 목록을 조회합니다.
 */
export const getMonthlyReportList = async (): Promise<MonthlyReportSummaryResponse[]> => {
  const res = await authApi.get<MonthlyReportSummaryResponse[]>(
    ENDPOINT.EXPENSE_REPORT.MONTHLY_TOTALS
  );
  return res.result ?? [];
};
