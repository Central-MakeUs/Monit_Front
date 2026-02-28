import { useOnboardingStore } from '../model/onboardingStore';
import { REMIND_STEPS } from '../config/steps';
import { useOnboardingElement } from './useOnboardingElement';
import { useBridge } from '@/shared/lib/bridge';
import { patchOnboarding } from '../api/patchOnboarding';

/**
 * 리뷰(돌아보기) 페이지 OnboardingTour의 비즈니스 로직을 담당하는 훅
 */
export function useRemindOnboardingTour() {
  const { remindFlow, endRemindTour } = useOnboardingStore();
  const bridge = useBridge();
  const currentStep = REMIND_STEPS[0];

  const rect = useOnboardingElement(remindFlow === 'tour', currentStep?.key);

  const handleNext = () => {
    endRemindTour();
    bridge?.completeOnboarding('remind');
    patchOnboarding('remind');
  };

  return {
    isActive: remindFlow === 'tour',
    currentStep,
    rect,
    handleNext,
  };
}
