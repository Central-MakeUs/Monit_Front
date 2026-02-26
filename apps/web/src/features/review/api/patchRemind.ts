import { authApi, ENDPOINT } from '@/shared/api';
import type { EvaluationType } from '@/shared/types/evaluation.types';

export interface RemindItem {
  expenseId: number;
  evaluationType: EvaluationType;
}

export const patchRemind = async (body: RemindItem[]) => {
  return await authApi.patch(ENDPOINT.EXPENSE.REMIND, body);
};
