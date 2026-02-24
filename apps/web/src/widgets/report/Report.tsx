'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDateStore } from '@/entities/date';
import { useExpenseSummaryData, MonthlyExpenseInfo } from '@/features/expense-summary';
import { ReportHeader } from './ui/ReportHeader/ReportHeader';
import * as styles from './Report.css';

export interface ReportProps {
  onSettingsClick: () => void;
}

export const Report = ({ onSettingsClick }: ReportProps) => {
  const { currentDate } = useDateStore(useShallow((state) => ({ currentDate: state.currentDate })));

  const { monthlyTotalAmount, isLoading, isFetching } = useExpenseSummaryData(
    currentDate,
    currentDate
  );

  return (
    <div className={styles.container}>
      <ReportHeader onSettingsClick={onSettingsClick} />
      <div className={styles.content}>
        <MonthlyExpenseInfo
          monthlyTotalAmount={monthlyTotalAmount}
          isLoading={isLoading}
          isFetching={isFetching}
          standalone
        />
      </div>
    </div>
  );
};
