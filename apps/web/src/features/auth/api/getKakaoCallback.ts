import { api, ENDPOINT } from '@/shared/api';
import { useAuthStore } from '@/shared/stores/authStore';
import { AuthResponse } from '../model/types';

/**
 * 카카오 로그인 콜백 처리
 * @param code - 카카오 OAuth Authorization Code
 */
export const getKakaoCallback = async (code: string) => {
  const response = await api.get<AuthResponse>(`${ENDPOINT.AUTH.KAKAO_CALLBACK}?code=${code}`, {
    credentials: 'include',
  });

  // 성공 시 Access Token을 Zustand에 저장
  if (response.isSuccess && response.result?.accessToken) {
    useAuthStore.getState().setAccessToken(response.result.accessToken);
  }

  return response;
};
