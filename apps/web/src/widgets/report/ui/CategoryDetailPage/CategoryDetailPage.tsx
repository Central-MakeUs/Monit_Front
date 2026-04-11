'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import {
  expenseReportQueries,
  type MonthlyExpenseEmotionType,
  type WeeklyExpenseEmotionType,
} from '@/entities/expenseReport';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { toCategoryDetailVM } from '../../model/toCategoryDetailVM';
import { MOCK_CATEGORY_DETAIL } from '../../model/mockCategoryDetail';
import { SatisfactionGroupCard } from './SatisfactionGroupCard';
import * as styles from './CategoryDetailPage.css';

export interface CategoryDetailPageProps {
  onBack: () => void;
  /** 감정 타입 (예: "홀린 듯이") */
  emotionType?: string;
  /** (주간) 조회 시작일 (YYYY-MM-DD) */
  start?: string;
  /** (주간) 조회 종료일 (YYYY-MM-DD) */
  end?: string;
  /** (월간) 조회 연도. month와 함께 있을 때 월간 모드로 조회 */
  year?: number;
  /** (월간) 조회 월 */
  month?: number;
  /** 기간 레이블 fallback (응답에 없을 때 표시) */
  periodLabel?: string;
}

export const CategoryDetailPage = ({
  onBack,
  emotionType,
  start,
  end,
  year,
  month,
  periodLabel,
}: CategoryDetailPageProps) => {
  const isMonthly = year != null && month != null;
  const isWeekly = !isMonthly && !!start && !!end;

  const { data: weeklyRaw } = useQuery({
    ...expenseReportQueries.weeklyExpenseDetailsQuery({
      start: start ?? '',
      end: end ?? '',
      emotionType: (emotionType ?? '') as WeeklyExpenseEmotionType,
    }),
    enabled: !!emotionType && isWeekly,
  });

  const { data: monthlyRaw } = useQuery({
    ...expenseReportQueries.monthlyExpenseDetailsQuery({
      year: year ?? 0,
      month: month ?? 0,
      emotionType: (emotionType ?? '') as MonthlyExpenseEmotionType,
    }),
    enabled: !!emotionType && isMonthly,
  });

  const { data: categoryList } = useQuery(categoryQueries.listQuery());

  const categoryIconMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categoryList?.result ?? []) {
      if (c.name && c.icon) map.set(c.name, c.icon);
    }
    return map;
  }, [categoryList]);

  const raw = isMonthly ? monthlyRaw : weeklyRaw;
  const vm = raw ? toCategoryDetailVM(raw, categoryIconMap, periodLabel) : MOCK_CATEGORY_DETAIL;

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
            소비 내역 상세
          </Text>
        }
      />

      <div className={styles.scrollArea}>
        <div className={styles.summarySection}>
          <div className={styles.labelWrapper}>
            <Text className={styles.label} variant='b3'>
              {vm.periodLabel}
            </Text>
          </div>
          <p className={styles.titleText}>{vm.categoryName}</p>
        </div>

        <div className={styles.totalBar}>
          <span className={styles.totalBarText}>총 소비 {vm.totalCount}건</span>
          <div className={styles.totalBarAmountWrapper}>
            <span className={styles.totalBarAmountText}>총</span>
            <span className={styles.totalBarAmountText}>{formatCurrency(vm.totalAmount)}</span>
          </div>
        </div>

        <div className={styles.groupList}>
          {vm.groups.map((group) => (
            <SatisfactionGroupCard key={group.level} vm={group} />
          ))}
        </div>
      </div>
    </div>
  );
};
