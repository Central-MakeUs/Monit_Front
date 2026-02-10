'use client';

import { useEffect, useState } from 'react';
import { getPlatformType } from './utils';

/**
 * 플랫폼 정보 훅
 */
export const usePlatform = () => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');

  useEffect(() => {
    setPlatform(getPlatformType());
  }, []);

  return platform;
};
