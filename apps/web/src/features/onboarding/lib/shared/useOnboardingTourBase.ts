import { useBridge } from '@/shared/lib/bridge';
import { patchOnboarding } from '../../api/patchOnboarding';
import { OnboardingStep } from '../../config/steps.types';
import { useOnboardingElement } from './useOnboardingElement';

type OnboardingDomain = 'home' | 'category' | 'remind';

interface UseOnboardingTourBaseOptions {
  steps: OnboardingStep[];
  isActive: boolean;
  step: number;
  domain: OnboardingDomain;
  onNextStep: () => void;
  onEnd: () => void;
}

/**
 * 온보딩 투어 훅의 공통 로직을 담당하는 base 훅
 *
 * 모든 domain(home, category, remind) 투어 훅에서 공유하는
 * element 추적, handleNext 패턴을 캡슐화합니다.
 */
export function useOnboardingTourBase({
  steps,
  isActive,
  step,
  domain,
  onNextStep,
  onEnd,
}: UseOnboardingTourBaseOptions) {
  const bridge = useBridge();
  const currentStep = steps[step];
  const rect = useOnboardingElement(isActive, currentStep?.key);

  const handleNext = () => {
    if (step === steps.length - 1) {
      onEnd();
      bridge?.completeOnboarding(domain);
      patchOnboarding(domain);
    } else {
      onNextStep();
    }
  };

  return { isActive, currentStep, rect, handleNext };
}
