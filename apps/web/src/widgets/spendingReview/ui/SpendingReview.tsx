'use client';

import { TopBar, vars, Text, DateLabel, PageIndicator } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { IcLeftChevron } from 'public/icons';
import React, { useState } from 'react';
import * as styles from './SpendingReview.css';
import { ReviewCard } from './ReviewCard';
import { useReviewCarousel } from '../model/useReviewCarousel';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { useRetrospectExpenses } from '@/features/spendingReview';

interface SpendingReviewProps {
  date: string; // YYYY-MM-DD
}

export const SpendingReview = ({ date }: SpendingReviewProps) => {
  const router = useRouter();
  const { expenses } = useRetrospectExpenses(date);

  const { currentIndex, trackRef, handlers, handleTransitionEnd, getTransform, getTransition } =
    useReviewCarousel({ totalItems: expenses.length });

  const [evaluations, setEvaluations] = useState<Record<number, EvaluationType>>({});

  const handleEvaluationChange = (expenseId: number, value: EvaluationType) => {
    setEvaluations((prev) => ({ ...prev, [expenseId]: value }));
  };

  const slides = [expenses[currentIndex - 1], expenses[currentIndex], expenses[currentIndex + 1]];

  return (
    <div>
      <TopBar
        //TODO: 뒤로가기 클릭시 API 호출 추가
        left={<IcLeftChevron onClick={() => router.back()} />}
        center={
          <Text variant='t1' color={vars.color.text.primary}>
            돌아보기
          </Text>
        }
      />
      <div className={styles.container}>
        <Text variant='t4' color={vars.color.text.primary} className={styles.titleText}>
          지금 돌아보면,
          <br /> 이 소비는 어땠나요?
        </Text>
        <DateLabel date={date} />
      </div>

      <div className={styles.carouselContainer} {...handlers}>
        <div
          ref={trackRef}
          className={styles.carouselTrack}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: getTransform(),
            transition: getTransition(),
          }}>
          {slides.map((expense, i) => (
            <div key={expense?.expenseId ?? `empty-${i}`} className={styles.carouselSlide}>
              {expense && (
                <ReviewCard
                  {...expense}
                  currentPage={currentIndex + i}
                  totalPages={expenses.length}
                  evaluationType={evaluations[expense.expenseId]}
                  onEvaluationChange={(value) => handleEvaluationChange(expense.expenseId, value)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pageIndicatorWrapper}>
        <PageIndicator currentPage={currentIndex} totalPages={expenses.length} />
      </div>
    </div>
  );
};
