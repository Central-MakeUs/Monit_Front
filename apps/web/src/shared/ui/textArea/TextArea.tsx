'use client';

import React, { ChangeEvent, forwardRef, useState } from 'react';
import * as styles from './TextArea.css';

export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ maxLength = 1000, value, onChange, placeholder, ...restProps }, ref) => {
    const [internalValue, setInternalValue] = useState('');
    const currentValue = value ?? internalValue;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) return;

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const hasValue = currentValue.length > 0;
    const isAtLimit = maxLength !== undefined && currentValue.length >= maxLength;

    return (
      <div className={styles.container}>
        <textarea
          ref={ref}
          className={styles.textArea}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          {...restProps}
        />
        <span
          className={`${styles.charCount} ${isAtLimit ? styles.charCountLimit : hasValue ? styles.charCountActive : ''}`}>
          {currentValue.length}/{maxLength}
        </span>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
