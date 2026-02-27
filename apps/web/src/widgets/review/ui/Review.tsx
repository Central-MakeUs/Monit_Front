'use client';

import { TopBar, vars, Text, DateLabel, AlertDialog, BottomFixedArea, Button } from '@/shared/ui';
import { IcLeftChevron } from 'public/icons';
import React from 'react';
import * as styles from './Review.css';
import { useModal } from '@/shared/hooks';
import { useSpendingReview } from '@/features/review';
import { ReviewCard } from './reviewCard';

interface SpendingReviewProps {
  date: string; // YYYY-MM-DD
}

export const Review = ({ date }: SpendingReviewProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    expenses,
    currentIndex,
    slides,
    evaluations,
    handleEvaluationChange,
    trackRef,
    handlers,
    handleTransitionEnd,
    getTransform,
    getTransition,
    showButton,
    isExiting,
    handleSave,
    isPending,
  } = useSpendingReview({ date });

  return (
    <div>
      <TopBar
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

      <div className={styles.carouselWrapper}>
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
      </div>

      {/* <div className={styles.pageIndicatorWrapper}>
        <PageIndicator currentPage={currentIndex} totalPages={expenses.length} />
      </div> */}
      <AlertDialog
        isOpen={isOpen}
        onClose={closeModal}
        title='아직 돌아보지 않은 소비가 있어요'
        description='지금 나가더라도 기록한 내용은 저장되어요'
        variant='left'
        confirmText='계속 돌아보기'
        cancelText='나중에 하기'
        onConfirm={closeModal}
        onCancel={handleSave}
      />
      {showButton && (
        <BottomFixedArea zIndex={1}>
          <div className={isExiting ? styles.submitButtonExit : styles.submitButtonEnter}>
            <Button variant='primary' size='lg' onClick={handleSave} disabled={isPending}>
              만족도 저장하기
            </Button>
          </div>
        </BottomFixedArea>
      )}
    </div>
  );
};
