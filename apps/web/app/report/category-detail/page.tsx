'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryDetailPage } from '@/widgets/report';

function CategoryDetailRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');
  const parsedYear = yearParam ? Number.parseInt(yearParam, 10) : Number.NaN;
  const parsedMonth = monthParam ? Number.parseInt(monthParam, 10) : Number.NaN;
  // year/month는 쿼리스트링이 깨졌을 때도 NaN이 그대로 흘러가지 않도록
  // 유한한 정수에 1~12 범위를 만족할 때만 monthly 모드로 넘긴다.
  const isValidMonthly =
    Number.isFinite(parsedYear) &&
    Number.isFinite(parsedMonth) &&
    parsedMonth >= 1 &&
    parsedMonth <= 12;
  const year = isValidMonthly ? parsedYear : undefined;
  const month = isValidMonthly ? parsedMonth : undefined;
  const periodLabel = isValidMonthly ? `${year}년 ${month}월` : undefined;

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
