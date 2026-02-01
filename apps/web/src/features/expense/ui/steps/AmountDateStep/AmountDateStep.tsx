'use client';

import React, { useState } from 'react';
import {
  BottomFixedArea,
  BottomSheet,
  Button,
  DateInfoField,
  InputField,
  TextInput,
} from '@/shared/ui';
import { CalendarBottomSheetTemplate } from '../../expenseBottomSheet';
import { useModal } from '@/shared/hooks';
import * as styles from './AmountDateStep.css';
import { formatDate } from '@/shared/utils';

export interface AmountDateStepProps {
  onNext: (amount: number, expendedAt: string) => void;
}

export const AmountDateStep = ({ onNext }: AmountDateStepProps) => {
  const [amount, setAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { isOpen, openModal, closeModal } = useModal();

  // 0원일경우
  const isValid = amount !== '' && +amount > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext(+amount, selectedDate.toISOString());
  };

  return (
    <>
      <div className={styles.container}>
        <InputField label='소비금액'>
          <TextInput
            placeholder='0'
            fieldType='number'
            suffix='원'
            value={amount}
            onValueChange={setAmount}
          />
        </InputField>
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

      <BottomFixedArea zIndex={-1}>
        <Button variant='primary' onClick={handleNext} disabled={!isValid} size='lg'>
          다음
        </Button>
      </BottomFixedArea>
    </>
  );
};
