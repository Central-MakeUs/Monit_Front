'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useExpenseSummaryData, MonthlyExpenseInfo } from '@/features/expense-summary';
import { expenseReportQueries } from '@/entities/expenseReport';
import { ROUTES } from '@/shared/constants/routes';
import { ReportHeader } from './ui/ReportHeader/ReportHeader';
import { ReportOverviewCard } from './ui/ReportOverviewCard/ReportOverviewCard';
import { ReportSummaryCard } from './ui/ReportSummaryCard/ReportSummaryCard';
import { ReportArrivalCard } from './ui/ReportArrivalCard/ReportArrivalCard';
import { useReportArrivalCard } from './model/useReportArrivalCard';
import { toReportSummaryFromApi } from './model/toReportSummaryFromApi';
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
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const { monthlyTotalAmount, isLoading, isFetching } = useExpenseSummaryData({
    monthDate: today,
  });

  const { data: summaryRes } = useQuery(expenseReportQueries.summaryQuery());
  const summaryVM = useMemo(() => {
    const weekly = summaryRes?.result?.weeklyReports?.[0];
    return weekly ? toReportSummaryFromApi(weekly) : null;
  }, [summaryRes]);

  const reportArrival = useReportArrivalCard();

  const handleArrivalConfirm = () => {
    reportArrival.onConfirm();
    const month = `${reportArrival.year}-${String(reportArrival.month).padStart(2, '0')}`;
    router.push(`${ROUTES.REPORT_DETAIL}?month=${encodeURIComponent(month)}`);
  };

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
        {reportArrival.visible && (
          <div className={styles.cardSection}>
            <ReportArrivalCard
              year={reportArrival.year}
              month={reportArrival.month}
              onConfirm={handleArrivalConfirm}
              onDismiss={reportArrival.onDismiss}
            />
          </div>
        )}
        <div className={styles.cardSection}>
          <ReportOverviewCard onClick={onViewReportList} />
          {summaryVM && <ReportSummaryCard vm={summaryVM} onViewReport={onViewReport} />}
        </div>
      </div>
    </div>
  );
};
