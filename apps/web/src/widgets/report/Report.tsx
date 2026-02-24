'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useHomeExpenseData } from '@/features/homeExpenseData';
import { useHomeStore } from '@/widgets/home/model/useHomeStore';
import { MonthlyExpenseInfo } from '@/widgets/home/ui/MonthlyExpenseInfo';
import { ReportHeader } from './ReportHeader';
import * as styles from './Report.css';

export interface ReportProps {
  onSettingsClick: () => void;
}

export const Report = ({ onSettingsClick }: ReportProps) => {
  const { currentDate } = useHomeStore(useShallow((state) => ({ currentDate: state.currentDate })));

  const { monthlyTotalAmount, isLoading, isFetching } = useHomeExpenseData(
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
