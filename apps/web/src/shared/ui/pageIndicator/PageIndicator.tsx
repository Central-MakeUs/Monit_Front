import React from 'react';
import { container, dot } from './PageIndicator.css';

export interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export const PageIndicator = ({ currentPage, totalPages }: PageIndicatorProps) => {
  return (
    <div className={container}>
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={dot({
            state: index === currentPage ? 'active' : 'default',
          })}
        />
      ))}
    </div>
  );
};
