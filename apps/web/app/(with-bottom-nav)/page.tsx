'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/widgets/home';
import { WeeklyCalendar, MonthlyCalendar } from '@/widgets/calendar';
import { WelcomeModal, OnboardingTour } from '@/features/onboarding';
import { ROUTES } from '@/shared/constants';
import { useAuthStore } from '@/shared/stores/authStore';

export default function HomePage(): React.JSX.Element {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleExpireAccessTokenAndReload = () => {
    // 리이슈 테스트: 액세스만 비우면 401 → 네이티브 reissue 시도
    setAccessToken('');
    window.location.reload();
  };

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <>
      <Home
        onSettingsClick={() => router.push(ROUTES.MY)}
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

      {/* 개발 전용: 액세스토큰 만료 시뮬레이션 + 새로고침 (리이슈 테스트) */}
      {isDev && (
        <button
          type='button'
          onClick={handleExpireAccessTokenAndReload}
          style={{
            position: 'fixed',
            bottom: 100,
            right: 16,
            zIndex: 9999,
            padding: '8px 12px',
            fontSize: 12,
            backgroundColor: '#ff6b6b',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}>
          [DEV] 토큰 만료 + 새로고침
        </button>
      )}
    </>
  );
}
