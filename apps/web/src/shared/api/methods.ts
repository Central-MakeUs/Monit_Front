import { apiClient, authenticatedApiClient } from './client';
import type { ApiResponse } from './types';

/**
 * 인증이 필요 없는 API 헬퍼
 * 모든 응답이 자동으로 ApiResponse<T>로 감싸집니다.
 */
export const api = {
  get: <T>(url: string, options?: Parameters<typeof apiClient.get>[1]) =>
    apiClient.get(url, options).json<ApiResponse<T>>(),

  post: <T>(url: string, json?: unknown, options?: Parameters<typeof apiClient.post>[1]) =>
    apiClient.post(url, { json, ...options }).json<ApiResponse<T>>(),

  put: <T>(url: string, json?: unknown, options?: Parameters<typeof apiClient.put>[1]) =>
    apiClient.put(url, { json, ...options }).json<ApiResponse<T>>(),

  patch: <T>(url: string, json?: unknown, options?: Parameters<typeof apiClient.patch>[1]) =>
    apiClient.patch(url, { json, ...options }).json<ApiResponse<T>>(),

  delete: <T>(url: string, options?: Parameters<typeof apiClient.delete>[1]) =>
    apiClient.delete(url, options).json<ApiResponse<T>>(),
} as const;

/**
 * 인증이 필요한 API 헬퍼
 * 모든 응답이 자동으로 ApiResponse<T>로 감싸집니다.
 */
export const authApi = {
  get: <T>(url: string, options?: Parameters<typeof authenticatedApiClient.get>[1]) =>
    authenticatedApiClient.get(url, options).json<ApiResponse<T>>(),

  post: <T>(
    url: string,
    json?: unknown,
    options?: Parameters<typeof authenticatedApiClient.post>[1]
  ) => authenticatedApiClient.post(url, { json, ...options }).json<ApiResponse<T>>(),

  put: <T>(
    url: string,
    json?: unknown,
    options?: Parameters<typeof authenticatedApiClient.put>[1]
  ) => authenticatedApiClient.put(url, { json, ...options }).json<ApiResponse<T>>(),

  patch: <T>(
    url: string,
    json?: unknown,
    options?: Parameters<typeof authenticatedApiClient.patch>[1]
  ) => authenticatedApiClient.patch(url, { json, ...options }).json<ApiResponse<T>>(),

  delete: <T>(url: string, options?: Parameters<typeof authenticatedApiClient.delete>[1]) =>
    authenticatedApiClient.delete(url, options).json<ApiResponse<T>>(),
} as const;
