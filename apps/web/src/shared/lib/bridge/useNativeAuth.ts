'use client';

import { useEffect } from 'react';
import { useBridge } from './useBridge';
import { usePlatform } from './hooks';
import { useAuthStore } from '@/shared/stores/authStore';

/**
 * 네이티브 앱에 저장된 토큰을 불러와서 웹 스토어에 동기화하는 훅
 */
export const useNativeAuth = () => {
  const bridge = useBridge();
  const platform = usePlatform();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const loadNativeTokens = async () => {
      // 웹뷰 환경에서만 실행
      if ((platform === 'ios' || platform === 'android') && bridge) {
        try {
          const { accessToken } = await bridge.getAccessToken();

          if (accessToken) {
            // 네이티브에 저장된 토큰을 웹 스토어에 동기화
            setAuth({
              accessToken,
              // TODO: RefreshToken 사용 시 주석 해제
              // refreshToken: refreshToken || '',
            });
          }
        } catch {
          // 토큰 로드 실패
        }
      }
    };

    loadNativeTokens();
  }, [bridge, platform, setAuth]);
};
