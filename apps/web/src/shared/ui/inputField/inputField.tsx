import React, { PropsWithChildren } from 'react';
import { Text } from '../text';
import { inputFieldContainer } from './inputField.css';
import { vars } from '../theme.css';

interface InputFieldProps {
  label: string;
  className?: string;
}

export const InputField = ({ label, className, children }: PropsWithChildren<InputFieldProps>) => {
  return (
    <div className={`${inputFieldContainer} ${className ?? ''}`}>
      <Text variant='h2' color={vars.color.text.secondary}>
        {label}
      </Text>
      {children}
    </div>
  );
};
