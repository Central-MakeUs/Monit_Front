'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useAuthStore } from '@/shared/stores/authStore';
import { useToast } from '@/shared/ui';
import { useBridge } from '@/shared/lib/bridge';
import { getPlatform } from '@/shared/utils';

/** 백엔드 API 없이 클라이언트만 정리 (토큰/스토리지 비우고 로그인 화면으로) */
export const useLogout = () => {
  const router = useRouter();
  const toast = useToast();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const bridge = useBridge();
  const platform = getPlatform();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = useCallback(async () => {
    setIsPending(true);
    try {
      if ((platform === 'ios' || platform === 'android') && bridge) {
        try {
          await bridge.requestLogout();
        } catch {
          // 네이티브 로그아웃 실패해도 로컬 정리 진행
        }
      }
      clearAuth();
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
      }
      toast.success('로그아웃이 완료되었어요');
      router.replace('/login');
    } catch {
      toast.attention('로그아웃에 실패했어요. 다시 시도해주세요.');
    } finally {
      setIsPending(false);
    }
  }, [bridge, platform, clearAuth, toast, router]);

  return { handleLogout, isPending };
};
