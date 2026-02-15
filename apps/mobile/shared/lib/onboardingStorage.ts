import * as SecureStore from 'expo-secure-store';

const ONBOARDING_KEY = 'hasCompletedOnboarding';

export const onboardingStorage = {
  async onboardingStatus(): Promise<boolean> {
    try {
      const status = await SecureStore.getItemAsync(ONBOARDING_KEY);
      return status === 'true';
    } catch (error) {
      console.error('온보딩 상태 확인 실패:', error);
      return false;
    }
  },

  async completeOnboarding(): Promise<void> {
    try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
    } catch (error) {
      console.error('온보딩 상태 저장 실패:', error);
    }
  },
};
