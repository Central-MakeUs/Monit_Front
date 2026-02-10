import { useQuery } from '@tanstack/react-query';
import { expenseReportQueries } from '@/entities/expenseReport';
import {
  expenseQueries,
  type ExpenseListDTO,
  type DailyExpenseResponseDTO,
} from '@/entities/expense';

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

  return {
    monthlyTotalAmount,
    expenses,
    hasExpenses,
    expenseCount,
    dailyTotalAmount,
    isLoading: isSummaryLoading || isDailyLoading,
    error: summaryError || dailyError,
  };
};
