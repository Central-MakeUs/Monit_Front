'use client';

import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDateStore } from '@/entities/date';
import { useExpenseSummaryData, MonthlyExpenseInfo } from '@/features/expense-summary';
import { ReportHeader } from './ui/ReportHeader/ReportHeader';
import { ReportOverviewCard } from './ui/ReportOverviewCard/ReportOverviewCard';
import { ReportSummaryCard } from './ui/ReportSummaryCard/ReportSummaryCard';
import { MOCK_REPORT_SUMMARY } from './model/mockReportSummary';
import * as styles from './Report.css';

export interface ReportProps {
  onSettingsClick: () => void;
  onNotificationClick: () => void;
  onViewReport: () => void;
  onViewReportList: () => void;
}

export const Report = ({
  onSettingsClick,
  onNotificationClick,
  onViewReport,
  onViewReportList,
}: ReportProps) => {
  const { currentDate } = useDateStore(useShallow((state) => ({ currentDate: state.currentDate })));

  const { monthlyTotalAmount, isLoading, isFetching } = useExpenseSummaryData({
    monthDate: currentDate,
  });

  return (
    <div className={styles.container}>
      <ReportHeader onSettingsClick={onSettingsClick} onNotificationClick={onNotificationClick} />
      <div className={styles.content}>
        <MonthlyExpenseInfo
          monthlyTotalAmount={monthlyTotalAmount}
          isLoading={isLoading}
          isFetching={isFetching}
          standalone
        />
        <div className={styles.cardSection}>
          <ReportOverviewCard onClick={onViewReportList} />
          <ReportSummaryCard vm={MOCK_REPORT_SUMMARY} onViewReport={onViewReport} />
        </div>
      </div>
    </div>
  );
};
