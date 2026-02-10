import Constants from 'expo-constants';

/**
 * 개발 환경에서는 Expo가 자동으로 감지한 로컬 IP를 사용하고,
 * 프로덕션에서는 환경변수의 URL을 사용합니다.
 */
const getWebViewUrl = (): string => {
  if (__DEV__) {
    // Expo 개발 서버의 hostUri에서 IP 추출 (예: "192.168.1.100:8081" → "192.168.1.100")
    const hostUri = Constants.expoConfig?.hostUri;
    const host = hostUri?.split(':')[0];

    if (!host) {
      console.warn('Expo hostUri not found, falling back to localhost');
      return 'http://localhost:3000';
    }

    // 웹 서버 포트 (필요시 수정)
    const WEB_PORT = 3000;
    return `http://${host}:${WEB_PORT}`;
  }

  // 프로덕션 URL
  const prodUrl = process.env.EXPO_PUBLIC_PROD_WEB_URL;
  if (!prodUrl) {
    throw new Error('EXPO_PUBLIC_PROD_WEB_URL is not set');
  }

  return prodUrl;
};

export const WEBVIEW_URL = getWebViewUrl();
