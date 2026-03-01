'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { OnboardingOverlay } from '../shared/OnboardingOverlay/OnboardingOverlay';
import { OnboardingHighlight } from '../shared/OnboardingHighlight/OnboardingHighlight';
import { OnboardingTooltip } from '../shared/OnboardingTooltip/OnboardingTooltip';
import { useRemindOnboardingTour } from '../../lib/useRemindOnboardingTour';

export function RemindOnboardingTour(): React.JSX.Element | null {
  const { isActive, currentStep, rect, handleNext } = useRemindOnboardingTour();

  if (!isActive || !currentStep) return null;

  return createPortal(
    <div>
      <OnboardingOverlay onNext={handleNext} />

      {rect && (
        <>
          <OnboardingHighlight
            rect={rect}
            glow={false}
            key={currentStep.key}
            padding={currentStep.highlightPadding}
            borderRadius={currentStep.highlightBorderRadius}
          />

          <OnboardingTooltip rect={rect} step={currentStep} key={`${currentStep.key}-tooltip`} />
        </>
      )}
    </div>,
    document.body
  );
}
