'use client';

import React from 'react';
import { useClientOnly } from '@/shared/hooks';
import { Home } from '@/widgets/home';

export default function HomePage(): React.JSX.Element {
  const isMounted = useClientOnly();

  if (!isMounted) return <div />;

  return <Home />;
}
