/**
 * API 응답 공통 타입
 */
export interface ApiResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
