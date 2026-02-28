'use client';

import React from 'react';
import { RatingBtn } from '@/shared/ui';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import * as styles from './SatisfactionRating.css';

const RATINGS: { type: EvaluationType; label?: string }[] = [
  { type: 'VERY_DISAPPOINTED', label: '불만족' },
  { type: 'DISAPPOINTED' },
  { type: 'NORMAL', label: '그냥 그럼' },
  { type: 'SATISFIED' },
  { type: 'VERY_SATISFIED', label: '매우 만족' },
];

interface SatisfactionRatingProps {
  value?: EvaluationType | null;
  onChange?: (value: EvaluationType) => void;
}

export const SatisfactionRating = ({ value, onChange }: SatisfactionRatingProps) => {
  return (
    <div className={styles.container} data-onboarding-id='satisfaction-rating'>
      {RATINGS.map(({ type, label }) => (
        <RatingBtn
          key={type}
          size='lg'
          type={type}
          selected={value === type}
          label={label}
          onClick={() => onChange?.(type)}
        />
      ))}
    </div>
  );
};
