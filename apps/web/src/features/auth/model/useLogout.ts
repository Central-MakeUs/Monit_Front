'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/shared/stores/authStore';
import { useToast } from '@/shared/ui';
import { useBridge } from '@/shared/lib/bridge';
import { authQueries } from './authQueries';
import { getPlatform } from '@/shared/utils';

export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const bridge = useBridge();
  const platform = getPlatform();

  const { mutate: logout, isPending } = useMutation({
    ...authQueries.logoutMutation(),
    onSuccess: async () => {
      // 웹뷰 환경에서는 네이티브 로그아웃도 호출
      if ((platform === 'ios' || platform === 'android') && bridge) {
        try {
          // 카카오 로그아웃 + 모든 토큰 삭제
          await bridge.requestLogout();
        } catch {
          // 네이티브 로그아웃 실패
        }
      }

      clearAuth();
      toast.success('로그아웃이 완료되었어요');
      router.replace('/login');
    },
    onError: () => {
      toast.attention('로그아웃에 실패했어요. 다시 시도해주세요.');
    },
  });

  return { handleLogout: logout, isPending };
};
