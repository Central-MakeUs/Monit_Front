import { queryOptions } from '@tanstack/react-query';
import { getSummaryRecord } from '../api/getSummaryRecord';

export const expenseReportQueries = {
  all: ['expenseReport'] as const,
  summaryQuery: () =>
    queryOptions({
      queryKey: [...expenseReportQueries.all, 'summary'],
      queryFn: () => getSummaryRecord(),
    }),
};
