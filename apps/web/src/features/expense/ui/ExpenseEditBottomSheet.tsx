'use client';

import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { CategoryIconType } from '@/shared/ui';
import { ExpenseFormBottomSheet } from './expenseBottomSheet';
import { Expense } from '@/widgets/home/ui/ExpenseList';
import {
  categoryQueries,
  type CategoryListResponseDTO,
  updateExpense,
  type UpdateExpenseRequest,
} from '@/features/expense/model';

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
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(0);
  const [usage, setUsage] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('1');

  // 카테고리 목록 조회
  const { data: categoryData } = useQuery(categoryQueries.listQuery());

  const categories = React.useMemo(() => {
    return (categoryData?.result ?? []) as CategoryListResponseDTO[];
  }, [categoryData]);

  // 지출 수정 mutation
  const updateMutation = useMutation({
    mutationFn: ({ expenseId, data }: { expenseId: number; data: UpdateExpenseRequest }) =>
      updateExpense(expenseId, data),
    onSuccess: () => {
      // 일일 지출 데이터 캐시 무효화하여 리페칭
      queryClient.invalidateQueries({ queryKey: ['expense', 'daily'] });
      onConfirm?.({
        ...expense!,
        amount,
        usageHistory: usage,
      });
      onClose();
    },
    onError: (error) => {
      console.error('지출 수정 실패:', error);
      // TODO: 에러 토스트 메시지 표시
    },
  });

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount ?? 0);
      setUsage(expense.usageHistory ?? '');

      if (categories.length > 0 && expense.categoryName) {
        const matchedCategory = categories.find((c) => c.name === expense.categoryName);
        if (matchedCategory) {
          setSelectedCategoryId(String(matchedCategory.id));
        }
      }
    }
  }, [expense, categories]);

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setAmount(isNaN(numericValue) ? 0 : numericValue);
  };

  const handleConfirm = () => {
    if (!expense?.expenseId) return;

    // API 요청 데이터 구성
    const requestData: UpdateExpenseRequest = {
      amount,
      expendedAt: new Date().toISOString().split('T')[0] ?? '', // YYYY-MM-DD 형식
      categoryId: Number(selectedCategoryId ?? 1),
      usageHistory: usage,
      emotionType: (expense.emotionType as UpdateExpenseRequest['emotionType']) || '기분전환',
    };

    updateMutation.mutate({
      expenseId: expense.expenseId,
      data: requestData,
    });
  };

  const handleDelete = () => {
    if (expense?.expenseId) {
      onDelete?.(expense.expenseId);
    }
    onClose();
  };

  // CategoryListDTO를 ExpenseFormBottomSheet의 Category 타입으로 변환
  const formattedCategories = categories.map((cat: CategoryListResponseDTO) => ({
    id: String(cat.id),
    icon: (cat.icon ?? 'shopping') as CategoryIconType, // API 아이콘 타입과 UI 아이콘 타입 매핑 필요
    label: cat.name ?? '',
  }));

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <ExpenseFormBottomSheet
        amount={amount}
        onAmountChange={handleAmountChange}
        usage={usage}
        onUsageChange={setUsage}
        categories={formattedCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={(cat) => setSelectedCategoryId(cat.id)}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        onClose={onClose}
      />
    </BottomSheet>
  );
};
