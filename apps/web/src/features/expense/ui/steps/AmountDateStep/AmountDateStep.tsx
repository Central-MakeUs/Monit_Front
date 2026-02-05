'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BottomFixedArea,
  BottomSheet,
  Button,
  DateInfoField,
  InputField,
  TextInput,
} from '@/shared/ui';
import { CalendarBottomSheetTemplate } from './CalendarBottomSheet';
import { useModal } from '@/shared/hooks';
import * as styles from './AmountDateStep.css';
import { formatDate } from '@/shared/utils';

export interface AmountDateStepProps {
  onNext: (amount: number, expendedAt: string) => void;
  defaultAmount?: number;
  defaultDate?: string;
}

export const AmountDateStep = ({ onNext, defaultAmount, defaultDate }: AmountDateStepProps) => {
  const formatNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, '');
    if (!number) return '';
    return Number(number).toLocaleString();
  };

  const [amount, setAmount] = useState(
    defaultAmount != null ? formatNumber(String(defaultAmount)) : ''
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const [showError, setShowError] = useState(false);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  const cleanAmount = amount.replace(/,/g, '');
  // 0원일경우
  const isValid = cleanAmount !== '' && +cleanAmount > 0;

  const handleNext = () => {
    if (!isValid) return;
    onNext(+cleanAmount, selectedDate.toISOString());
  };

  const handleAmountChange = (newAmount: string) => {
    const formattedAmount = formatNumber(newAmount);
    setAmount(formattedAmount);

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    if (!formattedAmount) {
      setShowError(true);
      errorTimerRef.current = setTimeout(() => {
        setShowError(false);
      }, 3000);
    } else {
      setShowError(false);
    }
  };

  const errorMessage = showError ? '소비금액을 입력해주세요' : undefined;

  return (
    <>
      <div className={styles.container}>
        <InputField label='소비금액'>
          <TextInput
            placeholder='0'
            fieldType='number'
            suffix='원'
            value={amount}
            onValueChange={handleAmountChange}
            error={!!errorMessage}
            errorMessage={errorMessage}
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
