import { useCallback } from 'react';
import { useBridge, usePlatform } from '@/shared/lib/bridge';

interface KakaoLoginOptions {
  redirectUri?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface KakaoLoginReturn {
  handleKakaoLogin: () => void;
}

const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

/**
 * 카카오 로그인 훅
 * - 네이티브: bridge.socialLogin('kakao') 호출만으로 모든 처리 완료
 * - 웹: 기존 Kakao SDK 사용
 */
export const useKakaoLogin = (options: KakaoLoginOptions = {}): KakaoLoginReturn => {
  const { redirectUri = KAKAO_REDIRECT_URI, onSuccess, onError } = options;
  const bridge = useBridge();
  const platform = usePlatform();

  const loginWithKakao = useCallback(async () => {
    try {
      // 웹뷰 환경 (iOS/Android)에서는 브릿지를 통해 네이티브 로그인 사용
      if ((platform === 'ios' || platform === 'android') && bridge) {
        // 네이티브에서 모든 처리 완료 (카카오 로그인 + 백엔드 API + 토큰 저장)
        const result = await bridge.socialLogin('kakao');

        if (result.success) {
          onSuccess?.();
        } else {
          onError?.(new Error(result.message || '카카오 로그인에 실패했습니다.'));
        }
        return;
      }

      // 웹 환경에서는 기존 Kakao SDK 사용
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        const error = new Error('Kakao SDK가 초기화되지 않았습니다.');
        onError?.(error);
        return;
      }

      if (!redirectUri) {
        const error = new Error('Redirect URI가 설정되지 않았습니다.');
        onError?.(error);
        return;
      }

      window.Kakao.Auth.authorize({
        redirectUri: redirectUri as string,
      });
    } catch (error) {
      const errorMessage = '카카오 로그인 중 에러가 발생했습니다.';
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [platform, bridge, redirectUri, onSuccess, onError]);

  return { handleKakaoLogin: loginWithKakao };
};
