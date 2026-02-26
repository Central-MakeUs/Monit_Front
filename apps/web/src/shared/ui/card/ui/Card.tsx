'use client';

import React, { HTMLAttributes, ReactNode } from 'react';
import * as styles from './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 전체 폭 사용 여부 (기본 true) */
  fullWidth?: boolean;
  children: ReactNode;
}

export const Card = ({ children, fullWidth = true, className, onClick, ...rest }: CardProps) => {
  const interactive = Boolean(onClick);

  const composedClassName = [
    styles.card,
    fullWidth && styles.fullWidth,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={composedClassName} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};
