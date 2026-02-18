/**
 * API Client 설정 상수
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export const API_TIMEOUT = 10000; // 10초

export const API_RETRY_LIMIT = 3;

export const API_RETRY_BACKOFF_LIMIT = 3000; // 3초
