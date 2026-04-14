import { authApi, ENDPOINT } from '@/shared/api';
import type { MonthlyReportArrivalResponse } from '../model/types';

/**
 * 리포트 도착 목록 조회
 * @description 사용자의 월간 분석 리포트 도착 현황을 조회합니다.
 */
export const getReportArrivals = async (): Promise<MonthlyReportArrivalResponse[]> => {
  const res = await authApi.get<MonthlyReportArrivalResponse[]>(
    ENDPOINT.EXPENSE_REPORT.REPORT_ARRIVALS
  );
  return res.result ?? [];
};
