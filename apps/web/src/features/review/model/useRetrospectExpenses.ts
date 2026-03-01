import { useQuery } from '@tanstack/react-query';
import { expenseQueries } from '@/entities/expense';
import type { ExpenseResponseDTO } from '@/entities/expense';

export const useRetrospectExpenses = (date: string) => {
  const { data, isLoading, isError } = useQuery(expenseQueries.retrospectList(date));

  const expenses: ExpenseResponseDTO[] = (data?.result as ExpenseResponseDTO[]) ?? [];

  return { expenses, isLoading, isError };
};
