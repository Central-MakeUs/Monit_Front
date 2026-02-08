import React from 'react';
import { Tooltip } from '@/shared/ui/tooltip';
import * as styles from './OnboardingTooltip.css';
import { OnboardingStep } from '../../config/steps';
import { calcTooltipPosition } from '../../lib/calcTooltipPosition';

interface OnboardingTooltipProps {
  rect: DOMRect;
  step: OnboardingStep;
}

export const OnboardingTooltip = ({ rect, step }: OnboardingTooltipProps) => {
  const { left, top, transform } = calcTooltipPosition(rect, step);

  return (
    <div
      className={styles.tooltipPositioner}
      style={{
        left,
        top,
        transform,
      }}>
      <Tooltip
        title={step.title}
        step={step.stepOrder}
        description={step.desc}
        direction={step.direction}
        arrow={step.arrow}
      />
    </div>
  );
};
