/**
 * API 공통 응답 타입
 */
export interface ApiResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * 인증 관련 데이터 타입
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * 로그인 응답 데이터 타입
 */
export interface LoginData extends AuthTokens {
  isNewUser: string;
  hasExpense: boolean;
  termsAgreed: boolean;
}

/**
 * 소셜 로그인 응답 타입 (bridge에서 사용)
 */
export interface SocialLoginData extends AuthTokens {
  isNewUser?: string;
  hasExpense?: boolean;
  termsAgreed?: boolean;
}
