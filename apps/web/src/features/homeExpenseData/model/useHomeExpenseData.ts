import { useQuery } from '@tanstack/react-query';
import { expenseReportQueries } from '@/entities/expenseReport';

/**
 * 홈 화면에 필요한 소비 데이터를 페칭하고 가공하는 훅
 * @description API로부터 월간 리포트를 조회하여 필요한 데이터를 제공합니다.
 */
export const useHomeExpenseData = () => {
  const { data: summaryData, isLoading, error } = useQuery(expenseReportQueries.summaryQuery());

  // 월간 총액 추출
  const monthlyTotalAmount = summaryData?.result?.monthlyReport?.totalAmount ?? 0;

  return {
    monthlyTotalAmount,
    isLoading,
    error,
  };
};
