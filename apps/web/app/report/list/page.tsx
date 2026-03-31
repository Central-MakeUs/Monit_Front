'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ReportListPage } from '@/widgets/report';
import { ROUTES } from '@/shared/constants';

export default function ReportListRoutePage() {
  const router = useRouter();

  return (
    <ReportListPage
      onBack={() => router.push(ROUTES.REPORT)}
      onViewWeeklyReport={(month, week) =>
        router.push(`${ROUTES.REPORT_DETAIL}?month=${encodeURIComponent(month)}&week=${week}`)
      }
      onViewMonthlyReport={(month) =>
        router.push(`${ROUTES.REPORT_DETAIL}?month=${encodeURIComponent(month)}`)
      }
    />
  );
}
