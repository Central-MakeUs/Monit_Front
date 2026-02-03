'use client';

import { TopBar, vars, Text, DateLabel, PageIndicator } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './SpendingReview.css';
import { ReviewCard } from './ReviewCard';

export const SpendingReview = () => {
  const router = useRouter();
  return (
    <div>
      <TopBar
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            회고
          </Text>
        }
      />
      <div className={styles.container}>
        <Text variant='t4' color={vars.color.text.primary}>
          지금 돌아보면,
          <br /> 이 소비는 어땠나요?
        </Text>
        <DateLabel date={'2026-01-16'} />
      </div>
      <ReviewCard />
      <div className={styles.pageIndicatorWrapper}>
        <PageIndicator currentPage={1} totalPages={4} />
      </div>
    </div>
  );
};
