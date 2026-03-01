import { useOnboardingStore } from '../model/onboardingStore';
import { REMIND_STEPS } from '../config/steps.remind';
import { useOnboardingTourBase } from './shared/useOnboardingTourBase';

/**
 * 리뷰(돌아보기) 페이지 OnboardingTour의 비즈니스 로직을 담당하는 훅
 */
export function useRemindOnboardingTour() {
  const { remindFlow, endRemindTour } = useOnboardingStore();

  return useOnboardingTourBase({
    steps: REMIND_STEPS,
    isActive: remindFlow === 'tour',
    step: 0,
    domain: 'remind',
    onNextStep: () => {},
    onEnd: endRemindTour,
  });
}
