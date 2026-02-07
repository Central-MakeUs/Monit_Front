'use client';

import React from 'react';
import { Home } from '@/widgets/home';
import { WelcomeModal, OnboardingTour } from '@/features/onboarding';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Home />
      <WelcomeModal />
      <OnboardingTour />
    </>
  );
}
