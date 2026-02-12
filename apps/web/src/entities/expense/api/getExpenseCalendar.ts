import { authApi, ENDPOINT } from '@/shared/api';

export interface DailyAmount {
  date: string;
  dayAmount: number;
}

export interface ExpenseCalendarResponse {
  totalAmount: number;
  dailyAmount: DailyAmount[];
}

export interface GetExpenseCalendarParams {
  year: number;
  month: number;
}

/**
 * 월별 지출 캘린더 조회
 * @description 해당 월의 일별 지출 금액을 조회합니다.
 */
export const getExpenseCalendar = async ({ year, month }: GetExpenseCalendarParams) => {
  return await authApi.get<ExpenseCalendarResponse>(ENDPOINT.EXPENSE.CALENDAR, {
    searchParams: {
      year,
      month,
    },
  });
};
