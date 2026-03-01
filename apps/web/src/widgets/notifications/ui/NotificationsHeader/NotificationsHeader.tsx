'use client';

import React from 'react';
import { TopBar, Text, vars } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import * as styles from './NotificationsHeader.css';

interface NotificationsHeaderProps {
  onBackClick: () => void;
}

export const NotificationsHeader = ({
  onBackClick,
}: NotificationsHeaderProps): React.JSX.Element => {
  return (
    <TopBar
      center={
        <Text variant='t1' color={vars.color.text.primary}>
          알림
        </Text>
      }
      left={
        <button className={styles.iconButton} aria-label='뒤로가기' onClick={onBackClick}>
          <IcLeftChevron />
        </button>
      }
      className={styles.header}
    />
  );
};
