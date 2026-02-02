'use client';

import React, { useState } from 'react';
import { EmotionSelector, EmotionDescription } from '@/features/selectPurchaseEmotion';
import { emotions } from '@/shared/constants';
import { EmotionValue } from '@/shared/types';
import { BottomFixedArea, Button, Text, vars } from '@/shared/ui';
import * as styles from './SatisfactionStep.css';

export interface SatisfactionStepProps {
  onNext: (emotionType: string) => void;
  defaultEmotionType?: string;
}

export const SatisfactionStep = ({
  onNext,
  defaultEmotionType,
}: SatisfactionStepProps): React.JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (defaultEmotionType) {
      const idx = emotions.findIndex((e) => e.value === defaultEmotionType);
      return idx !== -1 ? idx : 1;
    }
    return 1;
  });

  const handleChange = (_value: EmotionValue, index: number) => {
    setSelectedIndex(index);
  };

  const selectedEmotion = emotions[selectedIndex];

  const handleNext = () => {
    if (!selectedEmotion) return;
    onNext(selectedEmotion.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <Text variant='t4' color={vars.color.text.primary}>
          소비 당시 느꼈던
          <br />
          마음 하나를 선택해 주세요
        </Text>
        <Text variant='b3' color={vars.color.text.secondary}>
          정답은 없어요. 마음 가는 대로 선택해 주세요
        </Text>
      </div>
      <EmotionSelector defaultIndex={selectedIndex} onChange={handleChange} />
      {selectedEmotion && (
        <div className={styles.emotionDescriptionArea}>
          <EmotionDescription emotion={selectedEmotion} />
        </div>
      )}
      <BottomFixedArea>
        <Button variant='primary' onClick={handleNext} disabled={!selectedEmotion} size='lg'>
          완료
        </Button>
      </BottomFixedArea>
    </div>
  );
};
