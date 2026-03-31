'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ReportDetailPage } from '@/widgets/report';
import { ROUTES } from '@/shared/constants';

export default function ReportDetailRoutePage() {
  const router = useRouter();

  return (
    <ReportDetailPage
      onBack={() => router.back()}
      onViewCategoryDetail={(categoryId) =>
        router.push(`${ROUTES.REPORT_CATEGORY_DETAIL}?categoryId=${categoryId}`)
      }
    />
  );
}
