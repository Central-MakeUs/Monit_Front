'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryDetailPage } from '@/widgets/report';

function CategoryDetailRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <CategoryDetailPage
      onBack={() => router.back()}
      emotionType={searchParams.get('emotionType') ?? undefined}
      start={searchParams.get('start') ?? undefined}
      end={searchParams.get('end') ?? undefined}
    />
  );
}

export default function CategoryDetailRoutePage() {
  return (
    <Suspense>
      <CategoryDetailRouteContent />
    </Suspense>
  );
}
