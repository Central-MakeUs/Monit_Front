import React from 'react';
import { IcCheckCircle, IcAttention } from 'public/icons';
import { toast, toastIcon, toastIconSvg, toastText } from './Toast.css';

export interface ToastProps {
  variant?: 'success' | 'attention';
  message: string;
}

export const Toast = ({ variant = 'success', message }: ToastProps): React.JSX.Element => {
  const Icon = variant === 'success' ? IcCheckCircle : IcAttention;

  return (
    <div className={toast}>
      <div className={toastIcon({ variant })}>
        <Icon className={toastIconSvg} />
      </div>
      <span className={toastText}>{message}</span>
    </div>
  );
};
