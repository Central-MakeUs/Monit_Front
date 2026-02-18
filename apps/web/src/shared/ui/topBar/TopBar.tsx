import React, { HTMLAttributes, ReactNode } from 'react';
import { container, leftSection, centerSection, rightSection } from './TopBar.css';

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export const TopBar = ({ left, center, right, className, ...props }: TopBarProps) => {
  return (
    <header className={`${container} ${className || ''}`} {...props}>
      <div className={leftSection}>{left}</div>
      <div className={centerSection}>{center}</div>
      <div className={rightSection}>{right}</div>
    </header>
  );
};
