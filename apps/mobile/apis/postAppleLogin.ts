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

    // 백엔드가 result 래핑 여부에 상관없이 동작하도록 (bridge 카카오와 동일한 방식)
    const result = response.data?.result ?? response.data;
    const { isNewUser, hasExpense, homeOnboarding, categoryOnboarding, remindOnboarding } = result;

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        isNewUser,
        hasExpense,
        homeOnboarding,
        categoryOnboarding,
        remindOnboarding,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || '서버 로그인에 실패했습니다.');
    }

    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
