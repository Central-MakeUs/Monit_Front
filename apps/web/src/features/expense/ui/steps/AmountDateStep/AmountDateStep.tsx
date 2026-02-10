'use client';

import React, { useState } from 'react';
import { BottomFixedArea, BottomSheet, Button, DateInfoField } from '@/shared/ui';
import { CalendarBottomSheetTemplate } from './CalendarBottomSheet';
import { useModal } from '@/shared/hooks';
import * as styles from './AmountDateStep.css';
import { formatDate, formatDateToISO, formatNumberWithComma } from '@/shared/utils';
import { AmountInput } from '../../amountInput';

export interface AmountDateStepProps {
  onNext: (amount: number, expendedAt: string) => void;
  defaultAmount?: number;
  defaultDate?: string;
}

export const AmountDateStep = ({ onNext, defaultAmount, defaultDate }: AmountDateStepProps) => {
  const [amount, setAmount] = useState(
    defaultAmount != null ? formatNumberWithComma(String(defaultAmount)) : ''
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const { isOpen, openModal, closeModal } = useModal();

  const cleanAmount = amount.replace(/,/g, '');
  // 0원일경우
  const isValid = cleanAmount !== '' && +cleanAmount > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext(+cleanAmount, formatDateToISO(selectedDate));
  };

  return (
    <>
      <div className={styles.container}>
        <AmountInput value={amount} onChange={setAmount} defaultAmount={defaultAmount} />
        <DateInfoField label='소비일' value={formatDate(selectedDate)} onClick={openModal} />
      </div>
      <BottomSheet isOpen={isOpen} onClose={closeModal}>
        <CalendarBottomSheetTemplate
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onClose={closeModal}
          onConfirm={closeModal}
        />
      </BottomSheet>

      <BottomFixedArea zIndex={1}>
        <Button variant='primary' onClick={handleNext} disabled={!isValid} size='lg'>
          다음
        </Button>
      </BottomFixedArea>
    </>
  );
};
