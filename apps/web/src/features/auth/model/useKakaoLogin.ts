import { useCallback } from 'react';
import type { AppBridge } from '@repo/bridge';
import { useBridge, initializeBridge } from '@/shared/lib/bridge';
import { getPlatform } from '@/shared/utils';

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
  const platform = getPlatform();

  const loginWithKakao = useCallback(async () => {
    try {
      if (platform === 'ios' || platform === 'android') {
        // 브릿지가 아직 없으면 한 번 더 연결 시도 (실기기에서 준비 지연 시 대응)
        let currentBridge = bridge;
        if (!currentBridge && typeof window !== 'undefined') {
          await initializeBridge();
          currentBridge = (window as unknown as { bridge?: AppBridge }).bridge ?? null;
        }
        if (currentBridge) {
          const result = await currentBridge.socialLogin('kakao');
          if (result.success) {
            onSuccess?.();
          } else {
            onError?.(new Error(result.message || '카카오 로그인에 실패했습니다.'));
          }
          return;
        }
        onError?.(new Error('앱 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.'));
        return;
      }

      if (!redirectUri) {
        const error = new Error('Redirect URI가 설정되지 않았습니다.');
        onError?.(error);
        return;
      }
    } catch (error) {
      const errorMessage = '카카오 로그인 중 에러가 발생했습니다.';
      onError?.(error instanceof Error ? error : new Error(errorMessage));
    }
  }, [platform, bridge, redirectUri, onSuccess, onError]);

  return { handleKakaoLogin: loginWithKakao };
};
