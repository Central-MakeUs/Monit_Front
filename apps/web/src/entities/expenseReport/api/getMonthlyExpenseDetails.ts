import { authApi, ENDPOINT } from '@/shared/api';
import type { MonthlyExpenseDetailResponse, MonthlyExpenseEmotionType } from '../model/types';

export interface GetMonthlyExpenseDetailsParams {
  /** 조회 연도 */
  year: number;
  /** 조회 월 */
  month: number;
  /** 회고 마음 항목 */
  emotionType: MonthlyExpenseEmotionType;
}

/**
 * 월간 리포트 - 회고별 소비 내역 상세 조회
 * GET /api/monthly-reports/details
 */
export const getMonthlyExpenseDetails = async ({
  year,
  month,
  emotionType,
}: GetMonthlyExpenseDetailsParams): Promise<MonthlyExpenseDetailResponse> => {
  const res = await authApi.get<MonthlyExpenseDetailResponse>(
    ENDPOINT.EXPENSE_REPORT.MONTHLY_EXPENSE_DETAILS,
    {
      searchParams: { year, month: String(month).padStart(2, '0'), emotionType },
    }
  );
  return res.result;
};
