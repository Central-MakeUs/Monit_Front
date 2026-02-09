'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly } from '@/shared/hooks';
import { useHomeStore } from '../model/useHomeStore';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import * as styles from './Home.css';

export const Home = () => {
  const router = useRouter();
  const isMounted = useClientOnly();

  const currentDate = useHomeStore((state) => state.currentDate);
  const selectedDate = useHomeStore((state) => state.selectedDate);
  const viewMode = useHomeStore((state) => state.viewMode);
  const setCurrentDate = useHomeStore((state) => state.setCurrentDate);
  const setSelectedDate = useHomeStore((state) => state.setSelectedDate);
  const setViewMode = useHomeStore((state) => state.setViewMode);
  const setDateFromPicker = useHomeStore((state) => state.setDateFromPicker);

  // TODO: API 연동 후 실제 데이터로 교체
  const hasExpenses = false;
  const emptyStateType = 'date';
  const expenseCount = 0;
  const totalExpenseAmount = 0;

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DatePickerFeature currentDate={currentDate} onDateConfirm={setDateFromPicker}>
        {({ onOpen }) => (
          <HomeHeader
            currentDate={currentDate}
            onDateButtonClick={onOpen}
            onSettingsClick={() => router.push('/my')}
          />
        )}
      </DatePickerFeature>

      <div className={styles.content}>
        <MonthlyExpenseInfo viewMode={viewMode} onViewModeChange={setViewMode} />

        <CalendarSection
          viewMode={viewMode}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onMonthChange={setCurrentDate}
        />

        <ExpenseContent
          hasExpenses={hasExpenses}
          emptyStateType={emptyStateType}
          expenseCount={expenseCount}
          totalExpenseAmount={totalExpenseAmount}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
};
