'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  InputField,
  TextInput,
  CategoryGrid,
  BottomFixedArea,
  BottomSheet,
  type CategoryItem,
} from '@/shared/ui';
import { CategoryBottomSheetTemplate } from '../../expenseBottomSheet';
import * as styles from './UsageCategoryStep.css';
import { useModal } from '@/shared/hooks';
import { useExpenseFormStore } from '@/widgets/expenseRecordFunnel/model/store';
import { useCategoryStore } from '@/entities/category/model/store';
import { useQuery } from '@tanstack/react-query';
import { categoryQueries } from '@/features/expense/model/categoryQueries';
const MAX_LENGTH = 20;
const VALID_NAME_REGEX = /^[가-힣a-zA-Z0-9\s]*$/;

export interface UsageCategoryStepProps {
  onNext: (usageHistory: string, categoryId: number) => void;
  onAddCategory: () => void;
  defaultUsageHistory?: string;
  defaultCategoryId?: number;
}

export const UsageCategoryStep = ({
  onNext,
  onAddCategory,
  defaultUsageHistory,
  defaultCategoryId,
}: UsageCategoryStepProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { selectCategory } = useCategoryStore();
  const { data: categoryResponse } = useQuery(categoryQueries.listQuery());
  const categories = useMemo(() => categoryResponse?.result ?? [], [categoryResponse?.result]);

  // store 데이터를 CategoryItem 타입으로 변환
  const categoryOptions = useMemo<CategoryItem[]>(
    () =>
      categories.map((c) => ({
        id: String(c.id),
        icon: c.icon ?? 'shopping',
        label: c.name ?? '',
      })),
    [categories]
  );

  const [usageHistory, setUsageHistory] = useState<string>(defaultUsageHistory ?? '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    defaultCategoryId != null
      ? (categoryOptions.find((c) => c.id === String(defaultCategoryId)) ?? null)
      : null
  );
  const [tempCategory, setTempCategory] = useState<CategoryItem | null>(null);
  // 바텀시트에서 확인된 카테고리 (그리드 선택과 구분하기 위한 상태)
  const [confirmedCategory, setConfirmedCategory] = useState<CategoryItem | null>(null);

  const hasValidationError = usageHistory !== '' && !VALID_NAME_REGEX.test(usageHistory);
  const isValid = usageHistory.trim() !== '' && !hasValidationError && selectedCategory !== null;

  useEffect(() => {
    if (selectedCategory || defaultCategoryId == null) return;
    const found = categoryOptions.find((c) => c.id === String(defaultCategoryId));
    if (found) {
      setSelectedCategory(found);
      if (isOpen) setTempCategory(found);
    }
  }, [categoryOptions, defaultCategoryId, selectedCategory, isOpen]);

  useEffect(() => {
    const { shouldOpenCategorySheet, categoryId } = useExpenseFormStore.getState();
    if (shouldOpenCategorySheet) {
      openModal();
      useExpenseFormStore.setState({ shouldOpenCategorySheet: false });
      if (categoryId) {
        const found = categoryOptions.find((c) => c.id === String(categoryId));
        if (found) {
          setSelectedCategory(found);
          setTempCategory(found);
          setConfirmedCategory(found);
        }
      }
    }
  }, [openModal, categoryOptions]);

  // 바텀시트용: 선택된 카테고리가 맨 앞에 오도록 정렬
  const sheetCategories = useMemo(() => {
    if (!selectedCategory) return categoryOptions;
    const selected = categoryOptions.find((c) => c.id === selectedCategory.id);
    const rest = categoryOptions.filter((c) => c.id !== selectedCategory.id);
    return selected ? [selected, ...rest] : categoryOptions;
  }, [categoryOptions, selectedCategory]);

  // 홈에 고정 노출되는 카테고리
  const pinnedCategories = useMemo<CategoryItem[]>(() => {
    const top7 = categoryOptions.slice(0, 7);
    if (!confirmedCategory) return top7;
    // confirmedCategory가 이미 top7에 있으면 맨 앞으로
    if (top7.some((c) => c.id === confirmedCategory.id)) {
      return [confirmedCategory, ...top7.filter((c) => c.id !== confirmedCategory.id)];
    }
    // top7에 없으면 맨 앞에 추가하고 마지막 하나 제거
    return [confirmedCategory, ...top7.slice(0, 6)];
  }, [categoryOptions, confirmedCategory]);

  const handleNext = () => {
    if (!isValid || !selectedCategory) return;
    onNext(usageHistory.trim(), +selectedCategory.id);
  };

  const handleOpenBottomSheet = () => {
    setTempCategory(selectedCategory);
    openModal();
  };

  const handleConfirm = () => {
    if (tempCategory) {
      selectCategory(+tempCategory.id);
      setConfirmedCategory(tempCategory);
    }
    setSelectedCategory(tempCategory);
    closeModal();
  };

  const handleAddCategory = () => {
    useExpenseFormStore.setState({
      usageHistory,
      ...(selectedCategory && { categoryId: +selectedCategory.id }),
      shouldOpenCategorySheet: true,
    });
    onAddCategory();
  };

  return (
    <div className={styles.container}>
      <InputField label='사용처'>
        <TextInput
          placeholder='사용처를 입력해주세요'
          value={usageHistory}
          onValueChange={setUsageHistory}
          error={hasValidationError}
          errorMessage='한글, 영문, 숫자만 20자 이내로 입력가능해요.'
          maxLength={MAX_LENGTH}
        />
      </InputField>

      <CategoryGrid
        type='expense'
        categories={pinnedCategories}
        selectedId={selectedCategory?.id}
        onSelect={setSelectedCategory}
        onMoreClick={handleOpenBottomSheet}
      />

      <BottomSheet isOpen={isOpen} onClose={closeModal}>
        <CategoryBottomSheetTemplate
          categories={sheetCategories}
          selectedId={tempCategory?.id}
          onSelect={setTempCategory}
          onConfirm={handleConfirm}
          onAddClick={handleAddCategory}
        />
      </BottomSheet>
      <BottomFixedArea zIndex={1}>
        <Button variant='primary' onClick={handleNext} disabled={!isValid} size='lg'>
          다음
        </Button>
      </BottomFixedArea>
    </div>
  );
};
