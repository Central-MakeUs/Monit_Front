'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReportDetailPage } from '@/widgets/report';
import { ROUTES } from '@/shared/constants';

/**
 * ?month=YYYY-MM          → "YYYY년 M월"
 * ?month=YYYY-MM&week=N   → "YYYY년 M월 N주차"
 */
function buildPeriodLabel(month: string | null, week: string | null): string | undefined {
  if (!month) return undefined;
  const [yearStr, monStr] = month.split('-');
  const y = parseInt(yearStr ?? '0', 10);
  const m = parseInt(monStr ?? '1', 10);
  if (week) return `${y}년 ${m}월 ${week}주차`;
  return `${y}년 ${m}월`;
}

export default function ReportDetailRoutePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const periodLabel = buildPeriodLabel(searchParams.get('month'), searchParams.get('week'));

  return (
    <ReportDetailPage
      onBack={() => router.back()}
      onViewCategoryDetail={(categoryId) =>
        router.push(`${ROUTES.REPORT_CATEGORY_DETAIL}?categoryId=${categoryId}`)
      }
      periodLabel={periodLabel}
    />
  );
}
