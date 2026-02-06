'use client';

import React from 'react';
import { HistoryCard } from '@/shared/ui/historyCard';
import * as styles from './ExpenseList.css';

export interface Expense {
  id: number;
  title: string;
  category: 'coin' | 'shopping' | 'percent';
  price: number;
  badgeLabel?: string;
}

export interface ExpenseListProps {
  selectedDate: Date | null;
  expenses?: Expense[];
}

export const ExpenseList = ({ expenses = [] }: ExpenseListProps) => {
  // TODO: selectedDate에 따라 필터링된 데이터 사용
  // 현재는 props로 받은 expenses를 그대로 사용

  return (
    <div className={styles.list}>
      {expenses.map((expense) => (
        <HistoryCard
          key={expense.id}
          title={expense.title}
          category={expense.category}
          price={expense.price}
          badgeLabel={expense.badgeLabel}
          onClick={() => {
            // TODO: 상세 페이지로 이동
            console.log('Expense clicked:', expense.id);
          }}
        />
      ))}
    </div>
  );
};
