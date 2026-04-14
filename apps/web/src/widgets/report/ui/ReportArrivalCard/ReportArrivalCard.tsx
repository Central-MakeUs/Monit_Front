'use client';

import React from 'react';
import { Card, Text, Button, vars } from '@/shared/ui';
import { IcClear } from 'public/icons';
import * as styles from './ReportArrivalCard.css';
import Image from 'next/image';

export interface ReportArrivalCardProps {
  month: number;
  year: number;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ReportArrivalCard = ({
  month,
  onConfirm,
  onDismiss,
}: ReportArrivalCardProps): React.JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Card>
        <div className={styles.flexWrapper}>
          <button
            type='button'
            className={styles.dismissBtn}
            onClick={onDismiss}
            aria-label='리포트 도착 카드 닫기'>
            <IcClear className={styles.dismissIcon} aria-hidden />
          </button>

          <div className={styles.header}>
            <Text variant='h1' color={vars.color.text.secondary}>
              월간 분석 리포트
            </Text>
            <p className={styles.subtitle}>
              {month}월의 소비 분석 리포트가
              <br />
              지금 막 도착했어요
            </p>
          </div>

          <div className={styles.imageArea}>
            <Image src='/images/coin.png' alt='' fill className={styles.image} />
          </div>

          <div className={styles.footer}>
            <Button size='md' variant='brand' onClick={onConfirm}>
              리포트 확인하기
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
