import { useState } from 'react';
import { useOnboardingStore } from '../model/onboardingStore';
import { HOME_STEPS } from '../config/steps.home';
import { useOnboardingTourBase } from './shared/useOnboardingTourBase';

/**
 * 홈 OnboardingTour의 비즈니스 로직을 담당하는 훅
 *
 * @returns {object} OnboardingTour에 필요한 상태와 핸들러
 */
export function useOnboardingTour() {
  const { flow, endTour } = useOnboardingStore();
  const [step, setStep] = useState(0);

  return useOnboardingTourBase({
    steps: HOME_STEPS,
    isActive: flow === 'tour',
    step,
    domain: 'home',
    onNextStep: () => setStep((s) => s + 1),
    onEnd: endTour,
  });
}
