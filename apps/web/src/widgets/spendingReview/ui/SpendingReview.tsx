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
import React, { useEffect, useRef, useState } from 'react';
import * as styles from './SpendingReview.css';
import { ReviewCard } from './ReviewCard';
import { useReviewCarousel } from '../model/useReviewCarousel';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { useRetrospectExpenses, patchRemind } from '@/features/spendingReview';
import { useModal } from '@/shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseQueries as entityExpenseQueries } from '@/entities/expense';
import { ROUTES } from '@/shared/constants/routes';

interface SpendingReviewProps {
  date: string; // YYYY-MM-DD
}

export const SpendingReview = ({ date }: SpendingReviewProps) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();

  const { expenses } = useRetrospectExpenses(date);

  const {
    currentIndex,
    trackRef,
    handlers,
    handleTransitionEnd,
    getTransform,
    getTransition,
    goToNext,
  } = useReviewCarousel({ totalItems: expenses.length });

  const [evaluations, setEvaluations] = useState<Record<number, EvaluationType>>({});
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLastCard = currentIndex === expenses.length - 1;
  const [showButton, setShowButton] = useState(isLastCard);
  const [isExiting, setIsExiting] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: saveRemind, isPending } = useMutation({
    mutationFn: patchRemind,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entityExpenseQueries.all });
      router.push(ROUTES.HOME);
    },
  });

  const buildRemindBody = () =>
    Object.entries(evaluations).map(([id, type]) => ({
      expenseId: Number(id),
      evaluationType: type,
    }));

  const handleSave = () => {
    const body = buildRemindBody();
    if (body.length > 0) {
      saveRemind(body);
    } else {
      router.push(ROUTES.HOME);
    }
  };

  const handleEvaluationChange = (expenseId: number, value: EvaluationType) => {
    setEvaluations((prev) => ({ ...prev, [expenseId]: value }));

    if (!isLastCard) {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = setTimeout(() => {
        goToNext();
      }, 2000);
    }
  };

  useEffect(
    () => () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    },
    []
  );

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
