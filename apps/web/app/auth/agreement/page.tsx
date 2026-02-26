import { Agreement } from '@/features/auth';
import React, { Suspense } from 'react';

export default function AgreementPage() {
  return (
    <Suspense>
      <Agreement />
    </Suspense>
  );
}
