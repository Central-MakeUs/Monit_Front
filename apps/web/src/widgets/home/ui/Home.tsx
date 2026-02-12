'use client';

import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly, useModal } from '@/shared/hooks';
import { ExpenseEditBottomSheet } from '@/features/expense';
import { useHomeExpenseData } from '@/features/homeExpenseData';
import { useHomeStore } from '../model/useHomeStore';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import { Expense } from './ExpenseList';
import * as styles from './Home.css';

export interface HomeProps {
  onSettingsClick: () => void;
}

export const Home = ({ onSettingsClick }: HomeProps) => {
  const isMounted = useClientOnly();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

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

  // Features 레이어의 훅을 통해 데이터 페칭 및 로직 처리
  const {
    monthlyTotalAmount,
    expenses,
    expenseCount,
    dailyTotalAmount,
    emptyStateType,
    isLoading,
    isFetching,
  } = useHomeExpenseData(selectedDate);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    openModal();
  };

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
        <MonthlyExpenseInfo
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          monthlyTotalAmount={monthlyTotalAmount}
          isLoading={isLoading}
          isFetching={isFetching}
        />

        <CalendarSection
          viewMode={viewMode}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onMonthChange={setCurrentDate}
        />

        <ExpenseContent
          hasExpenses={expenses.length > 0}
          emptyStateType={emptyStateType}
          expenseCount={expenseCount}
          totalExpenseAmount={dailyTotalAmount}
          selectedDate={selectedDate}
          expenses={expenses}
          onExpenseClick={handleExpenseClick}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </div>

      <ExpenseEditBottomSheet
        isOpen={isOpen}
        expense={selectedExpense}
        onClose={closeModal}
        onConfirm={(updated) => console.log('Confirm edit:', updated)}
        onDelete={(id) => console.log('Delete expense:', id)}
        selectedDate={selectedDate || new Date()}
      />
    </div>
  );
};
