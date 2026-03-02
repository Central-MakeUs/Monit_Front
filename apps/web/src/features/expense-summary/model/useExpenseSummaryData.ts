import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { expenseQueries } from '@/entities/expense';
import type { ExpenseListDTO, DailyExpenseResponseDTO, EmptyStateType } from '@/entities/expense';

export interface UseExpenseSummaryDataParams {
  /** 월별 캘린더 API용 (year/month 추출) */
  monthDate: Date;
  /** 일별 daily API용. null/undefined면 monthDate로 안정적으로 대체 (렌더마다 new Date() 방지) */
  dayDate?: Date | null;
}

/**
 * 월별/일별 소비 요약 데이터를 페칭하는 훅
 * @description calendar API로 월별 총액, daily API로 일별 내역 조회. Home·Report 등에서 공통 사용.
 */
export const useExpenseSummaryData = ({ monthDate, dayDate }: UseExpenseSummaryDataParams) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth() + 1;

  /** 쿼리 키/캐시 안정화: dayDate가 없을 때 매 렌더 new Date() 대신 monthDate 사용 */
  const stableDayDate = dayDate ?? monthDate;

  const calendarQuery = useQuery(expenseQueries.calendarExpense(year, month));
  const dailyQuery = useQuery(expenseQueries.dailyExpense(stableDayDate));

  const monthlyTotalAmount = calendarQuery.data?.result?.totalAmount ?? 0;

  const dailyResult = dailyQuery.data?.result as DailyExpenseResponseDTO | undefined;
  const expenses = useMemo<ExpenseListDTO[]>(
    () => dailyResult?.expenses ?? [],
    [dailyResult?.expenses]
  );
  const hasExpenses = dailyResult?.hasAnyExpense ?? false;
  const bannerMessage = dailyResult?.bannerMessage;
  const bannerSubMessage = dailyResult?.bannerSubMessage;
  const retrospectCompleted = dailyResult?.retrospectCompleted ?? false;
  const dailyDate = dailyResult?.date;

  const { dailyTotalAmount, expenseCount, emptyStateType } = useMemo(() => {
    const total = expenses.reduce((sum: number, exp: ExpenseListDTO) => sum + (exp.amount ?? 0), 0);
    const count = expenses.length;

    /**
     * hasExpenses(일별 API 플래그)와 월별 총액을 함께 사용해서
     * 한 번이라도 지출한 적이 있으면 'never'(첫 소비) 상태가 나오지 않도록 보정
     */
    const hasEverExpenses = hasExpenses || monthlyTotalAmount > 0;

    const getEmptyStateType = (): EmptyStateType => {
      const today = new Date();
      const selected = stableDayDate;
      const isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();

      // 아직까지 단 한 번도 지출 내역이 없을 때만,
      // 오늘 날짜에서 '첫 소비' 문구를 노출하고
      // 과거/미래 날짜에서는 일반 빈 상태 문구를 노출
      if (!hasEverExpenses) {
        return isToday ? 'never' : 'date';
      }

      if (expenses.length === 0) {
        return isToday ? 'today' : 'date';
      }

      return 'date';
    };

    return {
      dailyTotalAmount: total,
      expenseCount: count,
      emptyStateType: getEmptyStateType(),
    };
  }, [expenses, hasExpenses, stableDayDate, monthlyTotalAmount]);

  return {
    monthlyTotalAmount,
    expenses,
    hasExpenses,
    expenseCount,
    dailyTotalAmount,
    emptyStateType,
    isLoading: calendarQuery.isLoading || dailyQuery.isLoading,
    isFetching: calendarQuery.isFetching || dailyQuery.isFetching,
    error: calendarQuery.error || dailyQuery.error,
    bannerMessage,
    bannerSubMessage,
    retrospectCompleted,
    dailyDate,
  };
};
