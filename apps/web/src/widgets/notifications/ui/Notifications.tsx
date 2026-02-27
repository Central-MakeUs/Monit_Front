'use client';

import React from 'react';
import { NotificationCardList } from '@/features/notification';
import { NotificationsHeader } from './NotificationsHeader';
import * as styles from './Notifications.css';

interface NotificationsProps {
  onBackClick: () => void;
}

export const Notifications = ({ onBackClick }: NotificationsProps) => {
  return (
    <div className={styles.container}>
      <NotificationsHeader onBackClick={onBackClick} />
      <NotificationCardList />
    </div>
  );
};
