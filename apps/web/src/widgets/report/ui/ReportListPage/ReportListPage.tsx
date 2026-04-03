'use client';

import React from 'react';
import { TopBar, Text, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { MOCK_MONTHLY_REPORT_LIST } from '../../model/mockMonthlyReportList';
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

/**
 * year, month → 해당 월의 주 수
 * 규칙: 1일이 월~목이면 그 주가 1주차, 1일이 금~일이면 그 주는 전달의 마지막 주
 * = 해당 월에 목요일이 몇 번 있는지로 계산
 * TODO: 백엔드 source of truth라면 프론트에서 월 기준으로 직접 주차를 계산하지 않는 방향이 안전할 것 같아 이후 리팩토링
 */
function getWeeksInMonth(year: number, month: number): number {
  const daysInMonth = new Date(year, month, 0).getDate();
  // getDay(): 0=일, 1=월, ..., 4=목, 5=금, 6=토
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const firstThursday = 1 + ((4 - firstDayOfWeek + 7) % 7);
  return Math.floor((daysInMonth - firstThursday) / 7) + 1;
}

export const ReportListPage = ({
  onBack,
  onViewWeeklyReport,
  onViewMonthlyReport,
}: ReportListPageProps): React.JSX.Element => {
  const reports = MOCK_MONTHLY_REPORT_LIST;

  const sorted = [...reports]
    .filter((r) => r.year != null && r.month != null)
    .sort((a, b) => {
      const ay = Number(a.year ?? 0),
        by = Number(b.year ?? 0);
      if (ay !== by) return by - ay;
      return Number(b.month ?? 0) - Number(a.month ?? 0);
    });

  const grouped = sorted.reduce<Record<number, typeof sorted>>((acc, report) => {
    const y = Number(report.year);
    if (!acc[y]) acc[y] = [];
    (acc[y] as typeof sorted).push(report);
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
            {(grouped[year] ?? []).map((report) => {
              const y = Number(report.year);
              const m = Number(report.month);
              const weekCount = getWeeksInMonth(y, m);
              const weeklyItems = Array.from({ length: weekCount }, (_, i) => ({
                label: `${m}월 ${i + 1}주차 리포트`,
                onClick: () => onViewWeeklyReport?.(y, m, i + 1),
              }));
              const monthlyItem = {
                label: `${m}월 월간 리포트`,
                onClick: () => onViewMonthlyReport?.(y, m),
              };
              return (
                <MonthlyReportCard
                  key={`${y}-${m}`}
                  monthLabel={formatMonthLabel(y, m)}
                  amountText={formatCurrency(report.totalAmount ?? 0)}
                  reportItems={[...weeklyItems, monthlyItem]}
                />
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
};
