'use client';

import React from 'react';
import { Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { MOCK_CATEGORY_DETAIL } from '../../model/mockCategoryDetail';
import { SatisfactionGroupCard } from './SatisfactionGroupCard';
import * as styles from './CategoryDetailPage.css';

export interface CategoryDetailPageProps {
  onBack: () => void;
  /** 추후 API 연동 시 카테고리별 데이터 로딩에 사용 */
  categoryId?: string;
}

export const CategoryDetailPage = ({ onBack }: CategoryDetailPageProps) => {
  const vm = MOCK_CATEGORY_DETAIL;

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
        {/* Period badge + category title */}
        <div className={styles.summarySection}>
          <div className={styles.labelWrapper}>
            <Text className={styles.label} variant='b3'>
              {vm.periodLabel}
            </Text>
          </div>
          <p className={styles.titleText}>{vm.categoryName}</p>
        </div>

        {/* Total summary bar */}
        <div className={styles.totalBar}>
          <span className={styles.totalBarText}>총 소비 {vm.totalCount}건</span>
          <div className={styles.totalBarAmountWrapper}>
            <span className={styles.totalBarAmountText}>총</span>
            <span className={styles.totalBarAmountText}>{formatCurrency(vm.totalAmount)}</span>
          </div>
        </div>

        {/* Grouped satisfaction sections */}
        <div className={styles.groupList}>
          {vm.groups.map((group) => (
            <SatisfactionGroupCard key={group.level} vm={group} />
          ))}
        </div>
      </div>
    </div>
  );
};
