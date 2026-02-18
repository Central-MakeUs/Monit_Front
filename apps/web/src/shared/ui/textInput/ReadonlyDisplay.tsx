'use client';

import React from 'react';
import { IcEdit } from 'public/icons';
import { Text } from '../text';
import { vars } from '../theme.css';
import * as styles from './TextInput.css';

type FieldType = 'text' | 'number';

interface ReadonlyDisplayProps {
  value: string | number;
  fieldType?: FieldType;
  suffix?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onEditClick: () => void;
}

export const ReadonlyDisplay = ({
  value,
  fieldType = 'number',
  suffix,
  disabled,
  hasError = false,
  errorMessage,
  onEditClick,
}: ReadonlyDisplayProps) => {
  const displayValue =
    fieldType === 'number' ? (value === '' || value == null ? '0' : value) : (value ?? '');

  const resolvedSuffix = suffix ?? (fieldType === 'number' ? '원' : '');

  return (
    <div className={styles.textInputContainer}>
      <div
        className={styles.inputFieldVariants[hasError ? 'error' : 'default-edit']}
        onClick={onEditClick}>
        <span className={`${styles.inputVariants[fieldType]} ${styles.inputDefaultEdit}`}>
          {displayValue}
          {resolvedSuffix}
        </span>
        <button
          type='button'
          className={styles.editButton}
          disabled={disabled || hasError}
          aria-label='수정'>
          <IcEdit color={vars.color.icon.subtle} />
        </button>
      </div>
      {hasError && errorMessage && (
        <Text variant='h1' color={vars.color.border.error}>
          {errorMessage}
        </Text>
      )}
    </div>
  );
};
