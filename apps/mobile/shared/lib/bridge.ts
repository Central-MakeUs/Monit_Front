import { bridge, createWebView } from '@webview-bridge/react-native';
import { login, logout, me } from '@react-native-kakao/user';
import { canOpenURL, openURL } from 'expo-linking';
import { authStorage } from './authStorage';
import { useAppleLogin } from '@/social/useAppleLogin';
import type { ApiResponse, SocialLoginData } from '@/shared/types/api.types';
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
  async socialLogin(type: 'kakao' | 'apple'): Promise<ApiResponse<SocialLoginData>> {
    try {
      if (type === 'kakao') {
        // 1. 카카오 SDK 로그인
        const kakaoResult = await login();

        // 2. 카카오 사용자 정보 가져오기
        const kakaoUser = await me();

        // 3. 백엔드가 기대하는 형식으로 데이터 변환
        const kakaoUserInfo = {
          id: kakaoUser.id,
          properties: {
            nickname: kakaoUser.nickname || kakaoUser.name || '사용자',
          },
          // TODO: 백엔드 API 스펙 확인 후 필요하면 주석 해제
          // kakao_account: {
          //   email: kakaoUser.email,
          // },
        };

        // 4. 백엔드로 사용자 정보 전송하여 서비스 토큰 받기
        const backendResponse = await fetch('https://api.nitrogen18.store/api/auth/kakao/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(kakaoUserInfo),
        });

        if (!backendResponse.ok) {
          const errorText = await backendResponse.text();
          throw new Error(`백엔드 API 오류: ${backendResponse.status} - ${errorText}`);
        }

        const backendData = await backendResponse.json();

        // 5. 백엔드 응답에서 토큰 추출 (result.accessToken)
        const accessToken = backendData.result?.accessToken;
        const refreshToken = backendData.result?.refreshToken || null;

        if (!accessToken) {
          throw new Error('백엔드 응답에 accessToken이 없습니다.');
        }

        // 6. 백엔드 토큰을 SecureStore에 저장
        await authStorage.setTokens(accessToken, refreshToken || '');

        return {
          success: true,
          data: {
            accessToken,
            refreshToken: refreshToken || '',
          },
        };
      } else if (type === 'apple') {
        const result = await useAppleLogin();
        const accessToken = result.data?.accessToken;
        const refreshToken = result.data?.refreshToken || null;
        const isNewUser = result.data?.isNewUser;
        const hasExpense = result.data?.hasExpense;
        const termsAgreed = result.data?.termsAgreed;

        if (!accessToken) {
          throw new Error('애플 로그인 응답에 accessToken이 없습니다.');
        }

        await authStorage.setTokens(accessToken, refreshToken || '');

        return {
          success: true,
          data: {
            accessToken,
            refreshToken: refreshToken || '',
            isNewUser,
            hasExpense,
            termsAgreed,
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
   * 저장된 액세스 토큰 조회
   */
  async getAccessToken(): Promise<{ accessToken: string | null }> {
    try {
      const accessToken = await authStorage.getAccessToken();
      return { accessToken };
    } catch (error) {
      return { accessToken: null };
    }
  },

  /**
   * 로그아웃
   */
  async requestLogout(): Promise<void> {
    try {
      await logout();
      await authStorage.clearTokens();
    } catch (error) {
      throw new Error('로그아웃에 실패했습니다.');
    }
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
   * 온보딩 완료
   */
  completeOnboarding: async () => {
    await onboardingStorage.completeOnboarding();
  },

  /**
   * 온보딩 완료
   */
  onboardingStatus: async () => {
    await onboardingStorage.onboardingStatus();
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
  timeout: 120000, // 2분 타임아웃 (카카오 로그인 대기 시간 고려)
  fallback: (method) => {
    console.warn(`[Bridge] Method '${method}' not found in native`);
  },
});
