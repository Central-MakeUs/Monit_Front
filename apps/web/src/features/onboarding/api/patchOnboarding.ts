import { authApi } from '@/shared/api/methods';
import { ENDPOINT } from '@/shared/api/endpoint';

type OnboardingFeature = 'home' | 'remind' | 'category';

const FEATURE_ENDPOINT: Record<OnboardingFeature, string> = {
  home: ENDPOINT.ONBOARDING.HOME,
  remind: ENDPOINT.ONBOARDING.REMIND,
  category: ENDPOINT.ONBOARDING.CATEGORY,
};

export const patchOnboarding = (feature: OnboardingFeature) => {
  return authApi.patch(FEATURE_ENDPOINT[feature]);
};
