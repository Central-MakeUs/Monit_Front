'use client';

import React from 'react';
import * as styles from './ReviewCard.css';
import { CategoryBtn, Divider, Text, vars } from '@/shared/ui';
import { SatisfactionRating } from '@/features/review';
import type { ExpenseResponseDTO } from '@/entities/expense/model/expenseTypes';
import type { EvaluationType } from '@/shared/types/evaluation.types';

export interface ReviewCardProps extends Required<ExpenseResponseDTO> {
  currentPage: number;
  totalPages: number;
  evaluationType?: EvaluationType | null;
  onEvaluationChange?: (value: EvaluationType) => void;
}

export const ReviewCard = ({
  categoryIconType,
  usageHistory,
  categoryName,
  amount,
  currentPage,
  totalPages,
  evaluationType,
  onEvaluationChange,
}: ReviewCardProps) => (
  <div className={styles.reviewCardContainer}>
    <div className={styles.pageCount}>
      <Text variant='b2' color={vars.color.text.secondary}>
        {currentPage}
      </Text>
      <Text variant='b2' color={vars.color.text.secondary}>
        /
      </Text>
      <Text variant='b2' color={vars.color.text.secondary}>
        {totalPages}
      </Text>
    </div>
    <div className={styles.iconWrapper}>
      <CategoryBtn size='sm' icon={categoryIconType} />
    </div>
    <div className={styles.textWrapper}>
      <Text variant='b4' color={vars.color.text.primary}>
        {usageHistory}
      </Text>
      <Text variant='b2' color={vars.color.text.tertiary}>
        {categoryName}
      </Text>
    </div>
    <Text variant='h4' color={vars.color.text.primary}>
      {amount.toLocaleString()}원
    </Text>
    <Divider color='#E8E8E8' />
    <Text variant='b2' color={vars.color.text.tertiary}>
      소비 돌아보기
    </Text>
    <SatisfactionRating value={evaluationType} onChange={onEvaluationChange} />
  </div>
);
