'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { OnboardingOverlay } from '../OnboardingOverlay/OnboardingOverlay';
import { OnboardingHighlight } from '../OnboardingHighlight/OnboardingHighlight';
import { OnboardingTooltip } from '../OnboardingTooltip/OnboardingTooltip';
import { useCategoryOnboardingTour } from '../../lib/useCategoryOnboardingTour';

export function CategoryOnboardingTour(): React.JSX.Element | null {
  const { isActive, currentStep, rect, handleNext } = useCategoryOnboardingTour();

  if (!isActive || !currentStep) return null;

  return createPortal(
    <div>
      <OnboardingOverlay onNext={handleNext} dim={currentStep.highlightDisabled} />

      {rect && (
        <>
          {!currentStep.highlightDisabled && (
            <OnboardingHighlight
              rect={rect}
              glow={false}
              key={currentStep.key}
              borderRadius={currentStep.highlightBorderRadius}
            />
          )}

          <OnboardingTooltip rect={rect} step={currentStep} key={`${currentStep.key}-tooltip`} />
        </>
      )}
    </div>,
    document.body
  );
}
