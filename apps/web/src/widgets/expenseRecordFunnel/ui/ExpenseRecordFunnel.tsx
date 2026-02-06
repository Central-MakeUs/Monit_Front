'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import * as styles from './ExpenseRecordFunnel.css';
import type {
  AmountDateStepType,
  UsageCategoryStepType,
  SatisfactionStepType,
  SubmitStepType,
} from '../model/expenseFunnelContext';
import { useExpenseFormStore } from '../model/store';
import { StepIndicator, TopBar, Text, vars, AlertDialog, useToast } from '@/shared/ui';
import { useModal } from '@/shared/hooks';
import { IcLeftChevron } from 'public/icons';
import { AmountDateStep, SatisfactionStep, UsageCategoryStep } from '@/features/expense/ui/steps';

const STEP_NUMBER = {
  금액날짜입력: 1,
  사용처카테고리: 2,
  만족도입력: 3,
  제출: 3,
} as const;

export const ExpenseRecordFunnel = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const formStore = useExpenseFormStore();
  const funnel = useFunnel<{
    금액날짜입력: AmountDateStepType;
    사용처카테고리: UsageCategoryStepType;
    만족도입력: SatisfactionStepType;
    제출: SubmitStepType;
  }>({
    id: 'expense-record',
    initial: {
      step: '금액날짜입력',
      context: {
        amount: formStore.amount || 0,
        expendedAt: formStore.expendedAt || new Date().toISOString(),
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

  const handleSubmit = (emotionType: string) => {
    formStore.setEmotionType(emotionType);
    // TODO: API 호출
    console.log('제출:', { ...funnel.context, emotionType });
    formStore.reset();
    toast.success('소비 기록이 저장되었어요.');
    router.push('/');
  };

  return (
    <div className={styles.container}>
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
          />
        )}
        만족도입력={() => (
          <SatisfactionStep defaultEmotionType={formStore.emotionType} onNext={handleSubmit} />
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
          router.push('/');
        }}
      />
    </div>
  );
};
