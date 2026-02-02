'use client';

import React, { useState } from 'react';
import { Button, InputField, TextInput, CategoryGrid, BottomFixedArea } from '@/shared/ui';
import type { Category } from '../../expenseBottomSheet';
import * as styles from './UsageCategoryStep.css';

// TODO: 임시 데이터 교체해야함
const expenseCategories: Category[] = [
  { id: '1', icon: 'shopping', label: '간식' },
  { id: '2', icon: 'coin', label: '자기계발비' },
  { id: '3', icon: 'percent', label: '감식' },
  { id: '4', icon: 'shopping', label: '카테고리명' },
  { id: '5', icon: 'shopping', label: '간식' },
  { id: '6', icon: 'coin', label: '자기계발비' },
  { id: '7', icon: 'percent', label: '감식' },
];

export interface UsageCategoryStepProps {
  onNext: (usageHistory: string, categoryId: number) => void;
}

export const UsageCategoryStep = ({ onNext }: UsageCategoryStepProps) => {
  const [usageHistory, setUsageHistory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const isValid = usageHistory.trim() !== '' && selectedCategory !== null;

  const handleNext = () => {
    if (!isValid || !selectedCategory) return;
    onNext(usageHistory, Number(selectedCategory.id));
  };

  return (
    <div className={styles.container}>
      <InputField label='사용처'>
        <TextInput
          placeholder='사용처를 입력해주세요'
          value={usageHistory}
          onValueChange={setUsageHistory}
          errorMessage='한글, 영문, 숫자만 20자 이내로 입력가능해요.'
          maxLength={20}
        />
      </InputField>

      <CategoryGrid
        type='expense'
        categories={expenseCategories}
        selectedId={selectedCategory?.id}
        onSelect={setSelectedCategory}
      />
      <BottomFixedArea zIndex={1}>
        <Button variant='primary' onClick={handleNext} disabled={!isValid} size='lg'>
          다음
        </Button>
      </BottomFixedArea>
    </div>
  );
};
