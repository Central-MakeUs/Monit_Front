/**
 * 애플 로그인 결과 타입
 */
export interface AppleLoginResult {
  identityToken: string;
  authorizationCode: string;
  user?: {
    email?: string;
    name?: {
      firstName?: string;
      lastName?: string;
    };
  };
}

/**
 * 소셜 로그인 결과 타입
 */
export interface SocialLoginResult {
  success: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

/**
 * Web → Native 브릿지 메서드 타입
 * Web에서 호출 가능한 Native 메서드들을 정의
 */
export type AppBridge = {
  // 기본 메서드
  getMessage: () => Promise<string>;

  // 소셜 로그인
  socialLogin: (type: 'kakao' | 'apple') => Promise<SocialLoginResult>;

  // 토큰 관리
  getAccessToken: () => Promise<{ accessToken: string | null }>;

  // 로그아웃
  requestLogout: () => Promise<void>;

  // 외부 링크 열기 (인앱 브라우저)
  openExternalUrl: (url: string) => Promise<void>;

  // 온보딩 완료
  completeOnboarding: () => Promise<void>;

  // 온보딩 상태 확인
  onboardingStatus: () => Promise<boolean>;
};
