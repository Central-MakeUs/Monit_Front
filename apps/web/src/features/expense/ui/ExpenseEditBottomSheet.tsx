'use client';

import React, { useState, useEffect } from 'react';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { ExpenseFormBottomSheet } from './expenseBottomSheet';
import { Expense } from '@/widgets/home/ui/ExpenseList';

export interface ExpenseEditBottomSheetProps {
  isOpen: boolean;
  expense: Expense | null;
  onClose: () => void;
  onConfirm?: (updatedExpense: Expense) => void;
  onDelete?: (expenseId: number) => void;
}

export const ExpenseEditBottomSheet = ({
  isOpen,
  expense,
  onClose,
  onConfirm,
  onDelete,
}: ExpenseEditBottomSheetProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [usage, setUsage] = useState<string>('');
  // TODO: 카테고리 ID 연동 로직 필요 (현재는 mock 데이터 기반)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('1');

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setUsage(expense.usageHistory);
      // categoryIconType 등에 따른 ID 매핑이 필요할 수 있음
    }
  }, [expense]);

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setAmount(isNaN(numericValue) ? 0 : numericValue);
  };

  const handleConfirm = () => {
    onConfirm?.({
      ...expense!,
      amount,
      usageHistory: usage,
    });
    onClose();
  };

  const handleDelete = () => {
    if (expense) {
      onDelete?.(expense.expenseId);
    }
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <ExpenseFormBottomSheet
        amount={amount}
        onAmountChange={handleAmountChange}
        usage={usage}
        onUsageChange={setUsage}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={(cat) => setSelectedCategoryId(cat.id)}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        onClose={onClose}
      />
    </BottomSheet>
  );
};
