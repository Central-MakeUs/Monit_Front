'use client';

import React from 'react';
import { AlertDialog } from '@/shared/ui/alertDialog';
import { useOnboardingStore } from '../model/onboardingStore';
import { IcCheckCircle } from 'public/icons';
import { useClientOnly } from '@/shared/hooks/useClientOnly';

export const WelcomeModal = () => {
  const { flow, startTour } = useOnboardingStore();
  const isMounted = useClientOnly();

  if (!isMounted) return <div />;

  const handleClose = () => {
    const currentFlow = useOnboardingStore.getState().flow;
    if (currentFlow !== 'tour') {
      startTour();
    }
  };

  return (
    <AlertDialog
      isOpen={flow === 'welcome'}
      onClose={handleClose}
      onConfirm={startTour}
      variant='center'
      title='모닛에 오신걸 환영해요'
      description={`지출을 기록하며\n나에게 맞는 소비 균형을 찾아볼까요?`}
      confirmText='기록 시작하기'
      icon={<IcCheckCircle />}
    />
  );
};
