import { authApi, ENDPOINT } from '@/shared/api';
import type { MonthlyDetailReportResponse } from '../model/types';

/**
 * 월간 분석 상세 리포트 조회
 * @param year 조회 연도
 * @param month 조회 월
 */
export const getMonthlyDetail = async (
  year: number,
  month: number
): Promise<MonthlyDetailReportResponse> => {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`getMonthlyDetail: invalid year/month (year=${year}, month=${month})`);
  }
  const res = await authApi.get<MonthlyDetailReportResponse>(
    ENDPOINT.EXPENSE_REPORT.MONTHLY_DETAIL,
    {
      searchParams: { year, month: String(month).padStart(2, '0') },
    }
  );
  return res.result;
};
