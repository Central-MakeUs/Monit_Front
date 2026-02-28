import { useState } from 'react';
import { useOnboardingStore } from '../model/onboardingStore';
import { CATEGORY_STEPS } from '../config/steps';
import { useOnboardingElement } from './useOnboardingElement';
import { useBridge } from '@/shared/lib/bridge';
import { patchOnboarding } from '../api/patchOnboarding';

/**
 * 카테고리 관리 페이지 OnboardingTour의 비즈니스 로직을 담당하는 훅
 */
export function useCategoryOnboardingTour() {
  const { categoryFlow, endCategoryTour } = useOnboardingStore();
  const bridge = useBridge();
  const [step, setStep] = useState(0);

  const isActive = categoryFlow === 'tour';
  const currentStep = CATEGORY_STEPS[step];

  const rect = useOnboardingElement(isActive, currentStep?.key);

  const handleNext = () => {
    if (step === CATEGORY_STEPS.length - 1) {
      endCategoryTour();
      bridge?.completeOnboarding('category');
      patchOnboarding('category');
    } else {
      setStep((s) => s + 1);
    }
  };

  return { isActive, currentStep, rect, handleNext };
}
