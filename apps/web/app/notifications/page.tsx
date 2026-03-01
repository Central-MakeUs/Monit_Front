'use client';

import { ROUTES } from '@/shared/constants';
import { Notifications } from '@/widgets/notifications';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotificationsPage() {
  const route = useRouter();
  return (
    <>
      <Notifications onBackClick={() => route.push(ROUTES.HOME)} />
    </>
  );
}
