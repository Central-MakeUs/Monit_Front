'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/shared/stores/authStore';
import { useNativeAuth } from '@/shared/lib/bridge';

/**
 * 인증 가드 컴포넌트
 * 토큰이 없으면 로그인 페이지로 리다이렉트
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);

  // 네이티브 앱에서 토큰 자동 로드
  useNativeAuth();

  useEffect(() => {
    // 로그인 페이지나 인증 콜백 페이지는 체크하지 않음
    const publicPaths = ['/login', '/auth'];
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublicPath) {
      return;
    }

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
      router.replace('/login');
    }
  }, [accessToken, pathname, router]);

  return <>{children}</>;
};
