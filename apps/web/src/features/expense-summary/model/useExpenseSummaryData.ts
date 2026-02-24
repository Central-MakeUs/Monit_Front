import { useQuery } from '@tanstack/react-query';
import { expenseQueries } from '@/entities/expense';
import type { ExpenseListDTO, DailyExpenseResponseDTO, EmptyStateType } from '@/entities/expense';

/**
 * 월별/일별 소비 요약 데이터를 페칭하는 훅
 * @description calendar API로 월별 총액, daily API로 일별 내역 조회.
 * Home·Report 등에서 공통 사용.
 */
export const useExpenseSummaryData = (selectedDate: Date | null, currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const {
    data: calendarData,
    isLoading: isCalendarLoading,
    error: calendarError,
  } = useQuery(expenseQueries.calendarExpense(year, month));

  const {
    data: dailyData,
    isLoading: isDailyLoading,
    error: dailyError,
  } = useQuery(expenseQueries.dailyExpense(selectedDate || new Date()));

  const monthlyTotalAmount = calendarData?.result?.totalAmount ?? 0;

  const dailyResult = dailyData?.result as DailyExpenseResponseDTO | undefined;
  const expenses: ExpenseListDTO[] = dailyResult?.expenses ?? [];
  const hasExpenses = dailyResult?.hasAnyExpense ?? false;
  const bannerMessage = dailyResult?.bannerMessage;
  const bannerSubMessage = dailyResult?.bannerSubMessage;
  const retrospectCompleted = dailyResult?.retrospectCompleted ?? false;
  const dailyDate = dailyResult?.date;
  const dailyTotalAmount = expenses.reduce(
    (sum: number, exp: ExpenseListDTO) => sum + (exp.amount ?? 0),
    0
  );
  const expenseCount = expenses.length;

  const getEmptyStateType = (): EmptyStateType => {
    if (!hasExpenses) return 'never';
    if (expenses.length === 0) {
      const today = new Date();
      const selected = selectedDate || today;
      const isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();
      return isToday ? 'today' : 'date';
    }
    return 'date';
  };

  const emptyStateType = getEmptyStateType();

  return {
    monthlyTotalAmount,
    expenses,
    hasExpenses,
    expenseCount,
    dailyTotalAmount,
    emptyStateType,
    isLoading: (!calendarData && isCalendarLoading) || (!dailyData && isDailyLoading),
    isFetching: (!!calendarData && isCalendarLoading) || (!!dailyData && isDailyLoading),
    error: calendarError || dailyError,
    bannerMessage,
    bannerSubMessage,
    retrospectCompleted,
    dailyDate,
  };
};
