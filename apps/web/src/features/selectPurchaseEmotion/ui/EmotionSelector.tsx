'use client';

import React, { useState, useCallback } from 'react';
import { DialWheel } from './DialWheel';
import { ScrollPicker } from './ScrollPicker';
import { emotions } from '@/shared/constants';
import type { EmotionValue } from '@/shared/types';
import * as styles from './EmotionSelector.css';

interface EmotionSelectorProps {
  defaultIndex?: number;
  onChange?: (value: EmotionValue, index: number) => void;
}

export const EmotionSelector = ({ defaultIndex = 1, onChange }: EmotionSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleIndexChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      const emotion = emotions[index];
      if (emotion) {
        onChange?.(emotion.value, index);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.selectorContainer}>
      <DialWheel selectedIndex={selectedIndex} onIndexChange={handleIndexChange} />
      <div className={styles.pickerWrapper}>
        <ScrollPicker selectedIndex={selectedIndex} onIndexChange={handleIndexChange} />
      </div>
    </div>
  );
};
