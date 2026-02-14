'use client';

import { useEffect, useState } from 'react';
import { getPlatformType } from './utils';

/**
 * 플랫폼 정보 훅
 */
export const usePlatform = () => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>(() => {
    // 초기값을 함수로 설정하여 클라이언트에서만 실행
    if (typeof window !== 'undefined') {
      return getPlatformType();
    }
    return 'web';
  });

  useEffect(() => {
    const detectedPlatform = getPlatformType();
    setPlatform(detectedPlatform);
  }, []);

  return platform;
};
