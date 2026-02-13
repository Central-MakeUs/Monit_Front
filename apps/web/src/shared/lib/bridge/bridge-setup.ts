'use client';

import { linkBridge } from '@webview-bridge/web';
import type { AppBridge } from '@repo/bridge';

/**
 * 웹뷰 브릿지 초기화
 * 네이티브 앱의 브릿지와 웹을 연결
 */
export const initializeBridge = () => {
  if (typeof window === 'undefined') return;

  try {
    // 브릿지 연결
    const bridge = linkBridge({
      throwOnError: true,
      timeout: 120000, // 2분 타임아웃 (카카오 로그인 대기 시간 고려)
    }) as unknown as AppBridge;

    // window 객체에 브릿지 저장
    (window as unknown as { bridge: AppBridge }).bridge = bridge;
  } catch {
    // 브릿지 초기화 실패 (웹 환경)
  }
};
