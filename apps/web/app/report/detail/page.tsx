'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ReportDetailPage } from '@/widgets/report';

export default function ReportDetailRoutePage() {
  const router = useRouter();

  return <ReportDetailPage onBack={() => router.back()} />;
}
