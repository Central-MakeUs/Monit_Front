import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingFlow = 'none' | 'welcome' | 'tour';

interface OnboardingState {
  isOnboardingCompleted: boolean;
  flow: OnboardingFlow;
  step: number;

  // 액션
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  hydrateFromServer: (completed: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isOnboardingCompleted: false,
      flow: 'none',
      step: 0,

      hydrateFromServer: (completed: boolean) => {
        if (!completed) {
          set({ flow: 'welcome', step: 0, isOnboardingCompleted: false });
        } else {
          set({ flow: 'none', isOnboardingCompleted: true });
        }
      },

      startTour: () => {
        set({ flow: 'tour', step: 0 });
      },

      nextStep: () => {
        set((state) => ({ step: state.step + 1 }));
      },

      prevStep: () => {
        set((state) => ({ step: Math.max(0, state.step - 1) }));
      },

      endTour: () => {
        set({ flow: 'none', isOnboardingCompleted: true });
        // TODO: 여기서 서버에 PATCH /users/me/onboarding 호출 (body: { onboardingCompleted: true })
      },

      resetOnboarding: () => set({ flow: 'welcome', step: 0, isOnboardingCompleted: false }),
    }),
    {
      name: 'onboarding/status',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      onRehydrateStorage: () => (state) => {
        // 로컬 스토리지에 값이 없거나 false인 경우 Welcome 모드로
        if (state && !state.isOnboardingCompleted) {
          if (state.flow === 'none') {
            state.flow = 'welcome';
          }
        }
      },
    }
  )
);
