'use client';

import React from 'react';
import { IcRightChevron } from 'public/icons';
import * as styles from './ReportOverviewCard.css';
import { Text, vars } from '@/shared/ui';

export interface ReportOverviewCardProps {
  onClick?: () => void;
}

export const ReportOverviewCard = ({ onClick }: ReportOverviewCardProps): React.JSX.Element => {
  return (
    <button
      type='button'
      className={styles.card}
      onClick={onClick}
      aria-label='월간 리포트 모두 보기'>
      <div className={styles.textBlock}>
        <Text variant='h1' color={vars.color.text.secondary}>
          분석 리포트
        </Text>
        <Text variant='h3' color={vars.color.text.primary}>
          리포트 모두 보기
        </Text>
      </div>
      <span className={styles.iconWrap} aria-hidden>
        <IcRightChevron className={styles.chevronIcon} />
      </span>
    </button>
  );
};
