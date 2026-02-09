'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly } from '@/shared/hooks';
import { useHomeStore } from '../model/useHomeStore';
import { HOME_MOCK_DATA } from '../model/mock';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import * as styles from './Home.css';

export interface HomeProps {
  onSettingsClick: () => void;
}

export const Home = ({ onSettingsClick }: HomeProps) => {
  const isMounted = useClientOnly();

  const {
    currentDate,
    selectedDate,
    viewMode,
    setCurrentDate,
    setSelectedDate,
    setViewMode,
    setDateFromPicker,
  } = useHomeStore(
    useShallow((state) => ({
      currentDate: state.currentDate,
      selectedDate: state.selectedDate,
      viewMode: state.viewMode,
      setCurrentDate: state.setCurrentDate,
      setSelectedDate: state.setSelectedDate,
      setViewMode: state.setViewMode,
      setDateFromPicker: state.setDateFromPicker,
    }))
  );

  const { hasExpenses, emptyStateType, expenseCount, totalExpenseAmount } = HOME_MOCK_DATA;

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
            onSettingsClick={onSettingsClick}
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
