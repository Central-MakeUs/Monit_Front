import React from 'react';
import { Text } from '@/shared/ui/text';
import { getLoadingClass } from '../../lib/getLoadingClass';
import * as styles from './MonthlyExpenseInfo.css';

export interface MonthlyExpenseInfoProps {
  monthlyTotalAmount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
  /** true면 단독 사용(Report 등) 시 margin/padding 루트로 감쌈 */
  standalone?: boolean;
}

export const MonthlyExpenseInfo = ({
  monthlyTotalAmount = 0,
  isLoading,
  isFetching,
  standalone = false,
}: MonthlyExpenseInfoProps) => {
  const content = (
    <div className={styles.info}>
      <Text variant='b3' className={styles.labelText}>
        이번달 소비
      </Text>
      <Text
        variant='t5'
        className={`${styles.amountText} ${getLoadingClass(isLoading, isFetching)}`}>
        {monthlyTotalAmount.toLocaleString()}원
      </Text>
    </div>
  );

  if (standalone) {
    return <div className={styles.standaloneRoot}>{content}</div>;
  }
  return content;
};
