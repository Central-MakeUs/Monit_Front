'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import * as styles from './ExpenseRecordFunnel.css';
import type {
  AmountDateStepType,
  UsageCategoryStepType,
  AddCategoryStepType,
  SatisfactionStepType,
  SubmitStepType,
} from '../model/expenseFunnelContext';
import { useExpenseFormStore } from '../model/store';
import { StepIndicator, TopBar, Text, vars, AlertDialog, useToast } from '@/shared/ui';
import { useModal } from '@/shared/hooks';
import { formatDateToISO } from '@/shared/utils';
import { IcLeftChevron } from 'public/icons';
import {
  AmountDateStep,
  SatisfactionStep,
  UsageCategoryStep,
  AddCategoryStep,
} from '@/features/expense/ui/steps';
import { expenseQueries } from '@/features/expense/model/expenseQueries';
import type { EmotionType } from '@/features/expense/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseReportQueries } from '@/entities/expenseReport';
import { expenseQueries as entityExpenseQueries } from '@/entities/expense';
import { ROUTES } from '@/shared/constants';
import { handleApiError } from '@/shared/api';

const STEP_NUMBER = {
  금액날짜입력: 1,
  사용처카테고리: 2,
  카테고리추가: 2,
  만족도입력: 3,
  제출: 3,
} as const;

export const ExpenseRecordFunnel = () => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModal();
  const formStore = useExpenseFormStore();
  const funnel = useFunnel<{
    금액날짜입력: AmountDateStepType;
    사용처카테고리: UsageCategoryStepType;
    카테고리추가: AddCategoryStepType;
    만족도입력: SatisfactionStepType;
    제출: SubmitStepType;
  }>({
    id: 'expense-record',
    initial: {
      step: '금액날짜입력',
      context: {
        amount: formStore.amount || 0,
        expendedAt: formStore.expendedAt || formatDateToISO(new Date()),
      } satisfies AmountDateStepType,
    },
  });

  const handleBack = useCallback(() => {
    if (funnel.step === '금액날짜입력') {
      openModal();
    } else {
      window.history.back();
    }
  }, [funnel.step, openModal]);

  const handleAmountDateNext =
    (history: {
      push: (step: '사용처카테고리', context: { amount: number; expendedAt: string }) => void;
    }) =>
    (amount: number, expendedAt: string) => {
      formStore.setAmountDate(amount, expendedAt);
      history.push('사용처카테고리', { amount, expendedAt });
    };

  const handleUsageCategoryNext =
    (history: {
      push: (step: '만족도입력', context: { usageHistory: string; categoryId: number }) => void;
    }) =>
    (usageHistory: string, categoryId: number) => {
      formStore.setUsageCategory(usageHistory, categoryId);
      history.push('만족도입력', { usageHistory, categoryId });
    };

  const { mutate: submitExpense, isPending } = useMutation({
    ...expenseQueries.recordMutation(),
    onError: (error) => {
      handleApiError(error, {
        toast,
        fallback: '저장에 실패했어요. 다시 시도해 주세요.',
        context: 'expense.create',
      });
    },
  });

  const handleSubmit = (emotionType: EmotionType) => {
    if (isPending) return;
    formStore.setEmotionType(emotionType);
    const context = funnel.context as SatisfactionStepType;
    submitExpense(
      {
        ...context,
        emotionType,
      },
      {
        onSuccess: () => {
          // 월별/일일 지출·요약 캐시 무효화 → 이번 달 지출 금액 등 즉시 반영
          queryClient.invalidateQueries({ queryKey: entityExpenseQueries.all });
          queryClient.invalidateQueries({ queryKey: expenseReportQueries.all });
          formStore.reset();
          toast.success('소비 기록이 저장되었어요.');
          router.push(ROUTES.HOME);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      {funnel.step !== '카테고리추가' && (
        <div className={styles.header}>
          <TopBar
            left={<IcLeftChevron onClick={handleBack} />}
            center={
              <Text variant='t1' color={vars.color.text.primary}>
                소비 기록
              </Text>
            }
            right={
              <Text variant='h4' color={vars.color.text.secondary} onClick={openModal}>
                나가기
              </Text>
            }
          />
          <StepIndicator currentStep={STEP_NUMBER[funnel.step]} totalSteps={3} />
        </div>
      )}
      <funnel.Render
        금액날짜입력={({ history }) => (
          <AmountDateStep
            defaultAmount={formStore.amount}
            defaultDate={formStore.expendedAt}
            onNext={handleAmountDateNext(history)}
          />
        )}
        사용처카테고리={({ history }) => (
          <UsageCategoryStep
            defaultUsageHistory={formStore.usageHistory}
            defaultCategoryId={formStore.categoryId}
            onNext={handleUsageCategoryNext(history)}
            onAddCategory={() => history.push('카테고리추가', {})}
          />
        )}
        카테고리추가={() => <AddCategoryStep onBack={() => window.history.back()} />}
        만족도입력={() => (
          <SatisfactionStep
            defaultEmotionType={formStore.emotionType}
            onNext={handleSubmit}
            isSubmitting={isPending}
          />
        )}
        제출={() => null}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={closeModal}
        variant='left'
        title='지출 기록을 그만둘까요?'
        description='지금 나가면 작성한 내용은 저장되지 않아요.'
        cancelText='나중에 하기'
        confirmText='계속 하기'
        onCancel={() => {
          formStore.reset();
          router.push(ROUTES.HOME);
        }}
      />
    </div>
  );
};
