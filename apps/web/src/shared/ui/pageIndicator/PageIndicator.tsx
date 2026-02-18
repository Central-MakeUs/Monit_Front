import React from 'react';
import { container, dot } from './PageIndicator.css';

export interface PageIndicatorProps {
  size?: 'sm' | 'md';
  currentPage: number;
  totalPages: number;
}

export const PageIndicator = ({ size = 'sm', currentPage, totalPages }: PageIndicatorProps) => {
  return (
    <div className={container({ size })}>
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={dot({
            state: index === currentPage ? 'active' : 'default',
            size,
          })}
        />
      ))}
    </div>
  );
};
