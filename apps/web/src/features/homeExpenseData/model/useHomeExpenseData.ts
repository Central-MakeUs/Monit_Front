import { useQuery } from '@tanstack/react-query';
import { expenseQueries } from '@/entities/expense';
import type { ExpenseListDTO, DailyExpenseResponseDTO, EmptyStateType } from '@/entities/expense';

/**
 * 홈 화면에 필요한 소비 데이터를 페칭하고 가공하는 훅
 * @description /api/expense/calendar로 월별 총액(totalAmount) 조회, 일별 지출은 daily API 사용.
 * 캘린더에 보이는 달(currentDate)이 바뀌면 해당 월 calendar API가 자동으로 다시 요청됩니다.
 */
export const useHomeExpenseData = (selectedDate: Date | null, currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // 월별 캘린더 API → totalAmount로 상단 월 금액 표시
  const {
    data: calendarData,
    isLoading: isCalendarLoading,
    error: calendarError,
  } = useQuery(expenseQueries.calendarExpense(year, month));

  // 일일 지출 내역 조회
  const {
    data: dailyData,
    isLoading: isDailyLoading,
    error: dailyError,
  } = useQuery(expenseQueries.dailyExpense(selectedDate || new Date()));

  const monthlyTotalAmount = calendarData?.result?.totalAmount ?? 0;

  const dailyResult = dailyData?.result as DailyExpenseResponseDTO | undefined;
  const expenses: ExpenseListDTO[] = dailyResult?.expenses ?? [];
  const hasExpenses = dailyResult?.hasAnyExpense ?? false;
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
  };
};
