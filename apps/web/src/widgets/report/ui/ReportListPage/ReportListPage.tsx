'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TopBar, Text, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { expenseReportQueries, type MonthlyReportSummaryResponse } from '@/entities/expenseReport';
import { MonthlyReportCard } from './MonthlyReportCard';
import * as styles from './ReportListPage.css';

export interface ReportListPageProps {
  onBack: () => void;
  onViewWeeklyReport?: (year: number, month: number, week: number) => void;
  onViewMonthlyReport?: (year: number, month: number) => void;
}

/**
 * year, month → "YY년 M월"  (예: 2026, 2 → "26년 2월")
 */
function formatMonthLabel(year: number, month: number): string {
  const yy = String(year).slice(2);
  return `${yy}년 ${month}월`;
}

interface MonthlyReportCardItemProps {
  report: MonthlyReportSummaryResponse;
  onViewWeeklyReport?: (year: number, month: number, week: number) => void;
  onViewMonthlyReport?: (year: number, month: number) => void;
}

/**
 * 카드 펼침 시점에만 total_open_status를 조회해서
 * isOpened=true인 주차/월간 항목만 노출
 */
const MonthlyReportCardItem = ({
  report,
  onViewWeeklyReport,
  onViewMonthlyReport,
}: MonthlyReportCardItemProps): React.JSX.Element => {
  const rawYear = Number(report.year);
  const y = rawYear < 100 ? 2000 + rawYear : rawYear;
  const m = Number(report.month);

  const [enabled, setEnabled] = useState(false);
  const { data } = useQuery({
    ...expenseReportQueries.totalOpenStatusQuery(y, m),
    enabled,
  });

  const weeklyItems =
    data?.weeklyReports
      ?.filter((w) => w.isOpened && w.week != null)
      .map((w) => ({
        label: `${m}월 ${w.week}주차 리포트`,
        onClick: () => onViewWeeklyReport?.(y, m, w.week as number),
      })) ?? [];

  const reportItems = data?.monthlyIsOpened
    ? [
        ...weeklyItems,
        {
          label: `${m}월 월간 리포트`,
          onClick: () => onViewMonthlyReport?.(y, m),
        },
      ]
    : weeklyItems;

  return (
    <MonthlyReportCard
      monthLabel={formatMonthLabel(y, m)}
      amountText={formatCurrency(report.totalAmount ?? 0)}
      reportItems={reportItems}
      onExpandedChange={(expanded) => {
        if (expanded) setEnabled(true);
      }}
    />
  );
};

export const ReportListPage = ({
  onBack,
  onViewWeeklyReport,
  onViewMonthlyReport,
}: ReportListPageProps): React.JSX.Element => {
  const { data: reports = [] } = useQuery(expenseReportQueries.monthlyListQuery());

  // year가 "26" / "2026" 양쪽으로 올 수 있어 4자리로 정규화
  const normalizeYear = (y: string | number | undefined): number => {
    const n = Number(y ?? 0);
    return n < 100 ? 2000 + n : n;
  };

  const sorted = [...reports]
    .filter((r) => r.year != null && r.month != null)
    .sort((a, b) => {
      const ay = normalizeYear(a.year),
        by = normalizeYear(b.year);
      if (ay !== by) return by - ay;
      return Number(b.month ?? 0) - Number(a.month ?? 0);
    });

  const grouped = sorted.reduce<Record<number, typeof sorted>>((acc, report) => {
    const yearKey = normalizeYear(report.year);
    if (!acc[yearKey]) acc[yearKey] = [];
    (acc[yearKey] as typeof sorted).push(report);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className={styles.container}>
      <TopBar
        left={
          <button
            type='button'
            className={styles.iconButton}
            onClick={onBack}
            aria-label='뒤로 가기'>
            <IcLeftChevron />
          </button>
        }
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            분석 리포트
          </Text>
        }
      />

      <div className={styles.scrollArea}>
        {years.map((year) => (
          <section key={year} className={styles.yearGroup}>
            <Text variant='b2' color={vars.color.text.secondary} className={styles.yearLabel}>
              {year}년
            </Text>
            {(grouped[year] ?? []).map((report) => (
              <MonthlyReportCardItem
                key={`${report.year}-${report.month}`}
                report={report}
                onViewWeeklyReport={onViewWeeklyReport}
                onViewMonthlyReport={onViewMonthlyReport}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
