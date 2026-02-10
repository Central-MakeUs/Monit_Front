import { queryOptions } from '@tanstack/react-query';
import { getDailyExpense } from '../api/getDailyExpense';

export const expenseQueries = {
  all: ['expense'] as const,
  dailyExpense: (date: Date) =>
    queryOptions({
      queryKey: [...expenseQueries.all, 'daily', date.toISOString()],
      queryFn: () =>
        getDailyExpense({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }),
    }),
};
