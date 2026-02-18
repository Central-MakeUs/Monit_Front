import { isAxiosError } from 'axios';
import { baseAPI } from './instance';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';

export const postKakaoLogin = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<ApiResponse<LoginData>> => {
  try {
    const response = await baseAPI.post('/api/auth/kakao/login', { accessToken });

    const result = response.data?.result ?? response.data;
    const newAccessToken = result.accessToken ?? result.access_token;
    const newRefreshToken = result.refreshToken ?? result.refresh_token ?? '';
    const { isNewUser, hasExpense, isTermsAgreed } = result;

    return {
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        isNewUser,
        hasExpense,
        isTermsAgreed,
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
