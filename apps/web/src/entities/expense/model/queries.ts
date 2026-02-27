import { queryOptions } from '@tanstack/react-query';
import { getDailyExpense } from '../api/getDailyExpense';
import { getExpenseCalendar } from '../api/getExpenseCalendar';
import { getRetrospectList } from '../api/getRetrospectList';

/**
 * 지출 관련 쿼리 키 설계
 * - all: invalidation 시 일일/캘린더 전체 무효화에 사용
 * - dailyExpense(date): 날짜별 → 선택일 변경 시 자동 refetch
 * - calendarExpense(year, month): 월별 → 연·월 변경 시 자동 refetch
 */
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
  retrospectList: (date: string) =>
    queryOptions({
      queryKey: [...expenseQueries.all, 'retrospect-list', date],
      queryFn: () => getRetrospectList({ date }),
    }),
};
