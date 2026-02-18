import { queryOptions } from '@tanstack/react-query';
import { getSummaryRecord } from '../api/getSummaryRecord';

/**
 * 요약/리포트 쿼리 키 설계
 * - summary: 이번 달 총액 등(서버가 현재 월 기준 반환). 월 파라미터 없음.
 * - 지출 작성/수정/삭제·로그아웃 시 invalidate 또는 clear 필요.
 */
export const expenseReportQueries = {
  all: ['expenseReport'] as const,
  summaryQuery: () =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'summary'],
      queryFn: () => getSummaryRecord(),
    }),
};
