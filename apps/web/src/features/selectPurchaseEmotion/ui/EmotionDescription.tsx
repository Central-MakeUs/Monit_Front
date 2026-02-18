'use client';

import React from 'react';
import * as styles from './EmotionDescription.css';
import { Text, vars } from '@/shared/ui';
import { Emotion } from '@/shared/types';

interface EmotionDescriptionProps {
  emotion: Emotion;
}

export const EmotionDescription = ({ emotion }: EmotionDescriptionProps) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.tagsContainer}>
        {emotion.tags.map((tag) => (
          <Text
            key={tag}
            variant='h1'
            as='span'
            color={vars.color.text.secondary}
            className={styles.tag}>
            {tag}
          </Text>
        ))}
      </div>
      <Text
        variant='b2'
        color={vars.color.text.disabled}
        align='center'
        style={{ whiteSpace: 'pre-wrap' }}>
        {emotion.description}
      </Text>
    </div>
  );
};
