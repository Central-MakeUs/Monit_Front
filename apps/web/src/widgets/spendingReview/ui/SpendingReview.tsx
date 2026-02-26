'use client';

import {
  TopBar,
  vars,
  Text,
  DateLabel,
  PageIndicator,
  AlertDialog,
  BottomFixedArea,
  Button,
} from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { IcLeftChevron } from 'public/icons';
import React, { useEffect, useState } from 'react';
import * as styles from './SpendingReview.css';
import { ReviewCard } from './ReviewCard';
import { useReviewCarousel } from '../model/useReviewCarousel';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { useRetrospectExpenses } from '@/features/spendingReview';
import { useModal } from '@/shared/hooks';

interface SpendingReviewProps {
  date: string; // YYYY-MM-DD
}

export const SpendingReview = ({ date }: SpendingReviewProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const { expenses } = useRetrospectExpenses(date);

  const { currentIndex, trackRef, handlers, handleTransitionEnd, getTransform, getTransition } =
    useReviewCarousel({ totalItems: expenses.length });

  const [evaluations, setEvaluations] = useState<Record<number, EvaluationType>>({});

  const handleEvaluationChange = (expenseId: number, value: EvaluationType) => {
    setEvaluations((prev) => ({ ...prev, [expenseId]: value }));
  };

  const isLastCard = currentIndex === expenses.length - 1;
  const [showButton, setShowButton] = useState(isLastCard);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isLastCard) {
      setShowButton(true);
      setIsExiting(false);
    } else if (showButton) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShowButton(false);
        setIsExiting(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLastCard, showButton]);

  const slides = [expenses[currentIndex - 1], expenses[currentIndex], expenses[currentIndex + 1]];

  const handleSubmit = () => {};

  return (
    <div>
      <TopBar
        //TODO: 뒤로가기 클릭시 API 호출 추가
        left={<IcLeftChevron onClick={openModal} />}
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
      <AlertDialog
        isOpen={isOpen}
        onClose={closeModal}
        title='아직 돌아보지 않은 소비가 있어요'
        description='지금 나가더라도 기록한 내용은 저장되어요'
        variant='left'
        confirmText='계속 돌아보기'
        cancelText='나중에 하기'
        onConfirm={closeModal}
        onCancel={() => router.back()}
      />
      {showButton && (
        <BottomFixedArea zIndex={1}>
          {/* isPending/ 상태 추가 */}
          <div className={isExiting ? styles.submitButtonExit : styles.submitButtonEnter}>
            <Button variant='primary' size='lg' onClick={handleSubmit}>
              만족도 저장하기
            </Button>
          </div>
        </BottomFixedArea>
      )}
    </div>
  );
};
