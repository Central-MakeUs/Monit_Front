import { bridge, createWebView } from '@webview-bridge/react-native';
import { login, logout } from '@react-native-kakao/user';
import { canOpenURL, openURL } from 'expo-linking';
import { authStorage } from './authStorage';
import { useAppleLogin } from '@/social/useAppleLogin';
import type { ApiResponse, SocialLoginData } from '@/shared/types/api.types';

/**
 * Web → Native 브릿지 설정
 * Web 앱에서 호출할 수 있는 Native 메서드들을 정의
 */
export const appBridge = bridge({
  async getMessage(): Promise<string> {
    return 'Hello from Native!';
  },

  /**
   * 소셜 로그인
   * 네이티브에서 카카오 로그인 → 백엔드 API 호출 → 토큰 저장까지 모두 처리
   */
  async socialLogin(type: 'kakao' | 'apple'): Promise<ApiResponse<SocialLoginData>> {
    try {
      if (type === 'kakao') {
        // 1. 카카오 SDK 로그인
        const kakaoResult = await login();

        // 2. 백엔드로 사용자 정보 전송하여 서비스 토큰 받기
        const backendResponse = await fetch('https://api.nitrogen18.store/api/auth/kakao/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accessToken: kakaoResult.accessToken,
          }),
        });

        if (!backendResponse.ok) {
          const errorText = await backendResponse.text();
          throw new Error(`백엔드 API 오류: ${backendResponse.status} - ${errorText}`);
        }

        const backendData = await backendResponse.json();

        const result = backendData.result ?? backendData;
        const accessToken = result.accessToken ?? result.access_token;
        const refreshToken = result.refreshToken ?? result.refresh_token ?? '';

        if (!accessToken) {
          throw new Error('백엔드 응답에 accessToken이 없습니다.');
        }

        await authStorage.setTokens(accessToken, refreshToken);

        return {
          success: true,
          data: { accessToken, refreshToken },
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

        await authStorage.setTokens(accessToken, refreshToken);

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
    console.log('[NATIVE] reissueAccessToken called');
    try {
      const refreshToken = await authStorage.getRefreshToken();
      console.log('[NATIVE] has refreshToken?', !!refreshToken);
      if (!refreshToken) return null;

      const res = await fetch('https://api.nitrogen18.store/api/auth/reissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          RefreshToken: refreshToken,
        },
        body: JSON.stringify({}),
      });
      console.log('[NATIVE] reissue status', res.status);

      if (!res.ok) return null;

      const data = await res.json();
      const newAccessToken = data?.result?.accessToken ?? data?.accessToken;
      const newRefreshToken = data?.result?.refreshToken ?? data?.refreshToken ?? refreshToken;
      console.log('[NATIVE] reissue success, new access?', !!newAccessToken);
      if (!newAccessToken) return null;

      await authStorage.setTokens(newAccessToken, newRefreshToken);
      return { accessToken: newAccessToken };
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
