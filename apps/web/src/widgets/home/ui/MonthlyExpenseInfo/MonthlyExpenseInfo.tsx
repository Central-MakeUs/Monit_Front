import React from 'react';
import { Text } from '@/shared/ui/text';
import { ViewToggle } from '@/shared/ui/viewToggle';
import type { ViewMode } from '../../model/types';
import { getLoadingClass } from '../../lib/getLoadingClass';
import * as styles from './MonthlyExpenseInfo.css';

export interface MonthlyExpenseInfoProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  monthlyTotalAmount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const MonthlyExpenseInfo = ({
  viewMode,
  onViewModeChange,
  monthlyTotalAmount = 0,
  isLoading,
  isFetching,
}: MonthlyExpenseInfoProps) => {
  return (
    <div className={styles.container}>
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
      <div className={styles.viewToggleWrapper}>
        <ViewToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
};
