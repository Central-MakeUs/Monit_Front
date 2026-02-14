'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from './query-client';
import { ToastContainer } from '@/shared/ui/toast';
import { AuthGuard } from '@/shared/lib/auth/AuthGuard';
import { initializeBridge } from '@/shared/lib/bridge';
import { type ReactNode, useEffect } from 'react';

export function Providers({ children }: { children: ReactNode }): ReactNode {
  const queryClient = getQueryClient();

  // 브릿지 초기화
  useEffect(() => {
    initializeBridge();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard>{children}</AuthGuard>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
