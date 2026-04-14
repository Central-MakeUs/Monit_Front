import { queryOptions } from '@tanstack/react-query';
import { getSummaryRecord } from '../api/getSummaryRecord';
import { getMonthlyReportList } from '../api/getMonthlyReportList';
import { getReportArrivals } from '../api/getReportArrivals';
import { getTotalOpenStatus } from '../api/getTotalOpenStatus';
import { getWeeklyDetail } from '../api/getWeeklyDetail';
import {
  getWeeklyExpenseDetails,
  type GetWeeklyExpenseDetailsParams,
} from '../api/getWeeklyExpenseDetails';
import { getMonthlyDetail } from '../api/getMonthlyDetail';
import {
  getMonthlyExpenseDetails,
  type GetMonthlyExpenseDetailsParams,
} from '../api/getMonthlyExpenseDetails';

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
  monthlyListQuery: () =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'monthlyList'],
      queryFn: () => getMonthlyReportList(),
    }),
  reportArrivalsQuery: () =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'reportArrivals'],
      queryFn: () => getReportArrivals(),
    }),
  totalOpenStatusQuery: (year: number, month: number) =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'totalOpenStatus', year, month],
      queryFn: () => getTotalOpenStatus(year, month),
    }),
  weeklyDetailQuery: (year: number, month: number) =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'weeklyDetail', year, month],
      queryFn: () => getWeeklyDetail(year, month),
    }),
  weeklyExpenseDetailsQuery: (params: GetWeeklyExpenseDetailsParams) =>
    queryOptions({
      queryKey: [
        ...expenseReportQueries.all,
        'weeklyExpenseDetails',
        params.start,
        params.end,
        params.emotionType,
      ],
      queryFn: () => getWeeklyExpenseDetails(params),
      enabled: !!params.start && !!params.end && !!params.emotionType,
    }),
  monthlyDetailQuery: (year: number, month: number) =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'monthlyDetail', year, month],
      queryFn: () => getMonthlyDetail(year, month),
    }),
  monthlyExpenseDetailsQuery: (params: GetMonthlyExpenseDetailsParams) =>
    queryOptions({
      queryKey: [
        ...expenseReportQueries.all,
        'monthlyExpenseDetails',
        params.year,
        params.month,
        params.emotionType,
      ],
      queryFn: () => getMonthlyExpenseDetails(params),
      enabled: !!params.year && !!params.month && !!params.emotionType,
    }),
};
