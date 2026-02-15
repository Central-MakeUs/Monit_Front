import type { AppBridge } from '@repo/bridge';
import { useBridge, initializeBridge } from '@/shared/lib/bridge';
import { getPlatform } from '@/shared/utils';

interface AppleLoginData {
  accessToken: string;
  refreshToken: string;
  isNewUser?: string;
  hasExpense?: boolean;
  termsAgreed?: boolean;
}

interface AppleLoginOptions {
  onSuccess?: (data?: AppleLoginData) => void;
  onError?: (error: Error) => void;
}

interface AppleLoginReturn {
  handleAppleLogin: () => void;
}

export const useAppleLogin = (options: AppleLoginOptions = {}): AppleLoginReturn => {
  const { onSuccess, onError } = options;
  const bridge = useBridge();
  const platform = getPlatform();

  const handleAppleLogin = async () => {
    try {
      if (platform !== 'ios') {
        onError?.(new Error('Apple 로그인은 iOS에서만 사용할 수 있습니다.'));
        return;
      }
      // 브릿지가 아직 없으면 한 번 더 연결 시도 (실기기에서 준비 지연 시 대응)
      let currentBridge = bridge;
      if (!currentBridge && typeof window !== 'undefined') {
        await initializeBridge();
        currentBridge = (window as unknown as { bridge?: AppBridge }).bridge ?? null;
      }
      if (!currentBridge) {
        onError?.(new Error('앱 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.'));
        return;
      }

      const result = await currentBridge.socialLogin('apple');

      if (result.success) {
        onSuccess?.(result.data);
      } else {
        onError?.(new Error(result.message || 'Apple 로그인에 실패했습니다.'));
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Apple 로그인 중 에러가 발생했습니다.'));
    }
  };

  return { handleAppleLogin };
};
