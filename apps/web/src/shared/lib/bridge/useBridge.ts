'use client';

import { useEffect, useState } from 'react';
import type { AppBridge } from '@repo/bridge';

/**
 * WebView Bridge 훅
 * Native 앱의 브릿지 메서드를 호출할 수 있게 해주는 훅
 */
export const useBridge = () => {
  const [bridge, setBridge] = useState<AppBridge | null>(() => {
    // 초기값을 함수로 설정하여 클라이언트에서만 실행
    if (typeof window !== 'undefined') {
      const isWebView = !!(window as unknown as { ReactNativeWebView?: unknown })
        .ReactNativeWebView;
      const bridgeObj = (window as unknown as { bridge?: AppBridge }).bridge;

      if (isWebView && bridgeObj) {
        return bridgeObj;
      }
    }
    return null;
  });

  useEffect(() => {
    const win = typeof window === 'undefined' ? null : window;
    if (!win) return;

    const isWebView = !!(win as unknown as { ReactNativeWebView?: unknown }).ReactNativeWebView;
    const bridgeObj = (win as unknown as { bridge?: AppBridge }).bridge;

    if (isWebView && bridgeObj) {
      setBridge(bridgeObj);
    }

    // 브릿지가 나중에 준비되면(initializeBridge 완료) 갱신
    const onBridgeReady = () => {
      const b = (win as unknown as { bridge?: AppBridge }).bridge;
      if (b) setBridge(b);
    };
    win.addEventListener('bridge-ready', onBridgeReady);
    return () => win.removeEventListener('bridge-ready', onBridgeReady);
  }, []);

  return bridge;
};
