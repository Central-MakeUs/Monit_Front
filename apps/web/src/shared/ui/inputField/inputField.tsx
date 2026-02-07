import React, { PropsWithChildren } from 'react';
import { Text } from '../text';
import { inputFieldContainer } from './inputField.css';
import { vars } from '../theme.css';
import { TypographyVariant } from '../text/Text';

interface InputFieldProps {
  label: string;
  labelVariant?: TypographyVariant;
  className?: string;
}

export const InputField = ({
  label,
  labelVariant = 'h2',
  className,
  children,
}: PropsWithChildren<InputFieldProps>) => {
  return (
    <div className={`${inputFieldContainer} ${className ?? ''}`}>
      <Text variant={labelVariant} color={vars.color.text.secondary}>
        {label}
      </Text>
      {children}
    </div>
  );
};
