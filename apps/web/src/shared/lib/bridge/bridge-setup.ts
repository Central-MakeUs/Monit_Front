'use client';

import { linkBridge } from '@webview-bridge/web';
import type { AppBridge } from '@repo/bridge';

const BRIDGE_RETRY_COUNT = 5;
const BRIDGE_RETRY_DELAY_MS = 500;

/**
 * 웹뷰 브릿지 초기화 (재시도 포함)
 * 네이티브 앱의 브릿지와 웹을 연결
 */
export const initializeBridge = async (): Promise<void> => {
  if (typeof window === 'undefined') return;

  for (let i = 0; i < BRIDGE_RETRY_COUNT; i++) {
    try {
      const bridge = linkBridge({
        throwOnError: true,
        timeout: 1000 * 60 * 10,
      }) as unknown as AppBridge;

      (window as unknown as { bridge: AppBridge }).bridge = bridge;
      window.dispatchEvent(new CustomEvent('bridge-ready'));
      return;
    } catch (e) {
      console.warn('[WEB] linkBridge failed', i + 1, e);
      if (i < BRIDGE_RETRY_COUNT - 1) {
        await new Promise((r) => setTimeout(r, BRIDGE_RETRY_DELAY_MS));
      }
    }
  }
};
