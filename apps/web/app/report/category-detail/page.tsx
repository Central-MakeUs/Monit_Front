'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryDetailPage } from '@/widgets/report';

function CategoryDetailRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');
  const year = yearParam ? parseInt(yearParam, 10) : undefined;
  const month = monthParam ? parseInt(monthParam, 10) : undefined;
  const periodLabel = year != null && month != null ? `${year}년 ${month}월` : undefined;

  return (
    <CategoryDetailPage
      onBack={() => router.back()}
      emotionType={searchParams.get('emotionType') ?? undefined}
      start={searchParams.get('start') ?? undefined}
      end={searchParams.get('end') ?? undefined}
      year={year}
      month={month}
      periodLabel={periodLabel}
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
