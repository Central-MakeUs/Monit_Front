'use client';

import React, { useState } from 'react';
import { Text, Badge, vars } from '@/shared/ui';
import { IcRightChevron } from 'public/icons';
import * as styles from './MonthlyReportCard.css';

export interface ReportItem {
  label: string;
  onClick: () => void;
}

export interface MonthlyReportCardProps {
  /** "YY년 M월" 형식의 배지 레이블 (예: "26년 2월") */
  monthLabel: string;
  /** 포맷된 금액 문자열 (예: "240,000원") */
  amountText: string;
  reportItems: ReportItem[];
  /** 펼침 상태 변경 콜백 (지연 페칭용) */
  onExpandedChange?: (expanded: boolean) => void;
}

export const MonthlyReportCard = ({
  monthLabel,
  amountText,
  reportItems,
  onExpandedChange,
}: MonthlyReportCardProps): React.JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    onExpandedChange?.(next);
  };

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.badgeWrapper}>
          <Badge label={monthLabel} size='xs' />
        </div>
        <div className={styles.contentBlock}>
          <Text variant='h1' color={vars.color.text.secondary}>
            소비 내역
          </Text>
          <Text variant='h3' color={vars.color.text.primary}>
            {amountText}
          </Text>
        </div>
      </div>

      <div
        className={`${styles.listCollapser} ${isExpanded ? styles.listCollapserExpanded : ''}`}
        aria-hidden={!isExpanded}>
        <div className={styles.listInner}>
          <ul className={styles.listContainer}>
            {reportItems.map((item) => (
              <li key={item.label}>
                <button
                  type='button'
                  className={styles.listItem}
                  onClick={item.onClick}
                  tabIndex={isExpanded ? 0 : -1}>
                  <Text variant='b2' color={vars.color.text.secondary}>
                    {item.label}
                  </Text>
                  <IcRightChevron className={styles.listItemChevron} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type='button'
        className={styles.ctaButton}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-label={`${monthLabel} 리포트 ${isExpanded ? '닫기' : '전체보기'}`}>
        <Text variant='b2' color={vars.color.text.secondary}>
          {isExpanded ? '리포트 닫기' : '리포트 전체보기'}
        </Text>
        <IcRightChevron
          className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
          aria-hidden
        />
      </button>
    </div>
  );
};
