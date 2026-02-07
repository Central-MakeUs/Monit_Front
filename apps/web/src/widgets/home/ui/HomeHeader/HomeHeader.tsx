'use client';

import React from 'react';
import { TopBar } from '@/shared/ui/topBar';
import { Text } from '@/shared/ui/text';
import IcBell from 'public/icons/ic-bell.svg';
import IcMenu from 'public/icons/ic-menu.svg';
import IcChevron from 'public/icons/ic-right-chevron.svg';
import * as styles from './HomeHeader.css';

export interface HomeHeaderProps {
  currentDate: Date;
  onDateButtonClick: () => void;
}

export const HomeHeader = ({ currentDate, onDateButtonClick }: HomeHeaderProps) => {
  const formatDateHeader = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
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
            <IcChevron />
          </div>
        </button>
      }
      right={
        <div className={styles.headerActions}>
          <button className={styles.iconButton} aria-label='알림'>
            <IcBell className={`${styles.alarmIc} ${styles.icon}`} />
          </button>
          <button className={styles.iconButton} aria-label='메뉴'>
            <IcMenu className={`${styles.menuIc} ${styles.icon}`} />
          </button>
        </div>
      }
    />
  );
};
