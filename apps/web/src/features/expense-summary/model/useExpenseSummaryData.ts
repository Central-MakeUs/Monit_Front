import { useEffect, useMemo, useRef, useState } from 'react';
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

  /**
   * 쿼리 키/캐시 안정화 + 월 전환 중 깜빡임 방지
   *
   * - dayDate를 명시적으로 쓰지 않는 경우(undefined): 항상 monthDate 기준으로 동기화
   * - dayDate를 쓰는 경우:
   *   - 일자가 선택되어 있을 때(Date): 해당 날짜로 고정
   *   - 월 스와이프 중 잠시 null이 되는 구간: 직전 선택 날짜를 그대로 유지해서
   *     "이번 달 1일"로 잠깐 갔다 오는 중간 쿼리가 일어나지 않도록 함
   */
  const [stableDayDate, setStableDayDate] = useState<Date>(() => dayDate ?? monthDate);
  const hasEverNonNullDayDateRef = useRef(false);

  useEffect(() => {
    if (dayDate && !hasEverNonNullDayDateRef.current) {
      hasEverNonNullDayDateRef.current = true;
    }

    // dayDate를 사용하지 않는 호출(useExpenseSummaryData({ monthDate }))은 항상 monthDate를 따름
    if (dayDate === undefined) {
      setStableDayDate(monthDate);
      return;
    }

    // 명시적으로 선택된 날짜가 있을 때는 해당 날짜로 고정
    if (dayDate) {
      setStableDayDate(dayDate);
      return;
    }

    // dayDate가 null인 경우:
    // - 한 번도 날짜 선택이 없었다면(month-only 사용 패턴) monthDate 기준으로 따라가고
    // - 한 번이라도 날짜 선택이 있었다면(달력 스와이프 중) 직전 stableDayDate를 유지
    if (!hasEverNonNullDayDateRef.current) {
      setStableDayDate(monthDate);
    }
  }, [dayDate, monthDate]);

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

  const isMonthlyLoading = calendarQuery.isLoading;
  const isMonthlyFetching = calendarQuery.isFetching;
  const isDailyLoading = dailyQuery.isLoading;
  const isDailyFetching = dailyQuery.isFetching;

  return {
    monthlyTotalAmount,
    expenses,
    hasExpenses,
    expenseCount,
    dailyTotalAmount,
    emptyStateType,
    // 일별 영역 전용 로딩 플래그 (리스트/배너 등)
    isLoading: isDailyLoading,
    isFetching: isDailyFetching,
    // 월별 영역 전용 로딩 플래그 (헤더/리포트 등)
    isMonthlyLoading,
    isMonthlyFetching,
    isDailyLoading,
    isDailyFetching,
    error: calendarQuery.error || dailyQuery.error,
    bannerMessage,
    bannerSubMessage,
    retrospectCompleted,
    dailyDate,
  };
};
