'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, vars } from '@/shared/ui';
import { notificationQueries } from '@/entities/notification';
import { NotificationCard } from '../NotificationCard';
import * as styles from './NotificationCardList.css';

export const NotificationCardList = () => {
  const { data } = useQuery(notificationQueries.list());
  const notifications = data?.result ?? [];

  if (notifications.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Text variant='b2' color={vars.color.text.tertiary}>
          알림이 없어요
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {notifications.map((notification, index) => (
        <NotificationCard notification={notification} key={notification.alertId ?? index} />
      ))}
    </div>
  );
};
