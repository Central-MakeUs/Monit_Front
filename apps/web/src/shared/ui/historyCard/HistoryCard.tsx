'use client';

import React, { HTMLAttributes } from 'react';
import * as styles from './HistoryCard.css';
import { CategoryBtn, CategoryIconType } from '../categoryBtn';
import { Text } from '../text';
import { Badge } from '../badge';
import { vars } from '../theme.css';

export interface HistoryCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  /** 소비처 제목 */
  title: string;
  /** 카테고리명 */
  category: CategoryIconType;
  /** 금액 */
  price: number;

  // TODO: Badge 종류 나오면 뱃지 타입 하나로 통일
  /** 뱃지 라벨 (없으면 뱃지 미표시) */
  badgeLabel?: string;
  /** 뱃지 아이콘 */
  badgeIcon?: React.ReactNode;
  disabled?: boolean;
}

export const HistoryCard = ({
  title,
  category,
  price,
  badgeLabel,
  badgeIcon,
  onClick,
  disabled = false,
  ...props
}: HistoryCardProps) => {
  return (
    <div
      className={styles.historyCardWrapper}
      onClick={disabled ? undefined : onClick}
      role='button'
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}>
      <div className={styles.contentWrapper}>
        <CategoryBtn size='sm' icon={category} hasText={false} />
        <div className={styles.labelWrapper}>
          <div className={styles.textWrapper}>
            <Text variant='b3' color={vars.color.text.primary}>
              {title}
            </Text>
            <Text variant='b1' color={vars.color.text.tertiary}>
              {category}
            </Text>
          </div>
          {badgeLabel && <Badge label={badgeLabel} icon={badgeIcon} />}
        </div>
      </div>
      <Text variant='b4' color={vars.color.text.primary} align='center' as='div'>
        {price.toLocaleString()}원
      </Text>
    </div>
  );
};
