'use client';

import React from 'react';
import * as styles from './SpendingReview.css';
import { CategoryBtn, Divider, Text, vars } from '@/shared/ui';
import { SatisfactionRating } from '@/features/review';

export const ReviewCard = () => {
  return (
    <div className={styles.reviewCardContainer}>
      <CategoryBtn size='sm' icon={'coin'} />
      <div className={styles.textWrapper}>
        <Text variant='b4' color={vars.color.text.primary}>
          영어 회화 교습권
        </Text>
        <Text variant='b2' color={vars.color.text.tertiary}>
          자기계발
        </Text>
      </div>
      <Text variant='h4' color={vars.color.text.primary}>
        23,000원
      </Text>
      <div className={styles.situationWrapper}>
        <Text variant='b1' color={vars.color.text.secondary}>
          소비 상황
        </Text>
        <div className={styles.badgeContainer}>
          <Text variant='b2' color={vars.color.text.secondary}>
            홀린듯이
          </Text>
        </div>
      </div>
      <Divider color='#E8E8E8' />
      {/* 만족도 평가 */}
      <Text variant='b2' color={vars.color.text.tertiary}>
        소비 돌아보기
      </Text>
      <SatisfactionRating />
    </div>
  );
};
