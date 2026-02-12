import React from 'react';
import { Text } from '@/shared/ui/text';
import { vars } from '@/shared/ui/theme.css';
import * as styles from './ExpenseSummary.css';

export interface ExpenseSummaryProps {
  count: number;
  totalAmount: number;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const ExpenseSummary = ({
  count,
  totalAmount,
  isLoading,
  isFetching,
}: ExpenseSummaryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.summaryRow}>
        <Text variant='b2' color={vars.color.text.secondary} className={styles.countText}>
          {count}건의 소비
        </Text>
        <Text
          variant='h1'
          color={vars.color.text.primary}
          className={`${styles.amountText} ${isLoading || isFetching ? styles.blinkingText : ''}`}>
          {totalAmount.toLocaleString()}원
        </Text>
      </div>
    </div>
  );
};
