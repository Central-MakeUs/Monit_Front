import { isAxiosError } from 'axios';
import { baseAPI } from './instance';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';

/**
 * 카카오 신규 사용자 가입 완료
 * 임시 토큰(registerToken)으로 /api/auth/kakao/signup 호출 → 정식 JWT 발급
 */
export const postKakaoSignup = async ({
  registerToken,
}: {
  registerToken: string;
}): Promise<ApiResponse<LoginData>> => {
  try {
    const response = await baseAPI.post('/api/auth/kakao/signup', { registerToken });

    const result = response.data?.result ?? response.data;
    const accessToken = result.accessToken ?? result.access_token;
    const refreshToken = result.refreshToken ?? result.refresh_token ?? '';
    const { isNewUser, hasExpense, homeOnboarding, categoryOnboarding, remindOnboarding } =
      result ?? {};

    if (!accessToken) {
      throw new Error('회원가입 응답 형식이 올바르지 않습니다.');
    }

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        isNewUser: isNewUser ?? false,
        hasExpense: hasExpense ?? false,
        homeOnboarding: homeOnboarding ?? true,
        categoryOnboarding: categoryOnboarding ?? true,
        remindOnboarding: remindOnboarding ?? true,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(
        typeof error.response.data === 'string' ? error.response.data : '회원가입에 실패했습니다.'
      );
    }
    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
