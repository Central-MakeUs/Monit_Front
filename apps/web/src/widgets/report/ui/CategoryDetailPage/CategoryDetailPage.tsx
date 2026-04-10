'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { expenseReportQueries, type WeeklyExpenseEmotionType } from '@/entities/expenseReport';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
import { toCategoryDetailVM } from '../../model/toCategoryDetailVM';
import { MOCK_CATEGORY_DETAIL } from '../../model/mockCategoryDetail';
import { SatisfactionGroupCard } from './SatisfactionGroupCard';
import * as styles from './CategoryDetailPage.css';

export interface CategoryDetailPageProps {
  onBack: () => void;
  /** 감정 타입 (예: "홀린 듯이") */
  emotionType?: string;
  /** 조회 시작일 (YYYY-MM-DD) */
  start?: string;
  /** 조회 종료일 (YYYY-MM-DD) */
  end?: string;
}

export const CategoryDetailPage = ({
  onBack,
  emotionType,
  start,
  end,
}: CategoryDetailPageProps) => {
  const hasParams = !!emotionType && !!start && !!end;

  const { data: raw } = useQuery({
    ...expenseReportQueries.weeklyExpenseDetailsQuery({
      start: start ?? '',
      end: end ?? '',
      emotionType: (emotionType ?? '') as WeeklyExpenseEmotionType,
    }),
    enabled: hasParams,
  });

  const { data: categoryList } = useQuery(categoryQueries.listQuery());

  const categoryIconMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categoryList?.result ?? []) {
      if (c.name && c.icon) map.set(c.name, c.icon);
    }
    return map;
  }, [categoryList]);

  const vm = raw ? toCategoryDetailVM(raw, categoryIconMap) : MOCK_CATEGORY_DETAIL;

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
