'use client';

import { useState, useEffect } from 'react';

/**
 * SSR 환경에서 클라이언트 전용 렌더링을 위한 훅
 *
 * @returns isMounted - 클라이언트에서 마운트되었는지 여부
 *
 * @example
 * ```tsx
 * const isMounted = useClientOnly();
 * if (!isMounted) return null;
 * return <ClientOnlyComponent />;
 * ```
 */
export const useClientOnly = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
