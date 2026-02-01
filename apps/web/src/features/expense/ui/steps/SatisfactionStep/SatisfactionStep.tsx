import React from 'react';

export interface SatisfactionStepProps {
  onNext: (emotionType: string) => void;
}

// eslint-disable-next-line no-empty-pattern
export const SatisfactionStep = ({}: SatisfactionStepProps) => {
  return <div>소비 상황/만족도</div>;
};
