'use client';

import React from 'react';
import { Home } from '@/widgets/home';
import { WelcomeModal, OnboardingTour } from '@/features/onboarding';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Home />

      {/* 온보딩 전용 컴포넌트 */}
      <WelcomeModal />
      <OnboardingTour />
    </>
  );
}
