import { authApi, ENDPOINT } from '@/shared/api';
import type { WeeklyDetailReportResponse } from '../model/types';

/**
 * 주간 분석 상세 리포트 조회
 * @param year 조회 연도
 * @param month 조회 월
 */
export const getWeeklyDetail = async (
  year: number,
  month: number
): Promise<WeeklyDetailReportResponse[]> => {
  const res = await authApi.get<WeeklyDetailReportResponse[]>(
    ENDPOINT.EXPENSE_REPORT.WEEKLY_DETAIL,
    {
      searchParams: { year, month: String(month).padStart(2, '0') },
    }
  );
  return res.result;
};
