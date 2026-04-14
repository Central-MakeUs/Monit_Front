import { authApi, ENDPOINT } from '@/shared/api';

/**
 * 리포트 도착 확인 처리
 * @description 유저가 특정 월의 분석 리포트를 확인했음을 기록합니다.
 */
export const patchCheckReportArrival = async (year: number, month: number): Promise<void> => {
  const endpoint = ENDPOINT.EXPENSE_REPORT.CHECK_REPORT_ARRIVAL.replace(
    '{year}',
    String(year)
  ).replace('{month}', String(month));
  await authApi.patch(endpoint);
};
