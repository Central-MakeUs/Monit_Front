'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useDateStore } from '@/entities/date';
import { useExpenseSummaryData, MonthlyExpenseInfo } from '@/features/expense-summary';
import { ROUTES } from '@/shared/constants/routes';
import { ReportHeader } from './ui/ReportHeader/ReportHeader';
import { ReportOverviewCard } from './ui/ReportOverviewCard/ReportOverviewCard';
import { ReportSummaryCard } from './ui/ReportSummaryCard/ReportSummaryCard';
import { ReportArrivalCard } from './ui/ReportArrivalCard/ReportArrivalCard';
import { useReportArrivalCard } from './model/useReportArrivalCard';
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
  const router = useRouter();
  const { currentDate } = useDateStore(useShallow((state) => ({ currentDate: state.currentDate })));

  const { monthlyTotalAmount, isLoading, isFetching } = useExpenseSummaryData({
    monthDate: currentDate,
  });

  const reportArrival = useReportArrivalCard();

  const handleArrivalConfirm = () => {
    // TODO: API 연동 시 아래 주석 해제
    // POST /api/expense/report_arrivals/{year}/{month}/check
    // 유저가 특정 월의 분석 리포트를 확인했음을 기록
    // await checkMonthlyReport(reportArrival.year, reportArrival.month);
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
          <ReportSummaryCard vm={MOCK_REPORT_SUMMARY} onViewReport={onViewReport} />
        </div>
      </div>
    </div>
  );
};
