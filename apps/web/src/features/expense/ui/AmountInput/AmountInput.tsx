'use client';

import React, { useState, useRef, useEffect } from 'react';
import { InputField, TextInput } from '@/shared/ui';
import { formatNumberWithComma } from '@/shared/utils';
import { EXPENSE_CONSTANTS, EXPENSE_ERROR_MESSAGES } from '@/entities/expense';

export interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultAmount?: number;
}

export const AmountInput = ({ value, onChange }: AmountInputProps) => {
  const [showError, setShowError] = useState(false);
  const [isOverMaxAmount, setIsOverMaxAmount] = useState(false);
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  const handleAmountChange = (newAmount: string) => {
    const formattedAmount = formatNumberWithComma(newAmount);
    const numericAmount = Number(formattedAmount.replace(/,/g, ''));

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }

    // 최대 금액 초과 체크
    if (numericAmount > EXPENSE_CONSTANTS.MAX_AMOUNT) {
      setShowError(true);
      setIsOverMaxAmount(true);
      return;
    }

    onChange(formattedAmount);
    setIsOverMaxAmount(false);

    if (!formattedAmount) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const errorMessage = showError
    ? isOverMaxAmount
      ? EXPENSE_ERROR_MESSAGES.OVER_MAX_AMOUNT
      : EXPENSE_ERROR_MESSAGES.EMPTY_AMOUNT
    : undefined;

  return (
    <InputField label='소비금액'>
      <TextInput
        placeholder='0'
        fieldType='number'
        suffix='원'
        value={value}
        onValueChange={handleAmountChange}
        error={!!errorMessage}
        errorMessage={errorMessage}
      />
    </InputField>
  );
};
