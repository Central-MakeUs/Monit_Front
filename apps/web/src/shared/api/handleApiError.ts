import { HTTPError } from 'ky';

export interface ToastApi {
  attention: (message: string) => void;
}

export interface HandleApiErrorOptions {
  /** 사용자에게 노출할 기본 실패 문구 (서버 메시지가 없거나 사용 불가일 때 사용) */
  fallback: string;
  /** 토스트 인스턴스 (useToast() 결과) */
  toast: ToastApi;
  /** 디버깅용 컨텍스트 (예: 'expense.update') */
  context?: string;
  /**
   * true이면 HTTP 응답에서 받은 서버 메시지(error.message)를 우선 노출.
   * 네트워크 오류 등 응답이 없는 경우엔 fallback을 사용.
   * 기본 false.
   */
  preferServerMessage?: boolean;
}

const SILENT_STATUS = new Set([401, 403]);

/**
 * mutation/쿼리의 onError에서 사용할 공통 핸들러.
 * - 401/403은 client.ts에서 reissue/리다이렉트 처리하므로 토스트를 띄우지 않음
 * - 기본은 fallback 문구 노출. preferServerMessage=true이면 HTTPError의 서버 메시지 우선
 * - console.error를 일관 포맷으로 출력
 */
export const handleApiError = (error: unknown, options: HandleApiErrorOptions) => {
  const { fallback, toast, context, preferServerMessage = false } = options;

  if (error instanceof HTTPError && SILENT_STATUS.has(error.response.status)) {
    return;
  }

  console.error(`[API Error]${context ? ` ${context}` : ''}:`, error);

  const serverMessage =
    preferServerMessage && error instanceof HTTPError && error.message ? error.message : null;

  toast.attention(serverMessage ?? fallback);
};
