'use client';

import React, { useState, useCallback } from 'react';
import { DialWheel } from './DialWheel';
import { ScrollPicker } from './ScrollPicker';
import { emotions } from '@/shared/constants';
import type { Emotion } from '@/shared/types';
import * as styles from './EmotionSelector.css';

interface EmotionSelectorProps {
  defaultIndex?: number;
  onChange?: (emotion: Emotion, index: number) => void;
}

export const EmotionSelector = ({ defaultIndex = 2, onChange }: EmotionSelectorProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleIndexChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      const emotion = emotions[index];
      if (emotion) {
        onChange?.(emotion, index);
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
