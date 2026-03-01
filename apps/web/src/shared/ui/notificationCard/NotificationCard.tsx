import * as styles from './NotificationCard.css';
import React, { ReactNode } from 'react';
import { Text, vars } from '@/shared/ui';
import Link from 'next/link';

export interface NotificationCardProps {
  /** 알림 상태 */
  state?: 'default' | 'active' | 'unread';
  /** 아이콘 React 노드 */
  icon: ReactNode;
  /** 카테고리 라벨 (예: "회고 알림") */
  title: string;
  /** 알림 본문 메시지 */
  message: string;
  /** 날짜 텍스트 (예: "1월 30일") */
  date: string;
  /** 액션 버튼 라벨 (예: "소비 돌아보기") */
  actionLabel?: string;
  /** 액션 버튼 링크 URL */
  url?: string;
}

export const NotificationCard = ({
  state = 'default',
  icon,
  title,
  message,
  date,
  actionLabel,
  url,
}: NotificationCardProps) => {
  return (
    <div className={styles.cardVariants[state]}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Text variant='b2' color={vars.color.text.tertiary}>
            {title}
          </Text>
          <Text variant='b2' color={vars.color.text.tertiary}>
            {date}
          </Text>
        </div>
        <Text variant='b3' color={vars.color.text.secondary}>
          {message}
        </Text>
        {actionLabel && url && (
          <Link href={url}>
            <Text variant='h1' color={vars.color.bg.brand.default}>
              {actionLabel}
            </Text>
          </Link>
        )}
      </div>
    </div>
  );
};
