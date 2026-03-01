import * as SecureStore from 'expo-secure-store';

type OnboardingFeature = 'home' | 'remind' | 'category';

const KEYS: Record<OnboardingFeature, string> = {
  home: 'onboarding.home',
  remind: 'onboarding.remind',
  category: 'onboarding.category',
};

export const onboardingStorage = {
  async onboardingStatus(): Promise<{ home: boolean; remind: boolean; category: boolean }> {
    try {
      const [home, remind, category] = await Promise.all([
        SecureStore.getItemAsync(KEYS.home),
        SecureStore.getItemAsync(KEYS.remind),
        SecureStore.getItemAsync(KEYS.category),
      ]);
      return {
        home: home === 'true',
        remind: remind === 'true',
        category: category === 'true',
      };
    } catch (error) {
      console.error('온보딩 상태 확인 실패:', error);
      return { home: false, remind: false, category: false };
    }
  },

  async completeOnboarding(type: OnboardingFeature): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS[type], 'true');
    } catch (error) {
      console.error('온보딩 상태 저장 실패:', error);
    }
  },

  async clearOnboardingStatus(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(KEYS.home),
      SecureStore.deleteItemAsync(KEYS.remind),
      SecureStore.deleteItemAsync(KEYS.category),
    ]);
  },
};
