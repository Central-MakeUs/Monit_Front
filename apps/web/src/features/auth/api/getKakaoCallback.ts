import { api, ENDPOINT } from '@/shared/api';
import { AuthResponse } from '../model/types';

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

/**
 * 카카오 로그인 콜백 처리
 * @param code - 카카오 OAuth Authorization Code
 */
export const getKakaoCallback = async (code: string) => {
  return await api.get<AuthResponse>(
    `${ENDPOINT.AUTH.KAKAO_CALLBACK}?code=${code}&redirect_uri=${KAKAO_REDIRECT_URI}`
  );
};
