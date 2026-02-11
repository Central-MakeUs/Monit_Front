'use client';

import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { CategoryIconType } from '@/shared/ui';
import { AlertDialog } from '@/shared/ui/alertDialog';
import { ExpenseFormBottomSheet } from './expenseBottomSheet';
import {
  categoryQueries,
  type CategoryListResponseDTO,
  updateExpense,
  deleteExpense,
  type UpdateExpenseRequest,
} from '@/features/expense/model';
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
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(0);
  const [usage, setUsage] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('1');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 카테고리 목록 조회
  const { data: categoryData } = useQuery(categoryQueries.listQuery());

  const categories = React.useMemo(() => {
    return (categoryData?.result ?? []) as CategoryListResponseDTO[];
  }, [categoryData]);

  const updateMutation = useMutation({
    mutationFn: ({ expenseId, data }: { expenseId: number; data: UpdateExpenseRequest }) =>
      updateExpense(expenseId, data),
    onSuccess: () => {
      // 일일 지출 데이터 캐시 무효화하여 리페칭
      queryClient.invalidateQueries({ queryKey: ['expense', 'daily'] });
      // 월별 지출 데이터 캐시 무효화하여 리페칭 (Summary Record)
      queryClient.invalidateQueries({ queryKey: ['expenseReport', 'summary'] });
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
  // 지출 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (expenseId: number) => deleteExpense(expenseId),
    onSuccess: () => {
      // 일일 지출 데이터 캐시 무효화하여 리페칭
      queryClient.invalidateQueries({ queryKey: ['expense', 'daily'] });
      // 월별 지출 데이터 캐시 무효화하여 리페칭 (Summary Record)
      queryClient.invalidateQueries({ queryKey: ['expenseReport', 'summary'] });
      if (expense?.expenseId) {
        onDelete?.(expense.expenseId);
      }
      onClose();
    },
    onError: (error) => {
      console.error('지출 삭제 실패:', error);
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
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (expense?.expenseId) {
      deleteMutation.mutate(expense.expenseId);
      setIsDeleteDialogOpen(false);
    }
  };

  // CategoryListDTO를 ExpenseFormBottomSheet의 Category 타입으로 변환
  const formattedCategories = categories.map((cat: CategoryListResponseDTO) => ({
    id: String(cat.id),
    icon: (cat.icon ?? 'shopping') as CategoryIconType,
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
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title='이 소비 기록을 삭제할까요?'
        description='삭제된 소비 기록은 다시 복구할 수 없어요.'
        variant='left'
        confirmText='삭제하기'
        cancelText='그만두기'
        onConfirm={handleConfirmDelete}
      />
    </BottomSheet>
  );
};
