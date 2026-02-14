import * as AppleAuthentication from 'expo-apple-authentication';
import { postAppleLogin } from '@/apis/postAppleLogin';

export const useAppleLogin = async (): Promise<{
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}> => {
  try {
    const appleResult = await AppleAuthentication.signInAsync({});
    if (!appleResult.identityToken || !appleResult.authorizationCode) {
      throw new Error('애플로부터 토큰을 받지 못했습니다.');
    }
    const response = await postAppleLogin({ code: appleResult.authorizationCode });
    return response;
  } catch (error) {
    throw error;
  }
};
