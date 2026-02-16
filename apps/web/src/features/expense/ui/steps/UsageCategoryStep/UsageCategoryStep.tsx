'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Button,
  InputField,
  TextInput,
  CategoryGrid,
  BottomFixedArea,
  BottomSheet,
} from '@/shared/ui';
import { CategoryBottomSheetTemplate, type Category } from '../../expenseBottomSheet';
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
  const { pinnedCategoryIds, selectCategory, setPinnedCategoryIds } = useCategoryStore();
  const { data: categoryResponse } = useQuery(categoryQueries.listQuery());
  const categories = useMemo(() => categoryResponse?.result ?? [], [categoryResponse?.result]);

  useEffect(() => {
    if (categories.length === 0) return;

    const ids = categories.filter((c) => c.id != null).map((c) => c.id);
    setPinnedCategoryIds(ids);
  }, [categories, setPinnedCategoryIds]);

  // store 데이터를 Category 타입으로 변환
  const categoryOptions = useMemo<Category[]>(
    () =>
      categories.map((c) => ({
        id: String(c.id),
        icon: c.icon ?? 'shopping',
        label: c.name ?? '',
      })),
    [categories]
  );

  // 홈에 고정 노출되는 카테고리
  const pinnedCategories = useMemo<Category[]>(() => {
    return (pinnedCategoryIds ?? [])
      .map((id) => categoryOptions.find((c) => c.id === String(id)))
      .filter((c): c is Category => c !== undefined);
  }, [pinnedCategoryIds, categoryOptions]);

  const [usageHistory, setUsageHistory] = useState<string>(defaultUsageHistory ?? '');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    defaultCategoryId != null
      ? (categoryOptions.find((c) => c.id === String(defaultCategoryId)) ?? null)
      : null
  );
  const [tempCategory, setTempCategory] = useState<Category | null>(null);

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
