'use client';

import React from 'react';
import { Badge, Text, TopBar, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { MOCK_REPORT_DETAIL } from '../../model/mockReportDetail';
import { CategoryCard } from './CategoryCard';
import * as styles from './ReportDetailPage.css';

export interface ReportDetailPageProps {
  onBack: () => void;
  onViewCategoryDetail?: (categoryId: string) => void;
}

export const ReportDetailPage = ({ onBack, onViewCategoryDetail }: ReportDetailPageProps) => {
  const vm = MOCK_REPORT_DETAIL;

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
        <div className={styles.summarySection}>
          <div className={styles.badgeWrapper}>
            <Badge label={vm.periodLabel} size='xs' />
          </div>
          <p className={styles.subtitleText}>{vm.subtitleLine}</p>
          <p className={styles.titleText}>{vm.titleLine}</p>
        </div>

        <div className={styles.cardList}>
          {vm.categories.map((category) => (
            <CategoryCard key={category.id} vm={category} onViewDetail={onViewCategoryDetail} />
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
      </div>
    </div>
  );
};
