'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { EvaluationType } from '@/shared/types/evaluation.types';
import { useToast } from '@/shared/ui';
import type { ExpenseResponseDTO } from '@/entities/expense';
import { expenseQueries as entityExpenseQueries } from '@/entities/expense';
import { ROUTES } from '@/shared/constants/routes';
import { useRetrospectExpenses } from './useRetrospectExpenses';
import { patchRemind } from '../api/patchRemind';
import { useReviewCarousel, type UseReviewCarouselReturn } from './useReviewCarousel';

type UseSpendingReviewReturn = Pick<
  UseReviewCarouselReturn,
  'trackRef' | 'handlers' | 'handleTransitionEnd' | 'getTransform' | 'getTransition'
> & {
  expenses: ExpenseResponseDTO[];
  currentIndex: number;
  slides: (ExpenseResponseDTO | undefined)[];
  evaluations: Record<number, EvaluationType>;
  handleEvaluationChange: (expenseId: number, value: EvaluationType) => void;
  showButton: boolean;
  isExiting: boolean;
  handleSave: () => void;
  isPending: boolean;
};

interface UseSpendingReviewParams {
  date: string;
}

export const useSpendingReview = ({ date }: UseSpendingReviewParams): UseSpendingReviewReturn => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

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

  const { mutate: saveRemind, isPending } = useMutation({
    mutationFn: patchRemind,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: entityExpenseQueries.all });
      queryClient.invalidateQueries({ queryKey: ['dailyAverageSatisfaction'] });
      toast.success('만족도 기록이 잘 저장되었어요!');
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

  return {
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
  };
};
