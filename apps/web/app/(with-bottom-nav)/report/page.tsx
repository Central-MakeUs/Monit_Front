'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Report } from '@/widgets/report';
import { ROUTES } from '@/shared/constants';

export default function ReportPage() {
  const router = useRouter();

  return (
    <Report
      onSettingsClick={() => router.push(ROUTES.MY)}
      onNotificationClick={() => router.push(ROUTES.NOTIFICATIONS)}
      onViewReport={() => router.push(ROUTES.REPORT_DETAIL)}
      onViewReportList={() => router.push(ROUTES.REPORT_LIST)}
    />
  );
}
