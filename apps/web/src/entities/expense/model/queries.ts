import { queryOptions } from '@tanstack/react-query';
import { getDailyExpense } from '../api/getDailyExpense';
import { getExpenseCalendar } from '../api/getExpenseCalendar';

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
  calendarExpense: (year: number, month: number) =>
    queryOptions({
      queryKey: [...expenseQueries.all, 'calendar', year, month],
      queryFn: () => getExpenseCalendar({ year, month }),
    }),
};
