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
  onViewWeeklyReport?: (month: string, week: number) => void;
  onViewMonthlyReport?: (month: string) => void;
}

/**
 * "YYYY-MM" → "YY년 M월"  (예: "2026-02" → "26년 2월")
 */
function formatMonthLabel(month: string): string {
  const parts = month.split('-');
  const year = parts[0] ?? '';
  const mon = parts[1] ?? '1';
  const yy = year.slice(2);
  const m = String(parseInt(mon, 10));
  return `${yy}년 ${m}월`;
}

/**
 * "YYYY-MM" → 연도 숫자 (예: "2026-02" → 2026)
 */
function extractYear(month: string): number {
  return parseInt(month.split('-')[0] ?? '0', 10);
}

/**
 * "YYYY-MM" → 해당 월의 주 수
 * 규칙: 1일이 월~목이면 그 주가 1주차, 1일이 금~일이면 그 주는 전달의 마지막 주
 * = 해당 월에 목요일이 몇 번 있는지로 계산
 * TODO: 백엔드 source of truth라면 프론트에서 월 기준으로 직접 주차를 계산하지 않는 방향이 안전할 것 같아 이후 리팩토링
 */
function getWeeksInMonth(yearMonth: string): number {
  const parts = yearMonth.split('-');
  const year = parseInt(parts[0] ?? '0', 10);
  const month = parseInt(parts[1] ?? '1', 10);
  const daysInMonth = new Date(year, month, 0).getDate();
  // getDay(): 0=일, 1=월, ..., 4=목, 5=금, 6=토
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const firstThursday = 1 + ((4 - firstDayOfWeek + 7) % 7);
  return Math.floor((daysInMonth - firstThursday) / 7) + 1;
}

/**
 * "YYYY-MM" → "M" (예: "2026-02" → "2")
 */
function extractMonthNumber(yearMonth: string): string {
  return String(parseInt(yearMonth.split('-')[1] ?? '1', 10));
}

export const ReportListPage = ({
  onBack,
  onViewWeeklyReport,
  onViewMonthlyReport,
}: ReportListPageProps): React.JSX.Element => {
  const reports = MOCK_MONTHLY_REPORT_LIST;

  const sorted = [...reports]
    .filter((r) => Boolean(r.month))
    .sort((a, b) => b.month!.localeCompare(a.month!));

  const grouped = sorted.reduce<Record<number, typeof sorted>>((acc, report) => {
    const year = extractYear(report.month!);
    if (!acc[year]) acc[year] = [];
    acc[year].push(report);
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
              const month = report.month!;
              const monthNum = extractMonthNumber(month);
              const weekCount = getWeeksInMonth(month);
              const weeklyItems = Array.from({ length: weekCount }, (_, i) => ({
                label: `${monthNum}월 ${i + 1}주차 리포트`,
                onClick: () => onViewWeeklyReport?.(month, i + 1),
              }));
              const monthlyItem = {
                label: `${monthNum}월 월간 리포트`,
                onClick: () => onViewMonthlyReport?.(month),
              };
              return (
                <MonthlyReportCard
                  key={month}
                  monthLabel={formatMonthLabel(month)}
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
