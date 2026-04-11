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
import { ReportLoadingSkeleton } from './ui/ReportLoadingSkeleton';
import { useReportArrivalCard } from './model/useReportArrivalCard';
import { toReportSummaryFromApi } from './model/toReportSummaryFromApi';
import * as styles from './Report.css';

export interface ReportProps {
  onSettingsClick: () => void;
  onNotificationClick: () => void;
  onViewReportList: () => void;
}

const parseWeekRange = (
  weekRange: string | undefined
): { year: number; month: number; week: number } | null => {
  if (!weekRange) return null;
  const match = weekRange.match(/(\d{4})년\s*(\d{1,2})월\s*(\d+)주차/);
  if (!match) return null;
  const year = Number.parseInt(match[1] ?? '', 10);
  const month = Number.parseInt(match[2] ?? '', 10);
  const week = Number.parseInt(match[3] ?? '', 10);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(week) ||
    month < 1 ||
    month > 12 ||
    week < 1
  ) {
    return null;
  }
  return { year, month, week };
};

export const Report = ({ onSettingsClick, onNotificationClick, onViewReportList }: ReportProps) => {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const { monthlyTotalAmount, isLoading, isFetching } = useExpenseSummaryData({
    monthDate: today,
  });

  const { data: summaryRes, isLoading: isSummaryLoading } = useQuery(
    expenseReportQueries.summaryQuery()
  );
  // API는 오래된 주차 → 최신 주차 오름차순으로 내려주는데,
  // 화면에선 최신 주차가 가장 위에 오도록 역순으로 그린다.
  // weekRange 라벨에서 year/month/week를 미리 파싱해 두고, 파싱 실패한 카드는
  // 라우팅에 필요한 정보가 없으므로 클릭을 막는다.
  const summaryCards = useMemo(
    () =>
      [...(summaryRes?.result?.weeklyReports ?? [])].reverse().map((weekly) => {
        const period = parseWeekRange(weekly.weekRange);
        return {
          key: weekly.weekRange ?? `${weekly.weekPeriod ?? ''}`,
          period,
          vm: toReportSummaryFromApi(weekly),
        };
      }),
    [summaryRes]
  );

  const reportArrival = useReportArrivalCard();

  const handleArrivalConfirm = () => {
    reportArrival.onConfirm();
    const month = `${reportArrival.year}-${String(reportArrival.month).padStart(2, '0')}`;
    router.push(`${ROUTES.REPORT_DETAIL}?month=${encodeURIComponent(month)}`);
  };

  const handleViewReport = (period: { year: number; month: number; week: number }) => {
    const monthParam = `${period.year}-${String(period.month).padStart(2, '0')}`;
    router.push(
      `${ROUTES.REPORT_DETAIL}?month=${encodeURIComponent(monthParam)}&week=${period.week}`
    );
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
          {isSummaryLoading ? (
            <ReportLoadingSkeleton />
          ) : (
            <>
              <ReportOverviewCard onClick={onViewReportList} />
              {summaryCards.map((card) => (
                <ReportSummaryCard
                  key={card.key}
                  vm={card.vm}
                  onViewReport={card.period ? () => handleViewReport(card.period!) : undefined}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
