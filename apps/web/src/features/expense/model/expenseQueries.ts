import { mutationOptions, type QueryClient } from '@tanstack/react-query';
import { postExpense } from '../api/postExpense';
import { updateExpense } from '../api/updateExpense';
import { deleteExpense } from '../api/deleteExpense';
import type { ExpenseDetailsDTO, UpdateExpenseRequest } from './types';
import { expenseQueries as entityExpenseQueries } from '@/entities/expense';
import { expenseReportQueries } from '@/entities/expenseReport';

const invalidateExpenseCaches = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: entityExpenseQueries.all });
  queryClient.invalidateQueries({ queryKey: expenseReportQueries.all });
};

export const expenseQueries = {
  recordMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (body: ExpenseDetailsDTO) => postExpense(body),
      onSuccess: () => invalidateExpenseCaches(queryClient),
    }),
  updateMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: ({ expenseId, data }: { expenseId: number; data: UpdateExpenseRequest }) =>
        updateExpense(expenseId, data),
      onSuccess: () => invalidateExpenseCaches(queryClient),
    }),
  deleteMutation: (queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: (expenseId: number) => deleteExpense(expenseId),
      onSuccess: () => invalidateExpenseCaches(queryClient),
    }),
};
