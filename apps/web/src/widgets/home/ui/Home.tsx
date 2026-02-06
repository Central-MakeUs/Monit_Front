'use client';

import React from 'react';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly } from '@/shared/hooks';
import { useHomeStore } from '../model/useHomeStore';
import { useHomeTestMode } from '../dev';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import { TestModeButtons } from '../dev/TestModeButtons';
import * as styles from './Home.css';

export const Home = () => {
  const isMounted = useClientOnly();
  const { testMode, setTestMode, hasExpenses, emptyStateType, expenseCount, totalExpenseAmount } =
    useHomeTestMode();

  const currentDate = useHomeStore((state) => state.currentDate);
  const selectedDate = useHomeStore((state) => state.selectedDate);
  const viewMode = useHomeStore((state) => state.viewMode);
  const setCurrentDate = useHomeStore((state) => state.setCurrentDate);
  const setSelectedDate = useHomeStore((state) => state.setSelectedDate);
  const setViewMode = useHomeStore((state) => state.setViewMode);
  const setDateFromPicker = useHomeStore((state) => state.setDateFromPicker);

  // 개발 환경에서만 TestModeButtons 표시
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const isDevelopment = process.env.NODE_ENV !== 'production';

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <DatePickerFeature currentDate={currentDate} onDateConfirm={setDateFromPicker}>
        {({ onOpen }) => <HomeHeader currentDate={currentDate} onDateButtonClick={onOpen} />}
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

        {isDevelopment && <TestModeButtons testMode={testMode} onTestModeChange={setTestMode} />}
      </div>
    </div>
  );
};
