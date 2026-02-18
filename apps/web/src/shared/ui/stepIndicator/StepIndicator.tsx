import React from 'react';
import { stepIndicatorContainer, stepIndicatorItem } from './StepIndicator.css';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator = ({ currentStep, totalSteps = 3 }: StepIndicatorProps) => {
  return (
    <div className={stepIndicatorContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={stepIndicatorItem({
            state: index < currentStep ? 'active' : 'default',
          })}
        />
      ))}
    </div>
  );
};
