'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationQueries } from '@/entities/notification';
import { NotificationCardList } from '@/features/notification';
import { NotificationsHeader } from './NotificationsHeader';
import * as styles from './Notifications.css';

interface NotificationsProps {
  onBackClick: () => void;
}

export const Notifications = ({ onBackClick }: NotificationsProps) => {
  const queryClient = useQueryClient();
  const { mutate: readAll } = useMutation({
    ...notificationQueries.readAllMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationQueries.all });
    },
  });

  const handleBackClick = () => {
    readAll();
    onBackClick();
  };

  return (
    <div className={styles.container}>
      <NotificationsHeader onBackClick={handleBackClick} />
      <NotificationCardList />
    </div>
  );
};
