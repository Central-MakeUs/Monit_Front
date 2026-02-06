'use client';

import React from 'react';
import { Text } from '@/shared/ui/text';
import { vars } from '@/shared/ui/theme.css';
import { EmptyStateType } from '../../model/types';
import * as styles from './EmptyState.css';

export interface EmptyStateProps {
  type: EmptyStateType;
}

const getEmptyMessage = (type: EmptyStateType): React.ReactNode => {
  switch (type) {
    case 'never':
      return (
        <>
          모닛에서의
          <br />첫 소비를 남겨볼까요?
        </>
      );
    case 'today':
      return (
        <>
          아직까지
          <br />
          지출한 내역이 없어요!
        </>
      );
    case 'date':
      return <>지출한 내역이 없어요</>;
    default:
      return (
        <>
          모닛에서의
          <br />첫 소비를 남겨볼까요?
        </>
      );
  }
};

export const EmptyState = ({ type }: EmptyStateProps) => {
  return (
    <div className={styles.container}>
      <Text variant='t4' color={vars.color.text.tertiary} align='center'>
        {getEmptyMessage(type)}
      </Text>
    </div>
  );
};
