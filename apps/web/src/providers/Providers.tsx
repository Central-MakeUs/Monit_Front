'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './query-client';
import { ToastContainer } from '@/shared/ui/toast';
import { AuthGuard } from '@/shared/lib/auth/AuthGuard';
import { initializeBridge } from '@/shared/lib/bridge';
import { useAuthStore } from '@/shared/stores/authStore';
import { type ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }): ReactNode {
  const queryClient = getQueryClient();

  useEffect(() => {
    // 브릿지 초기화 (재시도 내부 처리)
    void initializeBridge();
    // authStore: localStorage에서 복원 (skipHydration 사용 시 필요)
    useAuthStore.persist.rehydrate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
