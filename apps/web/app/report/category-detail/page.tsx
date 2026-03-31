'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CategoryDetailPage } from '@/widgets/report';

export default function CategoryDetailRoutePage() {
  const router = useRouter();

  return <CategoryDetailPage onBack={() => router.back()} />;
}
