'use client';

import React from 'react';
import { koFormatter } from '@/shared/ui/datePicker/config/formatters';
import { TopBar } from '@/shared/ui/topBar';
import { Text } from '@/shared/ui/text';
import { IcRightChevron, IcSetting } from 'public/icons';
import { NotificationBell } from '@/features/notification';
import * as styles from './HomeHeader.css';

export interface HomeHeaderProps {
  currentDate: Date;
  onDateButtonClick: () => void;
  onSettingsClick: () => void;
  onNotificationClick: () => void;
}

export const HomeHeader = ({
  currentDate,
  onDateButtonClick,
  onSettingsClick,
  onNotificationClick,
}: HomeHeaderProps): React.JSX.Element => {
  const formatDateHeader = (date: Date) => {
    return `${koFormatter.year(date.getFullYear())} ${koFormatter.month(date.getMonth() + 1)}`;
  };

  return (
    <TopBar
      left={
        <button
          type='button'
          className={styles.dateButton}
          aria-label='날짜 선택'
          onClick={onDateButtonClick}>
          <Text variant='t2' className={styles.dateText}>
            {formatDateHeader(currentDate)}
          </Text>
          <div className={styles.dropdownIcon}>
            <IcRightChevron />
          </div>
        </button>
      }
      right={
        <div className={styles.headerActions}>
          <button className={styles.iconButton} aria-label='알림' onClick={onNotificationClick}>
            <NotificationBell />
          </button>
          <button className={styles.iconButton} aria-label='설정' onClick={onSettingsClick}>
            <IcSetting className={styles.settingIc} />
          </button>
        </div>
      }
    />
  );
};
