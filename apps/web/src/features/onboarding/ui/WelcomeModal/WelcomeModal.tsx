'use client';

import React from 'react';
import { AlertDialog } from '@/shared/ui/alertDialog';
import { IcCheckCircle } from 'public/icons';
import { useWelcomeModal } from '../../lib/useWelcomeModal';

export const WelcomeModal = () => {
  const { isOpen, isMounted, handleClose, handleConfirm } = useWelcomeModal();

  if (!isMounted) return <div />;

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      variant='center'
      title='모닛에 오신걸 환영해요'
      description={`지출을 기록하며\n나에게 맞는 소비 균형을 찾아볼까요?`}
      confirmText='기록 시작하기'
      icon={<IcCheckCircle />}
    />
  );
};
