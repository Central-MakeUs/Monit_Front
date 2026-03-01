import { isAxiosError } from 'axios';
import { baseAPI } from './instance';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';

/**
 * 카카오 로그인
 * - 기존 유저: JWT(accessToken, refreshToken) 반환
 * - 신규 유저: newUser: true + 임시 토큰(registerToken) 반환 → 약관 동의 후 /api/auth/kakao/signup 호출
 */
export const postKakaoLogin = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<ApiResponse<LoginData & { registerToken?: string }>> => {
  try {
    const response = await baseAPI.post('/api/auth/kakao/login', { accessToken });

    const result = response.data?.result ?? response.data;
    const isNewUser = result.newUser ?? result.isNewUser;
    // 신규 유저 시 백엔드가 임시 토큰을 accessToken으로 내려주는 경우 처리 (registerToken 필드 없을 수 있음)
    const tempToken =
      result.registerToken ??
      result.register_token ??
      (isNewUser === true ? (result.accessToken ?? result.access_token) : null);

    if (isNewUser === true) {
      return {
        success: true,
        data: {
          accessToken: '',
          refreshToken: '',
          isNewUser: true,
          hasExpense: result.hasExpense ?? false,
          registerToken: tempToken ?? '',
        },
      };
    }

    const newAccessToken = result.accessToken ?? result.access_token;
    const newRefreshToken = result.refreshToken ?? result.refresh_token ?? '';
    const { hasExpense } = result;

    return {
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        isNewUser: false,
        hasExpense,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        typeof error.response.data === 'string'
          ? error.response.data
          : '서버 로그인에 실패했습니다.'
      );
    }
    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
