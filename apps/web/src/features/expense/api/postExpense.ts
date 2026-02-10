import { authApi, ENDPOINT } from '@/shared/api';
import { ExpenseDetailsDTO, IdResponse } from '../model/types';

/**
 * 지출 기록 작성
 * @description 유저가 하루일과동안 쓴 지출목록을 작성합니다.
 */
export const postExpense = async (body: ExpenseDetailsDTO) => {
  return await authApi.post<IdResponse>(ENDPOINT.EXPENSE.RECORD, body);
};
