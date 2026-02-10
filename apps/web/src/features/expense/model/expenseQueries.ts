import { mutationOptions } from '@tanstack/react-query';
import { postExpense } from '../api/postExpense';
import type { ExpenseDetailsDTO } from './types';

export const expenseQueries = {
  all: ['expense'] as const,
  recordMutation: () =>
    mutationOptions({
      mutationFn: (body: ExpenseDetailsDTO) => postExpense(body),
    }),
};
