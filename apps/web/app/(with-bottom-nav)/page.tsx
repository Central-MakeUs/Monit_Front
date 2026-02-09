'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/widgets/home';
import { WelcomeModal, OnboardingTour } from '@/features/onboarding';
import { ROUTES } from '@/shared/constants';

export default function HomePage(): React.JSX.Element {
  const router = useRouter();

  return (
    <>
      <Home onSettingsClick={() => router.push(ROUTES.MY)} />

      {/* 온보딩 전용 컴포넌트 */}
      <WelcomeModal />
      <OnboardingTour />
    </>
  );
}
