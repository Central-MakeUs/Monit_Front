import { isAxiosError } from 'axios';
import { baseAPI } from './instance';

export const postAppleLogin = async ({
  code,
}: {
  code: string;
}): Promise<{
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}> => {
  try {
    const response = await baseAPI.post(`/api/auth/apple/login?code=${code}`);

    const { result } = response.data;

    return {
      success: true,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data || '서버 로그인에 실패했습니다.');
    }

    throw new Error('서버 통신 중 오류가 발생했습니다.');
  }
};
