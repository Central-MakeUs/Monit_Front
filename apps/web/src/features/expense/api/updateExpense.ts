import { authApi, ENDPOINT } from '@/shared/api';
import type { UpdateExpenseRequest, UpdateExpenseResponse } from '../model/types';

/**
 * 지출 기록 수정
 * @description 유저가 작성한 지출 기록을 수정합니다.
 */
export const updateExpense = async (expenseId: number, data: UpdateExpenseRequest) => {
  const endpoint = ENDPOINT.EXPENSE.UPDATE_RECORD.replace('{expenseId}', String(expenseId));
  return await authApi.patch<UpdateExpenseResponse>(endpoint, data);
};
