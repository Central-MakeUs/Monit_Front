import * as AppleAuthentication from 'expo-apple-authentication';
import { postAppleLogin } from '@/apis/postAppleLogin';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';

function getAppleAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: string }).code;
    switch (code) {
      case 'ERR_REQUEST_CANCELED':
        return '로그인이 취소되었습니다.';
      case 'ERR_REQUEST_NOT_HANDLED':
        return 'Apple 로그인을 처리할 수 없습니다.';
      case 'ERR_REQUEST_FAILED':
        return 'Apple 로그인 요청이 실패했습니다.';
      case 'ERR_REQUEST_NOT_INTERACTIVE':
        return 'Apple 로그인 화면을 표시할 수 없습니다.';
      case 'ERR_REQUEST_INVALID_RESPONSE':
        return 'Apple 로그인 응답이 올바르지 않습니다.';
      default:
        break;
    }
  }
  if (error instanceof Error) return error.message;
  return 'Apple 로그인에 실패했습니다.';
}

export const useAppleLogin = async (): Promise<ApiResponse<LoginData>> => {
  try {
    const appleResult = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      ],
    });
    if (!appleResult.identityToken || !appleResult.authorizationCode) {
      throw new Error('애플로부터 토큰을 받지 못했습니다.');
    }
    const response = await postAppleLogin({ code: appleResult.authorizationCode });
    return response;
  } catch (error) {
    const message = getAppleAuthErrorMessage(error);
    if (__DEV__) {
      console.warn('[Apple Login]', error);
    }
    throw new Error(message);
  }
};
