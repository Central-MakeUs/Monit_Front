'use client';

import React from 'react';
import { HistoryCard } from '@/shared/ui/historyCard';
import { type ExpenseListDTO } from '@/entities/expense';
import * as styles from './ExpenseList.css';

export interface ExpenseListProps {
  selectedDate: Date | null;
  expenses?: ExpenseListDTO[];
  onExpenseClick?: (expense: ExpenseListDTO) => void;
}

export const ExpenseList = ({ expenses = [], onExpenseClick }: ExpenseListProps) => {
  return (
    <div className={styles.list}>
      {expenses.map((expense) => (
        <HistoryCard
          key={expense.expenseId ?? 0}
          title={expense.usageHistory ?? ''}
          category={expense.categoryIconType ?? 'coin'}
          price={expense.amount ?? 0}
          categoryName={expense.categoryName ?? ''}
          onClick={() => onExpenseClick?.(expense)}
        />
      ))}
    </div>
  );
};
