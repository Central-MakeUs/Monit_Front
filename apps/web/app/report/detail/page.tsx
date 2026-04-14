'use client';

import React, { Suspense } from 'react';
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

function ReportDetailRouteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const monthParam = searchParams.get('month');
  const weekParam = searchParams.get('week');

  const periodLabel = buildPeriodLabel(monthParam, weekParam);

  const year = monthParam ? parseInt(monthParam.split('-')[0] ?? '0', 10) : undefined;
  const month = monthParam ? parseInt(monthParam.split('-')[1] ?? '1', 10) : undefined;

  return (
    <ReportDetailPage
      onBack={() => router.back()}
      onViewCategoryDetail={(args) => {
        const params = new URLSearchParams({ emotionType: args.emotionType });
        if (args.mode === 'weekly') {
          params.set('start', args.start.replaceAll('.', '-'));
          params.set('end', args.end.replaceAll('.', '-'));
        } else {
          params.set('year', String(args.year));
          params.set('month', String(args.month));
        }
        router.push(`${ROUTES.REPORT_CATEGORY_DETAIL}?${params.toString()}`);
      }}
      periodLabel={periodLabel}
      year={year}
      month={month}
      week={weekParam ? parseInt(weekParam, 10) : undefined}
    />
  );
}

export default function ReportDetailRoutePage() {
  return (
    <Suspense>
      <ReportDetailRouteContent />
    </Suspense>
  );
}
