import type { AppBridge } from '@repo/bridge';
import { useBridge, initializeBridge } from '@/shared/lib/bridge';
import { useToast } from '@/shared/ui';
import { getPlatform } from '@/shared/utils';

export interface AppleLoginData {
  accessToken: string;
  refreshToken: string;
  isNewUser?: boolean;
  hasExpense?: boolean;
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
  const toast = useToast();
  const platform = getPlatform();

  const handleAppleLogin = async () => {
    try {
      if (platform !== 'ios') {
        toast.attention('Apple 로그인은 iOS에서만 가능합니다.');
        onError?.(new Error('Apple 로그인은 iOS에서만 사용할 수 있습니다.'));
        return;
      }

      let currentBridge = bridge;

      if (!currentBridge && typeof window !== 'undefined') {
        await initializeBridge();
        currentBridge = (window as unknown as { bridge?: AppBridge }).bridge ?? null;
      }

      if (!currentBridge || !currentBridge.socialLogin) {
        toast.attention('앱 연결에 실패했습니다.');
        onError?.(new Error('앱 연결에 실패했습니다.'));
        return;
      }

      const result = await currentBridge.socialLogin('apple');

      if (result.success) {
        onSuccess?.(result.data);
      } else {
        toast.attention(result.message || 'Apple 로그인 실패');
        onError?.(new Error(result.message || 'Apple 로그인에 실패했습니다.'));
      }
    } catch (error) {
      toast.attention('Apple 로그인 중 오류 발생');
      onError?.(error instanceof Error ? error : new Error('Apple 로그인 중 에러가 발생했습니다.'));
    }
  };

  return { handleAppleLogin };
};
