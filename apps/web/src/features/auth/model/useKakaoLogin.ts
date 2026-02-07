import { useCallback } from 'react';

interface KakaoLoginOptions {
  redirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface KakaoLoginReturn {
  handleKakaoLogin: () => void;
}

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const useKakaoLogin = (options: KakaoLoginOptions = {}): KakaoLoginReturn => {
  const { redirectUri = KAKAO_REDIRECT_URI, onSuccess, onError } = options;

  const loginWithKakao = useCallback(() => {
    try {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        const error = new Error('Kakao SDK가 초기화되지 않았습니다.');
        console.error(error.message);
        onError?.(error);
        return;
      }

      if (!redirectUri) {
        const error = new Error('Redirect URI가 설정되지 않았습니다.');
        console.error(error.message);
        onError?.(error);
        return;
      }

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri as string,
      });

      onSuccess?.();
    } catch (error) {
      const errorMessage = '카카오 로그인 중 에러가 발생했습니다.';
      console.error(errorMessage, error);
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [redirectUri, onSuccess, onError]);

  return { handleKakaoLogin: loginWithKakao };
};
