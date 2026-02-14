import { useBridge } from '@/shared/lib/bridge';
import { getPlatform } from '@/shared/utils';

interface AppleLoginOptions {
  onSuccess?: () => void;
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
      if (platform !== 'ios' || !bridge) {
        onError?.(new Error('Apple 로그인은 iOS에서만 사용할 수 있습니다.'));
        return;
      }

      const result = await bridge.socialLogin('apple');

      if (result.success) {
        onSuccess?.();
      } else {
        onError?.(new Error(result.message || 'Apple 로그인에 실패했습니다.'));
      }
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Apple 로그인 중 에러가 발생했습니다.'));
    }
  };

  return { handleAppleLogin };
};
