import type { Preview } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef } from 'react';
import './fonts.css.ts';
import '../src/shared/styles/global.css.ts';
import './storybook-override.css';

/**
 * React Query Decorator for Storybook
 * Chromatic/Storybook에서 react-query를 사용하는 컴포넌트를 위한 Provider
 */
const WithReactQuery = (Story: () => ReactNode) => {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          // Storybook/Chromatic에서는 자동 refetch 비활성화
          staleTime: Infinity,
          gcTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchOnMount: false,
          retry: false,
        },
      },
    });
  }

  useEffect(() => {
    return () => {
      queryClientRef.current?.clear();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Story />
    </QueryClientProvider>
  );
};

const preview: Preview = {
  decorators: [WithReactQuery],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
