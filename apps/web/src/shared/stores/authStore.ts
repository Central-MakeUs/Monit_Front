import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAuth: () => void;
}

/**
 * SSR/WebView 안전한 storage
 * - 서버: localStorage 없음 → no-op
 * - 클라이언트/WebView: localStorage 사용
 */
const authStorage = createJSONStorage<Partial<AuthState>>(() => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return localStorage;
});

/**
 * 인증 상태 관리 스토어
 * - persist: localStorage에 저장 (Next.js/WebView에서 skipHydration으로 hydration 오류 방지)
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      clearAuth: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: authStorage,
      skipHydration: true,
    }
  )
);
