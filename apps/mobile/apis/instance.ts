import axios from 'axios';

// bridge.ts의 카카오/리이슈와 동일한 기준. env 없으면 같은 기본 URL 사용 (애플 로그인 등 baseAPI 쓰는 요청용)
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.nitrogen18.store';

export const baseAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
