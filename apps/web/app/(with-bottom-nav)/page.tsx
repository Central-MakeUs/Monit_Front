'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/widgets/home';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
import { WelcomeModal, OnboardingTour, useOnboardingInit } from '@/features/onboarding';
import { ROUTES } from '@/shared/constants';

export default function HomePage(): React.JSX.Element {
  const router = useRouter();
  useOnboardingInit();

  return (
    <>
      <Home
        onSettingsClick={() => router.push(ROUTES.MY)}
        onNotificationClick={() => router.push(ROUTES.NOTIFICATIONS)}
        renderWeeklyCalendar={(props) => <WeeklyCalendar {...props} />}
        renderMonthlyCalendar={({ renderDateText, ...props }) => (
          <MonthlyCalendar
            {...props}
            variant='home'
            showText={true}
            renderDateText={renderDateText}
          />
        )}
      />

      {/* 온보딩 전용 컴포넌트 */}
      <WelcomeModal />
      <OnboardingTour />
    </>
  );
}
