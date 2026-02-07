import { useEffect, useState } from 'react';

interface KakaoAuth {
  authorize: (settings: { redirectUri: string; state?: string }) => void;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  logout: (callback?: () => void) => void;
}

interface KakaoAPIRequestSettings {
  url: string;
  data?: Record<string, unknown>;
  success?: (response: unknown) => void;
  fail?: (error: unknown) => void;
}

interface KakaoAPI {
  request: <T = unknown>(settings: KakaoAPIRequestSettings) => Promise<T>;
}

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

interface KakaoSDKReturn {
  isLoaded: boolean;
  isLoading: boolean;
}
const KAKAO_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

export const useKakaoSDK = (): KakaoSDKReturn => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao !== undefined) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JAVASCRIPT_KEY as string);
      }
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js';
    script.integrity = 'sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      try {
        if (window.Kakao) {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_JAVASCRIPT_KEY as string);
          }
          setIsLoaded(true);
        } else {
          console.error('Kakao SDK를 로드했지만 window.Kakao를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('알 수 없는 에러가 발생했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      console.error('Kakao SDK 스크립트를 로드하는데 실패했습니다.');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"]'
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return { isLoaded, isLoading };
};
