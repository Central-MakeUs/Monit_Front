import { useQuery } from '@tanstack/react-query';
import { expenseReportQueries } from '@/entities/expenseReport';
import {
  expenseQueries,
  type ExpenseListDTO,
  type DailyExpenseResponseDTO,
} from '@/entities/expense';

type EmptyStateType = 'never' | 'today' | 'date';

/**
 * 홈 화면에 필요한 소비 데이터를 페칭하고 가공하는 훅
 * @description API로부터 월간 리포트와 일일 지출 내역을 조회하여 필요한 데이터를 제공합니다.
 */
export const useHomeExpenseData = (selectedDate: Date | null) => {
  // 월간 리포트 조회
  const {
    data: summaryData,
    isLoading: isSummaryLoading,
    error: summaryError,
  } = useQuery(expenseReportQueries.summaryQuery());

  // 일일 지출 내역 조회
  const {
    data: dailyData,
    isLoading: isDailyLoading,
    error: dailyError,
  } = useQuery(expenseQueries.dailyExpense(selectedDate || new Date()));

  // 월간 총액 추출
  const monthlyTotalAmount = summaryData?.result?.monthlyReport?.totalAmount ?? 0;

  // 일일 데이터 추출
  const dailyResult = dailyData?.result as DailyExpenseResponseDTO | undefined;
  const expenses: ExpenseListDTO[] = dailyResult?.expenses ?? [];
  const hasExpenses = dailyResult?.hasAnyExpense ?? false;
  const dailyTotalAmount = expenses.reduce(
    (sum: number, exp: ExpenseListDTO) => sum + (exp.amount ?? 0),
    0
  );
  const expenseCount = expenses.length;

  // emptyStateType 결정 로직
  const getEmptyStateType = (): EmptyStateType => {
    // hasAnyExpense가 false면 한 번도 지출한 적 없음
    if (!hasExpenses) {
      return 'never';
    }

    // hasAnyExpense가 true인데 현재 선택된 날짜에 지출이 없는 경우
    if (expenses.length === 0) {
      const today = new Date();
      const selected = selectedDate || today;

      // 오늘 날짜인지 확인
      const isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();

      return isToday ? 'today' : 'date';
    }

    // 지출이 있는 경우 (실제로는 EmptyState가 표시되지 않음)
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
    // 데이터가 없으면서 로딩 중일 때 (초기 진입)
    isLoading: (!summaryData && isSummaryLoading) || (!dailyData && isDailyLoading),
    // 데이터가 있는데 로딩 중일 때 (날짜 변경 등)
    isFetching: (!!summaryData && isSummaryLoading) || (!!dailyData && isDailyLoading),
    error: summaryError || dailyError,
  };
};
