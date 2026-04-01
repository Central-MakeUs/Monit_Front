import { useAuthStore } from '@/shared/stores/authStore';

/** 앱에서 사용하는 persist/로컬 스토리지 키 (회원 탈퇴·로그아웃 시 비우기용) */
export const USER_STORAGE_KEYS = [
  'auth-storage',
  'onboarding/status',
  'expense-form-storage',
  'category-storage',
  'category-management-onboarding-completed',
  'report-arrival/status',
] as const;

/**
 * 인증 상태 + 모든 사용자 관련 스토리지 비우기
 * (회원 탈퇴 성공 시 또는 로그아웃 시 사용)
 */
export const clearAllUserStorage = (): void => {
  if (typeof window === 'undefined') return;

  useAuthStore.getState().clearAuth();
  for (const key of USER_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
};
