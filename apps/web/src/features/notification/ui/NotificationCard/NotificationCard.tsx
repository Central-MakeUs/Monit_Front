'use client';

import React from 'react';
import { NotificationCard as NotificationCardUI } from '@/shared/ui/notificationCard';
import { IcAlertReport, IcNotice } from 'public/icons';
import type { NotificationResponseDTO, NotificationType } from '@/entities/notification';

const CATEGORY_LABEL: Record<NotificationType, string> = {
  RETROSPECT: '소비 돌아보기',
  WEEKLY_REPORT: '분석 리포트 보러가기',
  SERVICE_NOTICE: '',
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}월 ${day}일`;
};

interface NotificationCardProps {
  notification: NotificationResponseDTO;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { alertId, alertType, title, message, isRead, createdAt, redirectUrl } = notification;

  const icon = alertType === 'SERVICE_NOTICE' ? <IcNotice /> : <IcAlertReport />;
  const state = isRead ? 'default' : 'unread';
  const actionLabel = alertType ? CATEGORY_LABEL[alertType] : '';

  return (
    <div onClick={() => {}}>
      <NotificationCardUI
        key={alertId}
        state={state}
        icon={icon}
        title={title ?? ''}
        message={message ?? ''}
        date={formatDate(createdAt)}
        actionLabel={actionLabel}
        url={redirectUrl}
      />
    </div>
  );
};
