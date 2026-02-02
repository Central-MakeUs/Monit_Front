'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button, InputField, TextInput, CategoryGrid, BottomFixedArea } from '@/shared/ui';
import type { Category } from '../../expenseBottomSheet';
import * as styles from './UsageCategoryStep.css';

const MAX_LENGTH = 20;

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
  const [showError, setShowError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValid = usageHistory.trim() !== '' && selectedCategory !== null;

  const handleNext = () => {
    if (!isValid || !selectedCategory) return;
    onNext(usageHistory, Number(selectedCategory.id));
  };

  // TODO: 만약 다른 TextInput 에도 똑같은 로직일 경우 수정하기
  const handleValueChange = useCallback((value: string) => {
    if (value.length > MAX_LENGTH) {
      setUsageHistory(value.slice(0, MAX_LENGTH));
      setShowError(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowError(false), 2000);
      return;
    }
    setUsageHistory(value);
  }, []);

  return (
    <div className={styles.container}>
      <InputField label='사용처'>
        <TextInput
          placeholder='사용처를 입력해주세요'
          value={usageHistory}
          onValueChange={handleValueChange}
          errorMessage={showError ? '한글, 영문, 숫자만 20자 이내로 입력가능해요.' : undefined}
          error={showError}
          maxLength={MAX_LENGTH}
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
