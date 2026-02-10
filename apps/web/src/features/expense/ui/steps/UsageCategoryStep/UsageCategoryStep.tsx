'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

const MAX_LENGTH = 20;
const VALID_NAME_REGEX = /^[가-힣a-zA-Z0-9\s]*$/;

export interface UsageCategoryStepProps {
  onNext: (usageHistory: string, categoryId: number) => void;
  defaultUsageHistory?: string;
  defaultCategoryId?: number;
}

export const UsageCategoryStep = ({
  onNext,
  defaultUsageHistory,
  defaultCategoryId,
}: UsageCategoryStepProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { categories: storeCategories, displayCategoryIds, selectCategory } = useCategoryStore();

  // store 데이터를 Category 타입으로 변환
  const allCategories = useMemo<Category[]>(
    () =>
      storeCategories.map((c) => ({
        id: String(c.id),
        icon: c.icon ?? 'shopping',
        label: c.name ?? '',
      })),
    [storeCategories]
  );

  // 홈에 보여줄 카테고리
  const displayCategories = useMemo<Category[]>(() => {
    return displayCategoryIds
      .map((id) => allCategories.find((c) => c.id === String(id)))
      .filter((c): c is Category => c !== undefined);
  }, [displayCategoryIds, allCategories]);

  const [usageHistory, setUsageHistory] = useState<string>(defaultUsageHistory ?? '');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    defaultCategoryId != null
      ? (allCategories.find((c) => c.id === String(defaultCategoryId)) ?? null)
      : null
  );
  const [tempCategory, setTempCategory] = useState<Category | null>(null);

  const hasValidationError = usageHistory !== '' && !VALID_NAME_REGEX.test(usageHistory);
  const isValid = usageHistory.trim() !== '' && !hasValidationError && selectedCategory !== null;

  useEffect(() => {
    if (selectedCategory || defaultCategoryId == null) return;
    const found = allCategories.find((c) => c.id === String(defaultCategoryId));
    if (found) setSelectedCategory(found);
  }, [allCategories, defaultCategoryId, selectedCategory]);

  // 바텀시트용: 선택된 카테고리가 맨 앞에 오도록 정렬
  const sortedCategories = useMemo(() => {
    if (!selectedCategory) return allCategories;
    const selected = allCategories.find((c) => c.id === selectedCategory.id);
    const rest = allCategories.filter((c) => c.id !== selectedCategory.id);
    return selected ? [selected, ...rest] : allCategories;
  }, [allCategories, selectedCategory]);

  const handleNext = () => {
    if (!isValid || !selectedCategory) return;
    onNext(usageHistory.trim(), Number(selectedCategory.id));
  };

  const handleOpenBottomSheet = () => {
    setTempCategory(selectedCategory);
    openModal();
  };

  const handleConfirm = () => {
    if (tempCategory) {
      selectCategory(Number(tempCategory.id));
    }
    setSelectedCategory(tempCategory);
    closeModal();
  };

  const handleAddCategory = () => {
    useExpenseFormStore.setState({
      usageHistory,
      ...(selectedCategory && { categoryId: Number(selectedCategory.id) }),
    });
    router.push('/expense/category');
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
        categories={displayCategories}
        selectedId={selectedCategory?.id}
        onSelect={setSelectedCategory}
        onMoreClick={handleOpenBottomSheet}
      />

      <BottomSheet isOpen={isOpen} onClose={closeModal}>
        <CategoryBottomSheetTemplate
          categories={sortedCategories}
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
