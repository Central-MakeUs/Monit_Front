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
  isNewUser: boolean;
  hasExpense: boolean;
  termsAgreed: boolean;
}
