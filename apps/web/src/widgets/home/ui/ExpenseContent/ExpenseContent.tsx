import React from 'react';
import { spinnerStyle } from '@/shared/ui/spinner';
import { type ExpenseListDTO } from '@/entities/expense';
import type { EmptyStateType } from '../../model/types';
import { EmptyState } from '../EmptyState';
import { ExpenseList } from '../ExpenseList';
import { ExpenseSummary } from '../ExpenseSummary';
import * as styles from './ExpenseContent.css';

export interface ExpenseContentProps {
  hasExpenses: boolean;
  emptyStateType: EmptyStateType;
  expenseCount: number;
  totalExpenseAmount: number;
  expenses?: ExpenseListDTO[];
  onExpenseClick?: (expense: ExpenseListDTO) => void;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const ExpenseContent = ({
  hasExpenses,
  emptyStateType,
  expenseCount,
  totalExpenseAmount,
  expenses = [],
  onExpenseClick,
  isLoading,
  isFetching,
}: ExpenseContentProps) => {
  return (
    <div className={styles.container}>
      <ExpenseSummary
        count={expenseCount}
        totalAmount={totalExpenseAmount}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {hasExpenses ? (
        <div className={styles.expenseSection}>
          <ExpenseList expenses={expenses} onExpenseClick={onExpenseClick} />
        </div>
      ) : (
        <div className={styles.emptySection}>
          {isLoading ? (
            <div className={styles.loadingWrapper}>
              <div className={spinnerStyle} />
            </div>
          ) : (
            <EmptyState type={emptyStateType} />
          )}
        </div>
      )}
    </div>
  );
};
