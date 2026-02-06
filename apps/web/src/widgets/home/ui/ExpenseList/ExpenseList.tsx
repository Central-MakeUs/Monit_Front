'use client';

import React from 'react';
import { HistoryCard } from '@/shared/ui/historyCard';
import * as styles from './ExpenseList.css';

export interface ExpenseListProps {
  selectedDate: Date | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ExpenseList = ({ selectedDate }: ExpenseListProps) => {
  // 개발 환경에서만 Mock 데이터 사용
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const isDevelopment = process.env.NODE_ENV !== 'production';

  let filteredExpenses: Array<{
    id: number;
    title: string;
    category: 'coin' | 'shopping' | 'percent';
    price: number;
    badgeLabel?: string;
  }> = [];

  if (isDevelopment) {
    // 개발 환경: Mock 데이터 동적 import
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { mockExpenses } = require('../../dev/mockData');
    filteredExpenses = mockExpenses;
  }
  // 프로덕션: API 연동 시 실제 데이터 사용
  // TODO: selectedDate에 따라 필터링된 데이터 사용

  return (
    <div className={styles.list}>
      {filteredExpenses.map((expense) => (
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
