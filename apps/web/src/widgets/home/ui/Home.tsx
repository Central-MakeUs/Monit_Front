'use client';

import React, { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { DatePickerFeature } from '@/features/datePickerModal';
import { useClientOnly, useModal } from '@/shared/hooks';
import { ExpenseEditBottomSheet } from '@/features/expense';
import { useHomeExpenseData } from '@/features/homeExpenseData';
import { useRetrospectBannerProps } from '@/features/retrospectBanner';
import { type ExpenseListDTO } from '@/entities/expense';
import type { WeeklyCalendarSlotProps, MonthlyCalendarSlotProps } from '../model/types';
import { useHomeStore } from '../model/useHomeStore';
import { HomeHeader } from './HomeHeader';
import { MonthlyExpenseInfo } from './MonthlyExpenseInfo';
import { CalendarSection } from './CalendarSection';
import { ExpenseContent } from './ExpenseContent';
import * as styles from './Home.css';
import { expenseEditNavigation } from '@/features/expense/lib/expenseEditNavigation';
import { Banner } from '@/shared/ui/banner';

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

  // Features 레이어: calendar API로 월별 금액(currentDate 기준), daily API로 일별 내역(selectedDate 기준)
  const {
    monthlyTotalAmount,
    expenses,
    hasExpenses,
    expenseCount,
    dailyTotalAmount,
    emptyStateType,
    isLoading,
    isFetching,
    bannerMessage,
    bannerSubMessage,
    retrospectCompleted,
    dailyDate,
  } = useHomeExpenseData(selectedDate, currentDate);

  const bannerProps = useRetrospectBannerProps({
    selectedDate,
    dailyDate: dailyDate ?? undefined,
    hasExpenses,
    retrospectCompleted,
    bannerMessage,
    bannerSubMessage,
  });

  // 달력에서 달이 바뀌면 보이는 달 = 선택한 달로 맞춰서, useHomeExpenseData의 “선택한 날짜 달 변경” 리페치가 바로 동작하도록 함
  useEffect(() => {
    const targetId = expenseEditNavigation.consumeTargetExpenseId();
    if (!targetId) return;

    const found = expenses.find((exp) => exp.expenseId === targetId);
    if (!found) return;

    setSelectedExpense(found);
    openModal();
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
        <Banner {...bannerProps} onClickReview={() => alert('돌아보기 클릭!')} />
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
