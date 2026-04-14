'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge, Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { expenseReportQueries } from '@/entities/expenseReport';
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
  // year/month는 NaN/0 같은 값이 흘러 들어와도 잘못된 API 요청을 보내지 않도록
  // 유한한 정수 + month 1~12 범위까지 검증한 뒤에만 모드를 활성화한다.
  const hasValidPeriod =
    year != null &&
    month != null &&
    Number.isFinite(year) &&
    Number.isFinite(month) &&
    month >= 1 &&
    month <= 12;
  const isWeekly = hasValidPeriod && week != null && Number.isFinite(week) && week >= 1;
  const isMonthly = hasValidPeriod && week == null;

  const {
    data: weeklyList,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useQuery({
    ...expenseReportQueries.weeklyDetailQuery(year ?? 0, month ?? 0),
    enabled: isWeekly,
  });

  const {
    data: monthlyRaw,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useQuery({
    ...expenseReportQueries.monthlyDetailQuery(year ?? 0, month ?? 0),
    enabled: isMonthly,
  });

  const weeklyRaw = weeklyList && week != null ? weeklyList[week - 1] : undefined;
  // 현재 모드에 해당하는 API 응답을 기다리는 동안 스켈레톤 표시.
  const showSkeleton = (isWeekly && isWeeklyLoading) || (isMonthly && isMonthlyLoading);
  const showError = (isWeekly && isWeeklyError) || (isMonthly && isMonthlyError);
  const isInvalidParams = !isWeekly && !isMonthly;
  // 주간 모드는 weeklyList에 해당 주차 인덱스가 없을 수 있으므로 별도 체크.
  const isWeeklyMissing = isWeekly && !!weeklyList && !weeklyRaw;
  const isMonthlyMissing = isMonthly && monthlyRaw == null && !isMonthlyLoading;

  const vm =
    isWeekly && weeklyRaw
      ? toWeeklyReportDetailVM(weeklyRaw, periodLabel)
      : isMonthly && monthlyRaw
        ? toWeeklyReportDetailVM(monthlyRaw, periodLabel)
        : null;

  const handleViewCategoryDetail = (emotionType: string) => {
    if (!onViewCategoryDetail) return;
    if (isWeekly && weeklyRaw?.weekStartDate && weeklyRaw?.weekEndDate) {
      onViewCategoryDetail({
        mode: 'weekly',
        emotionType,
        start: weeklyRaw.weekStartDate,
        end: weeklyRaw.weekEndDate,
      });
      return;
    }
    if (isMonthly && year != null && month != null) {
      onViewCategoryDetail({ mode: 'monthly', emotionType, year, month });
    }
  };

  const canViewCategoryDetail =
    !!onViewCategoryDetail &&
    ((isWeekly && !!weeklyRaw?.weekStartDate && !!weeklyRaw?.weekEndDate) ||
      (isMonthly && !!monthlyRaw));

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
        {isInvalidParams ? (
          <div className={styles.emptyState} role='status'>
            잘못된 접근이에요. 이전 화면에서 다시 시도해 주세요.
          </div>
        ) : showSkeleton ? (
          <ReportDetailLoadingSkeleton />
        ) : showError ? (
          <div className={styles.emptyState} role='alert'>
            리포트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </div>
        ) : isWeeklyMissing || isMonthlyMissing || !vm ? (
          <div className={styles.emptyState} role='status'>
            아직 표시할 리포트가 없어요.
          </div>
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
