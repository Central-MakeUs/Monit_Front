import { useCallback } from 'react';

interface KakaoLoginOptions {
  redirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface KakaoLoginReturn {
  loginWithKakao: () => void;
}

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export const useKakaoLogin = (options: KakaoLoginOptions = {}): KakaoLoginReturn => {
  const { redirectUri = KAKAO_REDIRECT_URI, onSuccess, onError } = options;

  const loginWithKakao = useCallback(() => {
    try {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        throw new Error('Kakao SDK가 초기화되지 않았습니다.');
      }

      if (!redirectUri) {
        throw new Error('Redirect URI가 설정되지 않았습니다.');
      }

      window.Kakao.Auth.authorize({
        redirectUri,
      });

      onSuccess?.();
    } catch (error) {
      console.error('[Kakao Login] Error:', error);
      onError?.(error as Error);
    }
  }, [redirectUri, onSuccess, onError]);

  return {
    loginWithKakao,
  };
};
