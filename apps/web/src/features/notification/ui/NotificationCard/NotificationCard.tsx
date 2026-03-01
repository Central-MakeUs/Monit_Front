'use client';

import React from 'react';
import { NotificationCard as NotificationCardUI } from '@/shared/ui/notificationCard';
import { IcAlertReport, IcNotice } from 'public/icons';
import type { NotificationResponseDTO } from '@/entities/notification';
import { formatDateToMonthDay } from '@/shared/utils';
import { CATEGORY_LABEL } from '../../model/categoryLabel';

interface NotificationCardProps {
  notification: NotificationResponseDTO;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { alertId, alertType, title, message, isRead, createdAt, redirectUrl } = notification;

  const icon = alertType === 'SERVICE_NOTICE' ? <IcNotice /> : <IcAlertReport />;
  const state = isRead ? 'default' : 'unread';
  const actionLabel = alertType ? CATEGORY_LABEL[alertType] : '';

  return (
    <NotificationCardUI
      key={alertId}
      state={state}
      icon={icon}
      title={title ?? ''}
      message={message ?? ''}
      date={formatDateToMonthDay(createdAt)}
      actionLabel={actionLabel}
      url={redirectUrl}
    />
  );
};
