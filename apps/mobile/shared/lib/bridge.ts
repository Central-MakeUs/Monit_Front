import { bridge, createWebView } from '@webview-bridge/react-native';
import { login, logout } from '@react-native-kakao/user';
import { canOpenURL, openURL } from 'expo-linking';
import { postKakaoLogin } from '@/apis/postKakaoLogin';
import { postKakaoSignup } from '@/apis/postKakaoSignup';
import { postAppleSignup } from '@/apis/postAppleSignup';
import { postReissue } from '@/apis/postReissue';
import { authStorage } from './authStorage';
import { useAppleLogin } from '@/social/useAppleLogin';
import type { ApiResponse, LoginData } from '@/shared/types/api.types';
import { onboardingStorage } from './onboardingStorage';

/**
 * Web → Native 브릿지 설정
 * Web 앱에서 호출할 수 있는 Native 메서드들을 정의
 */
export const appBridge = bridge({
  /**
   * 소셜 로그인
   * 네이티브에서 카카오 로그인 → 백엔드 API 호출 → 토큰 저장까지 모두 처리
   */
  async socialLogin(type: 'kakao' | 'apple'): Promise<ApiResponse<LoginData>> {
    try {
      if (type === 'kakao') {
        const kakaoResult = await login();
        const result = await postKakaoLogin({ accessToken: kakaoResult.accessToken });

        const {
          isNewUser,
          hasExpense,
          registerToken,
          homeOnboarding,
          categoryOnboarding,
          remindOnboarding,
        } = result.data ?? {};

        // 신규 사용자: 임시 토큰(registerToken) 반환 → 약관 동의 후 웹에서 kakaoSignup(registerToken) 호출
        if (isNewUser === true) {
          return {
            success: true,
            data: {
              accessToken: '',
              refreshToken: '',
              isNewUser: true,
              hasExpense: false,
              registerToken: registerToken ?? '',
              homeOnboarding: homeOnboarding ?? true,
              categoryOnboarding: categoryOnboarding ?? true,
              remindOnboarding: remindOnboarding ?? true,
            },
          };
        }

        if (!result.data?.accessToken) {
          throw new Error('백엔드 응답에 accessToken이 없습니다.');
        }

        const { accessToken, refreshToken } = result.data;
        await authStorage.setTokens(accessToken, refreshToken ?? '');

        // 각 피처별 온보딩 완료 상태 저장 (false=완료, true=미완료)
        if (!homeOnboarding) await onboardingStorage.completeOnboarding('home');
        if (!categoryOnboarding) await onboardingStorage.completeOnboarding('category');
        if (!remindOnboarding) await onboardingStorage.completeOnboarding('remind');

        return {
          success: true,
          data: {
            accessToken,
            refreshToken: refreshToken ?? '',
            isNewUser: isNewUser ?? false,
            hasExpense: hasExpense ?? false,
            homeOnboarding: homeOnboarding ?? true,
            categoryOnboarding: categoryOnboarding ?? true,
            remindOnboarding: remindOnboarding ?? true,
          },
        };
      } else if (type === 'apple') {
        const result = await useAppleLogin();

        if (!result.data?.accessToken) {
          throw new Error('애플 로그인 응답에 accessToken이 없습니다.');
        }

        const {
          accessToken,
          refreshToken,
          isNewUser,
          hasExpense,
          homeOnboarding,
          categoryOnboarding,
          remindOnboarding,
        } = result.data;

        // 기존 사용자만 토큰 저장 (신규 사용자는 약관 동의 완료 후 appleSignup에서 저장)
        if (isNewUser === false) {
          await authStorage.setTokens(accessToken, refreshToken || '');

          // 각 피처별 온보딩 완료 상태 저장 (false=완료, true=미완료)
          if (!homeOnboarding) await onboardingStorage.completeOnboarding('home');
          if (!categoryOnboarding) await onboardingStorage.completeOnboarding('category');
          if (!remindOnboarding) await onboardingStorage.completeOnboarding('remind');
        }

        return {
          success: true,
          data: {
            accessToken,
            refreshToken: refreshToken || '',
            isNewUser,
            hasExpense,
            homeOnboarding,
            categoryOnboarding,
            remindOnboarding,
          },
        };
      }

      return {
        success: false,
        message: '지원하지 않는 로그인 방식입니다.',
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '로그인에 실패했습니다.',
      };
    }
  },

  /**
   * Apple 신규 사용자 회원가입
   * 약관 동의 후 웹에서 호출 → 네이티브가 signup API 호출 → 최종 토큰 SecureStore 저장
   */
  async appleSignup(registerToken: string): Promise<ApiResponse<LoginData>> {
    try {
      const result = await postAppleSignup({ registerToken });

      if (!result.data?.accessToken) {
        throw new Error('서버 응답에 accessToken이 없습니다.');
      }

      const {
        accessToken,
        refreshToken,
        isNewUser,
        hasExpense,
        homeOnboarding,
        categoryOnboarding,
        remindOnboarding,
      } = result.data;
      await authStorage.setTokens(accessToken, refreshToken || '');

      // 각 피처별 온보딩 완료 상태 저장 (false=완료, true=미완료)
      if (!homeOnboarding) await onboardingStorage.completeOnboarding('home');
      if (!categoryOnboarding) await onboardingStorage.completeOnboarding('category');
      if (!remindOnboarding) await onboardingStorage.completeOnboarding('remind');

      return {
        success: true,
        data: {
          accessToken,
          refreshToken: refreshToken || '',
          isNewUser,
          hasExpense,
          homeOnboarding,
          categoryOnboarding,
          remindOnboarding,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      };
    }
  },

  /**
   * 카카오 신규 사용자 회원가입
   * 약관 동의 후 웹에서 호출 → 네이티브가 임시 토큰으로 /api/auth/kakao/signup 호출 → 정식 JWT 저장
   */
  async kakaoSignup(registerToken: string): Promise<ApiResponse<LoginData>> {
    try {
      const result = await postKakaoSignup({ registerToken });

      if (!result.data?.accessToken) {
        throw new Error('서버 응답에 accessToken이 없습니다.');
      }

      const { accessToken, refreshToken } = result.data;
      await authStorage.setTokens(accessToken, refreshToken ?? '');
      const { isNewUser, hasExpense, homeOnboarding, categoryOnboarding, remindOnboarding } =
        result.data;

      // 각 피처별 온보딩 완료 상태 저장 (false=완료, true=미완료)
      if (!homeOnboarding) await onboardingStorage.completeOnboarding('home');
      if (!categoryOnboarding) await onboardingStorage.completeOnboarding('category');
      if (!remindOnboarding) await onboardingStorage.completeOnboarding('remind');

      return {
        success: true,
        data: {
          accessToken,
          refreshToken: refreshToken ?? '',
          isNewUser,
          hasExpense,
          homeOnboarding,
          categoryOnboarding,
          remindOnboarding,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
      };
    }
  },

  /**
   * 저장된 accessToken만 조회. reissue는 네이티브 reissueAccessToken()만 사용 (웹에 refreshToken 노출 안 함)
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await authStorage.getAccessToken();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  /**
   * 네이티브에서 리프레시 토큰으로 액세스 토큰 재발급
   * 웹이 401 받으면 이 메서드 호출 → 네이티브가 reissue API 호출 후 새 accessToken 반환
   */
  async reissueAccessToken(): Promise<{ accessToken: string } | null> {
    try {
      const refreshToken = await authStorage.getRefreshToken();
      if (!refreshToken) return null;

      const tokens = await postReissue(refreshToken);
      if (!tokens) return null;

      await authStorage.setTokens(tokens.accessToken, tokens.refreshToken);
      return { accessToken: tokens.accessToken };
    } catch (error) {
      console.error('[Bridge] reissueAccessToken failed:', error);
      return null;
    }
  },

  /**
   * 로그아웃
   * - 카카오 로그인 시에만 Kakao SDK logout 호출 (애플 로그인 시에는 세션 없음 → 실패해도 무시)
   * - 항상 우리 앱 토큰(access/refresh)은 삭제
   */
  async requestLogout(): Promise<void> {
    try {
      await logout();
    } catch {
      // 애플 로그인 사용자는 카카오 세션이 없어 실패할 수 있음 → 무시하고 토큰만 삭제
    }
    await authStorage.clearTokens();
    await onboardingStorage.clearOnboardingStatus();
  },

  async requestWithdraw(): Promise<void> {
    await authStorage.clearTokens();
    await onboardingStorage.clearOnboardingStatus();
  },

  /**
   * 외부 링크 열기
   */
  async openExternalUrl(url: string): Promise<void> {
    try {
      const canOpen = await canOpenURL(url);
      if (!canOpen) {
        throw new Error('유효하지 않은 URL입니다.');
      }
      await openURL(url);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '외부 링크를 열 수 없습니다.');
    }
  },

  /**
   * 피처별 온보딩 완료 저장
   */
  completeOnboarding: async (type: 'home' | 'remind' | 'category') => {
    await onboardingStorage.completeOnboarding(type);
  },

  /**
   * 온보딩 상태 확인 (피처별)
   */
  onboardingStatus: async () => {
    return await onboardingStorage.onboardingStatus();
  },
});

/** Bridge 타입 export (Web에서 사용) */
export type AppBridgeType = typeof appBridge;

/**
 * WebView export
 * - WebView: Web 콘텐츠를 표시하는 컴포넌트
 */
export const { WebView } = createWebView({
  bridge: appBridge,
  debug: __DEV__,
  fallback: (method) => {
    console.warn(`[Bridge] Method '${method}' not found in native`);
  },
});
