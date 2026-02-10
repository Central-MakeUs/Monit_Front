'use client';

import React from 'react';
import { EmptyState } from '../EmptyState';
import { EmptyStateType } from '../../model/types';
import { ExpenseList, Expense } from '../ExpenseList';
import { ExpenseSummary } from '../ExpenseSummary';
import * as styles from './ExpenseContent.css';

export interface ExpenseContentProps {
  hasExpenses: boolean;
  emptyStateType: EmptyStateType;
  expenseCount: number;
  totalExpenseAmount: number;
  selectedDate: Date | null;
  expenses?: Expense[];
}

export const ExpenseContent = ({
  hasExpenses,
  emptyStateType,
  expenseCount,
  totalExpenseAmount,
  selectedDate,
  expenses = [],
}: ExpenseContentProps) => {
  return (
    <div className={styles.container}>
      {/* <Banner
        data-onboarding-id='banner'
        isActive={false}
        title='오늘의 소비는 내일 돌아볼 수 있어요'
        subText='5단계로 만족도를 남겨볼 수 있어요'
      /> */}

      <ExpenseSummary count={expenseCount} totalAmount={totalExpenseAmount} />

      {hasExpenses ? (
        <div className={styles.expenseSection}>
          <ExpenseList selectedDate={selectedDate} expenses={expenses} />
        </div>
      ) : (
        <div className={styles.emptySection}>
          <EmptyState type={emptyStateType} />
        </div>
      )}
    </div>
  );
};
