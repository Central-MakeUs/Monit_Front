import ky from 'ky';
import { useAuthStore } from '@/shared/stores/authStore';
import { API_BASE_URL, API_TIMEOUT, API_RETRY_LIMIT, API_RETRY_BACKOFF_LIMIT } from './constants';
import { ENDPOINT } from './endpoint';
import type { ApiResponse } from './types';
import type { components } from './schema';

type TokenReissueResult = components['schemas']['TokenReissueResultDTO'];

/**
 * 인증이 필요 없는 기본 API 클라이언트
 */
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: API_TIMEOUT,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 429, 500, 502, 503, 504],
  },
});

/**
 * 인증이 필요한 API 클라이언트
 *
 * - Access Token을 Authorization 헤더에 자동 추가
 * - Refresh Token은 HttpOnly Cookie로 자동 전송
 * - 401 에러 시 자동으로 토큰 갱신 시도
 */
export const authenticatedApiClient = apiClient.extend({
  credentials: 'include',
  retry: {
    limit: API_RETRY_LIMIT,
    backoffLimit: API_RETRY_BACKOFF_LIMIT,
    statusCodes: [401],
  },
  hooks: {
    // 요청 전 Authorization 헤더에 Access Token 추가
    beforeRequest: [
      (request) => {
        if (typeof window === 'undefined') return;

        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],

    // 에러 발생 시 응답 본문을 에러 메시지에 추가
    beforeError: [
      async (error) => {
        if (error.response) {
          try {
            const body = await error.response.text();
            error.message = `${error.message}: ${body}`;
          } catch {
            // 응답 본문을 읽을 수 없는 경우 무시
          }
        }
        return error;
      },
    ],

    // 401 에러 발생 시 토큰 갱신 후 재시도
    afterResponse: [
      async (request, _options, response, state) => {
        if (response.status === 401 && state.retryCount === 0) {
          try {
            // Refresh Token으로 새로운 Access Token 발급
            const tokenResponse = await apiClient
              .post(ENDPOINT.AUTH.REISSUE, {
                credentials: 'include',
              })
              .json<ApiResponse<TokenReissueResult>>();

            if (tokenResponse.result?.accessToken) {
              // 새로운 Access Token을 스토어에 저장
              useAuthStore.getState().setAccessToken(tokenResponse.result.accessToken);

              // 새 토큰으로 재시도
              request.headers.set('Authorization', `Bearer ${tokenResponse.result.accessToken}`);
              return ky.retry({
                request: new Request(request),
                code: 'TOKEN_REFRESHED',
              });
            }
          } catch (error) {
            console.error('[API] Token refresh failed:', error);

            // Refresh 실패 시 로그아웃 처리
            useAuthStore.getState().clearAuth();

            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        }

        return response;
      },
    ],
  },
});

// 타입 재export
export type { ApiResponse } from './types';
