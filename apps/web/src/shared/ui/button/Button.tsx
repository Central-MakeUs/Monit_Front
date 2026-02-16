'use client';

import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { button } from './Button.css';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>): React.JSX.Element => {
  return (
    <button
      className={button({ variant, size, disabled })}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}>
      {children}
    </button>
  );
};
