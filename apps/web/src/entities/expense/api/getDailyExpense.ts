import { authApi, ENDPOINT } from '@/shared/api';
import type { DailyExpenseResponse } from '../model/types';

/**
 * 메인화면 일별 지출내역 조회
 * @description 특정 날짜의 지출 내역과 월간 총액을 조회합니다.
 */
export const getDailyExpense = async (params: { year: number; month: number; day: number }) => {
  return await authApi.get<DailyExpenseResponse>(ENDPOINT.EXPENSE.DAILY, { searchParams: params });
};
