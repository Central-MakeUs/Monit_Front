'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { BottomSheet } from '@/shared/ui/bottomSheet';
import { CategoryIconType, useToast } from '@/shared/ui';
import { AlertDialog } from '@/shared/ui/alertDialog';
import { CategoryBottomSheetTemplate } from '@/features/expense/ui/expenseBottomSheet/CategoryBottomSheet';
import { CalendarBottomSheetTemplate } from '@/features/expense/ui/steps/AmountDateStep/CalendarBottomSheet';
import { ExpenseFormBottomSheet } from './expenseBottomSheet';
import {
  categoryQueries,
  type CategoryListResponseDTO,
  updateExpense,
  deleteExpense,
  type UpdateExpenseRequest,
} from '@/features/expense/model';
import { EXPENSE_CONSTANTS, EXPENSE_ERROR_MESSAGES, type ExpenseListDTO } from '@/entities/expense';

export interface ExpenseEditBottomSheetProps {
  isOpen: boolean;
  expense: ExpenseListDTO | null;
  onClose: () => void;
  onConfirm?: (updatedExpense: ExpenseListDTO) => void;
  onDelete?: (expenseId: number) => void;
  selectedDate?: Date;
}

export const ExpenseEditBottomSheet = ({
  isOpen,
  expense,
  onClose,
  onConfirm,
  onDelete,
  selectedDate: initialDate = new Date(),
}: ExpenseEditBottomSheetProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [amount, setAmount] = useState<number>(0);
  const [usage, setUsage] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('1');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [frontCategoryId, setFrontCategoryId] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(initialDate);

  const [amountError, setAmountError] = useState<string | undefined>(undefined);
  // Removed usageError state, derived from value

  const isValidNameRegex = /^[가-힣a-zA-Z0-9\s]*$/;
  const isUsageInvalid = usage !== '' && !isValidNameRegex.test(usage);

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
      toast.success('소비 기록이 수정되었어요.');
      onConfirm?.({
        ...expense!,
        amount,
        usageHistory: usage,
      });
      onClose();
    },
    onError: (error) => {
      console.error('지출 수정 실패:', error);
      toast.attention('수정에 실패했어요. 다시 시도해 주세요.');
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
      toast.success('소비 기록이 삭제되었어요.');
      if (expense?.expenseId) {
        onDelete?.(expense.expenseId);
      }
      onClose();
    },
    onError: (error) => {
      console.error('지출 삭제 실패:', error);
      toast.attention('삭제에 실패했어요. 다시 시도해 주세요.');
    },
  });

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount ?? 0);
      setUsage(expense.usageHistory ?? '');
      setDate(initialDate);

      // Reset errors when opening
      setAmountError(undefined);

      if (categories.length > 0 && expense.categoryName) {
        const matchedCategory = categories.find((c) => c.name === expense.categoryName);
        if (matchedCategory) {
          setSelectedCategoryId(String(matchedCategory.id));
          setFrontCategoryId(String(matchedCategory.id));
        }
      }
    }
  }, [expense, categories, initialDate]);

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const validNumericValue = isNaN(numericValue) ? 0 : numericValue;

    if (validNumericValue > EXPENSE_CONSTANTS.MAX_AMOUNT) {
      setAmountError(EXPENSE_ERROR_MESSAGES.OVER_MAX_AMOUNT);
      return;
    }

    if (validNumericValue === 0) {
      setAmountError(EXPENSE_ERROR_MESSAGES.EMPTY_AMOUNT);
    } else {
      setAmountError(undefined);
    }

    setAmount(validNumericValue);
  };

  const handleUsageChange = (value: string) => {
    setUsage(value);
  };

  const handleConfirm = () => {
    if (!expense?.expenseId) return;

    // API 요청 데이터 구성
    const requestData: UpdateExpenseRequest = {
      amount,
      expendedAt: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, // YYYY-MM-DD (Local Time) to prevent UTC offset issues
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

  // CategoryListDTO를 ExpenseFormBottomSheet의 Category 타입으로 변환 및 정렬
  const formattedCategories = React.useMemo(() => {
    const list = categories.map((cat: CategoryListResponseDTO) => ({
      id: String(cat.id),
      icon: (cat.icon ?? 'shopping') as CategoryIconType,
      label: cat.name ?? '',
    }));

    if (frontCategoryId) {
      const selectedIndex = list.findIndex((c) => c.id === frontCategoryId);
      if (selectedIndex > 0) {
        const selected = list[selectedIndex];
        if (selected) {
          return [selected, ...list.filter((_, index) => index !== selectedIndex)];
        }
      }
    }

    return list;
  }, [categories, frontCategoryId]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <ExpenseFormBottomSheet
        amount={amount}
        onAmountChange={handleAmountChange}
        usage={usage}
        onUsageChange={handleUsageChange}
        categories={formattedCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={(cat) => setSelectedCategoryId(cat.id)}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        onClose={onClose}
        selectedDate={date}
        onDateClick={() => setIsCalendarOpen(true)}
        onMoreCategoryClick={() => setIsCategorySheetOpen(true)}
        confirmDisabled={
          amount <= 0 || !usage || usage.trim().length === 0 || !!amountError || isUsageInvalid
        }
        amountErrorMessage={amountError}
        isAmountError={!!amountError}
        isUsageError={isUsageInvalid}
      />
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title='이 소비 기록을 삭제할까요?'
        description='삭제된 소비 기록은 다시 복구할 수 없어요.'
        variant='left'
        confirmText='삭제하기'
        cancelText='취소'
        onConfirm={handleConfirmDelete}
      />
      <BottomSheet isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)}>
        <CalendarBottomSheetTemplate
          selectedDate={date}
          onSelectDate={(newDate) => {
            if (newDate) setDate(newDate);
          }}
          onConfirm={() => setIsCalendarOpen(false)}
          onClose={() => setIsCalendarOpen(false)}
        />
      </BottomSheet>
      <BottomSheet isOpen={isCategorySheetOpen} onClose={() => setIsCategorySheetOpen(false)}>
        <CategoryBottomSheetTemplate
          categories={formattedCategories}
          selectedId={selectedCategoryId}
          onSelect={(category) => {
            setSelectedCategoryId(category.id);
            setFrontCategoryId(category.id);
            setIsCategorySheetOpen(false);
          }}
          onConfirm={() => setIsCategorySheetOpen(false)}
          onAddClick={() => router.push('/expense/category')}
        />
      </BottomSheet>
    </BottomSheet>
  );
};
