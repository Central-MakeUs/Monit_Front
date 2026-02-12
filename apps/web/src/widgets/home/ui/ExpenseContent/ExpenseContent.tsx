import React from 'react';
import { spinner } from '@/shared/ui/spinner/Spinner.css';
import { type ExpenseListDTO } from '@/entities/expense';
import { EmptyState } from '../EmptyState';
import { EmptyStateType } from '../../model/types';
import { ExpenseList } from '../ExpenseList';
import { ExpenseSummary } from '../ExpenseSummary';
import * as styles from './ExpenseContent.css';

export interface ExpenseContentProps {
  hasExpenses: boolean;
  emptyStateType: EmptyStateType;
  expenseCount: number;
  totalExpenseAmount: number;
  selectedDate: Date | null;
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
  selectedDate,
  expenses = [],
  onExpenseClick,
  isLoading,
  isFetching,
}: ExpenseContentProps) => {
  return (
    <div className={styles.container}>
      {/* <Banner
        data-onboarding-id='banner'
        isActive={false}
        title='오늘의 소비는 내일 돌아볼 수 있어요'
        subText='5단계로 만족도를 남겨볼 수 있어요'
      /> */}

      <ExpenseSummary
        count={expenseCount}
        totalAmount={totalExpenseAmount}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {hasExpenses ? (
        <div className={styles.expenseSection}>
          <ExpenseList
            selectedDate={selectedDate}
            expenses={expenses}
            onExpenseClick={onExpenseClick}
          />
        </div>
      ) : (
        <div className={styles.emptySection}>
          {isLoading ? (
            <div className={styles.loadingWrapper}>
              <div className={spinner} />
            </div>
          ) : (
            <EmptyState type={emptyStateType} />
          )}
        </div>
      )}
    </div>
  );
};
