import ky from 'ky';
import { useAuthStore } from '@/shared/stores/authStore';
import { API_BASE_URL, API_TIMEOUT } from './constants';

/**
 * 동시 다발적 401 응답 시 reissue를 한 번만 호출하기 위한 Promise 잠금
 */
let refreshPromise: Promise<string | null> | null = null;

/**
 * [401 처리] 웹에서는 /api/auth/reissue를 직접 호출하지 않음.
 * - bridge.reissueAccessToken() 호출 → 네이티브가 reissue 수행 후 accessToken 반환
 * - 웹은 반환된 accessToken으로 스토어 갱신 후 재시도만 함
 */
const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      if (typeof window === 'undefined') return null;

      const w = window as unknown as {
        bridge?: { reissueAccessToken(): Promise<{ accessToken: string } | null> };
      };
      if (!w.bridge?.reissueAccessToken) return null;

      const result = await w.bridge.reissueAccessToken();
      if (result?.accessToken) {
        useAuthStore.getState().setAccessToken(result.accessToken);
        return result.accessToken;
      }
      return null;
    } catch {
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// /** API 로그: 엔드포인트, 액세스/리프레시 토큰 유무, 응답 상태 */
// const logApi = (request: Request, response: Response | undefined) => {
//   const endpoint = request.url.replace(API_BASE_URL, '') || request.url;
//   const hasAccess = !!request.headers.get('Authorization');
//   const hasRefresh = !!request.headers.get('RefreshToken');
//   const status = response?.status ?? '-';
//   console.log(
//     '[API]\n' +
//       `1. API 요청 엔드포인트: ${endpoint}\n` +
//       `2. 액세스토큰: ${hasAccess ? '있음' : '없음'}\n` +
//       `3. 리프레쉬토큰: ${hasRefresh ? '있음' : '없음'}\n` +
//       `4. 응답 상태 코드: ${status}`
//   );
// };

/**
 * 인증이 필요 없는 기본 API 클라이언트
 */
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeError: [
      async (error) => {
        if (error.request instanceof Request) {
          // logApi(error.request, error.response);
        }
        if (error.response) {
          try {
            const body = await error.response.text();
            error.message = `${error.message}: ${body}`;
          } catch {
            // 응답 본문 읽기 실패 시 무시
          }
        }
        return error;
      },
    ],
  },
});

/**
 * 인증이 필요한 API 클라이언트
 *
 * - Access Token을 Authorization 헤더에 자동 추가
 * - 401 에러 시 자동으로 토큰 갱신 시도
 */
type KyContext = { retriedAfterRefresh?: boolean };

export const authenticatedApiClient = apiClient.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken && accessToken !== 'invalid') {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],

    afterResponse: [
      async (request, options, response) => {
        if (typeof window !== 'undefined') {
          // logApi(request, response);
        }

        const ctx = (options.context ?? {}) as KyContext;

        // 401/403이면 네이티브 reissue 호출 → 토큰 갱신 → 원요청 1회 재시도
        if ((response.status === 401 || response.status === 403) && !ctx.retriedAfterRefresh) {
          const newToken = await refreshAccessToken();
          if (!newToken) {
            useAuthStore.getState().clearAuth();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return response;
          }

          ctx.retriedAfterRefresh = true;

          // options.headers 기반으로 갱신해서 재시도 (request.headers를 직접 건드리면 꼬일 수 있음)
          const nextHeaders = new Headers(options.headers ?? request.headers);
          nextHeaders.set('Authorization', `Bearer ${newToken}`);

          // 같은 인스턴스로 재요청
          return authenticatedApiClient(request, {
            ...options,
            headers: nextHeaders,
            context: ctx,
          });
        }

        return response;
      },
    ],
  },
});

// 타입 재export
export type { ApiResponse } from './types';
