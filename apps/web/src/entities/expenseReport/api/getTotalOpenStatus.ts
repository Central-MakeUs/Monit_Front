import { authApi, ENDPOINT } from '@/shared/api';
import type { TotalOpenStatusResponse } from '../model/types';

/**
 * 월 + 주차별 open 상태 통합 조회
 * @description 특정 월의 총 지출액, 주차별/월간 리포트 오픈 여부를 조회합니다.
 */
export const getTotalOpenStatus = async (
  year: number,
  month: number
): Promise<TotalOpenStatusResponse | undefined> => {
  const res = await authApi.get<TotalOpenStatusResponse>(
    ENDPOINT.EXPENSE_REPORT.TOTAL_OPEN_STATUS,
    {
      searchParams: { year, month },
    }
  );
  return res.result;
};
