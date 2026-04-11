'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge, Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { expenseReportQueries } from '@/entities/expenseReport';
import { MOCK_REPORT_DETAIL } from '../../model/mockReportDetail';
import { toWeeklyReportDetailVM } from '../../model/toWeeklyReportDetailVM';
import { ReportDetailLoadingSkeleton } from '../ReportDetailLoadingSkeleton';
import { CategoryCard } from './CategoryCard';
import * as styles from './ReportDetailPage.css';

/** 카테고리 상세 화면으로 넘어갈 때 전달되는 파라미터 (주간/월간 모드 구분) */
export type ViewCategoryDetailArgs =
  | { mode: 'weekly'; emotionType: string; start: string; end: string }
  | { mode: 'monthly'; emotionType: string; year: number; month: number };

export interface ReportDetailPageProps {
  onBack: () => void;
  onViewCategoryDetail?: (args: ViewCategoryDetailArgs) => void;
  /** URL 파라미터에서 계산된 기간 레이블 (예: "2026년 1월", "2026년 1월 2주차") */
  periodLabel?: string;
  /** 조회 연도. month와 함께 존재할 때 API 조회. week가 함께 있으면 weekly, 없으면 monthly */
  year?: number;
  /** 조회 월 */
  month?: number;
  /** 주차 (1-based). 존재 시 주간 모드. 배열 응답에서 해당 주차 선택 */
  week?: number;
}

export const ReportDetailPage = ({
  onBack,
  onViewCategoryDetail,
  periodLabel,
  year,
  month,
  week,
}: ReportDetailPageProps) => {
  const hasPeriod = year != null && month != null;
  const isWeekly = hasPeriod && week != null;
  const isMonthly = hasPeriod && week == null;

  const { data: weeklyList, isLoading: isWeeklyLoading } = useQuery({
    ...expenseReportQueries.weeklyDetailQuery(year ?? 0, month ?? 0),
    enabled: isWeekly,
  });

  const { data: monthlyRaw, isLoading: isMonthlyLoading } = useQuery({
    ...expenseReportQueries.monthlyDetailQuery(year ?? 0, month ?? 0),
    enabled: isMonthly,
  });

  const weeklyRaw = weeklyList && week != null ? weeklyList[week - 1] : undefined;
  // 현재 모드에 해당하는 API 응답을 기다리는 동안 스켈레톤 표시.
  const showSkeleton = (isWeekly && isWeeklyLoading) || (isMonthly && isMonthlyLoading);

  const vm = isWeekly
    ? weeklyRaw
      ? toWeeklyReportDetailVM(weeklyRaw, periodLabel)
      : {
          ...MOCK_REPORT_DETAIL,
          periodLabel: periodLabel ?? MOCK_REPORT_DETAIL.periodLabel,
          categories: [],
        }
    : isMonthly
      ? monthlyRaw
        ? toWeeklyReportDetailVM(monthlyRaw, periodLabel)
        : {
            ...MOCK_REPORT_DETAIL,
            periodLabel: periodLabel ?? MOCK_REPORT_DETAIL.periodLabel,
            categories: [],
          }
      : { ...MOCK_REPORT_DETAIL, periodLabel: periodLabel ?? MOCK_REPORT_DETAIL.periodLabel };

  const handleViewCategoryDetail = (emotionType: string) => {
    if (!onViewCategoryDetail) return;
    if (isWeekly && weeklyRaw) {
      onViewCategoryDetail({
        mode: 'weekly',
        emotionType,
        start: weeklyRaw.weekStartDate ?? '',
        end: weeklyRaw.weekEndDate ?? '',
      });
      return;
    }
    if (isMonthly && year != null && month != null) {
      onViewCategoryDetail({ mode: 'monthly', emotionType, year, month });
    }
  };

  const canViewCategoryDetail =
    !!onViewCategoryDetail && ((isWeekly && !!weeklyRaw) || (isMonthly && !!monthlyRaw));

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
            분석 리포트 상세
          </Text>
        }
      />

      <div className={styles.scrollArea}>
        {showSkeleton ? (
          <ReportDetailLoadingSkeleton />
        ) : (
          <>
            <div className={styles.summarySection}>
              <div className={styles.badgeWrapper}>
                <Badge label={vm.periodLabel} size='xs' />
              </div>
              <p className={styles.subtitleText}>{vm.subtitleLine}</p>
              <p className={styles.titleText}>{vm.titleLine}</p>
            </div>

            <div className={styles.cardList}>
              {vm.categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  vm={category}
                  onViewDetail={canViewCategoryDetail ? handleViewCategoryDetail : undefined}
                />
              ))}
            </div>

            <div className={styles.totalBar}>
              <span className={styles.totalBarText}>총 소비 {vm.totalCount}건</span>
              <div className={styles.totalBarAmountWrapper}>
                <span className={styles.totalBarAmountText}>총</span>
                <span className={styles.totalBarAmountText}>{formatCurrency(vm.totalAmount)}</span>
              </div>
            </div>

            <div className={styles.avgCard}>
              <span className={styles.avgLabel}>평균 만족도</span>
              <span className={styles.avgComment}>{vm.avgSatisfactionComment}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
