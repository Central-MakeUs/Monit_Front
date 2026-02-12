import { authApi, ENDPOINT } from '@/shared/api';
import type { IdResponse } from '../model/types';

/**
 * 지출 기록 삭제
 * @description 조회된 리스트의 expenseId를 사용하여 기록을 삭제합니다.
 */
export const deleteExpense = async (expenseId: number) => {
  const endpoint = ENDPOINT.EXPENSE.DELETE_RECORD.replace('{expenseId}', String(expenseId));
  return await authApi.delete<IdResponse>(endpoint);
};
