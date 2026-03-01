'use client';

import { useCallback, useEffect } from 'react';
import { useBridge } from './useBridge';
import { useAuthStore } from '@/shared/stores/authStore';
import { getPlatform } from '@/shared/utils';

/**
 * 네이티브 앱에 저장된 토큰을 불러와서 웹 스토어에 동기화하는 훅
 * - 마운트 시 1회 동기화
 * - syncNativeToken: 로그인/회원가입 성공 후 호출용
 */
export const useNativeAuth = () => {
  const bridge = useBridge();
  const platform = getPlatform();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const syncNativeToken = useCallback(async () => {
    if ((platform !== 'ios' && platform !== 'android') || !bridge) return;
    try {
      const accessToken = await bridge.getAccessToken();
      if (accessToken) setAccessToken(accessToken);
    } catch {
      // 토큰 로드 실패
    }
  }, [bridge, platform, setAccessToken]);

  useEffect(() => {
    syncNativeToken();
  }, [syncNativeToken]);

  return { syncNativeToken };
};
