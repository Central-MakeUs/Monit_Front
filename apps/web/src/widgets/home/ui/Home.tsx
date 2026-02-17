'use client';

import React, { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly, useModal } from '@/shared/hooks';
import { ExpenseEditBottomSheet } from '@/features/expense';
import { useHomeExpenseData } from '@/features/homeExpenseData';
import { type ExpenseListDTO } from '@/entities/expense';
import type { WeeklyCalendarSlotProps, MonthlyCalendarSlotProps } from '../model/types';
import { useHomeStore } from '../model/useHomeStore';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import * as styles from './Home.css';

export interface HomeProps {
  onSettingsClick: () => void;
  /** 주간 캘린더 렌더 슬롯 (page에서 widgets/calendar를 주입) */
  renderWeeklyCalendar: (props: WeeklyCalendarSlotProps) => React.ReactNode;
  /** 월간 캘린더 렌더 슬롯 (page에서 widgets/calendar를 주입) */
  renderMonthlyCalendar: (props: MonthlyCalendarSlotProps) => React.ReactNode;
}

export const Home = ({
  onSettingsClick,
  renderWeeklyCalendar,
  renderMonthlyCalendar,
}: HomeProps) => {
  const isMounted = useClientOnly();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedExpense, setSelectedExpense] = useState<ExpenseListDTO | null>(null);

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

  useEffect(() => {
    // 카테고리 추가 페이지에서 돌아온 뒤, 다시 열어야 할 지출 ID가 세션에 저장돼 있으면
    // 최신 expenses에서 해당 지출을 찾아 바텀시트를 다시 연다.
    if (typeof window === 'undefined') return;
    const storedId = sessionStorage.getItem('expense-edit-target-id');
    if (!storedId) return;

    const id = Number(storedId);
    if (Number.isNaN(id)) {
      sessionStorage.removeItem('expense-edit-target-id');
      return;
    }

    const found = expenses.find((exp) => exp.expenseId === id);
    if (!found) return;

    setSelectedExpense(found);
    openModal();
    sessionStorage.removeItem('expense-edit-target-id');
  }, [expenses, openModal]);

  const handleExpenseClick = (expense: ExpenseListDTO) => {
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
          renderWeeklyCalendar={renderWeeklyCalendar}
          renderMonthlyCalendar={renderMonthlyCalendar}
        />

        <ExpenseContent
          hasExpenses={expenses.length > 0}
          emptyStateType={emptyStateType}
          expenseCount={expenseCount}
          totalExpenseAmount={dailyTotalAmount}
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
        selectedDate={selectedDate || new Date()}
      />
    </div>
  );
};
