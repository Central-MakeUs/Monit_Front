'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, vars } from '@/shared/ui';
import { notificationQueries } from '@/entities/notification';
import { NotificationCard } from '../NotificationCard';
import * as styles from './NotificationCardList.css';
import { IcNoticeDisable } from 'public/icons';

export const NotificationCardList = () => {
  const { data } = useQuery(notificationQueries.list());
  const notifications = data?.result ?? [];

  if (notifications.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.iconWrapper}>
          <IcNoticeDisable width={37} height={38} />
        </div>

        <Text variant='t4' color={vars.color.text.tertiary} align='center'>
          아직 알림이
          <br /> 도착하지 않았어요!
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
