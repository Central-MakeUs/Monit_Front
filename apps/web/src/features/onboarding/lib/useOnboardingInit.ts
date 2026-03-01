'use client';

import { useEffect, useRef } from 'react';
import { useBridge } from '@/shared/lib/bridge';
import { useOnboardingStore } from '../model/onboardingStore';

/**
 * 앱 로드 시 bridge.onboardingStatus()를 호출하여
 * Zustand 온보딩 스토어를 hydrate하는 훅
 *
 * HomePage에서 한 번만 호출
 */
export function useOnboardingInit() {
  const bridge = useBridge();
  const hydrateFromServer = useOnboardingStore((s) => s.hydrateFromServer);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    if (!bridge) return;

    hasChecked.current = true;

    bridge
      .onboardingStatus()
      .then((flags) => {
        hydrateFromServer(flags);
      })
      .catch(() => {
        // bridge 호출 실패 시 localStorage 상태 유지
      });
  }, [bridge, hydrateFromServer]);
}
