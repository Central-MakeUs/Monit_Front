import React, { PropsWithChildren } from 'react';
import { Text } from '../text';
import { inputFieldContainer } from './inputField.css';
import { vars } from '../theme.css';

interface InputFieldProps {
  label: string;
}

export const InputField = ({ label, children }: PropsWithChildren<InputFieldProps>) => {
  return (
    <div className={inputFieldContainer}>
      <Text variant='h2' color={vars.color.text.secondary}>
        {label}
      </Text>
      {children}
    </div>
  );
};
