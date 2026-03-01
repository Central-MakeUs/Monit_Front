import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingFlow = 'none' | 'welcome' | 'tour';

interface OnboardingState {
  // 홈 온보딩
  homeCompleted: boolean;
  flow: OnboardingFlow;

  // 리뷰/리마인드 온보딩
  remindCompleted: boolean;
  remindFlow: OnboardingFlow;

  // 카테고리 온보딩
  categoryCompleted: boolean;
  categoryFlow: OnboardingFlow;

  // 액션
  startTour: () => void;
  endTour: () => void;

  startRemindTour: () => void;
  endRemindTour: () => void;

  endCategoryTour: () => void;

  hydrateFromServer: (flags: { home: boolean; remind: boolean; category: boolean }) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      homeCompleted: false,
      flow: 'none',

      remindCompleted: false,
      remindFlow: 'none',

      categoryCompleted: false,
      categoryFlow: 'none',

      hydrateFromServer: (flags) => {
        set((state) => ({
          homeCompleted: flags.home,
          flow: flags.home ? 'none' : state.flow === 'none' ? 'welcome' : state.flow,
          remindCompleted: flags.remind,
          remindFlow: flags.remind ? 'none' : 'tour',
          categoryCompleted: flags.category,
          categoryFlow: flags.category ? 'none' : 'tour',
        }));
      },

      startTour: () => {
        set({ flow: 'tour' });
      },

      endTour: () => {
        set({ flow: 'none', homeCompleted: true });
      },

      startRemindTour: () => {
        set({ remindFlow: 'tour' });
      },

      endRemindTour: () => {
        set({ remindFlow: 'none', remindCompleted: true });
      },

      endCategoryTour: () => {
        set({ categoryFlow: 'none', categoryCompleted: true });
      },
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
        // 로컬 스토리지에 홈 온보딩이 완료되지 않은 경우 Welcome 모드로
        if (state && !state.homeCompleted) {
          if (state.flow === 'none') {
            state.flow = 'welcome';
          }
        }
      },
    }
  )
);
