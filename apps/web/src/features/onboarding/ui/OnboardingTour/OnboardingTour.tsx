'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { OnboardingOverlay } from '../OnboardingOverlay/OnboardingOverlay';
import { OnboardingHighlight } from '../OnboardingHighlight/OnboardingHighlight';
import { OnboardingTooltip } from '../OnboardingTooltip/OnboardingTooltip';
import { useOnboardingTour } from '../../lib/useOnboardingTour';

export function OnboardingTour(): React.JSX.Element | null {
  const { isActive, currentStep, rect, handleNext } = useOnboardingTour();

  if (!isActive || !currentStep) return null;

  return createPortal(
    <div>
      <OnboardingOverlay onNext={handleNext} />

      {rect && (
        <>
          <OnboardingHighlight
            rect={rect}
            glow={currentStep.key !== 'banner'}
            key={currentStep.key}
          />

          <OnboardingTooltip rect={rect} step={currentStep} key={`${currentStep.key}-tooltip`} />
        </>
      )}
    </div>,
    document.body
  );
}
