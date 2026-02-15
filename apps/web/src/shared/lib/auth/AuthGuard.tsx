'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/shared/stores/authStore';
import { useNativeAuth } from '@/shared/lib/bridge';

/**
 * 인증 가드
 * - 토큰 없을 때: WebView(브릿지 있음)면 리다이렉트 안 함 → 401 나면 reissue 시도, 실패 시에만 로그인으로
 * - 브라우저/브릿지 없음: 토큰 없으면 바로 로그인으로
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);

  useNativeAuth();

  useEffect(() => {
    const publicPaths = ['/login', '/auth'];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublicPath) return;
    if (accessToken) return;

    const hasReissueBridge = () =>
      typeof window !== 'undefined' &&
      !!(window as unknown as { bridge?: { reissueAccessToken?: unknown } }).bridge
        ?.reissueAccessToken;

    // WebView(브릿지 있음): 토큰 없어도 리다이렉트 안 함 → 요청 시 401 → reissue 시도, 실패 시 client에서 로그인으로
    if (hasReissueBridge()) return;

    // 브릿지가 아직 없을 수 있음(초기화 중) → 잠시 후 재확인, 그래도 없고 토큰도 없으면 로그인으로
    const t = window.setTimeout(() => {
      if (useAuthStore.getState().accessToken) return;
      if (hasReissueBridge()) return;
      router.replace('/login');
    }, 1500);

    return () => clearTimeout(t);
  }, [accessToken, pathname, router]);

  return <>{children}</>;
};
