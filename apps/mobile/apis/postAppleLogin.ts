import { isAxiosError } from 'axios';
import { baseAPI } from './instance';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';

export const postAppleLogin = async ({
  code,
}: {
  code: string;
}): Promise<ApiResponse<LoginData>> => {
  try {
    const response = await baseAPI.post(`/api/auth/apple/login?code=${code}`);

    const { result } = response.data;

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        isNewUser: result.isNewUser,
        hasExpense: result.hasExpense,
        termsAgreed: result.termsAgreed,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || '서버 로그인에 실패했습니다.');
    }

    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
