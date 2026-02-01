import React from 'react';

export interface UsageCategoryStepProps {
  onNext: (usageHistory: string, categoryId: number) => void;
}

// eslint-disable-next-line no-empty-pattern
export const UsageCategoryStep = ({}: UsageCategoryStepProps) => {
  return <div>사용처카테고리</div>;
};
