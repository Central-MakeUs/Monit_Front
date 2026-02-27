'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { IcBell } from 'public/icons';
import { notificationQueries } from '@/entities/notification';
import * as styles from './NotificationBell.css';

export const NotificationBell = (): React.JSX.Element => {
  const { data } = useQuery(notificationQueries.unreadStatus());
  const hasUnread = data?.result ?? false;

  return (
    <div className={styles.wrapper}>
      <IcBell />
      {hasUnread && <span className={styles.dot} aria-hidden='true' />}
    </div>
  );
};
