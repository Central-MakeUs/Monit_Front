import { isAxiosError } from 'axios';
import { baseAPI } from './instance';
import { ApiResponse, LoginData } from '@/shared/types/api.types';

export const postAppleSignup = async ({
  registerToken,
}: {
  registerToken: string;
}): Promise<ApiResponse<LoginData>> => {
  try {
    const response = await baseAPI.post('/api/auth/apple/signup', { registerToken });

    const result = response.data?.result ?? response.data;

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        isNewUser: result.isNewUser,
        hasExpense: result.hasExpense,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || '회원가입에 실패했습니다.');
    }

    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
