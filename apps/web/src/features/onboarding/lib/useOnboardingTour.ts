import { useOnboardingStore } from '../model/onboardingStore';
import { STEPS } from '../config/steps';
import { useOnboardingElement } from './useOnboardingElement';
import { useBridge } from '@/shared/lib/bridge';

/**
 * OnboardingTour의 비즈니스 로직을 담당하는 훅
 *
 * @returns {object} OnboardingTour에 필요한 상태와 핸들러
 */
export function useOnboardingTour() {
  const { flow, step, nextStep, endTour } = useOnboardingStore();
  const bridge = useBridge();
  const currentStep = STEPS[step];

  const rect = useOnboardingElement(flow === 'tour', currentStep?.key);

  /**
   * 다음 단계로 이동하거나 온보딩을 종료하는 핸들러
   */
  const handleNext = () => {
    if (step === STEPS.length - 1) {
      endTour();
      bridge?.completeOnboarding();
    } else {
      nextStep();
    }
  };

  return {
    isActive: flow === 'tour',
    currentStep,
    rect,
    handleNext,
  };
}
