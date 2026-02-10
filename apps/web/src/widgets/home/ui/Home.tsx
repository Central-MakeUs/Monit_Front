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

  // Features 레이어의 훅을 통해 데이터 페칭
  const { monthlyTotalAmount, expenses, hasExpenses, expenseCount, dailyTotalAmount } =
    useHomeExpenseData(selectedDate);

  // emptyStateType 결정 로직
  const getEmptyStateType = (): 'never' | 'today' | 'date' => {
    // hasAnyExpense가 false면 한 번도 지출한 적 없음
    if (!hasExpenses) {
      return 'never';
    }

    // hasAnyExpense가 true인데 현재 선택된 날짜에 지출이 없는 경우
    if (expenses.length === 0) {
      const today = new Date();
      const selected = selectedDate || today;

      // 오늘 날짜인지 확인
      const isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();

      return isToday ? 'today' : 'date';
    }

    // 지출이 있는 경우 (실제로는 EmptyState가 표시되지 않음)
    return 'date';
  };

  const emptyStateType = getEmptyStateType();

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
        />
      </div>

      <ExpenseEditBottomSheet
        isOpen={isOpen}
        expense={selectedExpense}
        onClose={closeModal}
        onConfirm={(updated) => console.log('Confirm edit:', updated)}
        onDelete={(id) => console.log('Delete expense:', id)}
      />
    </div>
  );
};
