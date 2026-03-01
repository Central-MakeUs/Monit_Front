import { useState } from 'react';
import { useOnboardingStore } from '../model/onboardingStore';
import { CATEGORY_STEPS } from '../config/steps.category';
import { useOnboardingTourBase } from './shared/useOnboardingTourBase';

/**
 * 카테고리 관리 페이지 OnboardingTour의 비즈니스 로직을 담당하는 훅
 */
export function useCategoryOnboardingTour() {
  const { categoryFlow, endCategoryTour } = useOnboardingStore();
  const [step, setStep] = useState(0);

  return useOnboardingTourBase({
    steps: CATEGORY_STEPS,
    isActive: categoryFlow === 'tour',
    step,
    domain: 'category',
    onNextStep: () => setStep((s) => s + 1),
    onEnd: endCategoryTour,
  });
}
