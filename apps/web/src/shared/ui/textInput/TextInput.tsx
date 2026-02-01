'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { IcClear } from 'public/icons';
import * as styles from './TextInput.css';
import { vars } from '../theme.css';
import { Text } from '../text';
import { useCombinedRefs } from '@/shared/hooks/useCombinedRefs';
import { useControlledValue } from '@/shared/hooks/useControlledValue';
import { getTextWidth } from '@/shared/utils/getTextWidth';
import { normalizeNumberValue } from '@/shared/utils/inputFormatters';

type TextInputState = 'disabled' | 'default' | 'active' | 'error';
type TextInputType = 'text' | 'number';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  maxLength?: number;
  showMaxLength?: boolean;
  fieldType?: TextInputType;
  state?: TextInputState;
  error?: boolean;
  /** 메시지 (에러 상태일 때 빨간색으로 표시) */
  errorMessage?: string;
  maxNumber?: number;
  suffix?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      maxLength,
      showMaxLength = true,
      fieldType = 'text',
      state: externalState,
      error = false,
      errorMessage,
      maxNumber,
      suffix,
      value,
      placeholder,
      disabled,
      onChange,
      onFocus,
      onBlur,
      onValueChange,
      onClear,
      ...restProps
    },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentValue, setCurrentValue] = useControlledValue(
      value as string | undefined,
      (restProps.defaultValue as string) ?? '',
      onValueChange
    );
    const [isFocused, setIsFocused] = useState(false);
    const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

    const hasValidationError = (() => {
      if (fieldType === 'text' && maxLength && String(currentValue).length > maxLength) {
        return true;
      }
      if (fieldType === 'number' && maxNumber !== undefined && currentValue) {
        const numValue = Number(currentValue);
        if (!isNaN(numValue) && numValue > maxNumber) {
          return true;
        }
      }
      return false;
    })();

    const getFieldState = (): TextInputState => {
      if (externalState) return externalState;
      if (disabled) return 'disabled';
      if (error || hasValidationError) return 'error';
      if (isFocused) return 'active';
      return 'default';
    };

    const fieldState = getFieldState();
    const showClearButton = currentValue && fieldState !== 'disabled';

    // '원' 이 있을 때 입력값 폭 계산하기
    useLayoutEffect(() => {
      if (suffix && inputRef.current) {
        const displayValue =
          currentValue !== '' && currentValue != null ? String(currentValue) : (placeholder ?? '');
        const font = window.getComputedStyle(inputRef.current).font;
        const textWidth = getTextWidth({ text: displayValue, options: { font } });
        setInputWidth(textWidth);
      }
    }, [currentValue, placeholder, suffix]);

    // refs 합치기
    const combinedRef = useCombinedRefs(inputRef, forwardedRef) as React.Ref<HTMLInputElement>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (fieldType === 'number') {
        newValue = normalizeNumberValue(newValue);
      }

      setCurrentValue(newValue);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = () => {
      setCurrentValue('');
      onClear?.();
      inputRef.current?.focus();
    };

    return (
      <div className={styles.textInputContainer}>
        <div className={styles.inputFieldVariants[fieldState]}>
          <div className={styles.inputWrapper}>
            <input
              {...restProps}
              ref={combinedRef}
              type={fieldType === 'number' ? 'number' : 'text'}
              inputMode={fieldType === 'number' ? 'numeric' : undefined}
              value={currentValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder={placeholder}
              autoComplete='off'
              style={suffix && inputWidth ? { width: inputWidth } : undefined}
              className={`${styles.inputVariants[fieldType]} ${fieldState === 'disabled' ? styles.inputDisabled : ''} ${suffix ? styles.inputWithSuffix : ''}`}
            />
            {suffix && (
              <span
                className={`${styles.suffix[fieldType]} ${currentValue ? styles.suffixDefault : styles.suffixPlaceholder}`}>
                {suffix}
              </span>
            )}
          </div>

          <button
            type='button'
            className={`${styles.clearButton} ${!showClearButton ? styles.clearButtonHidden : ''}`}
            onClick={handleClear}
            aria-label='지우기'
            tabIndex={showClearButton ? 0 : -1}>
            <IcClear className={styles.clearIcon} />
          </button>
        </div>

        <div className={styles.descriptionContainer}>
          {errorMessage ? (
            <Text
              variant='h1'
              color={
                hasValidationError || error ? vars.color.border.error : vars.color.text.secondary
              }>
              {errorMessage}
            </Text>
          ) : (
            <Text variant='h1'>{'\u00A0'}</Text>
          )}
          {showMaxLength && maxLength && fieldType === 'text' && (
            <Text
              variant='b1'
              color={
                hasValidationError || error ? vars.color.border.error : vars.color.text.secondary
              }>
              {String(currentValue).length}/{maxLength}
            </Text>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
