import { useQuery } from '@tanstack/react-query';
import { expenseQueries, type DailyAmount } from '@/entities/expense';
import { format } from 'date-fns';

/**
 * 캘린더에 표시할 월별 지출 데이터를 페칭하는 훅
 * @description 월별 지출 캘린더 데이터를 조회하고 날짜별 금액을 포맷팅합니다.
 */
export const useCalendarExpenseData = (currentDate: Date, enabled: boolean = true) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data, isLoading, error } = useQuery({
    ...expenseQueries.calendarExpense(year, month),
    enabled,
  });

  const dailyAmounts: DailyAmount[] = data?.result?.dailyAmount ?? [];

  /**
   * 특정 날짜의 지출 금액을 포맷팅하여 반환
   */
  const getFormattedAmount = (date: Date): string | undefined => {
    const dateString = format(date, 'yyyy-MM-dd');
    const amountData = dailyAmounts.find((item) => item.date === dateString);
    return amountData ? amountData.dayAmount.toLocaleString() : undefined;
  };

  return {
    dailyAmounts,
    getFormattedAmount,
    isLoading,
    error,
  };
};
