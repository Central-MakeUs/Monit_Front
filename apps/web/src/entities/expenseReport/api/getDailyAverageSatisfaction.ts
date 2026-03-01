import { authApi, ENDPOINT } from '@/shared/api';

/**
 * 일별 종합 소비 만족도 조회
 * @description 당일 모든 지출 회고가 완료된 경우, 전체 만족도 평균을 문구로 반환합니다.
 */
export const getDailyAverageSatisfaction = async (date: string) => {
  return await authApi.get<string>(ENDPOINT.EXPENSE_REPORT.DAILY_SATISFACTION, {
    searchParams: { date },
  });
};
