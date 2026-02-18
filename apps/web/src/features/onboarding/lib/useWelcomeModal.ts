import { useOnboardingStore } from '../model/onboardingStore';
import { useClientOnly } from '@/shared/hooks/useClientOnly';

/**
 * WelcomeModal의 비즈니스 로직을 담당하는 훅
 *
 * @returns {object} WelcomeModal에 필요한 상태와 핸들러
 */
export function useWelcomeModal() {
  const { flow, startTour } = useOnboardingStore();
  const isMounted = useClientOnly();

  /**
   * 모달을 닫을 때의 동작
   * 이미 투어가 시작된 상태가 아니라면 투어를 시작합니다.
   */
  const handleClose = () => {
    const currentFlow = useOnboardingStore.getState().flow;
    if (currentFlow !== 'tour') {
      startTour();
    }
  };

  return {
    isOpen: flow === 'welcome',
    isMounted,
    handleClose,
    handleConfirm: startTour,
  };
}
