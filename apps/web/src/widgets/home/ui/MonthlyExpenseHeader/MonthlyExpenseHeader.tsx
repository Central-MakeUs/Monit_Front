import React from 'react';
import { ViewToggle } from '@/shared/ui/viewToggle';
import type { ViewMode } from '../../model/types';
import { MonthlyExpenseInfo } from '../MonthlyExpenseInfo';
import * as styles from './MonthlyExpenseHeader.css';

export interface MonthlyExpenseHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  monthlyTotalAmount?: number;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const MonthlyExpenseHeader = ({
  viewMode,
  onViewModeChange,
  monthlyTotalAmount = 0,
  isLoading,
  isFetching,
}: MonthlyExpenseHeaderProps) => {
  return (
    <div className={styles.container}>
      <MonthlyExpenseInfo
        monthlyTotalAmount={monthlyTotalAmount}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <div className={styles.viewToggleWrapper}>
        <ViewToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
};
