import { authApi, ENDPOINT } from '@/shared/api';
import type { SummaryRecordResponse } from '../model/types';

/**
 * 메인화면 분석 리포트 조회
 * @description 이번 달 총 소비 금액과 지난주 주간 분석 리포트를 한 번에 조회합니다.
 */
export const getSummaryRecord = async () => {
  return await authApi.get<SummaryRecordResponse>(ENDPOINT.EXPENSE_REPORT.SUMMARY_RECORD);
};
