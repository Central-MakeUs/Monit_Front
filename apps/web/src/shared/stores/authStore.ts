import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  // TODO: RefreshToken 사용 시 주석 해제
  // refreshToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setAuth: (tokens: { accessToken: string; refreshToken?: string }) => void;
  clearAuth: () => void;
}

/**
 * 인증 상태 관리 스토어
 *  */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      // TODO: RefreshToken 사용 시 주석 해제
      // refreshToken: null,

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      setAuth: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          // TODO: RefreshToken 사용 시 주석 해제
          // refreshToken: tokens.refreshToken
        });
      },

      clearAuth: () => {
        set({
          accessToken: null,
          // TODO: RefreshToken 사용 시 주석 해제
          // refreshToken: null
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
