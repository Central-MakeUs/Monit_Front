'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useFunnel } from '@use-funnel/browser';
import * as styles from './ExpenseRecordFunnel.css';
import type {
  AmountDateStepType,
  UsageCategoryStepType,
  SatisfactionStepType,
  SubmitStepType,
} from '../model/expenseFunnelContext';
import { StepIndicator, TopBar, Text, vars, AlertDialog } from '@/shared/ui';
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
  const { isOpen, openModal, closeModal } = useModal();
  const funnel = useFunnel<{
    금액날짜입력: AmountDateStepType;
    사용처카테고리: UsageCategoryStepType;
    만족도입력: SatisfactionStepType;
    제출: SubmitStepType;
  }>({
    id: 'expense-record',
    initial: {
      step: '금액날짜입력',
      context: {},
    },
  });

  const handleSubmit = (context: SubmitStepType) => {
    // TODO: API 호출
    console.log('제출:', context);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopBar
          left={<IcLeftChevron onClick={openModal} />}
          center={
            <Text variant='t1' color={vars.color.text.primary}>
              소비기록
            </Text>
          }
        />
        <StepIndicator currentStep={STEP_NUMBER[funnel.step]} totalSteps={3} />
      </div>
      <funnel.Render
        금액날짜입력={({ history }) => (
          <AmountDateStep
            onNext={(amount: number, expendedAt: string) =>
              history.push('사용처카테고리', { amount, expendedAt })
            }
          />
        )}
        사용처카테고리={({ history }) => (
          <UsageCategoryStep
            onNext={(usageHistory: string, categoryId: number) =>
              history.push('만족도입력', { usageHistory, categoryId })
            }
          />
        )}
        만족도입력={({ history }) => (
          <SatisfactionStep
            onNext={(emotionType: string) => {
              history.push('제출', { emotionType });
            }}
          />
        )}
        제출={({ context }) => {
          handleSubmit(context);
          return null;
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={closeModal}
        variant='left'
        title='지출 기록을 그만둘까요?'
        description='지금 나가면 작성한 내용은 저장되지 않아요.'
        cancelText='나중에 하기'
        confirmText='계속 하기'
        onCancel={() => router.push('/')}
      />
    </div>
  );
};
