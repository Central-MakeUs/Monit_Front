'use client';

import React from 'react';
import { HistoryCard } from '@/shared/ui/historyCard';
import * as styles from './ExpenseList.css';

import { CategoryIconType } from '@/shared/ui/categoryBtn';

export interface Expense {
  expenseId: number;
  usageHistory: string;
  categoryIconType: CategoryIconType;
  categoryName: string;
  amount: number;
  emotionType: string;
  evaluationType: string;
}

export interface ExpenseListProps {
  selectedDate: Date | null;
  expenses?: Expense[];
  onExpenseClick?: (expense: Expense) => void;
}

export const ExpenseList = ({ expenses = [], onExpenseClick }: ExpenseListProps) => {
  // TODO: selectedDate에 따라 필터링된 데이터 사용
  // 현재는 props로 받은 expenses를 그대로 사용

  return (
    <div className={styles.list}>
      {expenses.map((expense) => (
        <HistoryCard
          key={expense.expenseId}
          title={expense.usageHistory}
          category={expense.categoryIconType}
          price={expense.amount}
          categoryName={expense.categoryName}
          onClick={() => {
            onExpenseClick?.(expense);
            console.log('Expense clicked:', expense.expenseId);
          }}
        />
      ))}
    </div>
  );
};
