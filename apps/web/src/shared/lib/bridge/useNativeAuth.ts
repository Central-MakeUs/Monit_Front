'use client';

import { useEffect } from 'react';
import { useBridge } from './useBridge';
import { useAuthStore } from '@/shared/stores/authStore';
import { getPlatform } from '@/shared/utils';

/**
 * 네이티브 앱에 저장된 토큰을 불러와서 웹 스토어에 동기화하는 훅
 */
export const useNativeAuth = () => {
  const bridge = useBridge();
  const platform = getPlatform();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const loadNativeTokens = async () => {
      // 웹뷰 환경에서만 실행 (accessToken만 동기화, refreshToken은 덮어쓰지 않음)
      if ((platform === 'ios' || platform === 'android') && bridge) {
        try {
          const accessToken = await bridge.getAccessToken();

          if (accessToken) {
            setAccessToken(accessToken);
          }
        } catch {
          // 토큰 로드 실패
        }
      }
    };

    loadNativeTokens();
  }, [bridge, platform, setAccessToken]);
};
