import { authApi, ENDPOINT } from '@/shared/api';
import type { RetrospectListResponse } from '../model/types';

/**
 * 회고 필요 지출 내역 조회
 * @description 특정 날짜의 지출 중 아직 회고(만족도 조사)가 완료되지 않은 내역만 리스트로 조회합니다.
 */
export const getRetrospectList = async (params: { date: string }) => {
  return await authApi.get<RetrospectListResponse>(ENDPOINT.EXPENSE.RETROSPECT_LIST, {
    searchParams: params,
  });
};
