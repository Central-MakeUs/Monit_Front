import { authApi, ENDPOINT } from '@/shared/api';
import type { WeeklyExpenseDetailResponse, WeeklyExpenseEmotionType } from '../model/types';

export interface GetWeeklyExpenseDetailsParams {
  /** 조회 시작일 (YYYY-MM-DD) */
  start: string;
  /** 조회 종료일 (YYYY-MM-DD) */
  end: string;
  /** 회고 마음 항목 */
  emotionType: WeeklyExpenseEmotionType;
}

/**
 * 주간 리포트 - 회고별 소비 내역 상세 조회
 * GET /api/weekly-reports/details
 */
export const getWeeklyExpenseDetails = async ({
  start,
  end,
  emotionType,
}: GetWeeklyExpenseDetailsParams): Promise<WeeklyExpenseDetailResponse> => {
  const res = await authApi.get<WeeklyExpenseDetailResponse>(
    ENDPOINT.EXPENSE_REPORT.WEEKLY_EXPENSE_DETAILS,
    {
      searchParams: { start, end, emotionType },
    }
  );
  return res.result;
};
