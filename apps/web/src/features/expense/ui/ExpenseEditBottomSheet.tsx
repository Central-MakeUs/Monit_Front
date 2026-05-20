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
  expenseQueries,
  type CategoryListResponseDTO,
  type UpdateExpenseRequest,
} from '@/features/expense/model';
import { EXPENSE_CONSTANTS, EXPENSE_ERROR_MESSAGES, type ExpenseListDTO } from '@/entities/expense';
import { expenseEditNavigation } from '@/features/expense/lib/expenseEditNavigation';
import { handleApiError } from '@/shared/api';

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

  const isValidNameRegex = /^[가-힣a-zA-Z0-9\s]*$/;
  const isUsageEmpty = usage.trim().length === 0;
  const isUsageInvalid = usage !== '' && !isValidNameRegex.test(usage);

  // 카테고리 목록 조회
  const { data: categoryData, refetch: refetchCategories } = useQuery({
    // 편집 바텀시트는 카테고리 추가 후 돌아오는 진입점이기 때문에
    // 새로 추가된 카테고리가 바로 보이도록 항상 최신 데이터를 가져온다.
    ...categoryQueries.listQuery(),
    staleTime: 0,
    refetchOnMount: 'always',
  });

  const categories = React.useMemo(() => {
    return (categoryData?.result ?? []) as CategoryListResponseDTO[];
  }, [categoryData]);

  const updateMutation = useMutation(expenseQueries.updateMutation(queryClient));
  const deleteMutation = useMutation(expenseQueries.deleteMutation(queryClient));

  useEffect(() => {
    if (!isOpen || !expense) return;

    // 편집 바텀시트가 다시 열릴 때는 항상 내부 상태를 초기화해서
    // 카테고리 / 캘린더 / 삭제 다이얼로그 바텀시트가 열린 채로 남지 않도록 한다.
    setIsDeleteDialogOpen(false);
    setIsCalendarOpen(false);
    setIsCategorySheetOpen(false);

    // 카테고리 추가 후 돌아온 상황에서도 최신 목록을 보장하기 위해 강제 리패치
    refetchCategories();

    setAmount(expense.amount ?? 0);
    setUsage(expense.usageHistory ?? '');
    setDate(initialDate);

    setAmountError(undefined);

    if (categories.length > 0 && expense.categoryName) {
      const matchedCategory = categories.find((c) => c.name === expense.categoryName);
      if (matchedCategory) {
        setSelectedCategoryId(String(matchedCategory.id));
        setFrontCategoryId(String(matchedCategory.id));
      }
    }
  }, [isOpen, expense, categories, initialDate, refetchCategories]);

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
      emotionType: (expense.emotionType as UpdateExpenseRequest['emotionType']) || '기분 전환',
    };

    updateMutation.mutate(
      {
        expenseId: expense.expenseId,
        data: requestData,
      },
      {
        onSuccess: () => {
          toast.success('소비 기록이 수정되었어요.');
          onConfirm?.({
            ...expense,
            amount,
            usageHistory: usage,
          });
          onClose();
        },
        onError: (error) => {
          handleApiError(error, {
            toast,
            fallback: '수정에 실패했어요. 다시 시도해 주세요.',
            context: 'expense.update',
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (expense?.expenseId) {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (!expense?.expenseId || deleteMutation.isPending) return;
    const expenseId = expense.expenseId;
    deleteMutation.mutate(expenseId, {
      onSuccess: () => {
        toast.success('소비 기록이 삭제되었어요.');
        setIsDeleteDialogOpen(false);
        onDelete?.(expenseId);
        onClose();
      },
      onError: (error) => {
        handleApiError(error, {
          toast,
          fallback: '삭제에 실패했어요. 다시 시도해 주세요.',
          context: 'expense.delete',
        });
      },
    });
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
        selectedDate={date}
        onDateClick={() => setIsCalendarOpen(true)}
        onMoreCategoryClick={() => setIsCategorySheetOpen(true)}
        satisfactionLabel={expense?.emotionType ?? '감정 누락'}
        satisfactionEvaluationType={expense?.evaluationType}
        confirmDisabled={amount <= 0 || isUsageEmpty || !!amountError || isUsageInvalid}
        amountErrorMessage={amountError}
        isAmountError={!!amountError}
        isUsageError={isUsageEmpty || isUsageInvalid}
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
        autoCloseOnConfirm={false}
        isConfirmDisabled={deleteMutation.isPending}
      />
      <BottomSheet isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)}>
        <CalendarBottomSheetTemplate
          selectedDate={date}
          onSelectDate={(newDate) => {
            if (newDate) setDate(newDate);
          }}
          onConfirm={() => setIsCalendarOpen(false)}
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
          onAddClick={() => {
            if (expense?.expenseId) {
              expenseEditNavigation.setTargetExpenseId(expense.expenseId);
            }
            router.push('/expense/category?from=edit');
          }}
        />
      </BottomSheet>
    </BottomSheet>
  );
};
